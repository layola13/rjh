/**
 * 自动推荐插件 - 类型声明
 * 提供智能家居空间的自动搭配推荐功能
 */

/** 触发类型枚举 */
declare const enum TriggerType {
  /** 拖拽放置后自动触发 */
  AUTO_AFTER_DRAG = 0,
  /** 从工具栏菜单手动触发 */
  MANUAL_FROM_TOOLBAR = 1,
  /** 从推荐弹窗触发 */
  FROM_RECOMMEND_POPUP = 2,
}

/** 本地存储键名 */
declare const CLOSE_AUTO_RECOMMEND_COUNT_KEY = "close-auto-recommend-count";
declare const ENABLE_DYNAMIC_AUTO_RECOMMEND_KEY = "enable-dynamic-auto-recommend";

/** 内容数据快照 */
interface ContentSnapshot {
  /** 内容ID */
  id: string;
  /** 元数据 */
  metadata: unknown;
  /** 位置坐标 [x, y, z] */
  position: [number, number, number];
  /** 旋转角度 [xRot, yRot, zRot] */
  rotation: [number, number, number];
  /** 缩放比例 [xScale, yScale, zScale] */
  scale: [number, number, number];
  /** 宿主对象 */
  host: unknown;
  /** 材质映射表 */
  materialMap: Map<unknown, unknown>;
  /** 是否为定制柜体产品 */
  isCustomizedCabinetProducts: boolean;
}

/** 推荐请求数据 */
interface RecommendRequestData {
  /** 房间ID */
  id: string;
  /** 房间类型 */
  type?: string;
  /** 设计风格 */
  style?: string;
  [key: string]: unknown;
}

/** 布局算法请求参数 */
interface LayoutAlgorithmRequest {
  /** 户型ID */
  house_id: string;
  /** 房间ID */
  room_id: string;
  /** 户型数据 */
  house_data: Record<string, unknown>;
  /** 房间数据 */
  room_data: RecommendRequestData;
  /** 布局方案数量 */
  layout_number: number;
  /** 每个布局的推荐数量 */
  propose_number: number;
  /** 样板户型 */
  sample_house: string;
  /** 样板房间 */
  sample_room: string;
  /** 数据索引 */
  data_idx: number;
  /** 数据URL */
  data_url: string;
  /** 场景URL */
  scene_url: string;
  /** 图片URL */
  image_url: string;
}

/** 布局算法响应 */
interface LayoutAlgorithmResponse {
  /** 布局数据 */
  layoutData?: {
    /** 布局方案映射表，key为房间ID */
    layout_scheme: Record<string, ContentSnapshot[][]>;
  };
}

/** 设计风格对话框配置 */
interface DesignStyleDialogConfig {
  /** 确认点击回调 */
  confirmClick: (style: string) => void;
  /** 取消点击回调 */
  cancelClick: () => void;
}

/** 插件初始化参数 */
interface AutoRecommendPluginInitParams {
  /** 应用实例 */
  app: unknown;
  /** 依赖插件映射 */
  dependencies: Record<string, unknown>;
}

/**
 * 自动推荐插件类
 * 负责智能家居空间的自动搭配推荐功能
 */
declare class AutoRecommendPlugin {
  /** 应用实例 */
  private _app: unknown;
  
  /** 加载反馈插件 */
  private _loadingFeedbackPlugin: unknown;
  
  /** 目标空间（房间） */
  private _targetSpace?: unknown;
  
  /** 选中的内容 */
  private _selectedContent?: unknown;
  
  /** 信号钩子 */
  private _signalHook: unknown;
  
  /** 命令管理器 */
  private _cmdMgr: unknown;
  
  /** 当前方案索引 */
  private _currentIndex: number;
  
  /** 设计风格 */
  private _designStyle: string;
  
  /** 推荐请求数据 */
  private _autoRecommendRequestData?: RecommendRequestData;
  
  /** 启动触发类型 */
  private _startTriggerType: TriggerType;
  
  /** 是否隐藏推荐入口 */
  private _hideRecommendEntry: boolean;
  
  /** 推荐模型日志信号 */
  signalRecommendModelToLog: unknown;
  
  /** 本地存储实例 */
  private autoRecommendLocalStorage: unknown;
  
  /** 原始内容列表 */
  private originalContents: unknown[];
  
  /** 原始内容数据快照 */
  private originalContentsData: ContentSnapshot[];

  /**
   * 初始化插件
   * @param params 初始化参数
   */
  init(params: AutoRecommendPluginInitParams): void;

  /**
   * 销毁插件，清理资源
   */
  dispose(): void;

  /**
   * 注入默认工具栏按钮
   */
  injectDefaultToolbar(): void;

  /**
   * 从工具栏启动推荐流程
   * @param space 目标空间（房间）
   */
  startRecommendFromToolbar(space: unknown): void;

  /**
   * 从推荐弹窗启动推荐流程
   * @param space 目标空间
   * @param content 选中的内容
   */
  startRecommendFromRecommendPopup(space: unknown, content: unknown): void;

  /**
   * 显示推荐提示
   * @param space 目标空间
   * @param content 选中的内容
   */
  showLiveHint(space: unknown, content: unknown): void;

  /**
   * 拖拽物品结束事件处理
   * @param event 命令事件
   */
  onDragItemEnd(event: unknown): void;

  /**
   * 显示关闭动态推荐的提示
   */
  showLiveHintForCloseDynamicAutoRecommend(): void;

  /**
   * 获取模型的材质映射表
   * @param content 内容对象
   * @returns 材质映射表
   */
  getMaterialMap(content: unknown): Map<unknown, unknown>;

  /**
   * 放置推荐的产品
   * @param schemes 推荐方案数组
   */
  placeRecommendProduct(schemes: ContentSnapshot[][]): void;

  /**
   * 执行添加推荐内容命令
   * @param recommendData 推荐数据
   * @param originalContents 原始内容列表
   * @param space 目标空间
   * @param isRestore 是否为还原操作
   */
  private _executeAddRecommendContentsCmd(
    recommendData: ContentSnapshot[],
    originalContents: unknown[],
    space: unknown,
    isRestore: boolean
  ): void;

  /**
   * 应用自动推荐的事件追踪
   * @param schemeIndex 方案索引
   */
  private _eventTrackOfApplyAutoRecommend(schemeIndex: number): void;

  /**
   * 显示设计风格选择对话框
   */
  showDesignStyleDialog(): void;

  /**
   * 显示加载动画
   */
  showLoading(): void;

  /**
   * 隐藏加载动画
   */
  hideLoading(): void;

  /**
   * 显示"换一套"方案的提示
   * @param schemes 所有推荐方案
   */
  showTryOtherSchemeLiveHint(schemes: ContentSnapshot[][]): void;

  /**
   * 激活工具栏助手按钮
   */
  activeToolbarAssistant(): void;

  /**
   * 启动推荐处理流程
   */
  startRecommendProcess(): void;
}

export default AutoRecommendPlugin;