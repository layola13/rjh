import { VNode } from 'vue';
import VTextField from '../VTextField/VTextField';

/**
 * VTextarea 组件属性接口
 */
export interface VTextareaProps {
  /**
   * 是否自动增长高度以适应内容
   * @default false
   */
  autoGrow?: boolean;

  /**
   * 是否禁用调整大小手柄
   * @default false
   */
  noResize?: boolean;

  /**
   * 每行的高度（像素）
   * @default 24
   */
  rowHeight?: number | string;

  /**
   * 文本域的行数
   * @default 5
   */
  rows?: number | string;
}

/**
 * VTextarea 计算属性接口
 */
export interface VTextareaComputed {
  /**
   * 组件的CSS类名对象
   * 包含基础类名和条件类名
   */
  classes: Record<string, boolean>;

  /**
   * 是否隐藏调整大小手柄
   * 当 noResize 或 autoGrow 为 true 时返回 true
   */
  noResizeHandle: boolean;
}

/**
 * VTextarea 方法接口
 */
export interface VTextareaMethods {
  /**
   * 计算输入框高度
   * 用于自动增长功能，根据内容和最小行数计算合适的高度
   */
  calculateInputHeight(): void;

  /**
   * 生成输入元素的 VNode
   * 覆盖父类方法以生成 textarea 标签
   * @returns 输入元素的虚拟节点
   */
  genInput(): VNode;

  /**
   * 处理输入事件
   * @param event - 输入事件对象
   */
  onInput(event: Event): void;

  /**
   * 处理键盘按下事件
   * @param event - 键盘事件对象
   */
  onKeyDown(event: KeyboardEvent): void;
}

/**
 * VTextarea 组件
 * 
 * 多行文本输入组件，继承自 VTextField
 * 支持自动增长高度、自定义行数和行高等特性
 * 
 * @example
 *