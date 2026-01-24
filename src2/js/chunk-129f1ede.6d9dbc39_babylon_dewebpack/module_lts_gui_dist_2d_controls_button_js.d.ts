import { Observable } from "core/Misc/observable";
import { Rectangle } from "./rectangle";
import { Control } from "./control";
import { TextBlock } from "./textBlock";
import { Image } from "./image";

/**
 * 按钮控件，继承自Rectangle，提供交互式按钮功能
 * 支持图片、文本或组合模式，内置指针交互动画
 */
export declare class Button extends Rectangle {
    /**
     * 创建按钮实例
     * @param name - 按钮名称
     */
    constructor(name?: string);

    /**
     * 按钮关联的图片控件（只读）
     */
    get image(): Image | undefined;

    /**
     * 按钮关联的文本块控件（只读）
     */
    get textBlock(): TextBlock | undefined;

    /**
     * 是否将点击检测委托给子控件
     * @defaultValue false
     */
    delegatePickingToChildren: boolean;

    /**
     * 边框厚度
     * @defaultValue 1
     */
    thickness: number;

    /**
     * 是否阻止指针事件穿透
     * @defaultValue true
     */
    isPointerBlocker: boolean;

    /**
     * 指针进入时的动画回调
     * 默认实现：降低透明度0.1
     */
    pointerEnterAnimation?: () => void;

    /**
     * 指针离开时的动画回调
     * 默认实现：恢复原始透明度
     */
    pointerOutAnimation?: () => void;

    /**
     * 指针按下时的动画回调
     * 默认实现：缩小5%
     */
    pointerDownAnimation?: () => void;

    /**
     * 指针抬起时的动画回调
     * 默认实现：恢复原始缩放
     */
    pointerUpAnimation?: () => void;

    /**
     * 获取控件类型名称
     * @returns "Button"
     */
    protected _getTypeName(): string;

    /**
     * 处理点击检测逻辑
     * @param x - 指针X坐标
     * @param y - 指针Y坐标
     * @param pointerId - 指针ID
     * @param type - 事件类型
     * @param buttonIndex - 鼠标按钮索引
     * @param deltaX - X轴偏移量
     * @param deltaY - Y轴偏移量
     * @param hasFocus - 是否拥有焦点
     * @returns 是否处理了点击
     */
    protected _processPicking(
        x: number,
        y: number,
        pointerId: number,
        type: number,
        buttonIndex: number,
        deltaX?: number,
        deltaY?: number,
        hasFocus?: boolean
    ): boolean;

    /**
     * 指针进入事件处理
     * @param target - 目标控件
     * @param pointerId - 指针ID
     * @returns 是否继续处理事件
     */
    protected _onPointerEnter(target: Control, pointerId: number): boolean;

    /**
     * 指针离开事件处理
     * @param target - 目标控件
     * @param pointerId - 指针ID
     * @param force - 是否强制触发
     */
    protected _onPointerOut(target: Control, pointerId: number, force?: boolean): void;

    /**
     * 指针按下事件处理
     * @param target - 目标控件
     * @param coordinates - 坐标信息
     * @param pointerId - 指针ID
     * @param buttonIndex - 鼠标按钮索引
     * @param type - 事件类型
     * @returns 是否继续处理事件
     */
    protected _onPointerDown(
        target: Control,
        coordinates: { x: number; y: number },
        pointerId: number,
        buttonIndex: number,
        type: number
    ): boolean;

    /**
     * 指针抬起事件处理
     * @param target - 目标控件
     * @param coordinates - 坐标信息
     * @param pointerId - 指针ID
     * @param buttonIndex - 鼠标按钮索引
     * @param notifyClick - 是否触发点击事件
     * @param type - 事件类型
     */
    protected _onPointerUp(
        target: Control,
        coordinates: { x: number; y: number },
        pointerId: number,
        buttonIndex: number,
        notifyClick: boolean,
        type: number
    ): void;

    /**
     * 获取矩形填充颜色
     * @param context - 渲染上下文
     * @returns 填充颜色
     */
    protected _getRectangleFill(context: CanvasRenderingContext2D): string;

    /**
     * 序列化按钮配置
     * @param serializationObject - 序列化目标对象
     */
    serialize(serializationObject: any): void;

    /**
     * 从序列化内容解析按钮
     * @param serializedObject - 序列化的对象
     * @param host - 宿主控件
     */
    protected _parseFromContent(serializedObject: any, host: Control): void;

    /**
     * 创建带图标和文本的按钮（图标居左，文本居中）
     * @param name - 按钮名称
     * @param text - 按钮文本
     * @param imageUrl - 图标URL
     * @returns 按钮实例
     */
    static CreateImageButton(name: string, text: string, imageUrl: string): Button;

    /**
     * 创建仅包含图标的按钮
     * @param name - 按钮名称
     * @param imageUrl - 图标URL
     * @returns 按钮实例
     */
    static CreateImageOnlyButton(name: string, imageUrl: string): Button;

    /**
     * 创建仅包含文本的简单按钮
     * @param name - 按钮名称
     * @param text - 按钮文本
     * @returns 按钮实例
     */
    static CreateSimpleButton(name: string, text: string): Button;

    /**
     * 创建带背景图和居中文本的按钮
     * @param name - 按钮名称
     * @param text - 按钮文本
     * @param imageUrl - 背景图URL
     * @returns 按钮实例
     */
    static CreateImageWithCenterTextButton(name: string, text: string, imageUrl: string): Button;

    /**
     * 内部图片控件引用
     */
    protected _image?: Image;

    /**
     * 内部文本块控件引用
     */
    protected _textBlock?: TextBlock;
}