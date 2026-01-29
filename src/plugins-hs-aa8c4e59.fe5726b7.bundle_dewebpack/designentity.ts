import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { Utils } from './Utils';
import { BedRoomList, LivingRoomList, BathRoomList } from './RoomConstants';

interface DesignMetadata {
  get(key: string): any;
}

interface BasicAttributes {
  style?: {
    name?: string;
  };
}

interface RoomInfo {
  roomType: string;
  roomInfos: any[];
}

interface Floorplan {
  forEachRoom(callback: (room: RoomInfo) => void): void;
}

interface DesignData {
  designMetadata: DesignMetadata;
  floorplan: Floorplan;
}

interface DesignEntityData {
  designId: string;
  designName: string;
  versionId: string;
  designStyle?: string;
  designArea: number;
  grossFloorArea: number;
  innerArea: number;
  bedroom: number;
  livingroom: number;
  bathroom: number;
}

export class DesignEntity extends AcceptEntity {
  constructor() {
    super();
  }

  protected buildChildren(): void {
    // Empty implementation
  }

  protected buildEntityData(designData: DesignData): void {
    const { designMetadata, floorplan } = designData;
    const instanceData = new InstanceData('Design');

    const grossFloorArea = HSApp.Util.Floorplan.getFloorplanGrossFloorArea(floorplan);
    const grossInternalArea = HSApp.Util.Floorplan.getFloorplanGrossInternalArea(floorplan);
    const usableArea = HSApp.Util.Floorplan.getFloorplanUsableArea(floorplan);

    const basicAttributes = designMetadata.get('basicAttributes') as BasicAttributes | null | undefined;
    const designStyle = basicAttributes?.style?.name;

    const entityData: DesignEntityData = {
      designId: designMetadata.get('designId'),
      designName: designMetadata.get('designName'),
      versionId: designMetadata.get('designVersion'),
      designStyle,
      designArea: Utils.formatNumberPoints(usableArea),
      grossFloorArea: Utils.formatNumberPoints(grossFloorArea),
      innerArea: Utils.formatNumberPoints(grossInternalArea),
      bedroom: 0,
      livingroom: 0,
      bathroom: 0
    };

    floorplan.forEachRoom((room: RoomInfo) => {
      if (room.roomInfos.length > 0) {
        if (BedRoomList.includes(room.roomType)) {
          entityData.bedroom++;
        } else if (LivingRoomList.includes(room.roomType)) {
          entityData.livingroom++;
        } else if (BathRoomList.includes(room.roomType)) {
          entityData.bathroom++;
        }
      }
    });

    instanceData.addParameter(
      new Parameter('designId', entityData.designId, DataType.String),
      new Parameter('designName', entityData.designName, DataType.String),
      new Parameter('versionId', entityData.versionId, DataType.String),
      new Parameter('designArea', entityData.designArea, DataType.Number),
      new Parameter('grossFloorArea', entityData.grossFloorArea, DataType.Number),
      new Parameter('innerArea', entityData.innerArea, DataType.Number),
      new Parameter('bedroom', entityData.bedroom, DataType.Int),
      new Parameter('livingroom', entityData.livingroom, DataType.Int),
      new Parameter('bathroom', entityData.bathroom, DataType.Int),
      new Parameter('designStyle', entityData.designStyle, DataType.String)
    );

    this.setInstanceData(instanceData);
    this.setType({ classType: 'Design' });
  }
}