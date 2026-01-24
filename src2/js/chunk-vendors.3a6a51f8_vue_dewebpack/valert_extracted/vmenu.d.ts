/**
 * VMenu 组件模块
 * 提供菜单组件的类型定义和默认导出
 * @module VMenu
 */

/**
 * VMenu 组件类型定义
 * 从 ./VMenu.ts 导入的菜单组件
 */
export type VMenu = typeof import('./VMenu').default;

/**
 * VMenu 组件实例类型
 * 表示 VMenu 组件的实例化对象
 */
export type VMenuInstance = InstanceType<typeof import('./VMenu').default>;

/**
 * VMenu 命名导出
 * 菜单组件的主要导出
 */
export { default as VMenu } from './VMenu';

/**
 * VMenu 默认导出
 * 与命名导出相同，提供便捷的默认导入方式
 */
export { default } from './VMenu';