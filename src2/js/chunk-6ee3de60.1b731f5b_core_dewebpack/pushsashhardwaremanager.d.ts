import { DrawParams } from './draw-params';
import { OpenToward, OpenDirection, PushableHardwareManager } from './pushable-hardware-manager';
import {
  HardwareShape,
  ShapeType,
  HardwareOnEdge,
  HardwareOnFrame,
  Hinge,
  EndpointHinge,
  Handle,
  CommercialHandle,
  CrossHandle,
  IndicatorForSash,
  IndicatorForSlide,
  Hardware
} from './hardware';

/**
 * 序列化数据接口
 */
interface PushSashHardwareManagerJSON {
  hingeType: HardwareShape;
  hingeCount: number;
  handle: any;
  hinges: any[];
  slide: OpenDirection;
  mlp: boolean;
}

/**
 * 推拉窗扇五金件管理器
 * 负责管理推拉窗的铰链、把手及相关指示器
 */
export class PushSashHardwareManager extends PushableHardwareManager {
  /** 铰链数量 */
  private _hingeCount: number = 0;
  
  /** 铰链类型 */
  private _hingeType: HardwareShape = HardwareShape.Hinge;
  
  /** 开启方向 */
  private _openToward!: OpenToward;
  
  /** 开启方式 */
  private _openDirection!: OpenDirection;
  
  /** 滑动方向 */
  public slide: OpenDirection = OpenDirection.None;
  
  /** 铰链列表 */
  public hinges: Array<Hinge | EndpointHinge> = [];
  
  /** 把手 */
  public handle: Handle | CommercialHandle | CrossHandle;
  
  /** 窗扇指示器 */
  public indicator: IndicatorForSash;
  
  /** 滑动指示器 */
  public indicatorForSlide: IndicatorForSlide;
  
  /** 是否启用多点锁 */
  public multiLockPoints: boolean = true;

  /**
   * 构造函数
   * @param sash 关联的窗扇对象
   */
  constructor(sash: any) {
    super(sash);
    
    this.handle = new Handle(this);
    this.indicator = new IndicatorForSash(this);
    this.indicatorForSlide = new IndicatorForSlide(this);
    
    this.initHinges();
    
    const defaultInward = !DrawParams.Ins.sashOutwardOpen;
    this._openToward = this.sash.type === ShapeType.Screen
      ? (defaultInward ? OpenToward.Outward : OpenToward.Inward)
      : (defaultInward ? OpenToward.Inward : OpenToward.Outward);
    
    this.handle.dim.hidden = !DrawParams.Ins.dimToGroundShown;
    this.handle.dimToSash.hidden = !DrawParams.Ins.dimToSashShown;
  }

  /**
   * 获取所有五金件（铰链 + 把手）
   */
  public get hardwares(): Hardware[] {
    return [...this.hinges, this.handle];
  }

  /**
   * 获取开启朝向
   */
  public get openToward(): OpenToward {
    return this._openToward;
  }

  /**
   * 设置开启朝向
   */
  public set openToward(value: OpenToward) {
    this._openToward = value;
  }

  /**
   * 获取开启方向
   */
  public get openDirection(): OpenDirection {
    return this._openDirection;
  }

  /**
   * 设置开启方向
   * 当向下开启时，自动设置为内开
   */
  public set openDirection(value: OpenDirection) {
    this._openDirection = value;
    
    if (this.isDownOpen) {
      this._openToward = OpenToward.Inward;
    }
    
    this.hinges.forEach((hinge) => {
      hinge.edgeIndex = -1;
    });
    
    if (this.handle instanceof HardwareOnEdge) {
      this.handle.edgeIndex = -1;
    }
  }

  /**
   * 获取铰链类型
   */
  public get hingeType(): HardwareShape {
    return this._hingeType;
  }

  /**
   * 设置铰链类型
   * 更改类型时会重新创建铰链
   */
  public set hingeType(value: HardwareShape) {
    if (value !== this._hingeType) {
      this.hinges.forEach((hinge) => this.sash.remove(hinge));
      this._hingeType = value;
      this.hingeCount = 2;
      this.hinges.forEach((hinge) => {
        hinge.hardwareShape = value;
      });
    }
  }

  /**
   * 获取铰链数量
   */
  public get hingeCount(): number {
    return this._hingeCount;
  }

  /**
   * 设置铰链数量
   * 限制范围：2-5个
   */
  public set hingeCount(value: number) {
    // 限制范围：0-5，0和1都转为2
    let count = value < 0 ? 0 : value;
    count = count > 5 ? 5 : count;
    count = count === 1 ? 2 : count;
    
    this._hingeCount = count;
    
    this.hinges.forEach((hinge) => this.sash.remove(hinge));
    this.initHinges();
    this.hinges.forEach((hinge) => {
      hinge.hardwareShape = this._hingeType;
    });
  }

  /**
   * 获取把手类型
   */
  public get handleType(): HardwareShape {
    return this.handle.hardwareShape;
  }

  /**
   * 设置把手类型
   * 更改类型时会重新创建把手并复制设置
   */
  public set handleType(value: HardwareShape) {
    this.handle.recycle();
    const oldHandle = this.handle;
    this.handle = this.createHandle(value);
    this.handle.copyCommonSettings(oldHandle);
    this.handle.hardwareShape = value;
  }

  /**
   * 获取铰链所在边的索引
   */
  public get hingeEdgeIndex(): number {
    return this.hinges.length > 0 ? this.hinges[0].edgeIndex : -1;
  }

