/**
 * Form.Item 组件类型定义
 * 用于表单项的布局、验证和状态管理
 */

import type { ReactNode, ReactElement, CSSProperties } from 'react';
import type { Rule, FieldData, Meta, InternalNamePath, NamePath, StoreValue } from 'rc-field-form/lib/interface';

/**
 * 表单验证状态类型
 */
export type ValidateStatus = 'success' | 'warning' | 'error' | 'validating' | '';

/**
 * 必填标记显示类型
 */
export type RequiredMark = boolean | 'optional';

/**
 * 标签对齐方式
 */
export type LabelAlign = 'left' | 'right';

/**
 * 栅格布局配置
 */
export interface ColProps {
  span?: number;
  offset?: number;
  push?: number;
  pull?: number;
  order?: number;
  flex?: string | number;
  xs?: number | { span?: number; offset?: number };
  sm?: number | { span?: number; offset?: number };
  md?: number | { span?: number; offset?: number };
  lg?: number | { span?: number; offset?: number };
  xl?: number | { span?: number; offset?: number };
  xxl?: number | { span?: number; offset?: number };
}

/**
 * Tooltip 配置
 */
export interface TooltipProps {
  title?: ReactNode;
  icon?: ReactNode;
}

/**
 * 表单项渲染函数的参数
 */
export interface FormItemRenderMeta {
  errors: string[];
  warnings: string[];
  touched: boolean;
  validating: boolean;
  name: InternalNamePath;
}

/**
 * 表单项子元素渲染函数类型
 */
export type FormItemChildren = 
  | ReactNode 
  | ((form: FormInstance) => ReactNode);

/**
 * 表单实例接口
 */
export interface FormInstance {
  getFieldValue: (name: NamePath) => StoreValue;
  getFieldsValue: (nameList?: NamePath[] | true, filterFunc?: (meta: Meta) => boolean) => Record<string, StoreValue>;
  getFieldError: (name: NamePath) => string[];
  getFieldsError: (nameList?: NamePath[]) => { name: InternalNamePath; errors: string[] }[];
  isFieldTouched: (name: NamePath) => boolean;
  isFieldsTouched: (nameList?: NamePath[], allTouched?: boolean) => boolean;
  isFieldValidating: (name: NamePath) => boolean;
  resetFields: (fields?: NamePath[]) => void;
  setFields: (fields: FieldData[]) => void;
  setFieldsValue: (values: Record<string, StoreValue>) => void;
  validateFields: (nameList?: NamePath[]) => Promise<Record<string, StoreValue>>;
  submit: () => void;
}

/**
 * Form.Item 组件属性接口
 */
export interface FormItemProps<Values = unknown> {
  /**
   * 字段名，支持数组形式用于嵌套字段
   */
  name?: NamePath;

  /**
   * 配合 Form.List 使用的字段键
   */
  fieldKey?: React.Key | React.Key[];

  /**
   * 是否隐藏 Label、校验信息等，只保留字段绑定
   */
  noStyle?: boolean;

  /**
   * 依赖的其他字段，当依赖字段更新时重新渲染
   */
  dependencies?: NamePath[];

  /**
   * 自定义类名前缀
   */
  prefixCls?: string;

  /**
   * 自定义样式
   */
  style?: CSSProperties;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 自定义字段更新逻辑
   */
  shouldUpdate?: boolean | ((prevValues: Values, currentValues: Values) => boolean);

  /**
   * 是否显示校验反馈图标
   */
  hasFeedback?: boolean;

  /**
   * 自定义提示信息，会覆盖校验规则中的 message
   */
  help?: ReactNode;

  /**
   * 校验规则
   */
  rules?: Rule[];

  /**
   * 自定义校验状态
   */
  validateStatus?: ValidateStatus;

  /**
   * 子元素，可以是 React 元素或渲染函数
   */
  children?: FormItemChildren;

  /**
   * 是否必填，仅影响样式显示
   */
  required?: boolean;

  /**
   * 标签文本
   */
  label?: ReactNode;

  /**
   * 默认验证信息的变量，用于模板化 rules.message
   */
  messageVariables?: Record<string, string>;

  /**
   * 设置收集字段值变更的时机
   * @default 'onChange'
   */
  trigger?: string;

  /**
   * 设置字段校验的时机
   */
  validateTrigger?: string | string[];

  /**
   * 是否隐藏表单项（依然收集和校验字段）
   */
  hidden?: boolean;

  /**
   * 标签文本对齐方式
   */
  labelAlign?: LabelAlign;

  /**
   * label 标签布局
   */
  labelCol?: ColProps;

  /**
   * 输入控件布局
   */
  wrapperCol?: ColProps;

  /**
   * 为子元素添加额外的属性
   */
  getValueFromEvent?: (...args: unknown[]) => StoreValue;

  /**
   * 自定义字段值到子元素的映射
   */
  getValueProps?: (value: StoreValue) => Record<string, unknown>;

  /**
   * 设置子元素的 id 属性
   */
  htmlFor?: string;

  /**
   * 字段 ID，默认自动生成
   */
  id?: string;

  /**
   * 字段初始值
   */
  initialValue?: StoreValue;

  /**
   * 是否为列表字段（内部使用）
   * @internal
   */
  isListField?: boolean;

  /**
   * 字段值的转换器
   */
  normalize?: (value: StoreValue, prevValue: StoreValue, allValues: Values) => StoreValue;

  /**
   * 当字段被删除时是否保留字段值
   * @default true
   */
  preserve?: boolean;

  /**
   * 配置提示信息的 tooltip
   */
  tooltip?: ReactNode | TooltipProps;

  /**
   * 是否按顺序校验
   */
  validateFirst?: boolean;

  /**
   * 子节点的值的属性名
   * @default 'value'
   */
  valuePropName?: string;

  /**
   * 是否显示冒号
   */
  colon?: boolean;

  /**
   * 额外的提示信息
   */
  extra?: ReactNode;

  /**
   * 必填标记的显示方式
   */
  requiredMark?: RequiredMark;

  /**
   * 内部渲染函数（内部使用）
   * @internal
   */
  _internalItemRender?: {
    mark: string;
    render: (
      props: FormItemProps<Values> & { fieldId: string; isRequired: boolean },
      children: ReactNode
    ) => ReactNode;
  };
}

/**
 * Form.Item 组件
 */
declare const FormItem: <Values = unknown>(
  props: FormItemProps<Values> & { children?: FormItemChildren }
) => ReactElement;

export default FormItem;