/**
 * 颜色模式枚举，定义材质的渲染方式
 */
export enum ColorModeEnum {
  /** 使用纹理贴图 */
  texture = "texture",
  /** 使用纯色 */
  color = "color",
  /** 使用混合模式 */
  blend = "blend"
}

/**
 * 材质数据接口
 */
interface MaterialData {
  /** 材质颜色（RGB整数值） */
  color: number;
  /** 默认纹理URI */
  defaultTextureURI: string;
  /** 水平翻转 */
  flipX: boolean;
  /** 垂直翻转 */
  flipY: boolean;
  /** 是否为自定义材质 */
  isCustomized: boolean;
  /** X轴偏移 */
  offsetX: number;
  /** Y轴偏移 */
  offsetY: number;
  /** 旋转角度 */
  rotation: number;
  /** 接缝颜色 */
  seamColor: number;
  /** 是否支持接缝填充 */
  seamFillerSupported: boolean;
  /** 接缝宽度 */
  seamWidth: number;
  /** 材质唯一标识 */
  seekId: string;
  /** 纹理URI */
  textureURI: string;
  /** X方向平铺尺寸 */
  tileSize_x: number;
  /** Y方向平铺尺寸 */
  tileSize_y: number;
  /** 用户自定义数据 */
  userDefined: unknown | null;
  /** UV一致性信息 */
  uvConsistentInfo: Record<string, unknown>;
  /** 包裹模式 */
  wrap: number;
}

/**
 * 边缘轮廓配置
 */
interface EdgeProfile {
  /** SVG路径定义 */
  profile: string;
  /** X方向尺寸 */
  XSize: number;
  /** Y方向尺寸 */
  YSize: number;
}

/**
 * 窗台模型元数据
 */
interface WindowSillModelMeta {
  /** 混凝土高度 */
  concretHeight: number;
  /** 混凝土宽度 */
  concretWidth: number;
  /** 边缘轮廓 */
  edgeProfile: EdgeProfile;
  /** 窗台高度 */
  height: number;
  /** 材质数据 */
  materialData: MaterialData;
  /** 名称 */
  name: string;
  /** 部件名称 */
  partName: string;
  /** 类型 */
  type: string;
  /** 单位 */
  unit: string;
}

/**
 * 材质配置接口（基础）
 */
interface BaseMaterialConfig {
  /** 材质唯一标识 */
  seekId: string;
  /** 颜色模式 */
  colorMode: ColorModeEnum;
}

/**
 * 纯色材质配置
 */
interface ColorMaterialConfig extends BaseMaterialConfig {
  /** 颜色值（RGB整数） */
  color: number;
  colorMode: ColorModeEnum.color;
}

/**
 * 纹理材质配置
 */
interface TextureMaterialConfig extends BaseMaterialConfig {
  /** 纹理图片URI */
  textureURI: string;
  /** 平铺尺寸（统一） */
  tileSize?: number;
  /** X方向平铺尺寸 */
  tileSize_x: number;
  /** Y方向平铺尺寸 */
  tileSize_y: number;
  colorMode: ColorModeEnum.texture;
}

/**
 * 完整材质配置（用于接缝材质等）
 */
interface FullMaterialConfig extends TextureMaterialConfig {
  /** 材质分类ID */
  categoryId: string;
  /** 颜色值 */
  color: number;
  /** 默认纹理URI */
  textureURIDefault: string;
  /** 小图标URI */
  iconSmallURI: string;
  /** 大图标URI */
  iconLargeURI: string;
  /** 法线贴图URI */
  normalTexture: string;
  /** 法线贴图X方向平铺 */
  normalTileSize_x: number;
  /** 法线贴图Y方向平铺 */
  normalTileSize_y: number;
}

/**
 * 造型参数配置
 */
interface MoldingParam {
  /** 最小高度 */
  MIN_HEIGHT: number;
  /** 最大高度 */
  MAX_HEIGHT: number;
}

/**
 * 应用常量配置
 * 包含所有设计器中使用的尺寸、材质、相机等配置常量
 */
