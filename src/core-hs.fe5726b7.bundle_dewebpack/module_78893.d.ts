/**
 * 参数化吊顶类型枚举
 * 定义了所有支持的吊顶样式类型
 */
export enum ParametricCeilingTypeEnum {
  /** 平面吊顶 */
  PlaneCeiling = "PlaneCeiling",
  /** 圆角吊顶 */
  CornerArcCeiling = "CornerArcCeiling",
  /** 圆形吊顶 */
  CircleCeiling = "CircleCeiling",
  /** 叠级吊顶 */
  CascadeCeiling = "CascadeCeiling",
  /** 格栅吊顶 */
  GridCeiling = "GridCeiling",
  /** 直角吊顶 */
  CornerRectCeiling = "CornerRectCeiling",
  /** 装饰吊顶 */
  OrnamentCeiling = "OrnamentCeiling",
  /** 下沉吊顶 */
  DropDownCeiling = "DropDownCeiling",
  /** 旧式叠级吊顶 */
  OlderCascadeCeiling = "OlderCascadeCeiling",
  /** 过道格栅吊顶 */
  AisleGridCeiling = "AisleGridCeiling",
  /** 欧式吊顶 */
  EuropeanStyleCeiling = "EuropeanStyleCeiling",
  /** 内圆吊顶 */
  InnerCircleCeiling = "InnerCircleCeiling",
  /** 带横梁方形吊顶 */
  SquareCeilingWithCrossBeam = "SquareCeilingWithCrossBeam",
  /** 斜屋顶 */
  PitchedRoof = "PitchedRoof",
  /** 带横梁斜屋顶 */
  PitchedRoofWithCrossBeam = "PitchedRoofWithCrossBeam",
  /** 人字形吊顶 */
  HerringboneCeiling = "HerringboneCeiling",
  /** 带横梁人字形吊顶 */
  HerringboneCeilingWithCrossBeam = "HerringboneCeilingWithCrossBeam"
}

/**
 * 格栅吊顶类型枚举
 */
export enum GridCeilingTypeEnum {
  /** 固定格数 */
  FixedGridNum = "FixedGridNum",
  /** 自动适配格栅 */
  AutoFitGrid = "AutoFitGrid"
}

/**
 * 圆形吊顶类型枚举
 */
export enum CircleCeilingTypeEnum {
  /** 自动适配圆形 */
  AutoFitCircle = "AutoFitCircle",
  /** 自动适配椭圆 */
  AutoFitEllipse = "AutoFitEllipse",
  /** 固定板材圆形 */
  FixedBoardCircle = "FixedBoardCircle",
  /** 固定板材椭圆 */
  FixedBoardEllipse = "FixedBoardEllipse"
}

/**
 * 二维点坐标
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * 边界框信息
 */
export interface BoundingBox {
  /** X方向尺寸 */
  XSize: number;
  /** Y方向尺寸 */
  YSize: number;
  /** 中心点 */
  center: Point2D;
  /** 左上角点 */
  lefttop: Point2D;
}

/**
 * 材质数据
 */
export interface MaterialData {
  /** 材质相关数据 */
  [key: string]: unknown;
}

/**
 * 型材轮廓数据
 */
