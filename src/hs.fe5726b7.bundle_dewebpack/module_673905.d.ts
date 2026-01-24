/**
 * Resource loader module for HSConstants
 * Provides centralized loading of SVG icons, images, cursors, locales, and other assets
 */

/**
 * Supported locale codes
 */
type LocaleCode =
  | 'en_US'
  | 'fr_FR'
  | 'ja_JP'
  | 'zh_CN'
  | 'ru_RU'
  | 'it_IT'
  | 'pt_PT'
  | 'es_ES'
  | 'de_DE'
  | 'id_ID'
  | 'zh_TW'
  | 'pl_PL'
  | 'ko_KR'
  | 'ar_SA';

/**
 * Partner identifiers
 */
type PartnerId = 'fp' | 'ezhome';

/**
 * Locale data structure mapping locale codes to translation data
 */
type LocaleData = Record<LocaleCode, unknown>;

/**
 * Partner-specific locale configuration
 */
type PartnerLocales = Record<PartnerId, Record<LocaleCode, string>>;

/**
 * SVG icon resources used throughout the application
 */
interface SvgResources {
  /** Default switch symbol icon */
  default_switch_symbol: unknown;
  /** Default socket/outlet symbol icon */
  default_socket_symbol: unknown;
  /** Default water fixture symbol icon */
  default_water_symbol: unknown;
  /** Default electrical box symbol icon */
  default_elecbox_symbol: unknown;
  /** Default door symbol icon */
  default_door_symbol: unknown;
  /** Default window symbol icon */
  default_window_symbol: unknown;
  /** Rotation cursor icon */
  rotate_cursor: unknown;
  /** Material suction tool cursor */
  mat_suck_cursor: unknown;
  /** Disabled material suction cursor */
  mat_suck_disable_cursor: unknown;
  /** Material brush tool cursor */
  mat_brush_cursor: unknown;
  /** Disabled material brush cursor */
  mat_brush_disable_cursor: unknown;
  /** Disabled move cursor */
  move_disable_cursor: unknown;
  /** Material re-suction icon */
  mat_resuck_icon: unknown;
  /** Cancel action icon */
  cancel_icon: unknown;
  /** Brush tool icon */
  brush: unknown;
  /** Ceiling icon */
  ceiling: unknown;
  /** Forbidden action icon */
  forbiden: unknown;
  /** Red forbidden icon */
  red_forbidden: unknown;
  /** DIY material icon */
  diymaterial: unknown;
  /** Tiles modification icon */
  tiles_modify: unknown;
  /** Tiles deletion icon */
  tiles_delete: unknown;
  /** Arrow for orbit view navigation */
  arrow_for_orbit_view: unknown;
  /** Arrow for orbit view (NGM variant) */
  arrow_for_orbit_view_ngm: unknown;
  /** Orbit camera icon */
  orbit_camera: unknown;
  /** Arrow for orbit view (hover state) */
  arrow_for_orbit_view_hover: unknown;
  /** Orbit camera icon (hover state) */
  orbit_camera_hover: unknown;
  /** Arrow for first-person view */
  arrow_for_first_view: unknown;
  /** Arrow for camera clipping plane */
  arrow_for_camera_clip: unknown;
  /** Arrow for camera clipping (hover state) */
  arrow_for_camera_clip_hover: unknown;
  /** First-person camera icon */
  first_person_camera: unknown;
  /** First-person camera icon (hover state) */
  first_person_camera_hover: unknown;
  /** Arrow for first-person view (colored variant) */
  arrow_for_first_view_color: unknown;
  /** First-person camera (colored variant) */
  first_person_camera_color: unknown;
  /** Arrow for first-person view color (hover state) */
  arrow_for_first_view_color_hover: unknown;
  /** First-person camera color (hover state) */
  first_person_camera_color_hover: unknown;
  /** Dimension measurement icon */
  dimensions: unknown;
  /** Double-line dimension icon */
  dimensions_doubleline: unknown;
  /** Add to my tiles icon */
  add_to_my_tiles: unknown;
  /** Tiles copy icon */
  tiles_copy: unknown;
  /** Close/dismiss icon */
  close: unknown;
  /** Flat light (normal state) */
  flatlight_normal: unknown;
  /** Spotlight (normal state) */
  spotlight_normal: unknown;
  /** Solid point marker */
  solidPoint: unknown;
  /** Intersection point marker */
  intersectionPoint: unknown;
  /** Pen/drawing cursor */
  penCursor: unknown;
  /** North-south resize cursor */
  nsResize_Cursor: unknown;
  /** East-west resize cursor */
  ewResize_Cursor: unknown;
  /** Face selection cursor */
  face_select_cursor: unknown;
  /** Line selection cursor */
  line_select_cursor: unknown;
  /** Offset tool cursor */
  offset_cursor: unknown;
  /** Array tool icon */
  array_svg: unknown;
  /** Merge wall icon */
  merge_wall: unknown;
  /** Cut wall icon */
  cut_wall: unknown;
  /** Align wall icon */
  align_wall: unknown;
  /** Draw tool cursor */
  drawCursor: unknown;
  /** Fillet tool cursor */
  filletCursor: unknown;
  /** Array tool cursor */
  arrayCursor: unknown;
  /** Arc array tool cursor */
  arcArrayCursor: unknown;
  /** Guide line cursor */
  guideLineCursor: unknown;
  /** Measuring tool cursor */
  measuringCursor: unknown;
}

/**
 * Image resources (textures, icons, etc.)
 */
interface ImageResources {
  /** Wall stucco texture path */
  wallStucco: string;
  /** Wood texture path */
  wood: string;
  /** Ceiling texture path */
  ceiling: string;
  /** Wooden floor pattern image */
  woodenFloorPattern: unknown;
  /** Lift/elevator icon (PNG) */
  liftPng: unknown;
  /** Lift icon hover state (PNG) */
  liftHoverPng: unknown;
  /** Resize handle icon (PNG) */
  resizePng: unknown;
  /** Resize handle hover state (PNG) */
  resizeHoverPng: unknown;
  /** Sun/lighting icon (PNG) */
  sunPng: unknown;
}

/**
 * Cursor definitions
 */
interface CursorResources {
  /** Brush tool cursor */
  brush: unknown;
  /** Ceiling tool cursor */
  ceiling: unknown;
  /** Forbidden action cursor */
  forbiden: unknown;
}

/**
 * Partner-specific SVG resources
 */
interface ResourceSvgs {
  /** Common SVG resources */
  common: string;
  /** EZHome partner SVG resources */
  ezhome: string;
  /** FP partner SVG resources */
  fp: string;
}

/**
 * Global HSConstants namespace
 */
declare global {
  namespace HSConstants {
    interface Resources {
      /** SVG icon resources */
      svgs: SvgResources;
      /** Image/texture resources */
      images: ImageResources;
      /** Cursor resources */
      curs: CursorResources;
      /** Localization data */
      locales: LocaleData;
      /** Partner-specific localization */
      partnerLocals: PartnerLocales;
      /** Partner-specific SVG resources */
      resourceSvgs: ResourceSvgs;
      /** Hatch pattern resources array */
      hatch: unknown[];
      /** Hatch background resource */
      hatchBackground: unknown;
    }
  }
}

/**
 * Resource loader module
 * Initializes and loads all application resources into HSConstants.Resources
 */
declare const resourceLoader: {
  /**
   * Load all resources into HSConstants.Resources
   * Merges SVG icons, images, cursors, locales, and other assets into the global resource registry
   */
  load(): void;
};

export default resourceLoader;