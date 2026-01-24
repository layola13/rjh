/**
 * 顶线管理模块类型定义
 * 提供柜体顶线的创建、删除和参数配置功能
 */

/**
 * 请求对象接口
 * 封装了对柜体装配的操作请求
 */
interface Request {
  /** 请求类型 */
  type: string;
  /** 请求参数 */
  params: unknown[];
}

/**
 * 请求创建器接口
 * 用于创建和提交各类操作请求
 */
interface RequestCreator {
  /**
   * 创建请求对象
   * @param requestType - 请求类型（如添加/删除装配）
   * @param params - 请求参数数组
   * @returns 创建的请求对象
   */
  createRequest(requestType: string, params: unknown[]): Request;
  
  /**
   * 提交请求执行
   * @param request - 待执行的请求对象
   */
  commit(request: Request): void;
}

/**
 * 元数据接口
 * 描述材料、样式等产品元信息
 */
interface MetaData {
  /** 元数据唯一标识符 */
  id: string;
  /** Seek系统ID */
  seekId: string;
  /** 轮廓X方向尺寸（宽度） */
  profileSizeX?: number;
  /** 轮廓Y方向尺寸（高度） */
  profileSizeY?: number;
}

/**
 * 柜体样式接口
 * 包含柜体的标签和元数据获取方法
 */
interface CabinetStyle {
  /** 柜体标签/标识 */
  tag: string;
  
  /**
   * 根据ID获取元数据
   * @param id - 元数据ID
   * @returns 元数据对象，不存在时返回undefined
   */
  getMetaById(id: string): MetaData | undefined;
}

/**
 * 状态对象接口
 * 表示装配组件的状态属性
 */
interface State {
  /** 状态本地标识符 */
  localId: string;
  /** 状态值 */
  value: number | string;
}

/**
 * 子组件接口
 * 描述装配的子部件
 */
interface Child {
  /** 子组件本地标识符 */
  localId: string;
  /** 材料ID */
  material: string;
  /** 产品ID */
  productId: string;
}

/**
 * 用户架构/装配参数接口
 * 包含装配的完整参数配置
 */
interface UserSchema {
  /** 子组件列表 */
  children: Child[];
  /** 资源ID列表 */
  resources: string[];
  /** 状态列表 */
  states: State[];
  /** 材料ID */
  material: string;
  /** 宿主对象 */
  host?: unknown;
}

/**
 * 产品数据映射接口
 * 按ID索引的产品数据字典
 */
interface ProductDataById {
  [id: string]: MetaData;
}

/**
 * 顶线参数接口
 * 传递给顶线处理函数的参数对象
 */
interface TopLineParams {
  /** 用户架构配置 */
  userSchema?: UserSchema;
  /** 按ID索引的产品数据 */
  productDataById: ProductDataById;
}

/**
 * 顶线配置选项接口
 */
interface TopLineOptions {
  /** 宿主对象引用 */
  host: unknown;
}

/**
 * 处理柜体顶线的创建和配置
 * 
 * 功能说明：
 * 1. 删除现有顶线装配
 * 2. 获取顶线材料和样式元数据
 * 3. 计算顶线偏移量
 * 4. 创建新的顶线装配并填充参数
 * 5. 更新材料和样式资源引用
 * 
 * @param requestCreator - 请求创建器实例，用于创建和提交操作请求
 * @param topLineParams - 顶线参数对象，包含用户架构和产品数据
 * @param cabinetStyle - 柜体样式对象（可选），未提供时使用默认样式
 * @param context - 上下文对象，传递给顶线计算函数
 * @returns 返回创建的请求对象数组
 * 
 * @example
 *