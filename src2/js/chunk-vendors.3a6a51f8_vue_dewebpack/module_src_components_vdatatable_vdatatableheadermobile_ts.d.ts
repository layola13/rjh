/**
 * VDataTableHeaderMobile - 数据表格移动端头部组件
 * 提供移动端视图下的排序和选择功能
 */

import { VNode, CreateElement } from 'vue';
import { PropType } from 'vue';

/**
 * 排序方向枚举
 */
type SortDirection = boolean;

/**
 * 数据表格选项接口
 */
interface DataTableOptions {
  /** 排序字段数组 */
  sortBy: string[];
  /** 排序方向数组（true为降序，false为升序） */
  sortDesc: SortDirection[];
  /** 是否支持多列排序 */
  multiSort: boolean;
}

/**
 * 数据表格列头配置接口
 */
interface DataTableHeader {
  /** 列标题文本 */
  text: string;
  /** 列值标识 */
  value: string;
  /** 是否可排序（false表示禁用排序） */
  sortable?: boolean;
  /** 列宽度 */
  width?: string | number;
  /** 自定义样式类 */
  class?: string | string[] | Record<string, boolean>;
}

/**
 * VSelect选择项接口
 */
interface SelectItem {
  /** 显示文本 */
  text: string;
  /** 选项值 */
  value: string;
}

/**
 * VSelect作用域插槽参数接口
 */
interface SelectionSlotProps {
  /** 当前选中的项 */
  item: SelectItem;
  /** 选项索引 */
  index: number;
}

/**
 * VDataTableHeaderMobile组件属性接口
 */
interface VDataTableHeaderMobileProps {
  /** "排序依据"文本的国际化键名 */
  sortByText: string;
  /** 数据表格列头配置数组 */
  headers: DataTableHeader[];
  /** 当前排序选项 */
  options: DataTableOptions;
  /** 是否禁用排序功能 */
  disableSort: boolean;
  /** 是否单选模式 */
  singleSelect: boolean;
}

/**
 * VDataTableHeaderMobile组件方法接口
 */
interface VDataTableHeaderMobileMethods {
  /**
   * 生成排序芯片组件
   * @param props - VSelect选择项的作用域插槽参数
   * @returns 排序芯片VNode
   */
  genSortChip(props: SelectionSlotProps): VNode;

  /**
   * 生成排序选择器组件
   * @param items - 可排序的列配置数组
   * @returns 排序选择器VNode
   */
  genSortSelect(items: SelectItem[]): VNode;

  /**
   * 生成排序图标
   * @returns 排序图标VNode
   */
  genSortIcon(): VNode;

  /**
   * 生成全选复选框
   * @returns 全选复选框VNode
   */
  genSelectAll(): VNode;

  /**
   * 包装数组辅助函数
   * @param value - 需要包装的值
   * @returns 数组形式的值
   */
  wrapInArray<T>(value: T | T[]): T[];
}

/**
 * VDataTableHeaderMobile组件事件接口
 */
interface VDataTableHeaderMobileEvents {
  /**
   * 排序事件
   * @param sortBy - 排序字段值（单列排序）或字段数组（多列排序）
   */
  sort(sortBy: string | string[]): void;
}

/**
 * VDataTableHeaderMobile组件定义
 * 移动端数据表格头部，提供排序选择器和全选功能
 */
declare const VDataTableHeaderMobile: {
  name: 'v-data-table-header-mobile';
  
  props: {
    /**
     * "排序依据"文本的国际化键名
     * @default '$vuetify.dataTable.sortBy'
     */
    sortByText: {
      type: PropType<string>;
      default: string;
    };
  };

  methods: VDataTableHeaderMobileMethods;

  /**
   * 渲染函数
   * @param h - Vue的createElement函数
   * @returns 渲染的VNode
   */
  render(h: CreateElement): VNode;
};

export default VDataTableHeaderMobile;