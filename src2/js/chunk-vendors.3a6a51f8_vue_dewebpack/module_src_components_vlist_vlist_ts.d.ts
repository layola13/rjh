/**
 * VList 组件类型定义
 * 虚拟列表组件，支持密集、禁用、展开等多种模式
 */

import VSheet from '../VSheet/VSheet';

/**
 * 列表组提供的上下文接口
 */
export interface VListProvide {
  /** 指示当前是否在列表内部 */
  isInList: boolean;
  /** 列表组件实例引用 */
  list: VList;
}

/**
 * 列表组注入的上下文接口
 */
export interface VListInject {
  /** 指示当前是否在菜单内部 */
  isInMenu: boolean;
  /** 指示当前是否在导航内部 */
  isInNav: boolean;
}

/**
 * 列表组项接口（用于分组管理）
 */
export interface VListGroup {
  /** 组件唯一标识符 */
  _uid: number;
  /** 切换组展开/折叠状态 */
  toggle(eventTarget: EventTarget): void;
}

/**
 * VList 组件属性接口
 */
export interface VListProps {
  /** 密集模式，减少列表项间距 */
  dense?: boolean;
  /** 禁用整个列表 */
  disabled?: boolean;
  /** 允许展开/折叠子组 */
  expand?: boolean;
  /** 扁平样式，移除阴影效果 */
  flat?: boolean;
  /** 导航模式，调整列表项样式 */
  nav?: boolean;
  /** 圆角样式 */
  rounded?: boolean;
  /** 子标题模式 */
  subheader?: boolean;
  /** 三行模式，列表项显示三行内容 */
  threeLine?: boolean;
  /** 两行模式，列表项显示两行内容 */
  twoLine?: boolean;
}

/**
 * VList 组件数据接口
 */
export interface VListData {
  /** 注册的列表组集合 */
  groups: VListGroup[];
}

/**
 * VList 组件计算属性接口
 */
export interface VListComputed {
  /** 组件 CSS 类名对象 */
  classes: Record<string, boolean>;
}

/**
 * VList 组件方法接口
 */
export interface VListMethods {
  /**
   * 注册列表组
   * @param group - 要注册的列表组实例
   */
  register(group: VListGroup): void;

  /**
   * 注销列表组
   * @param group - 要注销的列表组实例
   */
  unregister(group: VListGroup): void;

  /**
   * 处理列表点击事件
   * @param eventTarget - 事件目标元素
   */
  listClick(eventTarget: EventTarget): void;
}

/**
 * VList 组件类型
 * 继承自 VSheet，提供列表容器功能
 */
export interface VList extends VSheet, VListMethods, VListComputed {
  /** 组件属性 */
  $props: VListProps;
  /** 组件数据 */
  $data: VListData;
}

/**
 * VList 组件构造函数
 */
declare const VList: {
  new (): VList;
  /** 组件选项 */
  options: {
    /** 组件名称 */
    name: string;
    /** 提供给子组件的依赖注入 */
    provide(this: VList): VListProvide;
    /** 从父组件注入的依赖 */
    inject: {
      isInMenu: { default: boolean };
      isInNav: { default: boolean };
    };
    /** 组件属性定义 */
    props: Record<keyof VListProps, any>;
    /** 组件数据工厂函数 */
    data(): VListData;
    /** 计算属性定义 */
    computed: {
      classes(this: VList): Record<string, boolean>;
    };
    /** 组件方法定义 */
    methods: VListMethods;
    /** 渲染函数 */
    render(this: VList, createElement: any): any;
  };
};

export default VList;