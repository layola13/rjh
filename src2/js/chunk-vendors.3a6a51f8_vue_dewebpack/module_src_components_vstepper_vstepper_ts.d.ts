/**
 * VStepper组件类型定义
 * 步进器组件，用于引导用户完成多步骤流程
 */

import Vue, { VNode, VueConstructor } from 'vue';

/**
 * 步进器步骤组件实例接口
 */
interface VStepperStepInstance extends Vue {
  /** 组件选项名称 */
  $options: {
    name: string;
  };
  /** 切换步骤激活状态 */
  toggle(value: number | string): void;
  /** 步骤标识 */
  step?: number | string;
}

/**
 * 步进器内容组件实例接口
 */
interface VStepperContentInstance extends Vue {
  /** 组件选项名称 */
  $options: {
    name: string;
  };
  /** 是否垂直布局 */
  isVertical: boolean;
  /** 切换内容显示状态 */
  toggle(value: number | string, isReverse: boolean): void;
}

/**
 * VStepper组件属性接口
 */
interface VStepperProps {
  /** 替代标签样式，将步骤标签放置在步骤图标下方 */
  altLabels?: boolean;
  /** 非线性模式，允许用户以任意顺序访问步骤 */
  nonLinear?: boolean;
  /** 垂直布局模式 */
  vertical?: boolean;
  /** 当前激活的步骤值（受控） */
  value?: number | string;
}

/**
 * VStepper组件数据接口
 */
interface VStepperData {
  /** 组件是否已完成初始化 */
  isBooted: boolean;
  /** 注册的步骤组件列表 */
  steps: VStepperStepInstance[];
  /** 注册的内容组件列表 */
  content: VStepperContentInstance[];
  /** 是否反向切换（用于过渡动画方向） */
  isReverse: boolean;
  /** 内部懒加载值，用于双向绑定 */
  internalLazyValue: number | string;
}

/**
 * VStepper组件计算属性接口
 */
interface VStepperComputed {
  /** 组件CSS类对象 */
  classes: Record<string, boolean>;
  /** 内部值（通过proxyable mixin提供） */
  internalValue: number | string;
  /** 主题类（通过themeable mixin提供） */
  themeClasses: Record<string, boolean>;
}

/**
 * VStepper组件方法接口
 */
interface VStepperMethods {
  /**
   * 注册子组件（步骤或内容）
   * @param component 要注册的组件实例
   */
  register(component: VStepperStepInstance | VStepperContentInstance): void;

  /**
   * 注销子组件（步骤或内容）
   * @param component 要注销的组件实例
   */
  unregister(component: VStepperStepInstance | VStepperContentInstance): void;

  /**
   * 处理步骤点击事件
   * @param step 被点击的步骤标识
   */
  stepClick(step: number | string): void;

  /**
   * 更新所有步骤和内容的显示状态
   */
  updateView(): void;
}

/**
 * VStepper组件Provide注入接口
 */
interface VStepperProvide {
  /** 步骤点击处理函数 */
  stepClick: (step: number | string) => void;
  /** 是否垂直布局 */
  isVertical: boolean;
}

/**
 * VStepper步进器组件
 * 
 * @description
 * 步进器组件用于显示进度并引导用户完成多步骤流程。
 * 支持线性和非线性模式，水平和垂直布局。
 * 
 * @example
 *