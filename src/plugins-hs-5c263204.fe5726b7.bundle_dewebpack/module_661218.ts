export interface HotkeyItem {
  key: string;
  value: string[];
  noAddIcon?: boolean;
  newDot?: boolean;
}

export interface HotkeySymbolMap {
  mac: string;
  windows: string;
}

export interface HotkeySymbols {
  meta: HotkeySymbolMap;
  shift: HotkeySymbolMap;
  option: HotkeySymbolMap;
  control: HotkeySymbolMap;
}

export interface HotkeyData {
  setting_nav_preferences: HotkeyItem[][];
  toolbar_toggleHouseTemplate: HotkeyItem[][];
  toolbar_hotkeys_customized_feature: HotkeyItem[][];
  interior_modeling_new: HotkeyItem[][];
  plugin_feedback_tag_custom: HotkeyItem[][];
  hotkeys_pave: HotkeyItem[][];
  concealedwork_catalog_model: HotkeyItem[][];
  toolBar_snapshot_snapshot: HotkeyItem[][];
}

export const hotkeyData: HotkeyData = {
  setting_nav_preferences: [
    [
      {
        key: "share_design_shareLinkBtnText",
        value: ["O"]
      },
      {
        key: "toolbar_hotkeys_auto_save",
        value: ["meta", "S"]
      },
      {
        key: "toolbar_hotkeys_small_adjust",
        value: ["↑", "↓", "←", "→"],
        noAddIcon: true
      },
      {
        key: "toolBar_save_as",
        value: ["meta", "shift", "S"]
      },
      {
        key: "toolBar_undo",
        value: ["meta", "Z"]
      },
      {
        key: "toolBar_redo",
        value: ["meta", "Y"]
      },
      {
        key: "toolBar_edit_hide",
        value: ["meta", "H"]
      },
      {
        key: "toolbar_hotkeys_show_all_hide",
        value: ["meta", "shift", "H"]
      },
      {
        key: "hotkeys_replace",
        value: ["x"],
        newDot: true
      },
      {
        key: "toolBar_edit_group",
        value: ["meta", "G"]
      },
      {
        key: "toolBar_edit_ungroup",
        value: ["meta", "shift", "G"]
      },
      {
        key: "toolBar_material_brush_event",
        value: ["B"]
      },
      {
        key: "toolbar_hotkeys_select_model",
        value: ["meta", "D"]
      },
      {
        key: "toolbar_hotkeys_3D_model_center",
        value: ["Z"]
      },
      {
        key: "toolBar_measure_event",
        value: ["U"]
      }
    ],
    [
      {
        key: "contextmenu_viewmode_plane_event",
        value: ["1"]
      },
      {
        key: "contextmenu_viewmode_rcp_event",
        value: ["2"]
      },
      {
        key: "toolbar_hotkeys_viewmode_bird",
        value: ["3"]
      },
      {
        key: "toolbar_hotkeys_viewmode_roam",
        value: ["4"]
      },
      {
        key: "contextmenu_viewmode_elevation_event",
        value: ["5"]
      },
      {
        key: "toolbar_hotkeys_changeview_2d_3d",
        value: ["Tab"]
      }
    ],
    [
      {
        key: "plugin_contextualtools_toggleMaterialMode",
        value: ["option", "1"]
      },
      {
        key: "plugin_customized_toolbar_toggleFaceWireframeMode",
        value: ["option", "2"]
      },
      {
        key: "plugin_customized_toolbar_toggleFaceWireframeMaterialMode",
        value: ["option", "3"]
      },
      {
        key: "plugin_customized_toolbar_toggleWireframeMode",
        value: ["option", "4"]
      }
    ],
    [
      {
        key: "toolBar_edit_emptyView",
        value: ["meta", "shift", "Del"]
      },
      {
        key: "toolBar_edit_emptyFurniture",
        value: ["shift", "Del"]
      },
      {
        key: "toolBar_edit_emptyOrnaments",
        value: ["option", "Del"]
      }
    ],
    [
      {
        key: "toolBar_floorplan_auxiliaryline",
        value: ["meta", "U"],
        newDot: true
      }
    ],
    [
      {
        key: "toolBar_zoomIn_hotkey",
        value: ["meta", "="]
      },
      {
        key: "toolBar_zoomOut_hotkey",
        value: ["meta", "-"]
      },
      {
        key: "toolBar_fit_screen",
        value: ["meta", "0"]
      },
      {
        key: "toolBar_zoom_part",
        value: ["meta", "9"]
      },
      {
        key: "toolbar_hotkeys_camera_rotate",
        value: ["Space"]
      }
    ],
    [
      {
        key: "toolbar_hotkeys_3D_view_rotate",
        value: ["W", "A", "S", "D"],
        noAddIcon: true
      },
      {
        key: "toolbar_hotkeys_3D_height_move",
        value: ["Q", "E"],
        noAddIcon: true
      }
    ]
  ],
  toolbar_toggleHouseTemplate: [
    [
      {
        key: "toolbar_hotkeys_draw_line_wall",
        value: ["L"]
      },
      {
        key: "toolbar_hotkeys_draw_arc_wall",
        value: ["K"]
      },
      {
        key: "toolbar_hotkeys_draw_room",
        value: ["R"]
      }
    ]
  ],
  toolbar_hotkeys_customized_feature: [
    [
      {
        key: "add_line_event",
        value: ["L"]
      },
      {
        key: "add_region_event",
        value: ["R"]
      },
      {
        key: "plugin_customized_toolbar_polygon",
        value: ["P"]
      },
      {
        key: "mixpaint_addCircle",
        value: ["C"]
      },
      {
        key: "mixpaint_addFillet",
        value: ["F"]
      },
      {
        key: "toolBar_hotkeys_molding_brush",
        value: ["B"]
      },
      {
        key: "mixpaint_boundary_skew",
        value: ["O"]
      },
      {
        key: "toolBar_hotkeys_draw_guideline",
        value: ["meta", "U"]
      },
      {
        key: "toolBar_hotkeys_show_hide_guideline",
        value: ["control", "Q"]
      }
    ]
  ],
  interior_modeling_new: [
    [
      {
        key: "add_line_event",
        value: ["L"]
      },
      {
        key: "add_region_event",
        value: ["R"]
      },
      {
        key: "mixpaint_addCircle",
        value: ["C"]
      },
      {
        key: "hotkeys_curve",
        value: ["meta", "L"]
      },
      {
        key: "hotkeys_arch",
        value: ["K"]
      },
      {
        key: "hotkeys_draw_arch",
        value: ["meta", "K"]
      },
      {
        key: "plugin_customizedModeling_draw_ellipse",
        value: ["meta", "E"]
      }
    ],
    [
      {
        key: "hotkeys_backward_option",
        value: ["meta", "I"]
      },
      {
        key: "plugin_leftmenu_move",
        value: ["M"]
      },
      {
        key: "toolBar_material_brush_event",
        value: ["B"]
      },
      {
        key: "plugin_sketch2d_toolbar_guide_line",
        value: ["meta", "U"]
      },
      {
        key: "plugin_customized_toolbar_rotateguideline",
        value: ["meta", "shift", "U"]
      },
      {
        key: "hotkeys_component",
        value: ["option", "G"]
      },
      {
        key: "hotkeys_hide_component",
        value: ["option", "H"]
      },
      {
        key: "hotkeys_show_scene",
        value: ["H"]
      },
      {
        key: "hotkeys_lock_xyz",
        value: ["←", "→", "↑"],
        noAddIcon: true
      }
    ],
    [
      {
        key: "customized_model_extrude_event",
        value: ["P"]
      },
      {
        key: "customized_model_offset_event",
        value: ["O"]
      },
      {
        key: "mixpaint_addFillet",
        value: ["F"]
      },
      {
        key: "mixpaint_addFillet_3D",
        value: ["shift", "F"]
      },
      {
        key: "customized_model_lineraid_event",
        value: ["option", "A"]
      },
      {
        key: "plugin_customized_toolbar_radioraid",
        value: ["shift", "A"]
      },
      {
        key: "plugin_customized_toolbar_curveraid",
        value: ["shift", "option", "A"]
      },
      {
        key: "hotkeys_sweep",
        value: ["shift", "S"]
      },
      {
        key: "hotkeys_normal_direction_rotate",
        value: ["Z"]
      },
      {
        key: "plugin_customized_toolbar_rotate",
        value: ["shift", "Q"]
      },
      {
        key: "hotkeys_rotate_form",
        value: ["option", "S"]
      },
      {
        key: "hotkeys_loft",
        value: ["X"]
      }
    ]
  ],
  plugin_feedback_tag_custom: [
    [
      {
        key: "hotkeys_change_snap",
        value: ["option", "A"]
      },
      {
        key: "plugin_customized_toolbar_rotate",
        value: ["meta", "R"]
      },
      {
        key: "hotkeys_slidingdoor",
        value: ["T"]
      },
      {
        key: "hotkeys_cabinet_door_mode",
        value: ["B"]
      },
      {
        key: "cabinet_material_brush_event",
        value: ["control", "B"]
      },
      {
        key: "toolBar_mix_brush_with_hotkey",
        value: ["option", "B"]
      }
    ]
  ],
  hotkeys_pave: [
    [
      {
        key: "add_line_event",
        value: ["L"]
      },
      {
        key: "add_region_event",
        value: ["R"]
      },
      {
        key: "plugin_customized_toolbar_polygon",
        value: ["P"]
      },
      {
        key: "mixpaint_addCircle",
        value: ["C"]
      },
      {
        key: "mixpaint_addFillet",
        value: ["F"]
      },
      {
        key: "toolBar_hotkeys_molding_brush",
        value: ["B"]
      },
      {
        key: "mixpaint_boundary_skew",
        value: ["O"]
      },
      {
        key: "toolBar_hotkeys_draw_guideline",
        value: ["meta", "U"]
      },
      {
        key: "toolBar_hotkeys_show_hide_guideline",
        value: ["control", "Q"]
      },
      {
        key: "hotkeys_pave_direction",
        value: ["Space"]
      }
    ]
  ],
  concealedwork_catalog_model: [
    [
      {
        key: "plugin_concealedwork_toolbar_edit_deletealltube",
        value: ["meta", "Del"]
      }
    ]
  ],
  toolBar_snapshot_snapshot: [
    [
      {
        key: "hotkeys_light_target",
        value: ["X"]
      }
    ]
  ]
};

export const hotkeySymbol: HotkeySymbols = {
  meta: {
    mac: "⌘",
    windows: "Ctrl"
  },
  shift: {
    mac: "⇧",
    windows: "⇧"
  },
  option: {
    mac: "⌥",
    windows: "Alt"
  },
  control: {
    mac: "⌃",
    windows: "Ctrl"
  }
};