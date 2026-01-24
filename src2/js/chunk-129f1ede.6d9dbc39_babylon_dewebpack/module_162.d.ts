/**
 * WebCC数据到KJL格式转换分析器
 * 处理门窗配置数据的解析、验证和转换
 */

/**
 * 点坐标接口
 */
interface Point {
  x: number;
  y: number;
}

/**
 * 向量接口
 */
interface Vector2 {
  x: number;
  y: number;
}

/**
 * 杆件信息
 */
interface Bar {
  startPt: Point;
  endPt: Point;
  profileId: string;
  arcHeight?: number;
  startAngle?: number;
  endAngle?: number;
  startProfile?: string;
  endProfile?: string;
}

/**
 * 闭合对象（包含多个杆件）
 */
interface CloseObject {
  bars: Bar[];
}

/**
 * 多边形参数信息
 */
interface PolygonParaInfo {
  min_x_m: number;
  min_y_m: number;
  max_x_m: number;
  max_y_m: number;
  depth_m: number;
  length_x_m?: number;
  length_y_m?: number;
}

/**
 * 型材信息
 */
interface ProfileInfo {
  profileType: string;
  widthm: number;
  depthm: number;
  poszm: number;
  dxf_high_url: string;
  dxf_low_url?: string;
}

/**
 * 型材数据集合
 */
interface ProfileData {
  data: ProfileInfo[];
}

/**
 * 型材交叉信息
 */
interface ProfileCross {
  profile_id_src: string;
  profile_id_des: string;
  value: number;
}

/**
 * 型材交叉数据集合
 */
interface ProfileCrossData {
  data: ProfileCross[];
}

/**
 * 玻璃计划信息
 */
interface GlassPlanInfo {
  fixedposzarray: number[];
  fixeddepthm: number;
  fixedbasez: number;
  fixedjtDepth: number;
  leafposzarray?: number[];
  leafbasez: number;
  leafjtDepth?: number;
}

/**
 * 纱窗计划信息
 */
interface FlyScreenPlanInfo extends GlassPlanInfo {}

/**
 * 推拉轨道计划信息
 */
interface SlidePlanInfo {
  posZArray: number[];
  sashPosZArray: number[];
}

/**
 * 玻璃/纱网对象
 */
interface GlassObject {
  pts: Point[];
  opts?: Point[];
  closeObject?: CloseObject;
}

/**
 * 五金件信息
 */
interface Hardware {
  type: string;
  x: number;
  y: number;
}

/**
 * 扇信息（玻璃扇或纱扇）
 */
interface Leaf {
  closeObject: CloseObject;
  glass: GlassObject[];
  flyScreen: GlassObject[] | GlassObject;
  hardwares?: Hardware[];
  isOutward: boolean;
  openDirection?: string;
}

/**
 * 推拉扇信息
 */
interface SlideLeaf extends Leaf {
  pathWay: number;
}

/**
 * 推拉路径
 */
interface SlidePath {
  startPt: Point;
  endPt: Point;
}

/**
 * 推拉窗信息
 */
interface Slide {
  slidePathWayUp?: SlidePath;
  slidePathWayDown?: SlidePath;
  slideLeafs: SlideLeaf[][];
}

/**
 * 转换框信息
 */
interface TurningFrame {
  closeObject: CloseObject;
}

/**
 * 防盗窗信息
 */
interface AntiTheft {
  closeObject: CloseObject;
  securityBoxArray?: Bar[];
}

/**
 * 窗框信息
 */
interface Frame {
  id?: string;
  name?: string;
  seriesId?: number;
  anchor: Point;
  closeObject: CloseObject;
  mullions?: Bar[];
  glassLeafs?: Leaf[];
  screenLeafs?: Leaf[];
  glasses?: GlassObject[];
  slides?: Slide[];
  antiTheft?: AntiTheft[];
  fixedTurningFrames?: TurningFrame[];
  sashTurningFrames?: TurningFrame[];
}

/**
 * 转角信息
 */
interface Corner {
  startPt: Point;
  endPt: Point;
  angle: number;
  wh: number;
  cornerFrameIds: string[];
}

/**
 * 连接件信息
 */
interface Connector {
  startPt: Point;
  endPt: Point;
  width: number;
}

/**
 * WebCC数据结构
 */
