/**
 * RoofDrawingRegionSketch 模块
 * 用于绘制和管理屋顶区域草图的交互式显示组件
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

/**
 * SVG分组容器接口
 * 用于组织不同类型的SVG元素
 */
interface SVGGroups {
  /** 面元素的SVG分组 */
  face: SVGGElement;
  /** 边元素的SVG分组 */
  edge: SVGGElement;
  /** 点元素的SVG分组 */
  point: SVGGElement;
}

/**
 * 实体脏数据事件接口
 */
interface EntityDirtyEvent {
  data: {
    /** 事件类型：位置/几何/材质变更等 */
    type: HSCore.Model.EntityEventType;
    /** 字段名称 */
    fieldName?: string;
    /** 新值 */
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
 * 构建器配置接口
 */
interface BuilderConfig {
  /** 关联的屋顶实体（可选） */
  roof?: HSCore.Model.RoofEntity;
  /** 可草图化对象 */
  sketchable?: {
    roof?: HSCore.Model.RoofEntity;
  };
}

/**
 * 屋顶绘图区域草图显示类
 * 继承自2D显示基类，负责渲染和管理屋顶草图的交互元素
 * 
 * @extends HSApp.View.SVG.Base.Display2D
 */
export declare class RoofDrawingRegionSketch extends HSApp.View.SVG.Base.Display2D {
  /**
   * SVG分组容器，用于组织面、边、点等不同类型的图形元素
   * @private
   */
  private _svgGroups?: SVGGroups;

  /**
   * 构造函数
   * @param context - 渲染上下文
   * @param parent - 父级显示对象
   * @param svgElement - SVG容器元素
   * @param entity - 关联的实体模型
   */
  constructor(
    context: HSApp.View.RenderContext,
    parent: HSApp.View.DisplayObject,
    svgElement: SVGElement,
    entity: HSApp.ExtraordinarySketch2d.RegionSketchEntity
  );

  /**
   * 初始化草图显示对象
   * 设置SVG分组、初始化草图元素并监听实体变更事件
   * 
   * @param config - 构建器配置
   * @param svgGroups - SVG分组容器
   */
  init(config: BuilderConfig, svgGroups: SVGGroups): void;

  /**
   * 清理资源
   * 在对象销毁时调用，清理SVG分组引用
   */
  onCleanup(): void;

  /**
   * 监听字段变更事件
   * 处理草图数据(_sketchData)和屋顶ID(_roofId)的变更
   * 
   * @param config - 构建器配置
   * @private
   */
  private _listenFieldChanged(config: BuilderConfig): void;

  /**
   * 子实体添加事件处理器
   * 当新的子实体被添加时创建对应的交互模型
   * 
   * @param event - 子实体添加事件
   */
  onChildAdded(event: ChildAddedEvent): void;

  /**
   * 更新草图数据
   * 清除旧的模型映射并设置新的源模型
   * 
   * @param sketchData - 新的草图数据
   * @private
   */
  private _updateSketchData(sketchData: HSCore.Model.ExtraordinarySketch2d): void;

  /**
   * 实体脏数据事件处理器
   * 根据事件类型将脏标记传播到所有子元素
   * 
   * @param event - 实体脏数据事件
   */
  onEntityDirty(event: EntityDirtyEvent): void;

  /**
   * 初始化草图元素
   * 根据源模型创建面、边、点的交互显示对象
   * 
   * @param hasRoof - 是否存在关联的屋顶（存在时冻结面元素）
   * @private
   */
  private _initSketchElements(hasRoof: boolean): void;

  /**
   * 重新创建子显示对象
   * 移除旧的显示对象并创建新的
   * 
   * @param interactiveModel - 交互式模型
   * @private
   */
  private _reCreateChild(interactiveModel: HSApp.ExtraordinarySketch2d.InteractiveModel): void;

  /**
   * 清除所有子元素
   * 从画布和显示列表中移除所有子显示对象
   * @private
   */
  private _clearAllChild(): void;

  /**
   * 创建子显示对象
   * 根据模型类型创建对应的Face、Line或Point显示对象
   * 
   * @param interactiveModel - 交互式模型
   * @returns 创建的显示对象，如果类型不支持则返回undefined
   * @private
   */
  private _createChildDisplay(
    interactiveModel: HSApp.ExtraordinarySketch2d.InteractiveModel
  ): HSApp.View.DisplayObject | undefined;

  /**
   * 取消选择所有草图元素
   * 遍历子元素并从选择管理器中移除
   * 
   * @returns 是否有元素被取消选择
   * @private
   */
  private _unSelectSketches(): boolean;

  /**
   * 重新选择面元素
   * 在屋顶ID变更后重新选择面元素（及其关联的屋顶）
   * @private
   */
  private _reSelectFace(): void;

  /**
   * 获取面的交互模型
   * 遍历子元素查找第一个面类型的交互模型
   * 
   * @returns 面的交互模型，如果不存在则返回undefined
   */
  getFaceInteractiveModel(): HSApp.ExtraordinarySketch2d.InteractiveModel | undefined;
}