/**
 * Form.List 组件类型定义
 * 用于管理表单中的动态列表字段
 */

import type { ReactNode, ReactElement } from 'react';
import type { Rule } from './Rule';
import type { ValidateTrigger } from './Field';
import type { NamePath, StoreValue } from './Store';
import type { Meta } from './FieldContext';

/**
 * 列表字段项的元数据
 */
export interface ListFieldData {
  /** 字段在列表中的索引位置 */
  name: number;
  /** 用于 React 列表渲染的唯一键 */
  key: number;
  /** 标识这是一个列表字段 */
  isListField: true;
}

/**
 * 列表操作方法集合
 */
export interface ListOperations {
  /**
   * 添加新的列表项
   * @param defaultValue - 新项的初始值
   * @param insertIndex - 可选的插入位置，不传则追加到末尾
   */
  add: (defaultValue?: StoreValue, insertIndex?: number) => void;

  /**
   * 移除指定位置的列表项
   * @param index - 要移除的索引，可以是单个索引或索引数组
   */
  remove: (index: number | number[]) => void;

  /**
   * 移动列表项的位置
   * @param from - 源位置索引
   * @param to - 目标位置索引
   */
  move: (from: number, to: number) => void;
}

/**
 * Form.List 组件的属性接口
 */
export interface FormListProps {
  /**
   * 列表字段的名称路径
   */
  name: NamePath;

  /**
   * 列表的初始值，应为数组
   */
  initialValue?: StoreValue[];

  /**
   * 渲染函数，接收字段列表、操作方法和元数据
   * @param fields - 当前的字段列表数据
   * @param operations - 列表操作方法（add/remove/move）
   * @param meta - 字段的元数据信息
   * @returns 渲染的 React 节点
   */
  children: (
    fields: ListFieldData[],
    operations: ListOperations,
    meta: Meta
  ) => ReactNode;

  /**
   * 列表级别的验证规则
   */
  rules?: Rule[];

  /**
   * 触发验证的时机
   */
  validateTrigger?: ValidateTrigger | ValidateTrigger[];
}

/**
 * Form.List 组件
 * 用于处理表单中的动态数组字段，支持添加、删除、移动等操作
 * 
 * @example
 *