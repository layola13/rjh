import { Observable } from "core/Misc/observable";
import { ValueAndUnit } from "../valueAndUnit";
import { Control } from "./control";

/**
 * 文本换行模式枚举
 */
export enum TextWrapping {
    /** 裁剪超出部分 */
    Clip = 0,
    /** 自动换行 */
    WordWrap = 1,
    /** 省略号 */
    Ellipsis = 2,
    /** 自动换行并显示省略号 */
    WordWrapEllipsis = 3
}

/**
 * 文本行信息接口
 */
export interface ITextLine {
    /** 文本内容 */
    text: string;
    /** 文本宽度（像素） */
    width: number;
}

/**
 * 字体偏移信息接口
 */
export interface IFontOffset {
    /** 上升高度 */
    ascent: number;
    /** 下降高度 */
    descent: number;
    /** 总高度 */
    height: number;
}

/**
 * 自定义单词分割函数类型
 */
export type WordSplittingFunction = (text: string) => string[];

/**
 * TextBlock 控件 - 用于在 GUI 中显示文本
 * @remarks
 * 支持多种文本换行模式、对齐方式、描边、下划线等功能
 */
export declare class TextBlock extends Control {
    /** 控件名称 */
    name: string;

    /**
     * 文本内容变化时触发的观察者
     */
    readonly onTextChangedObservable: Observable<TextBlock>;

    /**
     * 文本行准备完成时触发的观察者
     */
    readonly onLinesReadyObservable: Observable<TextBlock>;

    /**
     * 构造函数
     * @param name - 控件名称
     * @param text - 初始文本内容，默认为空字符串
     */
    constructor(name: string, text?: string);

    /**
     * 获取已解析的文本行数组（只读）
     */
    get lines(): ITextLine[];

    /**
     * 获取是否自动调整大小以适应文本
     */
    get resizeToFit(): boolean;

    /**
     * 设置是否自动调整大小以适应文本
     * @remarks
     * 启用后会忽略自适应缩放，并根据文本内容自动调整控件尺寸
     */
    set resizeToFit(value: boolean);

    /**
     * 获取文本换行模式
     */
    get textWrapping(): TextWrapping;

    /**
     * 设置文本换行模式
     */
    set textWrapping(value: TextWrapping);

    /**
     * 获取文本内容
     */
    get text(): string;

    /**
     * 设置文本内容
     * @remarks
     * 设置后会触发 onTextChangedObservable 观察者
     */
    set text(value: string);

    /**
     * 获取文本水平对齐方式
     */
    get textHorizontalAlignment(): number;

    /**
     * 设置文本水平对齐方式
     * @remarks
     * 可使用 Control.HORIZONTAL_ALIGNMENT_LEFT/CENTER/RIGHT
     */
    set textHorizontalAlignment(value: number);

    /**
     * 获取文本垂直对齐方式
     */
    get textVerticalAlignment(): number;

    /**
     * 设置文本垂直对齐方式
     * @remarks
     * 可使用 Control.VERTICAL_ALIGNMENT_TOP/CENTER/BOTTOM
     */
    set textVerticalAlignment(value: number);

    /**
     * 获取行间距（字符串表示，支持像素或百分比）
     */
    get lineSpacing(): string;

    /**
     * 设置行间距
     * @param value - 可以是像素值（如 "10px"）或百分比（如 "20%"）
     */
    set lineSpacing(value: string | number);

    /**
     * 获取文本描边宽度（像素）
     */
    get outlineWidth(): number;

    /**
     * 设置文本描边宽度
     */
    set outlineWidth(value: number);

    /**
     * 获取是否显示下划线
     */
    get underline(): boolean;

    /**
     * 设置是否显示下划线
     */
    set underline(value: boolean);

    /**
     * 获取是否显示删除线
     */
    get lineThrough(): boolean;

    /**
     * 设置是否显示删除线
     */
    set lineThrough(value: boolean);

    /**
     * 获取描边颜色
     */
    get outlineColor(): string;

    /**
     * 设置描边颜色
     * @param value - CSS 颜色字符串（如 "white", "#ffffff", "rgb(255,255,255)"）
     */
    set outlineColor(value: string);

    /**
     * 获取单词分隔符
     */
    get wordDivider(): string;

    /**
     * 设置单词分隔符
     * @remarks
     * 用于在自动换行时确定单词边界，默认为空格 " "
     */
    set wordDivider(value: string);

    /**
     * 获取是否强制调整宽度
     */
    get forceResizeWidth(): boolean;

