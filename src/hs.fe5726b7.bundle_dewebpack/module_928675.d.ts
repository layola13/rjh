/**
 * Checkbox状态枚举
 */
export enum CheckboxStatus {
  /** 已选中 */
  checked = "checked",
  /** 未选中 */
  unchecked = "unchecked",
  /** 不确定状态 */
  indeterminate = "indeterminate"
}

/**
 * ColorCheckbox配置参数
 */
export interface ColorCheckboxOptions {
  /** 复选框文本标签 */
  text?: string;
  /** 复选框状态 */
  status?: CheckboxStatus;
  /** 是否禁用 */
  disabled?: boolean;
  /** 工具提示文本 */
  tooltip?: string;
  /** 点击回调函数 */
  onclick?: (event: JQuery.ClickEvent) => void;
  /** 是否隐藏 */
  hidden?: boolean;
}

/**
 * jQuery ColorCheckbox Widget扩展
 */
export interface JQuery {
  /**
   * 初始化ColorCheckbox组件
   * @param options - 配置参数
   */
  ColorCheckbox(options: ColorCheckboxOptions): JQuery;
  
  /**
   * 销毁ColorCheckbox组件
   * @param method - 方法名
   */
  ColorCheckbox(method: "destroy"): void;
}

/**
 * ColorCheckbox组件类
 * 提供带颜色样式的复选框UI组件
 */
export default class ColorCheckbox {
  /** jQuery容器元素 */
  private container: JQuery;
  
  /** 配置参数 */
  private param: ColorCheckboxOptions;
  
  /** jQuery Widget实例 */
  private instance: JQuery;

  /**
   * 状态枚举（已冻结）
   */
  static readonly StatusEnum = CheckboxStatus;

  /**
   * 构造函数
   * @param element - 容器选择器或DOM元素
   * @param options - 配置参数
   */
  constructor(element: string | HTMLElement, options: ColorCheckboxOptions);

  /**
   * 静态工厂方法
   * @param element - 容器选择器或DOM元素
   * @param options - 配置参数
   * @returns ColorCheckbox实例
   */
  static create(element: string | HTMLElement, options: ColorCheckboxOptions): ColorCheckbox;

  /**
   * 更新组件配置
   * @param options - 新的配置参数（会与现有参数合并）
   */
  update(options: Partial<ColorCheckboxOptions>): void;

  /**
   * 销毁组件实例
   */
  destroy(): void;
}