export interface Constants {
  /** 浮点数容差 */
  readonly TOLERANCE: number;
  /** 2D草图长度容差 */
  readonly SKETCH2D_LENGTH_TOL: number;
  /** 画布宽度 */
  readonly Canvas_Width: number;
  /** 画布高度 */
  readonly Canvas_Height: number;
  /** 顶点最大值 */
  readonly Max_Vertex_Value: number;
  /** 网格间距 */
  readonly Grid_Spacing: number;
  /** 主要网格线间隔 */
  readonly Major_Lines_Every_Nth_Grid_Line: number;

  // 图层和地板配置
  /** 图层高度 */
  readonly LAYER_HEIGHT: number;
  /** 楼板厚度 */
  readonly SLAB_THICKNESS: number;
  /** 最小楼板厚度 */
  readonly MIN_SLAB_THICKNESS: number;
  /** 最大楼板厚度 */
  readonly MAX_SLAB_THICKNESS: number;
  /** 室外顶面Z坐标偏移 */
  readonly OUTDOOR_TOP_FACE_Z: number;

  // 门窗配置
  /** 门偏移量 */
  readonly DOOR_SHIFT_OFFSET: number;
  /** 默认门体厚度 */
  readonly DEFAULT_DOOR_BODY_THICKNESS: number;
  /** 最大开口尺寸 */
  readonly MAX_OPENING_SIZE: number;
  /** 最小开口尺寸 */
  readonly MIN_OPENING_SIZE: number;
  /** 默认窗台标高 */
  readonly DEFAULT_WINDOW_ELEVATION: number;

  // 墙体配置
  /** 默认墙体厚度 */
  readonly DEFAULT_WALL_THICKNESS: number;
  /** 默认墙体3D高度 */
  readonly DEFAULT_WALL_3D_HEIGHT: number;
  /** 默认半墙3D高度 */
  readonly DEFAULT_PARTIAL_WALL_3D_HEIGHT: number;
  /** 默认墙体宽度 */
  readonly DEFAULT_WALL_WIDTH: number;
  /** 默认内墙宽度 */
  readonly DEFAULT_INTERIOR_WALL_WIDTH: number;
  /** 最小墙体厚度 */
  readonly MIN_WALL_THICKNESS: number;
  /** 最大墙体厚度 */
  readonly MAX_WALL_THICKNESS: number;
  /** 最小墙体长度 */
  readonly MIN_WALL_LENGTH: number;
  /** 最大墙体长度 */
  readonly MAX_WALL_LENGTH: number;
  /** 最小墙体3D高度 */
  readonly MIN_WALL_3D_HEIGHT: number;
  /** 最大墙体3D高度 */
  readonly MAX_WALL_3D_HEIGHT: number;
  /** 最小房间尺寸 */
  readonly MINIMUM_ROOMSIZE: number;

  // 天花板配置
  /** 最小天花板偏移 */
  readonly MIN_CEILING_OFFSET: number;
  /** 最大天花板相对偏移 */
  readonly MAX_CEILING_RELATIVE_OFFSET: number;
  /** 默认天花板偏移 */
  readonly DEFAULT_CEILING_OFFSET: number;
  /** 默认造型参数 */
  readonly DEFAULT_MOLDING_PARAM: MoldingParam;

  // 橱柜配置
  /** 橱柜台面厚度 */
  readonly CABINET_COUNTER_TOP_THICKNESS: number;
  /** 最大橱柜台面厚度 */
  readonly MAX_CABINET_COUNTER_TOP_THICKNESS: number;
  /** 最小橱柜台面厚度 */
  readonly MIN_CABINET_COUNTER_TOP_THICKNESS: number;
  /** 最大台面延伸 */
  readonly MAX_COUNTER_TOP_EXTEND: number;
  /** 最小台面延伸 */
  readonly MIN_COUNTER_TOP_EXTEND: number;
  /** 橱柜台面门板厚度 */
  readonly CABINET_COUNTER_TOP_DOOR_THICKNESS: number;
  /** 橱柜门板厚度 */
  readonly CABINET_DOOR_THICKNESS: number;
  /** 橱柜顶线偏移 */
  readonly CABINET_TOP_LINE_OFFSET: number;
  /** 橱柜踢脚线偏移 */
  readonly CABINET_TOE_KICK_OFFSET: number;
  /** 橱柜高度相等容差 */
  readonly CABINET_HEIGHT_EQUAL_TOL: number;
  /** 橱柜虚拟路径默认深度 */
  readonly CABINET_VIRTUAL_PATH_DEFAULT_DEPTH: number;
  /** 最大橱柜踢脚线高度 */
  readonly MAX_CABINET_TOEKICK_HEIGHT: number;
  /** 最小橱柜踢脚线高度 */
  readonly MIN_CABINET_TOEKICK_HEIGHT: number;

