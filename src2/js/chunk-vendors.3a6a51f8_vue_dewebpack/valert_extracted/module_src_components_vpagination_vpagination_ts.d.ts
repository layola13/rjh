import { VNode, CreateElement } from 'vue';
import { VueConstructor } from 'vue/types/vue';

/**
 * VPagination 组件的属性接口
 * 用于定义分页组件的所有可配置选项
 */
export interface VPaginationProps {
  /**
   * 是否显示圆形按钮样式
   * @default false
   */
  circle?: boolean;

  /**
   * 是否禁用整个分页组件
   * @default false
   */
  disabled?: boolean;

  /**
   * 总页数
   * @default 0
   * @validator 必须为整数
   */
  length?: number;

  /**
   * 下一页图标名称
   * @default "$next"
   */
  nextIcon?: string;

  /**
   * 上一页图标名称
   * @default "$prev"
   */
  prevIcon?: string;

  /**
   * 可见的总页码数量（包括省略号）
   * 为0时显示所有页码
   */
  totalVisible?: number | string;

  /**
   * 当前选中的页码（双向绑定）
   * @default 0
   */
  value?: number;

  /**
   * 页码按钮的 aria-label 国际化键
   * @default "$vuetify.pagination.ariaLabel.page"
   */
  pageAriaLabel?: string;

  /**
   * 当前页码按钮的 aria-label 国际化键
   * @default "$vuetify.pagination.ariaLabel.currentPage"
   */
  currentPageAriaLabel?: string;

  /**
   * 上一页按钮的 aria-label 国际化键
   * @default "$vuetify.pagination.ariaLabel.previous"
   */
  previousAriaLabel?: string;

  /**
   * 下一页按钮的 aria-label 国际化键
   * @default "$vuetify.pagination.ariaLabel.next"
   */
  nextAriaLabel?: string;

  /**
   * 分页导航容器的 aria-label 国际化键
   * @default "$vuetify.pagination.ariaLabel.wrapper"
   */
  wrapperAriaLabel?: string;
}

/**
 * VPagination 组件的数据接口
 */
export interface VPaginationData {
  /**
   * 根据容器宽度计算出的最大按钮数
   */
  maxButtons: number;

  /**
   * 当前选中的页码（内部状态）
   */
  selected: number | null;
}

/**
 * VPagination 组件的计算属性接口
 */
export interface VPaginationComputed {
  /**
   * 组件的 CSS 类对象
   * 包含基础类、主题类和状态类
   */
  classes: Record<string, boolean>;

  /**
   * 要显示的页码项数组
   * 包含数字页码和省略号（"..."）
   */
  items: Array<number | string>;
}

/**
 * VPagination 组件的方法接口
 */
export interface VPaginationMethods {
  /**
   * 初始化组件
   * 重置选中状态并计算尺寸
   */
  init(): void;

  /**
   * 响应式处理容器尺寸变化
   * 根据父容器宽度计算最大可显示按钮数
   */
  onResize(): void;

  /**
   * 跳转到下一页
   * @param event - 点击事件对象
   * @emits input - 发送新的页码值
   * @emits next - 触发下一页事件
   */
  next(event: Event): void;

  /**
   * 跳转到上一页
   * @param event - 点击事件对象
   * @emits input - 发送新的页码值
   * @emits previous - 触发上一页事件
   */
  previous(event: Event): void;

  /**
   * 生成指定范围的页码数组
   * @param start - 起始页码（小于1时自动设为1）
   * @param end - 结束页码
   * @returns 页码数组
   */
  range(start: number, end: number): number[];

  /**
   * 生成导航图标按钮节点
   * @param createElement - Vue 渲染函数
   * @param icon - 图标名称
   * @param isDisabled - 是否禁用
   * @param clickHandler - 点击处理函数
   * @param ariaLabel - 无障碍标签
   * @returns VNode 虚拟节点
   */
  genIcon(
    createElement: CreateElement,
    icon: string,
    isDisabled: boolean,
    clickHandler: (event: Event) => void,
    ariaLabel: string
  ): VNode;

  /**
   * 生成单个页码按钮节点
   * @param createElement - Vue 渲染函数
   * @param pageNumber - 页码数字
   * @returns VNode 虚拟节点
   */
  genItem(createElement: CreateElement, pageNumber: number): VNode;

  /**
   * 生成所有页码项（包括省略号）
   * @param createElement - Vue 渲染函数
   * @returns VNode 数组
   */
  genItems(createElement: CreateElement): VNode[];

  /**
   * 生成分页列表容器节点
   * @param createElement - Vue 渲染函数
   * @param children - 子节点数组
   * @returns VNode 虚拟节点
   */
  genList(createElement: CreateElement, children: VNode[]): VNode;
}

/**
 * VPagination 组件完整类型定义
 * 
 * @description
 * Vuetify 分页组件，用于在多页内容之间导航。
 * 支持响应式布局、无障碍访问、RTL（从右到左）模式。
 * 
 * @example
 *