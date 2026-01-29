import { AcceptEntity } from './AcceptEntity';
import { Parameter, DataType } from './Parameter';
import { genEntityTypeFromContent, genCategoryDataFromContent, genInstanceDataFromContent, checkBelongTwoRooms } from './EntityUtils';
import { ParameterWindowPocketEntity } from './ParameterWindowPocketEntity';
import { HSApp } from './HSApp';

interface WindowParameters {
  height: number;
  sideA: number;
  sideB: number;
  sideC: number;
  sideD: number;
  showPocket: boolean;
}

interface WindowContent {
  parameters: WindowParameters;
  parent?: { id: string };
  getWindowPockets(): WindowPocket[];
  getHost(): Host | null;
}

interface WindowPocket {
  id: string;
}

interface Host {
  id: string;
}

interface RoomInfo {
  floor: {
    id: string;
  };
}

export class ParameterWindowEntity extends AcceptEntity {
  protected buildChildren(content: WindowContent): void {
    if (content.parameters.showPocket) {
      for (const pocket of content.getWindowPockets()) {
        this.addChild(new ParameterWindowPocketEntity().accept(pocket));
      }
    }
  }

  protected buildEntityData(content: WindowContent): void {
    this.setInstanceData(this.getInstanceData(content));
    this.setType(genEntityTypeFromContent(content));
    this.setCategory(genCategoryDataFromContent(content));
  }

  private getInstanceData(content: WindowContent): InstanceData {
    const instanceData = genInstanceDataFromContent(content);

    const parameters = {
      height: content.parameters.height,
      sideA: content.parameters.sideA,
      sideB: content.parameters.sideB,
      sideC: content.parameters.sideC,
      sideD: content.parameters.sideD
    };

    instanceData.addParameter(
      new Parameter("parameters", parameters, DataType.Object),
      new Parameter("layerId", content.parent?.id, DataType.String),
      new Parameter("isBelongTwoRooms", checkBelongTwoRooms(content), DataType.Boolean)
    );

    const host = content.getHost();
    const wallRoomsInfo: RoomInfo[] = HSApp.App.getApp().geometryManager.getWallRoomsInfo(host);
    const roomId = wallRoomsInfo[0]?.floor.id;

    instanceData.addParameter(new Parameter("roomId", roomId, DataType.String));
    instanceData.addParameter(new Parameter("hostId", host?.id, DataType.String));

    return instanceData;
  }
}