import type { HSCore } from './HSCore';
import type { HSApp } from './HSApp';
import type { HSFPConstants } from './HSFPConstants';
import type { Loop, Vector3, Matrix4 } from './Geometry';

/**
 * 目标面信息
 * 描述背景墙单元在目标面上的位置和边界信息
 */
export interface TargetFaceInfo {
  /** 外边界点集合 */
  outer?: Array<{ x: number; y: number; z: number }>;
  /** 深度值（墙体厚度） */
  D?: number;
}

/**
 * 移动目标位置参数
 * 包含位置、旋转角度和宿主面信息
 */
export interface MoveTargetPosition {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标（高度） */
  z: number;
  /** Z轴旋转角度 */
  rotation: number;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** 宿主对象（墙面或其他面） */
  host: HSCore.Model.Wall | HSCore.Model.Face;
  /** 目标面信息 */
  targetFaceInfo?: TargetFaceInfo;
}

/**
 * 吸附信息
 * 描述单元与其他实体的吸附关系
 */
export interface SnappedInfo {
  /** 吸附的实体ID */
  entityId: string;
  /** 吸附平面类型（left: 左侧, right: 右侧） */
  snapPlaneType: 'left' | 'right';
}

/**
 * 自定义模型路径数据
 * 用于碰撞检测和布尔运算
 */
export interface CustomizedModelPath {
  /** 路径点集合 */
  paths: Array<Array<{ x: number; y: number }>>;
}

/**
 * 移动命令选项
 */
export interface MoveCommandOption {
  /** 是否移动成员对象 */
  moveMembers?: boolean;
  /** 保存的状态数据 */
  saved?: unknown[];
}

/**
 * 保存的恢复数据
 * 用于撤销/重做操作
 */
export interface SavedRestoreData {
  /** 目标面信息 */
  targetFaceInfo?: TargetFaceInfo;
}

/**
 * 移动非标准参数化背景墙单元命令
 * 
 * 该命令用于在3D视图中移动自定义背景墙单元，支持：
 * - 墙面吸附和高亮显示
 * - 与其他定制模型的碰撞检测
 * - 尺寸限制提示
 * - 撤销/重做功能
 * 
 * @extends {BaseCommand}
 */
export declare class CmdMoveNCPBackgroundWallUnit extends BaseCommand {
  /** 命令管理器 */
  mgr: unknown;
  
  /** 最后吸附的墙面3D对象列表 */
  lastSnapFaceT3ds: Array<unknown>;
  
  /** 当前内容对象 */
  content: HSCore.Model.BackgroundWallUnit;
  
  /** 应用程序实例 */
  _app: HSApp.Application;
  
  /** 吸附的实体 */
  snappedEntity: HSCore.Model.Face | null;
  
  /** 目标位置信息 */
  _targetPosition: MoveTargetPosition;
  
  /** 保存的状态数据 */
  saved: SavedRestoreData;
  
  /** 命令选项 */
  _option?: MoveCommandOption;
  
  /** 事务请求对象 */
  _request: unknown;
  
  /** 事务会话 */
  _session: unknown;
  
  /** 事务管理器上下文 */
  context: { transManager: unknown };

  /**
   * 移动处理函数
   * 在鼠标移动时更新墙面高亮和吸附状态
   * 
   * @param eventType - 事件类型
   * @param eventData - 事件数据
   */
  move(eventType: unknown, eventData: unknown): void;

  /**
   * 处理移动完成
   * 创建移动请求并提交事务
   * 
   * @param targetFaceInfo - 目标面信息
   * @param isInvalid - 移动是否无效
   */
  handleComplete(targetFaceInfo: TargetFaceInfo | undefined, isInvalid: boolean): void;

  /**
   * 角度转换
   * 将角度规范化到 [-180, 180] 范围
   * 
   * @param angle - 输入角度（度）
   * @returns 规范化后的角度
   */
  convertAngle(angle: number): number;

  /**
   * 获取宿主对象
   * 根据吸附信息确定单元的宿主墙面或面
   * 
   * @param snapInfo - 吸附信息
   * @returns 宿主对象
   */
  protected _getHost(snapInfo: unknown): HSCore.Model.Wall | HSCore.Model.Face | undefined;