export interface ProfileData {
  /** 型材宽度（米） */
  profileSizeX: number;
  /** 型材高度（米） */
  profileSizeY: number;
  /** X方向偏移（厘米） */
  offsetX?: number;
  /** 材质数据 */
  materialData?: MaterialData;
  /** 法线纹理 */
  normalTexture?: unknown;
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * 叠级吊顶参数
 */
export interface CascadeParameters {
  /** 型材类型 (1/2/3级) */
  profileType: 1 | 2 | 3;
  /** 第一级宽度（米） */
  w1: number;
  /** 第一级高度（米） */
  h1: number;
  /** 第二级宽度（米） */
  w2?: number;
  /** 第二级高度（米） */
  h2?: number;
  /** 第三级宽度（米） */
  w3?: number;
  /** 第三级高度（米） */
  h3?: number;
  /** 第一级型材数据 */
  level1ProfileData?: ProfileData;
  /** 第二级型材数据 */
  level2ProfileData?: ProfileData;
  /** 第三级型材数据 */
  level3ProfileData?: ProfileData;
  /** 是否添加第二级灯槽 */
  addLightSlotLevel2?: boolean;
  /** 是否添加第二级线条 */
  addMoldingLevel2?: boolean;
  /** 是否添加第三级灯槽 */
  addLightSlotLevel3?: boolean;
  /** 是否添加第三级线条 */
  addMoldingLevel3?: boolean;
  /** 是否添加内部线条 */
  addInnerMolding?: boolean;
  /** 内部型材数据 */
  innerProfileData?: ProfileData;
}

/**
 * 格栅吊顶参数
 */
export interface GridCeilingParameters {
  /** 外边板宽度（米） */
  outerBoard: number;
  /** 内边板宽度（米） */
  innerBoard: number;
  /** X方向格数 */
  gridXNum?: number;
  /** Y方向格数 */
  gridYNum?: number;
  /** 格栅类型 */
  gridType?: GridCeilingTypeEnum;
  /** 格栅尺寸（米） */
  gridSize?: number;
  /** 内边板宽度比例 */
  innerBoardWidthRatio?: number;
  /** 格数（过道格栅） */
  gridNum?: number;
}

/**
 * 斜屋顶/人字形吊顶参数
 */
export interface RoofParameters {
  /** 吊顶偏移（米） */
  ceilingOffset: number;
  /** 横梁间距（米） */
  beamSpacing: number;
  /** 横梁宽度（米） */
  beamWidth: number;
  /** 横梁高度（米） */
  beamHeight: number;
  /** 坡度（角度） */
  gradient: number;
  /** 旋转角度 */
  rotate: number;
}

/**
 * 参数化吊顶配置参数
 * 包含所有吊顶类型的通用和特定参数
 */
export interface CeilingParameters extends Partial<CascadeParameters>, Partial<GridCeilingParameters>, Partial<RoofParameters> {
  /** 吊顶类型 */
  parametricCeilingType: ParametricCeilingTypeEnum;
  /** 吊顶高度（米） */
  ceilingHeight: number;
  /** 吊顶宽度（米） */
  ceilingWidth?: number;
  /** 是否自动填充间隙 */
  autoFillGap: boolean;
  /** 是否快速计算（低精度） */
  fastComputing: boolean;
  /** 最小尺寸限制（米） */
  minSizeLimited?: number;
  /** 主体部分是否为矩形 */
  isRectMainPart?: boolean;
  /** 是否添加线条 */
  addMolding?: boolean;
  /** 是否添加灯槽 */
  addLightSlot?: boolean;
  /** 是否添加内部灯槽 */
  addInnerLightSlot?: boolean;
  /** 线条型材数据 */
  moldingProfileData?: ProfileData;
  /** 翻转的线条型材数据 */
  flippedMoldingProfileData?: ProfileData;
  /** 外圆弧半径（米） */
  ceilingOutArcRadius?: number;
  /** 是否为标准圆形 */
  isStandardCircle?: boolean;
  /** 圆形吊顶类型 */
  circleCeilingType?: CircleCeilingTypeEnum;
  /** 直角宽度（米） */
  cornerRectWidth?: number;
  /** 内部距离（米） */
  innerDistance?: number;
  /** 内部吊顶高度（米） */
  innerCeilingHeight?: number;
  /** 角尺寸（米） */
  cornerSize?: number;
  /** 圆弧半径（米） */
  arcRadius?: number;
  /** 圆弧步长（米） */
  arcStep?: number;
  /** 叠级宽度（米） */
  cascadeWidth?: number;
  /** 叠级高度（米） */
  cascadeHeight?: number;
  /** 间隔宽度（米） */
  intervalWidth?: number;
  /** 是否添加外部线条 */
  addOuterMolding?: boolean;
  /** 外部型材数据 */
  outerProfileData?: ProfileData;
  /** 吊顶厚度（米） */
  ceilingThickness?: number;
  /** 灯带配置 */
  lightBands?: number[];
  /** 轮廓数据 */
  profile?: Point2D[];
  /** 轮廓宽度（米） */
  profileWidth?: number;
  /** 轮廓高度（米） */
  profileHeight?: number;
  /** 外边板宽度（米） */
  outerBoardWidth?: number;
}

/**
 * WebCAD模型文档
 */
export interface WebCADDocument {
  /** 文档ID */
  docId: string;
  /** 是否处于快速计算模式 */
  isDuringFastComputation?: boolean;
  /** 其他文档属性 */
  [key: string]: unknown;
}

/**
 * 建模数据
 */
export interface ModelingData {
  /** WebCAD文档 */
  webCADDocument?: WebCADDocument;
  /** 单位 */
  unit: string;
  /** X方向长度（米） */
  XLength: number;
  /** Y方向长度（米） */
  YLength: number;
  /** Z方向长度（米） */
  ZLength: number;
  /** 尺寸范围类型 */
  sizeRangeType: string;
}

/**
 * 三维位置
 */
export interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 吊顶模型数据
 * 用于创建和放置吊顶模型
 */
export interface CeilingMold {
  /** 建模数据 */
  modelingData: ModelingData;
  /** 位置信息 */
  position: Position3D;
  /** 轮廓多边形 */
  outline?: Point2D[];
  /** 宿主多边形（房间多边形） */
  hostPolygon?: Point2D[];
}

/**
 * 参数化吊顶生成器
 * 根据房间轮廓和参数生成各种类型的吊顶模型
 */
export declare class ParametricCeiling {
  /**
   * 构造函数
   * @param roomPolygon 房间多边形轮廓（二维点数组）
   * @param ceilingParameters 吊顶参数配置
   */
  constructor(roomPolygon: Point2D[], ceilingParameters: CeilingParameters);

  /**
   * 创建WebCAD文档
   * 根据吊顶类型生成相应的3D模型文档
   * @param _unused 未使用的参数（保留用于API兼容性）
   * @returns WebCAD文档对象，失败时返回undefined
   */
  createWebCADDocument(_unused?: unknown): WebCADDocument | undefined;

  /**
   * 创建吊顶模型数据
   * 包含建模信息、位置和轮廓
   * @returns 吊顶模型数据对象
   */
  createMold(): CeilingMold;

  /**
   * 创建人字形吊顶
   * @param withCrossBeam 是否包含横梁
   * @returns WebCAD文档对象
   */
  createHerringboneCeiling(withCrossBeam?: boolean): WebCADDocument | undefined;

  /**
   * 验证房间多边形是否有效
   * 检查房间和主体部分多边形是否满足最低点数要求
   * @returns 有效返回true，否则返回false
   */
  isRoomPolygonValid(): boolean;
}