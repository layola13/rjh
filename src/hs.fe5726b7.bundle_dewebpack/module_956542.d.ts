/**
 * 下拉选择组件模块
 * 提供React下拉菜单组件及其控制器类
 */

/**
 * 下拉选项配置项
 */
interface DropdownOption {
  /** 选项唯一标识 */
  id: string | number;
  /** 选项显示文本 */
  label: string;
}

/**
 * 下拉组件数据配置
 */
interface DropdownData {
  /** 默认选中的选项键值 */
  defaultKey?: string | number;
  /** 下拉选项列表 */
  options: DropdownOption[];
  /** 选项变更回调函数 */
  onchange: (id: string | number) => void;
}

/**
 * 下拉组件属性
 */
interface DropdownComponentProps {
  /** 下拉菜单配置数据 */
  data: DropdownData;
}

/**
 * 下拉组件状态
 */
interface DropdownComponentState {
  /** 下拉菜单是否展开显示 */
  show: boolean;
}

/**
 * React下拉选择组件
 * 提供可展开/收起的下拉菜单功能，支持选项选择
 */
declare const DropdownComponent: React.ComponentClass<
  DropdownComponentProps,
  DropdownComponentState
>;

/**
 * 下拉选择控制器类
 * 用于创建和管理下拉组件实例的生命周期
 */
export default class DropdownController {
  /** 组件挂载的DOM容器元素 */
  private _containerElement: HTMLElement;
  
  /** 组件数据配置 */
  private _data: DropdownData;

  /**
   * 创建下拉选择控制器实例
   * @param data - 下拉菜单配置数据
   * @param container - 组件挂载的DOM容器
   */
  constructor(data: DropdownData, container: HTMLElement);

  /**
   * 静态工厂方法：创建控制器实例
   * @param data - 下拉菜单配置数据
   * @param container - 组件挂载的DOM容器
   * @returns 新的控制器实例
   */
  static create(data: DropdownData, container: HTMLElement): DropdownController;

  /**
   * 更新下拉菜单配置并重新渲染
   * @param data - 部分更新的配置数据（会与现有数据合并）
   */
  update(data: Partial<DropdownData>): void;

  /**
   * 销毁组件实例并卸载DOM
   */
  destroy(): void;

  /**
   * @deprecated 已废弃，请使用 destroy() 方法
   * 销毁组件实例（拼写错误的旧方法）
   */
  destory(): void;

  /**
   * 内部方法：渲染React组件到指定容器
   * @param data - 组件数据
   * @param container - 目标DOM容器
   * @private
   */
  private _render(data: DropdownData, container: HTMLElement): void;
}