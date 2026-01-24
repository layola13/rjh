/**
 * Shape模块 - 图形基类
 * 提供图形树结构管理、层级关系、渲染和序列化功能
 */

import Konva from 'konva';
import { Matrix } from 'transformation-matrix';
import { Artisan } from './artisan';
import { IdCreator, ShapeIdx } from './id-creator';
import { Frame, ShapeType } from './types';

/**
 * 多边形数据接口
 */
interface Polygon {
  /**
   * 转换为JSON格式
   */
  toJSON(): unknown;
}

/**
 * 图形序列化对象
 */
interface ShapeObject {
  /** 图形唯一标识符 */
  id: number;
  /** 父图形ID */
  parentId: number;
  /** 子图形列表 */
  children: ShapeObject[];
  /** 渲染层级索引 */
  tapIdx: number;
  /** 图形类型 */
  type: ShapeType;
  /** 多边形数据 */
  polygon: unknown;
}

/**
 * 绘制上下文接口
 */
interface DrawContext {
  /** 当前活动图层 */
  activeLayer: Konva.Layer;
}

/**
 * 图形基类
 * 管理图形树结构、Konva图形组、父子关系和生命周期
 */
export class Shape {
  /** 图形类型 */
  readonly type: ShapeType;
  
  /** 多边形数据 */
  readonly polygon: Polygon;
  
  /** 图形唯一ID，-1表示已回收 */
  id: number;
  
  /** 父图形ID */
  parentId: number;
  
  /** 子图形列表 */
  children: Shape[];
  
  /** 渲染层级索引（越小越先渲染） */
  tapIdx: number;
  
  /** 父图形引用 */
  parent?: Shape;
  
  /** Konva图形组（用于渲染） */
  gshape?: Konva.Group;

  /**
   * 创建图形实例
   * @param type - 图形类型
   * @param polygon - 多边形数据
   */
  constructor(type: ShapeType, polygon: Polygon) {
    this.type = type;
    this.polygon = polygon;
    this.id = IdCreator.gen();
    this.parentId = -1;
    this.children = [];
    this.tapIdx = ShapeIdx.idx(type);
  }

  /**
   * 获取当前对象引用
   */
  get obj(): this {
    return this;
  }

  /**
   * 获取根图形（递归向上查找）
   */
  get top(): Shape {
    return this.parent === undefined ? this : this.parent.top;
  }

  /**
   * 获取顶层Frame对象
   * @throws 如果找不到Frame则抛出异常
   */
  get topFrame(): Frame {
    const topShape = this.top;
    if (this.isFrameType(topShape)) {
      return topShape;
    }
    throw new Error('Cannot find the top frame!');
  }

  /**
   * 判断当前图形是否为Frame类型
   */
  get isFrame(): boolean {
    return 'frameManager' in this;
  }

  /**
   * 获取Z轴索引（子类可重写）
   */
  protected get Zindex(): number {
    return -1;
  }

  /**
   * 类型守卫：检查是否为Frame类型
   */
  private isFrameType(shape: Shape): shape is Frame {
    return 'frameManager' in shape;
  }

  /**
   * 将图形组添加到父图形组
   * @param shapes - 要添加的Konva图形数组
   */
  addToGroup(shapes: Konva.Shape[]): void {
    if (!this.parent) return;
    
    const parentGroup = this.parent.gshape;
    if (parentGroup) {
      parentGroup.add(...shapes);
    }
  }

  /**
   * 从图形组回收图形（隐藏并移动到图层）
   * @param shapes - 要回收的Konva图形数组
   */
  recycleFromGroup(shapes: Konva.Shape[]): void {
    if (!this.parent?.gshape) return;
    
    shapes.forEach(shape => {
      shape.moveTo(shape.getLayer());
      shape.hide();
    });
  }

  /**
   * 绘制图形及其所有子图形
   * @param context - 绘制上下文
   * @throws 如果图形已回收则抛出异常
   */
  draw(context: DrawContext): void {
    if (this.id === -1) {
      throw new Error(`recycled shape:${this.type} can not be used again!`);
    }

    if (this.children.length === 0) return;

    // 初始化图形组
    if (this.gshape === undefined) {
      const parentGroup = this.parent?.gshape;
      this.gshape = Artisan.recycleGroup(context.activeLayer, parentGroup);
      this.gshape.setAttr('data', {});
      this.gshape.setAttr('robot', this);
    }

    // 按层级索引排序子图形
    this.children.sort((a, b) => a.tapIdx - b.tapIdx);

    // 递归绘制子图形
    this.children.forEach(child => child.draw(context));

    // 设置Z轴顺序
    if (this.gshape?.parent) {
      const zIndex = this.Zindex;
      if (zIndex >= 0 && zIndex < this.gshape.parent.children.length) {
        this.gshape.setZIndex(zIndex);
      }
    }
  }

