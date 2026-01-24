/**
 * 指示器模块
 * 用于在地图/画布上绘制和管理指示器形状
 */

import { ShapeColor } from './ShapeColor';
import { Artisan, DrawParams } from './Artisan';
import { Shape, ShapeType } from './Shape';

/**
 * 多边形数据接口
 */
interface Poly {
  /** 平移多边形 */
  translate(offset: Point): void;
}

/**
 * 点坐标接口
 */
interface Point {
  x: number;
  y: number;
}

/**
 * 形状数据接口
 */
interface ShapeData {
  /** 多边形数据 */
  poly: Poly;
  /** 填充颜色 */
  fcolor: string;
  /** 是否虚线 */
  dashed?: boolean;
  /** 描边宽度 */
  strokeWidth: number;
  /** 描边颜色 */
  stroke: string;
}

/**
 * 指示器形状项接口
 */
interface IndicatorShape {
  /** 多边形对象 */
  poly: Poly;
  /** 是否使用虚线 */
  dashed?: boolean;
}

/**
 * 可视化形状接口
 */
interface VisualShape {
  /** 设置形状属性 */
  setAttr(key: string, value: unknown): void;
  /** 隐藏形状 */
  hide(): void;
  /** 移动到指定图层 */
  moveTo(layer: unknown): void;
  /** 获取当前图层 */
  getLayer(): unknown;
}

/**
 * Sash 接口 - 管理画布区域
 */
interface Sash {
  /** 内部多边形数组 */
  innerPoly: Poly[];
  /** 添加形状到 sash */
  add(shape: Shape): void;
}

/**
 * 指示器管理器接口
 */
interface IndicatorManager {
  /** Sash 实例 */
  sash: Sash;
}

/**
 * 指示器类
 * 继承自 Shape，用于创建和管理地图上的指示器可视化元素
 */
export class Indicator extends Shape {
  /** 指示器管理器 */
  private manager: IndicatorManager;
  
  /** 可视化形状数组 */
  private vshape: VisualShape[];
  
  /** 形状定义数组 */
  private shapes: IndicatorShape[];

  /**
   * 构造函数
   * @param manager - 指示器管理器实例
   */
  constructor(manager: IndicatorManager) {
    super(ShapeType.Indicator, manager.sash.innerPoly[0]);
    this.manager = manager;
    this.vshape = [];
    this.shapes = [];
  }

  /**
   * 创建指示器
   * 初始化并添加到 sash 中
   * @returns 当前实例（支持链式调用）
   */
  create(): this {
    if (!this.ignore()) {
      this.manager.sash.add(this);
      this.shapes = [];
      this.createShapes();
    }
    return this;
  }

  /**
   * 判断是否忽略该指示器
   * @returns 是否忽略
   */
  ignore(): boolean {
    return false;
  }

  /**
   * 绘制指示器
   * 将形状数据渲染为可视化元素
   * @param context - 绘制上下文
   */
  draw(context: unknown): void {
    // 回收多余的可视化形状
    this.vshape.splice(this.shapes.length).forEach((shape) => {
      shape.moveTo(shape.getLayer());
      shape.hide();
    });

    // 更新或创建可视化形状
    this.shapes.forEach((shapeData, index) => {
      const isNewShape = index >= this.vshape.length;
      const visualShape = isNewShape 
        ? Artisan.recycleShape(shapeData.poly, context) 
        : this.vshape[index];

      visualShape.setAttr('data', {
        poly: shapeData.poly,
        fcolor: 'none',
        dashed: shapeData.dashed,
        strokeWidth: DrawParams.Ins.windowStrokeWidth,
        stroke: ShapeColor.windowStrokeColor
      });

      visualShape.setAttr('robot', this);

      if (isNewShape) {
        this.vshape.push(visualShape);
        this.addToGroup([visualShape]);
      }
    });
  }

  /**
   * 更新多边形
   * 重新创建形状数据
   */
  updatePoly(): void {
    this.shapes = [];
    this.create();
  }

  /**
   * 平移指示器
   * 移动所有形状到新位置
   * @param offset - 偏移量
   */
  translate(offset: Point): void {
    this.shapes.forEach((shape) => {
      shape.poly.translate(offset);
    });
  }

  /**
   * 回收指示器资源
   * 清理并隐藏所有可视化形状
   * @param force - 是否强制回收（默认 false）
   */
  recycle(force: boolean = false): void {
    super.recycle(true);

    if (this.vshape.length !== 0) {
      this.vshape.forEach((shape) => {
        shape.hide();
        shape.moveTo(shape.getLayer());
      });

      this.recycleFromGroup(this.vshape);
      this.vshape = [];
    }
  }

  /**
   * 创建形状数据（抽象方法）
   * 子类需要重写此方法来定义具体的形状
   * @protected
   */
  protected createShapes(): void {
    // 由子类实现
  }
}