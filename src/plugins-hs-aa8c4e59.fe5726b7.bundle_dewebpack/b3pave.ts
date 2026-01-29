import { B3Entity } from './B3Entity';
import { B3Region } from './B3Region';
import { turnPaveEntityToBom3Data } from './utils';

export class B3Pave extends B3Entity {
  constructor(context: unknown) {
    super(context);
  }

  buildBom3Data(entity: B3Entity): unknown {
    const children = entity.getChildren();
    const region = new B3Region(this.context);
    return turnPaveEntityToBom3Data(children, region);
  }
}