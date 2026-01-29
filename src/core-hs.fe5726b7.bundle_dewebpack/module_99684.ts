interface Point2D {
  x: number;
  y: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface BoundSquare {
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
  minZ: number;
  maxZ: number;
}

interface BoundBox3D {
  left: number;
  right: number;
  bottom: number;
  top: number;
  front: number;
  back: number;
  square: BoundSquare;
  center: Point3D;
  XSize: number;
  YSize: number;
  ZSize: number;
}

interface EntityWithBounds {
  x: number;
  y: number;
  rotation: number;
  height?: number;
  __direction?: Point3D;
  XLength?: number;
  YLength?: number;
  ZLength?: number;
  isFlagOn?: (flag: unknown) => boolean;
  forEachChild?: (callback: (child: EntityWithBounds) => void) => void;
  getPaths?: () => Point3D[][];
}

interface BoundEntityInfo {
  entity: EntityWithBounds;
  getLocalBound3dPoints: (entity: EntityWithBounds, includeContent?: boolean, useBottomAsOrigin?: boolean) => THREE.Vector3[];
}

export const BoundUtil = {
  /**
   * Get local bound outline points for an entity
   */
  getLocalBoundOutline(
    entity: EntityWithBounds,
    includeContent?: boolean,
    useBottomAsOrigin?: boolean
  ): Point2D[] {
    const boundBox = BoundUtil.getLocalBoundBox3d(entity, includeContent, useBottomAsOrigin);
    
    if (!boundBox) {
      return [];
    }

    return [
      { x: boundBox.square.minX, y: boundBox.square.minY },
      { x: boundBox.square.maxX, y: boundBox.square.minY },
      { x: boundBox.square.maxX, y: boundBox.square.maxY },
      { x: boundBox.square.minX, y: boundBox.square.maxY }
    ];
  },

  /**
   * Get global bound outline points with rotation applied
   */
  getBoundOutline(
    entity: EntityWithBounds,
    includeContent?: boolean,
    useBottomAsOrigin?: boolean
  ): Point2D[] {
    const localOutline = BoundUtil.getLocalBoundOutline(entity, includeContent, useBottomAsOrigin);
    
    if (!localOutline || localOutline.length === 0) {
      return [];
    }

    const origin: Point2D = { x: 0, y: 0 };
    
    return localOutline.map(point => 
      HSCore.Util.Math.rotatePointCW(origin, point, entity.rotation).add(entity)
    );
  },

  /**
   * Get local bounding box in 3D space
   */
  getLocalBoundBox3d(
    entity: EntityWithBounds,
    includeContent?: boolean,
    useBottomAsOrigin?: boolean
  ): BoundBox3D | null {
    const points = BoundUtil.getLocalBound3dPoints(entity, includeContent, useBottomAsOrigin);
    return BoundUtil.getBoundBox(points);
  },

  /**
   * Get bounding box in 3D space with transformation applied
   */
  getBoundingBox3d(
    entity: EntityWithBounds,
    includeContent?: boolean,
    useBottomAsOrigin?: boolean
  ): BoundBox3D | null {
    const points = BoundUtil.getBound3dPoints(entity, includeContent, useBottomAsOrigin);
    return BoundUtil.getBoundBox(points);
  },

  /**
   * Get local 3D bound points based on entity type
   */
  getLocalBound3dPoints(
    entity: EntityWithBounds,
    includeContent?: boolean,
    useBottomAsOrigin?: boolean
  ): THREE.Vector3[] {
    if (entity instanceof HSCore.Model.DExtruding) {
      return BoundUtil.getExtrudingLocalBound3dPoints(entity);
    }
    
    if (entity instanceof HSCore.Model.DContent) {
      return BoundUtil.getDContentLocalBound3dPoints(entity, useBottomAsOrigin);
    }
    
    if (entity instanceof HSCore.Model.DAssembly) {
      return BoundUtil.getDAssemblyLocalBound3dPoints(entity, includeContent, useBottomAsOrigin);
    }
    
    if (entity instanceof HSCore.Model.Content) {
      return BoundUtil.getContentLocalBound3dPoints(entity, useBottomAsOrigin);
    }
    
    return [];
  },

  /**
   * Get 3D bound points with transformation matrix applied
   */
  getBound3dPoints(
    entity: EntityWithBounds,
    includeContent?: boolean,
    useBottomAsOrigin?: boolean,
    transformMatrix?: THREE.Matrix4
  ): THREE.Vector3[] {
    const localPoints = BoundUtil.getLocalBound3dPoints(entity, includeContent, useBottomAsOrigin);
    
    if (!localPoints || localPoints.length === 0) {
      return [];
    }

    const matrix = transformMatrix ?? HSCore.Util.Matrix3DHandler.getMatrix4(entity);
    return localPoints.map(point => point.applyMatrix4(matrix));
  },

  /**
   * Get global 3D bound points in world space
   */
  getGlobalBound3dPoints(
    entity: EntityWithBounds,
    includeContent?: boolean,
    useBottomAsOrigin?: boolean
  ): THREE.Vector3[] {
    const localPoints = BoundUtil.getLocalBound3dPoints(entity, includeContent, useBottomAsOrigin);
    
    if (!localPoints || localPoints.length === 0) {
      return [];
    }

    const globalMatrix = HSCore.Util.Matrix3DHandler.getGlobalMatrix4(entity);
    return localPoints.map(point => point.applyMatrix4(globalMatrix));
  },

  /**
   * Get global bounding box in world space
   */
  getGlobalBoundingBox3d(
    entity: EntityWithBounds,
    includeContent?: boolean,
    useBottomAsOrigin?: boolean
  ): BoundBox3D | null {
    const globalPoints = BoundUtil.getGlobalBound3dPoints(entity, includeContent, useBottomAsOrigin);
    return BoundUtil.getBoundBox(globalPoints);
  },

  /**
   * Calculate bounding box from a set of 3D points
   */
  getBoundBox(points: THREE.Vector3[]): BoundBox3D | null {
    if (points.length === 0) {
      return null;
    }

    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;

    for (let i = 0; i < points.length; i++) {
      maxX = Math.max(points[i].x, maxX);
      minX = Math.min(points[i].x, minX);
      maxY = Math.max(points[i].y, maxY);
      minY = Math.min(points[i].y, minY);
      maxZ = Math.max(points[i].z, maxZ);
      minZ = Math.min(points[i].z, minZ);
    }

    return {
      left: minX,
      right: maxX,
      bottom: minZ,
      top: maxZ,
      front: minY,
      back: maxY,
      square: {
        maxX,
        maxY,
        minX,
        minY,
        minZ,
        maxZ
      },
      center: {
        x: (minX + maxX) / 2,
        y: (maxY + minY) / 2,
        z: (maxZ + minZ) / 2
      },
      XSize: maxX - minX,
      YSize: maxY - minY,
      ZSize: maxZ - minZ
    };
  },

  /**
   * Get local bound points for extruding entities
   */
  getExtrudingLocalBound3dPoints(entity: EntityWithBounds): THREE.Vector3[] {
    const paths = entity.getPaths?.();
    
    if (!paths || !entity.__direction) {
      return [];
    }

    const firstPath = paths[0];
    
    if (!firstPath || firstPath.length <= 2) {
      return [];
    }

    const points: THREE.Vector3[] = [];
    const direction = entity.__direction;
    const directionVector = new THREE.Vector3(direction.x, direction.y, direction.z);
    directionVector.setLength(entity.height ?? 0);

    firstPath.forEach(pathPoint => {
      const basePoint = new THREE.Vector3(pathPoint.x, pathPoint.y, pathPoint.z);
      const topPoint = basePoint.clone().add(directionVector);
      points.push(basePoint);
      points.push(topPoint);
    });

    return points;
  },

  /**
   * Get local bound points for DContent entities
   */
  getDContentLocalBound3dPoints(
    entity: EntityWithBounds,
    useBottomAsOrigin: boolean = false
  ): THREE.Vector3[] {
    return BoundUtil.getContentLocalBound3dPoints(entity, useBottomAsOrigin);
  },

  /**
   * Get local bound points for DAssembly entities
   */
  getDAssemblyLocalBound3dPoints(
    entity: EntityWithBounds,
    includeContent?: boolean,
    useBottomAsOrigin?: boolean
  ): THREE.Vector3[] {
    const globalMatrix = HSCore.Util.Matrix3DHandler.getGlobalMatrix4(entity);
    const inverseMatrix = new THREE.Matrix4();
    inverseMatrix.getInverse(globalMatrix);

    const collectChildEntities = (parent: EntityWithBounds, result: BoundEntityInfo[] = []): BoundEntityInfo[] => {
      parent.forEachChild?.(child => {
        if (child.isFlagOn?.(HSCore.Model.EntityFlagEnum.hidden)) {
          return;
        }

        if (includeContent && child instanceof HSCore.Model.DContent) {
          result.push({
            entity: child,
            getLocalBound3dPoints: BoundUtil.getDContentLocalBound3dPoints
          });
        } else if (child instanceof HSCore.Model.DExtruding) {
          result.push({
            entity: child,
            getLocalBound3dPoints: BoundUtil.getExtrudingLocalBound3dPoints
          });
        } else if (child instanceof HSCore.Model.DAssembly) {
          result.push({
            entity: child,
            getLocalBound3dPoints: BoundUtil.getDAssemblyLocalBound3dPoints
          });
        }
      });

      return result;
    };

    const childEntities = collectChildEntities(entity);
    const allPoints: THREE.Vector3[] = [];

    childEntities.forEach(({ entity: childEntity, getLocalBound3dPoints }) => {
      const childPoints = getLocalBound3dPoints(childEntity, includeContent, useBottomAsOrigin);
      
      if (!childPoints || childPoints.length === 0) {
        return;
      }

      const childGlobalMatrix = HSCore.Util.Matrix3DHandler.getGlobalMatrix4(childEntity);
      childGlobalMatrix.premultiply(inverseMatrix);

      childPoints.forEach(point => {
        point.applyMatrix4(childGlobalMatrix);
        allPoints.push(point);
      });
    });

    return allPoints;
  },

  /**
   * Get local bound points for Content entities
   */
  getContentLocalBound3dPoints(
    entity: EntityWithBounds,
    useBottomAsOrigin: boolean = false
  ): THREE.Vector3[] {
    const zLength = entity.ZLength ?? 0;
    const minZ = useBottomAsOrigin ? 0 : -zLength / 2;
    const maxZ = useBottomAsOrigin ? zLength : zLength / 2;

    const xLength = entity.XLength ?? 0;
    const yLength = entity.YLength ?? 0;

    const corners: Point2D[] = [
      { x: -xLength / 2, y: -yLength / 2 },
      { x: xLength / 2, y: -yLength / 2 },
      { x: xLength / 2, y: yLength / 2 },
      { x: -xLength / 2, y: yLength / 2 }
    ];

    const points: THREE.Vector3[] = [];

    corners.forEach(corner => {
      points.push(new THREE.Vector3(corner.x, corner.y, minZ));
      points.push(new THREE.Vector3(corner.x, corner.y, maxZ));
    });

    return points;
  }
};