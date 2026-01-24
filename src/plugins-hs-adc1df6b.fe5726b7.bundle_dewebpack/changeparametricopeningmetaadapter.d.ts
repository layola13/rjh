/**
 * 参数化开口元数据适配器
 * 用于处理参数化开口（如门窗）的属性变更和目录选择逻辑
 */

/**
 * 节点类型枚举
 */
type NodeType = 
  | "WIN_SUB_PART"    // 窗子部件
  | "CONTENT_PART"    // 内容部件
  | "PROFILE"         // 型材
  | "MATERIIAL";      // 材质（注：原代码拼写错误保留）

/**
 * 限制类型枚举
 */
type LimitType = "INTERVAL" | "OPTIONS";

/**
 * 场景类型
 */
type SceneType = string;

/**
 * 元数据节点信息
 */
interface MetaDataNode {
  /** 节点类型 */
  type: NodeType;
  /** 唯一标识值 */
  value: string;
  /** 限制类型 */
  limitType?: LimitType;
  /** 企业ID */
  eId?: string;
  /** 查找ID */
  seekId?: string;
}

/**
 * 子部件/依赖项元数据
 */
interface SubpartMetaData {
  /** 查找ID */
  seekId: string;
  /** 分类ID列表 */
  categories: string[];
}

/**
 * 元信息容器
 */
interface MetaInfo {
  /** 子部件元数据列表 */
  subpartMetaDates: SubpartMetaData[];
  /** 依赖项元数据列表 */
  dependentMetaDates: SubpartMetaData[];
  /** 子部件信息映射表 */
  subpartInfos: Map<string, any>;
}

/**
 * 产品元数据
 */
interface ProductMetadata {
  /** 是否来自企业库 */
  isFromEnterprise: boolean;
  /** 分类ID列表 */
  categories: string[];
  /** 阿里模型ID */
  aliModelId?: string;
}

/**
 * 参数化开口模型
 */
interface ParametricOpeningModel {
  /** 元信息 */
  metaInfo: MetaInfo;
  /** 元数据 */
  metadata: ProductMetadata;
}

/**
 * 目录查询参数
 */
interface CatalogQuery {
  /** 查找ID */
  seekId?: string;
  /** 分类ID */
  categoryId?: string;
}

/**
 * 材质数据特定配置
 */
interface MaterialDataConfig {
  /** 分类类型数组 */
  types: number[];
  /** 模型搜索过滤器 */
  modelSearchFilter: {
    sceneType: SceneType;
  };
}

/**
 * 目录配置选项
 */
interface CatalogOptions {
  /** 分类类型（用于型材） */
  types?: number;
  /** 客户分类面板ID列表 */
  customerCategories: string[];
  /** 查询参数 */
  query?: CatalogQuery;
  /** 自定义标签页数据 */
  customizedTabs?: any;
  /** 场景类型 */
  sceneType?: SceneType;
  /** 替换场景 */
  replaceScene?: string;
  /** 是否获取过滤后的分类 */
  isGetFilteredCategory?: boolean;
  /** 是否不过滤 */
  notFilter?: boolean;
  /** 分类ID列表 */
  categoryIds?: string[];
  /** 父模型ID */
  parentModelId?: string;
  /** 企业ID */
  eId?: string;
  /** 材质特定数据 */
  mydata?: MaterialDataConfig;
}

/**
 * 产品选择事件上下文
 */
interface ProductSelectionContext {
  /** 事务管理器 */
  transManager: TransactionManager;
}

/**
 * 产品选择数据
 */
interface ProductSelectionData {
  /** 产品数据 */
  data?: SubpartMetaData;
  /** 查找ID */
  seekId: string;
  /** 依赖关系 */
  depMates?: any;
}

/**
 * 变更请求数据
 */
interface ChangeRequestData {
  /** 目标节点 */
  node: MetaDataNode;
  /** 新值（seekId） */
  newValue: string;
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  /**
   * 创建请求
   * @param requestType 请求类型
   * @param params 参数数组
   */
  createRequest(requestType: string, params: any[]): TransactionRequest;
  
  /**
   * 提交事务
   * @param request 事务请求
   */
  commit(request: TransactionRequest): void;
}

/**
 * 事务请求接口
 */
interface TransactionRequest {
  /** 请求结果 */
  result: boolean;
  
  /**
   * 接收事件
   * @param eventType 事件类型
   * @param data 事件数据
   */
  receive(eventType: string, data: any): void;
}

/**
 * 产品选择处理器配置
 */
interface ProductSelectionHandlers {
  /**
   * 产品选择处理函数
   * @param product 选中的产品数据
   * @param context 选择上下文
   */
  productSelectedHandler(
    product: ProductSelectionData,
    context: ProductSelectionContext
  ): void;
}

/**
 * 适配器返回结果（带固定分类ID）
 */
type AdapterResultWithCategory = [
  CatalogOptions,
  ProductSelectionHandlers,
  string
];

/**
 * 适配器返回结果（不带固定分类ID）
 */
type AdapterResultWithoutCategory = [
  CatalogOptions,
  ProductSelectionHandlers
];

/**
 * 适配器返回类型
 */
type AdapterResult = 
  | AdapterResultWithCategory 
  | AdapterResultWithoutCategory;

/**
 * 变更参数化开口元数据适配器
 * 根据参数化开口模型和节点信息，生成目录选择配置和选择处理逻辑
 * 
 * @param params 参数数组，包含：
 *   - [0]: 参数化开口模型
 *   - [1]: 要变更的节点信息
 * @returns 返回元组：[目录配置选项, 产品选择处理器配置, (可选)固定分类ID]
 * 
 * @example
 *