  /**
   * 获取把手所在边的索引
   */
  public get handleEdgeIndex(): number {
    return this.handle instanceof HardwareOnFrame ? this.handle.edgeIndex : -1;
  }

  /**
   * 获取到地面标注的隐藏状态
   */
  public get dimToGroundHidden(): boolean {
    return this.handle.dim.hidden;
  }

  /**
   * 设置到地面标注的隐藏状态
   */
  public set dimToGroundHidden(value: boolean) {
    this.handle.dim.hidden = value;
  }

  /**
   * 创建所有五金件
   */
  public create(): this {
    this.hinges.forEach((hinge) => hinge.create());
    this.handle.create();
    this.indicator.create();
    this.indicatorForSlide.create();
    return this;
  }

  /**
   * 重新创建所有五金件
   */
  public recreate(): void {
    this.hinges.forEach((hinge, index) => {
      this.hinges[index] = hinge.recreate();
    });
    
    this.hinges.forEach((hinge) => hinge.create());
    
    this.handle = this.handle.recreate().updatePoly();
    this.indicator = new IndicatorForSash(this).create();
    this.indicatorForSlide = new IndicatorForSlide(this).create();
  }

  /**
   * 更新所有多边形
   */
  public updatePoly(): void {
    this.hinges.forEach((hinge) => hinge.updatePoly());
    this.handle.updatePoly();
    this.indicator.updatePoly();
    this.indicatorForSlide.updatePoly();
  }

  /**
   * 平移所有五金件
   * @param offset 平移向量
   */
  public translate(offset: any): void {
    this.hinges.forEach((hinge) => hinge.translate(offset));
    this.handle.translate(offset);
    this.indicator.translate(offset);
    this.indicatorForSlide.translate(offset);
  }

  /**
   * 序列化为JSON
   */
  public toJSON(): PushSashHardwareManagerJSON {
    const json = super.toJSON() as PushSashHardwareManagerJSON;
    json.hingeType = this._hingeType;
    json.hingeCount = this._hingeCount;
    json.handle = this.handle.toJSON();
    json.hinges = this.hinges.map((hinge) => hinge.toJSON());
    json.slide = this.slide;
    json.mlp = this.multiLockPoints;
    return json;
  }

  /**
   * 从JSON反序列化
   * @param data 序列化数据
   */
  public deserialize(data: any): this {
    super.deserialize(data);
    
    this.handleType = data.handle.hardwareShape;
    this.handle.deserialize(data.handle);
    
    this.hingeType = data.hingeType ?? HardwareShape.Hinge;
    this.hingeCount = data.hingeCount ?? 0;
    
    this.hinges.forEach((hinge, index) => {
      const hingeData = data.hinges[index];
      if (hingeData) {
        hinge.deserialize(hingeData);
      }
    });
    
    if (data.slide) {
      this.slide = data.slide;
    }
    
    if (data.mlp !== undefined) {
      this.multiLockPoints = data.mlp;
    }
    
    return this;
  }

  /**
   * 绘制五金件
   * @param context 绘图上下文
   */
  public draw(context: any): void {
    super.draw(context);
    this.indicator.draw(context);
    this.indicatorForSlide.draw(context);
  }

  /**
   * 修复数据兼容性
   * @param data 原始数据
   */
  protected fixData(data: any): any {
    data = super.fixData(data);
    
    if (data.handle.hardwareShape === undefined) {
      data.handle.hardwareShape = HardwareShape.Handle;
    }
    
    if (data.hinges === undefined) {
      data.hinges = [];
    }
    
    if (data.hingeType === undefined) {
      data.hingeType = HardwareShape.Hinge;
    }
    
    return data;
  }

  /**
   * 根据类型创建把手实例
   * @param shapeType 把手形状类型
   */
  private createHandle(shapeType: HardwareShape): Handle | CommercialHandle | CrossHandle {
    switch (shapeType) {
      case HardwareShape.CommercialHandle:
      case HardwareShape.CommercialHandle2:
      case HardwareShape.CommercialHandle3:
      case HardwareShape.CommercialHandle4:
      case HardwareShape.CommercialHandle5:
      case HardwareShape.CommercialHandle6:
      case HardwareShape.CommercialHandle7:
      case HardwareShape.CommercialHandle8:
      case HardwareShape.CommercialHandle13:
      case HardwareShape.CommercialHandle14:
        return new CommercialHandle(this);
      
      case HardwareShape.CrossHandle:
      case HardwareShape.CommercialHandle9:
      case HardwareShape.CommercialHandle10:
      case HardwareShape.CommercialHandle11:
      case HardwareShape.CommercialHandle12:
        const crossHandle = new CrossHandle(this);
        if (
          shapeType === HardwareShape.CommercialHandle9 ||
          shapeType === HardwareShape.CommercialHandle10
        ) {
          crossHandle.isVertical = true;
        }
        return crossHandle;
      
      case HardwareShape.Handle2:
      case HardwareShape.Handle3:
      case HardwareShape.Handle4:
      case HardwareShape.Handle5:
        return Handle.forDoor(this, shapeType);
      
      default:
        return new Handle(this);
    }
  }

  /**
   * 初始化铰链数组
   */
  private initHinges(): void {
    this.hinges.splice(this._hingeCount);
    
    for (let i = 0; i < this._hingeCount; i++) {
      const HingeClass = this._hingeType === HardwareShape.EndpointHinge
        ? EndpointHinge
        : Hinge;
      this.hinges[i] = new HingeClass(this);
    }
  }
}