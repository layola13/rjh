import { CustomizedModel } from './CustomizedModel';
import { Entity } from './Entity';

enum AlignToWallTypeEnum {
  edge = "edge",
  center = "center"
}

Object.freeze(AlignToWallTypeEnum);

class Beam extends CustomizedModel {
  alignToWallType: AlignToWallTypeEnum;
  roomSnapEnable: boolean | undefined;
  private _graphicsData?: GraphicsData;

  constructor(id: string = "", parent: unknown = undefined) {
    super(id, parent);
    this.alignToWallType = AlignToWallTypeEnum.edge;
    this.roomSnapEnable = undefined;
  }

  traverseBodyGraphicsData = (callback: (face: Face, index: number) => void): void => {
    const graphicsData = this._graphicsData ?? this.getGraphicsData();
    graphicsData.faces.forEach((face, index) => {
      callback(face, index);
    });
  };

  protected getGraphicsData(): GraphicsData {
    // Implementation should be provided by parent class or override
    throw new Error('getGraphicsData must be implemented');
  }
}

interface GraphicsData {
  faces: Face[];
}

interface Face {
  // Define face properties based on actual usage
}

Entity.registerClass(HSConstants.ModelClass.NgBeam, Beam);

export { AlignToWallTypeEnum, Beam };