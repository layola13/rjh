export enum ColorModeEnum {
  texture = "texture",
  color = "color",
  blend = "blend"
}

interface MoldingParam {
  MIN_HEIGHT: number;
  MAX_HEIGHT: number;
}

interface MaterialData {
  textureURI?: string;
  seekId: string;
  color?: number;
  colorMode: ColorModeEnum;
  tileSize?: number;
  tileSize_x?: number;
  tileSize_y?: number;
  categoryId?: string;
  textureURIDefault?: string;
  iconSmallURI?: string;
  iconLargeURI?: string;
  normalTexture?: string;
  normalTileSize_x?: number;
  normalTileSize_y?: number;
  flipX?: boolean;
  flipY?: boolean;
  isCustomized?: boolean;
  offsetX?: number;
  offsetY?: number;
  rotation?: number;
  seamColor?: number;
  seamFillerSupported?: boolean;
  seamWidth?: number;
  userDefined?: unknown;
  uvConsistentInfo?: Record<string, unknown>;
  wrap?: number;
  defaultTextureURI?: string;
}

interface EdgeProfile {
  profile: string;
  XSize: number;
  YSize: number;
}

interface WindowSillModelMeta {
  concretHeight: number;
  concretWidth: number;
  edgeProfile: EdgeProfile;
  height: number;
  materialData: MaterialData;
  name: string;
  partName: string;
  type: string;
  unit: string;
}

const LOCAL_MATERIAL_SEEKID = "c53afd8f-6b30-4d1b-8454-0138ff5d7147";
const DEFAULT_FLOOR_SEEKID = "9437af46-1820-432b-b882-a1455d4d1be9";

