/**
 * Step组件的属性接口
 */
export interface StepProps {
  /** 自定义类名 */
  className?: string;
  /** 类名前缀 */
  prefixCls?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 是否激活 */
  active?: boolean;
  /** 当前步骤状态：等待、进行中、完成、错误 */
  status?: 'wait' | 'process' | 'finish' | 'error';
  /** 图标类名前缀 */
  iconPrefix?: string;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 容器样式 */
  wrapperStyle?: React.CSSProperties;
  /** 步骤编号 */
  stepNumber?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 步骤描述 */
  description?: React.ReactNode;
  /** 步骤标题 */
  title?: React.ReactNode;
  /** 步骤子标题 */
  subTitle?: React.ReactNode;
  /** 点状步骤条渲染函数或布尔值 */
  progressDot?: boolean | ((iconDot: React.ReactNode, options: ProgressDotOptions) => React.ReactNode);
  /** 自定义步骤图标渲染函数 */
  stepIcon?: (options: StepIconOptions) => React.ReactNode;
  /** 尾部内容 */
  tailContent?: React.ReactNode;
  /** 自定义状态图标集合 */
  icons?: {
    finish?: React.ReactNode;
    error?: React.ReactNode;
  };
  /** 步骤索引 */
  stepIndex?: number;
  /** 步骤点击回调 */
  onStepClick?: (index: number) => void;
  /** 原生点击事件 */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * progressDot渲染函数的参数选项
 */
export interface ProgressDotOptions {
  /** 步骤索引（从0开始） */
  index: number;
  /** 当前步骤状态 */
  status?: 'wait' | 'process' | 'finish' | 'error';
  /** 步骤标题 */
  title?: React.ReactNode;
  /** 步骤描述 */
  description?: React.ReactNode;
}

/**
 * stepIcon渲染函数的参数选项
 */
export interface StepIconOptions extends ProgressDotOptions {
  /** 默认图标节点 */
  node: React.ReactNode;
}

/**
 * Step组件的状态类型
 */
export type StepStatus = 'wait' | 'process' | 'finish' | 'error';

/**
 * Step组件 - 步骤条中的单个步骤项
 * 用于展示任务流程的当前进度和状态
 */
declare const Step: React.ComponentClass<StepProps>;

export default Step;