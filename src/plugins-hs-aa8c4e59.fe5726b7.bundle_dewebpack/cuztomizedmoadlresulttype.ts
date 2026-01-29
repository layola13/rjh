import { Parameter, DataType } from './Parameter';
import { HSCore } from './HSCore';
import { AcceptEntity } from './AcceptEntity';
import { genEntityTypeFromContent, genCategoryDataFromContent, genInstanceDataFromContent } from './EntityUtils';
import { Utils } from './Utils';

export enum CuztomizedMoadlResultType {
  StructureInfo = "structure info",
  SketchMolding = "sketch molding info"
}

interface ProjectionData {
  projectionArea: number;
  projectionLength: number;
}

interface Face {
  id: string;
  realPath2d: unknown;
}

interface Content {
  id: string;
  parent?: Content;
  faceList: Face[];
  profile?: Array<{ getLength(): number }>;
  height3d: number;
  instanceOf(modelClass: string): boolean;
  getUniqueParent(): { height: number };
}

export class NStructureEntity extends AcceptEntity {
  constructor() {
    super();
  }

  buildChildren(): void {
    // No implementation
  }

  buildEntityData(content: Content): void {
    this.setInstanceData(this.getInstanceData(content));
    this.setType(genEntityTypeFromContent(content));
    this.setCategory(genCategoryDataFromContent(content));
  }

  getInstanceData(content: Content): unknown {
    const instanceData = genInstanceDataFromContent(content);
    const roomContent = HSCore.Util.Room.getRoomContentIn(content);
    const roomId = roomContent?.id ?? "";
    const layerId = content.parent?.id ?? "";
    const hostedFace = HSCore.Util.Content.getHostedFace(content);
    const hostFaceId = hostedFace ? hostedFace.id : "";
    const surfaceArea = this.getSurfaceAreaForStructure(content);
    const { projectionArea, projectionLength } = this.getProjectionData(content);

    instanceData.addParameter(
      new Parameter("roomId", roomId, DataType.String),
      new Parameter("layerId", layerId, DataType.String),
      new Parameter("hostFace", hostFaceId, DataType.String),
      new Parameter("surfaceArea", surfaceArea, DataType.Number),
      new Parameter("projectionArea", projectionArea, DataType.Number),
      new Parameter("projectionLength", projectionLength, DataType.Number),
      new Parameter("customizedType", CuztomizedMoadlResultType.StructureInfo, DataType.String)
    );

    return instanceData;
  }

  getProjectionData(content: Content): ProjectionData {
    const bottomFaces = content.faceList.filter((face: Face) => {
      return HSCore.Util.Face.getFaceType(face) === "bottom";
    });

    const projectionArea = bottomFaces[0] 
      ? HSCore.Util.TgWall.getArea(bottomFaces[0].realPath2d) 
      : 0;

    const projectionLength = content.profile?.reduce((accumulator: number, profileItem) => {
      return accumulator += profileItem.getLength();
    }, 0) ?? 0;

    return {
      projectionArea: Utils.formatNumberPoints(projectionArea),
      projectionLength: Utils.formatNumberPoints(projectionLength)
    };
  }

  getSurfaceAreaForStructure(content: Content): number {
    const deduplicationFaces = this.getDeduplicationFaces(content);
    let totalArea = 0;

    deduplicationFaces.forEach((face: Face) => {
      const faceArea = HSCore.Util.TgWall.getArea(face.realPath2d);
      totalArea += faceArea;
    });

    return Utils.formatNumberPoints(totalArea);
  }

  getDeduplicationFaces(content: Content): Face[] {
    const validFaces: Face[] = [];
    const uniqueParent = content.getUniqueParent();

    content.faceList.forEach((face: Face) => {
      const faceType = HSCore.Util.Face.getFaceType(face);
      
      if (faceType !== "bottom" || content.instanceOf(HSCore.Constants.ModelClass.NCustomizedBeam)) {
        if (faceType !== "top" || uniqueParent.height > content.height3d) {
          validFaces.push(face);
        }
      }
    });

    return validFaces;
  }
}