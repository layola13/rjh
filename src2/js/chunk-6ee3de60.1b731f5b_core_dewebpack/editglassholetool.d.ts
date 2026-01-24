import { EventType } from './event-types';
import { DrawParams } from './draw-params';
import { SystemParam, ShapeHelper } from './system';
import { Tool, ToolType, EditorStyle } from './tools';
import { Text, HoleStyle } from './shapes';

/**
 * 玻璃孔洞编辑工具
 * 用于编辑和操作玻璃上的孔洞（圆孔、方孔等）
 */
export declare class EditGlassHoleTool extends Tool {
    /**
     * 视图实例引用
     */
    private view: any;

    /**
     * 当前操作的可视化形状对象
     */
    private vshape?: any;

    /**
     * 构造函数
     * @param view - 视图实例，用于渲染和交互
     */
    constructor(view: any);

    /**
     * 获取当前形状的属性对象
     */
    get attrs(): any;

    /**
     * 获取玻璃孔洞对象
     * 包含孔洞的几何信息、样式、尺寸等
     */
    get glassHole(): {
        style: HoleStyle;
        size: number;
        locate(point: any): void;
        updatePoly(): void;
        glass: any;
    };

    /**
     * 获取孔洞的多边形数据
     * 用于渲染孔洞的边界路径
     */
    get poly(): any;

    /**
     * 双击事件处理
     * 触发尺寸编辑器（文本或自定义编辑器）
     * @param e - Konva事件对象，包含目标形状和原生事件
     */
    dbclick(e: any): void;

    /**
     * 拖拽开始事件处理
     * 记录当前拖拽的形状对象
     * @param e - Konva事件对象
     */
    dragstart(e: any): void;

    /**
     * 拖拽移动事件处理
     * 实时更新孔洞位置并重绘
     * @param e - Konva事件对象
     */
    dragmove(e: any): void;

    /**
     * 鼠标操作完成事件处理
     * 创建历史记录检查点并清理状态
     * @param e - Konva事件对象
     */
    mousedone(e: any): void;

    /**
     * 触发自定义尺寸编辑事件
     * 用于移动端圆孔的尺寸编辑
     * @param e - 原生DOM事件对象
     */
    private emitDimEdit(e: Event): void;

    /**
     * 尺寸编辑确认回调
     * 更新孔洞尺寸、重绘并创建历史记录
     * @param newSize - 新的孔洞尺寸值
     */
    private onConfirm(newSize: number): void;
}