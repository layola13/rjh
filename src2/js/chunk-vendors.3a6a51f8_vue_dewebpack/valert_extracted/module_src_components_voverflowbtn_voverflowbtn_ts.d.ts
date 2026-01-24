import type { VNodeData } from 'vue';
import type VAutocomplete from '../VAutocomplete';
import type VSelect from '../VSelect/VSelect';
import type VTextField from '../VTextField/VTextField';
import type VBtn from '../VBtn';

/**
 * VOverflowBtn 组件的属性接口
 * 继承自 VAutocomplete 组件
 */
export interface VOverflowBtnProps {
  /**
   * 是否可编辑模式
   * 当为 true 时，允许用户直接输入文本
   */
  editable?: boolean;

  /**
   * 是否使用分段按钮样式
   * 当为 true 时，选项将以按钮形式分段显示
   */
  segmented?: boolean;
}

/**
 * 计算属性类型定义
 */
export interface VOverflowBtnComputed {
  /**
   * 组件的 CSS 类名对象
   * 包含基础类和根据 props 动态生成的类
   */
  classes: Record<string, boolean>;

  /**
   * 是否允许任意值
   * 在可编辑模式或父类允许时返回 true
   */
  isAnyValueAllowed: boolean;

  /**
   * 是否为单选模式
   * VOverflowBtn 始终为单选
   */
  isSingle: boolean;

  /**
   * 计算后的选项列表
   * 根据 segmented 属性返回全部或过滤后的选项
   */
  computedItems: unknown[];
}

/**
 * 选项项接口（用于分段按钮）
 */
export interface SegmentedItem {
  /**
   * 选项的显示文本
   */
  text?: string;

  /**
   * 选项的值
   */
  value?: unknown;

  /**
   * 点击选项时的回调函数
   */
  callback?: (event: MouseEvent) => void;
}

/**
 * 方法类型定义
 */
export interface VOverflowBtnMethods {
  /**
   * 生成选中项的渲染节点
   * 根据 editable 属性决定使用 VAutocomplete 或 VSelect 的实现
   */
  genSelections(): unknown;

  /**
   * 生成逗号分隔的选中项
   * @param item - 选项数据
   * @param index - 选项索引
   * @param last - 是否为最后一项
   * @returns VNode 或 null
   */
  genCommaSelection(item: unknown, index: number, last: boolean): unknown;

  /**
   * 生成输入框元素
   * 覆盖父类方法，设置 readonly 和 value 属性
   * @returns 包含 VNodeData 的输入框对象
   */
  genInput(): { data?: VNodeData };

  /**
   * 生成标签元素
   * 在可编辑且聚焦时隐藏标签
   * @returns VNode 或 null
   */
  genLabel(): unknown | null;

  /**
   * 生成分段按钮
   * @param item - 选项数据
   * @returns VBtn 组件实例或 null
   */
  genSegmentedBtn(item: SegmentedItem): unknown | null;

  /**
   * 更新组件值
   * @param isFocused - 是否聚焦状态
   */
  updateValue(isFocused: boolean): void;
}

/**
 * VOverflowBtn 组件类型定义
 * 继承自 VAutocomplete，提供下拉溢出按钮功能
 * 
 * @example
 *