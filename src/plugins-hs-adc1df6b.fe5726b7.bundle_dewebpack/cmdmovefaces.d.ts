import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

/**
 * 表示草图中的边缘
 */
interface Edge {
  /** 边缘的唯一标识 */
  id: string;
  /** 其他边缘属性 */
  [key: string]: unknown;
}

/**
 * 表示共边（Coedge）结构
 */
interface Coedge {
  /** 关联的边缘 */
  edge: Edge;
  /** 其他共边属性 */
  [key: string]: unknown;
}

/**
 * 表示环（Loop）结构
 */
interface Loop {
  /** 环中的所有共边 */
  coedges: Coedge[];
  /** 其他环属性 */
  [key: string]: unknown;
}

/**
 * 表示多边形面
 */
interface Polygon {
  /** 外部环 */
  outerLoop: Loop;
  /** 内部环数组（孔洞） */
  innerLoops: Loop[];
  /** 其他多边形属性 */
  [key: string]: unknown;
}

/**
 * 表示2D草图中的点
 */
interface Point2D {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** 其他点属性 */
  [key: string]: unknown;
}

/**
 * 草图构建器接口
 */
interface SketchBuilder {
  /** 获取当前草图对象 */
  getSketch(): Sketch;
  /** 其他构建器方法 */
  [key: string]: unknown;
}

/**
 * 草图对象接口
 */
interface Sketch {
  /** 草图中的所有面 */
  faces?: Polygon[];
  /** 草图中的所有边缘 */
  edges?: Edge[];
  /** 其他草图属性 */
  [key: string]: unknown;
}

/**
 * 命令执行参数
 */
interface ExecuteParams {
  /** 移动的目标位置或偏移量 */
  [key: string]: unknown;
}

/**
 * 移动面命令类
 * 继承自HSApp的ExtraordinarySketch2d命令基类
 * 用于在2D草图中移动选中的多边形面
 */
export declare class CmdMoveFaces extends HSApp.ExtraordinarySketch2d.Cmd.CmdMoveFaces {
  /**
   * 草图构建器实例
   */
  protected _builder: SketchBuilder;

  /**
   * 标识是否可以移动当前选中的面
   */
  canMove: boolean;

  /**
   * 构造函数
   */
  constructor();

  /**
   * 检查多边形是否可以被移动
   * 
   * 验证逻辑：
   * 1. 收集多边形的所有边缘（包括外环和内环）
   * 2. 获取多边形的所有关键点
   * 3. 检查这些点关联的其他边缘是否都在当前多边形内
   * 4. 如果存在外部依赖边缘，则不能移动
   * 
   * @param polygon - 要检查的多边形面
   * @returns 如果多边形可以独立移动返回true，否则返回false
   */
  protected _canPolygonBeMoved(polygon: Polygon): boolean;

  /**
   * 执行移动面命令
   * 
   * 调用父类的onExecute方法执行实际移动操作
   * 如果不能移动（canMove为false），显示提示信息
   * 
   * @param params - 执行参数，包含移动的目标位置等信息
   */
  onExecute(params: ExecuteParams): void;

  /**
   * 获取拓扑无效时的提示信息
   * 
   * @returns 本地化的错误提示字符串
   * @internal
   */
  protected _getToposInvalidTip(): string;
}

/**
 * 全局资源管理器
 */
declare const ResourceManager: {
  /**
   * 获取本地化字符串
   * @param key - 资源键名
   */
  getString(key: string): string;
};

/**
 * 全局提示工具
 */
declare const LiveHint: {
  /**
   * 显示提示信息
   * @param message - 提示消息内容
   * @param duration - 显示时长（毫秒）
   * @param options - 其他选项
   */
  show(message: string, duration: number, options?: unknown): void;
};

/**
 * HSCore命名空间扩展
 */
declare namespace HSCore {
  namespace Util {
    namespace ExtraordinarySketch2d {
      /**
       * 从面集合中提取所有关键点
       * @param faces - 多边形面数组
       * @returns 点的数组
       */
      function getAllPointsFromFaces(faces: Polygon[]): Point2D[];

      /**
       * 根据点集合获取草图中相关的所有边缘
       * @param sketch - 草图对象
       * @param points - 点的数组
       * @returns 边缘数组
       */
      function getAllEdgesByPoints(sketch: Sketch, points: Point2D[]): Edge[];
    }
  }
}

/**
 * HSApp命名空间扩展
 */
declare namespace HSApp {
  namespace ExtraordinarySketch2d {
    namespace Cmd {
      /**
       * 移动面命令基类
       */
      class CmdMoveFaces {
        /**
         * 执行命令的核心方法
         * @param params - 执行参数
         */
        onExecute(params: ExecuteParams): void;
      }
    }
  }
}