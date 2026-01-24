/**
 * Module: AddRoofRequest
 * Provides functionality for creating and managing roof addition requests in the transaction system.
 */

import { HSCore } from './HSCore';
import { ENParamRoofType } from './ENParamRoofType';
import { Utils } from './Utils';

/**
 * Interface representing the initialization parameters for AddRoofRequest
 */
interface AddRoofRequestParams {
  /** Metadata containing roof configuration and parametric information */
  meta: RoofMetadata;
  /** The layer where the roof will be added */
  layer: Layer;
  /** Loop definition for the roof boundary */
  loop: LoopData;
  /** Height of the room where the roof is applied */
  roomHeight: number;
  /** Array of wall IDs that are linked to this roof */
  linkWallIds?: string[];
  /** Type of roof generation method */
  generatedType: RoofGeneratedType;
  /** Whether this is a preview instance */
  isPreview: boolean;
  /** Optional parameters for updating existing roof */
  updateParams?: RoofUpdateParams;
}

/**
 * Interface for roof metadata
 */
interface RoofMetadata {
  /** User-defined free data containing parametric metadata */
  userFreeData: {
    parametricMeta: string;
  };
}

/**
 * Interface for layer operations
 */
interface Layer {
  /** Room builder instance for construction operations */
  roomBuilder: {
    build(): void;
  };
}

/**
 * Type representing loop data structure for roof boundaries
 */
type LoopData = unknown; // Define based on actual loop structure

/**
 * Type representing roof generation methods
 */
type RoofGeneratedType = unknown; // Define based on actual generation types

/**
 * Type representing roof update parameters
 */
type RoofUpdateParams = unknown; // Define based on actual update structure

/**
 * Request class for adding customized parametric roofs to the scene.
 * Extends the base StateRequest to handle roof creation transactions.
 */
export class AddRoofRequest extends HSCore.Transaction.Common.StateRequest {
  private _meta: RoofMetadata;
  private _layer: Layer;
  private _loop: LoopData;
  private _roomHeight: number;
  private _linkWallIds: string[];
  private _generatedType: RoofGeneratedType;
  private _isPreview: boolean;
  private _updateParams?: RoofUpdateParams;
  
  /** The created roof instance */
  public roof?: HSCore.Model.NCustomizedParametricRoof;

  /**
   * Constructs a new AddRoofRequest instance
   * @param params - Configuration parameters for the roof request
   */
  constructor(params: AddRoofRequestParams) {
    super();

    const {
      meta,
      layer,
      loop,
      roomHeight,
      linkWallIds = [],
      generatedType,
      isPreview,
      updateParams
    } = params;

    this._meta = meta;
    this._layer = layer;
    this._loop = this._tryFixAddLoop(loop, meta);
    this._roomHeight = roomHeight;
    this._linkWallIds = linkWallIds;
    this._generatedType = generatedType;
    this._isPreview = isPreview;
    this._updateParams = updateParams;
  }

  /**
   * Attempts to fix and sort the loop data based on roof type from metadata
   * @param loop - Original loop data
   * @param meta - Roof metadata containing parametric information
   * @returns Fixed and sorted loop data
   */
  private _tryFixAddLoop(loop: LoopData, meta: RoofMetadata): LoopData {
    let fixedLoop = loop;

    try {
      const parametricMeta = JSON.parse(meta.userFreeData.parametricMeta);
      const roofType = parametricMeta.roofType;
      fixedLoop = Utils.sortLoopByType(loop, roofType);
    } catch (error) {
      console?.error(error);
    }

    return fixedLoop;
  }

  /**
   * Commits the roof creation request and returns the created roof content
   * @returns The newly created roof instance
   */
  public onCommit(): HSCore.Model.NCustomizedParametricRoof {
    const content = this._createContent();
    return content;
  }

  /**
   * Creates the actual roof content and adds it to the layer
   * @returns The created roof instance
   */
  private _createContent(): HSCore.Model.NCustomizedParametricRoof {
    const roof = new HSCore.Model.NCustomizedParametricRoof();

    // Initialize roof with metadata and room parameters
    roof.initByMeta(this._meta, undefined, undefined, undefined, {
      roomHeight: this._roomHeight,
      linkWallIds: this._linkWallIds
    });

    // Set preview parameters if this is a preview instance
    roof.previewParams = this._isPreview ? {} : undefined;

    // Initialize roof geometry with loop data
    roof.initRoof(this._loop);
    roof.generatedType = this._generatedType;

    const layer = this._layer;

    // Add the roof content to the scene
    HSCore.Util.Content.addContent({
      content: roof,
      host: null,
      parent: layer
    });

    // Apply update parameters if provided
    if (this._updateParams) {
      roof.setParamsToRoof(this._updateParams);
    }

    this.roof = roof;

    // Build room if roof type is not a plane
    if (roof.parameters.roofType !== ENParamRoofType.Plane) {
      this._layer.roomBuilder.build();
    }

    return roof;
  }

  /**
   * Indicates whether this request can participate in field transactions
   * @returns Always returns true for roof requests
   */
  public canTransactField(): boolean {
    return true;
  }
}