import { Observable } from "core/Misc/observable";
import { Scene } from "core/scene";
import { Mesh } from "core/Meshes/mesh";
import { TransformNode } from "core/Meshes/transformNode";
import { Vector3, Color3 } from "core/Maths/math";
import { StandardMaterial } from "core/Materials/standardMaterial";
import { AbstractMesh } from "core/Meshes/abstractMesh";
import { FluentMaterial } from "../materials/fluent/fluentMaterial";
import { FluentButtonMaterial } from "../materials/fluentButton/fluentButtonMaterial";
import { StackPanel } from "../../2D/controls/stackPanel";
import { Image } from "../../2D/controls/image";
import { TextBlock } from "../../2D/controls/textBlock";
import { AdvancedDynamicTexture } from "../../2D/advancedDynamicTexture";
import { TouchButton3D } from "./touchButton3D";
import { FadeInOutBehavior } from "core/Behaviors/Meshes/fadeInOutBehavior";
import { Observer } from "core/Misc/observable";
import { Texture } from "core/Materials/Textures/texture";

/**
 * 3D触摸全息按钮控件，继承自TouchButton3D
 * 支持前面板、背面板、文本面板的复杂交互效果
 */
export declare class TouchHolographicButton extends TouchButton3D {
    /** MRTK模型资源基础URL */
    static readonly MODEL_BASE_URL = "https://assets.babylonjs.com/meshes/MRTK/";
    
    /** MRTK流畅按钮模型文件名 */
    static readonly MODEL_FILENAME = "mrtk-fluent-button.glb";

    /**
     * 创建触摸全息按钮实例
     * @param name - 按钮名称
     * @param shareMaterials - 是否与其他按钮共享材质以优化性能，默认为true
     */
    constructor(name: string, shareMaterials?: boolean);

    // ==================== 公共属性 ====================

    /**
     * 获取或设置渲染组ID，用于控制渲染顺序
     */
    renderingGroupId: number;

    /**
     * 获取按钮的主网格（背面板）
     */
    readonly mesh: AbstractMesh;

    /**
     * 获取或设置工具提示文本
     * 设置为非空字符串时显示工具提示，设置为null时隐藏
     */
    tooltipText: string | null;

    /**
     * 获取或设置按钮显示的文本内容
     */
    text: string;

    /**
     * 获取或设置按钮显示的图片URL
     */
    imageUrl: string;

    /**
     * 获取背面板材质
     */
    readonly backMaterial: FluentMaterial;

    /**
     * 获取前面板材质
     */
    readonly frontMaterial: FluentButtonMaterial;

    /**
     * 获取文本面板材质
     */
    readonly plateMaterial: StandardMaterial;

    /**
     * 获取是否共享材质
     */
    readonly shareMaterials: boolean;

    /**
     * 设置背面板是否可见
     */
    isBackplateVisible: boolean;

    // ==================== 私有属性 ====================

    private _shareMaterials: boolean;
    private _isBackplateVisible: boolean;
    private _frontPlateDepth: number;
    private _backPlateDepth: number;
    private _backplateColor: Color3;
    private _backplateToggledColor: Color3;
    private _text: string;
    private _imageUrl: string;
    
    /** 背面板网格 */
    private _backPlate: Mesh;
    
    /** 前面板网格 */
    private _frontPlate: Mesh;
    
    /** 文本面板网格 */
    private _textPlate: Mesh;
    
    /** 背面板材质 */
    private _backMaterial: FluentMaterial;
    
    /** 前面板材质 */
    private _frontMaterial: FluentButtonMaterial;
    
    /** 文本面板材质 */
    private _plateMaterial: StandardMaterial;
    
    /** 工具提示网格 */
    private _tooltipMesh: Mesh | null;
    
    /** 工具提示纹理 */
    private _tooltipTexture: AdvancedDynamicTexture | null;
    
    /** 工具提示文本块 */
    private _tooltipTextBlock: TextBlock | null;
    
    /** 工具提示淡入淡出行为 */
    private _tooltipFade: FadeInOutBehavior | null;
    
    /** 工具提示悬停观察者 */
    private _tooltipHoverObserver: Observer<Vector3> | null;
    
    /** 工具提示移出观察者 */
    private _tooltipOutObserver: Observer<Vector3> | null;
    
    /** 指针悬停观察者 */
    private _pointerHoverObserver: Observer<Vector3> | null;
    
    /** 拾取点观察者 */
    private _pickedPointObserver: Observer<unknown> | null;

    // ==================== 动画函数 ====================

    /**
     * 指针进入时的动画效果
     * 启用前面板左右两侧的光斑效果
     */
    pointerEnterAnimation: () => void;

    /**
     * 指针移出时的动画效果
     * 禁用前面板左右两侧的光斑效果
     */
    pointerOutAnimation: () => void;

    /**
     * 指针按下时的动画效果
     * 压缩前面板深度，模拟按压效果
     */
    pointerDownAnimation: () => void;

    /**
     * 指针抬起时的动画效果
     * 恢复前面板原始深度
     */
    pointerUpAnimation: () => void;

    // ==================== 公共方法 ====================

    /**
     * 释放工具提示相关资源
     * @internal
     */
    protected _disposeTooltip(): void;

    /**
     * 获取控件类型名称
     * @returns 返回"TouchHolographicButton"
     * @internal
     */
    protected _getTypeName(): string;

    /**
     * 重新构建按钮的内容面板
     * 根据text和imageUrl属性动态生成UI布局
     * @internal
     */
    protected _rebuildContent(): void;

    /**
     * 创建按钮的3D节点结构
     * @param scene - 所属场景
     * @returns 按钮根节点
     * @internal
     */
    protected _createNode(scene: Scene): TransformNode;

    /**
     * 应用外观纹理到文本面板材质
     * @param texture - 要应用的纹理
     * @internal
     */
    protected _applyFacade(texture: Texture): void;

    /**
     * 创建背面板材质
     * @param mesh - 关联的网格
     * @internal
     */
    protected _createBackMaterial(mesh: AbstractMesh): void;

    /**
     * 创建前面板材质
     * @param mesh - 关联的网格
     * @internal
     */
    protected _createFrontMaterial(mesh: AbstractMesh): void;

    /**
     * 创建文本面板材质
     * @param mesh - 关联的网格
     * @internal
     */
    protected _createPlateMaterial(mesh: AbstractMesh): void;

    /**
     * 处理按钮切换状态时的逻辑
     * @param newState - 新的切换状态
     * @internal
     */
    protected _onToggle(newState: boolean): void;

    /**
     * 将材质应用到各个面板网格
     * @param mesh - 关联的网格
     * @internal
     */
    protected _affectMaterial(mesh: AbstractMesh): void;

    /**
     * 释放按钮及其所有资源
     */
    dispose(): void;
}