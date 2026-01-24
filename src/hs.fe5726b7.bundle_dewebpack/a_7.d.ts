/**
 * 应用程序常量配置模块
 * 包含单位转换、相机控制、颜色配置、尺寸约束等全局常量定义
 */
export interface ApplicationConstants {
  /**
   * 毫米到米的转换系数
   * @example 1000 毫米 = 1 米
   */
  readonly MILLIMETER_TO_METER: 1000;

  /**
   * 相机连续移动的定时器间隔（毫秒）
   */
  readonly CAMERA_CONTINOUS_TIMER: 300;

  /**
   * 相机向前移动指令
   */
  readonly CAMERA_MOVE_FORWARD: "forward";

  /**
   * 相机向后移动指令
   */
  readonly CAMERA_MOVE_BACKWARD: "backward";

  /**
   * 相机向左移动指令
   */
  readonly CAMERA_MOVE_LEFTWARD: "leftward";

  /**
   * 相机向右移动指令
   */
  readonly CAMERA_MOVE_RIGHTWARD: "rightward";

  /**
   * 内容选择边界虚线段长度
   */
  readonly CONTENT_SELECTION_BOUNDING_DASHSIZE: 0.015;

  /**
   * 内容选择边界虚线间隙大小
   */
  readonly CONTENT_SELECTION_BOUNDING_GAPSIZE: 0.01;

  /**
   * 内容操作指示器虚线线宽
   */
  readonly CONTENT_OPERATION_INDICATOR_DASHEDLINE_LINEWIDTH: 1.5;

  /**
   * 显示精度小数位数
   */
  readonly DISPLAY_PRECISION_DIGITS: 2;

  /**
   * 最小输入整数值
   */
  readonly MIN_INPUT_INTEGER: 0;

  /**
   * 最大输入整数值
   */
  readonly MAX_INPUT_INTEGER: 100;

  /**
   * 像素到米的转换系数
   */
  readonly PIXEL_TO_M_FACTOR: 136.7;

  /**
   * 视图框最小宽度（像素）
   */
  readonly MIN_VIEWBOX_WIDTH: 100;

  /**
   * 特定场景下视图框最小宽度（像素）
   */
  readonly SPECIFIC_MIN_VIEWBOX_WIDTH: 6;

  /**
   * 视图框最大宽度（像素）
   */
  readonly MAX_VIEWBOX_WIDTH: 150000;

  /**
   * 默认地板颜色（十六进制）
   */
  readonly DEFAULT_FLOOR_COLOR: "#91d4ff";

  /**
   * 默认地板选中颜色（十六进制）
   */
  readonly DEFAULT_FLOOR_SELECTED_COLOR: "#a8ceec";

  /**
   * 目标图层地板蒙版颜色（十六进制）
   */
  readonly TARGET_LAYER_FLOOR_MASK_COLOR: "#376efa";

  /**
   * 目标图层地板未激活颜色（十六进制）
   */
  readonly TARGET_LAYER_FLOOR_DEACTIVE_COLOR: "#F0F2F7";

  /**
   * 天花板环境地板选中颜色（十六进制）
   */
  readonly CEILING_ENV_FLOOR_SELECTED_COLOR: "#327dff";

  /**
   * 默认地板高亮颜色（十六进制）
   */
  readonly DEFAULT_FLOOR_HIGHLIGHT_COLOR: "#55acee";

  /**
   * 默认天花板颜色（十六进制）
   */
  readonly DEFAULT_Ceiling_COLOR: "#E5E9F0";

  /**
   * 默认点选中颜色（十六进制）
   */
  readonly DEFAULT_POINT_SELECTED_COLOR: "#a8ceec";

  /**
   * 默认点未闭合颜色（十六进制）
   */
  readonly DEFAULT_POINT_NOTCLOSED_COLOR: "#ffc742";

  /**
   * 默认NG点颜色（十六进制）
   */
  readonly DEFAULT_NG_POINT_COLOR: "#9f9f9f";

