export enum EN_TYPE {
  EN_LEFT = 'EN_LEFT',
  // Add other face types as needed
}

export class Loop {
  constructor(segments: Segment[]) {
    // Implementation
  }

  getBoundingBox(): { min: Vector2; max: Vector2 } {
    // Implementation
    throw new Error('Not implemented');
  }
}

export class Vector2 {
  constructor(public x: number, public y: number) {}

  sqDistanceTo(other: Vector2): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return dx * dx + dy * dy;
  }
}

export interface Segment {
  clone(): Segment;
  translate(vector: Vector2): Segment;
  getStartPt(): Vector2;
}

export interface BodyEntity {
  id: number;
  spaceConstraint?: SpaceConstraint;
  setSpaceConstraint(constraint: SpaceConstraint): void;
}

export type BodyIdInput = number | BodyEntity;

export interface SpaceConstraint {
  bodyId: string;
  constraints: Record<string, Constraint>;
}

export interface Constraint {
  refFace: FaceReference;
}

export interface FaceReference {
  faceId: string;
  bodyId?: string;
}

export interface FaceInfo {
  id: number;
  type: string;
}

/**
 * Utility class for managing spatial constraints on body entities
 */
export class ConstraintUtil {
  /**
   * Converts a body entity or ID to a standardized string ID
   */
  static getBodyIdFromBodyEntity(entity: BodyIdInput): string {
    return typeof entity === 'number' ? `${entity}` : `${entity.id}`;
  }

  /**
   * Extracts the numeric entity ID from a body ID string
   */
  static getEntityIdFromBodyId(bodyId: string): number {
    return Number(bodyId);
  }

  /**
   * Generates a face ID from an entity and face type
   */
  static getFaceIdByEntityAndFaceType(entity: BodyIdInput, faceType: string): string {
    const entityId = typeof entity === 'number' ? entity : entity.id;
    return `${entityId}_${faceType}`;
  }

  /**
   * Extracts the entity ID from a face ID string
   */
  static getEntityIdFromFaceId(faceId: string): number {
    const parts = faceId.split('_');
    return parts.length === 2 ? Number(parts[0]) : 0;
  }

  /**
   * Extracts the face type from a face ID string
   */
  static getFaceTypeFromFaceId(faceId: string): string {
    const parts = faceId.split('_');
    return parts.length === 2 ? parts[1] : EN_TYPE.EN_LEFT;
  }

  /**
   * Parses a face ID into its component parts
   */
  static getFaceInfoFromFaceId(faceId: string): FaceInfo | null {
    const parts = faceId.split('_');
    return parts.length === 2
      ? { id: Number(parts[0]), type: parts[1] }
      : null;
  }

  /**
   * Adds a constraint to a body entity
   */
  static addConstraintToEntity(
    entity: BodyEntity,
    constraintKey: string,
    constraint: Constraint
  ): void {
    const bodyId = ConstraintUtil.getBodyIdFromBodyEntity(entity);
    const spaceConstraint = entity.spaceConstraint ?? {
      bodyId,
      constraints: {},
    };
    spaceConstraint.constraints[constraintKey] = constraint;
    entity.setSpaceConstraint(spaceConstraint);
  }

  /**
   * Removes a constraint from a body entity
   */
  static deleteConstraintOnEntity(entity: BodyEntity, constraintKey: string): void {
    const spaceConstraint = entity.spaceConstraint;
    if (spaceConstraint?.constraints[constraintKey]) {
      delete spaceConstraint.constraints[constraintKey];
      entity.setSpaceConstraint(spaceConstraint);
    }
  }

  /**
   * Updates reference IDs for multiple constraints based on an ID mapping
   */
  static updateConstraintsRefIds(
    constraints: SpaceConstraint[],
    idMapping: Map<number, number>
  ): void {
    constraints.forEach((constraint) => {
      ConstraintUtil.updateConstraintRefIds(constraint, idMapping);
    });
  }

  /**
   * Updates reference IDs for a single constraint based on an ID mapping
   */
  static updateConstraintRefIds(
    spaceConstraint: SpaceConstraint,
    idMapping: Map<number, number>
  ): void {
    const { constraints } = spaceConstraint;
    ConstraintUtil.updateBodyId(spaceConstraint, idMapping);

    for (const key in constraints) {
      if (Object.prototype.hasOwnProperty.call(constraints, key)) {
        const constraint = constraints[key];
        ConstraintUtil.updateBodyId(constraint.refFace, idMapping);
        ConstraintUtil.updateFaceId(constraint.refFace, idMapping);
      }
    }
  }

  /**
   * Updates the body ID on an object based on an ID mapping
   */
  static updateBodyId<T extends { bodyId: string }>(
    obj: T,
    idMapping: Map<number, number>
  ): T {
    const { bodyId } = obj;
    const currentId = ConstraintUtil.getEntityIdFromBodyId(bodyId);
    const newId = idMapping.has(currentId) ? idMapping.get(currentId)! : currentId;
    const newBodyId = ConstraintUtil.getBodyIdFromBodyEntity(newId);
    obj.bodyId = newBodyId;
    return obj;
  }

  /**
   * Updates the face ID on an object based on an ID mapping
   */
  static updateFaceId<T extends { faceId: string }>(
    obj: T,
    idMapping: Map<number, number>
  ): T {
    const { faceId } = obj;
    const faceInfo = ConstraintUtil.getFaceInfoFromFaceId(faceId);

    if (faceInfo) {
      const { id, type } = faceInfo;
      const newId = idMapping.has(id) ? idMapping.get(id)! : id;
      const newFaceId = ConstraintUtil.getFaceIdByEntityAndFaceType(newId, type);
      obj.faceId = newFaceId;
    }

    return obj;
  }

  /**
   * Finds the index of the outer loop start point closest to the origin
   */
  static getFloorOuterStartIndex(segments: Segment[]): number {
    if (segments.length === 0) return -1;
    if (segments.length === 1) return 0;

    const boundingMin = new Loop(segments).getBoundingBox().min;
    const translatedSegments = segments.map((segment) =>
      segment.clone().translate(new Vector2(-boundingMin.x, -boundingMin.y))
    );

    const origin: Vector2 = { x: 0, y: 0 } as Vector2;
    let closestIndex = 0;
    let closestPoint = translatedSegments[closestIndex].getStartPt();
    let minDistance = closestPoint.sqDistanceTo(origin);

    for (let i = 1; i < translatedSegments.length; i++) {
      const startPoint = translatedSegments[i].getStartPt();
      const distance = startPoint.sqDistanceTo(origin);

      if (distance < minDistance) {
        closestIndex = i;
        closestPoint = startPoint;
        minDistance = distance;
      }
    }

    return closestIndex;
  }
}