interface WebCCData {
  frames: Frame[];
  corners?: Corner[];
  connectors: Connector[];
  profiles?: ProfileData;
  profileCrosss?: ProfileCrossData;
  glassPlan?: GlassPlanInfo;
  flyScreenPlan?: FlyScreenPlanInfo;
  tlGDPlan?: SlidePlanInfo;
}

/**
 * KJL导出参数（元数据）
 */
interface KJLExportMeta {
  name?: string;
  previewImg_url?: string;
}

/**
 * KJL模型项
 */
interface KJLModelItem {
  name: string;
  type: string;
  category: number;
  translate?: number[];
  rotate?: number[];
  scale?: number[];
  parameters: Array<{ category: string; name: string; value: string }>;
  subModels: KJLModelItem[];
}

/**
 * KJL窗洞曲线
 */
interface WindowHoleCurve {
  type: 'lineSeg' | 'arc';
  bulge?: number;
}

/**
 * KJL窗洞定义
 */
interface WindowHole {
  points: number[];
  curves: WindowHoleCurve[];
}

/**
 * KJL参数基类
 */
interface KJLParamBase {
  name: string;
  previewImgUrl: string;
}

/**
 * 普通窗KJL参数
 */
interface KJLParam extends KJLParamBase {
  windowHole: WindowHole;
  borders: KJLModelItem[];
  frameRails: KJLModelItem[];
  frameMullions: KJLModelItem[];
  glassWindows: KJLModelItem[];
  gauzeWindows: KJLModelItem[];
  fixedGlass: KJLModelItem[];
}

/**
 * L型窗KJL参数
 */
interface KJLParam_L extends KJLParamBase {
  parts: KJLModelItem[];
  subWindows: KJLWindowItem[];
}

/**
 * KJL窗项
 */
interface KJLWindowItem {
  name: string;
  parts: KJLModelItem[];
}

/**
 * 杆件计算后的点位
 */
interface BarCalculatedPoints {
  start_pre: Point;
  end_pre: Point;
  start_after: Point;
  end_after: Point;
}

/**
 * 边界框信息
 */
interface BoundingBox {
  min_x_m: number;
  min_y_m: number;
  max_x_m: number;
  max_y_m: number;
  length_x_m: number;
  length_y_m: number;
}

/**
 * WebCC数据到KJL格式分析器
 */
export default class WebCCAnalyzer {
  /**
   * 分析WebCC数据并转换为KJL格式
   * @param webccJson - WebCC格式的JSON字符串
   * @param meta - 导出元数据（名称、预览图等）
   * @returns KJL格式的JSON字符串
   */
  static AnalysisWebCCDataToKJL(
    webccJson: string,
    meta?: KJLExportMeta
  ): Promise<string>;
}

/**
 * 计算多边形参数信息
 * @param data - WebCC数据
 * @returns 多边形参数信息
 */
declare function calculatePolygonInfo(data: WebCCData): PolygonParaInfo;

/**
 * 获取DXF文件URL（根据LOD级别）
 * @param profile - 型材信息
 * @param arcHeight - 弧高（可选）
 * @returns DXF文件URL
 */
declare function getDxfUrl(profile: ProfileInfo, arcHeight?: number): string;

/**
 * 计算闭合对象的边界框
 * @param closeObject - 闭合对象
 * @returns 边界框信息
 */
declare function calculateCloseObjectBounds(closeObject: CloseObject): BoundingBox | undefined;

/**
 * 计算玻璃/纱网对象的边界框
 * @param glassObject - 玻璃/纱网对象
 * @returns 边界框信息
 */
declare function calculateGlassBounds(glassObject: GlassObject): BoundingBox | undefined;

/**
 * 计算杆件的实际起止点（考虑角度和型材交叉）
 * @param bar - 杆件信息
 * @param profileCross - 型材交叉数据
 * @param profile - 型材信息
 * @returns 计算后的点位信息
 */
declare function calculateBarPoints(
  bar: Bar,
  profileCross: ProfileCrossData,
  profile: ProfileInfo
): BarCalculatedPoints;

/**
 * 根据方向判断构件类别
 * @param direction - 方向 (0=横向, 1=纵向, 2=斜向)
 * @returns 构件类别枚举值
 */
declare function getCategoryByDirection(direction: number): number;

