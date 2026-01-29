import * as THREE from 'three';
import { Matrix4 } from './Matrix4';
import { EN_TYPE } from './ENType';
import { HSCore } from './HSCore';
import { EntityObject } from './EntityObject';
import { FaceOperator } from './FaceOperator';
import { BodyOperator } from './BodyOperator';
import { ModelUtil } from './ModelUtil';
import { MathUtil } from './MathUtil';
import { createHSBox3 } from './HSBox3';

interface EntityDimensions {
  XLength: number;
  YLength: number;
  ZLength: number;
  x: number;
  y: number;
  z: number;
}

interface EntityFaceInfo {
  entity: EntityObject;
  root: EntityObject;
  face: EN_TYPE;
}

interface PickedEntityFace extends EntityFaceInfo {
  moveable: boolean;
}

interface ValidPickedInfo {
  ef1: PickedEntityFace;
  ef2: PickedEntityFace;
}

interface PositionChange {
  entity: EntityObject;
  position: THREE.Vector3;
}

interface FaceInfo {
  faceId: string;
  surface: unknown;
}

interface FaceDetails {
  id: string;
  type: string;
}

interface BodyEntity {
  id: string;
  forEachFace(callback: (face: FaceInfo) => boolean): boolean;
  getBoundingBox(transform: Matrix4): unknown;
}

type ForEachCallback<K, V> = (key: K, value: V) => boolean | void;

