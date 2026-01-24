/**
 * 矩形绘制预览工具类型定义
 * 用于在画布上绘制矩形时显示实时预览效果
 */

/**
 * SVG 样式属性接口
 */
interface SVGStyleAttributes {
  /** 描边宽度 */
  'stroke-width': number;
  /** 描边颜色 */
  stroke: string;
  /** 填充透明度 */
  'fill-opacity': number;
  /** 填充颜色 */
  fill: string;
  /** 描边虚线样式（可选） */
  'stroke-dasharray'?: string;
}

/**
 * 矩形属性接口
 */
interface RectangleAttributes extends Partial<SVGStyleAttributes> {
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
}

/**
 * 2D 坐标点接口
 */
interface Point2D {
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
}

/**
 * 鼠标事件位置信息接口
 */
interface MouseEventPosition {
  /** 坐标点 */
  position: Point2D;
  /** 原始鼠标事件 */
  event: MouseEvent;
}

/**
 * SVG 画布上下文接口
 */
interface SVGContext {
  /**
   * 创建矩形元素
   * @param x - X 坐标
   * @param y - Y 坐标
   * @returns 可链式调用的矩形元素
   */
  rect(x: number, y: number): SVGRectElement;
}

/**
 * SVG 矩形元素接口（支持链式调用）
 */
interface SVGRectElement {
  /**
   * 设置元素属性
   * @param attributes - 属性对象
   * @returns 当前元素实例
   */
  attr(attributes: Partial<RectangleAttributes>): this;
  
  /**
   * 隐藏元素
   * @returns 当前元素实例
   */
  hide(): this;
  
  /**
   * 显示元素
   * @returns 当前元素实例
   */
  show(): this;
}

/**
 * SVG 图层接口
 */
interface SVGLayer {
  /**
   * 添加子元素
   * @param element - SVG 元素
   */
  appendChild(element: SVGRectElement): void;
  
  /**
   * 移除子元素
   * @param element - SVG 元素
   */
  removeChild(element: SVGRectElement): void;
}

/**
 * 画布接口
 */
interface Canvas {
  /** 画布上下文 */
  context: unknown;
}

/**
 * 命令对象接口
 */
interface Command {
  /** 起始点 */
  _startPoint: Point2D;
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  /**
   * 接收命令
   * @param eventName - 事件名称
   * @param data - 事件数据
   */
  receive(eventName: string, data: MouseEventPosition): void;
}

/**
 * 环境管理器接口
 */
interface Environment {
  /** 是否激活 */
  active: boolean;
}

/**
 * 环境管理器接口
 */
interface EnvironmentManager {
  /**
   * 获取环境实例
   * @param name - 环境名称
   * @returns 环境实例或 null
   */
  getEnvironment(name: string): Environment | null;
}

/**
 * 左侧菜单插件接口
 */
interface LeftMenuPlugin {
  /**
   * 显示左侧菜单栏
   * @param position - 菜单显示位置
   */
  showLeftMenuBar(position: { x: number; y: number }): void;
}

/**
 * 插件管理器接口
 */
interface PluginManager {
  /**
   * 获取插件实例
   * @param pluginType - 插件类型
   * @returns 插件实例
   */
  getPlugin(pluginType: string): LeftMenuPlugin;
}

/**
 * 应用程序接口
 */
interface HSApplication {
  /** 命令管理器 */
  cmdManager: CommandManager;
  /** 环境管理器 */
  environmentManager: EnvironmentManager;
  /** 插件管理器 */
  pluginManager: PluginManager;
}

/**
 * SVG 临时绘制基类
 */
declare class SVGTempBase {
  /**
   * 构造函数
   * @param context - SVG 上下文
   * @param layer - SVG 图层
   * @param cmd - 命令对象
   * @param flag - 标志位
   */
  constructor(context: SVGContext, layer: SVGLayer, cmd: Command, flag: boolean);
  
  /**
   * 清理资源
   * @param args - 清理参数
   */
  protected onCleanup(args: unknown[]): void;
}

/**
 * 矩形绘制预览工具类
 * 继承自 SVGTempBase，提供矩形绘制时的实时预览功能
 */
export default class RectangleDrawPreview extends SVGTempBase {
  /** 命令对象 */
  cmd: Command;
  
  /** SVG 图层 */
  layer: SVGLayer;
  
  /** SVG 上下文 */
  context: SVGContext;
  
  /** 画布实例 */
  canvas: Canvas;
  
  /** 当前坐标向量 [x, y] */
  newVec: [number, number];
  
  /** 起始坐标向量 [x, y] */
  originVec: [number, number];
  
  /** 是否处于预览状态 */
  isPreview: boolean;
  
  /** 预览元素 */
  previewElement?: SVGRectElement;
  
  /** 首次移动计数器 */
  firstMove: number;
  
  /** 上次鼠标移动时间戳 */
  lastMoveTime?: number;
  
  /** 矩形宽度 */
  width: number;
  
  /** 矩形高度 */
  height: number;
  
  /** 正常预览样式（向右拖拽） */
  previewStyle: SVGStyleAttributes;
  
  /** 反向预览样式（向左拖拽） */
  falsePreviewStyle: SVGStyleAttributes;
  
  /**
   * 构造函数
   * @param context - SVG 上下文
   * @param layer - SVG 图层
   * @param cmd - 命令对象
   */
  constructor(context: SVGContext, layer: SVGLayer, cmd: Command);
  
  /**
   * 绘制预览元素
   * 初始化或更新预览矩形
   */
  onDraw(): void;
  
  /**
   * 鼠标移动事件处理
   * @param event - 鼠标事件
   * @param screenX - 屏幕 X 坐标
   * @param screenY - 屏幕 Y 坐标
   */
  onMouseMove(event: MouseEvent, screenX: number, screenY: number): void;
  
  /**
   * 鼠标释放事件处理
   * @param event - 鼠标事件
   * @param screenX - 屏幕 X 坐标
   * @param screenY - 屏幕 Y 坐标
   */
  onMouseUp(event: MouseEvent, screenX: number, screenY: number): void;
  
  /**
   * 更新预览显示
   * 根据拖拽方向和距离更新预览矩形的位置、大小和样式
   */
  updatePreview(): void;
  
  /**
   * 清理资源
   * 重置状态并调用父类清理方法
   */
  onCleanup(): void;
  
  /**
   * 重置预览状态
   * 移除预览元素并重置标志位
   */
  reset(): void;
}

/**
 * 全局命名空间声明
 */
declare global {
  const HSApp: {
    App: {
      /**
       * 获取应用程序单例
       * @returns 应用程序实例
       */
      getApp(): HSApplication;
    };
    View: {
      SVG: {
        /** SVG 临时绘制基类 */
        Temp: typeof SVGTempBase;
        Util: {
          /**
           * 将屏幕坐标转换为画布坐标
           * @param screenPoint - 屏幕坐标 [x, y]
           * @param canvasContext - 画布上下文
           * @returns 画布坐标 [x, y]
           */
          ScreenPointToCanvas(screenPoint: [number, number], canvasContext: unknown): [number, number];
        };
      };
    };
  };
  
  const HSFPConstants: {
    PluginType: {
      /** 左侧菜单插件类型常量 */
      LeftMenu: string;
    };
  };
}