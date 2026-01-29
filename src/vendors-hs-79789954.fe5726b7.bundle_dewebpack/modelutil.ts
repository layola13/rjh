import * as THREE from 'three';
import { HSCore } from './HSCore';
import { EntityObject } from './EntityObject';

interface SoulData {
  newAdded?: boolean;
  adsorbInfo?: {
    functionAdsorb?: {
      x?: { adapt?: boolean };
      y?: { adapt?: boolean };
      z?: { adapt?: boolean };
    };
  };
}

interface Entity extends EntityObject {
  id: string;
  soulData?: SoulData;
  getTopParent(): Entity;
  getFirstParent(): Entity | null;
  traverse(callback: (entity: Entity) => void): void;
}

export class ModelUtil {
  /**
   * Check if an entity could move in the specified axis direction
   * @param entity - The entity to check
   * @param axis - The axis index (0=x, 1=y, 2=z)
   * @returns 1 if moveable, -1 if not moveable, 0 if not an EntityObject
   */
  static couldMove(entity: unknown, axis: number): number {
    if (entity instanceof EntityObject) {
      return ModelUtil.isEntityMoveable(entity as Entity, axis) ? 1 : -1;
    }
    return 0;
  }

  /**
   * Determine if an entity is moveable along a specific axis
   * @param entity - The entity to check
   * @param axis - The axis index (0=x, 1=y, 2=z)
   * @returns true if the entity can move along the axis
   */
  static isEntityMoveable(entity: Entity, axis: number): boolean {
    if (!ModelUtil.isNewAddEntity(entity)) {
      return false;
    }

    const topParent = entity.getTopParent();
    const rotationMatrix = new THREE.Matrix4().extractRotation(
      HSCore.Util.Matrix3DHandler.getEntityA2BMatrix(topParent, entity)
    );

    const directionVector = new THREE.Vector3();
    directionVector.setComponent(axis, 1);
    directionVector.applyMatrix4(rotationMatrix);

    const alignedAxisIndex = directionVector
      .toArray()
      .findIndex((component) => 
        HSCore.Util.Math.nearlyEquals(Math.abs(component), 1)
      );

    const effectiveAxis = alignedAxisIndex < 0 ? axis : alignedAxisIndex;

    const adaptFlags = [
      ModelUtil.couldXAdapt(entity),
      ModelUtil.couldYAdapt(entity),
      ModelUtil.couldZAdapt(entity)
    ];

    return !adaptFlags[effectiveAxis];
  }

  /**
   * Check if an entity is rigid
   * @returns Always returns true
   */
  static isRigidEntity(): boolean {
    return true;
  }

  /**
   * Check if an entity is fixed (not newly added)
   * @param entity - The entity to check
   * @returns true if the entity is fixed
   */
  static isFixedEntity(entity: Entity): boolean {
    return !ModelUtil.isNewAddEntity(entity);
  }

  /**
   * Check if an entity is a PM model entity
   * @param entity - The entity to check
   * @returns true if it's a PM model entity
   */
  static isPmModelEntity(entity: Entity): boolean {
    return ModelUtil.isNewAddEntity(entity);
  }

  /**
   * Check if an entity is a child of a PM model
   * @param entity - The entity to check
   * @returns true if it's a child of a PM model
   */
  static isPmModelChild(entity: Entity): boolean {
    let parent = entity.getFirstParent();
    
    while (parent) {
      if (ModelUtil.isPmModelEntity(parent)) {
        return true;
      }
      parent = parent.getFirstParent();
    }
    
    return false;
  }

  /**
   * Check if an entity is a PM model or one of its children
   * @param entity - The entity to check
   * @returns true if it's a PM model or its child
   */
  static isPmModelOrHisChildren(entity: Entity): boolean {
    return ModelUtil.isPmModelEntity(entity) || ModelUtil.isPmModelChild(entity);
  }

  /**
   * Get the PM model ancestor of an entity
   * @param entity - The entity to start from
   * @returns The PM model entity or undefined
   */
  static getPmModel(entity: Entity): Entity | undefined {
    let current: Entity | null = entity;
    
    while (current) {
      if (ModelUtil.isPmModelEntity(current)) {
        return current;
      }
      current = current.getFirstParent();
    }
    
    return undefined;
  }

  /**
   * Flatten entity hierarchy into a map
   * @param entity - The root entity
   * @param keyExtractor - Function to extract key from entity
   * @returns Map of keys to entities
   */
  static getFlatEntities<K>(
    entity: Entity,
    keyExtractor: (entity: Entity) => K
  ): Map<K, Entity> {
    const entityMap = new Map<K, Entity>();
    
    entity.traverse((currentEntity) => {
      entityMap.set(keyExtractor(currentEntity), currentEntity);
    });
    
    return entityMap;
  }

  /**
   * Check if an entity is newly added
   * @param entity - The entity to check
   * @returns true if the entity is newly added
   */
  static isNewAddEntity(entity: Entity): boolean {
    return entity.soulData?.newAdded ?? false;
  }

  /**
   * Check if entity can adapt along X axis
   * @param entity - The entity to check
   * @returns true if X axis adaptation is enabled
   */
  static couldXAdapt(entity: Entity): boolean {
    return entity.soulData?.adsorbInfo?.functionAdsorb?.x?.adapt ?? false;
  }

  /**
   * Check if entity can adapt along Y axis (mapped to Z in adsorb info)
   * @param entity - The entity to check
   * @returns true if Y axis adaptation is enabled
   */
  static couldYAdapt(entity: Entity): boolean {
    return entity.soulData?.adsorbInfo?.functionAdsorb?.z?.adapt ?? false;
  }

  /**
   * Check if entity can adapt along Z axis (mapped to Y in adsorb info)
   * @param entity - The entity to check
   * @returns true if Z axis adaptation is enabled
   */
  static couldZAdapt(entity: Entity): boolean {
    return entity.soulData?.adsorbInfo?.functionAdsorb?.y?.adapt ?? false;
  }

  /**
   * Get all ancestor nodes from entity to root
   * @param entity - The starting entity
   * @param entityMap - Optional map to lookup entities by ID
   * @returns Array of entities from entity to root
   */
  static getToRootNodes(
    entity: Entity,
    entityMap?: Map<string, Entity>
  ): Entity[] {
    const ancestorNodes: Entity[] = [];
    let currentEntity: Entity | null = entity;
    
    while (currentEntity) {
      ancestorNodes.push(entityMap?.get(currentEntity.id) ?? currentEntity);
      currentEntity = currentEntity.getFirstParent();
    }
    
    return ancestorNodes;
  }
}