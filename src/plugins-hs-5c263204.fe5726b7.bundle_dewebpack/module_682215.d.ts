/**
 * 命名空间：HSCore模型类型定义
 */
declare namespace HSCore.Model {
  /**
   * 梁模型类
   */
  class Beam {}

  /**
   * 自定义梁模型类
   */
  class NCustomizedBeam {}
}

/**
 * 命名空间：HSConstants常量定义
 */
declare namespace HSConstants {
  /**
   * 模型类常量
   */
  enum ModelClass {
    NgBeam = 'NgBeam'
  }
}

/**
 * 命名空间：HSApp应用相关类型
 */
declare namespace HSApp {
  /**
   * 命名空间：吸附功能相关
   */
  namespace Snapping {
    /**
     * 吸附结果类型枚举
     */
    enum SnappingResultType {
      /** 墙线吸附 */
      WallLines = 'WallLines'
    }

    /**
     * 吸附线数据接口
     */
    interface SnapLineData {
      /** 吸附线的点集合 */
      snapLine: Point[];
    }

    /**
     * 吸附结果数据接口
     */
    interface SnappingResult {
      /** 吸附类型 */
      type: SnappingResultType;
      /** 吸附线数据 */
      snapLine: Point[];
    }

    /**
     * 吸附事件数据接口
     */
    interface SnappingEventData {
      /** 吸附结果数组 */
      data?: SnappingResult[];
    }
  }

  /**
   * 命名空间：SVG视图相关
   */
  namespace View.SVG {
    /**
     * SVG路径样式配置接口
     */
    interface PathStyle {
      /** 描边宽度 */
      'stroke-width': number;
      /** 描边颜色 */
      stroke: string;
    }

    /**
     * SVG元素接口
     */
    interface SVGElement {
      /** 隐藏元素 */
      hide(): void;
      /** 显示元素 */
      show?(): void;
      /** 设置属性 */
      attr?(attributes: Record<string, unknown>): this;
    }

    /**
     * SVG路径元素接口
     */
    interface SVGPath extends SVGElement {}

    /**
     * SVG上下文接口
     */
    interface SVGContext {
      /** 创建路径元素 */
      path(): SVGPath;
    }

    /**
     * 辅助线点数据接口
     */
    interface AuxiliaryLineData {
      /** 线段的点集合 */
      points: Point[];
    }

    /**
     * 命名空间：SVG工具方法
     */
    namespace Util {
      /**
       * 构建指示线
       * @param context - SVG上下文
       * @param points - 点集合
       * @returns 处理后的点数组
       */
      function buildIndicateLine(
        context: SVGContext,
        points: Point[]
      ): Point[] | null;

      /**
       * 更新吸附线的SVG元素
       * @param context - SVG上下文
       * @param startPoint - 起点
       * @param endPoint - 终点
       * @param pathElement - 路径元素
       */
      function UpdateSnappedLineSVGElements(
        context: SVGContext,
        startPoint: Point,
        endPoint: Point,
        pathElement: SVGPath
      ): void;
    }

    /**
     * SVG临时视图基类
     * 所有临时SVG视图的抽象基类
     */
    abstract class Temp {
      /** SVG上下文 */
      protected context: SVGContext;
      /** 命令对象 */
      protected cmd: Command;
      /** 信号钩子 */
      protected signalHook: SignalHook;

      /**
       * 构造函数
       * @param element - 元素
       * @param context - SVG上下文
       * @param options - 配置选项
       */
      constructor(
        element: unknown,
        context: SVGContext,
        options: TempOptions
      );

      /**
       * 清理回调方法
       * @param args - 参数数组
       */
      abstract onCleanup(args: unknown[]): void;
    }
  }
}

/**
 * 点坐标接口
 */
interface Point {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 命令对象接口
 */
interface Command {
  /** 输出对象 */
  output: {
    /**
     * 判断是否为指定模型类的实例
     * @param modelClass - 模型类名
     * @returns 是否为该类的实例
     */
    instanceOf(modelClass: string): boolean;
  };
}

/**
 * 信号钩子接口
 */
interface SignalHook {
  /**
   * 监听信号
   * @param signal - 信号对象
   * @param callback - 回调函数
   */
  listen(signal: Signal, callback: Function): void;
}

/**
 * 信号对象接口
 */
interface Signal {}

/**
 * 临时视图配置选项接口
 */
interface TempOptions {
  /** 调整大小吸附信号（可选） */
  signalResizeSnapped?: Signal;
  /** 当前对象（可选） */
  current?: {
    /** 内容对象 */
    content: HSCore.Model.Beam | HSCore.Model.NCustomizedBeam;
    /** 调整大小吸附信号 */
    signalResizeSnapped?: Signal;
  };
}

/**
 * 吸附辅助线视图类
 * 用于在SVG画布上显示吸附操作的辅助线
 * 
 * @extends HSApp.View.SVG.Temp
 * 
 * @example
 *