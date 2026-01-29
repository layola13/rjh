import { Entity } from './Entity';

export class AcceptEntity extends Entity {
  private _buildResult?: unknown;
  public source?: unknown;

  /**
   * Gets the build result from the entity construction process
   */
  getBuildResult(): unknown {
    return this._buildResult;
  }

  /**
   * Accepts and processes entity data
   * @param source - The source data to build the entity from
   * @param context - Additional context for building the entity
   */
  accept(source: unknown, context: unknown): this {
    try {
      this.source = source;
      this._buildResult = this.buildEntityData(source, context);
      this.buildChildren(source, context);
    } catch (error) {
      this.legal = false;
      this.errorMsg = error?.toString() ?? 'Unknown error';
      console.warn('build entity error: ', source);
      console.warn(error);
    }
    return this;
  }

  /**
   * Builds entity data from source (to be implemented by subclasses)
   */
  protected buildEntityData(source: unknown, context: unknown): unknown {
    // To be implemented by subclasses
    return undefined;
  }

  /**
   * Builds child entities (to be implemented by subclasses)
   */
  protected buildChildren(source: unknown, context: unknown): void {
    // To be implemented by subclasses
  }
}

/**
 * Wraps a single entity and returns a promise if async build operations are pending
 * @param entity - The entity to wrap
 * @returns The entity itself or a promise resolving to the entity
 */
export function wrapPromiseEntity(entity: Entity): Entity | Promise<Entity> {
  const promises: Promise<unknown>[] = [];
  
  entity.traverse((currentEntity: Entity) => {
    if (currentEntity instanceof AcceptEntity) {
      const buildResult = currentEntity.getBuildResult();
      if (buildResult instanceof Promise) {
        promises.push(buildResult);
      }
    }
    return true;
  });

  return promises.length > 0
    ? Promise.all(promises).then(() => entity)
    : entity;
}

/**
 * Wraps an array of entities and returns a promise if any contain async operations
 * @param entities - Array of entities to wrap
 * @returns The entities array or a promise resolving to the entities
 */
export function wrapPromiseEntities(entities: Entity[]): Entity[] | Promise<Entity[]> {
  const wrappedEntities = entities.map(wrapPromiseEntity);
  
  const hasPromises = wrappedEntities.some((wrapped) => wrapped instanceof Promise);
  
  return hasPromises
    ? Promise.all(
        wrappedEntities.map((wrapped) =>
          wrapped instanceof Entity ? Promise.resolve(wrapped) : wrapped
        )
      )
    : entities;
}