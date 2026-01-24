import type { VNode } from 'vue';
import type { PropType } from 'vue';

/**
 * VTextField 组件属性接口
 */
export interface VTextFieldProps {
  /** 外部追加图标 */
  appendOuterIcon?: string;
  /** 是否自动获得焦点 */
  autofocus?: boolean;
  /** 是否显示清除按钮 */
  clearable?: boolean;
  /** 清除图标名称 */
  clearIcon?: string;
  /** 字符计数器配置（布尔值、数字或字符串） */
  counter?: boolean | number | string;
  /** 自定义计数器值的函数 */
  counterValue?: (value: any) => number;
  /** 填充样式 */
  filled?: boolean;
  /** 扁平样式 */
  flat?: boolean;
  /** 全宽模式 */
  fullWidth?: boolean;
  /** 标签文本 */
  label?: string;
  /** 轮廓样式 */
  outlined?: boolean;
  /** 占位符文本 */
  placeholder?: string;
  /** 前缀文本 */
  prefix?: string;
  /** 内部前置图标 */
  prependInnerIcon?: string;
  /** 反向布局 */
  reverse?: boolean;
  /** 圆角样式 */
  rounded?: boolean;
  /** 异形样式 */
  shaped?: boolean;
  /** 单行模式 */
  singleLine?: boolean;
  /** Solo 样式 */
  solo?: boolean;
  /** Solo 反色样式 */
  soloInverted?: boolean;
  /** 后缀文本 */
  suffix?: string;
  /** 输入框类型 */
  type?: string;
}

/**
 * VTextField 组件数据接口
 */
export interface VTextFieldData {
  /** 输入是否无效 */
  badInput: boolean;
  /** 标签宽度（像素） */
  labelWidth: number;
  /** 前缀宽度（像素） */
  prefixWidth: number;
  /** 内部前置元素宽度（像素） */
  prependWidth: number;
  /** 初始值 */
  initialValue: any;
  /** 是否已启动 */
  isBooted: boolean;
  /** 是否正在清除 */
  isClearing: boolean;
}

/**
 * VTextField 组件计算属性接口
 */
export interface VTextFieldComputed {
  /** 组件 CSS 类名对象 */
  classes: Record<string, boolean>;
  /** 计算后的颜色 */
  computedColor: string | undefined;
  /** 计算后的计数器值 */
  computedCounterValue: number;
  /** 是否有计数器 */
  hasCounter: boolean;
  /** 是否有详情区域 */
  hasDetails: boolean;
  /** 内部值（支持 getter/setter） */
  internalValue: any;
  /** 输入框是否为"脏"状态（有内容） */
  isDirty: boolean;
  /** 是否为封闭样式（filled/solo/outlined） */
  isEnclosed: boolean;
  /** 标签是否处于激活状态 */
  isLabelActive: boolean;
  /** 是否为单行模式 */
  isSingle: boolean;
  /** 是否为 solo 样式 */
  isSolo: boolean;
  /** 标签位置样式对象 */
  labelPosition: { left: number | string; right: number | string };
  /** 是否显示标签 */
  showLabel: boolean;
  /** 标签值状态 */
  labelValue: boolean;
}

/**
 * VTextField 组件方法接口
 */
export interface VTextFieldMethods {
  /** 使输入框获得焦点 */
  focus(): void;
  
  /** 使输入框失去焦点 */
  blur(event?: Event): void;
  
  /** 清除按钮回调 */
  clearableCallback(): void;
  
  /** 生成外部追加插槽 */
  genAppendSlot(): VNode | null;
  
  /** 生成内部前置插槽 */
  genPrependInnerSlot(): VNode | null;
  
  /** 生成图标插槽 */
  genIconSlot(): VNode | null;
  
  /** 生成输入插槽 */
  genInputSlot(): VNode;
  
  /** 生成清除图标 */
  genClearIcon(): VNode | null;
  
  /** 生成计数器组件 */
  genCounter(): VNode | null;
  
  /** 生成控制区域 */
  genControl(): VNode;
  
  /** 生成默认插槽内容 */
  genDefaultSlot(): VNode[];
  
  /** 生成 fieldset 元素（用于 outlined 样式） */
  genFieldset(): VNode | null;
  
  /** 生成标签组件 */
  genLabel(): VNode | null;
  
  /** 生成 legend 元素（用于 outlined 样式） */
  genLegend(): VNode;
  
  /** 生成输入元素 */
  genInput(): VNode;
  
  /** 生成消息区域（验证提示、计数器等） */
  genMessages(): VNode | null;
  
  /** 生成文本框插槽 */
  genTextFieldSlot(): VNode;
  
  /** 生成前缀/后缀元素 */
  genAffix(type: 'prefix' | 'suffix'): VNode;
  
  /** 失焦事件处理 */
  onBlur(event?: FocusEvent): void;
  
  /** 点击事件处理 */
  onClick(): void;
  
  /** 获焦事件处理 */
  onFocus(event?: FocusEvent): void;
  
  /** 输入事件处理 */
  onInput(event: Event): void;
  
  /** 键盘按下事件处理 */
  onKeyDown(event: KeyboardEvent): void;
  
  /** 鼠标按下事件处理 */
  onMouseDown(event: MouseEvent): void;
  
  /** 鼠标释放事件处理 */
  onMouseUp(event: MouseEvent): void;
  
  /** 设置标签宽度 */
  setLabelWidth(): void;
  
  /** 设置前缀宽度 */
  setPrefixWidth(): void;
  
  /** 设置内部前置元素宽度 */
  setPrependWidth(): void;
  
  /** 尝试自动获取焦点 */
  tryAutofocus(): boolean;
  
  /** 更新值并触发 change 事件 */
  updateValue(isFocused: boolean): void;
  
  /** 尺寸变化处理 */
  onResize(): void;
}

/**
 * VTextField 组件完整类型定义
 * 基于 Vuetify 的文本输入框组件
 * 
 * @remarks
 * 该组件提供丰富的样式变体和功能：
 * - 支持多种样式：outlined（轮廓）、filled（填充）、solo（独立）等
 * - 支持前缀/后缀文本和图标
 * - 内置字符计数器
 * - 支持清除按钮
 * - 完整的表单验证支持
 * - 响应式布局适配（RTL 支持）
 * 
 * @example
 *