/**
 * 旋转梁操作请求类
 * 用于处理3D场景中梁对象的旋转操作，支持鼠标拖拽、热键和滑块等多种交互方式
 */
export declare class RotateBeamRequest extends HSCore.Transaction.Common.StateRequest {
    /**
     * 需要旋转的梁对象
     */
    beam: any;

    /**
     * 梁的原始Z轴旋转角度（度）
     */
    originalZAngle: number;

    /**
     * 梁的最后一次Z轴旋转角度（度）
     */
    lastZAngle: number;

    /**
     * 创建旋转梁请求实例
     * @param beam - 要旋转的梁对象
     */
    constructor(beam: any);

    /**
     * 提交操作时调用
     * 重建梁并触发面板装饰自动适配
     */
    onCommit(): void;

    /**
     * 接收用户交互事件
     * @param eventType - 事件类型（mouseup/sliderdragend/hotkeyend/sliderdragmove/dragmove/hotkey等）
     * @param eventData - 事件数据，包含delta(角度增量)和offset(偏移量)等属性
     * @returns 始终返回true表示事件已处理
     */
    onReceive(eventType: string, eventData: RotateEventData): boolean;

    /**
     * 围绕世界坐标系轴旋转梁
     * @param axis - 旋转轴向量（世界坐标系）
     * @param angle - 旋转角度（度）
     */
    rotateAroundWorldAxis(axis: THREE.Vector3, angle: number): void;

    /**
     * 检查是否可以执行字段事务
     * @returns 始终返回true
     */
    canTransactField(): boolean;

    /**
     * 获取操作描述
     * @returns 返回"旋转梁"
     */
    getDescription(): string;

    /**
     * 获取操作分类
     * @returns 返回内容操作类型
     */
    getCategory(): HSFPConstants.LogGroupTypes;
}

/**
 * 旋转事件数据接口
 */
interface RotateEventData {
    /**
     * 角度增量（度）
     */
    delta: number;

    /**
     * 偏移量，用于吸附判断
     */
    offset?: number;
}

/**
 * 角度吸附配置接口
 */
interface AngleSnapConfig {
    /**
     * 当前角度
     */
    angle: number;

    /**
     * 吸附偏移阈值
     */
    offset: number;

    /**
     * 吸附标记角度（如45度倍数）
     */
    mark: number;
}

/**
 * HSCore全局命名空间
 */
declare namespace HSCore {
    namespace Util {
        namespace Layer {
            /**
             * 获取实体所在图层
             */
            function getEntityLayer(entity: any): any;
        }

        namespace FaceMoldingFitHelper {
            /**
             * 获取面板装饰适配助手单例
             */
            function getInstance(): {
                /**
                 * 开始监听图层变化
                 */
                startListening(layer: any): void;
                /**
                 * 自动适配面板装饰
                 */
                autoFit(): void;
            };
        }

        namespace Content {
            /**
             * 围绕世界坐标系轴旋转对象
             */
            function rotateAroundWorldAxis(object: any, axis: THREE.Vector3, angle: number): void;
        }
    }

    namespace Transaction {
        namespace Common {
            /**
             * 状态请求基类
             */
            class StateRequest {
                onCommit(args: any[]): void;
                onReceive(eventType: string, eventData: any): boolean;
            }
        }
    }
}

/**
 * HSApp全局命名空间
 */
declare namespace HSApp {
    namespace View {
        namespace T3d {
            namespace Util {
                /**
                 * 角度吸附工具函数
                 * @param config - 吸附配置
                 * @returns 吸附后的角度，如果不需要吸附则返回undefined
                 */
                function snapToAngle(config: AngleSnapConfig): number | undefined;
            }
        }
    }
}

/**
 * HSFPConstants全局常量
 */
declare namespace HSFPConstants {
    /**
     * 日志分组类型枚举
     */
    enum LogGroupTypes {
        /**
         * 内容操作类型
         */
        ContentOperation = "ContentOperation"
    }
}

/**
 * Three.js Vector3类型声明
 */
declare namespace THREE {
    class Vector3 {
        constructor(x: number, y: number, z: number);
    }
}