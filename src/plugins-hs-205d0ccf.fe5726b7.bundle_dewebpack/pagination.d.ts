import React from 'react';

/**
 * Pagination组件的属性接口
 */
export interface PaginationProps {
  /** 数据总条数 */
  total: number;
  /** 当前偏移量（用于计算当前页码） */
  offset: number;
  /** 每页显示的条目数 */
  limit: number;
  /** 跳转到上一页的回调函数 */
  jumpToPrevPage: () => void;
  /** 跳转到下一页的回调函数 */
  jumpToNextPage: () => void;
  /** 跳转到指定页的回调函数 */
  jumpToPage: (pageNum: number) => void;
}

/**
 * Pagination组件的状态接口
 */
export interface PaginationState {
  /** 数据总条数 */
  total: number;
  /** 当前偏移量 */
  offset: number;
  /** 当前显示的页码项数组（包含数字页码和省略号标识 " ... "） */
  items: Array<number | string>;
}

/**
 * 图标组件的属性接口
 */
export interface IconfontViewProps {
  /** 自定义样式 */
  customStyle?: {
    /** 颜色 */
    color?: string;
    /** 字体大小 */
    fontSize?: string;
  };
  /** 图标类型 */
  showType: 'hs_xiao_danjiantou_zuo' | 'hs_xiao_danjiantou_you' | 'hs_mian_gengduo';
}

/**
 * 分页组件
 * 用于展示分页导航，支持页码跳转、上一页、下一页等功能
 */
export declare class Pagination extends React.Component<PaginationProps, PaginationState> {
  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: PaginationProps);

  /**
   * 组件挂载后的生命周期方法
   * 用于注入SVG图标资源
   */
  componentDidMount(): void;

  /**
   * 组件接收到新属性时的生命周期方法（已废弃的API）
   * @param nextProps - 新的属性对象
   */
  UNSAFE_componentWillReceiveProps(nextProps: PaginationProps): void;

  /**
   * 获取总页数
   * @returns 总页数（向上取整）
   */
  getTotalPageNum(): number;

  /**
   * 获取当前页码
   * @returns 当前页码（从1开始）
   */
  getCurrentPageNum(): number;

  /**
   * 分页逻辑处理
   * 根据总页数和当前页码计算需要显示的页码项
   * @param totalPages - 总页数
   * @param currentPage - 当前页码
   * @param allPages - 所有页码数组
   * @param maxVisiblePages - 最大可见页码数，默认5
   */
  paging(
    totalPages: number,
    currentPage: number,
    allPages: number[],
    maxVisiblePages?: number
  ): void;

  /**
   * 渲染方法
   * @returns React元素
   */
  render(): React.ReactElement;
}

/**
 * 图标视图组件
 */
export declare const IconfontView: React.FC<IconfontViewProps>;