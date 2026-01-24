/**
 * SVG门槛石渲染模块
 * @module SvgDoorStones
 */

import { HSCore } from 'path-to-hscore';
import { SvgBase } from './SvgBase';
import { SvgDoorStone } from './SvgDoorStone';
import { MixPaintCapture } from './MixPaintCapture';
import { SvgCommon } from './SvgCommon';

/**
 * 应用程序上下文接口
 */
interface IApp {
  floorplan: {
    scene: {
      activeLayer: IActiveLayer;
    };
  };
}

/**
 * 活动图层接口
 */
interface IActiveLayer {
  /**
   * 遍历图层中的所有开口元素
   */
  forEachOpening(callback: (opening: HSCore.Model.Opening) => void): void;
}

/**
 * SVG上下文接口
 */
interface ISvgContext {
  /** 是否启用绘制模式 */
  _withPaint: boolean;
}

/**
 * SVG节点容器接口
 */
interface ISvgNode {
  layers(): {
    /** 开口图层节点 */
    openings: unknown;
  };
}

/**
 * 图像绘制参数接口
 */
interface IDrawImageOptions {
  /** 单位缩放比例 */
  unitScale: number;
  /** 图像数据 */
  image: unknown;
  /** 2D边界框 */
  box2d: unknown;
  /** SVG上下文 */
  svgContext: ISvgContext;
  /** SVG DOM节点 */
  svgNode: unknown;
}

/**
 * 捕获结果接口
 */
interface ICaptureResult {
  /** 捕获的图像数据 */
  capture: unknown;
  /** 模型边界框 */
  modelBox: unknown;
}

/**
 * SVG门槛石渲染器
 * 负责渲染场景中所有门槛石元素
 */
export declare class SvgDoorStones extends SvgBase {
  /** 有效的开口元素集合 */
  private _openings: HSCore.Model.Opening[];
  
  /** SVG门槛石渲染器集合 */
  private _svgDoorStones: SvgDoorStone[];
  
  /** 目标SVG节点 */
  private _node: unknown;

  /**
   * 构造函数
   * @param app - 应用程序实例
   * @param svgNode - SVG节点容器
   */
  constructor(app: IApp, svgNode: ISvgNode);

  /**
   * 构建门槛石渲染数据
   * 遍历场景中的所有开口，筛选出包含门槛石的有效元素并创建对应的渲染器
   */
  build(): void;

  /**
   * 执行渲染
   * 依次绘制所有门槛石，并在启用绘制模式时生成捕获图像
   */
  draw(): void;

  /**
   * 绘制门槛石捕获图像
   * @param layer - 活动图层实例
   * @private
   */
  private _drawDoorStonesCapture(layer: IActiveLayer): void;
}