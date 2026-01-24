import Flatten from '@flatten-js/core';
import { ToolType } from './ToolType';
import { Utils, ShapeColor } from './Utils';
import { Artisan, DrawParams } from './Artisan';
import {
  ExtraDim,
  ExtraDimTypeEnum,
  FrameRelationEnum,
  ExtraDimHorizontal,
  ExtraDimVertical,
  WinPolygon,
  FrameRelation,
  DockInfo,
  PolyId
} from './ExtraDimTypes';

/**
 * 框架关系接口
 * 描述标注点与框架或停靠点的关系
 */
export interface IFrameRelation {
  /** 框架索引（可选） */
  frameIdx?: number;
  /** 关系类型：框架或停靠点 */
  type: FrameRelationEnum;
  /** 顶点索引（当type为frame时） */
  vertexIndex?: number;
  /** 停靠点信息（当type为dock时） */
  dock?: {
    dockId: string;
    polyId: PolyId;
  };
}

/**
 * 视图对象接口
 */
export interface IView {
  shapeManager: {
    shapem: Record<number, IHost>;
    drag(target: any, offset: Flatten.Vector): void;
  };
}

/**
 * 宿主对象接口
 * 代表承载标注的图形实体
 */
export interface IHost {
  /** 多边形数据 */
  polygon: {
    vertices: Flatten.Point[];
    edges: Flatten.Segment[];
    contains(point: Flatten.Point): boolean;
    polyId: PolyId;
  };
  /** 视图引用 */
  view: IView;
  /** 多重管理器 */
  mulManager: {
    bars: IBar[];
    dockMgr: {
      getData(dockId: string): Array<{ idx: PolyId; pt: Flatten.Point }> | undefined;
    };
  };
  /** 框架管理器 */
  frameManager: {
    bars: IBar[];
  };
  /**
   * 获取点在框架中的位置关系
   * @param point 目标点
   * @param checkDock 是否检查停靠点
   * @returns 框架关系对象
   */
  getPointPosition(point: Flatten.Point, checkDock: boolean): IFrameRelation | undefined;
  /**
   * 编辑标注尺寸
   * @param edgeIndex 边索引
   * @param scale 缩放比例
   * @param offset 偏移向量
   * @param view 视图对象
   */
  editDim(edgeIndex: number, scale: number, offset: Flatten.Vector, view: IView): void;
  /** 更新框架 */
  updateFrame(recursive: boolean): void;
  /** 绘制 */
  draw(view: IView): void;
}

/**
 * 条/杆对象接口
 */
export interface IBar {
  polygon: {
    polyId: PolyId;
    contains(point: Flatten.Point): boolean;
  };
}

/**
 * 可视化图形接口
 */
export interface IVShape {
  moveTo(layer: any): void;
  hide(): void;
  getLayer(): any;
  setAttr(key: string, value: any): void;
  moveToTop(): void;
  attrs: {
    data: {
      segs: Flatten.Segment[];
      [key: string]: any;
    };
  };
}

/**
 * 任意方向额外标注类
 * 用于在图形上创建任意方向的尺寸标注
 * 继承自ExtraDim基类
 */
export declare class ExtraDimArbitrary extends ExtraDim {
  /** 标注起点 */
  sPt: Flatten.Point;
  
  /** 标注终点 */
  ePt: Flatten.Point;
  
  /** 宿主对象（承载标注的图形） */
  host: IHost;
  
  /** 偏移向量 */
  offVec: Flatten.Vector;
  
  /** 图形片段数组（用于绘制标注线） */
  shapes: Flatten.Segment[][];
  
  /** 框架关系数组（描述标注点与框架的关联） */
  frameRelation: IFrameRelation[];
  
  /** 标注数值 */
  value: number;
  
  /** 可视化图形数组 */
  vshapes: IVShape[];
  
  /** 标注参数 */
  params: {
    extraDim: number;
  };
  
  /** 顶层框架引用 */
  topFrame: IHost;

  /**
   * 构造函数
   * @param startPoint 起点坐标
   * @param endPoint 终点坐标
   * @param host 宿主对象
   * @param offsetVector 偏移向量（默认为零向量）
   */
  constructor(
    startPoint: Flatten.Point,
    endPoint: Flatten.Point,
    host: IHost,
    offsetVector?: Flatten.Vector
  );

  /**
   * 获取额外标注类型
   * @returns 返回任意类型枚举值
   */
  get extraDimType(): ExtraDimTypeEnum;

  /**
   * 绘制标注到视图
   * 管理可视化图形的创建、更新和回收
   * @param view 目标视图对象
   */
  draw(view: IView): void;

  /**
   * 从框架关系更新标注点坐标
   * 根据frameRelation数组中的关系信息同步更新sPt和ePt
   */
  updatePtFromRelation(): void;

  /**
   * 从框架关系获取实际点坐标
   * @param relation 框架关系对象
   * @returns 计算得到的点坐标，失败返回undefined
   */
  getPtFromRelation(relation: IFrameRelation): Flatten.Point | undefined;

  /**
   * 创建框架关系
   * 建立标注点与框架顶点/停靠点的关联
   * @param relations 预定义的关系数组（可选）
   * @param checkDock 是否检查停靠点（默认false）
   */
  createFrameRelation(relations?: IFrameRelation[], checkDock?: boolean): void;

  /**
   * 创建标注图形
   * 计算并生成标注线段及辅助线
   * @param autoOffset 是否自动应用偏移（默认true）
   */
  create(autoOffset?: boolean): void;

  /**
   * 获取编辑标注所需的上下文信息
   * @returns 元组 [宿主对象, 目标杆, 方向向量, 是否框架编辑, 边索引]
   */
  getEditDimInfo(): [IHost, IBar | undefined, Flatten.Vector | undefined, boolean, number | undefined];

  /**
   * 计算标注方向向量
   * 根据标注类型（水平/垂直/任意）计算归一化方向
   * @param fromPoint 起始点
   * @param toPoint 目标点
   * @returns 归一化的方向向量
   */
  getDir(fromPoint: Flatten.Point, toPoint: Flatten.Point): Flatten.Vector;

  /**
   * 应用标注值差异
   * 根据新值与当前值的差异更新图形
   * @param newValue 新的标注值
   */
  applyDiff(newValue: number): void;

  /**
   * 获取标注的碰撞多边形
   * 用于交互检测（鼠标悬停、点击等）
   * @returns 碰撞检测用的多边形对象
   */
  hitPolygon(): WinPolygon | undefined;

  /**
   * 添加图形到组
   * @param shapes 要添加的图形数组
   */
  addToGroup(shapes: IVShape[]): void;
}