/**
 * VNavigationDrawer 组件类型定义
 * 一个可自定义的侧边导航抽屉组件，支持响应式布局、主题、覆盖层等功能
 */

import Vue, { VNode, PropType } from 'vue';
import { VImg } from '../VImg/VImg';

/**
 * 触摸区域配置
 */
export interface TouchArea {
  /** 左侧触摸区域边界 */
  left: number;
  /** 右侧触摸区域边界 */
  right: number;
}

/**
 * 触摸事件数据
 */
export interface TouchEvent {
  /** 触摸开始时的X坐标 */
  touchstartX: number;
  /** 触摸结束时的X坐标 */
  touchendX: number;
}

/**
 * 图片插槽作用域参数
 */
export interface ImageSlotScope {
  /** 图片高度 */
  height: string;
  /** 图片宽度 */
  width: string;
  /** 图片源地址 */
  src: string | object;
}

/**
 * VNavigationDrawer 组件属性
 */
export interface VNavigationDrawerProps {
  /** 是否绝对定位 */
  absolute?: boolean;
  /** 是否应用到应用布局 */
  app?: boolean;
  /** 是否固定在底部（移动端） */
  bottom?: boolean;
  /** 是否被应用栏裁剪 */
  clipped?: boolean;
  /** 主题颜色 */
  color?: string;
  /** 是否禁用响应式监听器 */
  disableResizeWatcher?: boolean;
  /** 是否禁用路由监听器 */
  disableRouteWatcher?: boolean;
  /** 鼠标悬停时展开 */
  expandOnHover?: boolean;
  /** 是否固定定位 */
  fixed?: boolean;
  /** 是否浮动样式 */
  floating?: boolean;
  /** 抽屉高度 */
  height?: number | string;
  /** 是否隐藏覆盖层 */
  hideOverlay?: boolean;
  /** 是否为迷你变体 */
  miniVariant?: boolean;
  /** 迷你变体宽度 */
  miniVariantWidth?: number | string;
  /** 是否永久显示 */
  permanent?: boolean;
  /** 是否在右侧 */
  right?: boolean;
  /** 背景图片源 */
  src?: string | object;
  /** 是否无状态（不响应外部变化） */
  stateless?: boolean;
  /** 根元素标签名 */
  tag?: string;
  /** 是否为临时抽屉（覆盖内容） */
  temporary?: boolean;
  /** 是否禁用触摸手势 */
  touchless?: boolean;
  /** 抽屉宽度 */
  width?: number | string;
  /** 控制抽屉显示/隐藏的v-model值 */
  value?: boolean | null;
  /** 是否为深色主题 */
  dark?: boolean;
  /** 是否为浅色主题 */
  light?: boolean;
}

/**
 * VNavigationDrawer 组件数据
 */
export interface VNavigationDrawerData {
  /** 鼠标是否悬停在抽屉上 */
  isMouseover: boolean;
  /** 触摸区域配置 */
  touchArea: TouchArea;
  /** 层叠最小z-index */
  stackMinZIndex: number;
  /** 抽屉是否激活显示 */
  isActive?: boolean;
}

/**
 * VNavigationDrawer 组件计算属性
 */
export interface VNavigationDrawerComputed {
  /** 应用布局属性名称 */
  applicationProperty: 'left' | 'right';
  /** 组件CSS类名对象 */
  classes: Record<string, boolean>;
  /** 计算后的最大高度 */
  computedMaxHeight: number | null;
  /** 计算后的顶部位置 */
  computedTop: number;
  /** 计算后的transform值 */
  computedTransform: number;
  /** 计算后的宽度 */
  computedWidth: number | string;
  /** 是否应用到布局 */
  hasApp: boolean;
  /** 是否在底部 */
  isBottom: boolean;
  /** 是否为迷你变体状态 */
  isMiniVariant: boolean;
  /** 是否为移动端 */
  isMobile: boolean;
  /** 是否响应点击事件 */
  reactsToClick: boolean;
  /** 是否响应移动端变化 */
  reactsToMobile: boolean;
  /** 是否响应窗口大小变化 */
  reactsToResize: boolean;
  /** 是否响应路由变化 */
  reactsToRoute: boolean;
  /** 是否显示覆盖层 */
  showOverlay: boolean;
  /** 组件样式对象 */
  styles: {
    height: string;
    top: string | number;
    maxHeight?: string;
    transform: string;
    width: string;
  };
  /** 主题类名 */
  themeClasses: Record<string, boolean>;
}

