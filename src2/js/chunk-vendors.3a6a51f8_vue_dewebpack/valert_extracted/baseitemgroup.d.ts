/**
 * VItemGroup - Vuetify组件，用于管理一组可选择的项目
 * 支持单选、多选模式，以及强制选择和最大选择数量限制
 */

import Vue, { VNode, VueConstructor } from 'vue';

/**
 * 项目接口 - 描述可被VItemGroup管理的项目
 */
export interface VItem extends Vue {
  /** 项目的值，用于标识和选择 */
  value?: any;
  /** 项目是否处于激活状态 */
  isActive: boolean;
  /** 项目是否被禁用 */
  disabled?: boolean;
  /** change事件监听器 */
  $on(event: 'change', callback: () => void): this;
}

/**
 * BaseItemGroup Props
 */
export interface BaseItemGroupProps {
  /** 激活状态的CSS类名 */
  activeClass: string;
  /** 是否强制至少选择一项 */
  mandatory: boolean;
  /** 最大可选择数量（仅在multiple模式下有效） */
  max: number | string | null;
  /** 是否允许多选 */
  multiple: boolean;
  /** v-model绑定值 */
  value?: any;
}

/**
 * BaseItemGroup Data
 */
export interface BaseItemGroupData {
  /** 内部懒加载值，同步v-model */
  internalLazyValue: any;
  /** 已注册的项目列表 */
  items: VItem[];
}

/**
 * BaseItemGroup Computed
 */
export interface BaseItemGroupComputed {
  /** 组件CSS类对象 */
  classes: Record<string, boolean>;
  /** 选中项的索引（单选模式） */
  selectedIndex: number;
  /** 选中的单个项目（单选模式） */
  selectedItem: VItem | undefined;
  /** 选中的所有项目（多选模式） */
  selectedItems: VItem[];
  /** 选中的值数组 */
  selectedValues: any[];
  /** 切换方法，用于判断项目是否被选中 */
  toggleMethod: (value: any) => boolean;
  /** 内部值（来自proxyable mixin） */
  internalValue: any;
}

/**
 * BaseItemGroup Methods
 */
export interface BaseItemGroupMethods {
  /**
   * 生成渲染数据
   * @returns VNode数据对象
   */
  genData(): { class: Record<string, boolean> };

  /**
   * 获取项目的值
   * @param item - 项目实例
   * @param index - 项目索引
   * @returns 项目的值或索引
   */
  getValue(item: VItem, index: number): any;

  /**
   * 处理项目点击事件
   * @param item - 被点击的项目
   */
  onClick(item: VItem): void;

  /**
   * 注册新项目到组件
   * @param item - 要注册的项目实例
   */
  register(item: VItem): void;

  /**
   * 从组件中注销项目
   * @param item - 要注销的项目实例
   */
  unregister(item: VItem): void;

  /**
   * 更新单个项目的状态
   * @param item - 项目实例
   * @param index - 项目索引
   */
  updateItem(item: VItem, index: number): void;

  /**
   * 更新所有项目的状态
   */
  updateItemsState(): void;

  /**
   * 更新内部值
   * @param value - 新的值
   */
  updateInternalValue(value: any): void;

  /**
   * 更新强制选择状态
   * @param reverse - 是否反向查找可用项
   */
  updateMandatory(reverse?: boolean): void;

  /**
   * 更新多选模式的值
   * @param value - 要切换的值
   */
  updateMultiple(value: any): void;

  /**
   * 更新单选模式的值
   * @param value - 要设置的值
   */
  updateSingle(value: any): void;
}

/**
 * BaseItemGroup组件类型定义
 */
export type BaseItemGroup = VueConstructor<
  Vue & BaseItemGroupProps & BaseItemGroupData & BaseItemGroupComputed & BaseItemGroupMethods
>;

/**
 * BaseItemGroup组件实例
 */
export const BaseItemGroup: BaseItemGroup;

/**
 * VItemGroup Props - 扩展自BaseItemGroup
 */
export interface VItemGroupProps extends BaseItemGroupProps {}

/**
 * VItemGroup Provide
 */
export interface VItemGroupProvide {
  /** 提供给子组件的itemGroup实例 */
  itemGroup: VItemGroup;
}

/**
 * VItemGroup组件实例类型
 */
export interface VItemGroup extends Vue, BaseItemGroupProps, BaseItemGroupData, BaseItemGroupComputed, BaseItemGroupMethods {
  /** provide数据 */
  provide(): VItemGroupProvide;
}

/**
 * VItemGroup组件构造函数
 * 默认导出，用于在组件中使用
 */
declare const VItemGroup: VueConstructor<VItemGroup>;

export default VItemGroup;