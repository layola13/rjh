/**
 * WFACompsResize - 组件调整大小的Gizmo控制器
 * 提供可视化的尺寸调整手柄，支持拖拽、旋转和实时预览
 */

import { Node, Vector3, Quaternion } from '367441';
import { FuzzyGizmo, GizmoBaseAgent, SvgShapeGizmo, FuzzyDirection } from '918038';
import { HSApp } from '518193';
import { Matrix4 } from '815362';
import { style } from '151452';
import { WFABase } from '122206';
import { ResizeBoxColor } from '44182';

/**
 * 鼠标样式类型
 */
type MouseStyleType = 'normal' | 'hover';

/**
 * 拖拽参数接口
 */
interface DragMoveParam {
  /** 是否线性移动 */
  linearMove: boolean;
  /** 偏移量 [x, y, z] */
  offset?: [number, number, number];
}

/**
 * 拖拽结束参数接口
 */
interface DragEndParam {
  /** 是否跟踪鼠标 */
  trackingMouse: boolean;
}

/**
 * 位置向量接口
 */
interface Position {
  x: number;
  y: number;
  z: number;
}

/**
 * 尺寸接口
 */
interface Size {
  x: number;
  y: number;
  z: number;
}

/**
 * 包围盒接口
 */
interface BoundingBox {
  size: Size;
}

/**
 * WFACompsResize - 硬装组件调整大小控制器
 * 继承自WFABase，提供3D场景中组件的交互式尺寸调整功能
 */
export class WFACompsResize extends WFABase {
  /** 当前旋转四元数 */
  private _rotation?: Quaternion;
  
  /** 是否显示包围盒Gizmo */
  private _showBoxGizmo: boolean;
  
  /** 模糊Gizmo实例，管理所有调整手柄 */
  public fuzzyGizmo?: FuzzyGizmo;

  /**
   * 构造函数
   * @param context - 上下文对象
   * @param layer - 图层对象
   * @param contents - 内容对象
   * @param command - 命令字符串（空字符串）
   * @param selectionStateProxy - 选择状态代理
   * @param modelProxy - 模型代理
   * @param showBoxGizmo - 是否显示包围盒Gizmo，默认true
   * @param additionalParam - 额外参数（可选）
   */
  constructor(
    context: unknown,
    layer: unknown,
    contents: unknown,
    command: string,
    selectionStateProxy: unknown,
    modelProxy: unknown,
    showBoxGizmo: boolean = true,
    additionalParam?: unknown
  ) {
    super(context, layer, contents, '', selectionStateProxy, modelProxy, additionalParam);
    this._showBoxGizmo = showBoxGizmo;
    this.init();
  }

  /**
   * 初始化Gizmo控制器
   * 创建节点、模糊Gizmo、注册事件处理器
   */
  public init(): void {
    this.node = new Node();
    this.fuzzyGizmo = new FuzzyGizmo();
    this.fuzzyGizmo.initialize();
    this.node.addChild(this.fuzzyGizmo.getGraphicsNode());
    this.layer.addChild(this);

    // 初始化子Gizmo代理
    this.fuzzyGizmo.forEachChild((child) => {
      child.initialize();
      const agent = new GizmoBaseAgent(this.context, child, this.layer);
      this.addChildGizmo(agent);
    });

    // 设置包围盒样式
    this.fuzzyGizmo.boxGizmo.color = ResizeBoxColor.NormalColor;
    this.fuzzyGizmo.boxGizmo.opacity = 1;

    // 配置SVG箭头Gizmo的事件处理器
    this.fuzzyGizmo.svgGizmos.forEach((gizmo) => {
      this._updateArrowStyler(gizmo, 'normal');
      gizmo.mousemove = this.onGizmoMouseMove.bind(this);
      gizmo.mouseout = this.onGizmoMouseOut.bind(this);
      gizmo.ondragstart = this.ondragstart.bind(this);
      gizmo.ondragend = this.ondragend.bind(this);
      gizmo.composedragmoveparam = this.composeDragMoveParam.bind(this);
      gizmo.composedragendparam = this.composedragendparam.bind(this);
    });

    // 隐藏面Gizmo
    this.fuzzyGizmo.faceGizmos.forEach((gizmo) => gizmo.hide());

    // 设置相机并更新变换
    this.fuzzyGizmo.camera = HSApp.App.getApp().floorplan.active_camera;
    this._updateNodeTransform();
  }

