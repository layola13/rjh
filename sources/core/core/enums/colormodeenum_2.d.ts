/**
 * 颜色模式枚举
 * 定义材质的颜色应用方式
 */
export enum ColorModeEnum {
  /** 纹理模式 - 使用贴图纹理 */
  texture = "texture",
  /** 颜色模式 - 使用纯色填充 */
  color = "color",
  /** 混合模式 - 混合纹理和颜色 */
  blend = "blend"
}

/**
 * 材质数据接口
 * 描述材质的完整属性配置
 */
export interface MaterialData {
  /** 材质唯一标识符 */
  seekId: string;
  /** 材质分类ID（可选） */
  categoryId?: string;
  /** RGB颜色值（十进制） */
  color: number;
  /** 纹理图片URI */
  textureURI?: string;
  /** 默认纹理URI */
  textureURIDefault?: string;
  /** X轴平铺尺寸（米） */
  tileSize_x: number;
  /** Y轴平铺尺寸（米） */
  tileSize_y: number;
  /** 统一平铺尺寸（米，可选） */
  tileSize?: number;
  /** 小图标URI */
  iconSmallURI?: string;
  /** 大图标URI */
  iconLargeURI?: string;
  /** 法线贴图URI */
  normalTexture?: string;
  /** 法线贴图X轴平铺尺寸 */
  normalTileSize_x?: number;
  /** 法线贴图Y轴平铺尺寸 */
  normalTileSize_y?: number;
  /** 颜色模式 */
  colorMode: ColorModeEnum;
  /** 是否水平翻转纹理 */
  flipX?: boolean;
  /** 是否垂直翻转纹理 */
  flipY?: boolean;
  /** 是否为自定义材质 */
  isCustomized?: boolean;
  /** 纹理X轴偏移量 */
  offsetX?: number;
  /** 纹理Y轴偏移量 */
  offsetY?: number;
  /** 纹理旋转角度（度） */
  rotation?: number;
  /** 接缝填充颜色 */
  seamColor?: number;
  /** 是否支持接缝填充 */
  seamFillerSupported?: boolean;
  /** 接缝宽度（毫米） */
  seamWidth?: number;
  /** 用户自定义数据 */
  userDefined?: unknown;
  /** UV一致性信息 */
  uvConsistentInfo?: Record<string, unknown>;
  /** 包裹模式 */
  wrap?: number;
}

/**
 * 边缘轮廓配置
 * 定义窗台等构件的边缘造型
 */
export interface EdgeProfile {
  /** SVG路径字符串定义轮廓形状 */
  profile: string;
  /** 轮廓X向尺寸（米） */
  XSize: number;
  /** 轮廓Y向尺寸（米） */
  YSize: number;
}

/**
 * 窗台模型元数据
 */
export interface WindowSillModelMeta {
  /** 混凝土基础高度（米） */
  concretHeight: number;
  /** 混凝土基础宽度（米） */
  concretWidth: number;
  /** 边缘轮廓配置 */
  edgeProfile: EdgeProfile;
  /** 窗台高度（米） */
  height: number;
  /** 材质数据 */
  materialData: MaterialData;
  /** 名称标识 */
  name: string;
  /** 部件名称 */
  partName: string;
  /** 类型标识 */
  type: string;
  /** 单位 */
  unit: string;
}

/**
 * 墙体装饰线条参数范围
 */
export interface MoldingParam {
  /** 最小高度（米） */
  MIN_HEIGHT: number;
  /** 最大高度（米） */
  MAX_HEIGHT: number;
}

/**
 * 系统常量配置
 * 包含所有3D建模、渲染、材质的默认值和约束条件
 */
export interface Constants {
  // ==================== 基础公差与画布配置 ====================
  /** 几何计算公差 */
  readonly TOLERANCE: number;
  /** 2D草图长度公差 */
  readonly SKETCH2D_LENGTH_TOL: number;
  /** 画布宽度（像素） */
  readonly Canvas_Width: number;
  /** 画布高度（像素） */
  readonly Canvas_Height: number;
  /** 顶点坐标最大值 */
  readonly Max_Vertex_Value: number;
  /** 网格间距（米） */
  readonly Grid_Spacing: number;
  /** 主网格线间隔（每N条网格线） */
  readonly Major_Lines_Every_Nth_Grid_Line: number;

