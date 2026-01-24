import Vue, { VNode, VNodeData, PropType } from 'vue';
import { VMenu } from '../VMenu';
import { VBtn } from '../VBtn';

/**
 * 可编辑对话框组件的 Props 接口
 */
export interface VEditDialogProps {
  /** 取消按钮文本 */
  cancelText?: string;
  /** 是否为大尺寸对话框 */
  large?: boolean;
  /** 是否立即渲染内容（不等待激活） */
  eager?: boolean;
  /** 是否持久化（点击外部不关闭） */
  persistent?: boolean;
  /** 保存按钮文本 */
  saveText?: string;
  /** 过渡动画名称 */
  transition?: string;
  /** 浅色主题 */
  light?: boolean;
  /** 深色主题 */
  dark?: boolean;
}

/**
 * 可编辑对话框组件的数据接口
 */
export interface VEditDialogData {
  /** 对话框是否激活状态 */
  isActive: boolean;
}

/**
 * 作用域插槽参数接口
 */
export interface VEditDialogScopedSlot {
  /** 激活器事件监听器 */
  on: Record<string, Function>;
}

/**
 * VEditDialog 组件类声明
 * 提供内联编辑功能的小型对话框组件
 */
declare class VEditDialog extends Vue {
  /** 取消按钮文本，默认为 "Cancel" */
  cancelText: string;
  
  /** 是否为大尺寸对话框，大尺寸时显示操作按钮 */
  large: boolean;
  
  /** 是否立即渲染内容（不等待激活） */
  eager: boolean;
  
  /** 是否持久化（点击外部不关闭） */
  persistent: boolean;
  
  /** 保存按钮文本，默认为 "Save" */
  saveText: string;
  
  /** 过渡动画名称，默认为 "slide-x-reverse-transition" */
  transition: string;
  
  /** 对话框当前激活状态 */
  isActive: boolean;
  
  /** 可返回值的混合属性 */
  returnValue: unknown;
  
  /** 主题类名集合 */
  themeClasses: Record<string, boolean>;
  
  /**
   * 取消编辑操作
   * 关闭对话框并触发 cancel 事件
   */
  cancel(): void;
  
  /**
   * 聚焦到对话框内的第一个输入框
   */
  focus(): void;
  
  /**
   * 生成操作按钮（取消/保存）
   * @param handler - 按钮点击事件处理函数
   * @param text - 按钮显示文本
   * @returns 按钮 VNode
   */
  genButton(handler: () => void, text: string): VNode;
  
  /**
   * 生成操作按钮组（取消和保存按钮）
   * @returns 操作按钮容器 VNode
   */
  genActions(): VNode;
  
  /**
   * 生成对话框内容区域
   * @returns 内容区域 VNode
   */
  genContent(): VNode;
  
  /**
   * 保存编辑值
   * @param value - 要保存的值
   */
  save(value: unknown): void;
  
  /**
   * 组件渲染函数
   * @param h - createElement 函数
   * @returns 组件 VNode
   */
  render(h: typeof Vue.prototype.$createElement): VNode;
  
  // 事件声明
  /**
   * 对话框打开时触发
   * @event open
   */
  $emit(event: 'open'): this;
  
  /**
   * 对话框关闭时触发
   * @event close
   */
  $emit(event: 'close'): this;
  
  /**
   * 取消编辑时触发
   * @event cancel
   */
  $emit(event: 'cancel'): this;
  
  /**
   * 保存编辑时触发
   * @event save
   */
  $emit(event: 'save'): this;
  
  // 插槽声明
  $slots: {
    /** 默认插槽：对话框激活器内容 */
    default?: VNode[];
    /** 输入插槽：对话框内的输入控件 */
    input?: VNode[];
  };
  
  $scopedSlots: {
    /** 激活器作用域插槽 */
    activator?: (props: VEditDialogScopedSlot) => VNode | VNode[];
  };
}

export default VEditDialog;