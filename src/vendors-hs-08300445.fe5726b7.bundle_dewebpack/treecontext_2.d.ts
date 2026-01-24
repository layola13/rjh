import { Context } from 'react';

/**
 * Tree组件的上下文类型定义
 * 用于在Tree组件树中共享状态和方法
 */
export interface TreeContextValue {
  // 根据实际使用情况定义具体属性
  // 示例属性（需根据实际代码调整）:
  // selectedKeys?: string[];
  // expandedKeys?: string[];
  // onSelect?: (keys: string[]) => void;
  // onExpand?: (keys: string[]) => void;
  [key: string]: unknown;
}

/**
 * Tree组件的React Context
 * 允许子组件访问树的共享状态和操作方法
 * 
 * @remarks
 * 初始值为null，实际使用时应由TreeProvider提供具体值
 */
export declare const TreeContext: Context<TreeContextValue | null>;