  /**
   * 默认NG点边框颜色（十六进制）
   */
  readonly DEFAULT_NG_POINT_BORDER_COLOR: "#b6b6b6";

  /**
   * 默认NG点选中颜色（十六进制）
   */
  readonly DEFAULT_NG_POINT_SELECTED_COLOR: "#a1d2f7";

  /**
   * 默认NG点选中边框颜色（十六进制）
   */
  readonly DEFAULT_NG_POINT_SEL_BORDER_COLOR: "#f3f3f3";

  /**
   * 默认NG点未闭合边框颜色（十六进制）
   */
  readonly DEFAULT_NG_POINT_BORDER_UNCLOSE_COLOR: "#ffc602";

  /**
   * 默认墙体颜色（十六进制）
   */
  readonly DEFAULT_WALL_COLOR: "#96969B";

  /**
   * 默认墙体悬停颜色（十六进制）
   */
  readonly DEFAULT_WALL_HOVOR_COLOR: "#c5daeb";

  /**
   * 默认墙体选中颜色（十六进制）
   */
  readonly DEFAULT_WALL_SELECTED_COLOR: "#a8ceec";

  /**
   * 默认墙体高亮颜色（十六进制）
   */
  readonly DEFAULT_WALL_HIGHLIGHT_COLOR: "#4c8dbd";

  /**
   * 默认墙体未闭合颜色（十六进制）
   */
  readonly DEFAULT_WALL_NOTCLOSED_COLOR: "#ffeeb2";

  /**
   * 默认墙体边框颜色（十六进制）
   */
  readonly DEFAULT_WALLBORDER_COLOR: "#333333";

  /**
   * 默认墙体边框悬停颜色（十六进制）
   */
  readonly DEFAULT_WALLBORDER_HOVOR_COLOR: "#257ab9";

  /**
   * 默认墙体边框选中颜色（十六进制）
   */
  readonly DEFAULT_WALLBORDER_SELECTED_COLOR: "#257ab9";

  /**
   * 默认墙体边框高亮颜色（十六进制）
   */
  readonly DEFAULT_WALLBORDER_HIGHLIGHT_COLOR: "#008bc8";

  /**
   * 承重墙颜色（十六进制）
   */
  readonly LOADBEARING_WALL_COLOR: "#444b52";

  /**
   * 承重墙悬停颜色（十六进制）
   */
  readonly LOADBEARING_WALL_HOVOR_COLOR: "#85afc3";

  /**
   * 承重墙选中颜色（十六进制）
   */
  readonly LOADBEARING_WALL_SELECTED_COLOR: "#769aaa";

  /**
   * 承重墙高亮颜色（十六进制）
   */
  readonly LOADBEARING_WALL_HIGHLIGHT_COLOR: "#4d9ab8";

  /**
   * 立面墙悬停颜色（十六进制）
   */
  readonly ELEVATION_WALL_HOVOR_COLOR: "#396efe";

  /**
   * 立面墙边框悬停颜色（十六进制）
   */
  readonly ELEVATION_WALLBORDER_HOVOR_COLOR: "#396efe";

  /**
   * 灯光边框普通颜色（十六进制）
   */
  readonly LIGHT_BORDER_NORMAL_COLOR: "#FFA023";

  /**
   * 灯光光斑半径（米）
   */
  readonly LIGHT_SPOT_RADIUS: 0.2;

  /**
   * 参数化模型默认造型查找ID（UUID）
   */
  readonly PARAMETRIC_MODEL_DEFAULT_MOLDING_SEEKID: "0ed2aed0-e598-46fe-83de-ce1a6430d523";

  /**
   * 用户设置上下文菜单标识符
   */
  readonly USER_SETTING_CONTEXT_MENU: "user-setting-context-menu";
}

/**
 * 应用程序常量配置实例
 */
export declare const A: ApplicationConstants;