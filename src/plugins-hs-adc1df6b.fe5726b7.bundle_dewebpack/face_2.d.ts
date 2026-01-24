/**
 * Face 模块 - 屋顶面图形视图类
 * 用于在2D画布上渲染和管理屋顶面的图形表示
 */

import { HSApp } from './518193';
import { HSCore } from './635589';
import { ENParamRoofType } from './127085';

/**
 * 样式配置接口 - 定义SVG路径的样式属性
 */
interface PathStyleConfig {
  /** 描边宽度 */
  'stroke-width': number;
  /** 描边颜色 */
  stroke: string;
  /** 填充颜色 */
  fill: string;
  /** 不透明度 (0-1) */
  opacity: number;
  /** 向量效果 */
  'vector-effect': string;
}

/**
 * 多边形样式集合 - 包含不同状态下的样式
 */
interface PolygonStyleSet {
  /** 透明状态样式 */
  transparent: PathStyleConfig;
  /** 正常状态样式 */
  normal: PathStyleConfig;
  /** 选中状态样式 */
  selected: PathStyleConfig;
  /** 悬停状态样式 */
  hover: PathStyleConfig;
}

/**
 * 文本样式配置接口
 */
interface TextStyleConfig {
  /** 字体族 */
  'font-family': string;
  /** 基线对齐方式 */
  'alignment-baseline': string;
  /** 文本锚点 */
  'text-anchor': string;
  /** 填充颜色 */
  fill: string;
  /** 描边颜色 */
  stroke: string;
  /** 字体粗细 */
  'font-weight': number;
  /** 字体大小 */
  'font-size': number;
  /** 指针事件 */
  'pointer-events': string;
}

/**
 * 标题样式集合
 */
interface TitleStyleSet {
  /** 正常状态样式 */
  normal: TextStyleConfig;
  /** 选中状态样式 */
  selected: TextStyleConfig;
}

/**
 * 多边形元素结构
 */
interface PolygonElement {
  /** 多边形路径元素 */
  polygon: SVGPathElement;
  /** 遮罩路径元素 */
  mask: SVGPathElement;
}

/**
 * 视图盒变化事件数据
 */
interface ViewBoxChangedEvent {
  data: {
    /** 缩放是否改变 */
    scaleChanged: boolean;
  };
}

/**
 * Face 类 - 屋顶面的2D图形视图
 * 继承自 ExtraordinarySketch2d.Face2d，提供屋顶面的可视化和交互功能
 */
export declare class Face extends HSApp.View.SVG.ExtraordinarySketch2d.Face2d {
  /** 标题文本元素 */
  private _title?: SVGTextElement;
  
  /** 标题样式缓存 */
  private _titleStyle?: TitleStyleSet;
  
  /** 刷新显示尺寸的定时器ID */
  private _refreshShowDimensionTimerId?: number;
  
  /** 多边形样式缓存 */
  private _polygonStyle?: PolygonStyleSet;

  /**
   * 构造函数
   * @param e - 参数1 (继承自父类)
   * @param n - 参数2 (继承自父类)
   * @param a - 参数3 (继承自父类)
   * @param r - 参数4 (继承自父类)
   */
  constructor(e: unknown, n: unknown, a: unknown, r: unknown);

  /**
   * 视图盒变化事件处理器
   * 当画布缩放时，延迟刷新标题显示以优化性能
   * @param event - 视图盒变化事件对象
   */
  private _onViewBoxChanged(event?: ViewBoxChangedEvent): void;

  /**
   * 获取画布缩放比率
   * 根据当前视图模式（2D/3D）计算适当的缩放因子
   * @returns 缩放比率
   */
  private _getCanvasChangeRatio(): number;

  /**
   * 创建SVG路径元素
   * 初始化多边形和标题元素
   */
  protected _createPath(): void;

  /**
   * 更新SVG路径
   * 同步几何变化到SVG元素
   */
  protected _updatePath(): void;

  /**
   * 创建多边形元素
   * @param pathData - SVG路径数据字符串
   * @returns 包含多边形和遮罩的元素对象
   */
  private _createPolygonElement(pathData: string): PolygonElement;

  /**
   * 创建多边形标题文本元素
   * 在多边形中心点位置创建文本标签
   * @returns SVG文本元素，如果创建失败返回null
   */
  private _createPolygonTitle(): SVGTextElement | null;

  /**
   * 绘制回调
   * 在每次重绘时更新标题样式
   */
  onDraw(): void;

  /**
   * 清理回调
   * 移除标题元素并释放资源
   */
  onCleanup(): void;

  /**
   * 获取背景颜色
   * 根据实体是否可编辑返回不同颜色
   * @returns 十六进制颜色值
   */
  private _getBgColor(): string;

  /**
   * 获取描边颜色
   * 根据实体是否可编辑返回不同颜色
   * @returns 十六进制颜色值
   */
  private _getStrokeColor(): string;

  /**
   * 根据屋顶类型获取本地化名称
   * @param roofType - 屋顶类型枚举值
   * @returns 本地化的屋顶类型名称
   */
  private _getNameByType(roofType: ENParamRoofType): string;

  /**
   * 多边形样式集合（getter）
   * 包含透明、正常、选中、悬停四种状态的样式配置
   */
  get polygonStyle(): PolygonStyleSet;

  /**
   * 遮罩样式集合（getter）
   * 复用多边形样式配置
   */
  get maskStyle(): PolygonStyleSet;

  /**
   * 标题样式集合（getter）
   * 包含正常和选中两种状态的文本样式
   */
  get titleStyle(): TitleStyleSet;

  /**
   * 标志变化回调
   * 当实体标志（选中/悬停等）改变时触发
   * @param flag - 变化的标志枚举值
   */
  onFlagChanged(flag: HSCore.Model.EntityFlagEnum | HSCore.Model.ExSketchFlagEnum): void;

  /**
   * 几何体脏标记回调
   * 当几何数据改变时更新标题位置
   */
  onGeometryDirty(): void;

  /**
   * 更新标题样式
   * 根据选中状态和缩放比例更新标题外观和文本内容
   */
  private _updateTileStyle(): void;

  /**
   * 同步点的标志状态
   * 将面的标志状态同步到相关的边和点
   * @param flag - 要同步的标志值
   */
  private _syncPointsFlag(flag: HSCore.Model.EntityFlagEnum | HSCore.Model.ExSketchFlagEnum): void;
}