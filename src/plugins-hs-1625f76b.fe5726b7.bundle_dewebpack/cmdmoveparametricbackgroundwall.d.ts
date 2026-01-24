/**
 * 参数化背景墙移动命令模块
 * 提供参数化背景墙的移动、吸附、自动适配等功能
 */

import type { HSCore } from '@hs/core';
import type { HSApp } from '@hs/app';
import type { Vector3, Matrix4, Loop, Polygon } from '@hs/geometry';

/**
 * 3D点坐标接口
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 2D点坐标接口
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 目标面信息接口
 * 用于描述背景墙要吸附的目标面的几何信息
 */
interface TargetFaceInfo {
  /** 外轮廓点集 */
  outer: Point3D[];
  /** 孔洞轮廓点集数组 */
  holes: Point3D[][];
  /** 目标面ID */
  targetFaceId?: string;
  /** 深度值（用于吸附面偏移） */
  D?: number;
}

/**
 * 目标位置信息接口
 */
interface TargetPosition {
  x: number;
  y: number;
  z: number;
  rotation: number;
  XRotation: number;
  YRotation: number;
  /** 宿主实体（墙面/天花/地面） */
  host: HSCore.Model.Face | HSCore.Model.Wall;
  /** 是否自动适配 */
  isAutoFit: boolean;
  /** 是否可缩放 */
  isScalable: boolean;
  /** 目标面信息 */
  targetFaceInfo?: TargetFaceInfo;
}

/**
 * 移动选项接口
 */
interface MoveOptions {
  /** 移动方式：'contentmovement' | 'contentlift' | 其他 */
  moveby?: string;
  /** 是否移动成员 */
  moveMembers?: boolean;
  /** 保存的状态数据 */
  saved?: SavedState[];
}

/**
 * 保存状态接口
 */
interface SavedState {
  x: number;
  y: number;
  z: number;
  rotation: number;
  XRotation: number;
  YRotation: number;
  host: HSCore.Model.Face | HSCore.Model.Wall;
  /** 目标面信息 */
  targetFaceInfo?: TargetFaceInfo;
  /** 是否自动适配 */
  isAutoFit?: boolean;
  /** 是否可缩放 */
  isScalable?: boolean;
}

/**
 * 消息框按钮回调类型
 */
type MessageBoxCallback = (buttonIndex: number) => void;

/**
 * 参数化背景墙移动命令类
 * 继承自基础移动命令，提供参数化背景墙的专用移动逻辑
 */
export declare class CmdMoveParametricBackgroundWall extends HSApp.Cmd.MoveCommand {
  /** 命令管理器 */
  mgr: HSApp.CommandManager;
  
  /** 上次吸附的面3D对象集合 */
  lastSnapFaceT3ds: any[];
  
  /** 是否为剩余空间模式 */
  private _isRemainingSpace: boolean;
  
  /** 是否正在运行裁剪任务 */
  private _isRunClipTask: boolean;
  
  /** 目标位置信息 */
  private _targetPosition?: TargetPosition;
  
  /** 保存的状态数据 */
  saved: SavedState;
  
  /** 移动选项 */
  private _option?: MoveOptions;
  
  /** 操作的内容实体 */
  content: HSCore.Model.NCustomizedParametricBackgroundWall;
  
  /** 当前吸附的实体 */
  snappedEntity?: HSCore.Model.Face | HSCore.Model.Entity;
  
  /** 应用实例 */
  protected _app: HSApp.Application;
  
  /** 请求对象 */
  protected _request?: HSCore.Request.BaseRequest;
  
  /** 会话对象 */
  protected _session?: HSCore.Transaction.Session;
  
  /** 上下文对象 */
  context: HSCore.Context;
  
  /** 是否可以自动适配 */
  canDoAutoFit: boolean;
  
  /** 是否通过鼠标拖动移动 */
  dragByMouseMove: boolean;

  /**
   * 构造函数
   */
  constructor(...args: any[]);

  /**
   * 移动处理函数
   * @param mouseEvent - 鼠标事件
   * @param data - 附加数据
   */
  move(mouseEvent: MouseEvent, data: any): void;

  /**
   * 显示重复提示消息框
   * @param oldContents - 需要删除的旧内容实体数组
   * @param targetFaceInfo - 目标面信息
   */
  showMessageBox(oldContents: HSCore.Model.NCustomizedParametricBackgroundWall[], targetFaceInfo: TargetFaceInfo): void;

  /**
   * 处理完成逻辑
   * @param targetFaceInfo - 目标面信息
   * @param isInvalid - 是否为无效位置
   */
  handleComplete(targetFaceInfo: TargetFaceInfo | undefined, isInvalid: boolean): void;

  /**
   * 获取当前墙面上的所有参数化模型
   * @returns 参数化背景墙数组
   */
  getAllParametricModelInCurrentWall(): HSCore.Model.NCustomizedParametricBackgroundWall[];

  /**
   * 转换角度到[-180, 180]范围
   * @param angle - 输入角度
   * @returns 标准化后的角度
   */
  convertAngle(angle: number): number;

  /**
   * 获取宿主实体
   * @param mouseEvent - 鼠标事件
   * @returns 宿主实体
   */
  protected _getHost(mouseEvent: MouseEvent): HSCore.Model.Face | HSCore.Model.Wall | undefined;

