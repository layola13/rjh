/**
 * KFC推拉窗扇设置模块
 * 提供推拉窗扇的配置、硬件属性和行为管理
 */

import { Vector } from './Vector';
import { EventType } from './EventType';
import { 
  DoubleKfcSash, 
  Glass, 
  HardwareShapeCreator, 
  KfcSash,
  Frame,
  ViewManager,
  MomentoManager,
  ShapeManager,
  Layer,
  EventBus,
  Handle,
  Indicator,
  MullionManager,
  Polygon,
  Box
} from './types';

/**
 * 接头方式枚举
 */
export enum JointWay {
  /** 对接 */
  BUTT = 'butt',
  /** 搭接 */
  OVERLAP = 'overlap',
  /** 企口 */
  TONGUE_GROOVE = 'tongueGroove'
}

/**
 * 开启方向枚举
 */
export enum OpenDirection {
  /** 左开 */
  LEFT = 'left',
  /** 右开 */
  RIGHT = 'right',
  /** 上开 */
  UP = 'up',
  /** 下开 */
  DOWN = 'down'
}

/**
 * 开启朝向枚举
 */
export enum OpenToward {
  /** 内开 */
  INWARD = 'inward',
  /** 外开 */
  OUTWARD = 'outward'
}

/**
 * 把手类型
 */
export interface HandleType {
  id: string;
  name: string;
  model: string;
}

/**
 * 合页类型
 */
export interface HingeType {
  id: string;
  name: string;
  loadCapacity: number;
}

/**
 * 硬件组件接口
 */
export interface Hardware {
  /** 关联的窗扇 */
  sash: KfcSash;
  /** 开启方向 */
  openDirection: OpenDirection;
  /** 开启朝向 */
  openToward: OpenToward;
  /** 把手配置 */
  handle: Handle;
  /** 指示器 */
  indicator: Indicator;
  /** 把手类型 */
  handleType: HandleType;
  /** 合页类型 */
  hingeType: HingeType;
  /** 合页数量 */
  hingeCount: number;
  /** 是否隐藏到地尺寸标注 */
  dimToGroundHidden: boolean;
  
  /** 更新多边形 */
  updatePoly(): void;
  /** 绘制硬件 */
  draw(view: ViewManager): void;
}

/**
 * 视图管理器接口
 */
export interface ViewManager {
  /** 活动图层 */
  activeLayer: Layer;
  /** 备忘录管理器 */
  mometoManager: MomentoManager;
  /** 形状管理器 */
  shapeManager: ShapeManager;
  /** 事件总线 */
  eventBus: EventBus;
  
  /** 刷新视图 */
  refresh(): void;
}

/**
 * KFC推拉窗扇设置类
 * 封装窗扇的所有配置属性和行为操作
 */
export class KfcSashSettings {
  /** 硬件组件 */
  private readonly hardware: Hardware;
  /** 视图管理器 */
  private readonly view: ViewManager;

  /**
   * 构造函数
   * @param hardware - 硬件组件实例
   * @param view - 视图管理器实例
   */
  constructor(hardware: Hardware, view: ViewManager) {
    this.hardware = hardware;
    this.view = view;
  }

  /**
   * 获取目标窗扇对象
   */
  get target(): KfcSash {
    return this.hardware.sash;
  }

  /**
   * 判断是否为双扇窗
   */
  get isDouble(): boolean {
    return this.target.parent instanceof DoubleKfcSash;
  }

  /**
   * 获取/设置接头方式
   */
  get jointWay(): JointWay {
    return this.target.jointWay;
  }