    /**
     * 设置是否强制调整宽度
     * @remarks
     * 与 resizeToFit 配合使用，即使在 Clip 模式下也调整宽度
     */
    set forceResizeWidth(value: boolean);

    /**
     * 自定义单词分割函数
     * @remarks
     * 如果设置，将使用此函数代替默认的 wordDivider 进行单词分割
     */
    wordSplittingFunction?: WordSplittingFunction;

    /**
     * 计算期望的高度（像素）
     * @returns 根据当前文本内容和宽度计算出的期望高度
     */
    computeExpectedHeight(): number;

    /**
     * 释放资源
     * @remarks
     * 清除所有观察者并调用父类的 dispose 方法
     */
    dispose(): void;

    /**
     * 获取控件类型名称
     * @returns "TextBlock"
     */
    protected _getTypeName(): string;

    /**
     * 处理测量逻辑
     * @param parentMeasure - 父容器的测量信息
     * @param context - Canvas 2D 渲染上下文
     * @internal
     */
    protected _processMeasures(parentMeasure: any, context: CanvasRenderingContext2D): void;

    /**
     * 绘制文本
     * @param text - 要绘制的文本
     * @param textWidth - 文本宽度
     * @param y - Y 坐标
     * @param context - Canvas 2D 渲染上下文
     * @internal
     */
    protected _drawText(
        text: string,
        textWidth: number,
        y: number,
        context: CanvasRenderingContext2D
    ): void;

    /**
     * 绘制控件
     * @param context - Canvas 2D 渲染上下文
     * @internal
     */
    protected _draw(context: CanvasRenderingContext2D): void;

    /**
     * 应用渲染状态
     * @param context - Canvas 2D 渲染上下文
     * @internal
     */
    protected _applyStates(context: CanvasRenderingContext2D): void;

    /**
     * 将文本分解为多行
     * @param width - 可用宽度
     * @param height - 可用高度
     * @param context - Canvas 2D 渲染上下文
     * @returns 文本行数组
     * @internal
     */
    protected _breakLines(
        width: number,
        height: number,
        context: CanvasRenderingContext2D
    ): ITextLine[];

    /**
     * 解析单行文本（无换行）
     * @param line - 文本行
     * @param context - Canvas 2D 渲染上下文
     * @returns 文本行信息
     * @internal
     */
    protected _parseLine(line: string, context: CanvasRenderingContext2D): ITextLine;

    /**
     * 解析带省略号的单行文本
     * @param line - 文本行
     * @param width - 可用宽度
     * @param context - Canvas 2D 渲染上下文
     * @returns 文本行信息
     * @internal
     */
    protected _parseLineEllipsis(
        line: string,
        width: number,
        context: CanvasRenderingContext2D
    ): ITextLine;

    /**
     * 解析自动换行的文本
     * @param line - 文本行
     * @param width - 可用宽度
     * @param context - Canvas 2D 渲染上下文
     * @returns 文本行信息数组
     * @internal
     */
    protected _parseLineWordWrap(
        line: string,
        width: number,
        context: CanvasRenderingContext2D
    ): ITextLine[];

    /**
     * 解析自动换行并带省略号的文本
     * @param line - 文本行
     * @param width - 可用宽度
     * @param height - 可用高度
     * @param context - Canvas 2D 渲染上下文
     * @returns 文本行信息数组
     * @internal
     */
    protected _parseLineWordWrapEllipsis(
        line: string,
        width: number,
        height: number,
        context: CanvasRenderingContext2D
    ): ITextLine[];

    /**
     * 渲染所有文本行
     * @param context - Canvas 2D 渲染上下文
     * @internal
     */
    protected _renderLines(context: CanvasRenderingContext2D): void;

    /**
     * 计算指定行数所需的高度
     * @param lineCount - 行数
     * @returns 高度（像素）
     * @internal
     */
    protected _computeHeightForLinesOf(lineCount: number): number;

    /**
     * 获取文本度量宽度
     * @param metrics - TextMetrics 对象
     * @returns 实际宽度
     * @internal
     */
    protected _getTextMetricsWidth(metrics: TextMetrics): number;

    /**
     * 计算需要移除的字符数
     * @param lineWidth - 当前行宽度
     * @param width - 可用宽度
     * @param lineLength - 当前行字符数
     * @returns 需要移除的字符数
     * @internal
     */
    protected _getCharsToRemove(lineWidth: number, width: number, lineLength: number): number;
}