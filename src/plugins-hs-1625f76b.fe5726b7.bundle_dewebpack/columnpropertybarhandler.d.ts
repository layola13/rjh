/**
 * 列属性栏处理器
 * 负责管理列元素的属性栏配置和交互逻辑
 */
export declare class ColumnPropertyBarHandler {
  /**
   * 应用程序实例
   */
  private readonly app: HSApp.App;

  /**
   * 目录插件实例
   */
  private readonly catalogPlugin: any;

  /**
   * 命令管理器实例
   */
  private readonly cmdMgr: any;

  /**
   * 构造函数
   * 初始化应用、插件和命令管理器的引用
   */
  constructor();

  /**
   * 获取列元素的属性栏配置项
   * @param element - 目标列元素对象
   * @returns 属性栏配置项数组，如果元素无效则返回空数组
   */
  getColumnItems(element: unknown): PropertyBarItem[];
}

/**
 * 属性栏配置项
 */
interface PropertyBarItem {
  /**
   * 配置项唯一标识符
   */
  id: string;

  /**
   * 父级配置项ID
   */
  parentId: string;

  /**
   * 显示标签文本
   */
  label: string;

  /**
   * 属性栏类型（三级节点）
   */
  type: string;

  /**
   * 子配置项列表
   */
  items: PropertyBarSubItem[];

  /**
   * 排序顺序
   */
  order: number;
}

/**
 * 属性栏子配置项
 */
interface PropertyBarSubItem {
  /**
   * 子项唯一标识符
   */
  id: string;

  /**
   * 父级配置项ID
   */
  parentId: string;

  /**
   * 控件类型（单选按钮）
   */
  type: string;

  /**
   * 排序顺序
   */
  order: number;

  /**
   * 控件配置数据
   */
  data: RadioButtonData;
}

/**
 * 单选按钮控件数据
 */
interface RadioButtonData {
  /**
   * 控件标签文本
   */
  label: string;

  /**
   * 默认选中值
   */
  defaultValue: string;

  /**
   * 可选值列表
   */
  values: string[];

  /**
   * 是否禁用
   */
  disabled: boolean;

  /**
   * 值变化回调函数
   * @param event - 自定义事件对象，包含新选中的值
   */
  onChange: (event: CustomEvent<{ value: string }>) => void;
}

/**
 * 自定义事件接口
 */
interface CustomEvent<T = any> {
  /**
   * 事件详细信息
   */
  detail: T;
}