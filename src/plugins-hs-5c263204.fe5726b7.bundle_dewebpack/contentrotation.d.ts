/**
 * 内容旋转模块
 * 提供3D场景中内容的旋转控制功能
 * @module ContentRotation
 */

import type { Node, MeshComponent, Matrix, Vector3, Quaternion } from './T3dTypes';
import type { SignalHook } from './SignalHook';
import type { ActiveType } from './ActiveType';

/**
 * 旋转网格数据
 */
interface MeshData {
  /** 主网格节点 */
  mesh: Node;
  /** 描边网格节点 */
  strokeMesh: Node;
}

/**
 * SVG数据加载结果
 */
interface SVGData {
  /** 解析后的SVG路径数据 */
  data: any;
}

/**
 * 旋转网格数据集合
 */
interface RotationMeshData {
  /** 圆环网格数据 */
  ringMeshData: SVGData;
  /** 旋转指示器网格数据 */
  rotateMeshData: SVGData;
}

/**
 * 拖拽事件参数
 */
interface DragEvent {
  /** 模型空间坐标 */
  modelPos?: THREE.Vector3;
  /** 地面坐标 */
  groundPos?: THREE.Vector3;
  /** 原始DOM事件 */
  event?: MouseEvent;
  /** 旋转增量（度） */
  delta?: number;
  /** 是否限制在房间内 */
  constraintInRoom?: boolean;
  /** 是否忽略捕捉偏移 */
  ignoreSnapOffset?: boolean;
  /** 是否启用灯光矩阵排列 */
  lightingMatrixArrangedEnable?: boolean;
  /** 是否强制保持Z轴 */
  forceKeepZAxis?: boolean;
}

/**
 * 内容旋转可视化组件
 * 负责在3D场景中显示和管理内容的旋转Gizmo
 */
export declare class ContentRotation extends HSApp.View.T3d.Gizmo {
  /** 静态网格数据缓存 */
  private static _meshData: RotationMeshData;

  /** 关联的内容实体 */
  readonly content: HSCore.Model.Content;
  
  /** 是否为1080模式 */
  readonly is1080: boolean;
  
  /** 信号钩子实例 */
  signalHook1: SignalHook;
  
  /** 内容起始旋转角度（度） */
  content_start_rotation: number | undefined;
  
  /** 当前旋转角度（弧度） */
  rotation: number;
  
  /** 视图旋转角度（弧度） */
  view_rotation: number;
  
  /** 起始角度（弧度） */
  start_angle: number;
  
  /** 内容边界长度 */
  contentBoundingLength: number;
  
  /** 激活的旋转类型（xy/xz/yz） */
  activeType: ActiveType;
  
  /** 激活上下文 */
  activeContext: any;
  
  /** 是否暂停位置更新 */
  positionUpdateSuspended: boolean;
  
  /** 相机变化时是否隐藏 */
  private _hideFromCameraChanging: boolean;
  
  /** 默认颜色（十六进制） */
  defaultColor: number;
  
  /** 激活状态颜色（十六进制） */
  activeColor: number;
  
  /** 旋转指示器网格 */
  rotationMesh: Node;
  
  /** 完整网格节点 */
  fullMesh: Node;
  
  /** 填充网格节点 */
  fillMesh: Node;
  
  /** 描边网格节点 */
  strokeMesh: Node;
  
  /** 圆环网格节点 */
  ring: Node;
  
  /** 网格组节点 */
  meshGroup: Node;
  
  /** 是否启用旋转捕捉 */
  private _enableRotationSnap: boolean;

  /**
   * 构造函数
   * @param entity - 实体对象
   * @param context - 上下文
   * @param content - 内容实体
   * @param boundingLength - 可选的边界长度
   * @param controller - 可选的控制器
   * @param activeType - 激活的旋转类型
   * @param activeContext - 激活上下文
   */
  constructor(
    entity: any,
    context: any,
    content: HSCore.Model.Content,
    boundingLength?: number,
    controller?: ContentRotationController,
    activeType?: ActiveType,
    activeContext?: any
  );

  /**
   * 从SVG文件加载数据
   * @param url - SVG文件URL
   * @returns SVG数据对象
   */
  static loadSVG(url: string): SVGData;

  /**
   * 构建网格
   * @param svgData - SVG数据
   * @returns 网格数据对象
   */
  private _buildMesh(svgData: any): MeshData;

  /**
   * 初始化网格
   */
  private _initMesh(): void;

  /**
   * 相机变化开始回调
   */
  private _onCameraChangeStart(): void;

  /**
   * 相机变化结束回调
   */
  private _onCameraChangeEnd(): void;

  /**
   * 设置相机变化时的隐藏状态
   * @param hide - 是否隐藏
   */
  setHideFromCameraChanging(hide: boolean): void;

  /**
   * 清理资源
   */
  onCleanup(): void;

  /**
   * 激活状态变化回调
   * @param event - 事件参数
   */
  private _onActiveChange(event: any): void;

