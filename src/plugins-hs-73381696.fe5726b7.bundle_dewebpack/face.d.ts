/**
 * Face模块类型定义
 * 用于处理2D草图中的面（Face）元素的SVG渲染
 */

import { HSApp } from './518193';
import { HSCore } from './635589';

/**
 * 多边形样式配置接口
 * 定义SVG多边形的视觉样式属性
 */
interface PolygonStyleConfig {
  /** 描边宽度 */
  'stroke-width': number;
  /** 描边颜色 */
  stroke?: string;
  /** 填充颜色 */
  fill: string;
  /** 不透明度 (0-1) */
  opacity: number;
  /** 矢量效果：禁用缩放影响描边 */
  'vector-effect': 'non-scaling-stroke';
}

/**
 * 多边形样式集合接口
 * 包含不同状态下的样式配置
 */
interface PolygonStyles {
  /** 透明状态样式 */
  transparent: PolygonStyleConfig;
  /** 正常状态样式 */
  normal: PolygonStyleConfig;
  /** 选中状态样式 (#396EFE蓝色描边) */
  selected: PolygonStyleConfig;
  /** 悬停状态样式 (#3DFFF2青色描边) */
  hover: PolygonStyleConfig;
}

/**
 * SVG元素对接口
 * 包含多边形元素和遮罩元素
 */
interface PolygonElementPair {
  /** 多边形路径元素 */
  polygon: SVGPathElement;
  /** 遮罩路径元素 */
  mask: SVGPathElement;
}

/**
 * Face类
 * 继承自ExtraordinarySketch2d.Face2d，用于渲染和管理2D草图中的面元素
 * 
 * @extends {HSApp.View.SVG.ExtraordinarySketch2d.Face2d}
 * 
 * @remarks
 * - 支持孔洞拓扑标记的特殊渲染
 * - 提供选中、悬停等交互状态的视觉反馈
 * - 自动同步关联点和边的标志状态
 */
export declare class Face extends HSApp.View.SVG.ExtraordinarySketch2d.Face2d {
  /**
   * 多边形样式缓存
   * @private
   */
  private _polygonStyle?: PolygonStyles;

  /**
   * 构造函数
   * @param args - 传递给父类的构造参数
   */
  constructor(...args: any[]);

  /**
   * 创建多边形SVG元素
   * 
   * @param pathData - SVG路径数据字符串
   * @returns 包含多边形和遮罩元素的对象
   * 
   * @remarks
   * - 如果模型包含孔洞拓扑标记，使用normal样式
   * - 否则使用transparent样式
   */
  protected _createPolygonElement(pathData: string): PolygonElementPair;

  /**
   * 更新多边形样式
   * 根据实体的当前标志状态（选中/悬停/正常）更新SVG元素样式
   * 
   * @remarks
   * 仅当模型包含孔洞拓扑标记时才更新样式
   */
  protected _updatePolygonStyle(): void;

  /**
   * 获取多边形样式配置
   * 
   * @returns 包含所有状态样式的配置对象
   * 
   * @remarks
   * 使用懒加载模式，首次访问时初始化样式配置
   */
  get polygonStyle(): PolygonStyles;

  /**
   * 标志变化事件处理器
   * 
   * @param flag - 变化的标志枚举值
   * 
   * @remarks
   * - 调用父类的onFlagChanged方法
   * - 同步关联点的标志状态
   */
  onFlagChanged(flag: HSCore.Model.EntityFlagEnum | HSCore.Model.ExSketchFlagEnum): void;

  /**
   * 同步关联点的标志状态
   * 
   * @param flag - 要同步的标志枚举值
   * 
   * @remarks
   * - 仅在没有拓扑关系且标志为hoverOn或selected时执行
   * - 将selected转换为selectedDriven标志
   * - 将hoverOn转换为hoverOnDriven标志
   * - 同步所有关联的边和背景点的状态
   * 
   * @private
   */
  private _syncPointsFlag(flag: HSCore.Model.EntityFlagEnum | HSCore.Model.ExSketchFlagEnum): void;
}

/**
 * 默认导出
 */
export { Face };