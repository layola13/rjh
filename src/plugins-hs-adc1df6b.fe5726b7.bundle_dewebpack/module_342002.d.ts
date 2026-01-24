/**
 * 第二级节点属性栏组件
 * Module: module_342002
 * Original ID: 342002
 */

/**
 * 状态变更回调函数类型
 */
type StatusChangeCallback = (status: unknown) => void;

/**
 * 删除回调函数类型
 */
type DeleteCallback = () => void;

/**
 * 重置项回调函数类型
 */
type ResetItemCallback = () => void;

/**
 * 自定义标题内容类型
 */
type CustomizedTitleContent = React.ReactNode | string | (() => React.ReactNode);

/**
 * 第二级节点构造函数参数接口
 */
interface SecondLevelNodeOptions {
  /** 节点状态 */
  status: unknown;
  
  /** 状态变更时的回调函数 */
  onStatusChange: StatusChangeCallback;
  
  /** 删除节点时的回调函数 */
  onDelete: DeleteCallback;
  
  /** 重置节点时的回调函数 */
  resetItem: ResetItemCallback;
  
  /** 自定义标题内容 */
  customizedTitleContent?: CustomizedTitleContent;
}

/**
 * 第二级节点属性栏类
 * 继承自基础属性栏类，用于表示层级结构中的第二级节点
 */
declare class SecondLevelNode extends BasePropertyBar {
  /** 节点当前状态 */
  status: unknown;
  
  /** 状态变更回调函数 */
  onStatusChange: StatusChangeCallback;
  
  /** 删除回调函数 */
  onDelete: DeleteCallback;
  
  /** 重置项回调函数 */
  resetItem: ResetItemCallback;
  
  /** 自定义标题内容 */
  customizedTitleContent?: CustomizedTitleContent;
  
  /** 属性栏类型标识 */
  readonly type: typeof HSFPConstants.PropertyBarType.SecondLevelNode;
  
  /**
   * 构造函数
   * @param options - 第二级节点配置选项
   */
  constructor(options: SecondLevelNodeOptions);
}

/**
 * 基础属性栏类（从模块 104499 导入）
 */
declare class BasePropertyBar {
  constructor(options: unknown);
}

/**
 * HSFP 常量命名空间
 */
declare namespace HSFPConstants {
  enum PropertyBarType {
    SecondLevelNode = 'SecondLevelNode'
  }
}

export default SecondLevelNode;