  /**
   * 初始化Gizmo起始旋转角度
   * @returns 起始旋转角度（弧度）
   */
  private _initStartGizmoRotation(): number;

  /**
   * 初始化内容起始旋转角度
   */
  initStartRotation(): void;

  /**
   * 计算Gizmo缩放比例
   * @param camera - 相机对象
   * @param target - 目标位置
   * @returns 缩放向量
   */
  private _getGizmoScale(camera: HSCore.Model.Camera, target: any): Vector3;

  /**
   * 设置网格不透明度
   * @param mesh - 网格节点
   * @param opacity - 不透明度值 [0-1]
   */
  private _setMeshOpacity(mesh: Node, opacity: number): void;

  /**
   * 设置网格颜色
   * @param mesh - 网格节点
   * @param color - 颜色值（十六进制）
   */
  private _setMeshColor(mesh: Node, color: number): void;

  /**
   * 更新Gizmo显示
   */
  private _updateGizmoShow(): void;

  /**
   * 隐藏Gizmo
   */
  hide(): void;

  /**
   * 更新圆环网格
   */
  updateRingMesh(): void;

  /**
   * 获取内容位置
   * @param content - 内容实体
   * @returns 3D位置向量
   */
  private _getPosition(content: HSCore.Model.Content): Vector3;

  /**
   * 获取内容旋转角度
   * @returns 旋转角度（度）
   */
  getContentRotation(): number;

  /**
   * 内容字段变化回调
   * @param event - 事件参数
   */
  private _onContentFieldChange(event: any): void;

  /**
   * 绘制Gizmo
   */
  draw(): void;

  /**
   * 获取内容圆周旋转四元数
   * @returns 旋转四元数
   */
  getContentCircleRotation(): Quaternion | undefined;

  /**
   * 拖拽开始回调
   * @returns 是否阻止默认行为
   */
  onDragStart(): boolean;

  /**
   * 拖拽结束回调
   * @returns 是否阻止默认行为
   */
  onDragEnd(): boolean;

  /**
   * 鼠标移动回调
   * @param event - 事件参数
   */
  onMouseMove(event: any): void;

  /**
   * 鼠标移出回调
   */
  onMouseOut(): void;

  /**
   * 旋转回调
   * @param event - 拖拽事件
   * @param angle - 旋转角度（弧度）
   * @returns 实际应用的旋转角度（弧度）
   */
  onRotate(event: DragEvent, angle: number): number;

  /**
   * 检查是否可旋转
   * @returns 是否可旋转
   */
  checkIsRotateable(): boolean;

  /**
   * 是否为主旋转轴
   * @returns 是否为主旋转轴（XY平面）
   */
  isMainRotate(): boolean;
}

/**
 * 内容旋转控制器
 * 处理旋转交互逻辑和命令执行
 */
export declare class ContentRotationController extends HSApp.View.Base.DisplayController {
  /** 视图旋转角度（弧度） */
  view_rotation: number;
  
  /** 操作类型 */
  private _opType: string;
  
  /** 默认控制器 */
  defaultController: HSApp.View.T3d.ContentController | HSApp.View.T3d.CustomizedPMInstanceModelController;
  
  /** 监听器实例 */
  private _listener: ContentRotation | null;
  
  /** 激活的旋转类型 */
  activeType: ActiveType;
  
  /** 是否启用方向捕捉 */
  private _enableOrientationSnap: boolean;

  /**
   * 构造函数
   * @param entity - 实体对象
   * @param context - 上下文
   * @param opType - 可选的操作类型
   * @param defaultController - 可选的默认控制器
   * @param activeType - 激活的旋转类型
   * @param activeContext - 激活上下文
   */
  constructor(
    entity: HSCore.Model.Content,
    context: any,
    opType?: string,
    defaultController?: any,
    activeType?: ActiveType,
    activeContext?: any
  );

  /**
   * 设置监听器
   * @param listener - 监听器实例
   */
  setListener(listener: ContentRotation | null): void;

  /**
   * 拖拽开始处理
   * @param event - 拖拽事件
   * @returns 是否处理成功
   */
  ondragstart(event: DragEvent): boolean;

  /**
   * 触发事件追踪
   */
  private _onTrackEvent(): void;

  /**
   * 将2D坐标转换为3D空间坐标
   * @param screenPos - 屏幕坐标
   * @param targetPos - 目标位置
   * @returns 3D空间坐标
   */
  get3DPos(screenPos: THREE.Vector3, targetPos: THREE.Vector3): THREE.Vector3;

  /**
   * 计算旋转增量
   * @param event - 拖拽事件
   * @returns 旋转增量（度）
   */
  private _calculateRotateDelta(event: DragEvent): number;

  /**
   * 组合拖拽移动参数
   * @param event - 拖拽事件
   * @returns 处理后的事件参数
   */
  composedragmoveparam(event: DragEvent): DragEvent;

  /**
   * 命令终止回调
   * @param event - 事件参数
   */
  private _onCommandTerminate(event: any): void;

  /**
   * 销毁控制器
   * @param event - 事件参数
   */
  destroy(event: any): void;
}