/**
 * VNavigationDrawer 组件方法
 */
export interface VNavigationDrawerMethods {
  /**
   * 计算触摸区域边界
   */
  calculateTouchArea(): void;

  /**
   * 关闭条件判断
   * @returns 是否应该关闭抽屉
   */
  closeConditional(): boolean;

  /**
   * 生成append插槽内容
   */
  genAppend(): VNode | undefined;

  /**
   * 生成背景图片
   */
  genBackground(): VNode;

  /**
   * 生成指令配置
   */
  genDirectives(): Array<{
    name: string;
    value: Record<string, unknown>;
  }>;

  /**
   * 生成事件监听器
   */
  genListeners(): Record<string, Function>;

  /**
   * 生成指定位置的插槽内容
   * @param position - 位置名称（'append' 或 'prepend'）
   */
  genPosition(position: 'append' | 'prepend'): VNode | undefined;

  /**
   * 生成prepend插槽内容
   */
  genPrepend(): VNode | undefined;

  /**
   * 生成主内容区域
   */
  genContent(): VNode;

  /**
   * 生成边框元素
   */
  genBorder(): VNode;

  /**
   * 初始化抽屉状态
   */
  init(): void;

  /**
   * 路由变化处理
   */
  onRouteChange(): void;

  /**
   * 向左滑动手势处理
   * @param event - 触摸事件数据
   */
  swipeLeft(event: TouchEvent): void;

  /**
   * 向右滑动手势处理
   * @param event - 触摸事件数据
   */
  swipeRight(event: TouchEvent): void;

  /**
   * 更新应用布局
   * @returns 抽屉宽度（像素）
   */
  updateApplication(): number;

  /**
   * 更新迷你变体状态
   * @param value - 是否为迷你变体
   */
  updateMiniVariant(value: boolean): void;

  /**
   * 生成覆盖层
   */
  genOverlay(): void;

  /**
   * 移除覆盖层
   */
  removeOverlay(): void;

  /**
   * 获取打开的依赖元素
   */
  getOpenDependentElements(): HTMLElement[];

  /**
   * 设置背景颜色
   */
  setBackgroundColor(color: string | undefined, data: Record<string, unknown>): Record<string, unknown>;
}

/**
 * VNavigationDrawer 组件事件
 */
export interface VNavigationDrawerEvents {
  /**
   * v-model值变化事件
   * @param value - 新的显示状态
   */
  input: boolean;

  /**
   * 过渡动画结束事件
   * @param event - 过渡事件对象
   */
  transitionend: TransitionEvent;

  /**
   * 迷你变体状态更新事件
   * @param value - 新的迷你变体状态
   */
  'update:mini-variant': boolean;
}

/**
 * VNavigationDrawer 组件插槽
 */
export interface VNavigationDrawerSlots {
  /** 默认插槽：抽屉主内容 */
  default: void;
  /** 追加内容插槽 */
  append: void;
  /** 前置内容插槽 */
  prepend: void;
  /** 背景图片插槽 */
  img: ImageSlotScope;
}

/**
 * VNavigationDrawer 组件类型
 */
declare const VNavigationDrawer: {
  new (): Vue & 
    VNavigationDrawerProps & 
    VNavigationDrawerData & 
    VNavigationDrawerComputed & 
    VNavigationDrawerMethods & {
      $emit<K extends keyof VNavigationDrawerEvents>(
        event: K,
        ...args: VNavigationDrawerEvents[K] extends never ? [] : [VNavigationDrawerEvents[K]]
      ): void;
      $scopedSlots: Partial<{
        [K in keyof VNavigationDrawerSlots]: (
          props: VNavigationDrawerSlots[K]
        ) => VNode[];
      }>;
      $slots: Partial<Record<keyof VNavigationDrawerSlots, VNode[]>>;
    };
};

export default VNavigationDrawer;