  // 其他建筑元素
  /** 默认通风口Z坐标 */
  readonly DEFAULT_VENTILATION_Z: number;
  /** 推拉门框架厚度 */
  readonly POCKET_FRAME_THICKNESS: number;

  // 第一人称相机配置
  /** 第一人称相机高度 */
  readonly FIRSTPERSON_CAMERA_HEIGHT: number;
  /** 第一人称相机俯仰角 */
  readonly FIRSTPERSON_CAMERA_PITCH: number;
  /** 第一人称相机目标点X */
  readonly FIRSTPERSON_CAMERA_TARGET_X: number;
  /** 第一人称相机目标点Y */
  readonly FIRSTPERSON_CAMERA_TARGET_Y: number;
  /** 第一人称相机水平视场角 */
  readonly FIRSTPERSON_CAMERA_HORIZONTAL_FOV: number;
  /** 第一人称相机最小水平视场角 */
  readonly FIRSTPERSON_CAMERA_HORIZONTAL_FOV_MIN: number;
  /** 第一人称相机最大水平视场角 */
  readonly FIRSTPERSON_CAMERA_HORIZONTAL_FOV_MAX: number;
  /** 第一人称相机是否裁剪 */
  readonly FIRSTPERSON_CAMERA_CLIP: boolean;
  /** 第一人称相机近裁剪面 */
  readonly FIRSTPERSON_CAMERA_NEAR: number;
  /** 第一人称相机近裁剪面最大值 */
  readonly FIRSTPERSON_CAMERA_NEAR_MAX: number;
  /** 第一人称相机目标点高度 */
  readonly FIRSTPERSON_CAMERA_TARGETPOINT_HEIGHT: number;

  // 轨道视图相机配置
  /** 轨道视图相机高度 */
  readonly ORBITVIEW_CAMERA_HEIGHT: number;
  /** 轨道视图相机俯仰角 */
  readonly ORBITVIEW_CAMERA_PITCH: number;
  /** 轨道视图相机距离 */
  readonly ORBITVIEW_CAMERA_DISTANCE: number;
  /** 轨道视图相机目标点X */
  readonly ORBITVIEW_CAMERA_TARGET_X: number;
  /** 轨道视图相机目标点Y */
  readonly ORBITVIEW_CAMERA_TARGET_Y: number;
  /** 轨道视图相机X坐标 */
  readonly ORBITVIEW_CAMERA_X: number;
  /** 轨道视图相机Y坐标 */
  readonly ORBITVIEW_CAMERA_Y: number;
  /** 轨道视图相机Z坐标 */
  readonly ORBITVIEW_CAMERA_Z: number;
  /** 轨道视图相机水平视场角 */
  readonly ORBITVIEW_CAMERA_HORIZONTAL_FOV: number;
  /** 轨道视图相机最小水平视场角 */
  readonly ORBITVIEW_CAMERA_HORIZONTAL_FOV_MIN: number;
  /** 轨道视图相机最大水平视场角 */
  readonly ORBITVIEW_CAMERA_HORIZONTAL_FOV_MAX: number;
  /** 轨道视图相机目标点高度 */
  readonly ORBITVIEW_CAMERA_TARGETPOINT_HEIGHT: number;

  // 通用相机配置
  /** 相机默认近裁剪面 */
  readonly CAMERA_DEFAULT_NEAR: number;
  /** 相机默认远裁剪面 */
  readonly CAMERA_DEFAULT_FAR: number;
  /** 虚拟相机距离缩放 */
  readonly VCAMERA_DIST_SCALE: number;

