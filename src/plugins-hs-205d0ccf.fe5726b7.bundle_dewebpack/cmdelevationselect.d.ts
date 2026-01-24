import { Line2d, Vector2 } from '815362';
import { HSCore } from '635589';
import { HSApp } from '518193';
import { Triangle } from '193301';

/**
 * 立面图选择命令
 * 用于在2D视图中检测并选择墙面，切换到对应的立面视图
 */
export declare class CmdElevationSelect extends HSApp.Cmd.Command {
  /**
   * 墙面选择确认回调函数
   */
  private _selectFaceConfirmCb?: (face: HSCore.Model.WallFace) => void;

  /**
   * 墙面信息映射表，存储墙面与其几何信息的关系
   */
  private _wallFaceInfo: Map<HSCore.Model.WallFace, WallFaceInfo>;

  /**
   * 当前检测到的最近墙面信息
   */
  private _detectedInfo?: DetectedFaceInfo;

  /**
   * 应用程序实例
   */
  private _app: HSApp.Application;

  /**
   * 鼠标检测的阈值距离（模型单位）
   */
  private _thresholdNum: number;

  /**
   * 三角形指示器 Gizmo
   */
  private _gizmo?: Triangle;

  /**
   * 构造函数
   * @param selectFaceConfirmCb - 墙面选择确认时的回调函数
   */
  constructor(selectFaceConfirmCb?: (face: HSCore.Model.WallFace) => void);

  /**
   * 执行命令，初始化墙面信息并记录用户行为
   */
  onExecute(): void;

  /**
   * 处理鼠标事件
   * @param eventType - 鼠标事件类型
   * @param eventData - 事件数据
   * @returns 是否继续处理事件
   */
  onReceive(eventType: HSDevice.MouseEvents, eventData: MouseEventData): boolean;

  /**
   * 清理命令资源
   */
  onCleanup(): void;

  /**
   * 检测鼠标位置最近的墙面
   * @param eventData - 鼠标事件数据
   * @returns 是否检测到有效墙面
   */
  private _detectClosetFace(eventData: MouseEventData): boolean;

  /**
   * 创建三角形指示器 Gizmo
   * @param position - Gizmo 位置
   * @param rotation - Gizmo 旋转角度（弧度）
   */
  private _createGizmo(position: Vector2, rotation: number): void;

  /**
   * 销毁三角形指示器 Gizmo
   */
  private _destroyGizmo(): void;

  /**
   * 获取命令描述
   * @returns 命令描述字符串
   */
  getDescription(): string;

  /**
   * 判断命令是否为交互式命令
   * @returns 总是返回 true
   */
  isInteractive(): boolean;

  /**
   * 获取命令分类
   * @returns 视图操作分类标识
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

/**
 * 墙面几何信息接口
 */
interface WallFaceInfo {
  /**
   * 关联的墙体实体
   */
  wall: HSCore.Model.Wall;

  /**
   * 墙面的2D线段表示
   */
  seg: Line2d;

  /**
   * 是否为墙体左侧面
   */
  isLeft: boolean;
}

/**
 * 检测到的墙面信息接口
 */
interface DetectedFaceInfo extends WallFaceInfo {
  /**
   * 鼠标到墙面的距离
   */
  distance: number;

  /**
   * 墙面实体
   */
  face: HSCore.Model.WallFace;
}

/**
 * 鼠标事件数据接口
 */
interface MouseEventData {
  /**
   * 鼠标位置
   */
  position: { x: number; y: number };

  /**
   * 原始DOM事件
   */
  event: {
    /**
     * 鼠标移出时的目标元素
     */
    toElement?: HTMLElement;
  };
}