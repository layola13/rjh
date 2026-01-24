/**
 * 清理图层命令
 * 用于删除设计中指定图层的所有墙体元素
 * @module CmdCleanupLayer
 */

import { Command } from 'HSApp/Cmd/Command';
import { Layer } from './Layer';
import { SelectionManager } from './SelectionManager';
import { TransactionManager, TransactionRequest } from './TransactionManager';
import { HSFPConstants } from './HSFPConstants';

/**
 * 命令执行上下文接口
 * 提供选择管理器和事务管理器的访问
 */
interface CommandContext {
  /** 选择管理器，用于管理UI中的选择状态 */
  selectionManager: SelectionManager;
  /** 事务管理器，用于管理可撤销/重做的操作 */
  transManager: TransactionManager;
}

/**
 * 命令管理器接口
 * 负责命令的生命周期管理
 */
interface CommandManager {
  /** 标记命令执行完成 */
  complete(cmd: Command): void;
}

/**
 * 清理图层命令类
 * 删除指定图层中的所有墙体元素，该操作不可撤销
 * 
 * @example
 *