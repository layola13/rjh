/**
 * 房间复制粘贴命令模块
 * 提供在平面图中复制和粘贴房间的功能
 * @module CmdCopyPasteRooms
 * @original-id 804488
 */

import type { HSCore } from '../core';
import type { HSApp } from '../app';
import type { HSFPConstants } from '../constants';
import type { CopyPasteRoomsGizmo } from './CopyPasteRoomsGizmo';

/**
 * 复制的房间数据接口
 */
export interface CopiedRoomsData {
  /** 房间几何数据 */
  rooms: unknown[];
  /** 楼板数据 */
  slab?: unknown;
  /** 其他复制的元数据 */
  metadata?: Record<string, unknown>;
}

/**
 * 平移向量接口
 */
export interface Translation {
  /** X轴偏移 */
  x: number;
  /** Y轴偏移 */
  y: number;
  /** Z轴偏移（可选） */
  z?: number;
}

/**
 * 命令接收的消息数据接口
 */
export interface CommandReceiveData {
  /** 鼠标事件 */
  event?: MouseEvent;
  /** 房间列表 */
  rooms?: HSCore.Model.Floor[];
  /** 楼板数据 */
  slab?: unknown;
  /** 平移向量 */
  translation?: Translation;
}

/**
 * 会话接口
 */
export interface TransactionSession {
  /** 提交会话 */
  commit(): void;
  /** 回滚会话 */
  rollback(): void;
}

/**
 * 2D画布接口
 */
export interface Canvas2D {
  /** 上下文 */
  context: unknown;
  /** Gizmo管理器 */
  gizmoManager: {
    addGizmo(gizmo: CopyPasteRoomsGizmo): void;
    removeGizmo(gizmo: CopyPasteRoomsGizmo): void;
  };
  /** 显示层 */
  displayLayers: {
    temp: unknown;
  };
}

/**
 * 命令管理器接口
 */
export interface CommandManager {
  /** 取消命令 */
  cancel(command: CmdCopyPasteRooms): void;
  /** 完成命令 */
  complete(command: CmdCopyPasteRooms): void;
}

/**
 * 房间复制粘贴命令类
 * 继承自 HSApp.Cmd.Command，实现房间的复制和粘贴功能
 * 
 * @example
 *