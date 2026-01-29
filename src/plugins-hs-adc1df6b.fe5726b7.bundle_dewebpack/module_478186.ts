interface ProfileData {
  seekId?: string;
  contentType?: string;
  profile?: string;
  normalTexture?: string;
  normalTextureHigh?: string;
  thumbnail?: string;
  profileSizeX: number;
  profileSizeY: number;
  profileHeight: number;
  profileWidth: number;
  offsetX?: number;
  offsetY?: number;
  flip?: boolean;
  flipVertical?: boolean;
  flipHorizontal?: boolean;
  materialData?: MaterialData;
}

interface MaterialData {
  [key: string]: unknown;
}

interface MoldingParameters {
  profileData: ProfileData;
  materialData?: MaterialData;
  error?: number;
}

interface MetaDataOptions {
  data: ProfileData;
  materialData?: MaterialData;
  normalTexture?: string;
  normalTextureHigh?: string;
  considerYRayNegate: boolean;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
}

interface StrategyContext {
  entity: HSCore.Model.CustomizedModelMolding | HSCore.Model.Entity;
}

interface UndoRedoData {
  moldingParameters: MoldingParameters;
}

import BaseStrategy from './BaseStrategy';

export default class CustomizedModelMoldingStrategy extends BaseStrategy {
  get ClassName(): string {
    return 'CustomizedModelMoldingStrategy';
  }

  isSuckable(context: StrategyContext): boolean {
    return context.entity instanceof HSCore.Model.CustomizedModelMolding;
  }

  suck(context: StrategyContext): MoldingParameters | undefined {
    const entity = context.entity;
    if (entity instanceof HSCore.Model.CustomizedModelMolding) {
      return _.cloneDeep(entity.getParameters());
    }
    return undefined;
  }

  isAppliable(context: StrategyContext, parameters: MoldingParameters | null): boolean {
    return !!(context.entity instanceof HSCore.Model.CustomizedModelMolding && parameters);
  }

  apply(context: StrategyContext, parameters: MoldingParameters | null): void {
    const entity = context.entity;
    
    if (!(entity instanceof HSCore.Model.CustomizedModelMolding) || !parameters || parameters.error === -1) {
      return;
    }

    if (parameters.materialData) {
      parameters.profileData.materialData = parameters.materialData;
    }

    const metaDataOptions: MetaDataOptions = {
      data: parameters.profileData,
      materialData: parameters.materialData,
      normalTexture: parameters.profileData.normalTexture,
      normalTextureHigh: parameters.profileData.normalTextureHigh,
      considerYRayNegate: true,
      flipHorizontal: entity.flipHorizontal,
      flipVertical: entity.flipVertical
    };

    const currentParameters = entity.getParameters().profileData;
    metaDataOptions.data.flip = entity.flip;
    metaDataOptions.data.flipVertical = entity.flipVertical;
    metaDataOptions.data.flipHorizontal = entity.flipHorizontal;
    metaDataOptions.data.offsetY = currentParameters.offsetY ?? 0;

    const isCurrentPortrait = currentParameters.profileSizeY > currentParameters.profileSizeX;
    const isNewPortrait = parameters.profileData.profileSizeY > parameters.profileData.profileSizeX;

    const PROFILE_HEIGHT_MULTIPLIER = 100;
    const PROFILE_WIDTH_MULTIPLIER = 100;

    if (
      (isCurrentPortrait && GeLib.MathUtils.nearlyEqual(PROFILE_HEIGHT_MULTIPLIER * currentParameters.profileHeight, currentParameters.offsetX)) ||
      (!isCurrentPortrait && GeLib.MathUtils.nearlyEqual(PROFILE_WIDTH_MULTIPLIER * currentParameters.profileWidth, currentParameters.offsetX))
    ) {
      metaDataOptions.data.offsetX = isNewPortrait 
        ? PROFILE_HEIGHT_MULTIPLIER * parameters.profileData.profileHeight 
        : PROFILE_WIDTH_MULTIPLIER * parameters.profileData.profileWidth;
    } else {
      metaDataOptions.data.offsetX = currentParameters.offsetX ?? 0;
    }

    const metadata = HSCore.Model.CustomizedModelMolding.constructMetaData(
      entity.path,
      entity.wholePath,
      metaDataOptions,
      entity.flip,
      entity.flipVertical,
      entity.keepProfileCordinate,
      entity.moldingId,
      entity.options
    );

    entity.updateMetadata(metadata);

    const parentModel = entity.getUniqueParent();
    if (!(parentModel instanceof HSCore.Model.CustomizedModel)) {
      return;
    }

    const pluginManager = HSApp.App.getApp().pluginManager;
    const featureModelPlugin = pluginManager.getPlugin(HSFPConstants.PluginType.CustomizedFeatureModel);
    const parametricCeilingPresets = featureModelPlugin.getParametricCeilingPresets();
    const profileType = parametricCeilingPresets.getProfileTypeByMoldingId(parentModel, entity.moldingId).profileType;

    if (!parentModel.metadata.parameters?.[profileType]) {
      return;
    }

    const profileParameters = parentModel.metadata.parameters[profileType];
    profileParameters.seekId = parameters.profileData.seekId;
    profileParameters.contentType = parameters.profileData.contentType;
    profileParameters.profile = parameters.profileData.profile;
    profileParameters.normalTexture = parameters.profileData.normalTexture;
    profileParameters.thumbnail = parameters.profileData.thumbnail;
    profileParameters.profileSizeX = parameters.profileData.profileSizeX;
    profileParameters.profileSizeY = parameters.profileData.profileSizeY;
    profileParameters.materialData = parameters.materialData;
    parentModel.materialManager.setMoldingMaterialDirty(profileType);
  }

  getUndoData(context: StrategyContext): UndoRedoData {
    return this._getUndoRedoData(context);
  }

  getRedoData(context: StrategyContext): UndoRedoData {
    return this._getUndoRedoData(context);
  }

  undo(context: StrategyContext, data: UndoRedoData): void {
    const moldingParameters = data.moldingParameters;
    this.apply(context, moldingParameters);
  }

  redo(context: StrategyContext, data: UndoRedoData): void {
    const moldingParameters = data.moldingParameters;
    this.apply(context, moldingParameters);
  }

  private _getUndoRedoData(context: StrategyContext): UndoRedoData {
    const entity = context.entity as HSCore.Model.CustomizedModelMolding;
    return {
      moldingParameters: _.cloneDeep(entity.getParameters())
    };
  }
}