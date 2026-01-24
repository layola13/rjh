/**
 * Default toolbar event handler for the design application
 * Handles all toolbar button clicks and state changes
 */
export interface ToolbarHandler {
  /**
   * Event tracking instance
   */
  eventTrack?: EventTrack;
  
  /**
   * User input plugin instance
   */
  userInputPlugin?: UserInputPlugin;

  /**
   * Initialize handler with required dependencies
   */
  setParams(params: { userInputPlugin: UserInputPlugin }): void;

  // File Operations
  /** Save current design */
  toolBar_save_Click(): void;
  
  /** Save design with new name */
  toolBar_save_as_Click(): void;
  
  /** Create new design document */
  toolBar_new_Click(): void;
  
  /** Load existing design */
  toolBar_load_Click(): void;

  // Export Operations
  /** Export 2D image with furniture */
  toolBar_export_pic_furniture_Click(): void;
  
  /** Export 2D image without furniture */
  toolBar_export_pic_no_furniture_Click(): void;
  
  /** Export 2D image with paint layers */
  toolBar_export_pic_with_paint_Click(): void;
  
  /** Export model summary/BOM */
  toolBar_export_model_summary_Click(): void;

  // Edit Operations
  /** Undo last action */
  toolBar_undo_Click(): void;
  
  /** Redo last undone action */
  toolBar_redo_Click(): void;
  
  /** Duplicate selected items */
  toolBar_edit_duplicate_Click(): void;
  
  /** Copy selected items */
  toolBar_edit_copy_Click(): void;
  
  /** Cut selected items */
  toolBar_edit_cut_Click(): void;
  
  /** Paste items from clipboard */
  toolBar_edit_paste_Click(): void;
  
  /** Delete selected items */
  toolBar_edit_delete_Click(): void;
  
  /** Hide selected items */
  toolBar_edit_hide_Click(): void;
  
  /** Flip selected content */
  toolBar_edit_flip_Click(): void;
  
  /** Replace selected model */
  toolBar_edit_replace_Click(): void;
  
  /** Group selected items */
  toolBar_edit_group_Click(): void;
  
  /** Ungroup selected group */
  toolBar_edit_ungroup_Click(): void;

  // Clear Operations
  /** Clear all furniture from design */
  toolBar_edit_emptyFurniture_Click(): void;
  
  /** Clear all hard decorations */
  toolBar_edit_emptyHardDecoration_Click(): void;
  
  /** Clear all decorations */
  toolBar_edit_emptyDecoration_Click(): void;
  
  /** Clear all auxiliary lines */
  toolBar_edit_emptyAuxiliaryLine_Click(): void;

  // Floorplan Operations
  /** Create auxiliary line */
  toolBar_floorplan_auxiliaryline_Click(): void;
  
  /** Mirror floorplan horizontally */
  toolBar_floorplan_mirrorHorizontal_Click(): void;
  
  /** Mirror floorplan vertically */
  toolBar_floorplan_mirrorVertical_Click(): void;
  
  /** Copy floorplan to clipboard */
  toolBar_floorplan_copy_Click(): void;
  
  /** Align to layer above */
  toolBar_floorplan_alignToAboveLayer_Click(): void;
  
  /** Align to layer below */
  toolBar_floorplan_alignToBelowLayer_Click(): void;

  // View Toggle Operations
  /** Toggle room area display */
  toolbar_toggleArea_Click(): void;
  toolbar_toggleArea_Change(visible: boolean): void;
  
  /** Toggle dimension display */
  toolbar_toggleDimension_Click(): void;
  
  /** Toggle grid display */
  toolbar_toggleGrid_Click(): void;
  toolbar_toggleGrid_Change(visible: boolean): void;
  
  /** Toggle background display */
  toolbar_toggleBackground_Click(): void;
  toolbar_toggleBackground_Change(visible: boolean): void;
  
  /** Toggle auxiliary lines */
  toolbar_toggleAuxiliaryLine_Change(visible: boolean): void;
  
  /** Toggle room type labels */
  toolbar_toggleRoomType_Click(): void;
  toolbar_toggleRoomType_Change(visible: boolean): void;
  
  /** Toggle furniture visibility */
  toolbar_toggleFurniture_Change(visible: boolean): void;
  
  /** Toggle ceiling visibility */
  toolbar_toggleCeiling_Change(visible: boolean): void;
  
  /** Toggle roof visibility */
  toolbar_toggleRoof_Change(visible: boolean): void;
  
  /** Toggle top ceiling visibility */
  toolbar_toggleTopCeiling_Change(visible: boolean): void;
  
  /** Toggle lighting visibility */
  toolbar_toggleLight_Change(visible: boolean): void;
  
  /** Toggle floor cabinets */
  toolbar_toggleFloorCabinet_Change(visible: boolean): void;
  
  /** Toggle high cabinets */
  toolbar_toggleHightCabinet_Change(visible: boolean): void;
  
  /** Toggle no-wall mode (half wall display) */
  toolbar_toggleNoWallMode_Click(): void;
  toolbar_toggleNoWallMode_Change(enabled: boolean): void;
  
  /** Show all hidden models */
  toolbar_toggleShowAll_Click(): void;

  // Electrical & Utilities Toggles
  /** Toggle power switches */
  toolbar_togglePowerSwitch_Change(visible: boolean): void;
  
  /** Toggle strong current sockets */
  toolbar_toggleStrongSocket_Change(visible: boolean): void;
  
  /** Toggle weak current sockets */
  toolbar_toggleWeakSocket_Change(visible: boolean): void;
  
