import { AcceptEntity } from './AcceptEntity';
import { Parameter, DataType } from './Parameter';
import { Utils } from './Utils';
import { HSCore } from './HSCore';
import { PocketEntity } from './PocketEntity';
import { FaceEntity } from './FaceEntity';
import {
  genEntityTypeFromContent,
  genCategoryDataFromContent,
  genInstanceDataFromContent,
  checkBelongTwoRooms
} from './EntityUtils';

interface Material {
  mixpaint?: boolean;
  seekId?: string;
}

interface Face {
  id: string;
  material: Material;
}

interface ContentParent {
  id: string;
}

interface Host {
  id: string;
}

interface Content {
  getPocket(): unknown | null;
  isDoorStoneMaterialEnabled(): boolean;
  getBottomFaces(): Face[];
  sideFaces: Face[];
  parent?: ContentParent;
  getHost(): Host | null;
}

interface InstanceData {
  getParameterValue(name: string): number[];
  addParameter(parameter: Parameter): void;
}

export class OpeningEntity extends AcceptEntity {
  public roomId: string;

  constructor() {
    super();
    this.roomId = "";
  }

  protected buildChildren(content: Content): void {
    const children: unknown[] = [];
    const pocket = content.getPocket();
    
    if (pocket) {
      children.push(pocket);
    }

    for (const child of children) {
      this.addChild(new PocketEntity().accept(child));
    }

    const isDoorStoneMaterialEnabled = content.isDoorStoneMaterialEnabled();
    const bottomFace = content.getBottomFaces()[0];

    content.sideFaces.forEach((face) => {
      const isBottomFace = bottomFace?.id === face.id && !isDoorStoneMaterialEnabled;
      const hasValidMaterial = face.material.mixpaint || 
        (face.material.seekId !== "local" && face.material.seekId !== "generated");

      if (!isBottomFace && hasValidMaterial) {
        this.addChild(new FaceEntity(this.roomId).accept(face));
      }
    });
  }

  protected buildEntityData(content: Content): void {
    this.setInstanceData(this.getInstanceData(content));
    this.setType(genEntityTypeFromContent(content));
    this.setCategory(genCategoryDataFromContent(content));
  }

  protected getInstanceData(content: Content): InstanceData {
    const instanceData = genInstanceDataFromContent(content);
    const size = instanceData.getParameterValue("size");
    
    instanceData.addParameter(
      new Parameter("area", Utils.formatNumberPoints(size[0] * size[2]), DataType.Number)
    );
    
    instanceData.addParameter(
      new Parameter("layerId", content.parent?.id, DataType.String)
    );
    
    instanceData.addParameter(
      new Parameter("isBelongTwoRooms", checkBelongTwoRooms(content), DataType.Boolean)
    );
    
    const room = HSCore.Util.Room.getRoomOpeningIn(content);
    this.roomId = room?.id ?? "";
    
    instanceData.addParameter(
      new Parameter("roomId", this.roomId, DataType.String)
    );
    
    instanceData.addParameter(
      new Parameter("hostId", content.getHost()?.id, DataType.String)
    );
    
    return instanceData;
  }
}