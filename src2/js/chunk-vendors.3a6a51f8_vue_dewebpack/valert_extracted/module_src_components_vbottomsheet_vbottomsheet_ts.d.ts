/**
 * VBottomSheet 组件类型定义
 * 底部弹出层组件，继承自 VDialog
 */

import { VueConstructor } from 'vue';
import VDialog from '../VDialog/VDialog';

/**
 * VBottomSheet 组件属性接口
 */
export interface VBottomSheetProps {
  /**
   * 是否使用内嵌模式（inset），内嵌时会减少底部弹出层的宽度
   * @default false
   */
  inset?: boolean;

  /**
   * 底部弹出层的最大宽度
   * @default "auto"
   */
  maxWidth?: string | number;

  /**
   * 过渡动画名称
   * @default "bottom-sheet-transition"
   */
  transition?: string;
}

/**
 * VBottomSheet 计算属性接口
 */
export interface VBottomSheetComputed {
  /**
   * 组件的CSS类名对象
   * 合并父组件(VDialog)的类名和自身特定的类名
   */
  classes: Record<string, boolean>;
}

/**
 * VBottomSheet 组件实例类型
 */
export interface VBottomSheet extends Vue {
  /** 组件属性 */
  inset: boolean;
  maxWidth: string | number;
  transition: string;

  /** 计算属性 */
  readonly classes: Record<string, boolean>;
}

/**
 * VBottomSheet 组件选项接口
 */
export interface VBottomSheetOptions {
  name: string;
  props: {
    inset: { type: BooleanConstructor };
    maxWidth: {
      type: [StringConstructor, NumberConstructor];
      default: string;
    };
    transition: {
      type: StringConstructor;
      default: string;
    };
  };
  computed: {
    classes(this: VBottomSheet): Record<string, boolean>;
  };
}

/**
 * VBottomSheet 组件构造函数
 * 
 * @description
 * 底部弹出层组件，从屏幕底部滑出的对话框
 * 继承自 VDialog 组件，支持 inset 模式和自定义过渡动画
 * 
 * @example
 *