  /** Toggle water holes */
  toolbar_toggleWaterHole_Change(visible: boolean): void;
  
  /** Toggle DIY elements */
  toolbar_toggleDIY2_Change(visible: boolean): void;

  // Category-specific Toggles
  /** Toggle other furniture */
  toolbar_toggleOtherFurniture_Change(visible: boolean): void;
  
  /** Toggle electrical appliances */
  toolbar_toggleElectricalAppliances_Change(visible: boolean): void;
  
  /** Toggle customized accessories */
  toolbar_toggleCustomizedAccessory_Change(visible: boolean): void;
  
  /** Toggle customized furniture */
  toolbar_toggleCustomizedFurniture_Change(visible: boolean): void;
  
  /** Toggle cabinet doors */
  toolbar_toggleCabinetDoor_Change(visible: boolean): void;
  
  /** Toggle feature walls */
  toolbar_toggleFeatureWall_Change(visible: boolean): void;
  
  /** Toggle platforms */
  toolbar_togglePlatform_Change(visible: boolean): void;
  
  /** Toggle marketing cabinets */
  toolbar_toggleMarketingCabinet_Change(visible: boolean): void;
  
  /** Toggle marketing closets */
  toolbar_toggleMarketingCloset_Change(visible: boolean): void;
  
  /** Toggle marketing system cabinets */
  toolbar_toggleMarketingSystemCabinet_Change(visible: boolean): void;
  
  /** Toggle marketing decorations */
  toolbar_toggleMarketingDecoration_Change(visible: boolean): void;

  // Molding Toggles
  /** Toggle gypsum moldings */
  toolbar_gypsum_Change(visible: boolean): void;
  
  /** Toggle baseboard moldings */
  toolbar_baseboard_Change(visible: boolean): void;
  
  /** Toggle decoration moldings */
  toolbar_decoration_Change(visible: boolean): void;

  // Dimension Settings
  /** Set inner wall dimension mode */
  setting_dim_inner_Change(enabled: boolean): void;
  
  /** Set center wall dimension mode */
  setting_dim_center_Change(enabled: boolean): void;
  
  /** Hide dimensions */
  setting_dim_hide_Change(enabled: boolean): void;

  // Precision Location Modes
  /** Toggle 2D precision location mode */
  toolBar_toggle2DPrecisionLocationMode_Click(): void;
  toolBar_toggle2DPrecisionLocationMode_Change(enabled: boolean): void;
  
  /** Toggle 3D precision location mode */
  toolBar_toggle3DPrecisionLocationMode_Click(): void;
  toolBar_toggle3DPrecisionLocationMode_Change(enabled: boolean): void;

  // Tools
  /** Activate measurement tool */
  toolBar_measure_Click(): void;
  
  /** Activate material brush tool */
  toolBar_material_brush_Click(): void;

  // Upload & Background
  /** Upload background image */
  toolBar_upload_data_upload_Click(): void;
  
  /** Delete background image */
  toolBar_upload_data_delete_Click(): void;

  // Help & Guide
  /** Show quick guide */
  toolBar_quickguide_Click(): void;
  
  /** Show operation guide */
  toolBar_operateguide_Click(): void;
  
  /** Show new user video tutorials */
  toolBar_guidNewVideo_Click(): void;
  
  /** Show DIY tutorial center */
  toolBar_guidfordiy_Click(): void;
  
  /** Show about dialog */
  toolBar_aboutus_Click(): void;

  // Design Management
  /** Edit design properties */
  toolBar_edit_properties_Click(): void;
  
  /** Export BOM (Bill of Materials) list */
  toolBar_bom_list_Click(): void;
  
  /** Share design case */
  toolBar_share_case_Click(): void;

  // Wall Operations
  /** Check if walls form closed rooms */
  toolBar_check_wall_closed_Change(enabled: boolean): void;

  // View Options Hover Events
  /** Handle mouse enter on view options model menu */
  toolbar_viewOptionsModel_OnMouseEnter(): void;
  
  /** Handle mouse leave on view options model menu */
  toolbar_viewOptionsModel_OnMouseLeave(): void;

  // AI Features
  /** Open AI modeler tool */
  toolbar_ai_modeler_Click(): void;
  
  /** Open AI moodboard generator */
  toolbar_ai_moodboard_Click(): void;
  
  /** Open AI material generator */
  toolbar_ai_material_Click(): void;

  // Internal Helper Methods
  /** Show mixpaint picture confirmation dialog */
  _showMixpaintPicDialog(): Promise<void>;
  
  /** Confirm and execute mixpaint picture export */
  _confirmMixpaintPic(): void;
  
  /** Execute background upload workflow */
  toolBar_uploadbackground(): void;
  
  /** Execute underlay deletion */
  toolBar_excuteDelete(): void;
  
  /** Handle dimension display change */
  setting_dim_change(visible: boolean): void;
  
  /** Create new empty document */
  _newDocument(): void;
}

/**
 * Default toolbar handler singleton instance
 */
export declare const defaultToolbarHandler: ToolbarHandler;

/**
 * Event tracking utility
 */
interface EventTrack {
  track(group: string, eventName: string): void;
}

/**
 * User input plugin for handling keyboard/mouse input
 */
interface UserInputPlugin {
  fireCopy(): void;
  fireCut(): void;
  firePaste(): void;
  actions: {
    deleteSelectedItems(): void;
    clearFurnitures(confirm?: boolean, callback?: () => void, showHint?: boolean): void;
    clearHardDecorations(confirm?: boolean, callback?: () => void, showHint?: boolean): void;
    clearDecorations(confirm?: boolean, callback?: () => void, showHint?: boolean): void;
  };
}