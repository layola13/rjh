/**
 * Module: MoveSlabProfileVertex
 * 用于移动楼板轮廓顶点的交互工具类
 * Original Module ID: 148972
 */

declare namespace HSApp.View.SVG {
  /**
   * 临时绘图基类
   */
  class Temp {
    constructor(context: any, layer: any, command: any, autoCleanup: boolean);
    
    /** 绘图上下文 */
    context: any;
    
    /** 绘图层 */
    layer: any;
    
    /** 绘图元素 */
    drawing?: any;
    
    /** 关联的命令对象 */
    cmd: any;
    
    /** 在绘制时调用 */
    onDraw(): void;
    
    /** 清理资源 */
    onCleanup(): void;
  }

  /**
   * 点推断工具，用于计算捕捉点和对齐线
   */
  class PointInference {
    constructor(context: any);
    
    /** 是否启用墙体轴线捕捉 */
    enableWallAxes: boolean;
    
    /** 是否启用墙体边界捕捉 */
    enableWallBorders: boolean;
    
    /**
     * 设置用于捕捉的墙体列表
     * @param walls 墙体数组
     */
    setSnapWalls(walls: any[]): void;
    
    /**
     * 设置用于捕捉的辅助线列表
     * @param lines 线段数组，每个线段由两个点组成
     */
    setSnapLines(lines: Array<[Point, Point]>): void;
    
    /**
     * 求解捕捉位置
     * @param position 当前位置
     * @param result 输出结果对象，包含offset偏移和indicateLines指示线
     * @returns 是否找到捕捉点
     */
    solve(position: Point, result: InferenceResult): boolean;
  }

  namespace Util {
    /**
     * 将屏幕坐标转换为模型坐标
     * @param screenPoint 屏幕坐标 [x, y]
     * @param context 绘图上下文
     * @returns 模型坐标 [x, y]
     */
    function ScreenPointToModel(screenPoint: [number, number], context: any): [number, number];
    
    /**
     * 更新捕捉线的SVG元素显示
     * @param context 绘图上下文
     * @param point1 线段起点
     * @param point2 线段终点
     * @param svgElement SVG元素
     */
    function UpdateSnappedLineSVGElements(
      context: any,
      point1: Point,
      point2: Point,
      svgElement: any
    ): void;
  }
}

/**
 * 二维点坐标
 */
interface Point {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 推断结果，包含捕捉偏移和指示线
 */
interface InferenceResult {
  /** 捕捉偏移量 */
  offset?: Point;
  /** 对齐指示线数组 */
  indicateLines?: Array<[Point, Point]>;
}

/**
 * 顶点对象，表示楼板轮廓的一个顶点
 */
interface Vertex extends Point {
  /** 顶点唯一标识符 */
  ID: string | number;
}

/**
 * 墙体对象
 */
interface Wall {
  /** 墙体起点顶点 */
  from: Vertex;
  /** 墙体终点顶点 */
  to: Vertex;
}

/**
 * 模型图层
 */
interface ModelLayer {
  /** 上一层 */
  prev?: ModelLayer;
  
  /**
   * 遍历图层中的所有墙体
   * @param callback 回调函数
   * @param context 上下文对象
   */
  forEachWall(callback: (wall: Wall) => void, context?: any): void;
  
  /**
   * 遍历图层中的所有楼板
   * @param callback 回调函数
   */
  forEachFloorSlab(callback: (slab: FloorSlab) => void): void;
}

/**
 * 楼板对象
 */
interface FloorSlab {
  /** 基础轮廓 */
  baseProfile: Profile;
}

/**
 * 轮廓对象
 */
interface Profile {
  /**
   * 获取轮廓的所有顶点
   * @returns 顶点数组
   */
  getLoopVertices(): Vertex[];
}

/**
 * 移动顶点命令对象
 */
interface MoveSlabProfileVertexCommand {
  /** 要移动的顶点 */
  vertex: Vertex;
  /** 关联的模型图层 */
  modelLayer: ModelLayer;
  /** 移动开始时的位置 */
  moveBeginPosition: Point;
}

/**
 * 鼠标事件对象
 */
interface MouseEventWithCtrl extends MouseEvent {
  /** 是否按下Ctrl键 */
  ctrlKey: boolean;
}

declare namespace HSApp.View.SVG {
  /**
   * 移动楼板轮廓顶点的交互工具
   * 支持捕捉、对齐线显示和正交模式
   */
  export class MoveSlabProfileVertex extends Temp {
    /**
     * 构造函数
     * @param context 绘图上下文
     * @param layer 绘图层
     * @param command 移动顶点命令对象
     */
    constructor(context: any, layer: any, command: MoveSlabProfileVertexCommand);
    
    /** 对齐指示线元素数组 */
    alignmentLines: any[];
    
    /** 点推断工具实例 */
    inference: PointInference;
    
    /** 关联的命令对象 */
    cmd: MoveSlabProfileVertexCommand;
    
    /** 参考点（被移动的顶点） */
    referencePoint?: Vertex;
    
    /** 移动开始时的位置 */
    beginPosition?: Point;
    
    /** 开始时光标相对于顶点的偏移 */
    beginCursorOffset: Point;
    
    /** SVG元素数组 */
    element?: any[];
    
    /**
     * 重置工具状态
     */
    reset(): void;
    
    /**
     * 绘制工具UI（对齐线等）
     */
    onDraw(): void;
    
    /**
     * 更新推断系统的捕捉目标
     * 包括相邻顶点、墙体和正交辅助线
     */
    updateInference(): void;
    
    /**
     * 构建工具的初始状态
     * @private
     */
    _build(): void;
    
    /**
     * 处理鼠标移动事件
     * @param event 鼠标事件
     * @param screenX 屏幕X坐标
     * @param screenY 屏幕Y坐标
     */
    onMouseMove(event: MouseEventWithCtrl, screenX: number, screenY: number): void;
    
    /**
     * 隐藏所有对齐指示线
     */
    hideAlignmentLines(): void;
    
    /**
     * 更新对齐指示线的显示
     * @param lines 要显示的线段数组
     */
    updateAlignmentLines(lines: Array<[Point, Point]>): void;
    
    /**
     * 清理资源，重置状态
     */
    onCleanup(): void;
  }
}

declare namespace HSApp.App {
  /**
   * 获取应用程序单例实例
   * @returns 应用程序实例
   */
  function getApp(): Application;
  
  interface Application {
    /** 命令管理器 */
    cmdManager: CommandManager;
    /** 应用程序设置 */
    appSettings: AppSettings;
  }
  
  interface CommandManager {
    /**
     * 接收并执行命令
     * @param command 命令名称
     * @param params 命令参数
     */
    receive(command: string, params: any): void;
  }
  
  interface AppSettings {
    /** 是否开启正交模式 */
    orthoModeOn: boolean;
  }
}

/** 模块导出ID */
export const ID: number;

/** 默认导出：MoveSlabProfileVertex类 */
export { MoveSlabProfileVertex } from 'HSApp.View.SVG';