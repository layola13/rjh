import { Vector3 } from './Vector3';
import { NCPBackgroundWallBase } from './NCPBackgroundWallBase';
import { Door } from './Door';
import { ParametricWindow } from './ParametricWindow';
import { Window } from './Window';
import { ParametricDoor } from './ParametricDoor';
import { SpaceAssembly } from './SpaceAssembly';
import { Entity } from './Entity';
import { WallFaceAssemblyDecorator } from './WallFaceAssemblyDecorator';

interface Size3D {
  x: number;
  y: number;
  z: number;
}

interface Position3D {
  x: number;
  y: number;
  z: number;
}

interface Point2D {
  x: number;
  y: number;
}

interface EntityWithBound {
  z: number;
  ZSize: number;
  bound?: unknown;
  outline: Point2D[];
}

interface WallFace {
  host: unknown;
}

interface AssemblyMetadata {
  [key: string]: unknown;
}

/**
 * WallFaceAssembly represents an assembly of wall-related components
 * including background walls, doors, and windows.
 */
export class WallFaceAssembly extends SpaceAssembly {
  private _size?: Size3D;
  private _position?: Position3D;
  protected _associatedContents: EntityWithBound[] = [];

  /**
   * Creates a new WallFaceAssembly instance
   * @param metadata - Optional metadata to initialize the assembly
   * @returns A new WallFaceAssembly instance
   */
  static create(metadata?: AssemblyMetadata): WallFaceAssembly {
    const assembly = new WallFaceAssembly();
    if (metadata) {
      assembly.initByMeta(metadata);
    }
    return assembly;
  }

  /**
   * Gets the wall face associated with this assembly
   * @returns The wall face or undefined if no background walls exist
   */
  get wallFace(): WallFace | undefined {
    return this.backgroundWalls.length === 0 ? undefined : this.backgroundWalls[0].host;
  }

  /**
   * Gets all background walls in this assembly
   * @returns Array of background wall entities
   */
  get backgroundWalls(): NCPBackgroundWallBase[] {
    return this._associatedContents.filter(
      (entity): entity is NCPBackgroundWallBase => entity instanceof NCPBackgroundWallBase
    );
  }

  /**
   * Gets all doors in this assembly
   * @returns Array of door entities
   */
  get doors(): (Door | ParametricDoor)[] {
    return this._associatedContents.filter(
      (entity): entity is Door | ParametricDoor =>
        entity instanceof Door || entity instanceof ParametricDoor
    );
  }

  /**
   * Gets all windows in this assembly
   * @returns Array of window entities
   */
  get windows(): (Window | ParametricWindow)[] {
    return this._associatedContents.filter(
      (entity): entity is Window | ParametricWindow =>
        entity instanceof Window || entity instanceof ParametricWindow
    );
  }

  /**
   * Refreshes the size and position of the assembly based on associated contents
   * @private
   */
  protected _refreshSizeAndPosition(): void {
    if (this.associatedContents.length === 0 || !this.wallFace) {
      return;
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let minZ = Infinity;
    let maxZ = -Infinity;

    const worldToLocalMatrix = new WallFaceAssemblyDecorator()
      .getFaceLocalCoordinate(this.wallFace)
      .getWorldToLocalMatrix();

    this.associatedContents.forEach((entity) => {
      const entityZ = entity.z;

      if (entity.bound && entity.outline) {
        entity.outline.forEach((point) => {
          const localPoint = new Vector3(point.x, point.y, entityZ).transformed(worldToLocalMatrix);

          if (maxX < localPoint.x) {
            maxX = localPoint.x;
          }
          if (localPoint.x < minX) {
            minX = localPoint.x;
          }
          if (maxY < localPoint.y) {
            maxY = localPoint.y;
          }
          if (localPoint.y < minY) {
            minY = localPoint.y;
          }
        });
      }

      const entityMaxZ = entityZ + entity.ZSize;
      if (maxZ < entityMaxZ) {
        maxZ = entityMaxZ;
      }
      if (entityZ < minZ) {
        minZ = entityZ;
      }
    });

    this._size = {
      x: maxX - minX,
      y: maxY - minY,
      z: maxZ - minZ,
    };

    const centerPoint = new Vector3(
      (maxX + minX) / 2,
      (maxY + minY) / 2,
      0
    ).transform(worldToLocalMatrix.inversed());

    this._position = {
      x: centerPoint.x,
      y: centerPoint.y,
      z: minZ,
    };
  }

  protected initByMeta(metadata: AssemblyMetadata): void {
    // Implementation depends on parent class
  }

  get associatedContents(): EntityWithBound[] {
    return this._associatedContents;
  }
}

Entity.registerClass(HSConstants.ModelClass.WallFaceAssembly, WallFaceAssembly);