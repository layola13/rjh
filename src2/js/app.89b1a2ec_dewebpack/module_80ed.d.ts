/**
 * Internationalization language pack module
 * Contains UI labels and messages for architectural design features
 * @module LanguagePack
 */

/**
 * Language pack interface defining all translatable strings
 * Used for building design, wall creation, and structural elements
 */
export interface LanguagePack {
  /** Drawing tool action */
  draw: string;
  
  /** Translation/move operation */
  translate: string;
  
  /** Extend operation for elements */
  extend: string;
  
  /** Create trough structural element */
  create_trough: string;
  
  /** Create beam structural element */
  create_beam: string;
  
  /** Supply plane operation */
  supply_plane: string;
  
  /** Plane/surface element */
  plane: string;
  
  /** Window design interface */
  design_window: string;
  
  /** Wall creation operation */
  create_wall: string;
  
  /** Wall color customization */
  wall_color: string;
  
  /** 3D model creation */
  create_3d: string;
  
  /** Apply changes action */
  apply: string;
  
  /** Connect dimension tool */
  ConnectDimension: string;
  
  /** Create centrum/center point */
  create_centrum: string;
  
  /** Centrum size parameter */
  centrum_size: string;
  
  /** Plane scaling operation */
  plane_scale: string;
  
  /** Tooltip: positive numbers enlarge, negative numbers reduce */
  plane_scale_tip: string;
  
  /** Wall element */
  wall: string;
  
  /** Auxiliary node */
  aux_node: string;
  
  /** Auxiliary edge */
  aux_edge: string;
  
  /** Pillar/column structural element */
  pillar: string;
  
  /** Window element */
  window: string;
  
  /** Pillar color customization */
  pillar_color: string;
  
  /** Scope of application */
  apply_scope: string;
  
  /** Apply to current selection only */
  current: string;
  
  /** Apply to all elements */
  all: string;
  
  /** Window editing interface */
  edit_window: string;
  
  /** Length measurement/property */
  length: string;
  
  /** Extend to left direction */
  to_left: string;
  
  /** Extend to right direction */
  to_right: string;
  
  /** Extend both ends */
  both_ends: string;
  
  /** Tooltip: direction for length change */
  pillar_length_tip: string;
  
  /** Break/split operation */
  break: string;
  
  /** Horizontal division */
  h_divide: string;
  
  /** Vertical division */
  v_divide: string;
  
  /** Polygon division */
  poly_divide: string;
  
  /** Pillar length property */
  pillar_length: string;
  
  /** Confirm action */
  confirm: string;
  
  /** Herringbone top pattern */
  herring_bone_top: string;
  
  /** Generate operation */
  generate: string;
  
  /** Slope/incline property */
  slope: string;
  
  /** Trapezoid shape */
  trapezoid: string;
  
  /** Trapezoid width dimension */
  trapezoid_width: string;
  
  /** Trapezoid height dimension */
  trapezoid_height: string;
  
  /** Color property */
  color: string;
  
  /** Thickness property */
  thick: string;
  
  /** Flume/channel color */
  flume_color: string;
}

/**
 * Default English language pack
 * Exported as the module's default export
 */
declare const languagePack: LanguagePack;

export default languagePack;