  /**
   * 清除墙面高亮显示
   */
  clearWallHighLight(): void;

  /**
   * 检查是否允许放置到指定位置
   * @param entity - 要放置的实体
   * @returns 是否允许放置
   */
  allowToPlace(entity: HSCore.Model.Entity): boolean;

  /**
   * 清理时调用
   */
  onCleanup(): void;

  /**
   * 接收事件处理
   * @param eventType - 事件类型
   * @param eventData - 事件数据
   * @returns 是否继续处理
   */
  onReceive(eventType: string, eventData: any): boolean;

  /**
   * 终止命令
   * @param eventType - 事件类型
   * @param eventData - 事件数据
   * @returns 是否成功终止
   */
  protected _terminateCmd(eventType: string, eventData: any): boolean;

  /**
   * 设置相同类型重叠的实体
   * @param overlappedEntities - 重叠实体数组
   */
  setSameTypeOverlap(overlappedEntities: HSCore.Model.NCustomizedParametricBackgroundWall[]): void;

  /**
   * 根据实体获取Loop轮廓
   * @param entity - 实体对象
   * @returns Loop对象
   */
  getLoopByEntity(entity: HSCore.Model.NCustomizedParametricBackgroundWall): Loop;

  /**
   * 保存恢复数据
   */
  protected _saveRestoreData(): void;

  /**
   * 根据宿主获取自定义背景墙
   * @param wall - 墙体实体
   * @returns 自定义背景墙实体或undefined
   */
  getNCustomizedBackgroundWallByHost(wall: HSCore.Model.Wall): HSCore.Model.NCustomizedBackgroundWall | undefined;

  /**
   * 获取目标面信息
   * @returns 目标面信息或undefined
   */
  getTargetFaceInfo(): TargetFaceInfo | undefined;

  /**
   * 根据宿主面获取目标面信息
   * @param face - 面实体
   * @param depth - 深度值（可选）
   * @returns 目标面信息
   */
  private _getTargetFaceInfoByHostFace(face: HSCore.Model.Face, depth?: number): TargetFaceInfo;

  /**
   * 根据自定义模型裁剪外轮廓
   * @param outerLoop - 外轮廓Loop
   * @param face - 面实体
   * @param matrix - 变换矩阵
   * @param depth - 深度值
   * @returns 裁剪后的轮廓点集或undefined
   */
  getClipOuterByCustomizedModels(
    outerLoop: Loop, 
    face: HSCore.Model.Face, 
    matrix: Matrix4, 
    depth: number
  ): Point3D[] | undefined;

  /**
   * 根据吸附信息处理目标面信息
   * @param entity - 实体对象
   * @param targetFaceInfo - 目标面信息
   * @param matrix - 变换矩阵
   */
  handleTargetFaceInfoBySnapped(
    entity: HSCore.Model.NCustomizedParametricBackgroundWall, 
    targetFaceInfo: TargetFaceInfo, 
    matrix: Matrix4
  ): void;

  /**
   * 获取墙面上的自定义模型路径
   * @param face - 面实体
   * @param faceType - 面类型
   * @returns 路径点集数组
   */
  getCustomizedModelsPathOnWallFace(face: HSCore.Model.Face, faceType: string): Point2D[][];

  /**
   * 获取自定义参数化模型数据
   * @param face - 面实体
   * @returns 3D点集数组
   */
  getCustomizedPMData(face: HSCore.Model.Face): Point3D[][];

  /**
   * 裁剪路径
   * @param paths - 路径点集数组
   * @param outerBound - 外边界点集
   * @returns 裁剪后的路径数组
   */
  getClipPaths(paths: Point3D[][], outerBound: Point2D[]): Point3D[][];

  /**
   * 裁剪2D曲线路径
   * @param outerLoop - 外轮廓Loop
   * @param holeLoops - 孔洞Loop数组
   * @returns 裁剪后的多边形
   */
  clipCurve2dPaths(outerLoop: Loop, holeLoops: Loop[]): Polygon;

  /**
   * 获取实体适配中心位置
   * @returns 中心位置向量
   */
  private _getEntityFitCenterPos(): Vector3;

  /**
   * 显示尺寸限制提示
   * @param targetFaceInfo - 目标面信息
   */
  showLimitTip(targetFaceInfo: TargetFaceInfo): void;

  /**
   * 获取命令分类
   * @returns 分类标识
   */
  getCategory(): string;

  /**
   * 获取命令描述
   * @returns 描述文本
   */
  getDescription(): string;

  /**
   * 删除旧内容
   * @param contents - 要删除的内容数组
   */
  protected deleteOldContents(contents: HSCore.Model.NCustomizedParametricBackgroundWall[]): void;

  /**
   * 检查移动是否无效
   * @param eventData - 事件数据
   * @returns 是否无效
   */
  protected _checkMoveInValid(eventData: any): boolean;

  /**
   * 显示无效内容位置提示
   * @param content - 内容实体
   */
  protected _showInvalidContentPositionLivehint(content: HSCore.Model.Entity): void;

  /**
   * 清理移动内容Gizmo
   */
  protected _cleanMoveContentGizmo(): void;

  /**
   * 检查内容是否已移动
   * @returns 是否已移动
   */
  protected isContentMoved(): boolean;
}

/**
 * 默认导出（向后兼容）
 */
export default CmdMoveParametricBackgroundWall;