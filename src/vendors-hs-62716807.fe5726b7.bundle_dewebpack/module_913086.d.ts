/**
 * Form组件类型定义
 * 提供表单管理、验证和布局功能
 */

import type { FormInstance } from 'rc-field-form';
import type { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import type { ReactElement, ForwardRefExoticComponent, RefAttributes } from 'react';
import type { SizeType } from './SizeContext';
import type { ColProps } from './grid/col';

/**
 * 表单布局类型
 */
export type FormLayout = 'horizontal' | 'vertical' | 'inline';

/**
 * 标签对齐方式
 */
export type LabelAlign = 'left' | 'right';

/**
 * 必填标记显示方式
 */
export type RequiredMark = boolean | 'optional';

/**
 * 滚动到错误字段的配置
 */
export interface ScrollToFieldOptions {
  /** 滚动行为 */
  behavior?: ScrollBehavior;
  /** 滚动块对齐方式 */
  block?: ScrollLogicalPosition;
  /** 滚动内联对齐方式 */
  inline?: ScrollLogicalPosition;
}

/**
 * 表单配置上下文
 */
export interface FormContextProps {
  /** 表单名称 */
  name?: string;
  /** 标签对齐方式 */
  labelAlign?: LabelAlign;
  /** 标签列配置 */
  labelCol?: ColProps;
  /** 输入控件列配置 */
  wrapperCol?: ColProps;
  /** 是否垂直布局 */
  vertical?: boolean;
  /** 是否显示冒号 */
  colon?: boolean;
  /** 必填标记 */
  requiredMark?: RequiredMark;
  /** 表单项引用回调 */
  itemRef?: (name: string | number | (string | number)[]) => void;
}

/**
 * 表单完成失败回调参数
 */
export interface FormFinishFailedInfo extends ValidateErrorEntity {
  /** 验证错误的字段列表 */
  errorFields: Array<{
    name: string | number | (string | number)[];
    errors: string[];
  }>;
  /** 所有字段的值 */
  values: Record<string, any>;
  /** 表单外层元素 */
  outOfDate?: boolean;
}

/**
 * Form组件属性
 */
export interface FormProps<Values = any> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onFinish' | 'onFinishFailed'> {
  /** 自定义类名前缀 */
  prefixCls?: string;
  /** 自定义类名 */
  className?: string;
  /** 表单尺寸 */
  size?: SizeType;
  /** 表单实例 */
  form?: FormInstance<Values>;
  /** 是否显示标签后的冒号 */
  colon?: boolean;
  /** 标签对齐方式 */
  labelAlign?: LabelAlign;
  /** 标签列布局配置 */
  labelCol?: ColProps;
  /** 输入控件列布局配置 */
  wrapperCol?: ColProps;
  /** 隐藏所有表单项的必选标记（已废弃，使用requiredMark） */
  hideRequiredMark?: boolean;
  /** 表单布局 */
  layout?: FormLayout;
  /** 提交失败自动滚动到第一个错误字段 */
  scrollToFirstError?: boolean | ScrollToFieldOptions;
  /** 必填标记显示方式 */
  requiredMark?: RequiredMark;
  /** 提交表单且数据验证成功后回调 */
  onFinish?: (values: Values) => void;
  /** 提交表单且数据验证失败后回调 */
  onFinishFailed?: (errorInfo: FormFinishFailedInfo) => void;
  /** 表单名称，用于区分多个表单 */
  name?: string;
  /** 字段值更新时触发回调 */
  onValuesChange?: (changedValues: Partial<Values>, values: Values) => void;
  /** 字段更新时触发回调 */
  onFieldsChange?: (changedFields: any[], allFields: any[]) => void;
  /** 表单初始值 */
  initialValues?: Partial<Values>;
  /** 设置字段组件的尺寸 */
  component?: false | string | React.ComponentType<any>;
  /** 表单字段 */
  fields?: any[];
  /** 是否保留字段值 */
  preserve?: boolean;
  /** 验证提示模板 */
  validateMessages?: any;
  /** 验证触发时机 */
  validateTrigger?: string | string[];
}

/**
 * Form组件类型
 */
export interface FormComponent extends ForwardRefExoticComponent<FormProps & RefAttributes<FormInstance>> {
  /** 表单项组件 */
  Item: any;
  /** 表单列表组件 */
  List: any;
  /** 错误列表组件 */
  ErrorList: any;
  /** useForm Hook */
  useForm: typeof useForm;
  /** 表单Provider */
  Provider: any;
}

/**
 * 创建表单实例的Hook
 * @param form 外部传入的表单实例
 * @returns 表单实例数组
 */
export function useForm<Values = any>(form?: FormInstance<Values>): [FormInstance<Values>];

/**
 * Form List组件
 * 用于动态管理表单字段列表
 */
export const List: any;

/**
 * Form组件
 * 高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式
 */
declare const Form: FormComponent;

export default Form;