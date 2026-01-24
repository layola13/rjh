/**
 * 删除辅助线命令模块
 * @module CmdRemoveAuxiliaryLines
 */

/**
 * 命令参数类型：可以是单个实体或实体数组
 */
export type RemoveAuxiliaryLinesParam = unknown | unknown[];

/**
 * 当前参数返回接口
 */
export interface RemoveAuxiliaryLinesCurrentParams {
  /** 激活的分组类型 */
  activeSection: string;
  /** 激活的分组名称 */
  activeSectionName: string;
  /** 点击统计信息 */
  clicksRatio: {
    /** 操作ID */
    id: string;
    /** 操作名称 */
    name: string;
  };
  /** 是否清除全部 */
  isClearAll: boolean;
}

/**
 * 删除辅助线命令类
 * @description 用于删除户型图中的辅助线实体
 * @extends HSApp.Cmd.Command
 */
export declare class CmdRemoveAuxiliaryLines extends HSApp.Cmd.Command {
  /** 原始参数 */
  private _param: RemoveAuxiliaryLinesParam;
  
  /** 待删除的实体数组 */
  entitys: unknown[];

  /**
   * 构造函数
   * @param param - 要删除的实体或实体数组
   */
  constructor(param: RemoveAuxiliaryLinesParam);

  /**
   * 执行删除辅助线操作
   * @description 创建删除请求并通过事务管理器提交
   */
  onExecute(): void;

  /**
   * 获取命令描述
   * @returns 命令的中文描述
   */
  getDescription(): string;

  /**
   * 判断命令是否为交互式
   * @returns 始终返回 false，表示非交互式命令
   */
  isInteractive(): boolean;

  /**
   * 获取当前命令参数
   * @returns 包含操作分组、统计信息等的参数对象
   */
  getCurrentParams(): RemoveAuxiliaryLinesCurrentParams;
}