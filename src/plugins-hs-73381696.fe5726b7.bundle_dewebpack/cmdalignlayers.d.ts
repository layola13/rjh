/**
 * 图层对齐命令
 * 用于在2D视图中将活动图层与目标图层进行对齐操作
 */
declare module "CmdAlignLayers" {
  import { Vector2, Vector3 } from "three";
  import { HSCore } from "@hscore/model";
  import { HSApp } from "@hsapp/sketch2d";
  import { AlignLayersGizmo } from "./AlignLayersGizmo";
  import { TransactionSession } from "@transaction/TransactionSession";
  import { PixiContext } from "@pixi/PixiContext";
  import { Layer2D } from "@display/Layer2D";

  /**
   * 图层对齐命令参数接口
   */
  export interface AlignLayersParams {
    /** 对齐模式 */
    mode?: "manual" | "auto";
    /** 是否显示预览 */
    showPreview?: boolean;
    /** 其他可选参数 */
    [key: string]: unknown;
  }

  /**
   * 图层对齐命令类
   * 支持多步骤交互式对齐操作
   */
  export class CmdAlignLayers extends HSApp.Sketch2d.Cmd.CmdBase {
    /** 目标图层（用于对齐的参考图层） */
    targetLayer: HSCore.Model.Layer;

    /** 活动图层（需要被对齐的图层） */
    activeLayer: HSCore.Model.Layer;

    /** 目标图层的2D显示对象 */
    targetLayer2D: Layer2D;

    /** 活动图层的2D显示对象 */
    activeLayer2D: Layer2D;

    /** 图层在DOM中的前一个兄弟节点 */
    prevSiblingNode: Node | null;

    /** 图层在Pixi容器中的前一个Z轴索引 */
    prevPixiZIndex: number;

    /** 事务会话对象 */
    session: TransactionSession;

    /** 2D草图场景引用 */
    sketch2d: HSCore.Model.Sketch2D;

    /** 推断辅助对象（用于捕捉点） */
    inference?: unknown;

    /** 命令参数 */
    params: AlignLayersParams;

    /** 对齐操作的起始位置 */
    startPosition: Vector2;

    /** 当前鼠标位置 */
    pos?: Vector2;

    /** 对齐操作的结束位置 */
    endPosition: Vector2;

    /** 起点到终点的距离 */
    distance: number;

    /** 偏移量（目标位置与起始位置的差值） */
    offset: Vector2;

    /** Pixi渲染上下文 */
    pixiContext: PixiContext;

    /** 图层父级Pixi节点 */
    layersParentPixiNode: PIXI.Container;

    /** 当前操作步骤（0-2） */
    currentStep: number;

    /** 样式配置 */
    styles?: unknown;

    /** 被隐藏的内容实体集合 */
    private _hiddenContents: Set<HSCore.Model.Entity>;

    /** 是否已隐藏墙体尺寸标注 */
    private _hasHideWallDimensions: boolean;

    /** 是否显示底图 */
    private _hasShowUnderlayImg: boolean;

    /** 底图弹出容器的DOM节点列表 */
    private _underlayImgPopUpContainers: NodeListOf<HTMLElement>;

    /**
     * 构造函数
     * @param layers - 图层数组，第一个元素为目标图层
     * @param params - 对齐参数
     */
    constructor(layers: HSCore.Model.Layer[], params: AlignLayersParams);

    /**
     * 获取当前操作步骤
     * @returns 当前步骤索引（0-2）
     */
    get step(): number;

    /**
     * 获取画布视图
     * @returns 2D视图对象
     */
    get canvas(): unknown;

    /**
     * 获取尺寸标注集合
     * @returns 空数组（该命令不使用尺寸标注）
     */
    get dimensions(): unknown[];

    /**
     * 执行命令
     * 初始化命令环境并开始对齐流程
     */
    onExecute(): void;

    /**
     * 开始图层对齐流程
     */
    startAlignLayers(): void;

    /**
     * 步骤0：准备阶段
     * - 隐藏底图和内容
     * - 重新排列显示图层
     * - 创建交互小工具（Gizmo）
     * - 隐藏墙体尺寸标注
     */
    step0(): void;

    /**
     * 步骤1：选择起始点
     * - 设置活动图层半透明
     * - 激活目标图层
     * - 更新Gizmo起始位置
     */
    step1(): void;

    /**
     * 步骤2：确认对齐
     * - 检查是否可能丢失内容
     * - 显示确认对话框或直接提交
     */
    step2(): void;

    /**
     * 隐藏底图图片
     * 保存底图显示状态并隐藏所有底图相关UI
     */
    private _hideUnderlayImg(): void;

    /**
     * 显示底图图片
     * 恢复底图的显示状态
     */
    private _showUnderlayImg(): void;