/**
 * 处理窗框
 * @param frame - 窗框数据
 * @param profiles - 型材数据
 * @param profileCrosss - 型材交叉数据
 * @param frameInfo - 窗框参数信息
 * @param category - 构件类别
 * @param targetSubModels - 目标子模型数组
 * @param prePrtofileType - 预定义型材类型
 */
declare function processFrame(
  frame: Frame,
  profiles: ProfileData,
  profileCrosss: ProfileCrossData,
  frameInfo: PolygonParaInfo,
  category: number,
  targetSubModels: KJLModelItem[],
  prePrtofileType?: string
): Promise<void>;

/**
 * 处理中挺（横挺/竖挺）
 * @param bar - 杆件信息
 * @param profiles - 型材数据
 * @param profileCrosss - 型材交叉数据
 * @param frameInfo - 窗框参数信息
 * @param result - 结果对象
 * @param targetSubModels - 目标子模型数组
 */
declare function processMullion(
  bar: Bar,
  profiles: ProfileData,
  profileCrosss: ProfileCrossData,
  frameInfo: PolygonParaInfo,
  result: { frameRails: KJLModelItem[]; frameMullions: KJLModelItem[] },
  targetSubModels?: KJLModelItem[]
): Promise<void>;

/**
 * 处理扇（玻璃扇/纱扇）
 * @param index - 扇索引
 * @param leaf - 扇数据
 * @param glassPlan - 玻璃计划信息
 * @param profiles - 型材数据
 * @param profileCrosss - 型材交叉数据
 * @param frameInfo - 窗框参数信息
 * @param result - 结果对象
 * @param targetSubModels - 目标子模型数组
 */
declare function processLeaf(
  index: number,
  leaf: Leaf,
  glassPlan: GlassPlanInfo,
  profiles: ProfileData,
  profileCrosss: ProfileCrossData,
  frameInfo: PolygonParaInfo,
  result: { glassWindows: KJLModelItem[]; gauzeWindows: KJLModelItem[] },
  targetSubModels?: KJLModelItem[]
): Promise<void>;

/**
 * 处理玻璃或纱网
 * @param glassObject - 玻璃/纱网对象
 * @param glassPlan - 玻璃计划信息
 * @param frameProfile - 框型材信息
 * @param bounds - 边界框
 * @param parentModel - 父模型
 * @param isGauze - 是否为纱网
 */
declare function processGlassOrGauze(
  glassObject: GlassObject,
  glassPlan: GlassPlanInfo,
  frameProfile: ProfileInfo,
  bounds: BoundingBox,
  parentModel: KJLModelItem,
  isGauze: boolean
): Promise<void>;

/**
 * 处理推拉窗
 * @param slide - 推拉窗数据
 * @param slidePlan - 推拉计划信息
 * @param glassPlan - 玻璃计划信息
 * @param flyScreenPlan - 纱窗计划信息
 * @param profiles - 型材数据
 * @param profileCrosss - 型材交叉数据
 * @param frameInfo - 窗框参数信息
 * @param borderModels - 边框模型数组
 * @param glassWindowModels - 玻璃窗模型数组
 * @param gauzeWindowModels - 纱窗模型数组
 */
declare function processSlide(
  slide: Slide,
  slidePlan: SlidePlanInfo,
  glassPlan: GlassPlanInfo,
  flyScreenPlan: FlyScreenPlanInfo,
  profiles: ProfileData,
  profileCrosss: ProfileCrossData,
  frameInfo: PolygonParaInfo,
  borderModels: KJLModelItem[],
  glassWindowModels: KJLModelItem[],
  gauzeWindowModels: KJLModelItem[]
): Promise<void>;

/**
 * 处理防盗窗
 * @param antiTheft - 防盗窗数据数组
 * @param profiles - 型材数据
 * @param profileCrosss - 型材交叉数据
 * @param frameInfo - 窗框参数信息
 * @param result - 结果对象
 * @param targetModels - 目标模型数组
 */
declare function processAntiTheft(
  antiTheft: AntiTheft[],
  profiles: ProfileData,
  profileCrosss: ProfileCrossData,
  frameInfo: PolygonParaInfo,
  result: { frameRails: KJLModelItem[]; frameMullions: KJLModelItem[] },
  targetModels: KJLModelItem[]
): Promise<void>;