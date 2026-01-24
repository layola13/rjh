/**
 * 删除分割边命令
 * 用于删除楼板之间的分割边缘，将两个楼板合并为一个
 */
export declare class CmdDeleteSplitEdge extends HSApp.Cmd.Command {
    /**
     * 要删除的边缘对象
     */
    edge: HSCore.Model.Edge;

    /**
     * 事务请求对象，用于管理楼板变更操作
     */
    private _request?: HSFPConstants.TransactionRequest;

    /**
     * 构造函数
     * @param edge - 需要删除的分割边缘
     */
    constructor(edge: HSCore.Model.Edge);

    /**
     * 执行命令的主逻辑
     * 检查边缘的共边(coedge)并获取关联的楼板(Slab)
     * 如果存在有效楼板，则创建变更请求并尝试删除边缘
     */
    onExecute(): void;

    /**
     * 执行边缘删除操作
     * 
     * 核心逻辑：
     * 1. 查找边缘关联的所有父级面（Floor或Ceiling）
     * 2. 如果存在两个父级面，尝试将它们合并
     * 3. 合并前会取消所有选择
     * 
     * @returns 如果成功合并返回true，否则返回false
     */
    doDeleteEdge(): boolean;

    /**
     * 清理命令资源
     * 调用父类的清理方法
     */
    onCleanup(): void;

    /**
     * 指示此命令是否支持撤销/重做功能
     * @returns 始终返回false，表示此命令不支持撤销重做
     */
    canUndoRedo(): boolean;
}

/**
 * 全局命名空间扩展
 */
declare global {
    namespace HSCore {
        namespace Model {
            /**
             * 边缘模型
             */
            interface Edge {
                /** 共边引用 */
                coedge?: CoEdge;
                /** 父级对象集合 */
                parents: Record<string, Face>;
            }

            /**
             * 共边模型
             */
            interface CoEdge {
                // 共边的具体属性由HSCore定义
            }

            /**
             * 面模型基类
             */
            interface Face {
                /**
                 * 获取唯一父级对象
                 */
                getUniqueParent(): Face;
            }

            /**
             * 楼板面
             */
            interface Floor extends Face {}

            /**
             * 天花板面
             */
            interface Ceiling extends Face {}
        }

        namespace Util {
            namespace Slab {
                /**
                 * 根据共边获取关联的楼板
                 * @param coedge - 共边对象
                 * @returns 关联的楼板对象，如果不存在则返回undefined
                 */
                function getSlabForCoEdge(coedge: HSCore.Model.CoEdge): unknown | undefined;
            }

            namespace Face {
                /**
                 * 获取两个面之间的共享边缘
                 * @param face1 - 第一个面
                 * @param face2 - 第二个面
                 * @returns 共享边缘数组
                 */
                function getSharedEdges(
                    face1: HSCore.Model.Floor | HSCore.Model.Ceiling,
                    face2: HSCore.Model.Floor | HSCore.Model.Ceiling
                ): HSCore.Model.Edge[];

                /**
                 * 将一个楼板合并到另一个楼板
                 * @param source - 源楼板
                 * @param target - 目标楼板
                 * @param sharedEdges - 共享边缘数组
                 * @returns 合并后保留的楼板对象
                 */
                function mergeFloorToOtherFloor(
                    source: HSCore.Model.Floor | HSCore.Model.Ceiling,
                    target: HSCore.Model.Floor | HSCore.Model.Ceiling,
                    sharedEdges: HSCore.Model.Edge[]
                ): HSCore.Model.Floor | HSCore.Model.Ceiling;
            }
        }
    }

    namespace HSApp {
        namespace Cmd {
            /**
             * 命令基类
             */
            class Command {
                /** 命令上下文 */
                protected context: {
                    /** 事务管理器 */
                    transManager: HSFPConstants.TransactionManager;
                };
                /** 命令管理器 */
                protected mgr: {
                    /** 完成命令 */
                    complete(): void;
                    /** 取消命令 */
                    cancel(): void;
                };

                onExecute(): void;
                onCleanup(): void;
                canUndoRedo(): boolean;
            }
        }

        namespace App {
            /**
             * 获取应用实例
             */
            function getApp(): {
                /** 选择管理器 */
                selectionManager: {
                    /** 取消所有选择 */
                    unselectAll(): void;
                };
            };
        }
    }

    namespace HSFPConstants {
        /**
         * 请求类型枚举
         */
        enum RequestType {
            /** 楼板变更请求 */
            ChangeSlab = 'ChangeSlab'
        }

        /**
         * 事务请求接口
         */
        interface TransactionRequest {
            // 具体属性由HSFPConstants定义
        }

        /**
         * 事务管理器接口
         */
        interface TransactionManager {
            /**
             * 创建事务请求
             * @param type - 请求类型
             * @param args - 请求参数
             * @returns 事务请求对象
             */
            createRequest(type: RequestType, args: unknown[]): TransactionRequest;

            /**
             * 提交事务请求
             * @param request - 要提交的请求
             */
            commit(request: TransactionRequest): void;
        }
    }
}