/**
 * 属性栏第三级节点配置项接口
 */
export interface ThirdLevelNodeOptions {
  /** 节点状态 */
  status?: string | number;
  /** 右侧状态 */
  rightStatus?: string | number;
  /** 状态变化回调 */
  onStatusChange?: (status: string | number) => void;
  /** 右侧状态变化回调 */
  onRightStatusChange?: (status: string | number) => void;
  /** 重置项配置 */
  resetItem?: unknown;
  /** 是否禁用关闭按钮 */
  disableClose?: boolean;
  /** 图标名称 */
  icon?: string;
  /** 自定义图标组件 */
  customIcon?: React.ComponentType | React.ReactNode;
  /** 是否禁用状态点击 */
  disableStatusClick?: boolean;
}

/**
 * 属性栏第三级节点类
 * 继承自基础属性栏节点，用于表示属性栏中的第三级节点
 */
export default class ThirdLevelNode extends BasePropertyNode {
  /** 节点类型，固定为第三级节点 */
  readonly type: HSFPConstants.PropertyBarType.ThirdLevelNode;
  
  /** 当前节点状态 */
  status?: string | number;
  
  /** 右侧状态显示 */
  rightStatus?: string | number;
  
  /** 重置配置项 */
  reset?: unknown;
  
  /** 状态改变时的回调函数 */
  onStatusChange?: (status: string | number) => void;
  
  /** 右侧状态改变时的回调函数 */
  onRightStatusChange?: (status: string | number) => void;
  
  /** 重置项的配置信息 */
  resetItem?: unknown;
  
  /** 是否禁用关闭功能 */
  disableClose?: boolean;
  
  /** 图标标识符 */
  icon?: string;
  
  /** 自定义图标元素 */
  customIcon?: React.ComponentType | React.ReactNode;
  
  /** 是否禁用状态点击交互 */
  disableStatusClick?: boolean;

  /**
   * 构造函数
   * @param options - 第三级节点配置选项
   */
  constructor(options: ThirdLevelNodeOptions);
}

/**
 * HSF属性栏常量命名空间
 */
declare namespace HSFPConstants {
  enum PropertyBarType {
    ThirdLevelNode = 'ThirdLevelNode'
  }
}

/**
 * 基础属性栏节点类（从依赖模块导入）
 */
declare class BasePropertyNode {
  constructor(options: unknown);
}