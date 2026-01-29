/**
 * Form组件模块
 * 提供表单管理的核心功能，包括Field、List、FormProvider和useForm
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 表单字段属性接口
 */
export interface FieldProps<ValueType = any> {
  /** 字段名称 */
  name: string | string[];
  /** 字段值变化回调 */
  onChange?: (value: ValueType) => void;
  /** 字段值 */
  value?: ValueType;
  /** 初始值 */
  initialValue?: ValueType;
  /** 校验规则 */
  rules?: FieldRule[];
  /** 依赖的其他字段 */
  dependencies?: string[];
  /** 子节点 */
  children?: React.ReactNode;
  [key: string]: any;
}

/**
 * 表单字段验证规则
 */
export interface FieldRule {
  /** 是否必填 */
  required?: boolean;
  /** 错误提示信息 */
  message?: string;
  /** 自定义校验函数 */
  validator?: (rule: FieldRule, value: any) => Promise<void> | void;
  /** 正则表达式 */
  pattern?: RegExp;
  /** 最小长度 */
  min?: number;
  /** 最大长度 */
  max?: number;
}

/**
 * 表单字段组件
 */
export const Field: React.ComponentType<FieldProps>;

/**
 * FormProvider上下文属性
 */
export interface FormProviderProps {
  /** 子节点 */
  children?: React.ReactNode;
  /** 表单实例 */
  form?: FormInstance;
}

/**
 * 表单上下文提供者组件
 * 用于在组件树中共享表单实例
 */
export const FormProvider: React.FC<FormProviderProps>;

/**
 * 表单列表项属性
 */
export interface ListProps {
  /** 字段名称 */
  name: string | string[];
  /** 初始值 */
  initialValue?: any[];
  /** 子节点渲染函数 */
  children?: (fields: ListField[], operation: ListOperation) => React.ReactNode;
}

/**
 * 列表字段项
 */
export interface ListField {
  /** 字段key */
  key: number;
  /** 字段名称 */
  name: number;
  /** 完整路径 */
  fieldKey: number;
}

/**
 * 列表操作方法
 */
export interface ListOperation {
  /** 添加新项 */
  add: (defaultValue?: any, insertIndex?: number) => void;
  /** 移除指定项 */
  remove: (index: number | number[]) => void;
  /** 移动项位置 */
  move: (from: number, to: number) => void;
}

/**
 * 表单列表组件
 * 用于管理动态表单字段数组
 */
export const List: React.ComponentType<ListProps>;

/**
 * 表单实例接口
 */
export interface FormInstance<Values = any> {
  /** 获取字段值 */
  getFieldValue: (name: string | string[]) => any;
  /** 获取所有字段值 */
  getFieldsValue: (nameList?: (string | string[])[] | true) => Values;
  /** 设置字段值 */
  setFieldValue: (name: string | string[], value: any) => void;
  /** 设置多个字段值 */
  setFieldsValue: (values: Partial<Values>) => void;
  /** 校验字段 */
  validateFields: (nameList?: (string | string[])[]) => Promise<Values>;
  /** 重置字段 */
  resetFields: (fields?: (string | string[])[]) => void;
  /** 提交表单 */
  submit: () => void;
  /** 获取字段错误 */
  getFieldError: (name: string | string[]) => string[];
  /** 获取所有字段错误 */
  getFieldsError: (nameList?: (string | string[])[]) => FieldError[];
  /** 判断字段是否被修改 */
  isFieldTouched: (name: string | string[]) => boolean;
  /** 判断是否有字段被修改 */
  isFieldsTouched: (nameList?: (string | string[])[], allTouched?: boolean) => boolean;
}

/**
 * 字段错误信息
 */
export interface FieldError {
  /** 字段名称 */
  name: (string | number)[];
  /** 错误信息列表 */
  errors: string[];
}

/**
 * useForm Hook配置
 */
export interface UseFormConfig<Values = any> {
  /** 初始值 */
  initialValues?: Partial<Values>;
  /** 表单名称 */
  name?: string;
}

/**
 * useForm Hook
 * 创建表单实例的Hook
 * 
 * @template Values - 表单值类型
 * @param config - 表单配置
 * @returns 表单实例
 * 
 * @example
 *