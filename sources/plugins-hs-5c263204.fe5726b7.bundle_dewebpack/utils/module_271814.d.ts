/**
 * Tip 提示框管理模块
 * 用于在页面中动态创建和销毁提示组件
 */

/**
 * 提示框步骤配置接口
 */
interface StepTipConfig {
  /** 提示文本内容 */
  tip: string;
  
  /** 渲染类型 */
  type: 'render';
  
  /** 提示框样式位置 */
  style: 'top' | 'bottom' | 'left' | 'right';
  
  /** 目标DOM元素,提示框将相对此元素定位 */
  ele: HTMLElement;
  
  /** 提示框与目标元素的间距(像素) */
  margin: number;
}

/**
 * Tip组件属性接口
 */
interface TipComponentProps {
  /** 是否显示步骤提示 */
  showStepTip: boolean;
  
  /** 步骤提示配置 */
  stepTip: StepTipConfig;
  
  /** 是否可关闭 */
  canClose: boolean;
}

/**
 * 创建并显示提示框
 * 
 * @param tipText - 提示文本内容
 * @param targetElement - 可选的目标DOM元素。如果未提供,将自动查找教学能力按钮容器
 * 
 * @remarks
 * - 该函数会在body中创建一个容器元素(如果不存在)
 * - 容器CSS类名为 "tip-container-in-body guide-global"
 * - 如果未指定targetElement,会自动查找第一个可见的 .teaching-ability-button-wrapper 元素
 * - 提示框默认显示在目标元素上方,间距为6像素,且可关闭
 * 
 * @example
 *