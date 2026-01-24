/**
 * 低分辨率渲染管理器
 * 用于在特定场景下临时降低渲染分辨率以提升性能
 */
declare class LowResolutionManager {
    /**
     * 单例实例
     */
    private static _instance?: LowResolutionManager;

    /**
     * 原始像素比率，用于恢复正常渲染质量
     */
    private _ratio?: number;

    /**
     * 停止低分辨率渲染的时间戳
     */
    private _stopTime?: number;

    /**
     * 动画帧回调函数
     * 检查是否应该恢复正常分辨率（停止后200ms）
     */
    private _onAnimationFrame: () => void;

    /**
     * 重置渲染分辨率到原始值
     * 取消监听动画帧信号并恢复渲染器的像素比率
     */
    private _resetRatio: () => void;

    /**
     * 构造函数（私有，用于单例模式）
     */
    constructor();

    /**
     * 开始低分辨率渲染模式
     * 将像素比率降低到原始值的50%以提升性能
     */
    startLowResolution(): void;

    /**
     * 结束低分辨率渲染模式
     * 记录停止时间，200ms后将自动恢复正常分辨率
     */
    endLowResolution(): void;

    /**
     * 获取单例实例
     * @returns 低分辨率管理器的唯一实例
     */
    static Instance(): LowResolutionManager;
}

export default LowResolutionManager;