    /**
     * 平移底图图片
     * 根据偏移量更新底图的位置和CAD点坐标
     * @param underlay - 底图对象
     */
    private _translateUnderlayImg(underlay: HSCore.Model.Underlay): void;

    /**
     * 取消断开的面组分组
     * 遍历活动图层的所有面，将未连接的面从面组中分离
     */
    private _ungroupDisconnectedFaceGroups(): void;

    /**
     * 提交对齐请求
     * 显示加载提示，应用对齐变换，完成命令
     */
    private _commitRequest(): void;

    /**
     * 判断是否可能丢失内容
     * 检查楼板编辑、天花板、楼板重叠等情况
     * @returns 如果可能丢失内容返回true
     */
    private _isPossibleLoseContents(): boolean;

    /**
     * 显示确认对话框
     * 当检测到可能丢失内容时，提示用户确认操作
     */
    private _showConfirmDialog(): void;

    /**
     * 接收事件处理
     * @param eventType - 事件类型（click、keydown、mousemove等）
     * @param eventData - 事件数据
     * @returns 是否继续传播事件
     */
    onReceive(eventType: string, eventData: { event?: MouseEvent | KeyboardEvent; keyCode?: number; offset?: Vector2; pos?: Vector2 }): boolean;

    /**
     * 创建2D交互小工具
     * @param context - 命令上下文
     * @returns 对齐图层Gizmo实例
     */
    private _create2DGizmo(context: { context: unknown; displayLayers: { temp: unknown } }): AlignLayersGizmo;

    /**
     * ESC键处理
     * 取消当前命令
     */
    onESC(): void;

    /**
     * 取消命令回调
     * @param cancelled - 是否已取消
     */
    onCancel(cancelled: boolean): void;

    /**
     * 取消命令
     * 检查当前命令是否为自己，并取消执行
     */
    cancelCmd(): void;

    /**
     * 清理命令
     * 恢复图层状态、显示图层、销毁Gizmo、取消监听器
     */
    onCleanup(): void;

    /**
     * 是否可以被挂起
     * @returns false - 该命令不可被挂起
     */
    canSuspend(): boolean;

    /**
     * 获取命令描述
     * @returns 命令的中文描述
     */
    getDescription(): string;

    /**
     * 获取命令分类
     * @returns 命令所属的日志组类型
     */
    getCategory(): string;

    /**
     * 隐藏墙体尺寸标注
     * 如果当前显示尺寸标注，则隐藏并记录状态
     */
    private _hideWallDimensions(): void;

    /**
     * 恢复墙体尺寸标注
     * 如果之前隐藏了尺寸标注，则恢复显示
     */
    private _restoreWallDimensions(): void;

    /**
     * 挂接事件监听器
     * 监听撤销/重做事件以取消命令
     */
    private _hookUpListeners(): void;

    /**
     * 移除事件监听器
     * 释放信号钩子
     */
    private _unHookListeners(): void;

    /**
     * 隐藏场景内容
     * 遍历并隐藏所有可见的场景内容实体
     */
    private _hideContents(): void;

    /**
     * 显示场景内容
     * 恢复之前隐藏的所有场景内容实体
     */
    private _showContents(): void;

    /**
     * 深度标记图层为脏
     * 标记活动图层和目标图层需要重新渲染
     */
    dirtyLayersDeep(): void;

    /**
     * 进入下一步
     * 根据当前步骤和Gizmo有效性执行相应操作
     */
    private _nextStep(): void;

    /**
     * 创建Gizmo
     * 创建并初始化对齐小工具
     */
    private _createGizmo(): void;

    /**
     * 创建事务请求
     * @returns 图层平移请求对象
     */
    private _createRequest(): unknown;

    /**
     * 更新位置
     * 根据Gizmo事件更新偏移量和结束位置
     * @param data - Gizmo事件数据
     */
    private _updatePosition(data: { offset: Vector2; pos: Vector2 }): void;

    /**
     * 应用图层对齐
     * 执行实际的图层平移变换
     * - 移除隐蔽工程
     * - 平移图层
     * - 平移底图
     * - 提交事务
     */
    private _applyAlignLayers(): void;

    /**
     * 重新排列显示图层
     * 调整图层在Pixi容器和DOM中的顺序
     * 应用楼板遮罩并设置目标图层透明度
     */
    private _reArrangeDisplayLayers(): void;

    /**
     * 恢复显示图层
     * 恢复图层在Pixi容器和DOM中的原始顺序
     * 清除遮罩和滤镜效果
     */
    private _restoreDisplayLayers(): void;

    /**
     * 清除图层标记
     * 移除所有图层的激活和禁用标记
     */
    private _clearLayersFlag(): void;
  }
}