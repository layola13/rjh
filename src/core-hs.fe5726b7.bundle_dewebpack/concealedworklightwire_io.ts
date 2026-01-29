import { Entity, Entity_IO } from './Entity';
import { EntityField } from './decorators';
import { Loader } from './Loader';

interface SerializedWireData {
  nds?: string[];
  rte?: any[];
}

interface DumpOptions {
  [key: string]: any;
}

export class ConcealedWorkLightWire_IO extends Entity_IO {
  dump(
    entity: ConcealedWorkLightWire,
    context?: any,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): any[] {
    const result = super.dump(entity, undefined, includeMetadata, options);
    const serializedData = result[0];

    if (entity.nodeIds.length) {
      serializedData.nds = entity.nodeIds.map((id) => id);
    }

    if (entity.route.length) {
      serializedData.rte = entity.route.map((item) => item.dump());
    }

    return result;
  }

  load(entity: ConcealedWorkLightWire, data: SerializedWireData, context?: any): void {
    super.load(entity, data, context);

    if (data.rte) {
      Entity_IO.setEntityFields(entity, {
        route: data.rte.map((item) => Loader.load(item))
      });
    }

    if (data.nds) {
      Entity_IO.setEntityFields(entity, {
        nodeIds: data.nds
      });
    }
  }
}

export class ConcealedWorkLightWire extends Entity {
  @EntityField()
  nodeIds: string[] = [];

  @EntityField()
  route: any[] = [];

  getIO(): ConcealedWorkLightWire_IO {
    return ConcealedWorkLightWire_IO.instance();
  }

  get tree(): any | undefined {
    return this.getUniqueParent() || undefined;
  }

  get nodes(): any[] {
    const tree = this.tree;
    const foundNodes = this.nodeIds
      .map((nodeId) => tree?.findById(nodeId))
      .filter((node) => node);

    return foundNodes.length === this.nodeIds.length ? foundNodes : [];
  }

  get startNode(): any | undefined {
    const nodes = this.nodes;
    return nodes && nodes.length > 0 ? nodes[0] : undefined;
  }

  get endNode(): any | undefined {
    const nodes = this.nodes;
    return nodes && nodes.length > 0 ? nodes[nodes.length - 1] : undefined;
  }
}

Entity.registerClass(HSConstants.ModelClass.ConcealedWorkLightWire, ConcealedWorkLightWire);