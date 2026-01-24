/**
 * Property Bar Level Node - 属性栏层级节点
 * 用于构建属性栏的层级结构，支持嵌套和动态操作
 */

/**
 * 属性栏节点配置项
 */
export interface PropertyBarLevelNodeConfig {
  /** 节点唯一标识符 */
  id: string;
  /** 节点显示标签 */
  label: string;
  /** 是否禁用节点 */
  disabled?: boolean;
  /** 排序顺序，数字越小越靠前 */
  order?: number;
  /** 自定义CSS类名 */
  className?: string;
  /** 是否禁用显示 */
  disableShow?: boolean;
  /** 子项列表 */
  items?: PropertyBarNodeConfig[];
}

/**
 * 属性栏节点配置（通用）
 */
export type PropertyBarNodeConfig = PropertyBarLevelNodeConfig | any;

/**
 * 属性栏节点接口
 */
export interface PropertyBarNode {
  /** 节点唯一标识符 */
  id: string;
  /** 节点显示标签 */
  label: string;
  /** 是否为属性栏层级节点 */
  isPropertyBarLevelNode?: boolean;
  /** 排序顺序 */
  order?: number;
  /** 自定义CSS类名 */
  className?: string;
  /** 是否禁用显示 */
  disableShow?: boolean;
}

/**
 * 属性栏层级节点类
 * 用于管理属性栏的层级结构，支持增删改查等操作
 */
export default class PropertyBarLevelNode implements PropertyBarNode {
  /** 子项列表 */
  items: PropertyBarNode[];
  
  /** 是否禁用 */
  disable: boolean;
  
  /** 节点类型 */
  type?: string;
  
  /** 排序顺序 */
  order?: number;
  
  /** 自定义CSS类名 */
  className?: string;
  
  /** 标识为属性栏层级节点 */
  readonly isPropertyBarLevelNode: true;
  
  /** 是否禁用显示 */
  disableShow: boolean;
  
  /** 内部标签存储 */
  private _label: string;
  
  /** 内部ID存储 */
  private _id: string;

  /**
   * 构造函数
   * @param config - 节点配置项
   */
  constructor(config: PropertyBarLevelNodeConfig);

  /**
   * 获取节点标签
   */
  get label(): string;

  /**
   * 设置节点标签
   * @param value - 新标签值（仅当非空时设置）
   */
  set label(value: string);

  /**
   * 获取节点ID
   */
  get id(): string;

  /**
   * 设置节点ID
   * @param value - 新ID值（仅当非空时设置）
   */
  set id(value: string);

  /**
   * 创建子项列表
   * @param items - 子项配置数组
   * @returns 创建的子项节点数组，按order排序
   */
  createItems(items?: PropertyBarNodeConfig[]): PropertyBarNode[];

  /**
   * 插入节点
   * 支持单个或批量插入，如果节点已存在则进行合并
   * @param node - 要插入的节点或节点数组
   * @param targetId - 目标父节点ID，未指定则插入到当前节点
   */
  insert(node: PropertyBarNodeConfig | PropertyBarNodeConfig[], targetId?: string): void;

  /**
   * 根据ID查找节点
   * 递归搜索当前节点及其所有子节点
   * @param id - 要查找的节点ID
   * @returns 找到的节点，未找到返回undefined
   */
  getItemById(id: string): PropertyBarNode | undefined;

  /**
   * 合并节点
   * 将源节点的属性和子项合并到目标节点
   * @param target - 目标节点
   * @param source - 源节点
   */
  combine(target: PropertyBarNode, source: PropertyBarNodeConfig): void;
}

/**
 * 默认导出的工厂函数
 * @returns PropertyBarLevelNode类
 */
export { PropertyBarLevelNode };