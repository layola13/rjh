/**
 * SVG墙体渲染模块
 * 负责在SVG画布上绘制承重墙和非承重墙
 */

import { SvgBase } from './SvgBase';
import { Wall } from './Wall';
import { Application } from './Application';
import { SVGContext } from './SVGContext';
import { PageSetting } from './PageSetting';
import { SVGMask } from './SVGMask';

/**
 * SVG墙体渲染类
 * 继承自SvgBase，用于将户型图中的墙体渲染为SVG图形
 */
export class SvgWalls extends SvgBase {
  /**
   * 承重墙集合
   * @private
   */
  private _bearwalls: Wall[];

  /**
   * SVG承重墙图层
   * @private
   */
  private _loadbearing: SVGElement | undefined;

  /**
   * 构造函数
   * @param app - 应用程序实例
   * @param context - SVG上下文对象
   */
  constructor(app: Application, context: SVGContext) {
    super(app, context);
    this._bearwalls = [];
    this._loadbearing = undefined;
  }

  /**
   * 构建墙体数据
   * 遍历活动图层中的所有墙体并收集到_bearwalls数组中
   */
  public build(): void {
    this._app.floorplan.scene.activeLayer.forEachWall((wall: Wall) => {
      this._bearwalls.push(wall);
    });
  }

  /**
   * 绘制墙体到SVG画布
   * 根据墙体的crossPath数据生成SVG路径并应用样式
   */
  public draw(): void {
    const pageSetting: PageSetting = this._ctx.pageSetting();
    this._loadbearing = this._ctx.layers().loadbearings;
    const wallsMask: SVGMask = this._ctx.getWallsMask();

    this._bearwalls.forEach((wall: Wall) => {
      // 仅处理具有有效交叉路径的墙体
      if (wall.crossPath && wall.crossPath.length > 0) {
        // 将墙体路径转换为SVG路径字符串
        const svgPath: string = Util.loop2SVG(wall.crossPath, this.unitScale());

        // 创建SVG路径元素并应用样式
        this._loadbearing
          ?.path(svgPath)
          .id(`${wall.ID}`)
          .fill(pageSetting.wall.loadBearingColor)
          .stroke({
            width: pageSetting.room.edgeWidth,
            color: pageSetting.room.edgeColor
          })
          .maskWith(wallsMask);
      }
    });
  }
}

/**
 * 工具类接口定义
 */
interface Util {
  /**
   * 将闭合路径坐标数组转换为SVG路径字符串
   * @param path - 路径坐标点数组
   * @param scale - 单位缩放比例
   * @returns SVG路径字符串（如 "M10,10 L20,20 Z"）
   */
  loop2SVG(path: Array<{ x: number; y: number }>, scale: number): string;
}

/**
 * 墙体接口定义
 */
interface Wall {
  /** 墙体唯一标识符 */
  ID: string | number;
  /** 墙体交叉路径坐标点集合 */
  crossPath?: Array<{ x: number; y: number }>;
}

/**
 * 页面设置接口定义
 */
interface PageSetting {
  wall: {
    /** 承重墙填充颜色 */
    loadBearingColor: string;
  };
  room: {
    /** 房间边缘线宽度 */
    edgeWidth: number;
    /** 房间边缘线颜色 */
    edgeColor: string;
  };
}