  // ==================== 楼层与楼板 ====================
  /** 图层高度（米） */
  readonly LAYER_HEIGHT: number;
  /** 楼板厚度（米） */
  readonly SLAB_THICKNESS: number;
  /** 最小楼板厚度（米） */
  readonly MIN_SLAB_THICKNESS: number;
  /** 最大楼板厚度（米） */
  readonly MAX_SLAB_THICKNESS: number;
  /** 室外顶面Z坐标偏移（米） */
  readonly OUTDOOR_TOP_FACE_Z: number;

  // ==================== 门窗洞口 ====================
  /** 门偏移量（米） */
  readonly DOOR_SHIFT_OFFSET: number;
  /** 默认门体厚度（米） */
  readonly DEFAULT_DOOR_BODY_THICKNESS: number;
  /** 最大开口尺寸（米） */
  readonly MAX_OPENING_SIZE: number;
  /** 最小开口尺寸（米） */
  readonly MIN_OPENING_SIZE: number;
  /** 默认窗台标高（米） */
  readonly DEFAULT_WINDOW_ELEVATION: number;
  /** 开口类型标识 */
  readonly OpeningType: number;
  /** 参数化开口类型标识 */
  readonly ParametricOpeningType: number;

  // ==================== 墙体参数 ====================
  /** 默认墙体厚度（米） */
  readonly DEFAULT_WALL_THICKNESS: number;
  /** 默认墙体3D高度（米） */
  readonly DEFAULT_WALL_3D_HEIGHT: number;
  /** 默认半高墙3D高度（米） */
  readonly DEFAULT_PARTIAL_WALL_3D_HEIGHT: number;
  /** 默认墙体宽度（米） */
  readonly DEFAULT_WALL_WIDTH: number;
  /** 默认内墙宽度（米） */
  readonly DEFAULT_INTERIOR_WALL_WIDTH: number;
  /** 最小墙体厚度（米） */
  readonly MIN_WALL_THICKNESS: number;
  /** 最大墙体厚度（米） */
  readonly MAX_WALL_THICKNESS: number;
  /** 最小墙体长度（米） */
  readonly MIN_WALL_LENGTH: number;
  /** 最大墙体长度（米） */
  readonly MAX_WALL_LENGTH: number;
  /** 最小墙体3D高度（米） */
  readonly MIN_WALL_3D_HEIGHT: number;
  /** 最大墙体3D高度（米） */
  readonly MAX_WALL_3D_HEIGHT: number;
  /** 默认墙体颜色（十六进制字符串） */
  readonly DEFAULT_WALL_COLOR: string;

  // ==================== 房间与天花板 ====================
  /** 最小房间尺寸（米） */
  readonly MINIMUM_ROOMSIZE: number;
  /** 最小天花板偏移（米） */
  readonly MIN_CEILING_OFFSET: number;
  /** 最大天花板相对偏移（米） */
  readonly MAX_CEILING_RELATIVE_OFFSET: number;
  /** 默认天花板偏移（米） */
  readonly DEFAULT_CEILING_OFFSET: number;
  /** 默认装饰线条参数范围 */
  readonly DEFAULT_MOLDING_PARAM: MoldingParam;

  // ==================== 橱柜配置 ====================
  /** 橱柜台面厚度（米） */
  readonly CABINET_COUNTER_TOP_THICKNESS: number;
  /** 最大橱柜台面厚度（米） */
  readonly MAX_CABINET_COUNTER_TOP_THICKNESS: number;
  /** 最小橱柜台面厚度（米） */
  readonly MIN_CABINET_COUNTER_TOP_THICKNESS: number;
  /** 最大台面延伸（米） */
  readonly MAX_COUNTER_TOP_EXTEND: number;
  /** 最小台面延伸（米） */
  readonly MIN_COUNTER_TOP_EXTEND: number;
  /** 橱柜台面门板厚度（米） */
  readonly CABINET_COUNTER_TOP_DOOR_THICKNESS: number;
  /** 橱柜门板厚度（米） */
  readonly CABINET_DOOR_THICKNESS: number;
  /** 橱柜顶线偏移（米） */
  readonly CABINET_TOP_LINE_OFFSET: number;
  /** 橱柜踢脚线偏移（米） */
  readonly CABINET_TOE_KICK_OFFSET: number;
  /** 橱柜高度相等公差（米） */
  readonly CABINET_HEIGHT_EQUAL_TOL: number;
  /** 橱柜虚拟路径默认深度（米） */
  readonly CABINET_VIRTUAL_PATH_DEFAULT_DEPTH: number;
  /** 最大橱柜踢脚线高度（米） */
  readonly MAX_CABINET_TOEKICK_HEIGHT: number;
  /** 最小橱柜踢脚线高度（米） */
  readonly MIN_CABINET_TOEKICK_HEIGHT: number;

