/**
 * Intelligent Lights Utility Module
 * Provides functionality for managing and generating intelligent lighting in interior design scenes
 */

declare namespace HSCore {
  namespace Logger {
    const console: Console;
  }

  namespace Util {
    namespace Math {
      class Vec2 {
        constructor(x: number, y: number);
      }

      function isPointInPolygon(
        point: { x: number; y: number },
        polygon: Vec2[] | THREE.Vector2[] | THREE.Vector3[],
        includeEdge?: boolean,
        tolerance?: number
      ): boolean;

      function simplifyPolygon(polygon: Vec2[]): Vec2[];
      function splitConcavePolygon(polygon: Vec2[]): Vec2[][] | null;
    }

    namespace Room {
      function isSmallRoom(floor: HSCore.Model.Floor): boolean;
      function getArea(floor: HSCore.Model.Floor): number;
      function findInteriorWallsInRoom(floor: HSCore.Model.Floor): any[];
      function getRoomTransparentOpenings(floor: HSCore.Model.Floor): any[];
      function getProperCenterPosition(polygon: Vec2[]): { x: number; y: number };
    }

    namespace Layer {
      function getEntityLayer(entity: any): any;
    }

    namespace Collision {
      function OffsetPolygon(polygons: any[][], offset: number): any[][];
    }
  }

  namespace Model {
    enum SlabFaceType {
      top = 'top',
    }

    enum EntityFlagEnum {
      hidden = 'hidden',
      removed = 'removed',
    }

    enum LightTypeEnum {
      SpotLight = 'SpotLight',
      FlatLight = 'FlatLight',
      PointLight = 'PointLight',
    }

    interface Floor {
      roomType: string;
      ID: string;
      getOuterLoopPolygon(): THREE.Vector3[];
      getMaster(): { getBaseLayer(): { height: number; id: string } };
      isFlagOn(flag: EntityFlagEnum): boolean;
    }

    class Door {}
    class Group {
      contentType?: HSCatalog.ContentType;
      members: any[];
    }

    class SpotPhysicalLight {
      content: any;
      close: boolean;
      intensity: number;
      temperature: number;
      metadata?: { categories?: string[] };
    }

    class MeshLight {
      content?: any;
      close?: boolean;
    }

    class PhysicalLight {
      content?: any;
      contentID?: string;
      close?: boolean;
    }

    class NCustomizedParametricCeiling {}
    class CustomizedCeilingModel {}
    class NCustomizedCeilingModel {}

    class SpotLight {
      static create(): SpotLight;
      reset(): void;
      intensity: number;
      IES?: any;
      x: number;
      y: number;
      z: number;
      double_flat?: boolean;
      temperature?: number;
      sourceContentType?: HSCatalog.ContentType;
      XRotation?: number;
      YRotation?: number;
      ZRotation?: number;
    }

    class FlatLight {
      static create(): FlatLight;
      reset(): void;
      intensity: number;
      width: number;
      height: number;
      x: number;
      y: number;
      z: number;
      double_flat?: boolean;
      temperature?: number;
      sourceContentType?: HSCatalog.ContentType;
      XRotation?: number;
      YRotation?: number;
      ZRotation?: number;
    }

    class PointLight {
      static create(): PointLight;
      radius: number;
      intensity: number;
      x: number;
      y: number;
      z: number;
      double_flat?: boolean;
      temperature?: number;
      sourceContentType?: HSCatalog.ContentType;
      XRotation?: number;
      YRotation?: number;
      ZRotation?: number;
    }
  }
}

