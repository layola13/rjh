import { FormInstance } from 'rc-field-form';
import { NamePath, ScrollOptions, InternalFormInstance } from './types';

/**
 * 字段实例映射的引用类型
 */
interface FieldInstanceMap {
  [key: string]: any;
}

/**
 * 扩展的表单实例接口，包含内部方法
 */
export interface ExtendedFormInstance extends FormInstance {
  /** 内部使用的方法和属性 */
  __INTERNAL__: {
    /** 字段名称 */
    name?: string;
    /** 
     * 注册或注销字段实例的引用
     * @param fieldName - 字段名称路径
     * @returns 注册/注销函数
     */
    itemRef: (fieldName: NamePath) => (instance: any) => void;
  };

  /**
   * 滚动到指定字段
   * @param fieldName - 字段名称路径
   * @param options - 滚动选项配置
   */
  scrollToField: (fieldName: NamePath, options?: ScrollOptions) => void;

  /**
   * 获取字段实例
   * @param fieldName - 字段名称路径
   * @returns 字段实例
   */
  getFieldInstance: (fieldName: NamePath) => any;
}

/**
 * 使用表单实例的钩子参数
 */
export interface UseFormInstanceOptions {
  /** 外部传入的表单实例 */
  form?: FormInstance;
}

/**
 * 自定义Hook：创建或扩展表单实例，添加滚动和字段引用管理功能
 * 
 * @param externalForm - 可选的外部表单实例
 * @returns 包含扩展功能的表单实例数组
 * 
 * @example
 *