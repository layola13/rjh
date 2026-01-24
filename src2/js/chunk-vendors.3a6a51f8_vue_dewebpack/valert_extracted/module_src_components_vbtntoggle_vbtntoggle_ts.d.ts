/**
 * VBtnToggle - Vuetify按钮切换组件
 * 用于创建一组可切换的按钮，支持单选或多选模式
 */

import Vue, { VNode } from 'vue';
import { VueConstructor } from 'vue';

/**
 * VBtnToggle组件的属性接口
 */
export interface VBtnToggleProps {
  /**
   * 组件背景颜色
   * 支持Material Design颜色名称或十六进制颜色值
   */
  backgroundColor?: string;

  /**
   * 是否移除边框
   * @default false
   */
  borderless?: boolean;

  /**
   * 紧凑模式，减小按钮间距和内边距
   * @default false
   */
  dense?: boolean;

  /**
   * 分组模式，应用特殊的分组样式
   * @default false
   */
  group?: boolean;

  /**
   * 圆角样式
   * @default false
   */
  rounded?: boolean;

  /**
   * 塑形样式（左右两端圆角）
   * @default false
   */
  shaped?: boolean;

  /**
   * 平铺模式（无圆角）
   * @default false
   */
  tile?: boolean;

  /**
   * 组件颜色（从colorable mixin继承）
   * 用于设置文本颜色
   */
  color?: string;
}

/**
 * VBtnToggle组件的计算属性接口
 */
export interface VBtnToggleComputed {
  /**
   * 组件的CSS类名对象
   * 包含所有应用的样式类
   */
  classes: Record<string, boolean>;

  /**
   * 主题相关的CSS类名（从colorable mixin继承）
   */
  themeClasses: Record<string, boolean>;
}

/**
 * VBtnToggle组件的方法接口
 */
export interface VBtnToggleMethods {
  /**
   * 生成组件渲染数据对象
   * 包含class、style、attrs等渲染所需的数据
   * 
   * @returns Vue渲染数据对象
   */
  genData(): {
    class?: Record<string, boolean> | string | string[];
    style?: Record<string, string>;
    attrs?: Record<string, any>;
    on?: Record<string, Function | Function[]>;
    [key: string]: any;
  };

  /**
   * 设置文本颜色（从colorable mixin继承）
   * 
   * @param color - 颜色值
   * @param data - 渲染数据对象
   * @returns 更新后的渲染数据对象
   */
  setTextColor(color: string | undefined, data: Record<string, any>): Record<string, any>;

  /**
   * 设置背景颜色（从colorable mixin继承）
   * 
   * @param color - 颜色值
   * @param data - 渲染数据对象
   * @returns 更新后的渲染数据对象
   */
  setBackgroundColor(color: string | undefined, data: Record<string, any>): Record<string, any>;
}

/**
 * VBtnToggle组件实例类型
 * 继承自Vue实例，包含props、computed和methods
 */
export interface VBtnToggle extends Vue, VBtnToggleProps, VBtnToggleComputed, VBtnToggleMethods {}

/**
 * VBtnToggle组件构造函数
 * 用于类型推导和组件扩展
 */
declare const VBtnToggle: VueConstructor<VBtnToggle>;

export default VBtnToggle;