declare namespace HSCatalog {
  enum ContentTypeEnum {
    DoubleSeatSofa = 'DoubleSeatSofa',
    LeftCornerSofa = 'LeftCornerSofa',
    MultiSeatSofa = 'MultiSeatSofa',
    RightCornerSofa = 'RightCornerSofa',
    SingleSeatSofa = 'SingleSeatSofa',
    Sofa = 'Sofa',
    BathroomHeaterWithLight = 'BathroomHeaterWithLight',
    PendantLight = 'PendantLight',
    LightMolding = 'LightMolding',
    CeilingLight = 'CeilingLight',
    SingleSpotlightCeilingAttached = 'SingleSpotlightCeilingAttached',
    TrackMountedSpotlightCeilingAttached = 'TrackMountedSpotlightCeilingAttached',
    Skylight = 'Skylight',
    Downlight = 'Downlight',
    SpotLight = 'SpotLight',
    Lighting = 'Lighting',
    WallLamp = 'WallLamp',
    FloorLamp = 'FloorLamp',
    DiningTable = 'DiningTable',
    DiningTableRound = 'DiningTableRound',
    DiningTableSet = 'DiningTableSet',
    DiningTableSquare = 'DiningTableSquare',
    Chair = 'Chair',
    CustomizedCeiling = 'CustomizedCeiling',
    CustomizedPMInstanceCeiling = 'CustomizedPMInstanceCeiling',
    SmartCustomizedCeiling = 'SmartCustomizedCeiling',
    ExtrusionCustomizedCeilingModel = 'ExtrusionCustomizedCeilingModel',
    GypsumCeiling = 'GypsumCeiling',
    CeilingMolding = 'CeilingMolding',
  }

  class ContentType {
    isTypeOf(types: ContentTypeEnum | ContentTypeEnum[]): boolean;
  }
}

declare namespace HSConstants.Render {
  enum TEMPLATE_NAME_V3 {
    REALISTIC = 'REALISTIC',
    GENERAL = 'GENERAL',
    NATURE_3 = 'NATURE_3',
    CHILLY_3 = 'CHILLY_3',
    NIGHT = 'NIGHT',
  }
}

declare namespace GeLib {
  namespace PolygonUtils {
    function getArea(polygon: any[]): number;
  }
}

/**
 * Represents an edge of a room polygon
 */
interface RoomEdge {
  /** Starting point of the edge */
  p0: THREE.Vector2;
  /** Ending point of the edge */
  p1: THREE.Vector2;
  /** Doors on this edge */
  doors: any[];
  /** Windows on this edge */
  windows: any[];
  /** Holes on this edge */
  holes: any[];
  /** Associated wall IDs */
  wallIds: string[];
}

/**
 * Represents an interior wall within a room
 */
interface InteriorWall {
  ID: string;
  width: number;
  wallType: string;
  p0: THREE.Vector3;
  p1: THREE.Vector3;
  contents: string[];
}

/**
 * Configuration for lighting rules
 */
interface LightingRuleConfig {
  contentTypes: HSCatalog.ContentTypeEnum[];
  downLight?: {
    contentTypes: HSCatalog.ContentTypeEnum[];
  };
}

/**
 * Parameters for creating a new light
 */
interface LightCreationParams {
  /** Type of light to create */
  type: HSCore.Model.LightTypeEnum;
  /** Light intensity */
  intensity: number;
  /** Position in 3D space */
  position: THREE.Vector3;
  /** Height from floor */
  height: number;
  /** Size dimensions */
  size?: {
    radius?: number;
    width?: number;
    length?: number;
  };
  /** IES light profile data */
  ies?: any;
  /** Whether light emits from both sides */
  double_flat?: boolean;
  /** Color temperature in Kelvin */
  temperature?: number;
  /** Source content type that generated this light */
  sourceContentType?: HSCatalog.ContentType;
  /** X-axis rotation */
  XRotation?: number;
  /** Y-axis rotation */
  YRotation?: number;
  /** Z-axis rotation */
  ZRotation?: number;
}

/**
 * Context for lighting layout operations
 */
interface LightingLayoutContext {
  /** Map of room openings to their associated lights */
  openingLightMap: Map<any, any>;
}

/**
 * Result of intelligent lighting generation for a room
 */
interface RoomLightingResult {
  /** Generated lights for this room */
  lights: LightCreationParams[];
  /** Layer the room belongs to */
  layer?: any;
  /** Error message if lighting generation failed */
  errMsg?: {
    message: string;
    stack?: string;
  };
}

/**
 * Represents a room in the floorplan with all its geometry and contents
 */
declare class RoomInfo {
  /**
   * Creates a new RoomInfo instance
   * @param polygon - The polygon defining the room boundary
   */
  constructor(polygon: HSCore.Util.Math.Vec2[]);

  /**
   * Gets the light contents in this room
   */
  getLightContents(): any[];

  /**
   * Sets the light contents for this room
   */
  setLightContents(contents: any[]): void;

  /**
   * Sets ceiling elements in this room
   */
  setCeilings(ceilings: any[]): void;

