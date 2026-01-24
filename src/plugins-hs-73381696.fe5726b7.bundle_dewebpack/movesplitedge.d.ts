/**
 * Module: MoveSplitEdge
 * 用于处理分割边缘移动操作的视图类
 * @module MoveSplitEdge
 */

import type { Context } from './Context';
import type { Layer } from './Layer';
import type { Element } from './Element';
import type { Command } from './Command';
import type { Edge } from './Edge';
import type { Floorplan } from './Floorplan';

/**
 * 屏幕坐标点
 */
interface ScreenPoint {
  x: number;
  y: number;
}

/**
 * 模型坐标点
 */
interface ModelPoint {
  x: number;
  y: number;
}

/**
 * 对齐线数据结构 [起点, 终点]
 */
type AlignmentLineData = [ModelPoint, ModelPoint];

/**
 * 捕捉结果
 */
interface SnapResult {
  /** 偏移量 */
  offset?: ModelPoint;
  /** 捕捉目标实体 */
  targets?: unknown[];
  /** 指示线数组 */
  indicateLines?: AlignmentLineData[];
}

/**
 * 鼠标事件位置信息
 */
interface MouseEventPosition {
  position: ModelPoint;
  event: MouseEvent;
}

/**
 * 鼠标移动事件信息
 */
interface MouseMoveEventData {
  offset: ModelPoint;
  event: MouseEvent;
}

/**
 * 鼠标抬起事件信息
 */
interface MouseUpEventData {
  position: ModelPoint;
  entities?: unknown[];
  event: MouseEvent;
}

/**
 * 边缘推理配置选项
 */
interface InferenceOptions {
  /** 是否阻止捕捉端点 */
  isBlockSnapEndPoint: boolean;
}

/**
 * SVG路径元素接口
 */
interface SVGPathElement extends Element {
  attr(attributes: Record<string, string | number>): this;
  hide(): this;
  show(): this;
}

/**
 * SVG上下文接口
 */
interface SVGContext extends Context {
  path(): SVGPathElement;
  application: {
    appSettings: {
      orthoModeOn: boolean;
    };
  };
}

/**
 * 边缘推理类
 */
declare class EdgeInference {
  constructor(context: SVGContext);
  
  /**
   * 设置源边缘
   * @param edge - 要设置的边缘
   */
  setSourceEdge(edge: Edge): void;
  
  /**
   * 求解捕捉位置
   * @param point - 目标点
   * @param result - 捕捉结果输出
   * @param options - 推理选项
   */
  solve(point: ModelPoint, result: SnapResult, options: InferenceOptions): void;
}

/**
 * SVG工具类
 */
declare namespace SVGUtil {
  /**
   * 将屏幕坐标转换为模型坐标
   * @param screenPoint - 屏幕坐标 [x, y]
   * @param context - SVG上下文
   * @returns 模型坐标 [x, y]
   */
  function ScreenPointToModel(screenPoint: [number, number], context: SVGContext): [number, number];
  
  /**
   * 更新捕捉线的SVG元素
   * @param context - SVG上下文
   * @param start - 起点
   * @param end - 终点
   * @param element - SVG路径元素
   */
  function UpdateSnappedLineSVGElements(
    context: SVGContext,
    start: ModelPoint,
    end: ModelPoint,
    element: SVGPathElement
  ): void;
}

/**
 * 分割边缘移动操作的图形交互类
 * 负责处理分割边缘移动时的渲染、捕捉和对齐线显示
 * @extends HSApp.View.SVG.Temp
 */
export declare class MoveSplitEdge {
  /** 关联的命令对象 */
  protected readonly cmd: Command;
  
  /** 边缘推理引擎 */
  protected readonly inference: EdgeInference;
  
  /** 对齐线SVG元素数组（最多6条） */
  protected readonly alignmentLines: SVGPathElement[];
  
  /** 平面图对象 */
  protected fp?: Floorplan;
  
  /** 当前操作的边缘 */
  protected current?: Edge;
  
  /** SVG上下文 */
  protected readonly context: SVGContext;
  
  /** SVG图层 */
  protected readonly layer: Layer;
  
  /** 绘图元素 */
  protected drawing?: Element;
  
  /** 所有元素集合 */
  protected element?: Element[];
  
  /** 鼠标按下时的起始位置 */
  protected beginPosition?: ModelPoint;
  
  /** 上一次鼠标位置（用于避免重复处理） */
  protected lastPosition?: ScreenPoint;
  
  /** 起始时光标相对边缘中点的偏移 */
  protected beginCursorOffset?: ModelPoint;
  
  /** 当前捕捉结果 */
  protected snapResult?: SnapResult;

  /**
   * 构造函数
   * @param context - SVG绘图上下文
   * @param layer - SVG图层
   * @param cmd - 命令对象
   */
  constructor(context: SVGContext, layer: Layer, cmd: Command);

  /**
   * 重置状态，清除当前操作数据
   */
  reset(): void;

  /**
   * 绘制回调，初始化或更新SVG元素
   */
  onDraw(): void;

  /**
   * 构建当前边缘数据
   * @private
   */
  private _build(): void;

  /**
   * 获取当前操作的边缘实体
   * @returns 当前边缘对象
   */
  getCurrentEdge(): Edge;

  /**
   * 隐藏所有对齐线
   */
  hideAlignmentLines(): void;

  /**
   * 更新对齐线显示
   * @param lines - 对齐线数据数组
   */
  updateAlignmentLines(lines?: AlignmentLineData[]): void;

  /**
   * 鼠标按下事件处理
   * @param event - 鼠标事件
   * @param screenX - 屏幕X坐标
   * @param screenY - 屏幕Y坐标
   */
  onMouseDown(event: MouseEvent, screenX: number, screenY: number): void;

  /**
   * 鼠标移动事件处理
   * 处理正交模式、捕捉逻辑和对齐线显示
   * @param event - 鼠标事件
   * @param screenX - 屏幕X坐标
   * @param screenY - 屏幕Y坐标
   */
  onMouseMove(event: MouseEvent, screenX: number, screenY: number): void;

  /**
   * 鼠标抬起事件处理
   * @param event - 鼠标事件
   * @param screenX - 屏幕X坐标
   * @param screenY - 屏幕Y坐标
   */
  onMouseUp(event: MouseEvent, screenX: number, screenY: number): void;

  /**
   * 清理资源，调用父类清理方法并重置状态
   */
  onCleanup(): void;
}

/**
 * HSApp全局命名空间扩展
 */
declare global {
  namespace HSApp {
    namespace View {
      namespace SVG {
        /** 临时视图基类 */
        class Temp {
          protected context: SVGContext;
          protected layer: Layer;
          protected drawing?: Element;
          protected element?: Element[];
          
          constructor(context: SVGContext, layer: Layer, ...args: unknown[]);
          
          draw(): void;
          onCleanup(args: unknown[]): void;
        }
        
        const Util: typeof SVGUtil;
        const EdgeInference: typeof import('./EdgeInference').EdgeInference;
      }
    }
    
    namespace App {
      function getApp(): {
        floorplan: Floorplan;
      };
    }
  }
}