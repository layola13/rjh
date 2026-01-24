/**
 * Request for importing customized PM (Product Model) instances into a floorplan.
 * Handles the creation, undo, and redo operations for importing customized product models.
 * 
 * @module ImportCustomizedPMInstanceRequest
 */

import type { HSCore } from './HSCore';
import type { DIYUtils } from './DIYUtils';

/**
 * Content type descriptor for import operations
 */
interface ContentType {
  /**
   * Returns the string representation of the content type
   */
  getTypeString(): string;
}

/**
 * 3D position vector
 */
interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * Floorplan scene interface
 */
interface FloorplanScene {
  /**
   * Retrieves all customized PM models in the scene
   */
  getCustomizedPms(): CustomizedPMModel[];
  
  /**
   * Adds a child model to the scene
   */
  addChild(model: CustomizedPMModel): void;
}

/**
 * Floorplan interface
 */
interface Floorplan {
  scene: FloorplanScene;
}

/**
 * WebCAD document interface for DIY operations
 */
interface WebCADDocument {
  // Document structure and methods
}

/**
 * Customized Product Model
 */
interface CustomizedPMModel {
  webCADDocument: WebCADDocument;
  
  /**
   * Sets a flag on the model entity
   */
  setFlagOn(flag: HSCore.Model.EntityFlagEnum): void;
  
  /**
   * Opens the DIY document for editing
   * @param readonly - Whether to open in readonly mode
   */
  openDiyDocument(readonly: boolean): Promise<void>;
}

/**
 * Customized PM instance entity
 */
interface CustomizedPMInstance {
  // Instance properties
}

/**
 * Options for creating a customized PM model
 */
interface CreateCustomizedPMModelOptions {
  /** User ID of the creator */
  creator: string;
  /** Unit of measurement (e.g., "mm") */
  unit: string;
  /** WebCAD document */
  webCADDocument: WebCADDocument;
}

/**
 * Options for adding a customized PM instance
 */
interface AddCustomizedPMInstanceOptions {
  /** The instance model to add */
  insModel: CustomizedPMInstance;
  /** The root model to add to */
  rootModel: CustomizedPMModel;
}

/**
 * Request class for importing customized PM instances.
 * Extends the base Request class to provide transaction support with undo/redo capabilities.
 */
export declare class ImportCustomizedPMInstanceRequest extends HSCore.Transaction.Request {
  /** The floorplan to import into */
  private readonly _floorplan: Floorplan;
  
  /** Serialized import document string */
  private readonly _importDocStr: string;
  
  /** Content type of the import data */
  private readonly _contentType: ContentType;
  
  /** Origin position for the imported instance */
  private readonly _originPos: Vector3;
  
  /** Length along X axis */
  private readonly _xLength: number;
  
  /** Length along Y axis */
  private readonly _yLength: number;
  
  /** Length along Z axis */
  private readonly _zLength: number;
  
  /** Scale factor for the imported instance */
  private readonly _scale: number;
  
  /** Rotation angle for the imported instance */
  private readonly _rotation: number;
  
  /** Root customized PM model */
  private _rootModel?: CustomizedPMModel;
  
  /** WebCAD document state before import */
  private _webcadDocBefore?: WebCADDocument;
  
  /** WebCAD document state after import */
  private _webcadDocAfter?: WebCADDocument;
  
  /** The newly created entity instance */
  private _newEntity?: CustomizedPMInstance;
  
  /** Flag indicating this is an async update operation */
  isAyncUpdate: boolean;

  /**
   * Creates a new import request for a customized PM instance
   * 
   * @param floorplan - The target floorplan
   * @param importDocStr - Serialized document string to import
   * @param contentType - Type of content being imported
   * @param originPos - Origin position for placement
   * @param xLength - Length along X axis
   * @param yLength - Length along Y axis
   * @param zLength - Length along Z axis
   * @param scale - Scale factor to apply
   * @param rotation - Rotation angle to apply
   */
  constructor(
    floorplan: Floorplan,
    importDocStr: string,
    contentType: ContentType,
    originPos: Vector3,
    xLength: number,
    yLength: number,
    zLength: number,
    scale: number,
    rotation: number
  );

  /**
   * Executes the import operation asynchronously.
   * Creates or retrieves the root PM model, imports the instance, and returns the new entity.
   * 
   * @returns Promise resolving to the newly created customized PM instance
   */
  onCommitAsync(): Promise<CustomizedPMInstance | undefined>;

  /**
   * Reverts the import operation.
   * Restores the previous WebCAD document state and removes the imported entity.
   * 
   * @returns Promise that resolves when undo is complete
   */
  onUndo(): Promise<void>;

  /**
   * Re-applies the import operation after an undo.
   * Restores the post-import WebCAD document state and re-adds the entity.
   * 
   * @returns Promise that resolves when redo is complete
   */
  onRedo(): Promise<void>;
}