import { Entity, Entity_IO } from './Entity';
import { EntityField } from './EntityField';
import { Content } from './Content';

interface SerializedConcealedWorkLightLogic {
  rlts?: string[];
  dpn?: string;
  [key: string]: unknown;
}

interface DumpOptions {
  [key: string]: unknown;
}

export class ConcealedWorkLightLogic_IO extends Entity_IO {
  private static _instance: ConcealedWorkLightLogic_IO;

  static instance(): ConcealedWorkLightLogic_IO {
    if (!ConcealedWorkLightLogic_IO._instance) {
      ConcealedWorkLightLogic_IO._instance = new ConcealedWorkLightLogic_IO();
    }
    return ConcealedWorkLightLogic_IO._instance;
  }

  dump(
    entity: ConcealedWorkLightLogic,
    context?: unknown,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): [SerializedConcealedWorkLightLogic, unknown] {
    const result = super.dump(entity, undefined, includeMetadata, options);
    const serialized = result[0] as SerializedConcealedWorkLightLogic;

    if (entity.relations.length) {
      serialized.rlts = entity.relations.map(relation => relation);
    }

    if (entity.displayName) {
      serialized.dpn = entity.displayName;
    }

    return result as [SerializedConcealedWorkLightLogic, unknown];
  }

  load(
    entity: ConcealedWorkLightLogic,
    data: SerializedConcealedWorkLightLogic,
    context?: unknown
  ): void {
    super.load(entity, data, context);

    if (data.rlts) {
      Entity_IO.setEntityFields(entity, {
        relations: data.rlts
      });
    }

    if (data.dpn) {
      Entity_IO.setEntityFields(entity, {
        displayName: data.dpn
      });
    }
  }
}

export class ConcealedWorkLightLogic extends Entity {
  @EntityField()
  displayName: string = "";

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

  get lightControlSystem(): Entity | undefined {
    const parent = this.getUniqueParent();
    if (parent) {
      return parent;
    }
    return undefined;
  }

  getIO(): ConcealedWorkLightLogic_IO {
    return ConcealedWorkLightLogic_IO.instance();
  }
}

Entity.registerClass(HSConstants.ModelClass.ConcealedWorkLightLogic, ConcealedWorkLightLogic);