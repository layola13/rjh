/**
 * 命令类型定义模块
 * 
 * 该模块导出一个包含所有命令类型字符串的冻结对象,
 * 用于标识系统中不同类型的命令操作
 */

/**
 * 命令类型枚举对象
 * 
 * 包含所有可用的命令类型标识符，包括：
 * - 序列命令: 按顺序执行的命令集合
 * - 组合命令: 组合多个命令的复合操作
 * - 户外命令类型: 来自 OutdoorCommandTypes 的扩展命令
 * - 其他导入的命令类型集合
 * 
 * @remarks
 * 该对象已被冻结（Object.freeze），无法在运行时修改
 */
export interface CommandTypes {
  /** 序列命令类型 - 用于按顺序执行多个命令 */
  readonly Sequence: 'hsw.cmd.SequenceCommand';
  
  /** 组合命令类型 - 用于组合多个命令为单一操作 */
  readonly Composite: 'hsw.cmd.CompositeCommand';
  
  /** 其他命令类型继承自导入的模块 */
  readonly [key: string]: string;
}

/**
 * 默认导出的命令类型常量对象
 * 
 * 这是一个不可变的对象，包含所有注册的命令类型标识符
 * 
 * @example
 *