  // 其他3D配置
  /** 挤出器默认高度 */
  readonly EXTRUDER_DEAULT_HEIGHT: number;
  /** 裁剪默认偏移 */
  readonly CLIP_DEAFULT_OFFSET: number;
  /** 默认环境颜色 */
  readonly DEFAULT_ENVIRONMENT_COLOR: number;
  /** 默认环境背景颜色 */
  readonly DEFAULT_ENVIRONMENT_BACKGROUND_COLOR: number;

  // 开口类型
  /** 开口类型标识 */
  readonly OpeningType: number;
  /** 参数化开口类型标识 */
  readonly ParametricOpeningType: number;

  // 默认材质配置
  /** 默认墙体材质 */
  readonly DEFAULT_WALL_MATERIAL: TextureMaterialConfig;
  /** 默认墙体内表面材质 */
  readonly DEFAULT_WALL_INNER_MATERIAL: ColorMaterialConfig;
  /** 默认墙体辅助面材质 */
  readonly DEFAULT_WALL_AUXFACE_MATERIAL: ColorMaterialConfig;
  /** 默认地板材质 */
  readonly DEFAULT_FLOOR_MATERIAL: TextureMaterialConfig;
  /** 默认室外地板材质 */
  readonly DEFAULT_OUTDOORFLOOR_MATERIAL: TextureMaterialConfig;
  /** 默认天花板材质 */
  readonly DEFAULT_CEILING_MATERIAL: ColorMaterialConfig;
  /** 默认推拉门框材质 */
  readonly DEFAULT_POCKET_MATERIAL: TextureMaterialConfig;
  /** 默认墙体白色涂料 */
  readonly DEFAULT_WALL_WHITE_PAINT: ColorMaterialConfig;
  /** 默认自定义模型材质 */
  readonly DEFAULT_CUSTOMIZEDMODEL_MATERIAL: ColorMaterialConfig;
  /** 默认墙体颜色（十六进制字符串） */
  readonly DEFAULT_WALL_COLOR: string;
  /** 默认接缝材质 */
  readonly DEFAULT_SEAM_MATERIAL: FullMaterialConfig;
  /** 灰色接缝材质 */
  readonly GRAY_SEAM_MATERIAL: FullMaterialConfig;

  // 窗台配置
  /** 默认窗台模型元数据 */
  readonly DEFAULT_WINDOWSILL_MODEL_META: WindowSillModelMeta;
  /** 默认窗台耳朵宽度 */
  readonly DEFAULT_WINDOWSILL_EAR_WIDTH: number;
  /** 默认窗台耳朵厚度 */
  readonly DEFAULT_WINDOWSILL_EAR_THICKNESS: number;
  /** 最大窗台耳朵延伸 */
  readonly MAX_WINDOWSILL_EAR_EXTEND: number;

  // 自定义模型配置
  /** 自定义模型线条默认颜色 */
  readonly CUSTOMIZEDMODEL_LINE_DEFAULT_COLOR: number;
  /** 自定义模型面默认颜色 */
  readonly CUSTOMIZEDMODEL_FACE_DEFAULT_COLOR: number;
  /** 自定义模型天花板环境面默认颜色 */
  readonly CUSTOMIZEDMODEL_FACE_DEFAULT_COLOR_CeilingEnv: number;
  /** 自定义模型灯槽默认宽度 */
  readonly CUSTOMIZEDMODEL_LIGHTSLOT_DEFAULT_WIDTH: number;
  /** 自定义模型灯槽默认高度 */
  readonly CUSTOMIZEDMODEL_LIGHTSLOT_DEFAULT_HEIGHT: number;

  // 预加载资源
  /** 默认预加载材质ID列表 */
  readonly DEFAULT_PRELOAD_SEEKIDS: readonly string[];
  /** 参数化模型默认造型材质ID */
  readonly PARAMETRIC_MODEL_DEFAULT_MOLDING_SEEKID: string;
}

/**
 * 导出的常量实例
 */
export declare const Constants: Constants;