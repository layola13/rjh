/**
 * SublineHelper 模块
 * 用于处理 2D 视图中的辅助线和几何图形捕捉显示
 */

import { Curve2d, Matrix3, Vector2 } from './geo-lib';
import { PathItem } from './path-item';
import { DashAttr, SnapAttr } from './attributes';
import {
  CircleSnapGeometry,
  ArcSnapGeometry,
  LineSnapGeometry,
  PointSnapGeometry,
  SnapGeometry
} from './snap-geometry';
import { EndPointItem, EndPointType } from './endpoint-item';

/**
 * 几何图形捕捉信息接口
 */
interface SnapInfo {
  /** 几何图形快照对象 */
  geo: Curve2d | Vector2;
}

/**
 * 捕捉对接口
 */
interface SnapPair {
  /** 主捕捉几何体 */
  master: SnapGeometry;
  /** 客户端捕捉几何体 */
  client: SnapGeometry;
}

/**
 * 变换选项接口
 */
interface TransformOptions {
  /** X 轴平移量 */
  dx?: number;
  /** Y 轴平移量 */
  dy?: number;
  /** 旋转中心点 */
  center?: Vector2;
  /** 旋转角度增量（弧度） */
  drotation?: number;
}

/**
 * 2D 视图上下文接口
 */
interface View2DContext {
  // 上下文相关属性和方法
}

/**
 * 辅助图形项类型
 */
type AuxiliaryItem = PathItem | EndPointItem;

/**
 * SublineHelper 类
 * 单例模式，用于管理和显示 2D 视图中的辅助线、捕捉几何体等辅助图形
 */
export declare class SublineHelper {
  /** 单例实例 */
  private static _instance?: SublineHelper;

  /** 2D 视图上下文 */
  private context?: View2DContext;

  /** 辅助图形项数组 */
  private auxiliaries: AuxiliaryItem[];

  /**
   * 私有构造函数（单例模式）
   */
  private constructor();

  /**
   * 获取 SublineHelper 单例实例
   * @returns SublineHelper 实例
   */
  static getInstance(): SublineHelper;

  /**
   * 执行辅助线显示逻辑
   * @param first - 第一个捕捉对（可选）
   * @param second - 第二个捕捉对（可选）
   * @param transform - 变换选项
   */
  execute(
    first: SnapPair | null,
    second: SnapPair | null,
    transform: TransformOptions
  ): void;

  /**
   * 显示快照几何体数组
   * @param snapInfos - 快照信息数组
   */
  showSnapGeometry(snapInfos: SnapInfo[]): void;

  /**
   * 显示所有辅助图形
   */
  showAll(): void;

  /**
   * 隐藏并清理所有辅助图形
   */
  hideAll(): void;

  /**
   * 更新上下文（从当前活动的 2D 视图获取）
   */
  updateContext(): void;

  /**
   * 处理单个捕捉对
   * @param snapPair - 捕捉对
   * @param transform - 变换选项
   */
  handleSingle(snapPair: SnapPair, transform: TransformOptions): void;

  /**
   * 处理圆到圆的捕捉
   * @param master - 主圆捕捉几何体
   * @param client - 客户端圆捕捉几何体
   * @param transform - 变换选项
   */
  private handle_C2C(
    master: CircleSnapGeometry,
    client: CircleSnapGeometry,
    transform: TransformOptions
  ): void;

  /**
   * 处理圆到圆弧的捕捉
   * @param master - 主圆捕捉几何体
   * @param client - 客户端圆弧捕捉几何体
   * @param transform - 变换选项
   */
  private handle_C2A(
    master: CircleSnapGeometry,
    client: ArcSnapGeometry,
    transform: TransformOptions
  ): void;

  /**
   * 处理直线到圆的捕捉
   * @param master - 主直线捕捉几何体
   * @param client - 客户端圆捕捉几何体
   * @param transform - 变换选项
   */
  private handle_L2C(
    master: LineSnapGeometry,
    client: CircleSnapGeometry,
    transform: TransformOptions
  ): void;

  /**
   * 处理直线到圆弧的捕捉
   * @param master - 主直线捕捉几何体
   * @param client - 客户端圆弧捕捉几何体
   * @param transform - 变换选项
   */
  private handle_L2A(
    master: LineSnapGeometry,
    client: ArcSnapGeometry,
    transform: TransformOptions
  ): void;

  /**
   * 处理圆到直线的捕捉
   * @param master - 主圆捕捉几何体
   * @param client - 客户端直线捕捉几何体
   * @param transform - 变换选项
   */
  private handle_C2L(
    master: CircleSnapGeometry,
    client: LineSnapGeometry,
    transform: TransformOptions
  ): void;

  /**
   * 处理直线到直线的捕捉
   * @param master - 主直线捕捉几何体
   * @param client - 客户端直线捕捉几何体
   * @param transform - 变换选项
   */
  private handle_L2L(
    master: LineSnapGeometry,
    client: LineSnapGeometry,
    transform: TransformOptions
  ): void;

  /**
   * 处理点到直线的捕捉
   * @param master - 主点捕捉几何体
   * @param client - 客户端直线捕捉几何体
   * @param transform - 变换选项
   */
  private handle_P2L(
    master: PointSnapGeometry,
    client: LineSnapGeometry,
    transform: TransformOptions
  ): void;

  /**
   * 处理点到点的捕捉
   * @param master - 主点捕捉几何体
   * @param client - 客户端点捕捉几何体
   */
  private handle_P2P(
    master: PointSnapGeometry,
    client: PointSnapGeometry
  ): void;
}