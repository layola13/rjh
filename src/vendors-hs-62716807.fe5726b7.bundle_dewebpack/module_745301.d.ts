import type React from 'react';
import type { Moment } from 'moment';
import type { ConfigConsumerProps } from 'antd/es/config-provider';

/**
 * 日期范围选择器的属性接口
 */
export interface RangePickerProps<DateType = Moment> {
  /** 自定义类名前缀 */
  prefixCls?: string;
  
  /** 获取弹出容器的函数 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  
  /** 自定义类名 */
  className?: string;
  
  /** 选择器尺寸 */
  size?: 'small' | 'middle' | 'large';
  
  /** 是否显示边框 */
  bordered?: boolean;
  
  /** 占位符文本，可以是字符串或字符串数组 */
  placeholder?: string | [string, string];
  
  /** 日期格式 */
  format?: string | string[];
  
  /** 是否显示时间选择 */
  showTime?: boolean | object;
  
  /** 选择器类型 */
  picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';
  
  /** 国际化配置 */
  locale?: Partial<PickerLocale>;
  
  /** 是否允许清除 */
  allowClear?: boolean;
  
  /** 动画过渡名称 */
  transitionName?: string;
  
  /** 分隔符 */
  separator?: React.ReactNode;
  
  /** 后缀图标 */
  suffixIcon?: React.ReactNode;
  
  /** 清除图标 */
  clearIcon?: React.ReactNode;
  
  /** 前一个图标 */
  prevIcon?: React.ReactNode;
  
  /** 下一个图标 */
  nextIcon?: React.ReactNode;
  
  /** 超级前一个图标 */
  superPrevIcon?: React.ReactNode;
  
  /** 超级下一个图标 */
  superNextIcon?: React.ReactNode;
  
  /** 自定义组件 */
  components?: Record<string, React.ComponentType<any>>;
  
  /** 文字方向 */
  direction?: 'ltr' | 'rtl';
}

/**
 * 日期选择器的国际化配置接口
 */
export interface PickerLocale {
  /** 语言配置 */
  lang: {
    /** 占位符 */
    placeholder?: string;
    /** 范围占位符 */
    rangePlaceholder?: [string, string];
    /** 今天 */
    today?: string;
    /** 现在 */
    now?: string;
    /** 确定 */
    ok?: string;
    /** 清除 */
    clear?: string;
    /** 月份 */
    month?: string;
    /** 年份 */
    year?: string;
    /** 时间选择 */
    timeSelect?: string;
    /** 日期选择 */
    dateSelect?: string;
    /** 其他语言配置项 */
    [key: string]: any;
  };
  /** 时间选择器的国际化配置 */
  timePickerLocale?: Record<string, any>;
}

/**
 * 日期范围选择器组件的状态接口
 */
export interface RangePickerState {
  /** 选择器引用 */
  pickerRef: React.RefObject<any>;
}

/**
 * 高阶组件工厂函数，用于生成日期范围选择器组件
 * 
 * @template DateType - 日期类型泛型
 * @param generateConfig - 日期生成配置对象
 * @returns 返回一个继承自React.Component的日期范围选择器组件类
 * 
 * @example
 *