export class SolverUtil {
  /**
   * Iterates over object properties and executes callback
   */
  static forEachIn<T extends Record<string, unknown>>(
    obj: T,
    callback: ForEachCallback<string, T[keyof T]>
  ): void {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && callback(key, obj[key]) === true) {
        return;
      }
    }
  }

  /**
   * Retrieves flattened entity collection from model
   */
  static getFlatEntities(model: unknown): Map<string, EntityObject> {
    return ModelUtil.getFlatEntities(model, BodyOperator.getBodyIdFromBodyEntity);
  }

  /**
   * Validates and extracts picked entity face information
   */
  static getValidPickedInfo(
    entity1: EntityObject | EntityFaceInfo,
    entity2: EntityObject | EntityFaceInfo,
    spaceAxis: number
  ): ValidPickedInfo | false | undefined {
    if (!entity1 || !entity2) {
      return undefined;
    }

    const moveable1 = ModelUtil.couldMove(entity1, spaceAxis);
    const moveable2 = ModelUtil.couldMove(entity2, spaceAxis);

    if (moveable1 > 0 || moveable2 > 0) {
      const root1 = entity1 instanceof EntityObject ? entity1.getTopParent() : entity1.entity;
      const root2 = entity2 instanceof EntityObject ? entity2.getTopParent() : entity2.entity;

      if (root1 === root2) {
        const faceInfo1 = this.getEntityFaceTypeInSpace(entity1, root1, spaceAxis, 1);
        if (!faceInfo1) return undefined;

        const faceInfo2 = this.getEntityFaceTypeInSpace(entity2, root2, spaceAxis, -1);
        if (!faceInfo2) return undefined;

        return {
          ef1: { ...faceInfo1, moveable: moveable1 > 0 },
          ef2: { ...faceInfo2, moveable: moveable2 > 0 }
        };
      }
    } else if (moveable1 === -1 && moveable2 === -1) {
      return false;
    }

    return undefined;
  }

  /**
   * Extracts entities with changed positions from model
   */
  static extractModelChangedProperties(
    bodies: BodyEntity[],
    entityMap: Map<string, EntityObject>,
    model: unknown
  ): PositionChange[] {
    const changes: PositionChange[] = [];

    for (let i = 0; i < bodies.length; i++) {
      const body = bodies[i];
      const { id } = body;
      const entity = entityMap.get(id);

      if (!entity) continue;

      if (entity.getUniqueParent()) {
        const transformMatrix = new Matrix4().fromArray(
          HSCore.Util.Matrix3DHandler.getEntityA2BMatrix(model, entity).toArray()
        );
        const bodyBox = this.getBodyBox(body, transformMatrix);
        const entityBox = this.getEntityBoxBasedOnCenter(entity);
        const distance = MathUtil.distanceOfBox(bodyBox, entityBox);
        const distanceLength = distance.distanceTo({ x: 0, y: 0, z: 0 });

        const EPSILON = 1e-6;
        if (Math.abs(distanceLength) > EPSILON) {
          const entityMatrix = new Matrix4().fromArray(
            HSCore.Util.Matrix3DHandler.getMatrix4(entity).toArray()
          );
          distance.vecTransform(entityMatrix);

          const { x, y, z } = entity;
          const newPosition = new THREE.Vector3(x, y, z).add(distance);
          changes.push({ entity, position: newPosition });
        }
      }
    }

    return changes;
  }

  /**
   * Returns the opposite face type
   */
  static getOppositeFaceType(faceType: EN_TYPE): EN_TYPE | undefined {
    return OPPOSITE_FACE_MAP.get(faceType);
  }

  /**
   * Filters bodies that have changed in the model
   */
  static getChangedBodys(
    bodies: BodyEntity[],
    model: unknown,
    flatEntities?: Map<string, EntityObject>
  ): BodyEntity[] {
    const entities = flatEntities ?? this.getFlatEntities(model);
    return bodies.filter(body => this.isBodyChanged(body, model, entities));
  }

  /**
   * Checks if a body has changed
   */
  static isBodyChanged(
    body: BodyEntity,
    model: unknown,
    flatEntities: Map<string, EntityObject>
  ): boolean {
    const { id } = body;
    let hasChanged = false;

    if (flatEntities.has(id)) {
      hasChanged = body.forEachFace(face => this.isFaceChanged(face, model, flatEntities));
    }

    return hasChanged;
  }

  /**
   * Checks if a face has changed
   */
  static isFaceChanged(
    face: FaceInfo,
    model: unknown,
    flatEntities: Map<string, EntityObject>
  ): boolean {
    const { faceId, surface } = face;
    const faceDetails = FaceOperator.getFaceInfoFromFaceId(faceId);

    if (!faceDetails) return false;

    const { id, type } = faceDetails;
    const bodyId = BodyOperator.getBodyIdFromBodyEntity(id);
    const entity = flatEntities.get(bodyId);

    if (entity) {
      const newSurface = MathUtil.createSurfaceInRootCoordSys(entity, model, type);
      return !MathUtil.isSurfaceEqual(surface, newSurface);
    }

    return false;
  }

  /**
   * Gets bounding box for a body
   */
  static getBodyBox(body: BodyEntity, transform: Matrix4): unknown {
    return body.getBoundingBox(transform);
  }

  /**
   * Gets entity bounding box in local coordinates
   */
  static getEntityBox(entity: EntityDimensions, transform?: unknown): unknown {
    const { XLength, YLength, ZLength } = entity;
    const maxX = XLength;
    const minY = -YLength;
    const maxZ = ZLength;

    return createHSBox3({ x: 0, y: minY, z: 0 }, { x: maxX, y: 0, z: maxZ }, transform);
  }

  /**
   * Gets entity bounding box centered at origin
   */
  static getEntityBoxBasedOnCenter(entity: EntityDimensions, transform?: unknown): unknown {
    const { XLength, YLength, ZLength } = entity;
    const minX = -XLength / 2;
    const maxX = XLength / 2;
    const minY = -YLength / 2;
    const maxY = YLength / 2;
    const maxZ = ZLength;

    return createHSBox3({ x: minX, y: minY, z: 0 }, { x: maxX, y: maxY, z: maxZ }, transform);
  }

  /**
   * Determines which face of an entity is aligned with a space direction
   */
  static getEntityFaceTypeInSpace(
    entity: EntityObject | EntityFaceInfo,
    root: EntityObject,
    axis: number,
    direction: number
  ): EntityFaceInfo | null {
    if (!(entity instanceof EntityObject)) {
      return entity;
    }

    const directionVector = new THREE.Vector3();
    directionVector.setComponent(axis, direction);

    const faceTypes = [
      EN_TYPE.EN_LEFT,
      EN_TYPE.EN_RIGHT,
      EN_TYPE.EN_FRONT,
      EN_TYPE.EN_BACK,
      EN_TYPE.EN_BOTTOM,
      EN_TYPE.EN_TOP
    ];

    const rotationMatrix = new THREE.Matrix4().extractRotation(
      HSCore.Util.Matrix3DHandler.getEntityA2BMatrix(entity, root)
    );

    const testVector = new THREE.Vector3();
    const ALIGNMENT_THRESHOLD = 0.99;

    for (let i = 0; i < 3; i++) {
      testVector.set(0, 0, 0);
      testVector.setComponent(i, -1);
      testVector.applyMatrix4(rotationMatrix);

      if (directionVector.dot(testVector) > ALIGNMENT_THRESHOLD) {
        return { entity, root, face: faceTypes[2 * i] };
      }

      testVector.set(0, 0, 0);
      testVector.setComponent(i, 1);
      testVector.applyMatrix4(rotationMatrix);

      if (directionVector.dot(testVector) > ALIGNMENT_THRESHOLD) {
        return { entity, root, face: faceTypes[2 * i + 1] };
      }
    }

    return null;
  }
}

const OPPOSITE_FACE_MAP = new Map<EN_TYPE, EN_TYPE>([
  [EN_TYPE.EN_LEFT, EN_TYPE.EN_RIGHT],
  [EN_TYPE.EN_RIGHT, EN_TYPE.EN_LEFT],
  [EN_TYPE.EN_FRONT, EN_TYPE.EN_BACK],
  [EN_TYPE.EN_BACK, EN_TYPE.EN_FRONT],
  [EN_TYPE.EN_BOTTOM, EN_TYPE.EN_TOP],
  [EN_TYPE.EN_TOP, EN_TYPE.EN_BOTTOM]
]);