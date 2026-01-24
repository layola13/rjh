import VIcon from '../../VIcon';
import VSimpleCheckbox from '../../VCheckbox/VSimpleCheckbox';
import Ripple from '../../../directives/ripple';
import { VNode, CreateElement } from 'vue';
import { PropType } from 'vue';

/**
 * 数据表格选项配置接口
 */
export interface DataTableOptions {
  /** 当前页码 */
  page: number;
  /** 每页显示的项目数 */
  itemsPerPage: number;
  /** 排序字段数组 */
  sortBy: string[];
  /** 排序方向数组（降序标识） */
  sortDesc: boolean[];
  /** 分组字段数组 */
  groupBy: string[];
  /** 分组排序方向数组 */
  groupDesc: boolean[];
  /** 是否启用多列排序 */
  multiSort: boolean;
  /** 是否必须排序 */
  mustSort: boolean;
}

/**
 * 数据表格表头列定义接口
 */
export interface DataTableHeader {
  /** 列文本 */
  text: string;
  /** 列值字段名 */
  value: string;
  /** 列对齐方式 */
  align?: 'start' | 'center' | 'end';
  /** 是否可排序 */
  sortable?: boolean;
  /** 是否可过滤 */
  filterable?: boolean;
  /** 是否可分组 */
  groupable?: boolean;
  /** 列宽度 */
  width?: string | number;
  /** 是否可分割 */
  divider?: boolean;
  /** 列CSS类名 */
  class?: string | string[];
  /** 单元格CSS类名 */
  cellClass?: string | string[];
  /** 过滤函数 */
  filter?: (value: unknown, search: string, item: unknown) => boolean;
  /** 排序函数 */
  sort?: (a: unknown, b: unknown) => number;
}

/**
 * 选择框作用域插槽参数接口
 */
export interface DataTableSelectSlotProps {
  /** 选择框属性 */
  props: {
    /** 是否全选 */
    value: boolean;
    /** 是否半选状态 */
    indeterminate: boolean;
  };
  /** 事件监听器 */
  on: {
    /** 输入事件处理函数 */
    input: (value: boolean) => void;
  };
}

/**
 * 数据表格表头混合类型声明
 * 提供表头渲染、排序和全选功能
 */
declare const VDataTableHeaderMixin: {
  /** 指令注册 */
  directives: {
    ripple: typeof Ripple;
  };

  /** 组件属性定义 */
  props: {
    /** 表头列配置数组 */
    headers: {
      type: PropType<DataTableHeader[]>;
      default: () => DataTableHeader[];
    };
    /** 数据表格选项配置 */
    options: {
      type: PropType<DataTableOptions>;
      default: () => DataTableOptions;
    };
    /** 排序图标名称 */
    sortIcon: {
      type: PropType<string>;
      default: string;
    };
    /** 是否所有项都已选中 */
    everyItem: PropType<boolean>;
    /** 是否部分项已选中 */
    someItems: PropType<boolean>;
    /** 是否显示分组功能 */
    showGroupBy: PropType<boolean>;
    /** 是否单选模式 */
    singleSelect: PropType<boolean>;
    /** 是否禁用排序 */
    disableSort: PropType<boolean>;
  };

  /** 组件方法定义 */
  methods: {
    /**
     * 生成全选复选框虚拟节点
     * @returns 复选框虚拟节点
     */
    genSelectAll(): VNode;

    /**
     * 生成排序图标虚拟节点
     * @returns 排序图标虚拟节点
     */
    genSortIcon(): VNode;
  };
};

export default VDataTableHeaderMixin;