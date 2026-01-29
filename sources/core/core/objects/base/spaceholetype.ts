import { Entity } from './Entity';

export enum SpaceHoleType {
  Hinge = 1,
  ThreeInOne = 2,
  Groove = 3,
  Shank = 4
}

export class SpaceHole extends Entity {
  private _spaceHoles: unknown[] = [];

  set spaceHoles(holes: unknown[]) {
    this._spaceHoles = holes;
    this.dirtyGeometry();
  }

  get spaceHoles(): unknown[] {
    return this._spaceHoles;
  }

  clearSpaceHoles(): void {
    this._spaceHoles.length = 0;
    this.dirtyGeometry();
  }

  needDump(): boolean {
    return false;
  }

  canTransact(): boolean {
    return false;
  }
}

Entity.registerClass(HSConstants.ModelClass.SpaceHole, SpaceHole);