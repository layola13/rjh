import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { wrapPromiseEntities } from './wrapPromiseEntities';
import { registerProvider } from './registerProvider';
import { CustomizedPMInsEntity } from './CustomizedPMInsEntity';

interface Entity {
  accept(model: HSCore.Model.CustomizedPMInstanceModel): Entity;
}

interface CustomizedPM {
  getAllChildren(): HSCore.Model.Entity[];
}

function collectEntity(): Promise<Entity[]> {
  const entities: Entity[] = [];
  
  const customizedPms = HSApp.App.getApp().floorplan.scene.getCustomizedPms();
  
  customizedPms.forEach((customizedPm: CustomizedPM) => {
    const pmEntities = extractEntitiesFromPM(customizedPm);
    entities.push(...pmEntities);
  });
  
  return wrapPromiseEntities(entities);
}

function extractEntitiesFromPM(customizedPm: CustomizedPM): Entity[] {
  const result: Entity[] = [];
  
  customizedPm.getAllChildren().forEach((child: HSCore.Model.Entity) => {
    const childEntities = processChild(child);
    result.push(...childEntities);
  });
  
  return result;
}

function processChild(entity: HSCore.Model.Entity): Entity[] {
  const entities: Entity[] = [];
  
  const isRemoved = entity.isFlagOn(HSCore.Model.EntityFlagEnum.removed);
  if (isRemoved) {
    return entities;
  }
  
  if (entity instanceof HSCore.Model.CustomizedPMInstanceModel) {
    const customizedEntity = new CustomizedPMInsEntity().accept(entity);
    entities.push(customizedEntity);
  }
  
  return entities;
}

registerProvider(
  {
    type: 'CustomizedPMModel'
  },
  {
    collectEntity
  }
);