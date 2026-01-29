import { Entity, Entity_IO } from './Entity';
import { ConcealedWorkCompEntity, ConcealedWorkCompEntity_IO } from './ConcealedWorkCompEntity';
import { EntityField } from './decorators';
import { Content } from './Content';

interface DumpOptions {
  [key: string]: unknown;
}

interface SerializedCircuit {
  rlts?: string[];
  [key: string]: unknown;
}

export class ConcealedWorkCircuit_IO extends ConcealedWorkCompEntity_IO {
  dump(
    entity: ConcealedWorkCircuit,
    context?: unknown,
    includeRelations: boolean = true,
    options: DumpOptions = {}
  ): [SerializedCircuit, unknown] {
    const result = super.dump(entity, undefined, includeRelations, options);
    const serialized = result[0];

    if (entity.relations.length) {
      serialized.rlts = entity.relations.map(relation => relation);
    }

    return result;
  }

  load(
    entity: ConcealedWorkCircuit,
    data: SerializedCircuit,
    context?: unknown
  ): void {
    super.load(entity, data, context);

    if (data.rlts) {
      Entity_IO.setEntityFields(entity, {
        relations: data.rlts
      });
    }
  }

  static instance(): ConcealedWorkCircuit_IO {
    return new ConcealedWorkCircuit_IO();
  }
}

export class ConcealedWorkCircuit extends ConcealedWorkCompEntity {
  @EntityField()
  relations: string[] = [];

  get contents(): Content[] {
    return this.relations
      .map(relationId => {
        const entity = this.doc.getEntityById(relationId);
        return entity instanceof Content ? entity : undefined;
      })
      .filter((entity): entity is Content => entity !== undefined);
  }

  get powerSystem(): Entity | undefined {
    const parent = this.getUniqueParent();
    if (parent) {
      return parent;
    }
    return undefined;
  }

  getIO(): ConcealedWorkCircuit_IO {
    return ConcealedWorkCircuit_IO.instance();
  }
}

Entity.registerClass(HSConstants.ModelClass.ConcealedWorkCircuit, ConcealedWorkCircuit);