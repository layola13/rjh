import { Button3D } from './button3D';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';

/**
 * 3D网格按钮控件
 * 基于现有网格创建交互式3D按钮，支持悬停、按下等动画效果
 */
export declare class MeshButton3D extends Button3D {
    /**
     * 当前关联的网格对象
     * @private
     */
    private _currentMesh: Mesh;

    /**
     * 指针进入时的动画回调
     * 默认行为：将网格缩放至1.1倍
     */
    pointerEnterAnimation: () => void;

    /**
     * 指针移出时的动画回调
     * 默认行为：恢复网格原始缩放（缩小至原来的1/1.1）
     */
    pointerOutAnimation: () => void;

    /**
     * 指针按下时的动画回调
     * 默认行为：将网格缩放至0.95倍
     */
    pointerDownAnimation: () => void;

    /**
     * 指针抬起时的动画回调
     * 默认行为：恢复网格原始缩放（放大至原来的1/0.95）
     */
    pointerUpAnimation: () => void;

    /**
     * 创建3D网格按钮实例
     * @param mesh - 用作按钮的网格对象
     * @param name - 按钮控件的名称
     */
    constructor(mesh: Mesh, name?: string);

    /**
     * 获取控件类型名称
     * @returns 返回 "MeshButton3D"
     * @protected
     */
    protected _getTypeName(): string;

    /**
     * 创建并配置按钮节点
     * 将GUI3D控制数据注入到所有子网格中
     * @param scene - Babylon.js场景对象
     * @returns 返回配置后的当前网格
     * @protected
     */
    protected _createNode(scene: any): Mesh;

    /**
     * 应用材质效果
     * @param mesh - 目标网格对象
     * @protected
     * @remarks 此实现为空方法，子类可重写以自定义材质行为
     */
    protected _affectMaterial(mesh: AbstractMesh): void;

    /**
     * 向网格的保留数据存储中注入GUI3D控制引用
     * @param mesh - 目标网格对象
     * @returns 返回包含控制引用的保留数据存储对象
     * @protected
     * @internal
     */
    protected _injectGUI3DReservedDataStore(mesh: AbstractMesh): { control: this };
}