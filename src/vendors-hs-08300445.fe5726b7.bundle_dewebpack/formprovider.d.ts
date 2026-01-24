import { Context, ReactNode } from 'react';
import { FieldData, FormInstance, ValidateMessages } from 'rc-field-form/lib/interface';

/**
 * 表单变化回调的信息对象
 */
export interface FormChangeInfo {
  /** 发生变化的字段数组 */
  changedFields: FieldData[];
  /** 所有已注册的表单实例映射 */
  forms: Record<string, FormInstance>;
}

/**
 * 表单完成回调的信息对象
 */
export interface FormFinishInfo {
  /** 表单提交的值 */
  values: Record<string, any>;
  /** 所有已注册的表单实例映射 */
  forms: Record<string, FormInstance>;
}

/**
 * FormProvider 上下文的值类型
 */
export interface FormProviderContextValue {
  /** 验证消息模板配置 */
  validateMessages?: ValidateMessages;
  
  /**
   * 触发表单变化事件
   * @param formName - 表单名称
   * @param changedFields - 变化的字段数据
   */
  triggerFormChange: (formName: string, changedFields: FieldData[]) => void;
  
  /**
   * 触发表单完成事件（提交成功）
   * @param formName - 表单名称
   * @param values - 表单值
   */
  triggerFormFinish: (formName: string, values: Record<string, any>) => void;
  
  /**
   * 注册表单实例到 Provider
   * @param formName - 表单名称
   * @param formInstance - 表单实例
   */
  registerForm: (formName: string, formInstance: FormInstance) => void;
  
  /**
   * 从 Provider 注销表单实例
   * @param formName - 表单名称
   */
  unregisterForm: (formName: string) => void;
}

/**
 * FormProvider 组件的属性
 */
export interface FormProviderProps {
  /** 全局验证消息模板 */
  validateMessages?: ValidateMessages;
  
  /**
   * 任何表单字段变化时的回调
   * @param formName - 变化的表单名称
   * @param info - 变化信息
   */
  onFormChange?: (formName: string, info: FormChangeInfo) => void;
  
  /**
   * 任何表单提交成功时的回调
   * @param formName - 提交的表单名称
   * @param info - 完成信息
   */
  onFormFinish?: (formName: string, info: FormFinishInfo) => void;
  
  /** 子组件 */
  children?: ReactNode;
}

/**
 * FormProvider 上下文，用于管理多个表单实例
 * 提供统一的验证消息配置和表单生命周期事件监听
 */
declare const FormProviderContext: Context<FormProviderContextValue>;

/**
 * FormProvider 组件
 * 用于在组件树中提供表单管理上下文，支持：
 * - 集中管理多个表单实例
 * - 统一配置验证消息
 * - 监听所有子表单的变化和提交事件
 * 
 * @example
 *