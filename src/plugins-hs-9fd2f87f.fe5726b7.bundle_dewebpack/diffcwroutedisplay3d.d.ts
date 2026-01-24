/**
 * 3D路径显示模块 - 用于在3D场景中渲染和显示差异化隐蔽工程路径
 * @module DiffCWRouteDisplay3D
 */

import { Display3D } from 'HSApp/View/T3d/Base/Display3D';
import { DiffCWRouteController } from './DiffCWRouteController';
import { MeshBasicMaterial, RasterizerCullMode } from './Material';
import { HSCore } from 'HSCore';
import { HSApp } from 'HSApp';

/**
 * 材质颜色配置接口
 */
interface MaterialColors {
  /** 正常状态颜色 (默认: 0xFF9FA3) */
  normal: number;
  /** 悬停状态颜色 (默认: 0x00F5FF) */
  hover: number;
  /** 选中状态颜色 (默认: 0x096E7F) */
  selected: number;
}

/**
 * 路径实体接口
 */
interface RouteEntity {
  /** 路径直径 */
  diameter: number;
  /** 路径段集合 */
  path: PathSegment[];
  /** 检查实体标志位 */
  isFlagOn(flag: number): boolean;
}

/**
 * 路径段接口
 */
interface PathSegment {
  /** 获取起点坐标 */
  getStartPt(): Point3D;
  /** 获取终点坐标 */
  getEndPt(): Point3D;
}

/**
 * 3D点坐标接口
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
  /** 向量减法 */
  subtracted(other: Point3D): Point3D;
  /** 向量归一化 */
  normalize(): Point3D;
  /** 向量乘法 */
  multiply(scalar: number): Point3D;
  /** 平移坐标 */
  translate(offset: Point3D): void;
  /** 返回平移后的新坐标 */
  translated(offset: Point3D): Point3D;
  /** 反转向量 */
  reversed(): Point3D;
  /** 原地反转向量 */
  reverse(): Point3D;
}

/**
 * 3D上下文接口
 */
interface Context3D {
  /** 标记需要重新渲染 */
  needsRendering: boolean;
  /** HSCanvas 选择器 */
  hscanvas: {
    selector: {
      picker: {
        addTrackingNodeByNode(layer: number, target: any, node: any): void;
        removeTrackingNodeByNode(layer: number, node: any): void;
      };
    };
    EPickLayer: {
      concealedwork: number;
    };
  };
}

/**
 * 3D对象节点接口
 */
interface Object3DNode {
  /** 设置节点可见性 */
  setVisible(visible: boolean): void;
  /** 添加子节点 */
  addChild(child: Object3DNode): void;
  /** 移除子节点 */
  removeChild(child: Object3DNode): void;
  /** 清除所有子节点 */
  clear(): void;
}

/**
 * 差异化隐蔽工程路径 3D 显示类
 * 负责在3D场景中渲染路径管线、箭头指示器及轮廓效果
 * @extends Display3D
 */
export declare class DiffCWRouteDisplay3D extends Display3D {
  /**
   * 构造函数
   * @param context - 3D渲染上下文
   * @param group - 父级分组节点
   * @param entity - 路径实体数据
   * @param config - 显示配置参数
   * @param controller - 路径控制器（可选，默认创建新实例）
   */
  constructor(
    context: Context3D,
    group: Object3DNode,
    entity: RouteEntity,
    config: any,
    controller?: DiffCWRouteController
  );

  /** 路径管线直径 */
  diameter: number;

  /** 材质颜色配置（私有） */
  private _mtlColor: MaterialColors;

  /** 主材质对象（私有） */
  private _material: MeshBasicMaterial;

  /** 轮廓材质对象（私有） */
  private _outlineMtl: MeshBasicMaterial;

  /** 网格节点数组（私有） */
  private _meshNode: Object3DNode[];

  /** 轮廓网格节点数组（私有） */
  private _outlineMeshNode: Object3DNode[];

  /**
   * 初始化3D显示对象
   * 创建主节点并添加到场景分组
   */
  init(): void;

  /**
   * 绘制回调函数
   * 当几何体或材质标记为脏时触发重绘
   */
  onDraw(): void;

  /**
   * 清理回调函数
   * 清除所有网格对象并释放资源
   */
  onCleanup(): void;

  /**
   * 标志位变化回调
   * @param flag - 变化的标志位枚举值
   */
  onFlagChanged(flag: number): void;

  /**
   * 更新可见性状态
   * @param visible - 是否可见
   */
  updateVisibleStatus(visible: boolean): void;

  /**
   * 清除所有网格节点（私有）
   * 从场景中移除并清空网格数组
   */
  private _clearMesh(): void;

  /**
   * 执行绘制操作（私有）
   * 清除旧网格，创建管线和箭头网格，添加到场景
   */
  private _draw(): void;

  /**
   * 创建箭头网格（私有）
   * 在路径末端生成圆锥形方向指示器
   */
  private _createArrowMesh(): void;

  /**
   * 创建管线网格（私有）
   * 根据路径段生成圆柱体管线及连接处的过渡曲线
   */
  private _createTubeMesh(): void;

  /**
   * 更新样式（私有）
   * 根据实体状态（选中/悬停/正常）更新材质颜色
   */
  private _updateStyle(): void;
}