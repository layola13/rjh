/**
 * 复制命令模块
 * 用于处理编辑器中选中内容的复制操作
 * @module CopyCommand
 */

/**
 * 选中元素的集合接口
 * 表示当前在编辑器中被选中的元素
 */
export interface Selections {
  /** 选中的元素列表 */
  [key: string]: unknown;
}

/**
 * 用户输入插件接口
 * 负责处理用户的输入操作，包括设置JSON数据到编辑器
 */
export interface UserinputPlugin {
  /**
   * 设置JSON数据到指定的编辑器
   * @param editorType - 编辑器类型标识符（如 "editor"）
   * @param data - 要设置的JSON数据
   */
  setJSON(editorType: string, data: unknown): void;
}

/**
 * 平面图对象接口
 * 表示应用程序中的平面图实例
 */
export interface Floorplan {
  /** 平面图相关属性和方法 */
  [key: string]: unknown;
}

/**
 * 应用程序主对象接口
 * 代表整个应用程序的实例
 */
export interface App {
  /** 应用程序相关属性和方法 */
  [key: string]: unknown;
}

/**
 * 命令管理器接口
 * 负责命令的执行、完成等生命周期管理
 */
export interface CommandManager {
  /**
   * 标记命令执行完成
   * @param command - 已完成的命令实例
   */
  complete(command: Command): void;
}

/**
 * 命令基类接口
 * 所有命令都应该继承此基类
 */
export interface Command {
  /** 命令管理器实例 */
  mgr: CommandManager;
  
  /**
   * 执行命令
   */
  onExecute(): void;
  
  /**
   * 接收命令
   */
  onReceive(): void;
  
  /**
   * 判断命令是否可以撤销/重做
   * @returns 如果命令支持撤销/重做则返回true，否则返回false
   */
  canUndoRedo(): boolean;
  
  /**
   * 获取命令的描述信息
   * @returns 命令的文字描述
   */
  getDescription(): string;
  
  /**
   * 获取命令的分类
   * @returns 命令所属的日志组类型
   */
  getCategory(): string;
}

/**
 * 复制命令构造函数参数接口
 */
export interface CopyCommandOptions {
  /** 当前选中的元素集合 */
  selections: Selections;
  
  /** 用户输入插件实例 */
  userinputPlugin: UserinputPlugin;
  
  /** 平面图实例 */
  floorplan: Floorplan;
  
  /** 应用程序实例 */
  app: App;
}

/**
 * 日志组类型常量
 * 定义命令的分类类型
 */
export declare namespace HSFPConstants {
  export enum LogGroupTypes {
    /** 内容操作类型 */
    ContentOperation = "ContentOperation"
  }
}

/**
 * HSApp命名空间
 * 包含应用程序的核心命令系统
 */
export declare namespace HSApp {
  export namespace Cmd {
    /**
     * 命令基类
     * 所有具体命令都应该继承此类
     */
    export class Command {
      /** 命令管理器实例 */
      mgr: CommandManager;
      
      /**
       * 执行命令的抽象方法
       */
      onExecute(): void;
      
      /**
       * 接收命令的抽象方法
       */
      onReceive(): void;
      
      /**
       * 判断命令是否可以撤销/重做
       * @returns 如果命令支持撤销/重做则返回true
       */
      canUndoRedo(): boolean;
      
      /**
       * 获取命令的描述信息
       * @returns 命令的文字描述
       */
      getDescription(): string;
      
      /**
       * 获取命令的分类
       * @returns 命令所属的分类类型
       */
      getCategory(): string;
    }
  }
}

/**
 * 工具函数：获取选中元素的JSON表示
 * @param selections - 选中的元素集合
 * @returns 选中元素的JSON数据
 */
export declare function getSelectedInJSON(selections: Selections): unknown;

/**
 * 复制命令类
 * 继承自HSApp.Cmd.Command，实现复制选中内容到编辑器的功能
 * 
 * @remarks
 * 此命令不支持撤销/重做操作
 * 执行后会将选中的内容转换为JSON格式并设置到用户输入插件中
 * 
 * @example
 *