  /**
   * 添加子图形
   * @param child - 要添加的子图形
   * @throws 如果子图形ID与父图形相同则抛出异常
   */
  add(child: Shape): void {
    if (child.id === this.id) {
      throw new Error(`shape id:${this.id} can not be equal to parent id!`);
    }

    child.parent = this;
    child.parentId = this.id;

    if (!this.children.includes(child)) {
      this.children.push(child);
    }
  }

  /**
   * 移除子图形或从父图形移除自身
   * @param child - 要移除的子图形（可选）
   */
  remove(child?: Shape): void {
    if (child) {
      const index = this.children.indexOf(child);
      if (index >= 0) {
        child.recycle();
        child.clearChildren();
        child.parent = undefined;
        this.children.splice(index, 1);
      }
    } else if (this.parent) {
      this.parent.remove(this);
    } else {
      this.clearChildren();
      this.recycle();
    }
  }

  /**
   * 清空所有子图形
   */
  clearChildren(): void {
    this.children.forEach(child => {
      child.recycle();
      child.clearChildren();
      child.parent = undefined;
    });

    if (this.parent && this.gshape) {
      this.gshape.moveTo(this.gshape.getLayer());
      this.gshape.hide();
      this.gshape = undefined;
    }

    this.children = [];
  }

  /**
   * 回收图形资源
   * @param recycleId - 是否回收ID（默认false）
   */
  recycle(recycleId: boolean = false): void {
    if (recycleId) {
      IdCreator.recycle(this.id);
      this.id = -1;
    }
  }

  /**
   * 序列化为普通对象
   * @returns 图形对象或undefined（如果已回收）
   */
  toObject(): ShapeObject | undefined {
    if (this.id === -1) return undefined;

    const childrenObjects: ShapeObject[] = [];
    this.children.forEach(child => {
      const childObj = child.toObject();
      if (childObj) {
        childrenObjects.push(childObj);
      }
    });

    return {
      id: this.id,
      parentId: this.parentId,
      children: childrenObjects,
      tapIdx: this.tapIdx,
      type: this.type,
      polygon: this.polygon.toJSON()
    };
  }

  /**
   * 平移图形（子类实现）
   * @param offset - 偏移量
   */
  translate(offset: unknown): void {
    // 子类实现
  }

  /**
   * 隐藏辅助元素（子类实现）
   */
  hideAssist(): void {
    // 子类实现
  }

  /**
   * 更新多边形数据（子类实现）
   * @param polygon - 新的多边形数据
   */
  updatePoly(polygon: unknown): void {
    // 子类实现
  }

  /**
   * Frame类型转换为Mullion（竖框）类型
   * @param frameType - Frame类型
   * @returns 对应的Mullion类型
   * @throws 如果类型不支持则抛出异常
   */
  static frameToMullionType(frameType: ShapeType): ShapeType {
    const typeMap: Partial<Record<ShapeType, ShapeType>> = {
      [ShapeType.Frame]: ShapeType.FrameMullion,
      [ShapeType.Sash]: ShapeType.SashMullion,
      [ShapeType.GuardSash]: ShapeType.SashMullion,
      [ShapeType.CircleSash]: ShapeType.SashMullion,
      [ShapeType.KfcSash]: ShapeType.KfcWaist,
      [ShapeType.Screen]: ShapeType.ScreenMullion,
      [ShapeType.ShadePushSash]: ShapeType.ShadePushSashMullion
    };

    const mullionType = typeMap[frameType];
    if (mullionType === undefined) {
      throw new Error(`${frameType} can't be supported!`);
    }
    return mullionType;
  }

  /**
   * 获取所有父级变换矩阵
   * @returns 变换矩阵数组（从当前节点到根节点）
   */
  getParentMatrices(): Matrix[] {
    if (!this.gshape) return [];

    const matrices: Matrix[] = [];
    let currentNode: Konva.Node | null = this.gshape;

    while (currentNode && 
           !(currentNode instanceof Konva.Stage) && 
           !(currentNode instanceof Konva.Layer)) {
      const transform = currentNode.getTransform().m;
      // 假设matrix工厂函数签名: matrix(a, b, c, d, e, f)
      matrices.push(
        (Matrix as any)(
          transform[0], 
          transform[1], 
          transform[2], 
          transform[3], 
          transform[4], 
          transform[5]
        )
      );
      currentNode = currentNode.parent;
    }

    return matrices;
  }
}