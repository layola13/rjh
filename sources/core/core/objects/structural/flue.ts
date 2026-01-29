import { Obstacle } from './Obstacle';
import { Entity } from './Entity';

export class Flue extends Obstacle {
  constructor(name: string = "", metadata: unknown = undefined) {
    super(name, metadata);
  }

  initByMeta(metadata: unknown): void {
    super.initByMeta(metadata);
    this.webCADDocument = WebCADModelAPI.validateBodyFaceNormals(this.webCADDocument);
  }
}

Entity.registerClass(HSConstants.ModelClass.NgFlue, Flue);