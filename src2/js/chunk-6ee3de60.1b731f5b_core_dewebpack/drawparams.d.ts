/**
 * 绘图参数模块
 * 管理CAD/设计系统中的全局绘图配置、单位、语言和显示选项
 */

/**
 * 支持的语言模式枚举
 */
export enum langMode {
  /** 简体中文 */
  zh_cn = "zh-CN",
  /** 英语（美国） */
  en_us = "en-US",
  /** 越南语 */
  vi_vn = "vi-VN"
}

/**
 * 单位类型（从模块8导入）
 */
export enum Unit {
  Millimeters = "mm",
  Inches = "in",
  // 其他单位根据实际情况添加
}

/**
 * 绘制多边形类型（从模块1导入）
 */
export enum DrawPolyType {
  standard = "standard",
  // 其他类型根据实际情况添加
}

/**
 * 锁定类型（从模块7导入）
 */
export enum LockType {
  Default = "default",
  // 其他类型根据实际情况添加
}

/**
 * 边缘连接方式（从模块2导入）
 */
export enum EdgeJointWay {
  Default = "default",
  Vertical = "vertical",
  // 其他方式根据实际情况添加
}

/**
 * 玻璃规格配置
 */
export interface GlassSpec {
  // 根据实际使用定义属性
  [key: string]: unknown;
}

/**
 * 序列号配置
 */
export interface Serials {
  /** 窗扇玻璃序列号前缀 */
  sashGlass: string;
  /** 纱窗网序列号前缀 */
  screenNet: string;
  /** 固定玻璃序列号前缀 */
  fixedGlass: string;
}

/**
 * 绘图参数类 - 单例模式
 * 
 * 管理整个绘图系统的全局配置参数，包括：
 * - 单位和精度设置
 * - 字体和样式配置
 * - 尺寸标注选项
 * - 窗框/窗扇显示规则
 * - 国际化语言设置
 * - 移动设备适配参数
 */
export declare class DrawParams {
  /** 单例实例 */
  private static _ins?: DrawParams;

  /** 获取单例实例 */
  static readonly Ins: DrawParams;

  // ========== 私有属性 ==========
  private _unit: Unit;
  private _robotSize: number;
  private _arcDummy: number;
  private _snapVertex: number;
  private _snapEdge: number;

  // ========== 功能开关 ==========
  /** 是否向上取整遮阳计数 */
  roundUpShadeCounts: boolean;
  /** 拉升高度迁移 */
  pullingHeightMigrate: boolean;
  /** 禁用拖拽 */
  disableDrag: boolean;
  /** 内部空轨道检测 */
  InnerEmptyTrackDetect: boolean;
  /** 窗扇中梃固定到窗扇底部 */
  sashMullionFixedToSashBottom: boolean;

  // ========== 锁定配置 ==========
  /** 滑动锁类型 */
  slideLockType: LockType;
  /** 滑动锁代码 */
  slideLockCode: string;
  /** 滑动锁名称 */
  slideLockName: string;

  // ========== 框架显示选项 ==========
  /** 显示转换框架 */
  displayTurningFrame: boolean;
  /** 包含转换框架 */
  withTurningFrame: boolean;
  /** 为窗扇显示转换框架 */
  displayTurningFrameForSash: boolean;
  /** 窗扇包含转换框架 */
  withTurningFrameForSash: boolean;
  /** 显示固定压条 */
  fixedBeadShown: boolean;
  /** 显示窗扇压条 */
  sashBeadShown: boolean;
  /** 隐藏顶视图 */
  topViewHidden: boolean;
  /** 隐藏遮阳描述 */
  shadeDescHidden: boolean;

  // ========== 连接方式 ==========
  /** 固定压条连接方式 */
  fixedBeadJointWay: EdgeJointWay;
  /** 框架边缘连接方式 */
  frameEdgeJointWay: EdgeJointWay;
  /** 滑动框架边缘连接方式 */
  slideFrameEdgeJointWay: EdgeJointWay;
  /** 窗扇边缘连接方式 */
  sashEdgeJointWay: EdgeJointWay;

  // ========== 视图选项 ==========
  /** 上下开启专业顶视图 */
  proUpDownOpenTopView: boolean;
  /** 反转内外 */
  reverseInnerOuter: boolean;
  /** 使用盒体面积 */
  useBoxArea: boolean;
  /** 反转开启方向指示器 */
  reverseOpenTowardIndicator: boolean;
  /** 角连接器面积x2 */
  cornerJoinersAreaX2: boolean;