  // ==================== 通风与框架 ====================
  /** 默认通风口Z坐标（米） */
  readonly DEFAULT_VENTILATION_Z: number;
  /** 口袋门框架厚度（米） */
  readonly POCKET_FRAME_THICKNESS: number;

  // ==================== 第一人称相机 ====================
  /** 第一人称相机高度（米） */
  readonly FIRSTPERSON_CAMERA_HEIGHT: number;
  /** 第一人称相机俯仰角（度） */
  readonly FIRSTPERSON_CAMERA_PITCH: number;
  /** 第一人称相机目标点X坐标（米） */
  readonly FIRSTPERSON_CAMERA_TARGET_X: number;
  /** 第一人称相机目标点Y坐标（米） */
  readonly FIRSTPERSON_CAMERA_TARGET_Y: number;
  /** 第一人称相机水平视场角（度） */
  readonly FIRSTPERSON_CAMERA_HORIZONTAL_FOV: number;
  /** 第一人称相机最小水平视场角（度） */
  readonly FIRSTPERSON_CAMERA_HORIZONTAL_FOV_MIN: number;
  /** 第一人称相机最大水平视场角（度） */
  readonly FIRSTPERSON_CAMERA_HORIZONTAL_FOV_MAX: number;
  /** 第一人称相机是否启用裁剪 */
  readonly FIRSTPERSON_CAMERA_CLIP: boolean;
  /** 第一人称相机近裁剪面（米） */
  readonly FIRSTPERSON_CAMERA_NEAR: number;
  /** 第一人称相机最大近裁剪面（米） */
  readonly FIRSTPERSON_CAMERA_NEAR_MAX: number;
  /** 第一人称相机目标点高度（米） */
  readonly FIRSTPERSON_CAMERA_TARGETPOINT_HEIGHT: number;

  // ==================== 轨道视图相机 ====================
  /** 轨道视图相机高度（米） */
  readonly ORBITVIEW_CAMERA_HEIGHT: number;
  /** 轨道视图相机俯仰角（度） */
  readonly ORBITVIEW_CAMERA_PITCH: number;
  /** 轨道视图相机距离（米） */
  readonly ORBITVIEW_CAMERA_DISTANCE: number;
  /** 轨道视图相机目标点X坐标（米） */
  readonly ORBITVIEW_CAMERA_TARGET_X: number;
  /** 轨道视图相机目标点Y坐标（米） */
  readonly ORBITVIEW_CAMERA_TARGET_Y: number;
  /** 轨道视图相机X坐标（米） */
  readonly ORBITVIEW_CAMERA_X: number;
  /** 轨道视图相机Y坐标（米） */
  readonly ORBITVIEW_CAMERA_Y: number;
  /** 轨道视图相机Z坐标（米） */
  readonly ORBITVIEW_CAMERA_Z: number;
  /** 轨道视图相机水平视场角（度） */
  readonly ORBITVIEW_CAMERA_HORIZONTAL_FOV: number;
  /** 轨道视图相机最小水平视场角（度） */
  readonly ORBITVIEW_CAMERA_HORIZONTAL_FOV_MIN: number;
  /** 轨道视图相机最大水平视场角（度） */
  readonly ORBITVIEW_CAMERA_HORIZONTAL_FOV_MAX: number;
  /** 轨道视图相机目标点高度（米） */
  readonly ORBITVIEW_CAMERA_TARGETPOINT_HEIGHT: number;

