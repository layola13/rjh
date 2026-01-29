import { Obstacle } from './Obstacle';
import { Entity } from './Entity';

export class Column extends Obstacle {
  constructor(id: string = "", data: unknown = undefined) {
    super(id, data);
  }
}

Entity.registerClass(HSConstants.ModelClass.NgColumn, Column);