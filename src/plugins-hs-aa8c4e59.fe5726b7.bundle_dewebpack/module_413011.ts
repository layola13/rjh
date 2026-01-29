import { wrapPromiseEntities } from './wrapPromiseEntities';
import { registerProvider } from './registerProvider';
import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { CustomizedEntity } from './CustomizedEntity';
import { NStructureEntity } from './NStructureEntity';
import { NCustomizedFeatureModelEntity } from './NCustomizedFeatureModelEntity';

interface Entity {
  accept(model: unknown): Entity;
}

interface Layer {
  forEachContent(callback: (content: ContentModel) => void): void;
  forEachStructure(callback: (structure: StructureModel) => void): void;
  forEachBeam(callback: (beam: BeamModel) => void): void;
}

interface BaseModel {
  isFlagOn(flag: number): boolean;
}

type ContentModel = BaseModel & (CustomizedModel | NCustomizedFeatureModel);

interface CustomizedModel extends BaseModel {
  readonly type: 'customized';
}

interface NCustomizedFeatureModel extends BaseModel {
  readonly type: 'nCustomizedFeature';
}

interface StructureModel extends BaseModel {}

interface BeamModel extends BaseModel {}

function collectEntity(): Promise<Entity[]> {
  const entities: Entity[] = [];

  const app = HSApp.App.getApp();
  
  app.floorplan.scene.forEachLayer((layer: Layer) => {
    const layerEntities = collectLayerEntities(layer);
    entities.push(...layerEntities);
  });

  return wrapPromiseEntities(entities);
}

function collectLayerEntities(layer: Layer): Entity[] {
  const entities: Entity[] = [];

  layer.forEachContent((content: ContentModel) => {
    if (content.isFlagOn(HSCore.Model.EntityFlagEnum.removed)) {
      return;
    }

    if (isCustomizedModel(content)) {
      const entity = new CustomizedEntity().accept(content);
      entities.push(entity);
    } else if (isNCustomizedFeatureModel(content)) {
      const entity = new NCustomizedFeatureModelEntity().accept(content);
      entities.push(entity);
    }
  });

  layer.forEachStructure((structure: StructureModel) => {
    if (!structure.isFlagOn(HSCore.Model.EntityFlagEnum.removed)) {
      const entity = new NStructureEntity().accept(structure);
      entities.push(entity);
    }
  });

  layer.forEachBeam((beam: BeamModel) => {
    if (!beam.isFlagOn(HSCore.Model.EntityFlagEnum.removed)) {
      const entity = new NStructureEntity().accept(beam);
      entities.push(entity);
    }
  });

  return entities;
}

function isCustomizedModel(model: ContentModel): model is CustomizedModel {
  return model instanceof HSCore.Model.CustomizedModel;
}

function isNCustomizedFeatureModel(model: ContentModel): model is NCustomizedFeatureModel {
  return model instanceof HSCore.Model.NCustomizedFeatureModel;
}

registerProvider(
  { type: 'CustomizationModel' },
  { collectEntity }
);