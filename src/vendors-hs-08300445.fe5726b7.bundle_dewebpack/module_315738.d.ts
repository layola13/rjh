/**
 * 选项列表组件类型定义
 * 用于渲染下拉选择框的选项列表，支持虚拟滚动、键盘导航等功能
 */

import type { CSSProperties, ReactNode, MouseEvent, KeyboardEvent } from 'react';

/**
 * 选项数据结构
 */
export interface OptionData<ValueType = any> {
  /** 选项的唯一值 */
  value: ValueType;
  /** 选项显示的标签 */
  label?: ReactNode;
  /** 选项的子内容（当 childrenAsData 为 true 时使用） */
  children?: ReactNode;
  /** 是否禁用该选项 */
  disabled?: boolean;
  /** 选项的键值 */
  key?: string | number;
  /** 选项的标题（鼠标悬停时显示） */
  title?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 其他任意属性 */
  [key: string]: any;
}

/**
 * 扁平化的选项结构（包含分组信息）
 */
export interface FlattenOptionData<ValueType = any> {
  /** 选项的键值 */
  key: string | number;
  /** 选项数据 */
  data: OptionData<ValueType>;
  /** 是否为分组 */
  group?: boolean;
  /** 是否为分组内的选项 */
  groupOption?: boolean;
}

/**
 * 选择事件的额外信息
 */
export interface SelectInfo {
  /** 选项是否被选中 */
  selected: boolean;
}

/**
 * 激活值变化时的来源信息
 */
export interface ActiveValueSource {
  /** 触发来源：键盘或鼠标 */
  source: 'keyboard' | 'mouse';
}

/**
 * 选项列表组件的 Props
 */
export interface OptionListProps<ValueType = any> {
  /** 组件类名前缀 */
  prefixCls: string;
  /** 组件的唯一 ID */
  id: string;
  /** 扁平化后的选项数组 */
  flattenOptions: FlattenOptionData<ValueType>[];
  /** 是否将 children 作为数据使用 */
  childrenAsData?: boolean;
  /** 当前选中的值集合 */
  values: Set<ValueType>;
  /** 搜索关键词 */
  searchValue?: string;
  /** 是否支持多选 */
  multiple?: boolean;
  /** 是否默认激活第一个选项 */
  defaultActiveFirstOption?: boolean;
  /** 列表的高度 */
  height: number;
  /** 每个选项的高度 */
  itemHeight: number;
  /** 无数据时显示的内容 */
  notFoundContent?: ReactNode;
  /** 下拉框是否打开 */
  open: boolean;
  /** 选中项的图标 */
  menuItemSelectedIcon?: ReactNode | ((props: { isSelected: boolean }) => ReactNode);
  /** 是否启用虚拟滚动 */
  virtual?: boolean;
  
  /**
   * 选中选项时的回调
   * @param value - 选中的值
   * @param info - 选择信息
   */
  onSelect: (value: ValueType, info: SelectInfo) => void;
  
  /**
   * 切换下拉框展开/收起状态的回调
   * @param open - 是否展开
   */
  onToggleOpen: (open: boolean) => void;
  
  /**
   * 激活值变化时的回调
   * @param value - 激活的值（null 表示无激活项）
   * @param index - 激活项的索引（-1 表示无激活项）
   * @param source - 触发来源信息
   */
  onActiveValue: (value: ValueType | null, index: number, source: ActiveValueSource) => void;
  
  /**
   * 滚动事件回调
   * @param event - 滚动事件
   */
  onScroll?: (event: UIEvent) => void;
  
  /**
   * 鼠标进入事件回调
   * @param event - 鼠标事件
   */
  onMouseEnter?: (event: MouseEvent) => void;
}

/**
 * 选项列表组件暴露的方法
 */
export interface OptionListRef {
  /**
   * 处理键盘按下事件
   * @param event - 键盘事件
   */
  onKeyDown: (event: KeyboardEvent) => void;
  
  /**
   * 处理键盘松开事件
   */
  onKeyUp: () => void;
  
  /**
   * 滚动到指定索引的选项
   * @param index - 选项索引
   */
  scrollTo: (index: number) => void;
}

/**
 * 选项列表组件
 * 
 * 功能特性：
 * - 支持虚拟滚动以优化大数据量性能
 * - 支持键盘导航（上下箭头、回车、ESC）
 * - 支持分组显示
 * - 支持单选和多选模式
 * - 支持搜索高亮
 * - 支持自定义选中图标
 * - 自动滚动到选中项
 * 
 * @example
 *