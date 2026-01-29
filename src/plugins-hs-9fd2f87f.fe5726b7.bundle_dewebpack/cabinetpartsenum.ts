export const CounterTopLocalIds = {
  countertop: "countertop",
  backsplash: "backsplash",
  noDripEdge: "noDripEdge"
} as const;

export const StateIds = {
  counter_top_thickness: "id_counter_top_thickness",
  backsplash_height: "id_backsplash_height",
  nodripedge_height: "id_nodripedge_height",
  extend_left: "id_extend_left",
  extend_right: "id_extend_right",
  extend_front: "id_extend_front",
  extend_back: "id_extend_back",
  noDripEdgeOriginHeight: "id_noDripEdge_origin_height",
  global_z: "id_global_position_z"
} as const;

export const CabinetPartsEnum = {
  LeftBoard: "id_model_left_board",
  RightBoard: "id_model_right_board",
  BottomBoard: "id_model_bottom_board",
  TopBoardBack: "id_model_top_board_back",
  TopBoardFront: "id_model_top_board_front",
  BackBoard: "id_model_back_board",
  Door: "id_content_door",
  DoorHandler: "id_content_door_handler",
  LeftLightBoard: "id_model_left_light_board",
  RightLightBoard: "id_model_right_light_board",
  MiddleBoard: "id_model_middle_board"
} as const;

export const ThicknessEnum = {
  Board20: "id_board_width_20"
} as const;

export const DirectionEnum = {
  Left: "left",
  Right: "right"
} as const;

export const ExtendDirectionEnum = {
  front: "front",
  back: "back",
  left: "left",
  right: "right"
} as const;

export const CatalogCabinetEnum = {
  Shejijia: "sc_cbnt_sjj",
  Zhibang: "sc_cbnt_zb"
} as const;

export const CatalogWardrobeEnum = {
  Shejijia: "sc_wardrobe_sjj"
} as const;

export const CatalogAllBrands: readonly string[] = [
  ...Object.values(CatalogCabinetEnum),
  ...Object.values(CatalogWardrobeEnum)
];

export const DrawerOpenStyleEnum = {
  AllOpen: "AllOpen",
  AllClose: "AllClose",
  Stackup: "Stackup"
} as const;

export const canNotDeleteComponentIDEnum = {
  id_bd1: "id_bd1",
  id_bd2: "id_bd2",
  id_bd3: "id_bd3",
  id_bd4: "id_bd4",
  id_bd5: "id_bd5"
} as const;