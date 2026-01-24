/**
 * RoofsDrawingBkgSketch 模块
 * 用于绘制屋顶背景草图的 SVG 显示对象
 */

import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

/**
 * SVG 分组容器接口
 */
interface SVGGroups {
  /** 尺寸标注图层 */
  dimension: SVGGElement;
  [key: string]: SVGElement;
}

/**
 * 实体脏数据事件
 */
interface EntityDirtyEvent {
  data: {
    /** 事件类型 */
    type: HSCore.Model.EntityEventType;
    [key: string]: unknown;
  };
}

/**
 * 字段变更事件
 */
interface FieldChangedEvent {
  data: {
    /** 字段名称 */
    fieldName: string;
    /** 新值 */
    newValue: unknown;
    /** 旧值 */
    oldValue?: unknown;
  };
}

/**
 * 子实体添加事件
 */
interface ChildAddedEvent {
  data: {
    /** 新增的子实体 */
    entity: HSCore.Model.Entity;
  };
}

/**
 * 草图数据源模型接口
 */
interface SketchSourceModel {
  /** 辅助线集合 */
  guidelines: HSCore.Model.ExtraordinaryGuideline[];
}

/**
 * 草图实体接口
 */
interface RoofsDrawingBkgSketchEntity extends HSCore.Model.Entity {
  /** 构建器 */
  builder: unknown;
  /** 源数据模型 */
  srcModel: SketchSourceModel;
  /** 脏数据信号 */
  signalDirty: HSCore.Signal<EntityDirtyEvent>;
  /** 子节点添加信号 */
  signalChildAdded: HSCore.Signal<ChildAddedEvent>;
  
  /**
   * 添加模型映射
   * @param sourceModel - 源模型
   * @param interactiveModel - 交互模型
   */
  addMapModel(sourceModel: HSCore.Model.Entity, interactiveModel: HSApp.ExtraordinarySketch2d.InteractiveModel): void;
  
  /**
   * 清空所有模型映射
   */
  clearMapModel(): void;
}

/**
 * 字段数据接口
 */
interface FieldData {
  /** 字段变更信号 */
  signalFieldChanged: HSCore.Signal<FieldChangedEvent>;
}

/**
 * 屋顶绘图背景草图类
 * 继承自 Display2D 基类，用于管理和渲染背景草图元素
 */
export declare class RoofsDrawingBkgSketch extends HSApp.View.SVG.Base.Display2D {
  /** SVG 分组容器 */
  private _svgGroups?: SVGGroups;

  /**
   * 构造函数
   * @param context - 渲染上下文
   * @param parent - 父显示对象
   * @param layer - SVG 图层
   * @param entity - 关联的实体对象
   */
  constructor(
    context: HSApp.View.RenderContext,
    parent: HSApp.View.DisplayObject | null,
    layer: SVGElement,
    entity: RoofsDrawingBkgSketchEntity
  );

  /**
   * 初始化草图显示对象
   * @param fieldData - 字段数据（可选）
   * @param svgGroups - SVG 分组容器
   */
  init(fieldData: FieldData | undefined, svgGroups: SVGGroups): void;

  /**
   * 清理资源
   */
  onCleanup(): void;

  /**
   * 监听字段变更事件
   * @param fieldData - 字段数据
   */
  private _listenFieldChanged(fieldData: FieldData): void;

  /**
   * 子节点添加事件处理
   * @param event - 子节点添加事件
   */
  onChildAdded(event: ChildAddedEvent): void;

  /**
   * 更新草图数据
   * @param newData - 新的草图数据源
   */
  private _updateSketchData(newData: SketchSourceModel): void;

  /**
   * 实体脏数据事件处理
   * @param event - 实体脏数据事件
   */
  onEntityDirty(event: EntityDirtyEvent): void;

  /**
   * 初始化草图元素
   * 遍历源模型中的辅助线并创建对应的交互模型
   */
  private _initSketchElements(): void;

  /**
   * 重新创建子显示对象
   * @param model - 交互模型
   */
  private _reCreateChild(model: HSApp.ExtraordinarySketch2d.InteractiveModel): void;

  /**
   * 清除所有子显示对象
   */
  private _clearAllChild(): void;

  /**
   * 创建子显示对象
   * @param model - 交互模型
   * @returns 创建的子显示对象，如果无法创建则返回 undefined
   */
  private _createChildDisplay(
    model: HSApp.ExtraordinarySketch2d.InteractiveModel
  ): HSApp.View.SVG.ExtraordinarySketch2d.GuideLine2d | undefined;
}