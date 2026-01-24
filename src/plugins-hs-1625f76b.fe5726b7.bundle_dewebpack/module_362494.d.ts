/**
 * 编辑模式配置模块
 * 
 * 该模块定义了不同编辑模式与其对应处理器的映射关系
 * 支持的模式包括：编辑模式、只读模式、查看器模式和无权限模式
 */

import { HSApp } from './518193';
import { EditModelHandle } from './632037';
import { ReadonlyModelHandle } from './183175';
import { ViewerModelHandle } from './384375';
import { NoPermissionModelHandle } from './93849';

/**
 * 编辑模式处理器接口
 * 定义了所有编辑模式处理器必须实现的基本结构
 */
export interface IModelHandle {
  /** 处理器名称 */
  readonly name: string;
  /** 初始化处理器 */
  initialize(): void;
  /** 销毁处理器 */
  destroy(): void;
}

/**
 * 编辑模式枚举类型
 */
export type EditModelType = 
  | typeof HSApp.EditStatus.ENUM_EDIT_MODEL.EDIT
  | typeof HSApp.EditStatus.ENUM_EDIT_MODEL.READONLY
  | typeof HSApp.EditStatus.ENUM_EDIT_MODEL.VIEWER
  | typeof HSApp.EditStatus.ENUM_EDIT_MODEL.NO_PERMISSION;

/**
 * 编辑模式配置映射
 * 
 * 将每种编辑模式映射到对应的处理器实例：
 * - EDIT: 可编辑模式，使用 EditModelHandle 处理器
 * - READONLY: 只读模式，使用 ReadonlyModelHandle 处理器
 * - VIEWER: 查看器模式，使用 ViewerModelHandle 处理器
 * - NO_PERMISSION: 无权限模式，使用 NoPermissionModelHandle 处理器
 */
export const config: Record<EditModelType, IModelHandle> = {
  [HSApp.EditStatus.ENUM_EDIT_MODEL.EDIT]: new EditModelHandle(),
  [HSApp.EditStatus.ENUM_EDIT_MODEL.READONLY]: new ReadonlyModelHandle(),
  [HSApp.EditStatus.ENUM_EDIT_MODEL.VIEWER]: new ViewerModelHandle(),
  [HSApp.EditStatus.ENUM_EDIT_MODEL.NO_PERMISSION]: new NoPermissionModelHandle(),
};