  /**
   * 终止命令
   * 根据事件类型决定提交或取消移动操作
   * 
   * @param eventType - 事件类型（mouseup, click等）
   * @param eventData - 事件数据
   * @returns 是否继续执行命令
   */
  protected _terminateCmd(eventType: string, eventData: unknown): boolean | void;

  /**
   * 保存恢复数据
   * 用于撤销/重做功能
   */
  protected _saveRestoreData(): void;

  /**
   * 显示尺寸限制提示
   * 当单元尺寸超出目标面范围时显示警告
   * 
   * @param targetFaceInfo - 目标面信息
   */
  showLimitTip(targetFaceInfo: TargetFaceInfo | undefined): void;

  /**
   * 清除墙面高亮
   * 移除所有墙面的轮廓高亮显示
   */
  clearWallHighLight(): void;

  /**
   * 清理命令资源
   * 在命令结束时调用
   */
  onCleanup(): void;

  /**
   * 获取目标面信息
   * 根据吸附状态和同线墙面计算最终的目标面边界
   * 
   * @returns 目标面信息
   */
  getTargetFaceInfo(): TargetFaceInfo;

  /**
   * 通过定制模型裁剪外边界
   * 对目标面边界进行布尔差集运算，排除已有的定制模型区域
   * 
   * @param loop - 原始边界环
   * @param face - 目标墙面
   * @param matrix - 转换矩阵
   * @param zOffset - Z轴偏移
   * @returns 裁剪后的边界点集
   */
  getClipOuterByCustomizedModels(
    loop: Loop,
    face: HSCore.Model.Face,
    matrix: Matrix4,
    zOffset: number
  ): Array<{ x: number; y: number; z: number }> | undefined;

  /**
   * 获取实体拟合中心位置
   * 计算单元在全局坐标系中的中心点
   * 
   * @returns 中心点坐标
   */
  protected _getEntityFitCenterPos(): Vector3;

  /**
   * 根据吸附信息获取目标面信息
   * 处理左右吸附的边界计算
   * 
   * @param content - 背景墙单元内容
   * @returns 目标面信息
   */
  getTargetFaceInfoBySnapped(content: HSCore.Model.BackgroundWallUnit): TargetFaceInfo;

  /**
   * 获取墙面上的定制模型路径
   * 收集墙面上所有定制模型的2D路径用于碰撞检测
   * 
   * @param face - 墙面对象
   * @param faceType - 墙面类型
   * @returns 定制模型路径数组
   */
  getCustomizedModelsPathOnWallFace(
    face: HSCore.Model.Face,
    faceType: string
  ): Array<Array<{ x: number; y: number }>>;

  /**
   * 获取定制参数化模型数据
   * 从同线墙面提取所有参数化模型的路径信息
   * 
   * @param face - 墙面对象
   * @returns 定制模型路径数组
   */
  getCustomizedPMData(face: HSCore.Model.Face): Array<Array<{ x: number; y: number }>>;

  /**
   * 裁剪路径
   * 对路径执行与目标面的交集运算
   * 
   * @param paths - 输入路径集合
   * @param outerBoundary - 外边界
   * @returns 裁剪后的路径集合
   */
  getClipPaths(
    paths: Array<Array<Vector3>>,
    outerBoundary: Array<{ x: number; y: number }>
  ): Array<Array<Vector3>>;

  /**
   * 获取命令类别
   * 用于日志分类
   * 
   * @returns 日志分组类型
   */
  getCategory(): HSFPConstants.LogGroupTypes;

  /**
   * 获取命令描述
   * 用于调试和日志记录
   * 
   * @returns 命令描述文本
   */
  getDescription(): string;

  /**
   * 检查内容是否已移动
   * @returns 是否发生了移动
   */
  protected isContentMoved(): boolean;

  /**
   * 检查移动是否无效
   * @param eventData - 事件数据
   * @returns 是否无效
   */
  protected _checkMoveInValid(eventData: unknown): boolean;

  /**
   * 清理移动内容的操作器
   */
  protected _cleanMoveContentGizmo(): void;
}

/**
 * 模块导出别名 D
 * 保持与原始模块的兼容性
 */
export { CmdMoveNCPBackgroundWallUnit as D };