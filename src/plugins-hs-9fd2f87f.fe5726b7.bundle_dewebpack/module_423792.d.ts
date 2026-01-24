/**
 * Floorplan configuration module
 * Defines styling, dimensions, and visual properties for architectural floor plans
 */

/**
 * Bounding box span configuration
 */
interface FloorplanSpan {
  /** Left margin in units */
  left: number;
  /** Right margin in units */
  right: number;
  /** Top margin in units */
  top: number;
  /** Bottom margin in units */
  bottom: number;
}

/**
 * Text size configuration with padding
 */
interface TextSizeConfig {
  /** Font size in units */
  size: number;
  /** Padding for small spaces */
  paddingSmall: number;
  /** Padding for large spaces */
  paddingBig: number;
}

/**
 * Multi-size text configuration
 */
interface TypeTextSizeConfig {
  /** List of font sizes in descending priority */
  sizelist: number[];
  /** Text padding in units */
  padding: number;
}

/**
 * Room type to style mapping
 */
type RoomType =
  | "LivingRoom"
  | "Hallway"
  | "DiningRoom"
  | "LivingDiningRoom"
  | "None"
  | "Bedroom"
  | "KidsRoom"
  | "MasterBedroom"
  | "SecondBedroom"
  | "ElderlyRoom"
  | "Library"
  | "NannyRoom"
  | "StorageRoom"
  | "CloakRoom"
  | "Balcony"
  | "Courtyard"
  | "Terrace"
  | "Kitchen"
  | "Bathroom"
  | "MasterBathroom"
  | "SecondBathroom"
  | "LaundryRoom"
  | "Stairwell"
  | "Aisle"
  | "Corridor"
  | "Lounge"
  | "Auditorium"
  | "EquipmentRoom"
  | "Garage"
  | "OtherSpace"
  | "Outdoors";

/**
 * Room style identifier (material/theme reference)
 */
type RoomStyle = "m1" | "m2" | "m3" | "m4" | "m5" | "m6";

/**
 * Room rendering configuration
 */
interface RoomConfig {
  /** Mapping of room types to visual styles */
  style: Record<RoomType, RoomStyle>;
  /** Whether to display room area measurements */
  areaVisible: boolean;
  /** Configuration for area text rendering */
  areaTextSize: TextSizeConfig;
  /** Primary text color (hex) */
  fontColor: string;
  /** Text outline color (hex) */
  fontOutlineColor: string;
  /** Room boundary edge color (hex) */
  edgeColor: string;
  /** Room boundary edge width in pixels */
  edgeWidth: number;
  /** Configuration for room type labels */
  typeTextSize: TypeTextSizeConfig;
  /** Stroke width for text rendering */
  textStrokeWidth: number;
  /** Outline stroke width for text */
  textOutlineStrokeWidth: number;
  /** Whether to render floor texture images */
  drawGroundImg: boolean;
}

/**
 * Wall rendering configuration
 */
interface WallConfig {
  /** Color for standard walls (hex) */
  normalColor: string;
  /** Color for load-bearing walls (hex) */
  loadBearingColor: string;
  /** Width of inner wall lines in pixels */
  innerWidth: number;
  /** Width of outer wall lines in pixels */
  outerWidth: number;
}

/**
 * Door rendering configuration
 */
interface DoorConfig {
  /** Whether doors are rendered */
  visible: boolean;
  /** Door fill color (hex) */
  color: string;
  /** Door fill opacity (0-1) */
  opacity: number;
  /** Entry width in units */
  entryWidth: number;
  /** Entry height in units */
  entryHeight: number;
  /** Door outline width in pixels */
  lineWidth: number;
  /** Door outline color (hex) */
  lineColor: string;
}

/**
 * Window rendering configuration
 */
interface WindowConfig {
  /** Whether windows are rendered */
  visible: boolean;
  /** Window frame line width in pixels */
  lineWidth: number;
  /** Window frame line color (hex) */
  lineColor: string;
  /** Window frame stroke color (hex) */
  strokeColor: string;
  /** Window glass fill color (hex) */
  glassColor: string;
  /** Window glass stroke color (hex) */
  glassStrokeColor: string;
  /** Window wall section color (hex) */
  wallColor: string;
}

/**
 * Entry point rendering configuration
 */
interface EntryConfig {
  /** Entry line width in pixels */
  lineWidth: number;
  /** Entry line color (hex) */
  lineColor: string;
}

/**
 * Complete floorplan configuration schema
 */
interface FloorplanConfig {
  /** Canvas background color (hex) */
  backgroundColor: string;
  /** Full canvas width in units */
  fullWidth: number;
  /** Full canvas height in units */
  fullHeight: number;
  /** Margins around the floorplan */
  floorplanSpan: FloorplanSpan;
  /** Room rendering settings */
  room: RoomConfig;
  /** Wall rendering settings */
  wall: WallConfig;
  /** Door rendering settings */
  door: DoorConfig;
  /** Window rendering settings */
  window: WindowConfig;
  /** Entry point rendering settings */
  entry: EntryConfig;
}

declare const floorplanConfig: FloorplanConfig;

export default floorplanConfig;