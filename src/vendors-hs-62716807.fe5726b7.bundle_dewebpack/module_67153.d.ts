import * as React from 'react';

/**
 * 数据源项类型 - 支持字符串或对象格式
 */
export type DataSourceItemType = string | DataSourceItemObject;

/**
 * 数据源对象格式
 */
export interface DataSourceItemObject {
  /** 选项的值 */
  value: string;
  /** 选项显示的文本 */
  text: string;
}

/**
 * AutoComplete 组件属性
 */
export interface AutoCompleteProps extends Omit<SelectProps, 'mode' | 'children' | 'dataSource'> {
  /** 自定义前缀类名 */
  prefixCls?: string;
  
  /** 自定义样式类名 */
  className?: string;
  
  /** 子元素 - 可以是自定义输入框或选项列表 */
  children?: React.ReactNode;
  
  /** 数据源 - 用于自动生成选项
   * @deprecated 已废弃,请使用 options 替代
   */
  dataSource?: DataSourceItemType[];
  
  /** 自定义输入框大小
   * @deprecated 使用自定义输入框时不支持此属性,需自行控制样式
   */
  size?: 'small' | 'middle' | 'large';
}

/**
 * Select 组件的基础属性接口
 */
export interface SelectProps {
  /** 前缀类名 */
  prefixCls?: string;
  
  /** 样式类名 */
  className?: string;
  
  /** 选择模式 */
  mode?: 'multiple' | 'tags' | 'combobox';
  
  /** 子元素 */
  children?: React.ReactNode;
  
  /** 获取输入元素的函数 */
  getInputElement?: () => React.ReactElement;
  
  /** 其他 Select 属性 */
  [key: string]: unknown;
}

/**
 * Option 组件属性
 */
export interface OptionProps {
  /** 选项的唯一键 */
  key?: string | number;
  
  /** 选项的值 */
  value: string;
  
  /** 选项显示的内容 */
  children?: React.ReactNode;
}

/**
 * AutoComplete 组件类型
 */
export interface AutoCompleteComponent extends React.ForwardRefExoticComponent<AutoCompleteProps & React.RefAttributes<HTMLElement>> {
  /** Option 子组件 - 用于手动定义选项 */
  Option: React.FC<OptionProps>;
}

/**
 * AutoComplete 自动完成组件
 * 
 * @description
 * 输入框自动完成功能组件。支持两种使用方式:
 * 1. 通过 dataSource 属性自动生成选项(已废弃)
 * 2. 通过 options 属性或子元素 Option 定义选项
 * 
 * @example
 * // 使用 dataSource
 * <AutoComplete dataSource={['Option 1', 'Option 2']} />
 * 
 * @example
 * // 使用对象数组
 * <AutoComplete dataSource={[{value: '1', text: 'Option 1'}]} />
 * 
 * @example
 * // 使用子元素
 * <AutoComplete>
 *   <AutoComplete.Option value="1">Option 1</AutoComplete.Option>
 * </AutoComplete>
 * 
 * @example
 * // 使用自定义输入框
 * <AutoComplete>
 *   <input type="text" />
 * </AutoComplete>
 */
declare const AutoComplete: AutoCompleteComponent;

export default AutoComplete;