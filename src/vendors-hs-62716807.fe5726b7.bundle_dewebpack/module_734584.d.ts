import type { ReactElement, ReactNode, CSSProperties } from 'react';

/**
 * 折叠面板的展开图标位置
 */
export type ExpandIconPosition = 'left' | 'right' | 'start' | 'end';

/**
 * 折叠面板项的可折叠状态
 */
export type CollapsibleType = 'header' | 'disabled' | 'icon';

/**
 * 展开图标渲染函数的参数
 */
export interface ExpandIconProps {
  /** 当前面板是否激活（展开） */
  isActive?: boolean;
  /** 面板标题 */
  panelKey?: string | number;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * 折叠面板配置上下文
 */
export interface ConfigContext {
  /** 获取类名前缀 */
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  /** 文本方向 */
  direction?: 'ltr' | 'rtl';
}

/**
 * 折叠面板动画配置
 */
export interface CollapseMotion {
  /** 是否启用首次出现动画 */
  motionAppear: boolean;
  /** 离开后的类名 */
  leavedClassName: string;
}

/**
 * 折叠面板组件属性
 */
export interface CollapseProps {
  /** 当前激活的面板，受控模式 */
  activeKey?: string | number | Array<string | number>;
  /** 默认激活的面板 */
  defaultActiveKey?: string | number | Array<string | number>;
  /** 手风琴模式，每次只能展开一个面板 */
  accordion?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 切换面板的回调 */
  onChange?: (key: string | number | Array<string | number>) => void;
  /** 自定义展开图标 */
  expandIcon?: (props: ExpandIconProps) => ReactNode;
  /** 展开图标的位置 */
  expandIconPosition?: ExpandIconPosition;
  /** 自定义类名前缀 */
  prefixCls?: string;
  /** 子节点（折叠面板项） */
  children?: ReactNode;
  /** 是否为幽灵模式（无边框） */
  ghost?: boolean;
  /** 所有子面板是否可折叠或指定可折叠触发区域 */
  collapsible?: CollapsibleType;
  /** 销毁折叠隐藏的面板 */
  destroyInactivePanel?: boolean;
}

/**
 * 折叠面板项组件属性
 */
export interface CollapsePanelProps {
  /** 唯一标识符 */
  key: string | number;
  /** 面板头内容 */
  header: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 面板右上角的额外内容 */
  extra?: ReactNode;
  /** 是否显示箭头 */
  showArrow?: boolean;
  /** 是否强制渲染内容 */
  forceRender?: boolean;
  /** 子节点（面板内容） */
  children?: ReactNode;
  /** 设置是否可折叠或指定可折叠触发区域 */
  collapsible?: CollapsibleType;
}

/**
 * 折叠面板项组件
 */
export declare class CollapsePanel extends React.Component<CollapsePanelProps> {}

/**
 * 折叠面板组件
 * 
 * 可以折叠/展开的内容区域。
 * 
 * @example
 *