/**
 * Ant Design Form 组件模块
 * 提供表单管理、验证和布局功能
 */

import type { ReactNode, ComponentType } from 'react';

/**
 * 表单实例接口
 * 提供表单字段的操作和验证方法
 */
export interface FormInstance<Values = any> {
  /** 获取所有字段值 */
  getFieldsValue(): Values;
  /** 获取指定字段值 */
  getFieldValue(name: string | string[]): any;
  /** 设置字段值 */
  setFieldsValue(values: Partial<Values>): void;
  /** 重置表单字段 */
  resetFields(fields?: string[]): void;
  /** 验证字段 */
  validateFields(): Promise<Values>;
  /** 提交表单 */
  submit(): void;
}

/**
 * 表单配置项接口
 */
export interface FormProps<Values = any> {
  /** 表单名称 */
  name?: string;
  /** 表单初始值 */
  initialValues?: Partial<Values>;
  /** 表单实例 */
  form?: FormInstance<Values>;
  /** 提交回调 */
  onFinish?: (values: Values) => void;
  /** 提交失败回调 */
  onFinishFailed?: (errorInfo: any) => void;
  /** 字段值变化回调 */
  onValuesChange?: (changedValues: Partial<Values>, allValues: Values) => void;
  /** 布局模式 */
  layout?: 'horizontal' | 'vertical' | 'inline';
  /** 子元素 */
  children?: ReactNode;
}

/**
 * 表单项配置接口
 */
export interface FormItemProps {
  /** 字段名 */
  name?: string | string[];
  /** 标签文本 */
  label?: ReactNode;
  /** 验证规则 */
  rules?: FormRule[];
  /** 初始值 */
  initialValue?: any;
  /** 是否必填 */
  required?: boolean;
  /** 子元素 */
  children?: ReactNode;
}

/**
 * 表单验证规则接口
 */
export interface FormRule {
  /** 是否必填 */
  required?: boolean;
  /** 错误提示信息 */
  message?: string;
  /** 字段类型 */
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object';
  /** 最小长度 */
  min?: number;
  /** 最大长度 */
  max?: number;
  /** 正则表达式 */
  pattern?: RegExp;
  /** 自定义验证函数 */
  validator?: (rule: FormRule, value: any) => Promise<void>;
}

/**
 * 表单列表配置接口
 */
export interface FormListProps {
  /** 字段名 */
  name: string | string[];
  /** 渲染函数 */
  children: (fields: FormListFieldData[], operation: FormListOperation) => ReactNode;
}

/**
 * 表单列表字段数据
 */
export interface FormListFieldData {
  /** 字段键 */
  key: number;
  /** 字段名 */
  name: number;
  /** 字段路径 */
  fieldKey: number;
}

/**
 * 表单列表操作方法
 */
export interface FormListOperation {
  /** 添加字段 */
  add: (defaultValue?: any, insertIndex?: number) => void;
  /** 移除字段 */
  remove: (index: number | number[]) => void;
  /** 移动字段 */
  move: (from: number, to: number) => void;
}

/**
 * 错误列表配置接口
 */
export interface ErrorListProps {
  /** 错误信息数组 */
  errors?: ReactNode[];
  /** 错误字段信息 */
  fieldErrors?: FieldError[];
}

/**
 * 字段错误信息
 */
export interface FieldError {
  /** 字段名 */
  name: string[];
  /** 错误信息 */
  errors: string[];
}

/**
 * 表单提供者配置接口
 */
export interface FormProviderProps {
  /** 表单提交回调 */
  onFormChange?: (name: string, info: FormChangeInfo) => void;
  /** 表单完成回调 */
  onFormFinish?: (name: string, info: FormFinishInfo) => void;
  /** 子元素 */
  children?: ReactNode;
}

/**
 * 表单变化信息
 */
export interface FormChangeInfo {
  /** 变化的字段 */
  changedFields: FieldData[];
  /** 所有字段 */
  forms: Record<string, FormInstance>;
}

/**
 * 表单完成信息
 */
export interface FormFinishInfo {
  /** 表单值 */
  values: any;
  /** 所有表单实例 */
  forms: Record<string, FormInstance>;
}

/**
 * 字段数据接口
 */
export interface FieldData {
  /** 字段名 */
  name: string[];
  /** 字段值 */
  value?: any;
  /** 是否已触碰 */
  touched?: boolean;
  /** 验证状态 */
  validating?: boolean;
  /** 错误信息 */
  errors?: string[];
}

/**
 * useForm Hook 返回值
 */
export type UseFormReturnType = [FormInstance];

/**
 * 表单 Hook
 * @returns 返回表单实例数组
 * @example
 * const [form] = useForm();
 */
export function useForm<Values = any>(): UseFormReturnType;

/**
 * 表单组件类
 */
declare class FormComponent extends React.Component<FormProps> {
  /** 表单项组件 */
  static Item: ComponentType<FormItemProps>;
  /** 表单列表组件 */
  static List: ComponentType<FormListProps>;
  /** 错误列表组件 */
  static ErrorList: ComponentType<ErrorListProps>;
  /** useForm Hook */
  static useForm: typeof useForm;
  /** 表单提供者组件 */
  static Provider: ComponentType<FormProviderProps>;
  /** 
   * 已废弃的 create 方法
   * @deprecated 该方法在 antd v4 中已移除，请使用 useForm Hook 或 @ant-design/compatible
   */
  static create: () => void;
}

/**
 * 导出表单组件及其子组件
 * 
 * @remarks
 * Form 组件用于数据录入、校验和提交
 * 
 * @example
 *