export const Constants = {
  TOLERANCE: 0.001,
  SKETCH2D_LENGTH_TOL: 0.0008,
  Canvas_Width: 500,
  Canvas_Height: 500,
  Max_Vertex_Value: 250,
  Grid_Spacing: 0.5,
  Major_Lines_Every_Nth_Grid_Line: 5,
  LAYER_HEIGHT: 3,
  SLAB_THICKNESS: 0.1,
  MIN_SLAB_THICKNESS: 0.03,
  MAX_SLAB_THICKNESS: 1,
  OUTDOOR_TOP_FACE_Z: -0.001,
  DOOR_SHIFT_OFFSET: 0.06,
  DEFAULT_DOOR_BODY_THICKNESS: 0.045,
  MAX_OPENING_SIZE: 1000000,
  MIN_OPENING_SIZE: 0.0001,
  DEFAULT_WALL_THICKNESS: 0.24,
  DEFAULT_WALL_3D_HEIGHT: 2.8,
  DEFAULT_PARTIAL_WALL_3D_HEIGHT: 1.3,
  DEFAULT_WALL_WIDTH: 0.1524,
  DEFAULT_INTERIOR_WALL_WIDTH: 0.1524,
  MIN_WALL_THICKNESS: 0.03,
  MAX_WALL_THICKNESS: 1,
  MIN_WALL_LENGTH: 0,
  MAX_WALL_LENGTH: 100,
  MIN_WALL_3D_HEIGHT: 1.5,
  MAX_WALL_3D_HEIGHT: 20,
  MINIMUM_ROOMSIZE: 0.1,
  DEFAULT_WINDOW_ELEVATION: 0.7,
  MIN_CEILING_OFFSET: 0,
  MAX_CEILING_RELATIVE_OFFSET: 2,
  DEFAULT_CEILING_OFFSET: 0.3,
  DEFAULT_MOLDING_PARAM: {
    MIN_HEIGHT: 0,
    MAX_HEIGHT: 4
  } as MoldingParam,
  CABINET_COUNTER_TOP_THICKNESS: 0.015,
  MAX_CABINET_COUNTER_TOP_THICKNESS: 0.05,
  MIN_CABINET_COUNTER_TOP_THICKNESS: 0.015,
  MAX_COUNTER_TOP_EXTEND: 10,
  MIN_COUNTER_TOP_EXTEND: 0,
  CABINET_COUNTER_TOP_DOOR_THICKNESS: 0.024,
  CABINET_DOOR_THICKNESS: 0.02,
  CABINET_TOP_LINE_OFFSET: 0.005,
  CABINET_TOE_KICK_OFFSET: 0.04,
  CABINET_HEIGHT_EQUAL_TOL: 0.001,
  CABINET_VIRTUAL_PATH_DEFAULT_DEPTH: 0.556,
  MAX_CABINET_TOEKICK_HEIGHT: 0.15,
  MIN_CABINET_TOEKICK_HEIGHT: 0.05,
  DEFAULT_VENTILATION_Z: 1.5,
  POCKET_FRAME_THICKNESS: 0.002,
  FIRSTPERSON_CAMERA_HEIGHT: 1.4,
  FIRSTPERSON_CAMERA_PITCH: 0,
  FIRSTPERSON_CAMERA_TARGET_X: 0.56,
  FIRSTPERSON_CAMERA_TARGET_Y: 0.56,
  FIRSTPERSON_CAMERA_HORIZONTAL_FOV: 55,
  FIRSTPERSON_CAMERA_HORIZONTAL_FOV_MIN: 40,
  FIRSTPERSON_CAMERA_HORIZONTAL_FOV_MAX: 120,
  FIRSTPERSON_CAMERA_CLIP: false,
  FIRSTPERSON_CAMERA_NEAR: 0.1,
  FIRSTPERSON_CAMERA_NEAR_MAX: 5,
  FIRSTPERSON_CAMERA_TARGETPOINT_HEIGHT: 1.4,
  ORBITVIEW_CAMERA_HEIGHT: 12,
  ORBITVIEW_CAMERA_PITCH: -45,
  ORBITVIEW_CAMERA_DISTANCE: 10,
  ORBITVIEW_CAMERA_TARGET_X: 0,
  ORBITVIEW_CAMERA_TARGET_Y: 0,
  ORBITVIEW_CAMERA_X: -5,
  ORBITVIEW_CAMERA_Y: -5,
  ORBITVIEW_CAMERA_Z: 7,
  ORBITVIEW_CAMERA_HORIZONTAL_FOV: 55,
  ORBITVIEW_CAMERA_HORIZONTAL_FOV_MIN: 40,
  ORBITVIEW_CAMERA_HORIZONTAL_FOV_MAX: 120,
  ORBITVIEW_CAMERA_TARGETPOINT_HEIGHT: 1.4,
  CAMERA_DEFAULT_NEAR: 0.001,
  CAMERA_DEFAULT_FAR: 200,
  VCAMERA_DIST_SCALE: 1.5,
  EXTRUDER_DEAULT_HEIGHT: 200,
  CLIP_DEAFULT_OFFSET: 20,
  DEFAULT_ENVIRONMENT_COLOR: 16777215,
  DEFAULT_ENVIRONMENT_BACKGROUND_COLOR: 15329769,
  OpeningType: 1,
  ParametricOpeningType: 2,
  DEFAULT_WALL_MATERIAL: {
    textureURI: "res/wall_stucco.jpg",
    seekId: "local",
    colorMode: ColorModeEnum.texture
  } as MaterialData,
  DEFAULT_WALL_INNER_MATERIAL: {
    seekId: LOCAL_MATERIAL_SEEKID,
    color: 16316923,
    colorMode: ColorModeEnum.color
  } as MaterialData,
  DEFAULT_WALL_AUXFACE_MATERIAL: {
    seekId: LOCAL_MATERIAL_SEEKID,
    color: 15066598,
    colorMode: ColorModeEnum.color
  } as MaterialData,
  DEFAULT_FLOOR_MATERIAL: {
    textureURI: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/9437af46-1820-432b-b882-a1455d4d1be9/wallfloor.jpg",
    tileSize: 3,
    tileSize_x: 3,
    tileSize_y: 3,
    seekId: DEFAULT_FLOOR_SEEKID,
    colorMode: ColorModeEnum.texture
  } as MaterialData,
  DEFAULT_OUTDOORFLOOR_MATERIAL: {
    textureURI: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/dd1bf529-3301-4cea-a527-ccbefb9078f9/wallfloor.jpg",
    tileSize: 3,
    tileSize_x: 3,
    tileSize_y: 3,
    seekId: "dd1bf529-3301-4cea-a527-ccbefb9078f9",
    colorMode: ColorModeEnum.texture
  } as MaterialData,
  DEFAULT_CEILING_MATERIAL: {
    seekId: LOCAL_MATERIAL_SEEKID,
    color: 16316923,
    colorMode: ColorModeEnum.color
  } as MaterialData,
  DEFAULT_POCKET_MATERIAL: {
    textureURI: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/66a5d6cd-d839-4486-802f-dd7150fe7032/wallfloor.jpg",
    tileSize_x: 1,
    tileSize_y: 1,
    seekId: "66a5d6cd-d839-4486-802f-dd7150fe7032",
    colorMode: ColorModeEnum.texture
  } as MaterialData,
  DEFAULT_WALL_WHITE_PAINT: {
    seekId: LOCAL_MATERIAL_SEEKID,
    color: 16316923,
    colorMode: ColorModeEnum.color
  } as MaterialData,
  DEFAULT_CUSTOMIZEDMODEL_MATERIAL: {
    seekId: LOCAL_MATERIAL_SEEKID,
    color: 16316923,
    colorMode: ColorModeEnum.color
  } as MaterialData,
  DEFAULT_WALL_COLOR: "#96969B",
  DEFAULT_SEAM_MATERIAL: {
    seekId: "8b14b534-b1c2-47e3-aa67-d3980aefea87",
    categoryId: "c2e7b355-8e23-4344-8798-699fda0755ec",
    color: 16777215,
    textureURI: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/8b14b534-b1c2-47e3-aa67-d3980aefea87/wallfloor_mini.png",
    textureURIDefault: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/8b14b534-b1c2-47e3-aa67-d3980aefea87/wallfloor_mini.png",
    tileSize_x: 0.01,
    tileSize_y: 0.01,
    iconSmallURI: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/8b14b534-b1c2-47e3-aa67-d3980aefea87/resized/iso_w160_h160.jpg",
    iconLargeURI: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/8b14b534-b1c2-47e3-aa67-d3980aefea87/wallfloor.png?type=icon",
    normalTexture: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/8b14b534-b1c2-47e3-aa67-d3980aefea87/material-normal.png",
    normalTileSize_x: 0.01,
    normalTileSize_y: 0.01,
    colorMode: ColorModeEnum.texture
  } as MaterialData,
  GRAY_SEAM_MATERIAL: {
    seekId: "16807240-b36e-4777-aca4-03ea45f7bf9c",
    categoryId: "c2e7b355-8e23-4344-8798-699fda0755ec",
    color: 6842470,
    textureURI: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/16807240-b36e-4777-aca4-03ea45f7bf9c/wallfloor.png",
    textureURIDefault: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/16807240-b36e-4777-aca4-03ea45f7bf9c/wallfloor.png",
    tileSize_x: 0.01,
    tileSize_y: 1,
    iconSmallURI: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/16807240-b36e-4777-aca4-03ea45f7bf9c/resized/iso_w160_h160.jpg",
    iconLargeURI: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/16807240-b36e-4777-aca4-03ea45f7bf9c/wallfloor.png?type=icon",
    normalTexture: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/16807240-b36e-4777-aca4-03ea45f7bf9c/material-normal.png",
    normalTileSize_x: 0.01,
    normalTileSize_y: 0.01,
    colorMode: ColorModeEnum.texture
  } as MaterialData,
  DEFAULT_WINDOWSILL_MODEL_META: {
    concretHeight: 0.1,
    concretWidth: 0,
    edgeProfile: {
      profile: "M0.0, 1.0 L0.7, 1.0 L1.0, 0.7 L1.0, 0.0",
      XSize: 0.03,
      YSize: 0.05
    },
    height: 0.05,
    materialData: {
      color: 16777215,
      defaultTextureURI: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/4e8506de-27a6-47a2-9f56-d58bab8c263a/wallfloor.jpg",
      flipX: false,
      flipY: true,
      isCustomized: false,
      offsetX: 0,
      offsetY: 0,
      rotation: 0,
      seamColor: 16777215,
      seamFillerSupported: true,
      seamWidth: 2,
      seekId: "4e8506de-27a6-47a2-9f56-d58bab8c263a",
      textureURI: "https://jr-prod-pim-products.oss-cn-beijing.aliyuncs.com/i/4e8506de-27a6-47a2-9f56-d58bab8c263a/wallfloor.jpg",
      tileSize_x: 0.6,
      tileSize_y: 0.6,
      userDefined: null,
      uvConsistentInfo: {},
      wrap: 1000,
      colorMode: ColorModeEnum.texture
    },
    name: "windowSill",
    partName: "Sill",
    type: "windowSill",
    unit: "m"
  } as WindowSillModelMeta,
  DEFAULT_WINDOWSILL_EAR_WIDTH: 0.066,
  DEFAULT_WINDOWSILL_EAR_THICKNESS: 0.002,
  MAX_WINDOWSILL_EAR_EXTEND: 0.5,
  CUSTOMIZEDMODEL_LINE_DEFAULT_COLOR: 9474192,
  CUSTOMIZEDMODEL_FACE_DEFAULT_COLOR: 15264489,
  CUSTOMIZEDMODEL_FACE_DEFAULT_COLOR_CeilingEnv: 16777215,
  CUSTOMIZEDMODEL_LIGHTSLOT_DEFAULT_WIDTH: 15,
  CUSTOMIZEDMODEL_LIGHTSLOT_DEFAULT_HEIGHT: 8,
  DEFAULT_PRELOAD_SEEKIDS: [
    DEFAULT_FLOOR_SEEKID,
    LOCAL_MATERIAL_SEEKID,
    "AlignRect",
    "66a5d6cd-d839-4486-802f-dd7150fe7032",
    "16807240-b36e-4777-aca4-03ea45f7bf9c",
    "4e8506de-27a6-47a2-9f56-d58bab8c263a",
    "03074124-f58a-49b3-a79e-ea2f2597158e",
    "8b14b534-b1c2-47e3-aa67-d3980aefea87",
    "3c966d5c-bd84-4858-af32-1c2ad731e2e7",
    "437be1dc-054e-45ec-9d8e-dee8fd521c6d",
    "55f844be-611d-4a3c-9186-54998eed6b97",
    "0680b488-edcf-493c-908b-aa136129c6b7",
    "a7eb3f1f-d395-4bac-b14f-f363648389dd",
    "96287e41-80b3-48e6-8104-ab50f992d40d",
    "4030320e-ac58-4da6-ab02-142ca3df5f4c",
    "5e824767-deef-49c6-8785-e7cd4e9a3cf4",
    "bf32d97d-4881-48f2-ac5f-dca69f409312",
    "7310d06c-993c-45cc-b375-071640c6c368",
    "dc78a018-50b7-47aa-9767-d8742e323bf1",
    "5c5523c7-fc70-4775-825c-c8b8b1ac0c8b"
  ] as readonly string[],
  PARAMETRIC_MODEL_DEFAULT_MOLDING_SEEKID: "0ed2aed0-e598-46fe-83de-ce1a6430d523"
} as const;