import Vue, { VNode, VueConstructor } from 'vue';
import VSheet from '../VSheet/VSheet';

/**
 * VList 组件的 props 接口定义
 * 用于定义列表组件的外观和行为特性
 */
export interface VListProps {
  /**
   * 启用紧凑模式,减少列表项的内边距
   * @default false
   */
  dense?: boolean;

  /**
   * 禁用列表组件,阻止所有交互
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否展开列表组,当为 false 时只允许一个组展开
   * @default false
   */
  expand?: boolean;

  /**
   * 移除列表的背景阴影效果
   * @default false
   */
  flat?: boolean;

  /**
   * 启用导航栏样式,优化为导航场景
   * @default false
   */
  nav?: boolean;

  /**
   * 启用圆角样式
   * @default false
   */
  rounded?: boolean;

  /**
   * 启用子标题样式,为第一个项添加额外的顶部内边距
   * @default false
   */
  subheader?: boolean;

  /**
   * 启用三行模式,适配三行内容的列表项
   * @default false
   */
  threeLine?: boolean;

  /**
   * 启用两行模式,适配两行内容的列表项
   * @default false
   */
  twoLine?: boolean;
}

/**
 * 列表组件的注入上下文接口
 */
export interface VListInjection {
  /**
   * 标识当前组件是否在菜单内
   * @default false
   */
  isInMenu: boolean;

  /**
   * 标识当前组件是否在导航栏内
   * @default false
   */
  isInNav: boolean;
}

/**
 * 列表组件提供给子组件的上下文
 */
export interface VListProvide {
  /**
   * 标识子组件是否在列表内
   */
  isInList: boolean;

  /**
   * 对 VList 实例的引用
   */
  list: VList;
}

/**
 * 列表组的接口定义
 * 用于管理可折叠的列表组
 */
export interface VListGroup extends Vue {
  /**
   * Vue 实例的唯一标识符
   */
  _uid: number;

  /**
   * 切换列表组的展开/折叠状态
   * @param uid - 列表组的唯一标识符
   */
  toggle(uid: number): void;
}

/**
 * VList 组件的 data 接口定义
 */
export interface VListData {
  /**
   * 已注册的列表组集合
   */
  groups: VListGroup[];
}

/**
 * VList 组件的计算属性接口
 */
export interface VListComputed {
  /**
   * 合并的 CSS 类名对象
   * 包含基础类和所有修饰符类
   */
  classes: Record<string, boolean>;
}

/**
 * VList 组件的方法接口
 */
export interface VListMethods {
  /**
   * 注册列表组到管理器
   * @param group - 要注册的列表组实例
   */
  register(group: VListGroup): void;

  /**
   * 从管理器中注销列表组
   * @param group - 要注销的列表组实例
   */
  unregister(group: VListGroup): void;

  /**
   * 处理列表点击事件
   * 当 expand 为 false 时,关闭其他已展开的组
   * @param clickedGroupUid - 被点击的列表组的唯一标识符
   */
  listClick(clickedGroupUid: number): void;

  /**
   * 渲染函数
   * @param createElement - Vue 的 createElement 函数
   * @returns 虚拟节点
   */
  render(createElement: typeof Vue.prototype.$createElement): VNode;
}

/**
 * VList 组件类型定义
 * 
 * 一个功能丰富的列表容器组件,扩展自 VSheet
 * 
 * @example
 *