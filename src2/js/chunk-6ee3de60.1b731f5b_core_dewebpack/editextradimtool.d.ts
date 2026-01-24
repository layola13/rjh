import { Point, Vector } from 'geometry-library';
import { EventType } from './event-types';
import { DrawParams } from './draw-params';
import { dimModeEnum } from './dim-mode';
import { Tool, ToolType } from './tool';
import { SystemParam, ShapeHelper } from './system';
import { ExtraDimHorizontal, ExtraDimVertical, ExtraDimAngle, ExtraDim } from './extra-dim';

/**
 * 额外标注编辑工具
 * 用于编辑水平、垂直和角度标注的工具类
 */
export class EditExtraDimTool extends Tool {
  /** 当前视图实例 */
  private view: DrawingView;
  
  /** 上一个鼠标位置点 */
  private prevPt: Point;
  
  /** 当前操作的可视化图形对象 */
  private vshape?: VShape;

  /**
   * 构造函数
   * @param view - 绘图视图实例
   */
  constructor(view: DrawingView) {
    super(ToolType.editExtraDim, view);
    this.view = view;
    this.prevPt = new Point();
  }

  /**
   * 获取当前标注对象
   * @returns 当前图形关联的机器人标注对象
   */
  get dim(): ExtraDim | undefined {
    return this.vshape?.attrs.robot;
  }

  /**
   * 双击事件处理
   * 根据标注类型显示不同的编辑器
   * @param event - 鼠标事件对象
   */
  dbclick(event: MouseEvent): void {
    super.dbclick(event);
    this.vshape = event.target as VShape;

    if (!this.dim) {
      return;
    }

    // 非计算模式下处理水平/垂直标注
    if (this.view.dimManager.mode !== dimModeEnum.calculate) {
      if (this.dim instanceof ExtraDimHorizontal || this.dim instanceof ExtraDimVertical) {
        const segmentLength = (event.target as VShape).attrs.data.segs[2].length;
        
        if (DrawParams.Ins.customDimEditor && SystemParam.isMobileDevice) {
          this.emitDimEdit(event.evt, segmentLength);
        } else {
          this.showNumberEditor(event, segmentLength, this.onConfirm.bind(this));
        }
        return;
      }

      // 处理角度标注
      if (this.dim instanceof ExtraDimAngle) {
        if (DrawParams.Ins.customDimEditor && SystemParam.isMobileDevice) {
          this.emitDimEdit(event.evt, this.dim.value);
        } else {
          this.showNumberEditor(event, this.dim.textNumber, this.onConfirm.bind(this));
        }
        return;
      }
    }

    // 显示名称编辑器
    this.showEditor(
      event.evt.pageX,
      event.evt.pageY,
      this.dim.name,
      (newName: string) => {
        if (newName.length < 1) {
          return;
        }

        this.dim!.name = newName;
        this.view.dimManager.updateDimByName(newName, this.dim!.value);
        this.view.refresh();
        this.view.mometoManager.checkPoint();
        this.view.eventBus.emit({
          type: EventType.dim_name_modified,
          payload: event
        });
      }
    );
  }

  /**
   * 拖拽开始事件处理
   * @param event - 鼠标事件对象
   */
  dragstart(event: MouseEvent): void {
    super.dragstart(event);
    this.prevPt = this.curPt;
    this.vshape = event.target as VShape;
  }

  /**
   * 拖拽移动事件处理
   * 根据标注类型调整偏移向量
   * @param event - 鼠标事件对象
   */
  dragmove(event: MouseEvent): void {
    super.dragmove(event);

    const currentPoint = this.curPt;
    let offsetVector = new Vector(
      currentPoint.x - this.prevPt.x,
      currentPoint.y - this.prevPt.y
    );

    ShapeHelper.restoreShapeMatrix(this.vshape!);
    const dimObject = (event.target as VShape).attrs.robot as ExtraDim;

    // 根据标注类型投影偏移向量
    if (dimObject instanceof ExtraDimHorizontal) {
      // 水平标注只允许垂直移动
      offsetVector = offsetVector.projectionOn(new Vector(0, 1));
    } else if (dimObject instanceof ExtraDimVertical) {
      // 垂直标注只允许水平移动
      offsetVector = offsetVector.projectionOn(new Vector(1, 0));
    }

    dimObject.offVec = dimObject.offVec.add(offsetVector);
    this.prevPt = currentPoint;

    dimObject.create();
    dimObject.draw(this.view.activeLayer);
    this.view.refresh();
  }

  /**
   * 鼠标操作完成事件处理
   * 创建历史检查点
   * @param event - 鼠标事件对象
   */
  mousedone(event: MouseEvent): void {
    this.view.mometoManager.checkPoint();
    super.mousedone(event);
  }

  /**
   * 确认修改回调
   * 应用标注差异并刷新视图
   * @param diff - 修改的差异值
   */
  private onConfirm(diff: number): void {
    this.dim!.applyDiff(diff);
    this.view.refresh();
    this.view.mometoManager.checkPoint();
  }

  /**
   * 发射标注编辑事件
   * 用于移动设备的自定义编辑器
   * @param event - 原生事件对象
   * @param initialValue - 初始值
   */
  private emitDimEdit(event: Event, initialValue: number): void {
    this.view.eventBus.emit({
      type: EventType.dim_edit,
      payload: {
        event,
        initValue: initialValue,
        onConfirm: this.onConfirm.bind(this)
      }
    });
  }
}

/**
 * 绘图视图接口
 */
interface DrawingView {
  /** 标注管理器 */
  dimManager: DimManager;
  /** 活动图层 */
  activeLayer: Layer;
  /** 历史管理器 */
  mometoManager: MomentoManager;
  /** 事件总线 */
  eventBus: EventBus;
  /** 刷新视图 */
  refresh(): void;
}

/**
 * 可视化图形接口
 */
interface VShape {
  /** 图形属性 */
  attrs: {
    /** 关联的机器人标注对象 */
    robot?: ExtraDim;
    /** 图形数据 */
    data?: {
      /** 线段数组 */
      segs: Array<{ length: number }>;
    };
  };
}

/**
 * 标注管理器接口
 */
interface DimManager {
  /** 当前标注模式 */
  mode: dimModeEnum;
  /**
   * 根据名称更新标注
   * @param name - 标注名称
   * @param value - 标注值
   */
  updateDimByName(name: string, value: number): void;
}

/**
 * 历史管理器接口
 */
interface MomentoManager {
  /** 创建历史检查点 */
  checkPoint(): void;
}

/**
 * 事件总线接口
 */
interface EventBus {
  /**
   * 发射事件
   * @param event - 事件对象
   */
  emit(event: { type: EventType; payload: unknown }): void;
}

/**
 * 图层接口
 */
interface Layer {
  // 图层相关属性和方法
}