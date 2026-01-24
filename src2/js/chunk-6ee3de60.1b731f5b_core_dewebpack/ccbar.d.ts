/**
 * 切料类型枚举
 */
export enum CcTypeEnum {
  frame = "frame",
  subFrame = "subFrame",
  mullion = "mullion",
  steelLiner = "steelLiner",
  cornerJoiner = "cornerJoiner",
  connector = "connector",
  fixedBead = "fixedBead",
  fixedNetBead = "fixedNetBead",
  fixedPanelBead = "fixedPanelBead",
  glass = "glass",
  fixedGlass = "fixedGlass",
  panel = "panel",
  fixedPanel = "fixedPanel",
  net = "net",
  fixedNet = "fixedNet",
  shade = "shade",
  fixedShade = "fixedShade",
  sashShade = "sashShade",
  shadeMullion = "shadeMullion",
  sashMullion = "sashMullion",
  sashGlass = "sashGlass",
  sashPanel = "sashPanel",
  sashBead = "sashBead",
  screenMullion = "screenMullion",
  screenNet = "screenNet",
  screenBead = "screenBead",
  panelBead = "panelBead",
  fixedShadeBead = "fixedShadeBead",
  decorationBar = "decorationBar",
  shadeSashMullion = "shadeSashMullion",
  shadeSashBead = "shadeSashBead",
  doubleSashMullion = "doubleSashMullion",
  doubleSashGlass = "doubleSashGlass",
  doubleSashPanel = "doubleSashPanel",
  doubleSashBead = "doubleSashBead",
  doubleScreenMullion = "doubleScreenMullion",
  doubleScreenNet = "doubleScreenNet",
  doubleScreenBead = "doubleScreenBead",
  foldSashMullion = "foldSashMullion",
  foldSashGlass = "foldSashGlass",
  foldSashPanel = "foldSashPanel",
  foldSashBead = "foldSashBead",
  foldScreenMullion = "foldScreenMullion",
  foldScreenNet = "foldScreenNet",
  foldScreenBead = "foldScreenBead",
  slideSashMullion = "slideSashMullion",
  slideSashGlass = "slideSashGlass",
  slideSashPanel = "slideSashPanel",
  slideSashBead = "slideSashBead",
  trackBar = "trackBar",
  turningFrame = "turningFrame",
  sashTurningFrame = "sashTurningFrame",
  screenFrame = "screenFrame",
  sideTrackFixed = "sideTrackFixed",
  sideTrackThroughFixed = "sideTrackThroughFixed",
  sideTrackSlide = "sideTrackSlide",
  sideTrackSlideEmbedded = "sideTrackSlideEmbedded",
  sideTrackCouple = "sideTrackCouple",
  sideTrackThroughCouple = "sideTrackThroughCouple",
  antitheftMullion = "antitheftMullion",
  frameCornerBrace = "frameCornerBrace",
  fixedTurningFrameCornerBrace = "fixedTurningFrameCornerBrace",
  sashCornerBrace = "sashCornerBrace",
  screenCornerBrace = "screenCornerBrace",
  sashTurningFrameCornerBrace = "sashTurningFrameCornerBrace",
  mullionConnector = "mullionConnector",
  Sash = "Sash",
  Screen = "Screen",
  ShadePushSash = "ShadePushSash",
  GuardSash = "GuardSash",
  AntiTheft = "AntiTheft",
  Slide = "Slide",
  UpTrack = "UpTrack",
  FixedUpTrack = "FixedUpTrack",
  DownTrack = "DownTrack",
  FixedDownTrack = "FixedDownTrack",
  UpDownTrack = "UpDownTrack",
  SideTrack = "SideTrack",
  DoubleSideTrack = "DoubleSideTrack",
  SlideSashUpBar = "SlideSashUpBar",
  SlideSashDownBar = "SlideSashDownBar",
  SlideSashCollisionLeftBar = "SlideSashCollisionLeftBar",
  SlideSashCollisionRightBar = "SlideSashCollisionRightBar",
  SlideSashEdgeBar = "SlideSashEdgeBar",
  SlideSashSingleBar = "SlideSashSingleBar",
  SlideSashDoubleBar = "SlideSashDoubleBar",
  SlideSashNoneBar = "SlideSashNoneBar",
  KfcSashUpBar = "KfcSashUpBar",
  KfcSashDownBar = "KfcSashDownBar",
  KfcSashLeftBar = "KfcSashLeftBar",
  KfcSashRightBar = "KfcSashRightBar",
}

