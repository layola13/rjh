import type { ReactNode, ReactElement } from 'react';
import type { FormListFieldData, FormListOperation } from 'rc-field-form/lib/List';

/**
 * Form.List 字段数据，包含字段键用于识别
 */
export interface FormListFieldDataWithKey extends FormListFieldData {
  /** 字段的唯一键，用于 React key 属性 */
  fieldKey: number;
  /** 字段名称 */
  name: number;
  /** 字段的唯一键标识符 */
  key: number;
}

/**
 * Form.List 元信息，包含错误信息
 */
export interface FormListMeta {
  /** 表单列表中的错误信息数组 */
  errors: ReactNode[];
  /** 表单列表中的警告信息数组 */
  warnings?: ReactNode[];
}

/**
 * Form.List 渲染函数的参数类型
 */
export type FormListChildrenFunction = (
  /** 字段数组，每个字段包含 name、key 和 fieldKey */
  fields: FormListFieldDataWithKey[],
  /** 操作方法集合，用于添加、删除、移动字段 */
  operation: FormListOperation,
  /** 元信息，包含错误和警告 */
  meta: FormListMeta
) => ReactNode;

/**
 * Form.List 组件的属性接口
 */
export interface FormListProps {
  /**
   * 字段名称路径，支持数组形式表示嵌套路径
   * @example 'users' 或 ['user', 'list']
   */
  name: string | number | (string | number)[];

  /**
   * 渲染函数，接收字段数组、操作方法和元信息
   */
  children: FormListChildrenFunction;

  /**
   * 自定义类名前缀
   * @default 'ant-form'
   */
  prefixCls?: string;

  /**
   * 初始值数组
   */
  initialValue?: unknown[];

  /**
   * 字段验证规则
   */
  rules?: unknown[];
}

/**
 * FormItemPrefixContext 的值类型
 */
export interface FormItemPrefixContextValue {
  /** 表单项的类名前缀 */
  prefixCls: string;
  /** 表单项的状态，如 'error'、'warning'、'success' 等 */
  status: 'error' | 'warning' | 'success' | 'validating' | '';
}

/**
 * Form.List 组件
 * 
 * 用于管理数组类型的表单字段，支持动态增删字段
 * 
 * @example
 *