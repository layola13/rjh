import type { CSSProperties, ReactElement, ReactNode } from 'react';
import type { Component } from 'react';

/**
 * 步骤条方向类型
 */
export type StepDirection = 'horizontal' | 'vertical';

/**
 * 步骤条类型
 */
export type StepType = 'default' | 'navigation';

/**
 * 标签放置位置
 */
export type LabelPlacement = 'horizontal' | 'vertical';

/**
 * 步骤状态
 */
export type StepStatus = 'wait' | 'process' | 'finish' | 'error';

/**
 * 步骤条尺寸
 */
export type StepSize = 'default' | 'small' | '';

/**
 * 步骤图标配置
 */
export interface StepIconConfig {
  finish?: ReactNode;
  error?: ReactNode;
}

/**
 * 单个步骤的属性
 */
export interface StepProps {
  /** 步骤的详情描述 */
  description?: ReactNode;
  /** 步骤图标 */
  icon?: ReactNode;
  /** 步骤状态 */
  status?: StepStatus;
  /** 步骤标题 */
  title?: ReactNode;
  /** 子标题 */
  subTitle?: ReactNode;
  /** 禁用点击 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

/**
 * 步骤条组件属性
 */
export interface StepsProps {
  /** 样式前缀 */
  prefixCls?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 子元素（步骤项） */
  children?: ReactNode;
  /** 步骤条方向 */
  direction?: StepDirection;
  /** 步骤条类型 */
  type?: StepType;
  /** 标签放置位置 */
  labelPlacement?: LabelPlacement;
  /** 图标前缀 */
  iconPrefix?: string;
  /** 当前步骤状态 */
  status?: StepStatus;
  /** 步骤条尺寸 */
  size?: StepSize;
  /** 当前步骤索引（从 0 开始） */
  current?: number;
  /** 点状步骤条，可以传入自定义渲染函数 */
  progressDot?: boolean | ((iconDot: ReactNode, { index, status, title, description }: {
    index: number;
    status: StepStatus;
    title: ReactNode;
    description: ReactNode;
  }) => ReactNode);
  /** 自定义步骤图标 */
  stepIcon?: (step: { index: number; status: StepStatus; title: ReactNode; description: ReactNode }) => ReactNode;
  /** 起始序号（默认从 0 开始） */
  initial?: number;
  /** 配置不同状态的图标 */
  icons?: StepIconConfig;
  /** 点击步骤时触发的回调 */
  onChange?: (current: number) => void;
}

/**
 * 内部传递给单个步骤的扩展属性
 */
interface InternalStepProps extends StepProps {
  /** 步骤序号字符串 */
  stepNumber?: string;
  /** 步骤索引 */
  stepIndex?: number;
  /** 样式前缀 */
  prefixCls?: string;
  /** 图标前缀 */
  iconPrefix?: string;
  /** 容器样式 */
  wrapperStyle?: CSSProperties;
  /** 点状步骤条配置 */
  progressDot?: StepsProps['progressDot'];
  /** 自定义步骤图标 */
  stepIcon?: StepsProps['stepIcon'];
  /** 图标配置 */
  icons?: StepIconConfig;
  /** 点击回调 */
  onStepClick?: (index: number) => void;
  /** 是否为激活状态 */
  active?: boolean;
}

/**
 * 步骤条组件类
 */
export default class Steps extends Component<StepsProps> {
  /**
   * 单个步骤组件（静态属性）
   */
  static Step: Component<StepProps>;

  /**
   * 默认属性
   */
  static defaultProps: Required<Pick<StepsProps, 'type' | 'prefixCls' | 'iconPrefix' | 'direction' | 'labelPlacement' | 'initial' | 'current' | 'status' | 'size' | 'progressDot'>>;

  /**
   * 步骤点击事件处理器
   * @param stepIndex - 被点击的步骤索引
   */
  onStepClick: (stepIndex: number) => void;

  /**
   * 渲染步骤条
   */
  render(): ReactElement;
}