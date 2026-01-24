/**
 * Sketch 2D 视图类型定义
 * 用于渲染和管理草图元素的显示对象
 * @module Sketch
 */

import type { HSCore } from '../../../core';
import type { HSApp } from '../../../app';
import type { Display2D } from '../Base/Display2D';
import type { Context } from '../../../context';
import type { InteractiveModel } from '../../../app/ExtraordinarySketch2d/InteractiveModel';
import type { Background } from './Background';
import type { Face } from './Face';
import type { Line } from './Line';
import type { Circle } from './Circle';
import type { CircleArc } from './CircleArc';
import type { Point } from './Point';
import type { GuideLine2d } from './GuideLine2d';

/**
 * SVG 分组容器接口
 * 用于组织不同类型的草图元素
 */
interface SVGGroups {
  /** 背景层组 */
  bkg: SVGGElement;
  /** 面层组 */
  face: SVGGElement;
  /** 边层组 */
  edge: SVGGElement;
  /** 点层组 */
  point: SVGGElement;
  /** 尺寸标注层组 */
  dimension: SVGGElement;
}

/**
 * 实体脏数据事件接口
 */
interface EntityDirtyEvent {
  data: {
    /** 事件类型 */
    type: HSCore.Model.EntityEventType;
    /** 字段名称（可选） */
    fieldName?: string;
    /** 新值（可选） */
    newValue?: unknown;
  };
}

/**
 * 子实体添加事件接口
 */
interface ChildAddedEvent {
  data: {
    /** 被添加的实体 */
    entity: HSCore.Model.Entity;
  };
}

/**
 * 字段变更事件接口
 */
interface FieldChangedEvent {
  data: {
    /** 字段名称 */
    fieldName: string;
    /** 新值 */
    newValue: unknown;
    /** 旧值（可选） */
    oldValue?: unknown;
  };
}

/**
 * 事务请求事件接口
 */
interface TransactionEvent {
  data: {
    /** 事务请求对象 */
    request: unknown;
  };
}

/**
 * 草图显示对象类
 * 负责渲染和管理 2D 草图中的所有图形元素（面、边、点、标注等）
 * 继承自 Display2D 基类
 */
export declare class Sketch extends Display2D {
  /**
   * SVG 分组容器
   * 用于分层管理不同类型的图形元素
   * @private
   */
  private _svgGroups: SVGGroups;

  /**
   * 构造函数
   * @param context - 渲染上下文
   * @param parent - 父显示对象
   * @param group - SVG 分组元素
   * @param entity - 关联的实体模型
   */
  constructor(
    context: Context,
    parent: Display2D,
    group: SVGGElement,
    entity: InteractiveModel
  );

  /**
   * 初始化草图显示对象
   * 创建 SVG 分组、初始化草图元素并设置事件监听
   * @param layer - 可选的图层对象，用于监听图层变化
   */
  init(layer?: HSCore.Model.Layer): void;

  /**
   * 监听图层变化
   * 当图层的 slabeditor 字段变化时，重新初始化草图元素
   * @param layer - 要监听的图层对象
   * @private
   */
  private _listenLayer(layer: HSCore.Model.Layer): void;

  /**
   * 监听状态变更
   * 监听事务管理器的提交、撤销、重做事件，并重新选择交互模型
   * @private
   */
  private _listenStateChanged(): void;

  /**
   * 子实体添加事件处理器
   * 当实体添加子元素时，创建对应的交互模型并重新创建显示对象
   * @param event - 子实体添加事件
   */
  onChildAdded(event: ChildAddedEvent): void;

  /**
   * 更新草图数据
   * 清除现有模型映射并更新源模型
   * @param newSourceModel - 新的源模型数据
   * @private
   */
  private _updateSketchData(newSourceModel: unknown): void;

  /**
   * 实体脏数据处理器
   * 根据不同的事件类型（位置、几何、材质）标记子元素为脏
   * @param event - 实体脏数据事件
   */
  onEntityDirty(event: EntityDirtyEvent): void;

  /**
   * 初始化 SVG 分组
   * 创建背景、面、边、点、标注五个图层分组
   * @private
   */
  private _initGroups(): void;

  /**
   * 初始化草图元素
   * 遍历源模型中的所有元素（背景、面、边、点、辅助线）并创建对应的交互模型
   * @private
   */
  private _initSketchElements(): void;

  /**
   * 重新创建子显示对象
   * 移除旧的显示对象（如果存在），创建新的显示对象并添加到画布
   * @param model - 交互模型
   * @private
   */
  private _reCreateChild(model: InteractiveModel): void;

  /**
   * 清除所有子显示对象
   * 移除并销毁所有子元素
   * @private
   */
  private _clearAllChild(): void;

  /**
   * 创建子显示对象
   * 根据实体类型创建对应的显示对象（背景、面、边、点、辅助线）
   * @param model - 交互模型
   * @returns 创建的显示对象，如果类型不匹配则返回 undefined
   * @private
   */
  private _createChildDisplay(
    model: InteractiveModel
  ): Background | Face | Line | Circle | CircleArc | Point | GuideLine2d | undefined;
}