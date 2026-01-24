/**
 * 图层重命名命令模块
 * @module CmdRenameLayer
 */

import { HSApp } from './path/to/HSApp';

/**
 * 图层重命名命令
 * @description 用于重命名图层的命令类，支持撤销/重做操作
 */
export declare class CmdRenameLayer extends HSApp.Cmd.Command {
    /**
     * 目标图层对象
     * @private
     */
    private _layer: unknown;

    /**
     * 新的图层名称
     * @private
     */
    private _name: string;

    /**
     * 事务请求对象
     * @private
     */
    private _request?: unknown;

    /**
     * 构造函数
     * @param layer - 要重命名的图层对象
     * @param name - 新的图层名称
     */
    constructor(layer: unknown, name: string);

    /**
     * 执行命令
     * @description 创建重命名图层的事务请求并提交
     */
    onExecute(): void;

    /**
     * 清理命令资源
     * @description 命令完成或取消后的清理操作
     */
    onCleanup(): void;

    /**
     * 判断命令是否支持撤销/重做
     * @returns 始终返回 true，表示支持撤销/重做
     */
    canUndoRedo(): boolean;

    /**
     * 获取命令描述
     * @returns 返回 "重命名楼层"
     */
    getDescription(): string;

    /**
     * 判断命令是否为交互式命令
     * @returns 始终返回 true，表示这是交互式命令
     */
    isInteractive(): boolean;

    /**
     * 获取命令所属的日志分类
     * @returns 返回图层操作分类 (LayerOperation)
     */
    getCategory(): HSFPConstants.LogGroupTypes;
}

/**
 * HSFPConstants 常量定义
 * @description 包含系统常量和枚举类型
 */
declare namespace HSFPConstants {
    /**
     * 请求类型枚举
     */
    enum RequestType {
        /** 重命名图层请求 */
        RenameLayer = 'RenameLayer'
    }

    /**
     * 日志分组类型枚举
     */
    enum LogGroupTypes {
        /** 图层操作日志分组 */
        LayerOperation = 'LayerOperation'
    }
}