/**
 * 线段类型枚举
 */
export enum LineType {
  /** 直线段 */
  Seg = "Seg",
  /** 圆弧段 */
  Arc = "Arc",
}

/**
 * 尺寸类型枚举
 */
export enum SizeTypeEnum {
  /** 宽度 */
  width = 0,
  /** 高度 */
  height = 1,
  /** 任意方向 */
  any = 2,
}

/**
 * 推拉连接类型枚举
 */
export enum SlideJoinType {
  /** 无连接 */
  none = 0,
  /** 边缘连接 */
  edge = 1,
  /** 碰撞连接 */
  collision = 2,
  /** 重叠连接 */
  overlap = 3,
}

/**
 * 切料选项配置
 */
interface CcBarOptions {
  /** 是否包含孔洞线段 */
  withHoleSegments: boolean;
  /** 是否对切角排序 */
  cutAngleSort: boolean;
  /** 是否等分玻璃 */
  equalSplitGlass: boolean;
  /** 是否对扇框切角排序 */
  sashBarsCutAngleSort: boolean;
}

/**
 * 反射信息接口
 */
interface Reflection {
  /** 目标类型 */
  target: string;
  /** 窗框ID */
  frameId: number;
  /** 边缘索引 */
  edgeIdx?: number;
  /** 中梃尺寸索引 */
  mulDimIdx?: number;
  /** 中梃起始位置 */
  mulStart?: boolean;
  /** 类型 */
  type?: string;
  /** 数值 */
  value?: number;
  /** 扇框多边形ID */
  sashPolyId?: unknown;
  /** 扇框类型 */
  sashType?: string;
  /** 遮阳多边形ID */
  shadePolyId?: unknown;
  /** 内扇框多边形ID */
  iSashPolyId?: unknown;
  /** 扇框编号 */
  sashNumber?: number;
  /** 填充值 */
  padding?: number;
  /** 间隙值 */
  gap?: number;
}

/**
 * 反转朝向区域信息
 */
interface ReverseTowardRegion {
  /** 窗框ID */
  frameId: number;
  /** 区域定义 */
  region?: {
    from: unknown;
    baseLine: unknown;
    validRanges: Array<{ from: number; to: number }>;
  };
}

/**
 * 切料条数据接口
 */
interface CcBarData {
  /** 形状ID */
  shapeId: number;
  /** 窗框ID */
  frameId: number;
  /** 切料类型 */
  type: CcTypeEnum | string;
  /** 切料长度 */
  cc: number | { width: number; height: number };
  /** 实际长度 */
  aa: number | { width: number; height: number };
  /** 尺寸类型 */
  sizeType: SizeTypeEnum;
  /** 位置类型 */
  posType: unknown;
  /** 切角描述 */
  cutAngle: string;
  /** 线段类型 */
  lineType: LineType;
  /** 位置信息 */
  position?: string;
  /** 是否增强 */
  isReinforced?: boolean;
  /** 连接数量 */
  connectCount?: number;
  /** 序列号 */
  serial?: string;
  /** 扇框分配方式 */
  sashAssignWay?: string;
  /** 是否为门 */
  isDoor?: boolean;
  /** 是否带转角框 */
  withTurningFrame?: boolean;
}

/**
 * 切料计算主类
 * 负责生成门窗各部件的切料清单
 */
export class CcBar {
  /** 形状管理器 */
  private readonly shapeManager: unknown;
  
