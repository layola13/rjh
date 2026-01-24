import { ShapeHelper } from './ShapeHelper';
import { Tool } from './Tool';
import type { KonvaEventObject } from 'konva/lib/Node';
import type { Shape } from 'konva/lib/Shape';

/**
 * 硬件捕捉信息接口
 */
interface HardwareSnapInfo {
  /** 捕捉线段 */
  snapLine: {
    /** 起始点 */
    start: Point;
    /** 结束点（磁吸目标点） */
    end: Point;
  };
}

/**
 * 二维坐标点接口
 */
interface Point {
  x: number;
  y: number;
}

/**
 * 硬件对象接口
 */
interface Hardware {
  /** 硬件管理器 */
  manager: HardwareManager;
  
  /**
   * 获取所有相同类型的硬件
   * @returns 相同类型的硬件数组
   */
  allSameHardwares(): Hardware[];
  
  /**
   * 计算与目标硬件的捕捉信息
   * @param target - 目标硬件
   * @param point - 当前坐标点
   * @returns 捕捉信息，无捕捉时返回 undefined
   */
  snapHardware(target: Hardware, point: Point): HardwareSnapInfo | undefined;
}

/**
 * 硬件管理器接口
 */
interface HardwareManager {
  /** 关联的窗扇对象 */
  sash: unknown;
}

/**
 * 视图形状接口（扩展 Konva Shape）
 */
interface VShape extends Shape {
  /** 形状属性 */
  attrs: {
    /** 关联的硬件机器人对象 */
    robot: Hardware;
    [key: string]: unknown;
  };
}

/**
 * 视图接口
 */
interface View {
  /** 备忘录管理器 */
  mometoManager: {
    /** 检查并记录当前状态点 */
    checkPoint(): void;
  };
}

/**
 * 硬件编辑工具类
 * 用于处理硬件拖拽、捕捉和编辑操作
 */
export class EditHardwareTool extends Tool {
  /** 视图实例 */
  private readonly view: View;
  
  /** 当前操作的视图形状 */
  private vshape?: VShape;
  
  /** 当前编辑的硬件对象 */
  private hardware?: Hardware;
  
  /** 磁吸目标点 */
  private magneticPoint?: Point;
  
  /** 当前拖拽点坐标 */
  private curPt?: Point;

  /**
   * 构造函数
   * @param stage - 舞台对象
   * @param view - 视图对象
   */
  constructor(stage: unknown, view: View) {
    super(stage, view);
    this.view = view;
  }

  /**
   * 获取硬件管理器
   */
  get manager(): HardwareManager {
    return this.hardware!.manager;
  }

  /**
   * 获取关联的窗扇对象
   */
  get sash(): unknown {
    return this.manager.sash;
  }

  /**
   * 拖拽开始事件处理
   * @param event - Konva 事件对象
   */
  dragstart(event: KonvaEventObject<DragEvent>): void {
    super.dragstart(event);
    this.vshape = event.target as VShape;
    this.hardware = this.vshape.attrs.robot;
  }

  /**
   * 拖拽移动事件处理
   * @param event - Konva 事件对象
   */
  dragmove(event: KonvaEventObject<DragEvent>): void {
    super.dragmove(event);
    
    if (this.vshape) {
      ShapeHelper.restoreShapeMatrix(this.vshape);
    }

    requestAnimationFrame(() => {
      if (this.vshape && this.hardware !== undefined) {
        this.detectHardwareSnap();
        this.doTask(true);
      }
    });
  }

  /**
   * 鼠标操作完成事件处理
   * @param event - Konva 事件对象
   */
  mousedone(event: KonvaEventObject<MouseEvent>): void {
    if (this.hardware !== undefined) {
      // 应用磁吸点
      if (this.magneticPoint) {
        this.hideSnaps();
        this.curPt = this.magneticPoint;
      }

      this.doTask(false);
      this.view.mometoManager.checkPoint();

      if (this.vshape) {
        ShapeHelper.restoreShapeMatrix(this.vshape);
      }

      // 清理状态
      this.hardware = undefined;
      this.vshape = undefined;
    }

    super.mousedone(event);
  }

  /**
   * 检测硬件捕捉
   * 计算与其他相同类型硬件的磁吸关系
   */
  private detectHardwareSnap(): void {
    this.hideSnaps();
    this.magneticPoint = undefined;

    if (!this.hardware || !this.curPt) {
      return;
    }

    // 获取所有相同类型硬件的捕捉信息
    const snapInfos = this.hardware
      .allSameHardwares()
      .map((hw) => hw.snapHardware(this.hardware!, this.curPt!))
      .filter((info): info is HardwareSnapInfo => info !== undefined);

    // 应用第一个捕捉结果
    if (snapInfos.length > 0) {
      const firstSnap = snapInfos[0];
      this.displaySnap(firstSnap.snapLine.start, firstSnap.snapLine.end);
      this.magneticPoint = firstSnap.snapLine.end;
    }
  }

  /**
   * 执行任务（需在子类或基类中实现）
   * @param isMoving - 是否正在移动中
   */
  protected doTask(isMoving: boolean): void {
    // 实现逻辑在基类或派生类中
  }

  /**
   * 隐藏捕捉线（需在基类中实现）
   */
  protected hideSnaps(): void {
    // 实现逻辑在基类中
  }

  /**
   * 显示捕捉线（需在基类中实现）
   * @param start - 起始点
   * @param end - 结束点
   */
  protected displaySnap(start: Point, end: Point): void {
    // 实现逻辑在基类中
  }
}