/**
 * Cabinet parts enumeration module
 * Defines various enumerations and identifiers for cabinet components, materials, and configurations
 */

/**
 * Counter top component local identifiers
 */
export declare const CounterTopLocalIds: {
  /** Main countertop surface */
  readonly countertop: "countertop";
  /** Backsplash component */
  readonly backsplash: "backsplash";
  /** No-drip edge component */
  readonly noDripEdge: "noDripEdge";
};

/**
 * State identifier mappings for cabinet component properties
 */
export declare const StateIds: {
  /** Counter top thickness state identifier */
  readonly counter_top_thickness: "id_counter_top_thickness";
  /** Backsplash height state identifier */
  readonly backsplash_height: "id_backsplash_height";
  /** No-drip edge height state identifier */
  readonly nodripedge_height: "id_noDripEdge_height";
  /** Left extension state identifier */
  readonly extend_left: "id_extend_left";
  /** Right extension state identifier */
  readonly extend_right: "id_extend_right";
  /** Front extension state identifier */
  readonly extend_front: "id_extend_front";
  /** Back extension state identifier */
  readonly extend_back: "id_extend_back";
  /** No-drip edge original height state identifier */
  readonly noDripEdgeOriginHeight: "id_noDripEdge_origin_height";
  /** Global Z-axis position state identifier */
  readonly global_z: "id_global_position_z";
};

/**
 * Cabinet structural parts model identifiers
 */
export declare const CabinetPartsEnum: {
  /** Left side board model identifier */
  readonly LeftBoard: "id_model_left_board";
  /** Right side board model identifier */
  readonly RightBoard: "id_model_right_board";
  /** Bottom board model identifier */
  readonly BottomBoard: "id_model_bottom_board";
  /** Top back board model identifier */
  readonly TopBoardBack: "id_model_top_board_back";
  /** Top front board model identifier */
  readonly TopBoardFront: "id_model_top_board_front";
  /** Back board model identifier */
  readonly BackBoard: "id_model_back_board";
  /** Door content identifier */
  readonly Door: "id_content_door";
  /** Door handler content identifier */
  readonly DoorHandler: "id_content_door_handler";
  /** Left light board model identifier */
  readonly LeftLightBoard: "id_model_left_light_board";
  /** Right light board model identifier */
  readonly RightLightBoard: "id_model_right_light_board";
  /** Middle board model identifier */
  readonly MiddleBoard: "id_model_middle_board";
};

/**
 * Board thickness specifications
 */
export declare const ThicknessEnum: {
  /** 20mm board width identifier */
  readonly Board20: "id_board_width_20";
};

/**
 * Direction enumeration for left/right positioning
 */
export declare const DirectionEnum: {
  /** Left direction */
  readonly Left: "left";
  /** Right direction */
  readonly Right: "right";
};

/**
 * Extension direction enumeration for cabinet components
 */
export declare const ExtendDirectionEnum: {
  /** Front extension direction */
  readonly front: "front";
  /** Back extension direction */
  readonly back: "back";
  /** Left extension direction */
  readonly left: "left";
  /** Right extension direction */
  readonly right: "right";
};

/**
 * Cabinet catalog brand identifiers
 */
export declare const CatalogCabinetEnum: {
  /** Shejijia cabinet brand */
  readonly Shejijia: "sc_cbnt_sjj";
  /** Zhibang cabinet brand */
  readonly Zhibang: "sc_cbnt_zb";
};

/**
 * Wardrobe catalog brand identifiers
 */
export declare const CatalogWardrobeEnum: {
  /** Shejijia wardrobe brand */
  readonly Shejijia: "sc_wardrobe_sjj";
};

/**
 * Combined list of all catalog brands (cabinets and wardrobes)
 */
export declare const CatalogAllBrands: readonly string[];

/**
 * Drawer opening style enumeration
 */
export declare const DrawerOpenStyleEnum: {
  /** All drawers open */
  readonly AllOpen: "AllOpen";
  /** All drawers closed */
  readonly AllClose: "AllClose";
  /** Drawers in stacked/cascading open state */
  readonly Stackup: "Stackup";
};

/**
 * Component identifiers that cannot be deleted (protected components)
 */
export declare const canNotDeleteComponentIDEnum: {
  /** Protected board component 1 */
  readonly id_bd1: "id_bd1";
  /** Protected board component 2 */
  readonly id_bd2: "id_bd2";
  /** Protected board component 3 */
  readonly id_bd3: "id_bd3";
  /** Protected board component 4 */
  readonly id_bd4: "id_bd4";
  /** Protected board component 5 */
  readonly id_bd5: "id_bd5";
};