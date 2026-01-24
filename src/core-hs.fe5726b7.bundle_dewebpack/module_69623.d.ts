/**
 * Point3D represents a point in 3D space
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Point2D represents a point in 2D space
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * Path types - can be a single path or multiple paths
 */
export type Path = Point3D[];
export type Paths = Path[];

/**
 * View result containing geometric data with metadata
 */
export interface ViewResult {
  /** Unique identifier of the object */
  id: string;
  /** Type/class name of the object */
  type: string;
  /** Geometric paths defining the object's shape */
  paths: Paths;
  /** Optional opening direction for doors/drawers */
  opening?: string;
}

/**
 * Operation for polygon clipping operations
 */
export interface ClipOperation {
  operation: string;
}

/**
 * Assembly path utilities for extracting 2D views from 3D cabinet assemblies
 * Provides methods to generate front view, top view, and position data
 */
export declare const PAssemblyPath: {
  /**
   * Gets the front view projection of a cabinet assembly
   * @param assembly - The cabinet assembly to project
   * @param point1 - First point defining the projection plane
   * @param point2 - Second point defining the projection plane
   * @returns Array of view results containing projected geometry
   */
  getFrontView(
    assembly: HSCore.Model.PAssembly,
    point1?: Point2D,
    point2?: Point2D
  ): ViewResult[];

  /**
   * Helper method for getting front view with additional options
   * @param assembly - The cabinet assembly to project
   * @param point1 - First point defining the projection plane
   * @param point2 - Second point defining the projection plane
   * @param offset - Offset to apply to the projection
   * @param clipPaths - Whether to clip paths to the projection plane
   * @returns Array of view results containing projected geometry
   */
  getFrontViewHelper(
    assembly: HSCore.Model.PAssembly,
    point1?: Point2D,
    point2?: Point2D,
    offset?: Point2D,
    clipPaths?: boolean
  ): ViewResult[];

  /**
   * Gets the top-down view projection of a cabinet assembly
   * @param assembly - The cabinet assembly to project
   * @param offset - Optional offset to apply to the projection
   * @returns Array of view results containing projected geometry
   */
  getTopView(assembly: HSCore.Model.PAssembly, offset?: Point2D): ViewResult[];

  /**
   * Gets the position of an assembly, handling special cases for moldings and countertops
   * @param assembly - The assembly to get position for
   * @returns The center position of the assembly
   */
  getPosition(assembly: HSCore.Model.PAssembly): Point3D;
};

/**
 * HSCore namespace declarations
 */
declare namespace HSCore {
  namespace Model {
    enum PAssemblyViewTypeEnum {
      Front = 'Front',
      Top = 'Top'
    }

    enum PAssemblyRotationEnum {
      Pull = 'Pull'
    }

    class PAssembly {
      x: number;
      y: number;
      z: number;
      XLength: number;
      YLength: number;
      ZLength: number;
      XScale: number;
      YScale: number;
      ZRotation: number;
      outline: number[];
      contentType: HSCatalog.ContentType;
      metadata: any;
      Class: string;
      localId: string;

      refreshBoundInternal(): void;
      getTopPAssembly(): PAssembly;
      forEachChild(callback: (child: any) => void): void;
      getUniqueParent(): PAssembly | null;
    }

    class PExtruding {
      x: number;
      y: number;
      z: number;
      height: number;
      YSize: number;
      XSize: number;
      Class: string;
      localId: string;
      contentType: HSCatalog.ContentType;

      getPaths(): Path[];
    }

    class PBox {
      x: number;
      y: number;
      z: number;
      XLength: number;
      YLength: number;
      ZLength: number;
      Class: string;
      localId: string;
      contentType: HSCatalog.ContentType;
    }

    class PContent {
      x: number;
      y: number;
      z: number;
      XLength: number;
      YLength: number;
      ZLength: number;
      YRotation: number;
      ZRotation: number;
      _content: PAssembly | any;
      Class: string;
      localId: string;
      contentType: HSCatalog.ContentType;

      isContentValid(): boolean;
      getUniqueParent(): PAssembly | null;
    }

    class PMolding {
      x: number;
      y: number;
      z: number;
      YSize: number;
      XSize: number;
      paths: Path[];
      Class: string;
      localId: string;
      contentType: HSCatalog.ContentType;

      getPaths(): Path[];
    }
  }

  namespace Util {
    namespace Math {
      function nearlyEquals(a: number, b: number): boolean;
      function getPerpendicularIntersect(
        point: Point2D,
        lineStart: Point2D,
        lineEnd: Point2D
      ): Point2D | null;
      function rotatePointCW(
        center: Point2D,
        point: Point2D,
        angle: number
      ): Point2D;
      function isClockwise(path: Point2D[]): boolean;
    }

    namespace Collision {
      enum ClipType {
        union = 'union'
      }

      function ClipPolygon(
        subject: Path,
        clip: Paths,
        operation: ClipOperation
      ): Paths;
    }
  }
}

/**
 * HSCatalog namespace declarations
 */
declare namespace HSCatalog {
  class ContentType {
    isTypeOf(type: ContentTypeEnum | ContentTypeEnum[]): boolean;
  }

  enum ContentTypeEnum {
    CabinetDoor = 'CabinetDoor',
    DrawerDoor = 'DrawerDoor',
    CabinetDrawer = 'CabinetDrawer',
    CabinetFlipDoor = 'CabinetFlipDoor',
    CustomizedCabinet = 'CustomizedCabinet',
    ParamDrawer = 'ParamDrawer',
    ParamSwingDoor = 'ParamSwingDoor',
    ParamSwingDoorLeaf = 'ParamSwingDoorLeaf',
    BaseMolding = 'BaseMolding',
    CrownMolding = 'CrownMolding',
    Countertop = 'Countertop'
  }
}

/**
 * Logger interface for console assertions
 */
declare namespace Logger {
  const console: {
    assert(condition: boolean, message: string): void;
  };
}