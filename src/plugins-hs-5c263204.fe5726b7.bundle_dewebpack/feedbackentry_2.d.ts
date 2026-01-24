/**
 * FeedbackEntry组件 - 反馈表单入口组件
 * 用于渲染和管理反馈表单的各种区块类型
 */

import React from 'react';

/**
 * 表单区块的基础配置接口
 */
interface BlockConfig {
  /** 区块类型 */
  type: string;
  /** 区块名称，用作表单字段key */
  name: string;
  /** 区块显示标签 */
  label: string;
  /** 是否必填 */
  required?: boolean;
  /** 其他扩展属性 */
  [key: string]: unknown;
}

/**
 * 表单提交结果类型
 */
type FormResult = Record<string, unknown>;

/**
 * getValue方法的返回值
 */
interface GetValueResult {
  /** 表单数据结果 */
  formResult: FormResult;
  /** 空字段名称列表 */
  emptyField: string[];
}

/**
 * FeedbackEntry组件的Props
 */
interface FeedbackEntryProps {
  /** 表单区块配置数据数组 */
  data: BlockConfig[];
  
  /** 提交表单回调，返回Promise表示异步提交，resolve(true)表示成功 */
  onSubmit?: (formResult: FormResult) => Promise<boolean> | void;
  
  /** 关闭模态框回调 */
  onClose?: () => void;
  
  /** 导航到反馈列表回调 */
  onNavtoFeedbackList?: () => void;
  
  /** 是否启用导航到反馈列表功能 */
  enableNavtoFeedbackList?: boolean;
}

/**
 * FeedbackEntry组件的State
 */
interface FeedbackEntryState {
  /** 是否禁用提交按钮 */
  disableSubmit: boolean;
}

/**
 * 区块引用类型 - 具有getValue和isEmpty等方法的区块实例
 */
interface BlockRef {
  /** 获取区块的值 */
  getValue: () => Promise<unknown>;
  /** 判断区块是否为空 */
  isEmpty: () => boolean;
  /** 是否扩展数据结构 */
  dataExtend?: () => boolean;
}

/**
 * 字段处理函数映射
 */
type FieldHandlers = Record<string, (value: unknown) => unknown>;

/**
 * 反馈表单入口组件
 * 
 * @description
 * 该组件负责：
 * - 根据配置动态渲染各种类型的表单区块（单选、多选、文本、上传等）
 * - 收集和验证表单数据
 * - 处理表单提交和关闭操作
 * - 提供导航到反馈列表的功能
 * 
 * @example
 *