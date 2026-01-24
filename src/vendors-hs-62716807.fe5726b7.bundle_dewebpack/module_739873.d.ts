import * as React from 'react';

/**
 * 抽屉组件的放置位置
 */
export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left';

/**
 * 文本方向
 */
export type Direction = 'ltr' | 'rtl';

/**
 * 推开距离配置
 */
export interface PushConfig {
  /** 推开的距离（像素） */
  distance?: number;
}

/**
 * 抽屉组件的属性接口
 */
export interface DrawerProps {
  /** 自定义类名前缀 */
  prefixCls?: string;
  
  /** 抽屉的放置位置 */
  placement?: DrawerPlacement;
  
  /** 附加的类名 */
  className?: string;
  
  /** 抽屉的根样式 */
  style?: React.CSSProperties;
  
  /** 是否显示遮罩层 */
  mask?: boolean;
  
  /** 文本方向 */
  direction?: Direction;
  
  /** 抽屉是否可见 */
  visible?: boolean;
  
  /** 抽屉的层级 */
  zIndex?: number;
  
  /** 是否显示关闭按钮 */
  closable?: boolean;
  
  /** 自定义关闭图标 */
  closeIcon?: React.ReactNode;
  
  /** 关闭时销毁子元素 */
  destroyOnClose?: boolean;
  
  /** 抽屉容器的样式 */
  drawerStyle?: React.CSSProperties;
  
  /** 头部样式 */
  headerStyle?: React.CSSProperties;
  
  /** 内容区域样式 */
  bodyStyle?: React.CSSProperties;
  
  /** 底部样式 */
  footerStyle?: React.CSSProperties;
  
  /** 底部内容 */
  footer?: React.ReactNode;
  
  /** 抽屉标题 */
  title?: React.ReactNode;
  
  /** 用于设置多层抽屉的推开行为，可以是布尔值或配置对象 */
  push?: boolean | PushConfig;
  
  /** 抽屉宽度（placement 为 left 或 right 时生效） */
  width?: number | string;
  
  /** 抽屉高度（placement 为 top 或 bottom 时生效） */
  height?: number | string;
  
  /** 指定抽屉挂载的 HTML 节点 */
  getContainer?: string | HTMLElement | (() => HTMLElement) | false;
  
  /** 点击遮罩层是否允许关闭 */
  maskClosable?: boolean;
  
  /** 关闭抽屉的回调 */
  onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  
  /** 抽屉层级，用于嵌套抽屉 */
  level?: string | string[] | null;
  
  /** 是否支持键盘 esc 关闭 */
  keyboard?: boolean;
  
  /** 抽屉内容 */
  children?: React.ReactNode;
}

/**
 * 抽屉组件的状态接口
 */
export interface DrawerState {
  /** 是否处于推开状态（多层抽屉时使用） */
  push: boolean;
}

/**
 * 抽屉组件类
 * 用于在屏幕边缘显示应用导航等内容的面板
 */
export declare class Drawer extends React.Component<DrawerProps, DrawerState> {
  /** 默认属性 */
  static defaultProps: Partial<DrawerProps>;
  
  /** 父级抽屉引用 */
  parentDrawer?: Drawer | null;
  
  /** 销毁关闭标记 */
  destroyClose: boolean;
  
  /**
   * 推开抽屉（多层抽屉场景）
   */
  push(): void;
  
  /**
   * 拉回抽屉（多层抽屉场景）
   */
  pull(): void;
  
  /**
   * 销毁过渡动画结束回调
   */
  onDestroyTransitionEnd(): void;
  
  /**
   * 获取是否在关闭时销毁
   */
  getDestroyOnClose(): boolean;
  
  /**
   * 获取推开距离
   */
  getPushDistance(): number;
  
  /**
   * 获取推开时的 transform 值
   * @param placement 放置位置
   */
  getPushTransform(placement: DrawerPlacement): string | undefined;
  
  /**
   * 获取 rc-drawer 的样式
   */
  getRcDrawerStyle(): React.CSSProperties;
  
  /**
   * 获取偏移样式
   */
  getOffsetStyle(): React.CSSProperties;
  
  /**
   * 渲染主体内容
   */
  renderBody(): React.ReactNode;
  
  /**
   * 渲染头部
   */
  renderHeader(): React.ReactNode;
  
  /**
   * 渲染底部
   */
  renderFooter(): React.ReactNode;
  
  /**
   * 渲染关闭图标
   */
  renderCloseIcon(): React.ReactNode;
  
  /**
   * 渲染提供者包装
   * @param value 父级抽屉实例
   */
  renderProvider(value: Drawer | null): React.ReactNode;
}

/**
 * 抽屉组件包装器
 * 集成了 ConfigContext，提供配置能力
 */
declare const DrawerWrapper: React.FC<DrawerProps> & {
  displayName: string;
};

export default DrawerWrapper;