  /**
   * 更新节点的位置、尺寸、旋转等变换属性
   * 同步组件状态到Gizmo显示
   */
  private _updateNodeTransform(): void {
    const size = this._getSize();
    const position = this.getBottomCenterPos();
    const rotation = this._getGizmoRotation();

    this._rotation = rotation;

    // 设置Gizmo属性（注意坐标系转换）
    this.fuzzyGizmo!.position = new Vector3(position.x, position.z, -position.y);
    this.fuzzyGizmo!.width = size.x;
    this.fuzzyGizmo!.depth = size.y;
    this.fuzzyGizmo!.height = size.z;
    this.fuzzyGizmo!.rotation = new Quaternion(rotation.x, rotation.z, -rotation.y, rotation.w);

    // 控制显示/隐藏
    if (this._isShowEnable()) {
      this.fuzzyGizmo!.show();
      this.fuzzyGizmo!.svgGizmos.forEach((gizmo) => gizmo.show());

      if (this._showBoxGizmo) {
        this.fuzzyGizmo!.boxGizmo.show();
      } else {
        this.fuzzyGizmo!.boxGizmo.hide();
      }
    } else {
      this.fuzzyGizmo!.hide();
    }

    this._checkRangeAndCollision(this.fuzzyGizmo!.boxGizmo);
    this.dirty = true;
  }

  /**
   * 清理资源，释放Gizmo对象
   */
  public onCleanup(): void {
    this.fuzzyGizmo?.onCleanup();
    this.fuzzyGizmo = undefined;
    super.onCleanup();
  }

  /**
   * Gizmo鼠标移入事件处理
   * @param event - 鼠标事件
   * @param target - 目标Gizmo
   */
  public onGizmoMouseMove(event: MouseEvent, target: unknown): void {
    if (target instanceof SvgShapeGizmo) {
      this._updateArrowStyler(target, 'hover');
      this._updateBoxFaceStyler(target.parent, target.name);
    }
  }

  /**
   * Gizmo鼠标移出事件处理
   * @param event - 鼠标事件
   * @param target - 目标Gizmo
   */
  public onGizmoMouseOut(event: MouseEvent, target: unknown): void {
    if (target instanceof SvgShapeGizmo) {
      this._updateArrowStyler(target, 'normal');
      this._updateBoxFaceStyler(target.parent);
    }
  }

  /**
   * 拖拽开始事件处理
   * 创建并执行调整大小命令
   * @param event - 鼠标事件
   * @param target - 目标Gizmo
   * @returns 是否成功处理
   */
  public ondragstart(event: MouseEvent, target: SvgShapeGizmo): boolean {
    const cmdManager = HSApp.App.getApp().cmdManager;
    const direction = this._getDirection(target.name);
    const position = this.getBottomCenterPos();
    
    position.z -= this._getLayerAltitudeHeight();

    const command = cmdManager.createCommand(
      HSFPConstants.CommandType.ResizeInHardDecoration,
      [this.contents, direction.clone(), this._getBox().size, position]
    );

    if (command) {
      cmdManager.execute(command);
    }

    return true;
  }

  /**
   * 拖拽结束事件处理
   * @param event - 鼠标事件
   * @param target - 目标Gizmo
   * @returns 是否成功处理
   */
  public ondragend(event: MouseEvent, target: SvgShapeGizmo): boolean {
    return true;
  }