  // ==================== 通用相机配置 ====================
  /** 相机默认近裁剪面（米） */
  readonly CAMERA_DEFAULT_NEAR: number;
  /** 相机默认远裁剪面（米） */
  readonly CAMERA_DEFAULT_FAR: number;
  /** 虚拟相机距离缩放系数 */
  readonly VCAMERA_DIST_SCALE: number;

  // ==================== 拉伸与裁剪 ====================
  /** 拉伸工具默认高度（米） */
  readonly EXTRUDER_DEAULT_HEIGHT: number;
  /** 裁剪默认偏移（米） */
  readonly CLIP_DEAFULT_OFFSET: number;

  // ==================== 环境与颜色 ====================
  /** 默认环境颜色（RGB十进制） */
  readonly DEFAULT_ENVIRONMENT_COLOR: number;
  /** 默认环境背景颜色（RGB十进制） */
  readonly DEFAULT_ENVIRONMENT_BACKGROUND_COLOR: number;

  // ==================== 默认材质配置 ====================
  /** 默认墙体材质 */
  readonly DEFAULT_WALL_MATERIAL: MaterialData;
  /** 默认墙体内侧材质 */
  readonly DEFAULT_WALL_INNER_MATERIAL: MaterialData;
  /** 默认墙体辅助面材质 */
  readonly DEFAULT_WALL_AUXFACE_MATERIAL: MaterialData;
  /** 默认地板材质 */
  readonly DEFAULT_FLOOR_MATERIAL: MaterialData;
  /** 默认室外地板材质 */
  readonly DEFAULT_OUTDOORFLOOR_MATERIAL: MaterialData;
  /** 默认天花板材质 */
  readonly DEFAULT_CEILING_MATERIAL: MaterialData;
  /** 默认口袋门材质 */
  readonly DEFAULT_POCKET_MATERIAL: MaterialData;
  /** 默认墙体白色涂料 */
  readonly DEFAULT_WALL_WHITE_PAINT: MaterialData;
  /** 默认自定义模型材质 */
  readonly DEFAULT_CUSTOMIZEDMODEL_MATERIAL: MaterialData;
  /** 默认接缝材质 */
  readonly DEFAULT_SEAM_MATERIAL: MaterialData;
  /** 灰色接缝材质 */
  readonly GRAY_SEAM_MATERIAL: MaterialData;

  // ==================== 窗台配置 ====================
  /** 默认窗台模型元数据 */
  readonly DEFAULT_WINDOWSILL_MODEL_META: WindowSillModelMeta;
  /** 默认窗台耳朵宽度（米） */
  readonly DEFAULT_WINDOWSILL_EAR_WIDTH: number;
  /** 默认窗台耳朵厚度（米） */
  readonly DEFAULT_WINDOWSILL_EAR_THICKNESS: number;
  /** 最大窗台耳朵延伸（米） */
  readonly MAX_WINDOWSILL_EAR_EXTEND: number;

  // ==================== 自定义模型 ====================
  /** 自定义模型线条默认颜色（RGB十进制） */
  readonly CUSTOMIZEDMODEL_LINE_DEFAULT_COLOR: number;
  /** 自定义模型面默认颜色（RGB十进制） */
  readonly CUSTOMIZEDMODEL_FACE_DEFAULT_COLOR: number;
  /** 自定义模型天花板环境面默认颜色（RGB十进制） */
  readonly CUSTOMIZEDMODEL_FACE_DEFAULT_COLOR_CeilingEnv: number;
  /** 自定义模型灯槽默认宽度（毫米） */
  readonly CUSTOMIZEDMODEL_LIGHTSLOT_DEFAULT_WIDTH: number;
  /** 自定义模型灯槽默认高度（毫米） */
  readonly CUSTOMIZEDMODEL_LIGHTSLOT_DEFAULT_HEIGHT: number;

  // ==================== 预加载资源 ====================
  /** 默认预加载的材质SeekID列表 */
  readonly DEFAULT_PRELOAD_SEEKIDS: readonly string[];
  /** 参数化模型默认装饰线条SeekID */
  readonly PARAMETRIC_MODEL_DEFAULT_MOLDING_SEEKID: string;
}

/**
 * 导出的常量实例
 * 包含所有系统级别的配置常量
 */
export declare const Constants: Constants;