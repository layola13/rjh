import { Observable } from "core/Misc/observable";
import { Vector3, Vector2, TmpVectors } from "core/Maths/math.vector";
import { VolumeBasedPanel } from "./volumeBasedPanel";
import { Container3D } from "./container3D";
import { Control3D } from "./control3D";
import { Mesh } from "core/Meshes/mesh";

/**
 * 散点布局面板控件
 * 用于在3D空间中以随机散布方式排列子控件
 * @extends VolumeBasedPanel
 */
export declare class ScatterPanel extends VolumeBasedPanel {
    /**
     * 碰撞检测与位置优化的迭代次数
     * 值越大，子控件之间的间距越均匀，但计算开销越大
     * @default 100
     */
    private _iteration: number;

    /**
     * 获取迭代次数
     */
    get iteration(): number;

    /**
     * 设置迭代次数
     * 改变此值会触发子控件重新排列
     * @param value - 新的迭代次数
     */
    set iteration(value: number);

    /**
     * 构造函数
     * 创建一个新的散点布局面板实例
     */
    constructor();

    /**
     * 映射网格节点到散点位置
     * 根据面板方向调整子控件的朝向，并应用随机散布位置
     * @param node - 要映射的3D控件节点
     * @param position - 初始位置向量
     * @protected
     */
    protected _mapGridNode(node: Control3D, position: Vector3): void;

    /**
     * 散点映射函数
     * 在单元格范围内生成随机位置
     * @param position - 要修改的位置向量
     * @returns 修改后的位置向量
     * @protected
     */
    protected _scatterMapping(position: Vector3): Vector3;

    /**
     * 最终处理函数
     * 执行多次迭代优化，通过碰撞检测和位置调整防止子控件重叠
     * 使用弹簧力模型推开距离过近的控件
     * @protected
     */
    protected _finalProcessing(): void;

    /**
     * 子控件集合（继承自父类）
     * @protected
     */
    protected _children: Control3D[];

    /**
     * 单元格宽度（继承自父类）
     * @protected
     */
    protected _cellWidth: number;

    /**
     * 单元格高度（继承自父类）
     * @protected
     */
    protected _cellHeight: number;

    /**
     * 子控件之间的最小间距（继承自父类）
     */
    margin: number;

    /**
     * 面板的方向模式（继承自父类）
     * 决定子控件如何朝向摄像机或原点
     */
    orientation: number;

    /**
     * 重新排列子控件的内部方法（继承自父类）
     * @protected
     */
    protected _arrangeChildren(): void;
}