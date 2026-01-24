/**
 * VDataTableHeaderMobile 组件
 * 用于移动端数据表格的表头组件，提供排序和选择功能
 */

import { VNode } from 'vue';
import { PropType } from 'vue';

/**
 * 表头列配置项接口
 */
interface DataTableHeader {
  /** 列显示文本 */
  text: string;
  /** 列值/标识符 */
  value: string;
  /** 是否可排序 */
  sortable?: boolean;
  /** 列宽度 */
  width?: string | number;
  /** 自定义类名 */
  class?: string | string[];
}

/**
 * 排序选项接口
 */
interface SortOptions {
  /** 排序字段数组 */
  sortBy: string[];
  /** 排序方向数组（true为降序，false为升序） */
  sortDesc: boolean[];
  /** 是否支持多列排序 */
  multiSort: boolean;
}

/**
 * VSelect 选项项接口
 */
interface SelectItem {
  /** 选项显示文本 */
  text: string;
  /** 选项值 */
  value: string;
}

/**
 * 作用域插槽参数接口
 */
interface ScopedSlotSelection {
  /** 选中的项 */
  item: SelectItem;
}

/**
 * VDataTableHeaderMobile 组件声明
 * 继承自 header mixin，提供移动端数据表格表头功能
 */
declare const VDataTableHeaderMobile: {
  /** 组件名称 */
  name: 'v-data-table-header-mobile';

  /** 组件属性 */
  props: {
    /** 排序提示文本的国际化键 */
    sortByText: {
      type: PropType<string>;
      default: '$vuetify.dataTable.sortBy';
    };
    /** 表头列配置数组（继承自 mixin） */
    headers: PropType<DataTableHeader[]>;
    /** 排序选项（继承自 mixin） */
    options: PropType<SortOptions>;
    /** 是否禁用排序（继承自 mixin） */
    disableSort: PropType<boolean>;
    /** 是否单选模式（继承自 mixin） */
    singleSelect: PropType<boolean>;
  };

  /** 组件方法 */
  methods: {
    /**
     * 生成排序芯片组件
     * @param selection - 包含选中项的对象
     * @returns VNode - 渲染的排序芯片虚拟节点
     */
    genSortChip(selection: ScopedSlotSelection): VNode;

    /**
     * 生成排序下拉选择器组件
     * @param items - 可排序的列选项数组
     * @returns VNode - 渲染的 VSelect 虚拟节点
     */
    genSortSelect(items: SelectItem[]): VNode;

    /**
     * 生成排序图标（继承自 mixin）
     * @returns VNode - 排序图标虚拟节点
     */
    genSortIcon(): VNode;

    /**
     * 生成全选控件（继承自 mixin）
     * @returns VNode - 全选控件虚拟节点
     */
    genSelectAll(): VNode;
  };

  /**
   * 渲染函数
   * @param createElement - Vue 的 createElement 函数
   * @returns VNode - 渲染的表头虚拟节点
   */
  render(createElement: typeof Vue.prototype.$createElement): VNode;
};

export default VDataTableHeaderMobile;