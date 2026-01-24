/**
 * 颜色选择器编辑模式配置
 * 支持 RGBA、HSLA 和 HEXA 三种颜色模式
 */

/** 颜色输入类型 */
export type ColorInputType = 'int' | 'float';

/** 单个输入字段的配置：[字段名, 最大值, 输入类型] */
export type ColorInputConfig = [string, number, ColorInputType];

/** 颜色对象接口 */
export interface ColorObject {
  /** RGBA 模式的颜色值 */
  rgba?: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  /** HSLA 模式的颜色值 */
  hsla?: {
    h: number;
    s: number;
    l: number;
    a: number;
  };
  /** 十六进制颜色值 */
  hexa?: string;
  /** 透明度 */
  alpha: number;
}

/** 颜色模式配置接口 */
export interface ColorMode {
  /** 输入字段配置列表 */
  inputs?: ColorInputConfig[];
  /** 从该模式转换为 ColorObject 的函数 */
  from: (value: any, alpha?: number) => ColorObject;
}

/** 所有支持的颜色模式 */
export interface ColorModes {
  /** RGBA 颜色模式 */
  rgba: ColorMode;
  /** HSLA 颜色模式 */
  hsla: ColorMode;
  /** HEXA 颜色模式 */
  hexa: ColorMode;
}

/**
 * 颜色选择器编辑模式配置对象
 * 定义了 RGBA、HSLA 和 HEXA 三种颜色模式的输入配置
 */
export declare const modes: ColorModes;

/** VColorPickerEdit 组件的属性接口 */
export interface VColorPickerEditProps {
  /** 当前颜色对象 */
  color: ColorObject;
  /** 是否禁用编辑 */
  disabled?: boolean;
  /** 是否隐藏透明度输入 */
  hideAlpha?: boolean;
  /** 是否隐藏模式切换按钮 */
  hideModeSwitch?: boolean;
  /** 当前颜色模式 */
  mode?: 'rgba' | 'hsla' | 'hexa';
}

/** VColorPickerEdit 组件的事件接口 */
export interface VColorPickerEditEvents {
  /** 颜色更新事件 */
  'update:color': (color: ColorObject) => void;
  /** 模式更新事件 */
  'update:mode': (mode: keyof ColorModes) => void;
}

/** VColorPickerEdit 组件的数据接口 */
export interface VColorPickerEditData {
  /** 所有支持的颜色模式 */
  modes: ColorModes;
  /** 内部当前使用的颜色模式 */
  internalMode: keyof ColorModes;
}

/** VColorPickerEdit 组件的计算属性接口 */
export interface VColorPickerEditComputed {
  /** 获取当前模式的配置对象 */
  currentMode: ColorMode;
}

/** VColorPickerEdit 组件的方法接口 */
export interface VColorPickerEditMethods {
  /**
   * 根据类型格式化颜色值
   * @param value - 原始值
   * @param type - 值类型（int 或 float）
   * @returns 格式化后的值
   */
  getValue(value: number, type: ColorInputType): number;

  /**
   * 解析输入字符串为数值
   * @param value - 输入字符串
   * @param type - 目标类型（int 或 float）
   * @returns 解析后的数值
   */
  parseValue(value: string, type: ColorInputType): number;

  /**
   * 切换到下一个颜色模式
   */
  changeMode(): void;

  /**
   * 生成单个输入字段的 VNode
   * @param key - 字段名
   * @param attrs - input 元素的属性
   * @param value - 当前值
   * @param on - 事件监听器
   * @returns VNode
   */
  genInput(
    key: string,
    attrs: Record<string, any>,
    value: number | string,
    on: Record<string, Function>
  ): any;

  /**
   * 生成所有输入字段
   * @returns VNode 或 VNode 数组
   */
  genInputs(): any;

  /**
   * 生成模式切换按钮
   * @returns VNode
   */
  genSwitch(): any;
}

/**
 * VColorPickerEdit 组件
 * 提供颜色编辑功能，支持 RGBA、HSLA 和 HEXA 三种模式
 */
declare const VColorPickerEdit: {
  name: 'v-color-picker-edit';
  props: VColorPickerEditProps;
  data(): VColorPickerEditData;
  computed: VColorPickerEditComputed;
  methods: VColorPickerEditMethods;
};

export default VColorPickerEdit;