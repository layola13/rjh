/**
 * 区域模块
 * 表示由共边路径定义的2D区域，可以被拉伸成3D实体
 */

import { Box2, Plane } from './geometry';
import { TgWallUtil, ShellWrapper } from './wall-util';

/**
 * 曲线接口
 * 表示2D平面上的曲线对象
 */
export interface Curve {
  /** 获取曲线的包围盒 */
  getBoundingBox(): Box2;
}

/**
 * 共边对象
 * 表示拓扑边界上的一条有向边
 */
export interface CoEdge {
  /** 共边唯一标识符 */
  id: string | number;
  /** 关联的曲线对象 */
  curve: Curve;
  /** 拓扑名称信息 */
  topoName: {
    /** 拓扑名称ID */
    id: string | number;
  };
}

/**
 * 共边路径结构
 * 定义区域的外轮廓和内部孔洞
 */
export interface CoEdgePath {
  /** 外轮廓共边数组 */
  outer: CoEdge[];
  /** 孔洞共边数组（每个孔洞是一个共边数组） */
  holes: CoEdge[][];
}

/**
 * 路径结构
 * 由曲线组成的路径表示
 */
export interface Path {
  /** 外轮廓曲线数组 */
  outer: Curve[];
  /** 孔洞曲线数组（每个孔洞是一个曲线数组） */
  holes: Curve[][];
}

/**
 * B-Rep面对象
 * 表示边界表示法中的面
 */
export interface BrepFace {
  // B-Rep面的具体属性由实现定义
}

/**
 * 拓扑面对象
 * 关联B-Rep面和区域的拓扑结构
 */
export interface TopoFace {
  /** 关联的B-Rep面对象 */
  brepFace: BrepFace;
}

/**
 * 区域类
 * 表示由封闭的共边路径定义的2D区域，支持拉伸生成3D几何体
 */
export class Region {
  /** 区域唯一标识符 */
  readonly id: string | number;
  
  /** 关联的墙体ID列表 */
  linkWallIds: Array<string | number>;
  
  /** 共边路径定义（包含外轮廓和孔洞） */
  coEdgePath: CoEdgePath;
  
  /** 拓扑面列表 */
  topoFaces: TopoFace[];
  
  /** 拉伸后的壳体包装器 */
  shellWrapper?: ShellWrapper;

  /**
   * 构造函数
   * @param id - 区域的唯一标识符
   */
  constructor(id: string | number);

  /**
   * 获取活动文档的楼层平面
   * @internal
   */
  private get _fp(): unknown;

  /**
   * 获取由曲线组成的路径
   * @returns 包含外轮廓和孔洞的曲线路径
   */
  get path(): Path;

  /**
   * 获取区域包围盒的最小点坐标
   * @returns 包围盒左下角坐标
   */
  get min(): { x: number; y: number };

  /**
   * 将区域沿Z轴拉伸生成3D实体
   * @param height - 拉伸高度
   * @param offset - 偏移量
   * @param options - 拉伸选项参数
   */
  extrudeBody(height: number, offset: number, options: unknown): void;

  /**
   * 根据B-Rep面查找对应的拓扑面
   * @param brepFace - B-Rep面对象
   * @returns 找到的拓扑面对象，未找到返回undefined
   */
  getTopoFaceByBrepFace(brepFace: BrepFace): TopoFace | undefined;

  /**
   * 获取所有共边的ID列表
   * @returns 包含外轮廓和所有孔洞的共边ID数组
   */
  get allCoEdgeIds(): Array<string | number>;

  /**
   * 获取所有共边的拓扑名称ID列表
   * @returns 包含外轮廓和所有孔洞的拓扑名称ID数组
   */
  get allCoEdgeTopoNameIds(): Array<string | number>;

  /**
   * 根据ID查找共边对象
   * @param id - 共边ID
   * @returns 找到的共边对象，未找到返回undefined
   * @internal
   */
  private _getCoEdge(id: string | number): CoEdge | undefined;
}