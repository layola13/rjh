/**
 * 多边形标识符
 * 用于标识多边形的索引和位置信息
 */
export interface IPolyIdJSON {
  /** 多边形索引 */
  idx: number;
  /** 位置标识（0: 左侧, 1: 右侧, -1: 未指定） */
  pos: number;
}

/**
 * 线段侧边枚举
 */
export enum LineSide {
  /** 左侧 */
  Left = 0,
  /** 右侧 */
  Right = 1
}

/**
 * 多边形标识符类
 * 用于唯一标识多边形及其相对于某条线的位置
 */
export class PolyId {
  /** 多边形索引 */
  idx: number;
  
  /** 位置标识（0: 左侧, 1: 右侧, -1: 未指定） */
  pos: number;

  /**
   * 构造函数
   * @param idx - 多边形索引，默认为-1
   * @param pos - 位置标识，默认为-1
   */
  constructor(idx: number = -1, pos: number = -1) {
    this.idx = idx;
    this.pos = pos;
  }

  /**
   * 根据线段侧边设置位置
   * @param side - 线段侧边（Left或Right）
   */
  posBySide(side: LineSide): void {
    if (side === LineSide.Left) {
      this.pos = 0;
    }
    if (side === LineSide.Right) {
      this.pos = 1;
    }
  }

  /**
   * 从JSON对象创建PolyId实例（静态工厂方法）
   * @param json - 包含idx和pos的JSON对象
   * @returns 新的PolyId实例
   */
  static createByJson(json: IPolyIdJSON): PolyId {
    return new PolyId(json.idx, json.pos);
  }

  /**
   * 判断当前实例是否与另一个PolyId相等
   * @param other - 要比较的PolyId实例
   * @returns 如果idx和pos都相等则返回true
   */
  equalTo(other: PolyId): boolean {
    return this.idx === other.idx && this.pos === other.pos;
  }

  /**
   * 克隆当前实例
   * @returns 新的PolyId实例，具有相同的idx和pos
   */
  clone(): PolyId {
    return new PolyId(this.idx, this.pos);
  }

  /**
   * 序列化为JSON对象
   * @returns 包含idx和pos的普通对象
   */
  toJSON(): IPolyIdJSON {
    return {
      idx: this.idx,
      pos: this.pos
    };
  }

  /**
   * 从JSON对象反序列化
   * @param json - 包含idx和pos的JSON对象
   * @returns 当前实例（支持链式调用）
   */
  deserialize(json: IPolyIdJSON): this {
    this.idx = json.idx;
    this.pos = json.pos;
    return this;
  }
}