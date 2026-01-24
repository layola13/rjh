/**
 * Form组件模块
 * 提供表单管理功能，包括字段、列表、表单钩子和上下文提供者
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 表单实例接口
 * 用于管理表单状态和操作
 */
export interface FormInstance<Values = any> {
  /** 获取字段值 */
  getFieldValue: (name: NamePath) => any;
  /** 获取所有字段值 */
  getFieldsValue: (nameList?: NamePath[] | true, filterFunc?: (meta: Meta) => boolean) => Values;
  /** 设置字段值 */
  setFieldValue: (name: NamePath, value: any) => void;
  /** 设置多个字段值 */
  setFieldsValue: (values: Partial<Values>) => void;
  /** 验证字段 */
  validateFields: (nameList?: NamePath[]) => Promise<Values>;
  /** 重置字段 */
  resetFields: (fields?: NamePath[]) => void;
  /** 提交表单 */
  submit: () => void;
}

/**
 * 字段名称路径类型
 * 支持字符串、数字或它们的数组形式
 */
export type NamePath = string | number | (string | number)[];

/**
 * 字段元信息
 */
export interface Meta {
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
  warnings?: string[];
  name: NamePath;
}

/**
 * 字段组件属性
 */
export interface FieldProps {
  /** 字段名称 */
  name: NamePath;
  /** 验证规则 */
  rules?: Rule[];
  /** 子元素渲染函数或React节点 */
  children?: React.ReactNode | ((control: any, meta: Meta, form: FormInstance) => React.ReactNode);
  /** 依赖的其他字段 */
  dependencies?: NamePath[];
  /** 是否保留值在卸载后 */
  preserve?: boolean;
  /** 初始值 */
  initialValue?: any;
}

/**
 * 验证规则接口
 */
export interface Rule {
  /** 是否必填 */
  required?: boolean;
  /** 错误提示信息 */
  message?: string;
  /** 自定义验证函数 */
  validator?: (rule: Rule, value: any) => Promise<void> | void;
  /** 字段类型 */
  type?: 'string' | 'number' | 'boolean' | 'email' | 'url' | 'array' | 'object';
  /** 最小长度 */
  min?: number;
  /** 最大长度 */
  max?: number;
  /** 正则表达式 */
  pattern?: RegExp;
}

/**
 * 表单提供者属性
 */
export interface FormProviderProps {
  /** 表单上下文 */
  children?: React.ReactNode;
}

/**
 * 列表字段操作接口
 */
export interface ListOperations {
  /** 添加项 */
  add: (defaultValue?: any, insertIndex?: number) => void;
  /** 移除项 */
  remove: (index: number | number[]) => void;
  /** 移动项 */
  move: (from: number, to: number) => void;
}

/**
 * 列表字段属性
 */
export interface ListProps {
  /** 字段名称 */
  name: NamePath;
  /** 子元素渲染函数 */
  children: (fields: ListField[], operations: ListOperations, meta: { errors?: React.ReactNode[] }) => React.ReactNode;
  /** 初始值 */
  initialValue?: any[];
}

/**
 * 列表字段项
 */
export interface ListField {
  /** 唯一键 */
  key: number;
  /** 字段名称 */
  name: number;
  /** 是否为列表字段 */
  isListField: boolean;
}

/**
 * 表单配置选项
 */
export interface FormConfig<Values = any> {
  /** 初始值 */
  initialValues?: Partial<Values>;
  /** 字段值变化回调 */
  onValuesChange?: (changedValues: Partial<Values>, allValues: Values) => void;
  /** 表单提交回调 */
  onFinish?: (values: Values) => void;
  /** 表单提交失败回调 */
  onFinishFailed?: (errorInfo: ValidateErrorEntity<Values>) => void;
  /** 是否保留卸载字段的值 */
  preserve?: boolean;
  /** 验证触发时机 */
  validateTrigger?: string | string[];
}

/**
 * 验证错误实体
 */
export interface ValidateErrorEntity<Values = any> {
  /** 所有字段值 */
  values: Values;
  /** 错误字段信息 */
  errorFields: { name: NamePath; errors: string[] }[];
  /** 外部错误 */
  outOfDate: boolean;
}

/**
 * 表单组件属性
 */
export interface FormProps<Values = any> extends FormConfig<Values> {
  /** 表单实例 */
  form?: FormInstance<Values>;
  /** 表单名称 */
  name?: string;
  /** 子元素 */
  children?: React.ReactNode;
  /** 表单布局 */
  layout?: 'horizontal' | 'vertical' | 'inline';
  /** 标签列布局 */
  labelCol?: object;
  /** 控件列布局 */
  wrapperCol?: object;
}

/**
 * 表单组件类型
 */
export interface FormComponent<Values = any> extends ForwardRefExoticComponent<FormProps<Values> & RefAttributes<FormInstance<Values>>> {
  /** 表单提供者组件 */
  FormProvider: React.FC<FormProviderProps>;
  /** 字段组件 */
  Field: React.FC<FieldProps>;
  /** 列表字段组件 */
  List: React.FC<ListProps>;
  /** 创建表单实例钩子 */
  useForm: <T = Values>(form?: FormInstance<T>) => [FormInstance<T>];
}

/**
 * 字段组件
 * 用于管理单个表单字段
 */
export declare const Field: React.FC<FieldProps>;

/**
 * 表单提供者组件
 * 用于在多个表单之间共享数据
 */
export declare const FormProvider: React.FC<FormProviderProps>;

/**
 * 列表字段组件
 * 用于管理动态表单字段列表
 */
export declare const List: React.FC<ListProps>;

/**
 * 创建表单实例钩子
 * @param form - 可选的外部表单实例
 * @returns 表单实例数组
 * 
 * @example
 *