  set jointWay(value: JointWay) {
    this.target.jointWay = value;
    this.target.updatePoly();
    this.target.draw(this.view);
    Glass.calcSerial(this.view.shapeManager.shapem);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * 获取/设置开启方向
   */
  get openDirection(): OpenDirection {
    return this.hardware.openDirection;
  }

  set openDirection(value: OpenDirection) {
    if (this.hardware.openDirection !== value) {
      this.hardware.openDirection = value;
      this.hardware.handle.autoOffset = true;
      this.hardware.updatePoly();
      this.hardware.draw(this.view);
      this.broadcastTopViewChange();
      this.view.activeLayer.batchDraw();
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * 获取/设置开启朝向
   */
  get openToward(): OpenToward {
    return this.hardware.openToward;
  }

  set openToward(value: OpenToward) {
    if (this.hardware.openToward !== value) {
      this.hardware.openToward = value;
      this.hardware.indicator.updatePoly();
      this.target.draw(this.view);
      this.broadcastTopViewChange();
      this.view.activeLayer.batchDraw();
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * 获取/设置偏移向量是否启用
   */
  get offvecEnabled(): boolean {
    return this.target.offvecEnabled;
  }

  set offvecEnabled(value: boolean) {
    this.target.offvecEnabled = value;
    if (!value) {
      this.hasOffset = false;
    }
  }

  /**
   * 获取/设置是否存在偏移
   */
  get hasOffset(): boolean {
    return !this.target.offvec.equalTo(Vector.zero());
  }

  set hasOffset(value: boolean) {
    if (!value) {
      this.target.translate(this.target.offvec.invert());
      this.target.hideAssist();
      this.target.offvec = Vector.zero();
      this.view.activeLayer.batchDraw();
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * 获取/设置窗扇是否处于开启状态
   */
  get opened(): boolean {
    return this.target.opened;
  }

  set opened(value: boolean) {
    if (this.target.opened !== value) {
      this.target.opened = value;
      this.target.draw(this.view);
      this.view.activeLayer.batchDraw();
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * 获取可用的把手类型列表
   */
  get handleTypeList(): HandleType[] {
    return [...HardwareShapeCreator.Ins.doorHandles];
  }

  /**
   * 获取/设置把手类型
   */
  get handleType(): HandleType {
    return this.hardware.handleType;
  }

  set handleType(value: HandleType) {
    this.hardware.handleType = value;
    this.hardware.sash.updatePoly();
    this.target.draw(this.view);
    Glass.calcSerial(this.view.shapeManager.shapem);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * 获取/设置合页类型
   */
  get hingeType(): HingeType {
    return this.hardware.hingeType;
  }

  set hingeType(value: HingeType) {
    this.hardware.hingeType = value;
    this.hardware.updatePoly();
    this.target.draw(this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * 获取/设置合页数量
   */
  get hingesCount(): number {
    return this.hardware.hingeCount;
  }

  set hingesCount(value: number) {
    this.hardware.hingeCount = value;
    this.hardware.updatePoly();
    this.target.draw(this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * 获取/设置合页是否隐藏
   */
  get hingesHidden(): boolean {
    return this.hardware.hingeCount === 0;
  }

  set hingesHidden(value: boolean) {
    this.hardware.hingeCount = value ? 0 : 2;
    this.hardware.updatePoly();
    this.target.draw(this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * 获取/设置是否隐藏到地尺寸标注
   */
  get dimToGroundHidden(): boolean {
    return this.hardware.dimToGroundHidden;
  }

  set dimToGroundHidden(value: boolean) {
    if (value !== this.hardware.dimToGroundHidden) {
      this.hardware.dimToGroundHidden = value;
      this.hardware.updatePoly();
      this.target.draw(this.view);
      this.view.activeLayer.batchDraw();
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * 获取/设置大扇上下尺寸
   */
  get largeUpDownSize(): number {
    return this.target.largeUpDownSize;
  }

  set largeUpDownSize(value: number) {
    this.target.largeUpDownSize = value;
    this.target.updatePoly();
    this.target.draw(this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * 获取/设置是否作为固定宽度窗扇
   */
  get asFixedWidthSash(): boolean {
    return this.target.fixedWidth !== -1;
  }

  set asFixedWidthSash(value: boolean) {
    if (!this.isDouble) {
      return;
    }

    const targetSash = this.target;
    const doubleSash = targetSash.parent as DoubleKfcSash;
    const box: Box = targetSash.polygon.box;

    targetSash.fixedWidth = value ? box.xmax - box.xmin : -1;

    if (value) {
      const otherSash = doubleSash.sashes.find(sash => sash !== targetSash);
      if (otherSash) {
        otherSash.fixedWidth = -1;
      }
    }

    doubleSash.updatePoly();
    doubleSash.draw(this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * 获取/设置拉动高度
   */
  get pullingHeight(): number {
    if (this.isDouble) {
      return 0;
    }

    const topFrame = this.target.topFrame;
    const pullingHeightConfig = topFrame.mulManager.splitter.getPullingHeight(this.target.polyId);
    return pullingHeightConfig?.height ?? 0;
  }

  set pullingHeight(value: number) {
    if (this.isDouble) {
      return;
    }

    const topFrame = this.target.topFrame;
    topFrame.mulManager.splitter.setPullingHeight(this.target.polyId, value);
    topFrame.updateFrame();
    topFrame.draw(this.view);
    this.view.refresh();
  }

  /**
   * 判断是否允许设置拉动高度
   */
  get allowPullingHeightSet(): boolean {
    return !this.isDouble && 
           this.target.topFrame.mulManager.splitter.allowPullingHeight(this.target.polygon);
  }

  /**
   * 广播顶视图变更事件
   * @private
   */
  private broadcastTopViewChange(): void {
    this.view.eventBus.emit({
      type: EventType.TOP_VIEW_CHANGE,
      payload: {
        view: this.view,
        frame: this.target.topFrame
      }
    });
  }
}