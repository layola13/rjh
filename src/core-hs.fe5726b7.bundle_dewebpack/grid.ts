export enum GridFlagEnum {
  toggleOff = 256
}

import { Entity } from './Entity';

export class Grid extends Entity {
  public width: number;
  public height: number;
  public space: number;
  public MajorLineEveryNthGridLine: number;

  constructor(id: string = "", parent: Entity | undefined = undefined) {
    super(id, parent);
    this.width = HSConstants.Constants.Canvas_Width;
    this.height = HSConstants.Constants.Canvas_Height;
    this.space = HSConstants.Constants.Grid_Spacing;
    this.MajorLineEveryNthGridLine = HSConstants.Constants.Major_Lines_Every_Nth_Grid_Line;
  }

  canSelect(): boolean {
    return false;
  }
}

Entity.registerClass(HSConstants.ModelClass.NgGrid, Grid);