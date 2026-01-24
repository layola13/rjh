/**
 * Event type enumeration for window/door frame configuration events.
 * Defines all possible event types that can be triggered during frame editing and configuration.
 * 
 * @module EventType
 * @remarks Original Module ID: 111
 */

/**
 * Enumeration of all available event types for frame and window configuration.
 * Each event type corresponds to a specific configuration action or settings change.
 */
export enum EventType {
  /** Sub-frame configuration settings changed */
  sub_frame_settings = "sub_frame_settings",
  
  /** Half KFC frame configuration settings changed */
  half_kfc_frame_settings = "half_kfc_frame_settings",
  
  /** Half KFC2 frame configuration settings changed */
  half_kfc2_frame_settings = "half_kfc2_frame_settings",
  
  /** KFC frame configuration settings changed */
  kfc_frame_settings = "kfc_frame_settings",
  
  /** Isosceles triangle frame configuration settings changed */
  isosceles_triangle_frame_settings = "isosceles_triangle_frame_settings",
  
  /** Ear-shaped frame configuration settings changed */
  ear_frame_settings = "ear_frame_settings",
  
  /** Ear2-shaped frame configuration settings changed */
  ear2_frame_settings = "ear2_frame_settings",
  
  /** Pointed ear frame configuration settings changed */
  pointed_ear_frame_settings = "pointed_ear_frame_settings",
  
  /** Trapezoid frame configuration settings changed */
  trapezoid_frame_settings = "trapezoid_frame_settings",
  
  /** Single track frame configuration settings changed */
  single_track_frame_settings = "single_track_frame_settings",
  
  /** Double ears frame configuration settings changed */
  double_ears_frame_settings = "double_ears_frame_settings",
  
  /** Regular frame configuration settings changed */
  regular_frame_settings = "regular_frame_settings",
  
  /** General frame configuration settings changed */
  frame_settings = "frame_settings",
  
  /** Peak pentagon frame configuration settings changed */
  peak_pentagon_frame_settings = "peak_pentagon_frame_settings",
  
  /** Half circle frame configuration settings changed */
  half_circle_frame_settings = "half_circle_frame_settings",
  
  /** Frame joint connection method changed */
  frame_joint_way = "frame_joint_way",
  
  /** Bead configuration settings changed */
  bead_settings = "bead_settings",
  
  /** Bar endpoint configuration changed */
  bar_endpoint = "bar_endpoint",
  
  /** Bar modifier settings changed */
  bar_modifier = "bar_modifier",
  
  /** Sash configuration settings changed */
  sash_settings = "sash_settings",
  
  /** KFC sash configuration settings changed */
  kfc_sash_settings = "kfc_sash_settings",
  
  /** Wall configuration settings changed */
  wall_settings = "wall_settings",
  
  /** Sash group configuration settings changed */
  sash_group_settings = "sash_group_settings",
  
  /** Sash bar configuration settings changed */
  sash_bar_settings = "sash_bar_settings",
  
  /** Handle position has been changed */
  handle_position_change = "handle_position_change",
  
  /** Wall shape has been changed */
  wall_shape_change = "wall_shape_change",
  
  /** Anti-theft configuration settings changed */
  antitheft_setting = "antitheft_setting",
  
  /** Frame bar dimension changed */
  frame_bar_dim = "frame_bar_dim",
  
  /** Filler configuration settings changed */
  filler_settings = "filler_settings",
  
  /** Chinese-style decoration bar settings changed */
  decoration_bar_chinese = "decoration_bar_chinese",
  
  /** Chinese-style 4 decoration bar settings changed */
  decoration_bar_chinese4 = "decoration_bar_chinese4",
  
  /** Semi-arc decoration bar settings changed */
  decoration_bar_semi_arc = "decoration_bar_semi_arc",
  
  /** Prairie-style decoration bar settings changed */
  decoration_bar_prairie = "decoration_bar_prairie",
  
  /** Colonial-style decoration bar settings changed */
  decoration_bar_colonial = "decoration_bar_colonial",
  
  /** Diamond-pattern decoration bar settings changed */
  decoration_bar_diamond = "decoration_bar_diamond",
  
  /** Top view display mode changed */
  top_view_change = "top_view_change",
  
  /** Corner joiner configuration settings changed */
  corner_joiner_settings = "corner_joiner_settings",
  
  /** Skew text editing event */
  edit_skew_text = "edit_skew_text",
  
  /** Corner joiner face width text editing event */
  edit_cornerJoiner_faceWidth_text = "edit_cornerJoiner_faceWidth_text",
  
  /** 3D arc text editing event */
  edit_threed_arc_text = "edit_threed_arc_text",
  
  /** Connector configuration settings changed */
  connector_settings = "connector_settings",
  
  /** Dimension configuration settings changed */
  dim_setting = "dim_setting",
  
  /** Dimension name has been modified */
  dim_name_modified = "dim_name_modified",
  
  /** Structure has been changed */
  structure_changed = "structure_changed",
  
  /** Dimension editing event */
  dim_edit = "dim_edit",
  
  /** Note configuration settings changed */
  note_settings = "note_settings",
  
  /** Glass hole configuration settings changed */
  glass_hole_settings = "glass_hole_settings",
  
  /** 3D arc frame configuration settings changed */
  threed_arc_frame_settings = "threed_arc_frame_settings",
  
  /** Draw hit detection event for WebCC */
  drawhit_webcc = "drawhit_webcc",
  
  /** Draw scene rendering event for WebCC */
  drawscene_webcc = "drawscene_webcc",
  
  /** Profile structure changed */
  profile_struct = "profile_struct",
  
  /** Frame hit detection event */
  frame_hit = "frame_hit",
  
  /** Turning detection event */
  turning_detect = "turning_detect",
  
  /** Angled frame configuration settings changed */
  angled_frame_settings = "angled_frame_settings",
  
  /** Angled frame 2 configuration settings changed */
  angled_frame2_settings = "angled_frame2_settings",
  
  /** Drag operation has finished */
  drag_finished = "drag_finished",
  
  /** Rounded rectangle frame configuration settings changed */
  rounded_rectang_frame_settings = "rounded_rectang_frame_settings"
}