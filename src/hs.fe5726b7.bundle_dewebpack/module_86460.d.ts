/**
 * 文档隐私设置下拉选择器
 * 提供公开/私有等隐私级别选项的交互界面
 */

/**
 * 下拉选项配置
 */
interface DropdownOption {
  /** 选项唯一标识 */
  id: string;
  /** 显示文本 */
  label: string;
  /** 图标路径 */
  icon: string;
  /** 对应的文档状态枚举值 */
  documentStatus: number;
}

/**
 * 状态改变回调函数
 * @param status - 新选中的文档状态
 */
type OnChangeCallback = (status: number) => void;

/**
 * 设置下拉选择器类
 * 管理文档隐私级别的下拉菜单交互
 */
declare class SettingDropdown {
  /** jQuery容器元素 */
  container: JQuery;
  
  /** 状态改变时的回调函数 */
  onChangeCallback: OnChangeCallback | null;
  
  /** 下拉选项列表 */
  options: DropdownOption[] | null;
  
  /** 隐私设置鼠标事件处理器（用于点击外部关闭下拉） */
  private privacyMouseUpHandler?: ((event: MouseEvent) => void) | null;

  /**
   * 构造函数
   * @param container - jQuery容器元素
   * @param onChangeCallback - 选项改变时的回调函数
   */
  constructor(container: JQuery, onChangeCallback?: OnChangeCallback);

  /**
   * 工厂方法：创建并初始化下拉选择器实例
   * @param container - jQuery容器元素
   * @param defaultStatus - 默认选中的文档状态
   * @param options - 自定义选项列表（可选）
   * @param onChangeCallback - 状态改变回调
   * @returns 初始化完成的实例
   */
  static create(
    container: JQuery,
    defaultStatus: number,
    options?: DropdownOption[],
    onChangeCallback?: OnChangeCallback
  ): SettingDropdown;

  /**
   * 从合作伙伴配置获取选项
   * @returns 合作伙伴定义的选项列表，当前总是返回null
   */
  static getOptionsFromPartner(): DropdownOption[] | null;

  /**
   * 设置下拉选项列表
   * 如果未提供选项，将使用默认的公开/私有选项
   * @param options - 选项配置数组
   */
  setOptions(options?: DropdownOption[]): void;

  /**
   * 构建下拉菜单的HTML结构
   * 创建当前选项显示区域和下拉选项列表
   */
  buildHtml(): void;

  /**
   * 根据文档状态获取对应的选项
   * @param status - 文档状态枚举值
   * @returns 匹配的选项对象，未找到返回null
   */
  getOptionByStatus(status: number): DropdownOption | null;

  /**
   * 根据选项ID获取选项对象
   * @param key - 选项的id字段值
   * @returns 匹配的选项对象，未找到返回null
   */
  getOptionByKey(key: string): DropdownOption | null;

  /**
   * 设置并显示默认选中的状态
   * @param status - 要选中的文档状态
   */
  setDefaultStatus(status: number): void;

  /**
   * 绑定所有交互事件
   * 包括点击展开/收起、选项选择、hover效果等
   */
  bindEvents(): void;

  /**
   * 隐藏下拉选项列表
   */
  hideDropdown(): void;

  /**
   * 显示下拉选项列表
   */
  showDropdown(): void;

  /**
   * 添加全局鼠标点击监听器
   * 用于检测点击外部区域时关闭下拉菜单
   */
  addPrivacyMouseUpHandler(): void;

  /**
   * 移除全局鼠标点击监听器
   */
  removePrivacyMouseUpHandler(): void;

  /**
   * 容器显示时的回调
   * 重新添加外部点击监听
   */
  onContainerShow(): void;

  /**
   * 容器隐藏时的回调
   * 清理外部点击监听
   */
  onContainerHide(): void;

  /**
   * 组件移除时的清理回调
   * 确保事件监听器被正确移除
   */
  onRemoved(): void;
}

/**
 * 全局Window接口扩展
 */
declare global {
  interface Window {
    /** 设置下拉选择器构造函数 */
    SettingDropdown: typeof SettingDropdown;
  }
}

export {};