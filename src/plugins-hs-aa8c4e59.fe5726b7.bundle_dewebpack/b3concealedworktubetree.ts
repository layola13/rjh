import { B3Entity } from './B3Entity';
import { turnEntityToBom3Entity } from './utils';
import { B3ConcealedWorkTube } from './B3ConcealedWorkTube';

interface B3ConcealedWorkTubeTreeData {
  entity: unknown;
  tubes: unknown[];
}

export class B3ConcealedWorkTubeTree extends B3Entity {
  buildBom3Data(entity: any): B3ConcealedWorkTubeTreeData {
    const data: B3ConcealedWorkTubeTreeData = {
      entity: turnEntityToBom3Entity(entity),
      tubes: []
    };

    const children = entity.getChildren();
    data.tubes = children.map((child: any) => {
      return new B3ConcealedWorkTube(this.context).buildBom3Data(child);
    });

    return data;
  }
}