/**
 * 推荐配饰管理器
 * 负责处理家装设计中的智能配饰推荐功能
 */

import type { HSCore, HSApp, HSCatalog } from './types/hs-types';

/**
 * 推荐日志信号参数
 */
interface RecommendLogSignalParams {
  type: 'recommendAccessories' | 'reset' | 'changeScheme';
}

/**
 * 算法方案数据结构
 */
interface SchemeData {
  /** 产品ID */
  id: string;
  /** 位置坐标 [x, y, z] */
  position: [number, number, number];
  /** 缩放比例 [x, y, z] */
  scale: [number, number, number];
  /** 旋转角度 [x, y, z] */
  rotation: [number, number, number];
  /** 类型标识 */
  type?: string;
  /** 子列表 */
  sub_list?: SchemeData[];
  /** 软装数据 */
  softClothData?: unknown;
}

/**
 * 推荐请求参数
 */
interface RecommendRequestParams {
  /** 户型ID */
  house_id: string;
  /** 房间ID */
  room_id: string;
  /** 平台ID */
  plat_id: string;
  /** 平台实体ID */
  plat_entity: string;
  /** 户型数据 */
  house_data: Record<string, unknown>;
  /** 房间数据 */
  room_data: unknown;
  /** 布局数量 */
  layout_number: number;
  /** 推荐数量 */
  propose_number: number;
  /** 布局模式 */
  layout_mode: number;
  /** 请求ID */
  requestId: string;
}

/**
 * 推荐响应数据
 */
interface RecommendResponse {
  data?: {
    /** 推荐方案组 */
    group_scheme?: SchemeData[][];
  };
  /** 返回码 */
  ret?: string;
}

/**
 * 软装数据处理结果
 */
interface SoftClothProcessResult {
  /** 产品数据映射 */
  productData: Record<string, HSCatalog.Product>;
  /** 算法数据数组 */
  algorithmData: SchemeData[];
}

/**
 * LiveHint选项配置
 */
interface LiveHintOptions {
  /** 状态类型 */
  status?: typeof LiveHint.statusEnum.warning;
  /** 是否可关闭 */
  canclose?: boolean;
  /** 关闭回调 */
  closeCallback?: () => void;
  /** 追加内容 */
  append?: string;
}

/**
 * 推荐配饰管理器类
 * 提供智能配饰推荐、方案切换、数据管理等功能
 */
export default class RecommendAccessoriesManager {
  /** 应用实例 */
  private readonly _app: HSApp.Application;
  
  /** 当前方案索引 */
  private _currentIndex?: number;
  
  /** 目标空间 */
  private _targetSpace?: HSCore.Model.Space;
  
  /** 上一次推荐数据 */
  private _previousData?: HSCore.Model.Content[];
  
  /** 锚点内容（推荐基准物品） */
  private _anchorContent?: HSCore.Model.Content;
  
  /** 所有内容数据映射表 */
  private _allContentsDataMap?: Map<number, HSCore.Model.Content[]>;
  
  /** 推荐日志信号 */
  public signalRecommendAccessoriesToLog: HSCore.Util.Signal<RecommendLogSignalParams>;

  /**
   * 构造函数
   * @param app - 应用实例
   */
  constructor(app: HSApp.Application);

  /**
   * 初始化管理器
   * 重置所有状态变量
   */
  init(): void;

  /**
   * 显示全屏加载提示
   */
  showLoading(): void;

  /**
   * 隐藏全屏加载提示
   */
  hideLoading(): void;

  /**
   * 开始推荐流程
   * @param content - 作为基准的内容对象
   */
  startRecommendProcess(content: HSCore.Model.Content): void;

  /**
   * 检查内容数组中是否存在有效内容
   * @param contents - 内容数组
   * @returns 是否存在未被删除的内容
   */
  private _isContentExist(contents: HSCore.Model.Content[]): boolean;

  /**
   * 获取数据并执行添加配饰命令
   * @param anchorContent - 锚点内容
   * @param algorithmData - 算法推荐数据
   * @param previousContents - 之前的内容数组
   * @param isReset - 是否为重置操作
   * @param schemeIndex - 方案索引，默认为0
   * @returns Promise，成功时resolve，失败时reject
   */
  private _getDataAndExecuteCmd(
    anchorContent: HSCore.Model.Content,
    algorithmData: SchemeData[],
    previousContents: HSCore.Model.Content[],
    isReset: boolean,
    schemeIndex?: number
  ): Promise<void>;

  /**
   * 处理软装数据
   * @param productMap - 产品数据映射
   * @param algorithmData - 算法数据数组
   * @param anchorContent - 锚点内容
   * @returns Promise，返回处理后的软装数据结果，失败时返回null
   */
  private _getSoftClothData(
    productMap: Record<string, HSCatalog.Product>,
    algorithmData: SchemeData[],
    anchorContent: HSCore.Model.Content
  ): Promise<SoftClothProcessResult | null>;

  /**
   * 递归获取方案数据中的所有产品SeekID
   * @param schemeData - 方案数据节点
   * @returns SeekID数组
   */
  private _getSeekIds(schemeData: SchemeData): string[];

  /**
   * 显示尝试其他方案的提示框
   * @param allSchemes - 所有推荐方案数组
   * @param anchorContent - 锚点内容
   */
  private _showTryOtherSchemeLiveHint(
    allSchemes: SchemeData[][],
    anchorContent: HSCore.Model.Content
  ): void;
}