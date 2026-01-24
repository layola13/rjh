/**
 * 属性面板标签组件的类型声明
 * 用于显示带有步骤提示和操作按钮的标签面板
 */

/**
 * 单个提示步骤的数据结构
 */
export interface TipStep {
  /** 提示内容数据 */
  data: string;
}

/**
 * 标签参数配置接口
 */
export interface LabelParam {
  /** 命令名称，用于显示标签标题 */
  command: string;
  
  /** 提示步骤数组 */
  tips?: TipStep[];
  
  /** 是否显示操作按钮 */
  labelButton?: boolean;
  
  /** 取消按钮点击回调 */
  onCancel?: () => void;
  
  /** 应用按钮点击回调 */
  onApply?: () => void;
  
  /** 下一步按钮点击回调 */
  onNext?: () => void;
}

/**
 * 组件属性接口
 */
export interface PropertyLabelPartProps {
  /** 标签参数配置 */
  labelParam?: LabelParam;
}

/**
 * 组件状态接口
 */
export interface PropertyLabelPartState {
  /** 当前显示的提示内容 */
  currentTip: string;
  
  /** 当前步骤索引（从0开始） */
  step: number;
  
  /** 所有提示步骤 */
  tips: TipStep[];
  
  /** 命令名称 */
  command: string;
  
  /** 是否显示标签按钮 */
  labelButton: boolean;
}

/**
 * 属性面板标签部分组件
 * 
 * @description
 * 提供多步骤提示功能的标签组件，支持：
 * - 多步骤引导提示
 * - 取消/应用/下一步操作
 * - 动态步骤指示器
 * 
 * @example
 *