  /** 窗框列表 */
  private readonly frames: unknown[];
  
  /** 反射信息列表 */
  public reflections: Reflection[];
  
  /** 切料选项 */
  public option: CcBarOptions;
  
  /** 推拉切料处理器 */
  private readonly slideCCBar: unknown;
  
  /** 折叠切料处理器 */
  private readonly foldCCBar: unknown;
  
  /** 推拉扇切料处理器 */
  private readonly pushSlideCCBar: unknown;
  
  /** 窗框切料处理器 */
  private readonly frameCCBar: unknown;
  
  /** 等分玻璃优化器 */
  private readonly equalSplitGlassOptimizer: unknown;
  
  /** 反转朝向区域列表 */
  private readonly reverseTowardRegions: ReverseTowardRegion[];

  /**
   * 构造函数
   * @param shapeManager 形状管理器实例
   */
  constructor(shapeManager: unknown);

  /**
   * 获取单位名称
   */
  get unit(): string;

  /**
   * 获取默认玻璃规格
   */
  get defaultGlassSpec(): unknown;

  /**
   * 刷新切料实例
   */
  freshICcBar(): CcBar | undefined;

  /**
   * 优化等分玻璃
   */
  optimizeEqualSplitGlass(param: unknown): unknown;

  /**
   * 重置窗框
   */
  resetFrames(): void;

  /**
   * 标记玻璃规格
   * @param specMap 规格映射表
   */
  markGlassesSpec(specMap: Map<string, string>): void;

  /**
   * 获取绘图信息
   */
  getDrawingInfo(): unknown;

  /**
   * 获取所有切料数据
   * @param includeFrameUids 包含的窗框UID列表
   * @param excludeFrameUids 排除的窗框UID列表
   */
  getCcBars(includeFrameUids?: string[], excludeFrameUids?: string[]): CcBarData[];

  /**
   * 获取内部玻璃多边形数据
   */
  getInnerGlassPolyes(includeFrameUids?: string[], excludeFrameUids?: string[]): unknown[];

  /**
   * 获取扇框切料数据
   * @param sashParams 扇框参数列表
   */
  getSashCcBars(sashParams: Array<{ id: number; width: number; height: number }>): CcBarData[];

  /**
   * 获取防盗网切料数据
   */
  getAntitheftCcBars(params: Array<{ id: number; width: number; height: number }>): CcBarData[];

  /**
   * 获取内部扇框切料数据
   */
  getInnerSashCcBars(params: Array<{ id: number; width: number; height: number; sashNumber: number }>): CcBarData[];

  /**
   * 获取遮阳切料数据
   */
  getShadeCcBars(params: Array<{ id: number; width: number; height: number }>): CcBarData[];

  /**
   * 应用反射信息
   * 将收集的尺寸标注等信息应用回原始对象
   */
  reflect(): void;

  /**
   * 为报价模拟目标对象
   */
  mockTargetsForOfferPrice(): unknown[];

  /**
   * 克隆窗框
   */
  private cloneFrame(frame: unknown): unknown;

  /**
   * 转换单位
   */
  private convertUnit(bar: CcBarData): void;

  /**
   * 固定小数位数
   */
  private toFixed(bars: CcBarData[], digits?: number): void;

  /**
   * 获取中梃连接器数据
   */
  private getMulConnectors(mullions: CcBarData[]): CcBarData[];

  /**
   * 获取孔洞切料数据
   */
  private getHoleCCBars(): unknown[];

  /**
   * 获取窗框连接切料数据
   */
  private getFrameConnectCCBars(): unknown[];

  /**
   * 计算反转朝向区域
   */
  private computeReverseTowardRegion(frame: unknown): ReverseTowardRegion['region'];

  /**
   * 判断点是否在反转朝向区域内
   */
  private inReverseTowardRegion(point: unknown, frameId: number): boolean;

  /**
   * 反转朝向
   */
  private reverseToward(bar: CcBarData): void;
}