import { HSCore } from './HSCore';
import { HSCatalog } from './HSCatalog';

interface MoldingMetadata {
  isFromEnterprise?: boolean;
  contentTypeStr?: string;
  seekId?: string;
  contentType?: string;
  [key: string]: unknown;
}

interface MoldingParameters {
  seekId?: string;
  profile?: unknown;
  profileHeight: number;
  profileWidth?: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
  flip: boolean;
  offsetX: number;
  offsetY: number;
  materialData?: unknown;
  texture?: unknown;
  normalTexture?: unknown;
  normalTextureHigh?: unknown;
  iconSmall?: unknown;
  contentType: string;
  metadata?: MoldingMetadata;
  [key: string]: unknown;
}

interface SuckableContext {
  entity: HSCore.Model.NCustomizedModelMolding;
}

interface AppliableContext {
  entity: HSCore.Model.NCustomizedModelMolding;
}

interface UndoRedoData {
  moldingParameters: MoldingParameters;
}

/**
 * Strategy for handling customized model molding operations including suck, apply, undo/redo
 */
export default class NCustomizedModelMoldingStrategy {
  get ClassName(): string {
    return "NCustomizedModelMoldingStrategy";
  }

  /**
   * Determines if an entity can be "sucked" (parameters extracted)
   */
  isSuckable(context: SuckableContext): boolean {
    const { entity } = context;
    
    if (entity instanceof HSCore.Model.NCustomizedModelMolding) {
      const metadata = entity.metadata;
      const parent = entity.parent;
      
      return (
        metadata?.isFromEnterprise !== true ||
        !(
          entity instanceof HSCore.Model.NCPBackgroundWallUnit ||
          entity instanceof HSCore.Model.NCustomizedParametricBackgroundWall ||
          HSApp.View.Util.getParentByEntityType(parent, HSConstants.ModelClass.NCPBackgroundWallUnit) ||
          HSApp.View.Util.getParentByEntityType(parent, HSConstants.ModelClass.NCustomizedParametricBackgroundWall)
        )
      );
    }
    
    return false;
  }

  /**
   * Extracts parameters from a molding entity
   */
  suck(context: SuckableContext): MoldingParameters | undefined {
    const { entity } = context;
    
    if (entity instanceof HSCore.Model.NCustomizedModelMolding) {
      const parameters = _.cloneDeep(entity.parameters) as MoldingParameters;
      const path = entity.path;
      const uniqueParent = entity.getUniqueParent();
      const coedgesPosition = HSApp.Util.NCustomizedFeatureModel.getCoedgesPosition(path, uniqueParent);
      
      if (parameters.contentType === "baseboard") {
        parameters.flip = !parameters.flip;
        parameters.flipVertical = !parameters.flipVertical;
        parameters.flipHorizontal = !parameters.flipHorizontal;
      } else if (coedgesPosition === 2) {
        parameters.flip = !parameters.flip;
        parameters.flipVertical = !parameters.flipVertical;
        parameters.offsetX = parameters.offsetX - parameters.profileHeight;
      }
      
      parameters.metadata = _.cloneDeep(entity.metadata);
      return parameters;
    }
    
    return undefined;
  }

  /**
   * Checks if parameters can be applied to an entity
   */
  isAppliable(context: AppliableContext, parameters: MoldingParameters | null): boolean {
    const { entity } = context;
    
    if (entity instanceof HSCore.Model.NCustomizedModelMolding && parameters) {
      const isBuildElementOrPositiveAngleLine = parameters.contentType === "build element/positive angle line";
      const isMitreType = entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Mitre);
      
      if ((isBuildElementOrPositiveAngleLine && !isMitreType) || (!isBuildElementOrPositiveAngleLine && isMitreType)) {
        return false;
      }
      
      const parent = entity.parent;
      return !(
        (parent instanceof HSCore.Model.NCPBackgroundWallUnit || parent instanceof HSCore.Model.NCustomizedParametricBackgroundWall) &&
        parent.metadata?.isFromEnterprise === true
      );
    }
    
