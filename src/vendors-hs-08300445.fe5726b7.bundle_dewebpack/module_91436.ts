/**
 * Form.List 组件类型定义
 * 用于动态管理表单字段列表
 */

/**
 * 表单字段元数据
 */
export interface FieldData {
  /** 字段名称（在列表中的索引） */
  name: number;
  /** 唯一标识符 */
  key: number;
  /** 标识该字段是否为列表字段 */
  isListField: true;
}

/**
 * 列表操作接口
 */
export interface ListOperations {
  /**
   * 添加新的列表项
   * @param value - 要添加的值
   * @param index - 可选，插入位置索引。如果不提供，则追加到末尾
   */
  add: (value?: any, index?: number) => void;

  /**
   * 移除列表项
   * @param index - 要移除的索引或索引数组
   */
  remove: (index: number | number[]) => void;

  /**
   * 移动列表项位置
   * @param fromIndex - 源索引
   * @param toIndex - 目标索引
   */
  move: (fromIndex: number, toIndex: number) => void;
}

/**
 * 表单字段元信息
 */
export interface FieldMeta {
  /** 表单错误信息列表 */
  errors?: string[];
  /** 警告信息列表 */
  warnings?: string[];
  /** 字段是否正在验证 */
  validating?: boolean;
  /** 字段是否已被触碰 */
  touched?: boolean;
}

/**
 * 验证规则
 */
export interface Rule {
  /** 是否必填 */
  required?: boolean;
  /** 错误提示信息 */
  message?: string;
  /** 自定义验证函数 */
  validator?: (rule: Rule, value: any) => Promise<void> | void;
  /** 验证类型 */
  type?: string;
  /** 最小长度 */
  min?: number;
  /** 最大长度 */
  max?: number;
  /** 正则表达式模式 */
  pattern?: RegExp;
  [key: string]: any;
}

/**
 * 触发验证的时机
 */
export type ValidateTrigger = string | string[];

/**
 * Form.List 子组件渲染函数的参数
 * @param fields - 字段元数据数组
 * @param operations - 列表操作方法集合
 * @param meta - 表单字段元信息
 */
export type ListChildrenRenderFunction = (
  fields: FieldData[],
  operations: ListOperations,
  meta: FieldMeta
) => React.ReactNode;

/**
 * Form.List 组件属性
 */
export interface FormListProps {
  /**
   * 字段名称路径
   * 支持字符串或字符串数组（用于嵌套路径）
   */
  name: string | number | (string | number)[];

  /**
   * 子组件渲染函数
   * 必须为函数类型
   */
  children: ListChildrenRenderFunction;

  /**
   * 初始值
   * 默认为空数组
   */
  initialValue?: any[];

  /**
   * 验证规则数组
   */
  rules?: Rule[];

  /**
   * 触发验证的时机
   * 如 'onChange'、'onBlur' 等
   */
  validateTrigger?: ValidateTrigger;
}

/**
 * Form.List 组件
 * 用于管理动态表单字段列表，支持添加、删除、移动等操作
 * 
 * @example
 *