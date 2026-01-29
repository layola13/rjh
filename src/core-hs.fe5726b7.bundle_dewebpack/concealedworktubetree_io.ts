import { Entity, Entity_IO } from './Entity';
import { ConcealedWorkTree, ConcealedWorkTree_IO } from './ConcealedWorkTree';
import { ConcealedWorkTube } from './ConcealedWorkTube';
import { EntityField } from './decorators';

interface DumpOptions {
  [key: string]: unknown;
}

interface SerializedData {
  dia?: number;
  [key: string]: unknown;
}

export class ConcealedWorkTubeTree_IO extends ConcealedWorkTree_IO {
  dump(
    entity: ConcealedWorkTubeTree,
    context?: unknown,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): [SerializedData, ...unknown[]] {
    const result = super.dump(entity, undefined, includeMetadata, options);
    const serializedData = result[0];

    if (entity.diameter !== undefined) {
      serializedData.dia = entity.diameter;
    }

    return result;
  }

  load(
    entity: ConcealedWorkTubeTree,
    data: SerializedData,
    context?: unknown
  ): void {
    super.load(entity, data, context);

    if (data.dia !== undefined) {
      Entity_IO.setEntityFields(entity, {
        diameter: data.dia
      });
    }
  }
}

export class ConcealedWorkTubeTree extends ConcealedWorkTree {
  @EntityField()
  diameter?: number = undefined;

  protected _children: Record<string, Entity> = {};

  getIO(): ConcealedWorkTubeTree_IO {
    return ConcealedWorkTubeTree_IO.instance();
  }

  get tubes(): ConcealedWorkTube[] {
    let tubes: ConcealedWorkTube[] = [];
    const children = Object.values(this._children);

    if (children.length) {
      tubes = children.filter(
        (child): child is ConcealedWorkTube => child instanceof ConcealedWorkTube
      );
    }

    return tubes;
  }

  findTube(nodes: unknown[]): ConcealedWorkTube | undefined {
    return this.tubes.find((tube) => {
      const tubeNodes = tube.nodes;
      return (
        tubeNodes.length === nodes.length &&
        tubeNodes.every((node, index) => node === nodes[index])
      );
    });
  }

  addTube(tube: ConcealedWorkTube): void {
    this._addCWEntity(this.tubes, tube);
  }

  removeTube(tube: ConcealedWorkTube): void {
    this._removeCWEntity(this.tubes, tube);
  }

  getTube(id: string | number): ConcealedWorkTube | undefined {
    return this._getCWEntity(this.tubes, id);
  }

  protected _addCWEntity(collection: Entity[], entity: Entity): void {
    // Implementation inherited from parent
  }

  protected _removeCWEntity(collection: Entity[], entity: Entity): void {
    // Implementation inherited from parent
  }

  protected _getCWEntity<T extends Entity>(
    collection: T[],
    id: string | number
  ): T | undefined {
    // Implementation inherited from parent
    return undefined;
  }
}

Entity.registerClass(HSConstants.ModelClass.ConcealedWorkTubeTree, ConcealedWorkTubeTree);