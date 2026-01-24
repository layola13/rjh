/**
 * 3D屋顶循环辅助显示组件的类型定义
 * 用于在3D视图中可视化和交互屋顶的循环边界
 */

import type { Node, Vector3, Quaternion, MeshBasicMaterial, LineMeshMaterial } from 'T3D';
import type { Vector2, Euler, Shape, ShapeBufferGeometry } from 'Three';
import type { HSCore } from '@/core';
import type { Gizmo } from '@/app/view/base';

/**
 * 屋顶循环信息接口
 */
interface RoofLoopInfo {
  /** 屋顶循环数据 */
  loop: {
    /** 循环的几何路径 */
    loop: {
      /**
       * 获取所有曲线
       */
      getAllCurves(): Array<{
        /**
         * 离散化曲线为点集
         */
        discrete(): Array<{ x: number; y: number }>;
      }>;
    };
    /** 关联的墙体ID列表 */
    linkWallIds: string[];
  };
  /** 所在楼层层级索引 */
  level: number;
}

/**
 * 鼠标事件参数接口
 */
interface MouseEventArgs {
  /** 事件类型 */
  type: string;
  /** 鼠标位置 */
  position?: { x: number; y: number };
  /** 其他事件数据 */
  [key: string]: unknown;
}

/**
 * 3D屋顶循环辅助显示类
 * 
 * 功能：
 * - 在3D场景中显示屋顶循环的面和边界
 * - 支持鼠标悬停高亮效果
 * - 自动计算屋顶相对高度
 * 
 * @extends {Gizmo} 继承自基础辅助显示类
 */
export default class RoofLoopGizmo extends Gizmo {
  /**
   * 屋顶循环信息
   * @private
   */
  private _info: RoofLoopInfo;

  /**
   * 所在楼层图层
   * @private
   */
  private _levelLayer?: HSCore.Model.Layer;

  /**
   * 3D场景节点
   */
  node?: Node;

  /**
   * 子元素节点数组（面节点和边节点）
   */
  elements: Node[];

  /**
   * 面材质（用于渲染屋顶循环的填充面）
   * @private
   */
  private _faceMaterial: MeshBasicMaterial;

  /**
   * 边材质（用于渲染屋顶循环的边界线）
   * @private
   */
  private _edgeMaterial: LineMeshMaterial;

  /**
   * 构造函数
   * 
   * @param canvas - 画布对象
   * @param layer - 图层对象
   * @param info - 屋顶循环信息
   */
  constructor(canvas: unknown, layer: unknown, info: RoofLoopInfo);

  /**
   * 获取屋顶在世界坐标系中的绝对高度
   * 
   * @returns 高度值（米）
   * @private
   */
  private _getHeight(): number;

  /**
   * 对节点进行变换（平移和旋转）
   * 
   * @param node - 需要变换的节点
   * @returns 变换后的节点
   * @private
   */
  private _transformNode(node: Node): Node;

  /**
   * 创建屋顶循环的面节点
   * 
   * @param points - 循环边界的顶点数组
   * @returns 面网格节点
   * @private
   */
  private _createFaceNode(points: Vector2[]): Node;

  /**
   * 创建屋顶循环的边界线节点
   * 
   * @param points - 循环边界的顶点数组
   * @returns 边界线网格节点
   * @private
   */
  private _createEdgeNode(points: Vector2[]): Node;

  /**
   * 创建完整的3D场景节点（包含面和边）
   * @private
   */
  private _createNode(): void;

  /**
   * 绘制辅助显示
   * 如果节点不存在则创建，并设置为可见
   */
  draw(): void;

  /**
   * 显示辅助显示
   */
  show(): void;

  /**
   * 隐藏辅助显示
   */
  hide(): void;

  /**
   * 停用时的回调
   * 清理节点并调用父类方法
   */
  onDeactivate(): void;

  /**
   * 清理时的回调
   * 清理节点并调用父类方法
   */
  onCleanup(): void;

  /**
   * 清理场景节点和元素
   * @private
   */
  private _clearNode(): void;

  /**
   * 鼠标移入事件处理
   * 改变光标样式并高亮显示
   * 
   * @param event - 鼠标事件参数
   */
  onMouseOver(event: MouseEventArgs): void;

  /**
   * 鼠标移出事件处理
   * 恢复光标样式和默认显示状态
   * 
   * @param event - 鼠标事件参数
   */
  onMouseOut(event: MouseEventArgs): void;

  /**
   * 获取屋顶循环信息
   * 
   * @returns 屋顶循环信息对象
   */
  getLoopInfo(): RoofLoopInfo;

  /**
   * 获取所在楼层图层
   * 
   * @returns 楼层图层对象（可能为undefined）
   */
  getLevelLayer(): HSCore.Model.Layer | undefined;

  /**
   * 获取屋顶相对于楼层的相对高度
   * 计算方式：取关联墙体的最大高度，若无墙体则使用楼层高度
   * 
   * @returns 相对高度值（米）
   */
  getRelativeHeight(): number;
}

/**
 * 颜色常量
 */
declare const DEFAULT_COLOR: 4063218; // 默认颜色（淡蓝色）
declare const HOVER_COLOR: 3763966;   // 悬停颜色（深蓝色）

/**
 * 透明度常量
 */
declare const DEFAULT_OPACITY: 0.2;   // 默认透明度
declare const HOVER_OPACITY: 0.6;     // 悬停透明度