  /**
   * Gets physical light fixtures in this room
   */
  getPhysicalLights(): any[];

  /**
   * Sets physical light fixtures
   */
  setPhysicalLights(lights: any[]): void;

  /**
   * Gets the outer polygon including holes
   */
  getOuterPolygon(): THREE.Vector3[];

  /**
   * Sets the outer polygon
   */
  setOuterPolygon(polygon: THREE.Vector3[]): void;

  /**
   * Gets polygons representing holes in the room
   */
  getHolePolygons(): HSCore.Util.Math.Vec2[][];

  /**
   * Sets hole polygons
   */
  setHolePolygons(holes: HSCore.Util.Math.Vec2[][]): void;

  /**
   * Gets the simplified room geometry
   */
  getGeometry(): HSCore.Util.Math.Vec2[];

  /**
   * Sets the contents (furniture, fixtures) in this room
   */
  setContents(contents: any[]): void;

  /**
   * Gets all contents in the room
   */
  getContents(): any[];

  /**
   * Sets content groups (e.g., dining sets)
   */
  setGroups(groups: any[]): void;

  /**
   * Gets content groups
   */
  getGroups(): any[];

  /**
   * Gets interior walls within the room
   */
  getInteriorEdges(): InteriorWall[];

  /**
   * Gets the edges of the room polygon
   */
  getEdges(): RoomEdge[];

  /**
   * Gets the room area in square meters
   */
  getArea(): number;

  /**
   * Sets the room area
   */
  setArea(area: number): void;

  /**
   * Sets the room type (bedroom, living room, etc.)
   */
  setRoomType(type: string): void;

  /**
   * Gets the room type
   */
  getRoomType(): string;

  /**
   * Sets the unique room identifier
   */
  setRoomID(id: string): void;

  /**
   * Gets the room ID
   */
  getRoomID(): string | undefined;

  /**
   * Gets the inner polygon (simplified boundary)
   */
  getInnerPolygon(): THREE.Vector3[];

  /**
   * Sets the inner polygon
   */
  setInnerPolygon(polygon: THREE.Vector3[]): void;

  /**
   * Gets the room height
   */
  getRoomHeight(): number;

  /**
   * Sets the room height
   */
  setRoomHeight(height: number): void;

  /**
   * Gets the effective ceiling height (accounting for dropped ceilings)
   */
  getCeilingHeight(): number;

  /**
   * Gets sub-polygons from concave polygon decomposition
   */
  getSubPolygons(): HSCore.Util.Math.Vec2[][];

  /**
   * Sets sub-polygons
   */
  setSubPolygons(polygons: HSCore.Util.Math.Vec2[][]): void;

  /**
   * Gets transparent openings (windows, doors) in the room
   */
  getRoomOpenings(): any[];

  /**
   * Sets room openings
   */
  setRoomOpenings(openings: any[]): void;

  /**
   * Checks if ceiling face is hidden
   */
  isCeilingFaceHidden(): boolean;

  /**
   * Sets ceiling face visibility
   */
  setIsCeilingFaceHidden(hidden: boolean): void;

  /**
   * Gets the layer this room belongs to
   */
  getLayer(): string | undefined;

  /**
   * Sets the layer ID
   */
  setLayer(layerId: string): void;
}

/**
 * Main utility class for intelligent lighting generation and management
 */
export declare class IntelligentLightsUtil {
  /**
   * Extracts floorplan information including room geometry and contents
   * @param context - Scene context with geometry manager
   * @param template - Rendering template configuration
   * @param lightGroup - Group containing physical lights
   * @returns Map of room IDs to RoomInfo objects
   */
  static getFloorplanInfo(
    context: any,
    template: { templateKey: HSConstants.Render.TEMPLATE_NAME_V3 },
    lightGroup?: any
  ): Record<string, RoomInfo>;

  /**
   * Generates intelligent lighting for all rooms in the scene
   * @param template - Rendering template configuration
   * @param context - Scene context
   * @param lightGroup - Existing light group
   * @returns Array of generated virtual lights
   */
  static getIntelligentLights(
    template: { templateKey: HSConstants.Render.TEMPLATE_NAME_V3 },
    context: any,
    lightGroup?: any
  ): Array<HSCore.Model.SpotLight | HSCore.Model.FlatLight | HSCore.Model.PointLight>;
}