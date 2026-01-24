/**
 * 改变梁类型的命令类
 * 用于在主梁和次梁之间切换
 */
export declare class CmdChangeBeamType extends HSApp.Cmd.Command {
    /**
     * 当前梁对象
     */
    private beam: unknown;

    /**
     * 事务管理器实例
     */
    private transMgr: unknown;

    /**
     * 标识是否为主梁
     */
    private _isPrimaryBeam: boolean;

    /**
     * 变更请求对象
     */
    private _request: unknown;

    /**
     * 构造函数
     * @param beam - 要改变类型的梁对象
     */
    constructor(beam: unknown);

    /**
     * 执行命令
     * @param options - 命令选项
     * @param options.isPrimaryBeam - 是否设置为主梁
     */
    onExecute(options: { isPrimaryBeam: boolean }): void;

    /**
     * 接收响应处理
     * @param response - 服务器响应
     * @param data - 响应数据
     * @returns 处理是否成功
     */
    onReceive(response: unknown, data: unknown): boolean;

    /**
     * 完成命令执行，提交事务
     */
    onComplete(): void;

    /**
     * 获取当前梁的模式
     * @returns "primary" 表示主梁，"secondary" 表示次梁
     */
    getMode(): "primary" | "secondary";
}

/**
 * 全局命名空间声明
 */
declare global {
    namespace HSApp {
        namespace Cmd {
            class Command {
                // 基础命令类
            }
        }
        
        namespace App {
            function getApp(): {
                transManager: unknown;
            };
        }
    }

    namespace HSFPConstants {
        enum RequestType {
            ChangeBeamType
        }
    }
}