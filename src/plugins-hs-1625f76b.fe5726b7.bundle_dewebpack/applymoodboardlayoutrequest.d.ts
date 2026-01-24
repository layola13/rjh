import { Material } from './Material';
import { Content } from './Content';
import { ConstraintLayout, EntityTypeChecker, getGroupedRoomTypes } from './ConstraintLayout';
import { ContentUtils } from './ContentUtils';
import { ColorMode, DefaultPattern } from './Pattern';
import { HSCore } from './HSCore';

/**
 * Room information interface containing space and structure details
 */
interface RoomInfo {
  spaceInfos: SpaceInfo[];
}

/**
 * Space information with structure faces and floors
 */
interface SpaceInfo {
  structureFaces: StructureFace[];
  floors: Floor[];
}

/**
 * Structure face with material information
 */
interface StructureFace {
  material: FaceMaterial;
  dirtyMaterial(): void;
}

/**
 * Floor structure with material information
 */
interface Floor {
  material: FaceMaterial;
  dirtyMaterial(): void;
}

/**
 * Material applied to faces with mixpaint support
 */
interface FaceMaterial {
  mixpaint?: Mixpaint;
}

/**
 * Mixpaint configuration with pave regions
 */
interface Mixpaint {
  mixPave: MixPave;
}

/**
 * Mix pave with unique region and pattern
 */
interface MixPave {
  getUniqueRegion(): Region;
}

/**
 * Region with pattern and material dirty tracking
 */
interface Region {
  pattern: DefaultPattern;
  dirtyMaterial(): void;
}

/**
 * Model information from mood board data
 */
interface ModelInfo {
  modelId: string;
  isMaterial: boolean;
  materialType?: string;
  paintType?: string;
  regHex?: string;
  seekId?: string;
}

/**
 * Mood board data containing model information and room type
 */
interface MoodBoardData {
  modelInfo: ModelInfo[];
  roomType: string;
}

/**
 * Room entity with structure and layout information
 */
interface RoomEntity {
  id: string;
  roomInfos: RoomInfo[];
}

/**
 * Product dictionary mapping model IDs to materials or content
 */
interface ProductDictionary {
  [modelId: string]: Material | Content | unknown;
}

/**
 * Content group information for layout search
 */
interface GroupInfo {
  xLength: number;
  yLength: number;
  type: string;
  categoryIds: string[];
  memberTypes: unknown[];
}

/**
 * Layout search options for constraint layout
 */
interface SearchOptions {
  groupInfos: GroupInfo[];
  roomTypes: string[];
  subSearchOptions: SubSearchOption[];
}

/**
 * Sub-search configuration for layout extraction
 */
interface SubSearchOption {
  extractMethod: string;
  searchMethod: string;
  whenSucceed: string;
}

/**
 * Constraint result containing target content objects
 */
interface ConstraintResult {
  targetCOs: TargetContentObject[];
  roomEntityObject: unknown;
}

/**
 * Target content object with content reference
 */
interface TargetContentObject {
  targetContent: Content;
}

/**
 * Instantiated fake content wrapper
 */
interface FakeContentWrapper {
  content: Content;
}

/**
 * Position vector [x, y, z]
 */
type Position3D = [number, number, number];

/**
 * Furniture information for room layout
 */
interface FurnitureInfo {
  id: string;
  type: string;
  style: string;
  size: [number, number, number];
  scale: [number, number, number];
  position: Position3D;
  rotation: [number, number, number];
  entityId: string;
  categories: string[];
  flip: number;
  isCustomModel: boolean;
  hidden: boolean;
  name: string;
  hostType: string;
  materials: Record<string, unknown>;
  host: string;
}

/**
 * Room data structure for layout algorithm
 */
interface RoomData {
  id: string;
  type: string;
  area: number;
  height: number;
  floor: number[];
  innerLoops: unknown[];
  door_info: unknown[];
  hole_info: unknown[];
  window_info: unknown[];
  other_hole_info: unknown[];
  baywindow_info: unknown[];
  furniture_info: FurnitureInfo[];
  decorate_info: unknown[];
  hard_deco_info: Record<string, unknown>;
  diy_info: unknown[];
  customizedProducts_info: {
    dModelIds: string[];
    libraryIds: string[];
    groupList: unknown[];
  };
  backgroundwall_info: {
    param_backgroundwall_info: unknown[];
  };
  parametricModel_info: {
    parametricCurtain_info: unknown[];
    parametricBathroomCabinet_info: unknown[];
  };
  layerAltitude: number;
  wall_info: WallInfo[];
  face_info: unknown[];
  struct_info: unknown[];
  altitude: number;
  coord: CoordinateInfo;
}

/**
 * Wall information for room structure
 */
interface WallInfo {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  width: number;
  height: number;
}

/**
 * Coordinate system information
 */
interface CoordinateInfo {
  origin: { x: number; y: number; z: number };
  xAxis: { x: number; y: number; z: number };
  yAxis: { x: number; y: number; z: number };
}

/**
 * House layout data structure
 */
interface HouseLayoutData {
  design_id: string;
  design_version: string;
  design_meta: {
    attributes: {
      compass_degree: number;
    };
  };
  style: string;
  version: string;
  room: RoomData[];
  height: number;
}

/**
 * Soft decoration algorithm response data
 */
interface SoftDecorationData {
  [roomId: string]: {
    contents?: Content[];
  };
}

/**
 * Apply materials from mood board to room surfaces
 * @param room - Target room entity
 * @param moodBoardData - Mood board configuration data
 * @param products - Product dictionary mapping IDs to materials/content
 * @returns Array of applied material seek IDs
 */
export declare function applyMaterials(
  room: RoomEntity,
  moodBoardData: MoodBoardData,
  products: ProductDictionary
): string[];

/**
 * Request class for applying mood board layout to a room
 * Extends HSCore StateRequest for transaction management
 */
export declare class ApplyMoodBoardLayoutRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * Target room entity
   */
  room: RoomEntity;

  /**
   * Mood board data containing style and material information
   */
  moodBoardData: MoodBoardData;

  /**
   * Product dictionary for material and content lookup
   */
  products: ProductDictionary;

  /**
   * Create a new mood board layout application request
   * @param room - Target room entity
   * @param moodBoardData - Mood board configuration
   * @param products - Product dictionary
   */
  constructor(
    room: RoomEntity,
    moodBoardData: MoodBoardData,
    products: ProductDictionary
  );

  /**
   * Execute the mood board layout request
   * Applies materials and places furniture according to mood board data
   * @returns Promise resolving to array of applied item seek IDs
   */
  doRequest(): Promise<string[]>;

  /**
   * Async commit handler for transaction system
   * @returns Promise resolving to array of applied item seek IDs
   */
  onCommitAsync(): Promise<string[]>;

  /**
   * Check if this request can be used in transactions
   * @returns Always returns true
   */
  canTransactField(): boolean;
}