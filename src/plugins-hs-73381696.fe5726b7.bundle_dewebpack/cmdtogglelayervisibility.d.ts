/**
 * 图层可见性切换命令
 * 用于控制楼层图层的显示和隐藏状态
 */
export declare class CmdToggleLayerVisibility extends HSApp.Cmd.Command {
    /**
     * 目标图层对象
     */
    layer: any;

    /**
     * 图层可见性状态
     * @default true
     */
    visible: boolean;

    /**
     * 事务管理器请求对象
     * @private
     */
    private _request: any;

    /**
     * 创建图层可见性切换命令
     * @param layer - 需要切换可见性的图层对象
     * @param visible - 目标可见性状态，默认为true（显示）
     */
    constructor(layer: any, visible?: boolean);

    /**
     * 执行命令
     * 创建并提交图层可见性切换请求到事务管理器
     */
    onExecute(): void;

    /**
     * 清理命令资源
     */
    onCleanup(): void;

    /**
     * 判断命令是否支持撤销/重做操作
     * @returns 始终返回true，表示支持撤销重做
     */
    canUndoRedo(): boolean;

    /**
     * 获取命令描述信息
     * @returns 命令的中文描述
     */
    getDescription(): string;

    /**
     * 获取命令所属分类
     * @returns 返回墙体操作分类标识
     */
    getCategory(): HSFPConstants.LogGroupTypes;
}