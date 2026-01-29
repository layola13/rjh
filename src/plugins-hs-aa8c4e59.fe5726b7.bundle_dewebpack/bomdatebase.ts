import { BomData, Entity } from './321465';

interface GroupResult<T, K> {
  groupKey: K;
  entities: T[];
}

interface QueryOption {
  recursion?: boolean;
  hitStopRecursion?: boolean;
}

interface Predicate<T> {
  execute(entity: T): boolean;
}

type EqualityComparer<K> = (a: K, b: K) => boolean;

export function groupBy<T, K>(
  entities: T[],
  keySelector: (entity: T) => K,
  equalityComparer?: EqualityComparer<K>
): GroupResult<T, K>[] {
  const comparer = equalityComparer || ((a: K, b: K) => a === b);
  const groups: GroupResult<T, K>[] = [];

  for (const entity of entities) {
    const key = keySelector(entity);
    let found = false;

    for (const group of groups) {
      if (comparer(group.groupKey, key)) {
        group.entities.push(entity);
        found = true;
        break;
      }
    }

    if (!found) {
      groups.push({
        groupKey: key,
        entities: [entity]
      });
    }
  }

  return groups;
}

export function groupByStringKey<T>(
  entities: T[],
  keySelector: (entity: T) => string
): Map<string, T[]> {
  const map = new Map<string, T[]>();

  for (const entity of entities) {
    const key = keySelector(entity);
    if (map.has(key)) {
      map.get(key)!.push(entity);
    } else {
      map.set(key, [entity]);
    }
  }

  return map;
}

export function count<T>(entities: T[]): number {
  return entities.length;
}

export class BomDateBase {
  private bomData: BomData;

  constructor(bomData: BomData) {
    this.bomData = bomData;
  }

  /**
   * Get entities from BomData, Entity, or array of entities
   */
  getEntities(source: BomData | Entity | Entity[]): Entity[] {
    if (source instanceof BomData) {
      return source.getRootEntities();
    }
    if (source instanceof Entity) {
      return [source];
    }
    return source;
  }

  /**
   * Get entity by ID
   */
  getEntity(entityId: string): Entity | undefined {
    return this.bomData.getEntity(entityId);
  }

  /**
   * Find all entities matching the predicate
   */
  findAll(
    source: BomData | Entity | Entity[],
    predicate: Predicate<Entity>,
    options?: QueryOption
  ): Entity[] {
    const results: Entity[] = [];
    const entities = this.getEntities(source);

    for (const entity of entities) {
      if (!this.bomData.isEntityMatchOption(entity.getId(), options)) {
        continue;
      }

      if (options?.recursion) {
        entity.traverse((current: Entity) => {
          if (!predicate.execute(current)) {
            return true;
          }
          results.push(current);
          return !options?.hitStopRecursion;
        });
      } else if (predicate.execute(entity)) {
        results.push(entity);
      }
    }

    return results;
  }

  /**
   * Find first entity matching the predicate
   */
  find(
    source: BomData | Entity | Entity[],
    predicate: Predicate<Entity>,
    options?: QueryOption
  ): Entity | undefined {
    let result: Entity | undefined;
    const entities = this.getEntities(source);

    for (const entity of entities) {
      if (!this.bomData.isEntityMatchOption(entity.getId(), options)) {
        continue;
      }

      if (options?.recursion) {
        entity.traverse((current: Entity) => {
          if (result) {
            return false;
          }
          if (predicate.execute(current)) {
            result = current;
            return false;
          }
          return true;
        });
      } else if (predicate.execute(entity)) {
        return entity;
      }
    }

    return result;
  }

  /**
   * Group entities by key selector
   */
  groupBy<K>(
    source: BomData | Entity | Entity[],
    keySelector: (entity: Entity) => K,
    equalityComparer?: EqualityComparer<K>,
    predicate?: Predicate<Entity>,
    options?: QueryOption
  ): GroupResult<Entity, K>[] {
    const entities = predicate
      ? this.findAll(source, predicate, options)
      : this.getEntities(source);

    return groupBy(entities, keySelector, equalityComparer);
  }

  /**
   * Count entities matching the predicate
   */
  count(
    source: BomData | Entity | Entity[],
    predicate: Predicate<Entity>,
    options?: QueryOption
  ): number {
    return count(this.findAll(source, predicate, options));
  }
}