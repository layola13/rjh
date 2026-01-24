/**
 * 智能搭配命令 - 用于处理产品推荐和智能搭配功能
 * 支持一键换一套和一键还原两种模式
 */

/** 位置坐标接口 */
interface Position {
  x: number;
  y: number;
  z: number;
}

/** 旋转角度接口 */
interface Rotation {
  x: number;
  y: number;
  z: number;
}

/** 缩放比例接口 */
interface Scale {
  XScale: number;
  YScale: number;
  ZScale: number;
}

/** 尺寸接口 */
interface Size {
  XSize: number;
  YSize: number;
  ZSize: number;
}

/** 产品元数据接口 */
interface ProductMetadata {
  id: string;
  XLength: number;
  YLength: number;
  ZLength: number;
  [key: string]: unknown;
}

/** 产品数据接口 */
interface ProductData {
  id: string;
  entityId?: string;
  metadata: ProductMetadata;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  host?: unknown;
  materialMap?: Record<string, unknown>;
  isCustomizedCabinetProducts?: boolean;
  sub_list?: ProductData[];
}

/** 内容对象接口 */
interface ContentObject {
  id: string;
  x: number;
  y: number;
  z: number;
  rotation: number;
  XRotation: number;
  YRotation: number;
  XSize: number;
  YSize: number;
  ZSize: number;
  zIndex: number;
  metadata: ProductMetadata;
  XLength: number;
  YLength: number;
  ZLength: number;
  getHost(): unknown;
}

/** 移动数据接口 */
interface MoveData extends ProductData {
  calculateHost?: unknown;
}

/** 无宿主数据接口 */
interface NoHostData {
  id: string;
  meta: ProductMetadata;
  position: Position;
  rotation: Rotation;
  scale: Scale;
  size: Size;
}

/** 宿主计算参数接口 */
interface HostCalculationParams {
  hostType?: string;
  meta: ProductMetadata;
  position: Position;
  room: unknown;
  size: Size;
  rotation: Rotation;
  scale: Scale;
}

/** 内容位置状态接口 */
interface ContentPositionState {
  x: number;
  y: number;
  z: number;
  XRotation: number;
  YRotation: number;
  rotation: number;
  host: unknown;
}

/** 元数据映射类型 */
type MetadataMap = Record<string, ProductMetadata>;

/**
 * 智能搭配命令类声明
 * 继承自 HSApp.Cmd.Command，用于处理智能产品推荐和布局
 */
export default class SmartCollocationCommand extends HSApp.Cmd.Command {
  /** 当前产品数据列表 */
  private _productData: ProductData[];

  /** 之前的产品数据列表 */
  private _previousData: ContentObject[];

  /** 房间对象 */
  private _room: unknown;

  /** 是否为还原操作 */
  private _isRestore: boolean;

  /** 需要移动的产品数据 */
  private _moveData: MoveData[];

  /** 需要移动的产品ID列表 */
  private _moveDataId: string[];

  /** 所有内容对象列表 */
  private _allContents: ContentObject[];

  /** 无宿主的产品数据列表 */
  private _noHostData: NoHostData[];

  /** 所有元数据映射 */
  private _allMetaData: MetadataMap;

  /** 是否合并前一个请求 */
  private mergePreviousRequest: boolean;

  /** 命令输出结果 */
  private output: ContentObject[];

  /**
   * 构造函数
   * @param productData - 当前产品数据列表
   * @param previousData - 之前的产品数据列表
   * @param room - 房间对象
   * @param isRestore - 是否为还原操作，默认为false
   * @param allMetaData - 所有元数据映射
   */
  constructor(
    productData?: ProductData[],
    previousData?: ContentObject[],
    room?: unknown,
    isRestore?: boolean,
    allMetaData?: MetadataMap
  );

  /**
   * 执行命令
   * @returns 所有处理后的内容对象列表
   */
  onExecute(): ContentObject[];

  /**
   * 还原操作 - 将场景还原到之前的状态
   * @param previousData - 之前的产品数据
   * @param productData - 当前产品数据
   * @param room - 房间对象
   */
  private _restore(
    previousData: ContentObject[],
    productData: ProductData[],
    room: unknown
  ): void;

  /**
   * 处理推荐内容 - 换一套操作
   * @param previousData - 之前的产品数据
   * @param productData - 当前产品数据
   * @param room - 房间对象
   */
  private _handleRecommendContents(
    previousData: ContentObject[],
    productData: ProductData[],
    room: unknown
  ): void;

  /**
   * 添加子列表内容
   * @param productData - 产品数据
   * @param metadataMap - 元数据映射
   * @param room - 房间对象
   * @param parentContent - 父内容对象（可选）
   */
  private _addSubListContent(
    productData: ProductData,
    metadataMap: MetadataMap,
    room: unknown,
    parentContent?: ContentObject
  ): void;

  /**
   * 添加内容到场景
   * @param productData - 产品数据
   * @param metadataMap - 元数据映射
   * @param room - 房间对象
   * @param host - 宿主对象（可选）
   */
  private _addContents(
    productData: ProductData,
    metadataMap: MetadataMap,
    room: unknown,
    host?: unknown
  ): void;

  /**
   * 获取产品的宿主对象
   * @param params - 宿主计算参数
   * @returns 宿主对象，可能为墙面、天花板、地板或其他内容对象
   */
  private _getHost(params: HostCalculationParams): unknown;

  /**
   * 移动内容到新位置
   * @param content - 要移动的内容对象
   * @param targetData - 目标数据
   * @param room - 房间对象
   */
  private _moveContent(
    content: ContentObject,
    targetData: MoveData,
    room: unknown
  ): void;

  /**
   * 获取命令分类
   * @returns 日志分组类型：智能搭配
   */
  getCategory(): string;

  /**
   * 获取命令描述
   * @returns 命令描述文本："智能搭配:一键还原" 或 "智能搭配:换一套"
   */
  getDescription(): string;

  /**
   * 判断命令是否为交互式
   * @returns 始终返回 true
   */
  isInteractive(): boolean;
}