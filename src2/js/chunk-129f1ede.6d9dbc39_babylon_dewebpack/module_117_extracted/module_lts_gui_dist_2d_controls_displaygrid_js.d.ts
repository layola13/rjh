import { Control } from './control';
import { serialize } from 'core/Misc/observable';

/**
 * 显示网格控件，用于在2D GUI中绘制网格背景
 * 支持主要网格线和次要网格线的显示
 */
export declare class DisplayGrid extends Control {
    /**
     * 控件名称
     */
    name: string;

    /**
     * 网格单元格宽度（像素）
     * @default 20
     */
    private _cellWidth: number;

    /**
     * 网格单元格高度（像素）
     * @default 20
     */
    private _cellHeight: number;

    /**
     * 次要网格线粗细（像素）
     * @default 1
     */
    private _minorLineTickness: number;

    /**
     * 次要网格线颜色
     * @default "DarkGray"
     */
    private _minorLineColor: string;

    /**
     * 主要网格线粗细（像素）
     * @default 2
     */
    private _majorLineTickness: number;

    /**
     * 主要网格线颜色
     * @default "White"
     */
    private _majorLineColor: string;

    /**
     * 主要网格线频率（每N个单元格绘制一条主线）
     * @default 5
     */
    private _majorLineFrequency: number;

    /**
     * 背景颜色
     * @default "Black"
     */
    private _background: string;

    /**
     * 是否显示主要网格线
     * @default true
     */
    private _displayMajorLines: boolean;

    /**
     * 是否显示次要网格线
     * @default true
     */
    private _displayMinorLines: boolean;

    /**
     * 创建一个DisplayGrid实例
     * @param name - 控件名称
     */
    constructor(name: string);

    /**
     * 获取是否显示次要网格线
     */
    @serialize()
    get displayMinorLines(): boolean;

    /**
     * 设置是否显示次要网格线
     */
    set displayMinorLines(value: boolean);

    /**
     * 获取是否显示主要网格线
     */
    @serialize()
    get displayMajorLines(): boolean;

    /**
     * 设置是否显示主要网格线
     */
    set displayMajorLines(value: boolean);

    /**
     * 获取背景颜色
     */
    @serialize()
    get background(): string;

    /**
     * 设置背景颜色
     */
    set background(value: string);

    /**
     * 获取单元格宽度
     */
    @serialize()
    get cellWidth(): number;

    /**
     * 设置单元格宽度
     */
    set cellWidth(value: number);

    /**
     * 获取单元格高度
     */
    @serialize()
    get cellHeight(): number;

    /**
     * 设置单元格高度
     */
    set cellHeight(value: number);

    /**
     * 获取次要网格线粗细
     */
    @serialize()
    get minorLineTickness(): number;

    /**
     * 设置次要网格线粗细
     */
    set minorLineTickness(value: number);

    /**
     * 获取次要网格线颜色
     */
    @serialize()
    get minorLineColor(): string;

    /**
     * 设置次要网格线颜色
     */
    set minorLineColor(value: string);

    /**
     * 获取主要网格线粗细
     */
    @serialize()
    get majorLineTickness(): number;

    /**
     * 设置主要网格线粗细
     */
    set majorLineTickness(value: number);

    /**
     * 获取主要网格线颜色
     */
    @serialize()
    get majorLineColor(): string;

    /**
     * 设置主要网格线颜色
     */
    set majorLineColor(value: string);

    /**
     * 获取主要网格线频率
     */
    @serialize()
    get majorLineFrequency(): number;

    /**
     * 设置主要网格线频率
     */
    set majorLineFrequency(value: number);

    /**
     * 绘制网格控件
     * @param context - Canvas 2D渲染上下文
     * @internal
     */
    protected _draw(context: CanvasRenderingContext2D): void;

    /**
     * 获取控件类型名称
     * @returns 返回 "DisplayGrid"
     * @internal
     */
    protected _getTypeName(): string;
}