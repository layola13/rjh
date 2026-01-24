import { Button3D } from './button3D';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';

/**
 * 3D网格按钮控件类
 * 继承自Button3D，为现有的3D网格提供按钮交互功能
 */
export declare class MeshButton3D extends Button3D {
    /**
     * 当前关联的网格对象
     * @private
     */
    private _currentMesh: Mesh;

    /**
     * 构造函数
     * @param mesh - 要作为按钮的3D网格对象
     * @param name - 按钮控件的名称
     */
    constructor(mesh: Mesh, name?: string);

    /**
     * 获取控件类型名称
     * @returns 返回字符串 "MeshButton3D"
     * @protected
     */
    protected _getTypeName(): string;

    /**
     * 创建并返回控件的3D节点
     * 将当前网格及其子网格注入GUI3D保留数据存储，并关联到当前控件
     * @param scene - Babylon.js场景对象
     * @returns 返回当前网格对象
     * @protected
     */
    protected _createNode(scene: any): Mesh;

    /**
     * 应用材质效果（空实现）
     * 由于使用现有网格，不需要自动应用材质
     * @param material - 材质对象
     * @protected
     */
    protected _affectMaterial(material: any): void;

    /**
     * 指针进入时的动画效果
     * 将网格缩放至1.1倍
     */
    pointerEnterAnimation: () => void;

    /**
     * 指针离开时的动画效果
     * 将网格缩放恢复至原始大小（缩小至1/1.1）
     */
    pointerOutAnimation: () => void;

    /**
     * 指针按下时的动画效果
     * 将网格缩放至0.95倍
     */
    pointerDownAnimation: () => void;

    /**
     * 指针抬起时的动画效果
     * 将网格缩放恢复至原始大小（放大至1/0.95）
     */
    pointerUpAnimation: () => void;

    /**
     * 获取当前关联的网格对象
     * 继承自Button3D的mesh属性
     */
    readonly mesh: Mesh | undefined;

    /**
     * 注入GUI3D保留数据存储
     * 为网格对象添加控件引用
     * @param mesh - 要注入数据的抽象网格对象
     * @returns 返回包含控件引用的保留数据存储对象
     * @private
     */
    private _injectGUI3DReservedDataStore(mesh: AbstractMesh): { control: MeshButton3D };
}