/**
 * SVG铺装图构建器
 * 负责生成包含房间、开口、墙体等元素的SVG铺装平面图
 */

import { SvgBuilder } from './SvgBuilder';
import { SvgPaveContext, SvgOutline } from './SvgPaveContext';
import { SvgOpenings } from './SvgOpenings';
import { SvgCornerWindows } from './SvgCornerWindows';
import { SvgRooms } from './SvgRooms';
import { SvgEmptyEntry } from './SvgEmptyEntry';
import { SvgWalls } from './SvgWalls';

/**
 * 应用程序上下文接口
 */
interface AppContext {
  // 应用程序相关配置和状态
  [key: string]: unknown;
}

/**
 * SVG元素接口
 */
interface ISvgElement {
  /**
   * 导出SVG元素
   * @returns Promise，解析为生成的SVG内容
   */
  export(): Promise<unknown>;
}

/**
 * 位置信息接口
 */
interface PositionInfo {
  // 位置相关数据
  [key: string]: unknown;
}

/**
 * 铺装配置参数接口
 */
interface PaveConfig {
  // 铺装相关配置项
  [key: string]: unknown;
}

/**
 * SVG铺装图构建器类
 * 继承自SvgBuilder，专门用于生成铺装平面图
 */
export declare class SvgBuilderPave extends SvgBuilder {
  /**
   * SVG轮廓对象
   */
  protected _svgoutline?: SvgOutline;

  /**
   * SVG元素集合
   */
  protected _svg: ISvgElement[];

  /**
   * 应用程序上下文
   */
  protected _app: AppContext;

  /**
   * 位置信息
   */
  protected _position?: PositionInfo;

  /**
   * 构建SVG铺装图
   * @param config - 铺装配置参数
   * @returns Promise，解析为生成的SVG HTML字符串
   * 
   * @remarks
   * 该方法会按顺序创建以下SVG元素：
   * 1. SVG轮廓（SvgOutline）
   * 2. 房间（SvgRooms）
   * 3. 开口（SvgOpenings）
   * 4. 转角窗（SvgCornerWindows）
   * 5. 空入口（SvgEmptyEntry）
   * 6. 墙体（SvgWalls）
   * 
   * 所有元素并行导出后，返回完整的SVG HTML字符串
   */
  build(config: PaveConfig): Promise<string>;
}