  /**
   * 组合拖拽移动参数
   * 将屏幕空间的偏移量转换为组件局部空间的偏移量
   * @param param - 拖拽参数
   * @param target - 目标Gizmo
   * @returns 处理后的拖拽参数
   */
  public composeDragMoveParam(param: DragMoveParam, target: SvgShapeGizmo): DragMoveParam {
    param.linearMove = true;

    if (param.offset && this._rotation) {
      const direction = this._getDirection(target.name);
      const rotationMatrix = Matrix4.makeRotateFromQuaternion(this._rotation);
      
      // 变换方向到世界空间
      direction.transform(rotationMatrix);

      // 将偏移量投影到方向向量上
      const offsetVector = new Vector3(param.offset[0], -param.offset[2], param.offset[1]);
      const projectedOffset = direction.multiplied(offsetVector.dot(direction));

      // 变换回局部空间
      projectedOffset.transform(rotationMatrix.inversed());

      param.offset[0] = projectedOffset.x;
      param.offset[1] = projectedOffset.y;
      param.offset[2] = projectedOffset.z;
    }

    return param;
  }

  /**
   * 组合拖拽结束参数
   * @param param - 拖拽结束参数
   * @param target - 目标Gizmo
   * @returns 处理后的参数
   */
  public composedragendparam(param: DragEndParam, target: SvgShapeGizmo): DragEndParam {
    param.trackingMouse = true;
    return param;
  }

  /**
   * 根据方向名称获取方向向量
   * @param directionName - FuzzyDirection枚举值
   * @returns 单位方向向量
   */
  private _getDirection(directionName: string): Vector3 {
    switch (directionName) {
      case FuzzyDirection.LEFT:
        return Vector3.X(-1);
      case FuzzyDirection.RIGHT:
        return Vector3.X(1);
      case FuzzyDirection.BOTTOM:
        return Vector3.Z(-1);
      case FuzzyDirection.TOP:
        return Vector3.Z(1);
      case FuzzyDirection.FRONT:
        return Vector3.Y(-1);
      case FuzzyDirection.BACK:
        return Vector3.Y(1);
      default:
        return Vector3.X(1);
    }
  }

  /**
   * 获取Gizmo的旋转四元数
   * @returns 旋转四元数
   */
  private _getGizmoRotation(): Quaternion {
    return this._getRotation();
  }

  /**
   * 更新箭头Gizmo的样式
   * @param gizmo - SVG形状Gizmo
   * @param styleType - 样式类型（normal/hover）
   */
  private _updateArrowStyler(gizmo: SvgShapeGizmo, styleType: MouseStyleType): void {
    gizmo.opacity = style.arrow.opacity[styleType][gizmo.name];
    gizmo.fillColor = style.arrow.color[styleType][gizmo.name];
    gizmo.strokeColor = style.arrow.color[styleType][gizmo.name];
  }

  /**
   * 更新包围盒面Gizmo的样式
   * @param parent - 父Gizmo对象
   * @param hoveredFaceName - 悬停的面名称（可选）
   */
  private _updateBoxFaceStyler(parent: unknown, hoveredFaceName?: string): void {
    parent.faceGizmoMap.forEach((faceGizmo: any) => {
      if (faceGizmo.name === hoveredFaceName) {
        faceGizmo.show();
        faceGizmo.opacity = style.face.opacity.hover[hoveredFaceName];
        faceGizmo.color = style.face.color.hover[hoveredFaceName];
      } else {
        faceGizmo.hide();
      }
    });
  }

  // 以下方法需要在父类WFABase中定义，此处声明类型
  protected _getSize(): Size;
  protected getBottomCenterPos(): Position;
  protected _getRotation(): Quaternion;
  protected _isShowEnable(): boolean;
  protected _checkRangeAndCollision(boxGizmo: unknown): void;
  protected _getLayerAltitudeHeight(): number;
  protected _getBox(): BoundingBox;
  protected addChildGizmo(agent: GizmoBaseAgent): void;
}