  // ========== 尺寸标注选项 ==========
  /** 显示到地面的尺寸 */
  dimToGroundShown: boolean;
  /** 显示到窗扇的尺寸 */
  dimToSashShown: boolean;
  /** 显示到中间的尺寸 */
  dimToMidShown: boolean;
  /** 窄屏样式 */
  narrowScreenStyle: boolean;
  /** 显示内部空间尺寸 */
  showInnerSpaceDim: boolean;
  /** 自定义尺寸编辑器 */
  customDimEditor: boolean;
  /** 无尺寸标注 */
  withoutDims: boolean;

  // ========== 窗扇选项 ==========
  /** 窗扇外开 */
  sashOutwardOpen: boolean;
  /** 窗扇双向开启 */
  sashDoubleWayOpen: boolean;
  /** 窗扇开启状态 */
  sashOpen: boolean;
  /** 窗扇作为门 */
  sashAsDoor: boolean;
  /** 固定窗扇转为固定玻璃 */
  fixedSashToFixedGlass: boolean;

  // ========== 玻璃和序列号 ==========
  /** 无玻璃序列号 */
  withoutGlassSerial: boolean;
  /** 显示框架序列号 */
  frameSerialShown: boolean;
  /** 玻璃规格配置 */
  glassSpec: GlassSpec;
  /** 基于脚本的玻璃规格 */
  scriptGlassSpecBased: boolean;
  /** 序列号配置 */
  serials: Serials;

  // ========== 模式开关 ==========
  /** 只读模式 */
  readonly: boolean;
  /** 欧洲标准 */
  europeanStandard: boolean;
  /** 严格轮询 */
  strictWheel: boolean;
  /** 简化视图 */
  asSimpleView: boolean;
  /** 禁止缩放 */
  preventScale: boolean;

  // ========== 语言设置 ==========
  /** 英语语言模式 */
  enLangMode: boolean;
  /** 当前语言模式 */
  langMode: langMode;

  // ========== 样式参数 ==========
  /** 描边宽度 */
  strokeWidth: number;
  /** 窗户描边宽度 */
  windowStrokeWidth: number;
  /** 尺寸字体大小 */
  dimFontSize: number;
  /** 尺寸字体高度 */
  dimFontH: number;
  /** 尺寸线高度 */
  dimLineH: number;
  /** 固定打印尺寸 */
  dimPrintSizeFixed: boolean;
  /** 打印尺寸 */
  dimPrintSize: number;
  /** 尺寸字体加粗 */
  dimFontBold: boolean;
  /** 标签字体大小 */
  labelFontSize: number;

  // ========== 硬件比例 ==========
  /** 铰链比例 */
  hingeRatio: number;
  /** 把手比例 */
  handleRatio: number;

  // ========== 顶视图参数 ==========
  /** 顶视图开启角度 */
  tvOpenDegree: number;
  /** 顶视图轨道边距 */
  tvTrackMargin: number;
  /** 顶视图型材尺寸 */
  tvProfileSize: number;
  /** 顶视图顶部边距 */
  tvMarginTop: number;

  // ========== 绘制类型 ==========
  /** 绘制多边形类型 */
  drawPolyType: DrawPolyType;

  // ========== 修改选项 ==========
  /** 在框架上拖拽修改 */
  dragModifyOnFrame: boolean;
  /** 无间隙框架 */
  nonGapFrame: boolean;
  /** 无间隙固定压条 */
  nonGapFixedBead: boolean;
  /** 无间隙窗扇 */
  nonGapSash: boolean;
  /** 无间隙窗扇压条 */
  nonGapSashBead: boolean;
  /** 无间隙圆角半径 */
  nonGapRound: number;

  // ========== 子框架 ==========
  /** 子框架占用孔洞 */
  subFrameOccupyHole: boolean;

  // ========== 单位和精度 ==========
  /**
   * 当前单位
   * 设置时自动更新对应的精度位数
   */
  unit: Unit;
  /** 单位精度位数 */
  unitDigits: number;

  // ========== 计算属性 ==========
  /**
   * 字体样式字符串
   * 根据简化视图和加粗设置生成CSS字体样式
   * @example "bold 120px Arial" 或 "120px Arial"
   */
  readonly font: string;

  /**
   * 机器人尺寸
   * 移动设备上自动放大2倍
   */
  robotSize: number;

  /**
   * 弧形虚拟点尺寸
   * 移动设备上自动放大2倍
   */
  arcDummy: number;

  /**
   * 顶点捕捉距离
   * 移动设备上自动放大2倍
   */
  snapVertex: number;

  /**
   * 边缘捕捉距离
   * 移动设备上自动放大2倍
   */
  snapEdge: number;

  // ========== 方法 ==========
  /**
   * 根据当前语言模式获取翻译文本
   * @param key - 翻译键
   * @returns 翻译后的文本，如果启用英语模式或找不到翻译则返回英文
   */
  lang(key: string): string;
}