    return false;
  }

  /**
   * Applies parameters to a molding entity
   */
  apply(context: AppliableContext, parameters: MoldingParameters): void {
    const { entity } = context;
    
    if (!(entity instanceof HSCore.Model.NCustomizedModelMolding)) {
      return;
    }
    
    const currentParameters = entity.parameters;
    if (!currentParameters) {
      return;
    }
    
    const updatedParameters = _.cloneDeep(currentParameters);
    const path = entity.path;
    const uniqueParent = entity.getUniqueParent();
    const coedgesPosition = HSApp.Util.NCustomizedFeatureModel.getCoedgesPosition(path, uniqueParent);
    const isBaseboard = parameters.contentType === "baseboard";
    
    Object.assign(updatedParameters, {
      seekId: parameters.seekId,
      profile: parameters.profile,
      profileHeight: parameters.profileHeight,
      profileWidth: parameters.profileWidth,
      flipHorizontal: isBaseboard ? !parameters.flipHorizontal : parameters.flipHorizontal,
      flipVertical: isBaseboard || coedgesPosition === 2 ? !parameters.flipVertical : parameters.flipVertical,
      flip: isBaseboard || coedgesPosition === 2 ? !parameters.flip : parameters.flip,
      offsetX: coedgesPosition !== 2 || isBaseboard ? parameters.offsetX : parameters.offsetX + parameters.profileHeight,
      offsetY: parameters.offsetY,
      materialData: parameters.materialData,
      texture: parameters.texture,
      normalTexture: parameters.normalTexture,
      normalTextureHigh: parameters.normalTextureHigh,
      iconSmall: parameters.iconSmall,
      contentType: parameters.contentType
    });
    
    const metadata: MoldingMetadata = {
      ...parameters.metadata,
      contentTypeStr: parameters.contentType
    } || {
      seekId: parameters.seekId,
      contentType: parameters.contentType
    };
    
    entity.init(metadata, updatedParameters);
    entity.dirtyGeometry();
  }

  /**
   * Gets data needed for undo operation
   */
  getUndoData(context: AppliableContext): UndoRedoData {
    return this._getUndoRedoData(context);
  }

  /**
   * Gets data needed for redo operation
   */
  getRedoData(context: AppliableContext): UndoRedoData {
    return this._getUndoRedoData(context);
  }

  /**
   * Performs undo operation
   */
  undo(context: AppliableContext, data: UndoRedoData): void {
    const { moldingParameters } = data;
    this.apply(context, moldingParameters);
  }

  /**
   * Performs redo operation
   */
  redo(context: AppliableContext, data: UndoRedoData): void {
    const { moldingParameters } = data;
    this.apply(context, moldingParameters);
  }

  /**
   * Internal helper to extract undo/redo data
   */
  private _getUndoRedoData(context: AppliableContext): UndoRedoData {
    const { entity } = context;
    const parameters = _.cloneDeep(entity.parameters) as MoldingParameters;
    const path = entity.path;
    const uniqueParent = entity.getUniqueParent();
    const coedgesPosition = HSApp.Util.NCustomizedFeatureModel.getCoedgesPosition(path, uniqueParent);
    
    if (parameters.contentType === "baseboard") {
      parameters.flip = !parameters.flip;
      parameters.flipVertical = !parameters.flipVertical;
      parameters.flipHorizontal = !parameters.flipHorizontal;
    } else if (coedgesPosition === 2) {
      parameters.flip = !parameters.flip;
      parameters.flipVertical = !parameters.flipVertical;
      parameters.offsetX = parameters.offsetX - parameters.profileHeight;
    }
    
    parameters.metadata = _.cloneDeep(entity.metadata);
    
    return {
      moldingParameters: parameters
    };
  }
}