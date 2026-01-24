/**
 * 自定义建模文本编辑面板模块
 * 提供文本输入、字体选择、字重设置和文本高度调整功能
 */

import React from 'react';

/**
 * 字体选项配置
 */
interface FontOption {
  /** 字体ID */
  id: number;
  /** 字体显示名称 */
  label: string;
}

/**
 * 下拉列表数据配置
 */
interface DropdownData<T = number> {
  /** 选项列表 */
  options: FontOption[];
  /** 默认选中的键 */
  defaultKey: T;
  /** 选项变更回调 */
  onchange: (key: T) => void;
  /** 下拉方向 */
  direction: 'column' | 'row';
  /** 自定义样式类名 */
  customClassName: string;
  /** 点击下拉框回调（可选） */
  onClickDropDown?: () => void;
  /** 隐藏下拉框回调（可选） */
  onHideDropDown?: () => void;
}

/**
 * 文本高度输入框配置
 */
interface TextHeightInputData {
  /** 样式类名 */
  className: string;
  /** 标签文本 */
  label: string;
  /** 当前值 */
  value: number;
  /** 是否延迟触发 */
  delay: boolean;
  /** 输入框选项 */
  options: {
    /** 单位类型 */
    unitType: string;
    /** 显示小数位数 */
    displayDigits: number;
    /** 是否包含单位 */
    includeUnit: boolean;
    /** 是否只读 */
    readOnly: boolean;
    /** 是否从最小值开始 */
    startFromMin: boolean;
    /** 提示文本 */
    tips: string;
    /** 验证规则 */
    rules: {
      /** 范围限制 */
      range: {
        /** 最小值（米） */
        min: number;
        /** 最小输入值（毫米） */
        minInput: number;
        /** 最大值（米） */
        max: number;
        /** 最大输入值（毫米） */
        maxInput: number;
      };
      /** 仅允许正数 */
      positiveOnly: boolean;
    };
  };
  /** 值开始变化回调 */
  onValueChangeStart: () => void;
  /** 值变化中回调 */
  onValueChange: (event: { detail: { value: number } }) => void;
  /** 值变化结束回调 */
  onValueChangeEnd: (event: { detail: { value: number } }) => void;
}

/**
 * 按钮配置
 */
interface ButtonData {
  /** 样式类名 */
  className: string;
  /** 按钮文本 */
  text: string;
  /** 是否禁用 */
  disabled: boolean;
  /** 点击回调 */
  onclick: () => void;
}

/**
 * 组件属性
 */
interface TextPanelProps {
  /** 初始文本内容 */
  text: string;
  /** 文本高度（米） */
  textHeight: number;
  /** 字体类型键 */
  fontKey: number;
  /** 字重类型键 */
  fontWeightKey: number;
  /** 是否为默认设置 */
  isDefaultSettings: boolean;
}

/**
 * 组件状态
 */
interface TextPanelState {
  /** 当前文本内容 */
  text: string;
  /** 文本高度（米） */
  textHeight: number;
  /** 当前字体键 */
  fontKey: number;
  /** 当前字重键 */
  fontWeightKey: number;
  /** 字重下拉列表数据 */
  fontWeightData: DropdownData;
  /** 是否为默认设置 */
  isDefaultSettings: boolean;
}

/**
 * 文本字符数据
 */
interface TextCharData {
  /** 文本字符串 */
  textString: string;
}

/**
 * 字体映射类型
 */
interface FontMap {
  [key: number]: string;
}

/**
 * 字重映射类型
 */
interface WeightMap {
  [fontKey: string]: {
    [weightKey: number]: string;
  };
}

/**
 * 字重反向映射类型
 */
interface WeightConvertMap {
  [fontKey: string]: {
    [weightCode: string]: number;
  };
}

/**
 * 文本编辑面板React组件
 * 继承自React.Component，提供文本3D建模的交互界面
 */
declare class TextEditPanel extends React.Component<TextPanelProps, TextPanelState> {
  /**
   * 字体类型映射表
   * 0: 普惠体(ph), 1: 雅黑体(yah)
   */
  static textFontMap: FontMap;

  /**
   * 字体类型反向映射表
   * ph: 0, yah: 1
   */
  static textFontConvertMap: FontMap;

  /**
   * 字重映射表
   * ph字体：0-常规, 1-细体, 2-中黑, 3-粗体, 4-特黑
   */
  static textWeightMap: WeightMap;

  /**
   * 字重反向映射表
   * ph字体：r-0, l-1, m-2, b-3, h-4
   */
  static textWeightConvertMap: WeightConvertMap;

  /**
   * 字体下拉列表配置
   */
  fontData: DropdownData;

  /**
   * 普惠体字重选项
   */
  phFontWeightOptions: FontOption[];

  /**
   * 雅黑体字重选项
   */
  yaheiFontWeightOptions: FontOption[];

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: TextPanelProps);

  /**
   * 组件挂载完成生命周期
   */
  componentDidMount(): void;

  /**
   * 文本内容变更处理
   * @param event - 输入事件（可选）
   * @param text - 文本内容
   */
  onTextChange: (event: React.ChangeEvent<HTMLInputElement> | undefined, text: string) => void;

  /**
   * 键盘按键处理
   * @param event - 键盘事件
   */
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;

  /**
   * 输入框获得焦点处理
   */
  onFocus: () => void;

  /**
   * 字体类型点击处理
   * @param fontKey - 字体键值
   */
  onTextFontClick(fontKey: number): void;

  /**
   * 字重点击处理
   * @param weightKey - 字重键值
   */
  onTextFontWeightClick(weightKey: number): void;

  /**
   * 发送文本变更消息到后端
   */
  postTextChangeMessage(): void;

  /**
   * 设置为默认配置
   */
  setAsDefault(): void;

  /**
   * 获取当前字体完整标识
   * @returns 字体标识字符串（如 "ph-r"）
   */
  getCurrentFont(): string;

  /**
   * 渲染组件
   */
  render(): React.ReactElement;
}

/**
 * 文本编辑面板管理器（静态类）
 * 负责面板的创建、更新和销毁
 */
export default class TextEditPanelManager {
  /**
   * 当前面板实例
   */
  private static instance?: TextEditPanel;

  /**
   * 创建文本编辑面板
   * @param text - 初始文本内容，默认为本地化的输入提示文本
   * @param textHeight - 文本高度（米），默认0.1米
   * @param font - 字体标识（如 "ph-r"），默认普惠体常规
   * @param isDefaultSettings - 是否为默认设置，默认true
   */
  static create(
    text?: string,
    textHeight?: number,
    font?: string,
    isDefaultSettings?: boolean
  ): void;

  /**
   * 更新面板状态
   * @param state - 要更新的状态对象
   */
  static updateState(state: Partial<TextPanelState>): void;

  /**
   * 主动触发文本变更消息发送
   */
  static postTextChangeMessage(): void;

  /**
   * 聚焦文本输入框
   * @param selectAll - 是否全选文本内容
   */
  static focusTextInput(selectAll: boolean): void;

  /**
   * 销毁面板并清理DOM
   */
  static destroy(): void;
}