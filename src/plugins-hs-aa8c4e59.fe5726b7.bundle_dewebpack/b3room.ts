import { B3Entity } from './B3Entity';
import { B3Face } from './B3Face';
import { B3Molding } from './B3Molding';
import { B3CustomizedModel, CuztomizedMoadlResultType } from './B3CustomizedModel';
import { B3NCustomizedFeatureModel, NCustomizedModelResultType } from './B3NCustomizedFeatureModel';
import { NCustomizedFeatureModelEntity } from './NCustomizedFeatureModelEntity';
import { turnEntityToBom3Entity, setObjectParameterValues, genBom3DataFromGroup, genContentsInfo } from './utils';
import { relatedClass } from './constants';
import { dumpEntity } from './entityUtils';

interface RoomRelation {
  id: string;
  type: string;
  displayName: string;
  displayNameCustom: string;
}

interface RoomInfo {
  id: string;
  relationRooms?: RoomRelation[];
  type?: string;
  displayName?: string;
  displayNameCustom?: string;
}

interface CustomizedData {
  structures: unknown[];
  paramaterModels: unknown[];
  sketchModels: unknown[];
  diyModels: unknown[];
}

interface Bom3Data {
  entity: unknown;
  roomInfo: RoomInfo;
  faces: unknown[];
  contents: unknown[];
  moldings: unknown[];
  customizations: unknown[];
  customizedModelings: CustomizedData;
  spaceGirth?: unknown;
}

interface BuildContext {
  roomFaces: Map<string, unknown>;
  roomMoldings: Map<string, unknown>;
  roomContents: Map<string, unknown[]>;
  roomCustomizations: Map<string, unknown[]>;
  roomCustomizedModels: Map<string, unknown[]>;
}

export class B3Room extends B3Entity {
  private context: BuildContext;

  constructor(context: BuildContext) {
    super(context);
    this.context = context;
  }

  buildBom3Data(entity: any): Bom3Data {
    const instanceId = entity.getInstanceId();
    const entityData = turnEntityToBom3Entity(entity);
    entityData.type.classType = relatedClass[entityData.type.classType] || entityData.type.classType;

    const roomInfo: RoomInfo = {
      id: instanceId
    };

    setObjectParameterValues(roomInfo, entity, {
      type: 'type',
      displayName: 'displayName',
      displayNameCustom: 'displayNameCustom'
    });

    const relatedRooms = HSCore.Util.Room.getRelatedRooms(instanceId);
    if (relatedRooms.length > 0) {
      const app = HSApp.App.getApp();
      const relationRoomsList = relatedRooms.map((roomId: string) => {
        const roomEntity = app.floorplan.getEntityById(roomId);
        const roomType = roomEntity.roomType;
        return {
          id: roomId,
          type: roomType || '',
          displayName: HSApp.Util.Room.getRoomTypeDisplayNameByRoomType(roomType) || '',
          displayNameCustom: roomEntity.roomTypeDisplayName || ''
        };
      });
      roomInfo.relationRooms = relationRoomsList;
    }

    const result: Bom3Data = {
      entity: entityData,
      roomInfo,
      faces: genBom3DataFromGroup(this.context.roomFaces, instanceId, new B3Face(this.context)),
      contents: this.buildContentData(entity),
      moldings: this.buildMoldingData(entity),
      customizations: this.buildCustomizationData(entity),
      customizedModelings: this.buildCustomizedData(entity)
    };

    setObjectParameterValues(result, entity, {
      spaceGirth: 'spaceGirth'
    });

    return result;
  }

  buildMoldingData(entity: any): unknown[] {
    const instanceId = entity.getInstanceId();
    return genBom3DataFromGroup(this.context.roomMoldings, instanceId, new B3Molding(this.context));
  }

  buildContentData(entity: any): unknown[] {
    const instanceId = entity.getInstanceId();
    return this.context.roomContents.has(instanceId) 
      ? genContentsInfo(this.context.roomContents.get(instanceId)!) 
      : [];
  }

  buildCustomizationData(entity: any): unknown[] {
    const instanceId = entity.getInstanceId();
    const customizations = this.context.roomCustomizations.get(instanceId);
    return customizations ? customizations.map(item => dumpEntity(item)) : [];
  }

  buildCustomizedData(entity: any): CustomizedData {
    const instanceId = entity.getInstanceId();
    const structures: unknown[] = [];
    const paramaterModels: unknown[] = [];
    const sketchModels: unknown[] = [];
    const diyModels: unknown[] = [];

    const customizedModels = this.context.roomCustomizedModels.get(instanceId);
    const customizedModelBuilder = new B3CustomizedModel(this.context);
    const nCustomizedFeatureBuilder = new B3NCustomizedFeatureModel(this.context);

    if (customizedModels) {
      for (const model of customizedModels) {
        const customizedType = model.getParameterValue('customizedType');

        if (model instanceof NCustomizedFeatureModelEntity) {
          if (customizedType === NCustomizedModelResultType.StructureInfo) {
            structures.push(nCustomizedFeatureBuilder.buildBom3Data(model));
          } else if (customizedType === NCustomizedModelResultType.SketchMolding) {
            sketchModels.push(nCustomizedFeatureBuilder.buildBom3Data(model));
          } else if (customizedType === NCustomizedModelResultType.ParametricCeiling) {
            paramaterModels.push(nCustomizedFeatureBuilder.buildBom3Data(model));
          } else if (customizedType === NCustomizedModelResultType.DIYModel) {
            diyModels.push(nCustomizedFeatureBuilder.buildBom3Data(model));
          }
        } else {
          if (customizedType === CuztomizedMoadlResultType.StructureInfo) {
            structures.push(customizedModelBuilder.buildBom3Data(model));
          } else if (customizedType === CuztomizedMoadlResultType.SketchMolding) {
            sketchModels.push(customizedModelBuilder.buildBom3Data(model));
          } else if (customizedType === CuztomizedMoadlResultType.ParametricCeiling) {
            paramaterModels.push(customizedModelBuilder.buildBom3Data(model));
          } else if (customizedType === CuztomizedMoadlResultType.DIYModel) {
            diyModels.push(customizedModelBuilder.buildBom3Data(model));
          }
        }
      }
    }

    return {
      structures,
      paramaterModels,
      sketchModels,
      diyModels
    };
  }
}