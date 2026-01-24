/**
 * Localization strings for drawing and design tools (Vietnamese locale)
 * Module: Architectural Drawing Tools i18n
 */
declare module 'module_17c4' {
  /**
   * Interface defining all localization keys for the drawing module
   */
  interface DrawingToolsLocalization {
    /** Drawing tool label - "Vẽ" (Draw) */
    draw: string;
    
    /** Translate transformation tool */
    translate: string;
    
    /** Extend tool for geometric operations */
    extend: string;
    
    /** Create trough structural element */
    create_trough: string;
    
    /** Create beam structural element */
    create_beam: string;
    
    /** Supply plane tool */
    supply_plane: string;
    
    /** Plane geometry tool */
    plane: string;
    
    /** Design window configuration panel */
    design_window: string;
    
    /** Create wall tool - "Thêm tường" (Add wall) */
    create_wall: string;
    
    /** Wall color picker option */
    wall_color: string;
    
    /** Create 3D model generation */
    create_3d: string;
    
    /** Apply changes action - "Xác nhận" related */
    apply: string;
    
    /** Connect dimension measurement tool */
    ConnectDimension: string;
    
    /** Create centrum/center point */
    create_centrum: string;
    
    /** Centrum size configuration */
    centrum_size: string;
    
    /** Plane scaling factor */
    plane_scale: string;
    
    /** Tooltip: "positive number will enlarge and negative number will reduce" */
    plane_scale_tip: string;
    
    /** Wall structural element - "Thêm tường" (Add wall) */
    wall: string;
    
    /** Auxiliary node for construction */
    aux_node: string;
    
    /** Auxiliary edge for construction */
    aux_edge: string;
    
    /** Pillar/column structural element */
    pillar: string;
    
    /** Window element - "Cửa sổ" (Window) */
    window: string;
    
    /** Pillar color picker option */
    pillar_color: string;
    
    /** Scope of application for changes */
    apply_scope: string;
    
    /** Current selection scope only */
    current: string;
    
    /** All elements scope - "Tất cả" (All) */
    all: string;
    
    /** Edit window configuration */
    edit_window: string;
    
    /** Length measurement - "Chiều dài" (Length) */
    length: string;
    
    /** Extend to left direction */
    to_left: string;
    
    /** Extend to right direction */
    to_right: string;
    
    /** Apply to both ends */
    both_ends: string;
    
    /** Tooltip: "length change direction" */
    pillar_length_tip: string;
    
    /** Break/split element operation */
    break: string;
    
    /** Horizontal division tool */
    h_divide: string;
    
    /** Vertical division tool */
    v_divide: string;
    
    /** Polygon division tool */
    poly_divide: string;
    
    /** Pillar length dimension */
    pillar_length: string;
    
    /** Confirm action - "Xác nhận" (Confirm) */
    confirm: string;
    
    /** Herringbone pattern top configuration */
    herring_bone_top: string;
    
    /** Generate output action */
    generate: string;
    
    /** Slope/gradient parameter */
    slope: string;
    
    /** Trapezoid shape - "Hình thang" (Trapezoid) */
    trapezoid: string;
    
    /** Trapezoid width dimension */
    trapezoid_width: string;
    
    /** Trapezoid height dimension */
    trapezoid_height: string;
    
    /** Color picker - "Màu sắc" (Color) */
    color: string;
    
    /** Thickness parameter */
    thick: string;
    
    /** Flume/channel color option */
    flume_color: string;
  }

  /**
   * Exported localization object containing Vietnamese translations
   * for architectural drawing and design tools
   */
  const localization: DrawingToolsLocalization;
  
  export = localization;
}