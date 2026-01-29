import { Matrix4, Euler, Vector3, Quaternion, Math as ThreeMath } from 'three';

interface RotationAngles {
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

interface EntityMatrixData {
  pos: Vector3;
  quat: Quaternion;
  scal: Vector3;
  euler: {
    x: number;
    y: number;
    z: number;
  };
}

interface Entity {
  x?: number;
  y?: number;
  z?: number;
  XRotation?: number;
  YRotation?: number;
  ZRotation?: number;
  XScale?: number;
  YScale?: number;
  ZScale?: number;
  flip?: number;
  parent?: Entity & { shapeRotation?: { x?: number; y?: number; z?: number } };
  ID?: string;
  anchor?: number[];
  anchorAxis?: number[];
  translation?: number[];
  rotation?: {
    anchor: number[];
    anchorAxis: number[];
    angle: number;
  };
  angle?: number;
  animationMatrix4?: Matrix4;
  followParentAnimation?: boolean;
  getFinalZRotation?: () => number;
  getUniqueParent?: () => Entity | undefined;
  getFirstParent?: () => Entity | undefined;
  getFirstParentOfType?: (type: any) => Entity | undefined;
}

const DEGREES_TO_RADIANS = Math.PI / 180;
const FULL_ROTATION_DEGREES = 360;

/**
 * Converts angle from degrees to radians with modulo normalization
 */
const getRotationInRadians = (entity: Entity, key: keyof Entity): number => {
  let angle = (entity[key] as number) || 0;
  angle %= FULL_ROTATION_DEGREES;
  return angle * DEGREES_TO_RADIANS;
};

const sharedEuler = new Euler(0, 0, 0, 'XYZ');

export const Matrix3DHandler = {
  /**
   * Generates a 4x4 transformation matrix for an entity
   */
  getMatrix4(entity: Entity, applyFlip?: boolean): Matrix4 {
    const posX = entity.x || 0;
    const posY = entity.y || 0;
    const posZ = entity.z || 0;

    const rotationX = getRotationInRadians(entity, 'XRotation');
    const rotationY = getRotationInRadians(entity, 'YRotation');
    let rotationZ = getRotationInRadians(entity, 'ZRotation');

    if ((entity as any) instanceof HSCore.Model.ParametricDoor && entity.getFinalZRotation) {
      rotationZ = entity.getFinalZRotation();
    }

    let scaleX = entity.XScale || 1;
    const scaleY = entity.YScale || 1;
    const scaleZ = entity.ZScale || 1;

    if (applyFlip) {
      const { flip } = entity;
      if (flip === 1) {
        scaleX *= -1;
      }
    }

    sharedEuler.set(-rotationX, -rotationY, -rotationZ);

    const matrix = new Matrix4();
    matrix.makeRotationFromEuler(sharedEuler);

    const elements = matrix.elements;
    elements[12] = posX;
    elements[13] = posY;
    elements[14] = posZ;

    if (scaleX !== 1) {
      elements[0] *= scaleX;
      elements[1] *= scaleX;
      elements[2] *= scaleX;
    }

    if (scaleY !== 1) {
      elements[4] *= scaleY;
      elements[5] *= scaleY;
      elements[6] *= scaleY;
    }

    if (scaleZ !== 1) {
      elements[8] *= scaleZ;
      elements[9] *= scaleZ;
      elements[10] *= scaleZ;
    }

    return matrix;
  },

  /**
   * Gets transformation matrix with animation applied
   */
  getMatrix4WithAnimationMat(entity: Entity, applyFlip?: boolean): Matrix4 {
    let matrix = Matrix3DHandler.getMatrix4(entity, applyFlip);
    const animationLastMatrix = Matrix3DHandler.getAnimationLastMatrix4(entity);
    const inverseAnimationMatrix = Matrix3DHandler.getInverseAnimationMatrix4(entity);

    if (inverseAnimationMatrix) {
      matrix = inverseAnimationMatrix.multiply(matrix);
    }

    if (animationLastMatrix) {
      matrix = matrix.multiply(animationLastMatrix);
    }

    return matrix;
  },

  /**
   * Computes global transformation matrix from entity to world space
   */
  getGlobalMatrix4(entity: Entity, applyFlip?: boolean): Matrix4 {
    const globalMatrix = new Matrix4();
    const pathToRoot = Matrix3DHandler.entityToRootPath(entity);

    for (const currentEntity of pathToRoot) {
      const entityMatrix = Matrix3DHandler.getMatrix4WithAnimationMat(currentEntity, applyFlip);
      const parentShapeRotation = currentEntity.parent?.shapeRotation;

      if (parentShapeRotation) {
        const shapeRotationMatrix = new Matrix4();
        sharedEuler.set(
          -(parentShapeRotation.x || 0) * DEGREES_TO_RADIANS,
          -(parentShapeRotation.y || 0) * DEGREES_TO_RADIANS,
          -(parentShapeRotation.z || 0) * DEGREES_TO_RADIANS
        );
        shapeRotationMatrix.makeRotationFromEuler(sharedEuler);
        entityMatrix.premultiply(shapeRotationMatrix);
      }

      globalMatrix.premultiply(entityMatrix);
    }

    return globalMatrix;
  },

  /**
   * Gets global matrix excluding self animation
   */
  getGlobalMatrix4WithoutSelfAnimationMat(entity: Entity, applyFlip?: boolean): Matrix4 {
    const globalMatrix = new Matrix4();
    const pathToRoot = Matrix3DHandler.entityToRootPath(entity);

    for (const currentEntity of pathToRoot) {
      const entityMatrix = currentEntity.ID === entity.ID
        ? Matrix3DHandler.getMatrix4(currentEntity, applyFlip)
        : Matrix3DHandler.getMatrix4WithAnimationMat(currentEntity, applyFlip);

      globalMatrix.premultiply(entityMatrix);
    }

    return globalMatrix;
  },

  /**
   * Retrieves the last animation matrix for an entity
   */
  getAnimationLastMatrix4(entity: Entity): Matrix4 | undefined {
    if (entity.anchor !== undefined && entity.anchorAxis !== undefined && entity.translation !== undefined) {
      return Matrix3DHandler.getAnimationMatrix4(entity);
    }

    return entity.animationMatrix4?.clone();
  },

  /**
   * Gets inverse animation matrix from parent if needed
   */
  getInverseAnimationMatrix4(entity: Entity): Matrix4 | undefined {
    const parent = entity.parent;

    if (parent && entity.followParentAnimation === false) {
      const parentAnimationMatrix = Matrix3DHandler.getAnimationLastMatrix4(parent);
      if (parentAnimationMatrix) {
        return new Matrix4().getInverse(parentAnimationMatrix);
      }
    }

    return undefined;
  },

  /**
   * Computes animation transformation matrix from rotation and translation
   */
  getAnimationInfoMatrix(animationInfo: { rotation?: { anchor: number[]; anchorAxis: number[]; angle: number }; translation?: number[] }): Matrix4 {
    const resultMatrix = new Matrix4();
    const tempMatrix = new Matrix4();
    const rotation = animationInfo.rotation;
    const translation = animationInfo.translation;

    if (rotation) {
      const rotationMatrix = new Matrix4();
      const angleInRadians = HSCore.Util.Math.toRadians(rotation.angle % FULL_ROTATION_DEGREES);

      tempMatrix.identity();
      rotationMatrix.multiply(tempMatrix.makeTranslation(rotation.anchor[0], rotation.anchor[1], rotation.anchor[2]));

      tempMatrix.identity();
      rotationMatrix.multiply(
        tempMatrix.makeRotationAxis(
          new Vector3(rotation.anchorAxis[0], rotation.anchorAxis[1], rotation.anchorAxis[2]),
          -angleInRadians
        )
      );

      tempMatrix.identity();
      rotationMatrix.multiply(tempMatrix.makeTranslation(-rotation.anchor[0], -rotation.anchor[1], -rotation.anchor[2]));

      resultMatrix.multiply(rotationMatrix);
    }

    if (translation) {
      resultMatrix.multiply(new Matrix4().makeTranslation(translation[0], translation[1], translation[2]));
    }

    return resultMatrix;
  },

  /**
   * Generates animation matrix from entity properties
   */
  getAnimationMatrix4(entity: Entity): Matrix4 {
    const hasRotationAnimation = entity.anchor !== undefined && entity.anchorAxis !== undefined && entity.angle !== undefined && entity.angle !== 0;

    let animationMatrix: Matrix4 | undefined;

    if (hasRotationAnimation) {
      animationMatrix = this.createRotationAnimationMatrix(entity);
    }

    if (entity.translation !== undefined) {
      const translation = entity.translation;

      if (animationMatrix === undefined) {
        animationMatrix = new Matrix4();
        animationMatrix.makeTranslation(translation[0], translation[1], translation[2]);
      } else {
        const elements = animationMatrix.elements;
        elements[12] += elements[0] * translation[0] + elements[4] * translation[1] + elements[8] * translation[2];
        elements[13] += elements[1] * translation[0] + elements[5] * translation[1] + elements[9] * translation[2];
        elements[14] += elements[2] * translation[0] + elements[6] * translation[1] + elements[10] * translation[2];
      }
    }

    return animationMatrix ?? new Matrix4();
  },

  /**
   * Creates rotation animation matrix from entity anchor and axis
   */
  createRotationAnimationMatrix(entity: Entity): Matrix4 {
    const matrix = new Matrix4();
    const angleInRadians = getRotationInRadians(entity, 'angle');
    const anchor = entity.anchor!;
    const anchorAxis = entity.anchorAxis!;

    matrix.makeRotationAxis(new Vector3(anchorAxis[0], anchorAxis[1], anchorAxis[2]), -angleInRadians);

    const elements = matrix.elements;
    elements[12] = anchor[0] - elements[0] * anchor[0] - elements[4] * anchor[1] - elements[8] * anchor[2];
    elements[13] = anchor[1] - elements[1] * anchor[0] - elements[5] * anchor[1] - elements[9] * anchor[2];
    elements[14] = anchor[2] - elements[2] * anchor[0] - elements[6] * anchor[1] - elements[10] * anchor[2];

    return matrix;
  },

  /**
   * Builds path from entity to root parent
   */
  entityToRootPath(entity: Entity): Entity[] {
    const path: Entity[] = [];
    let current: Entity | undefined = entity;

    while (current && !((current as any) instanceof HSCore.Model.Layer)) {
      path.push(current);
      current = current.getUniqueParent?.() || current.getFirstParent?.();
    }

    return path;
  },

  /**
   * Converts quaternion to Euler angles
   */
  convertQuaternion2euler(quaternion: Quaternion): RotationAngles {
    const xRotation = Math.atan2(
      2 * (quaternion.w * quaternion.x + quaternion.y * quaternion.z),
      1 - 2 * (quaternion.x * quaternion.x + quaternion.y * quaternion.y)
    );

    const yRotation = Math.asin(2 * (quaternion.w * quaternion.y - quaternion.z * quaternion.x));

    const zRotation = Math.atan2(
      2 * (quaternion.w * quaternion.z + quaternion.x * quaternion.y),
      1 - 2 * (quaternion.y * quaternion.y + quaternion.z * quaternion.z)
    );

    return {
      XRotation: ThreeMath.radToDeg(xRotation),
      YRotation: ThreeMath.radToDeg(yRotation),
      ZRotation: ThreeMath.radToDeg(zRotation)
    };
  },

  /**
   * Decomposes entity global matrix into position, rotation and scale
   */
  getEntityMatrixData(entity: Entity, applyFlip?: boolean): EntityMatrixData {
    const globalMatrix = Matrix3DHandler.getGlobalMatrix4(entity, applyFlip);
    const position = new Vector3();
    const quaternion = new Quaternion();
    const scale = new Vector3(1, 1, 1);

    globalMatrix.decompose(position, quaternion, scale);

    const { XRotation, YRotation, ZRotation } = Matrix3DHandler.convertQuaternion2euler(quaternion);

    return {
      pos: position,
      quat: quaternion,
      scal: scale,
      euler: {
        x: XRotation,
        y: YRotation,
        z: ZRotation
      }
    };
  },

  /**
   * Gets global rotation matrix of top-level assembly containing entity
   */
  getContentTopPAssemblyGlobalRotationMatrix4(entity: Entity, applyFlip?: boolean): Matrix4 {
    const rotationMatrix = new Matrix4();
    const pContent = entity.getFirstParentOfType?.(HSCore.Model.PContent);

    if (pContent) {
      const parent = pContent.getUniqueParent?.();
      if (parent) {
        const parentGlobalMatrix = Matrix3DHandler.getGlobalMatrix4(parent, applyFlip);
        rotationMatrix.extractRotation(parentGlobalMatrix);
      }
    }

    return rotationMatrix;
  },

  /**
   * Extracts rotation matrix from PContent parent
   */
  getPContentRotationMatrix4(entity: Entity, applyFlip?: boolean): Matrix4 {
    const rotationMatrix = new Matrix4();
    const pContent = entity.getFirstParentOfType?.(HSCore.Model.PContent);

    if (pContent) {
      const pContentMatrix = Matrix3DHandler.getMatrix4WithAnimationMat(pContent, applyFlip);
      rotationMatrix.extractRotation(pContentMatrix);
    }

    return rotationMatrix;
  },

  /**
   * Checks if a 3x3 matrix is identity
   */
  isIdentityMat3(matrix?: Matrix4 | number[]): boolean {
    if (!matrix) {
      return true;
    }

    let elements: number[];

    if (Array.isArray(matrix)) {
      elements = matrix;
    } else {
      elements = matrix.elements;
    }

    if (!elements || !elements.length) {
      return true;
    }

    const scaleX = elements[0];
    const scaleY = elements[4];
    const scaleZ = elements[8];

    const isDiagonalIdentity =
      GeLib.MathUtils.nearlyEqual(scaleX, 1) &&
      GeLib.MathUtils.nearlyEqual(scaleY, 1) &&
      GeLib.MathUtils.nearlyEqual(scaleZ, 1);

    const areOffDiagonalsZero =
      GeLib.MathUtils.isZero(elements[1]) &&
      GeLib.MathUtils.isZero(elements[2]) &&
      GeLib.MathUtils.isZero(elements[3]) &&
      GeLib.MathUtils.isZero(elements[5]) &&
      GeLib.MathUtils.isZero(elements[6]) &&
      GeLib.MathUtils.isZero(elements[7]);

    return isDiagonalIdentity && areOffDiagonalsZero;
  },

  /**
   * Computes transformation matrix from entity A to entity B's coordinate space
   */
  getEntityA2BMatrix(entityA: Entity, entityB: Entity): Matrix4 {
    const entityBGlobalMatrix = HSCore.Util.Matrix3DHandler.getGlobalMatrix4(entityB);
    const inverseMatrixB = new Matrix4();
    inverseMatrixB.getInverse(entityBGlobalMatrix);

    const entityAGlobalMatrix = HSCore.Util.Matrix3DHandler.getGlobalMatrix4(entityA);

    return inverseMatrixB.multiply(entityAGlobalMatrix);
  }
};