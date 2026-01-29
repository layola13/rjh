import { Obstacle } from './Obstacle';
import { Entity } from './Entity';

export class SewerPipe extends Obstacle {
  constructor(id: string = "", data: unknown = undefined) {
    super(id, data);
  }
}

Entity.registerClass(HSConstants.ModelClass.NgSewerPipe, SewerPipe);