import { Vector3 } from './Vector3';
import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { OptionTypeEnum } from './OptionTypeEnum';

/**
 * 保存的原始数据结构
 */
interface SavedContentData {
  /** 内容对象 */
  content: HardDecorationContent;
  /** 原始位置 */
  position: Vector3;
  /** 原始缩放 */
  scale: Vector3;
  /** 原始旋转 */
  rotation: Vector3;
  /** 原始变换矩阵 */
  transform: THREE.Matrix4;
}

/**
 * 旋转参数接口
 */
interface RotateParams {
  /** 旋转增量 */
  delta: number;
  /** 事件标题（可选） */
  title?: string;
  /** DOM事件对象（可选） */
  event?: MouseEvent;
}

/**
 * 角度吸附配置
 */
interface SnapConfig {
  /** 目标角度 */
  angle: number;
  /** 吸附偏移量 */
  offset: number;
}

/**
 * 滑块拖拽参数
 */
interface SliderDragParams {
  /** 当前值 */
  value: number;
}

/**
 * 变换数据
 */
interface TransformData {
  /** 内容对象 */
  content: HardDecorationContent;
  /** 旋转向量 */
  rotation: Vector3;
}

/**
 * 硬装内容对象接口
 */
interface HardDecorationContent {
  /** X坐标 */
  X: number;
  /** Y坐标 */
  Y: number;
  /** Z坐标 */
  Z: number;
  /** X轴缩放 */
  XScale: number;
  /** Y轴缩放 */
  YScale: number;
  /** Z轴缩放 */
  ZScale: number;
  /** X轴旋转 */
  XRotation: number;
  /** Y轴旋转 */
  YRotation: number;
  /** Z轴旋转 */
  ZRotation: number;
}

/**
 * 旋转请求接口
 */
interface RotateRequest {
  /** 接收旋转数据 */
  onReceive(type: OptionTypeEnum, data: { trans: TransformData[] }): void;
}

/**
 * 变换管理器接口
 */
interface TransformManager {
  /** 创建请求 */
  createRequest(type: string, data: SavedContentData[][]): RotateRequest;
  /** 提交请求 */
  commit(request: RotateRequest): void;
}

/**
 * 命令上下文接口
 */
interface CommandContext {
  /** 变换管理器 */
  transManager: TransformManager;
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  /** 完成命令 */
  complete(cmd: CmdRotateInHardDecoration): void;
}

/**
 * 硬装模型旋转命令
 * 用于在硬装模式下旋转一个或多个装饰内容对象
 */
export declare class CmdRotateInHardDecoration extends HSApp.Cmd.Command {
  /** 待旋转的内容对象列表 */
  private _contents: HardDecorationContent[];
  
  /** 保存的原始数据 */
  private _saved: SavedContentData[];
  
  /** 旋转请求对象 */
  private _rotateRequest?: RotateRequest;
  
  /** 上次目标角度 */
  private _lastTargetingAngle: number;
  
  /** 旋转轴方向向量 */
  private _axisDir: Vector3;
  
  /** 是否启用角度吸附 */
  private _snapEnabled: boolean;
  
  /** 迷你图像预览控制器 */
  private _miniImagePreviewCtrl?: MiniImagePreviewCtrl;
  
  /** 命令上下文 */
  context: CommandContext;
  
  /** 命令管理器 */
  mgr: CommandManager;

  /**
   * 创建硬装旋转命令
   * @param content - 单个或多个待旋转的内容对象
   * @param axisDir - 旋转轴方向向量
   * @param snapEnabled - 是否启用角度吸附，默认true
   */
  constructor(
    content: HardDecorationContent | HardDecorationContent[],
    axisDir: Vector3,
    snapEnabled?: boolean
  );

  /**
   * 保存所有内容对象的原始数据
   * @private
   */
  private _saveOriginalData(): void;

  /**
   * 命令执行时调用
   * @param params - 初始旋转参数（可选）
   */
  onExecute(params?: RotateParams): void;

  /**
   * 命令清理时调用
   */
  onCleanup(): void;

  /**
   * 创建移动请求
   * @private
   */
  private _createMoveRequest(): void;

  /**
   * 检查参数是否有效
   * @param params - 旋转参数
   * @returns 参数是否有效
   * @private
   */
  private _checkParamValid(params: RotateParams | SliderDragParams): boolean;

  /**
   * 旋转结束处理
   * @private
   */
  private _rotateEnd(): void;

  /**
   * 执行旋转操作
   * @param delta - 旋转增量（度）
   * @private
   */
  private _rotate(delta: number): void;

  /**
   * 旋转后处理
   * @param params - 旋转参数
   * @private
   */
  private _postRotate(params: RotateParams): void;

  /**
   * 接收外部消息
   * @param event - 事件类型
   * @param params - 事件参数
   * @returns 是否处理成功
   */
  onReceive(
    event: 'sliderdragend' | 'hotkeyend' | 'dragmove' | 'hotkey' | 'sliderdragmove' | 'dragend' | 'reset' | string,
    params?: RotateParams | SliderDragParams
  ): boolean;

  /**
   * 处理旋转请求
   * @private
   */
  private _dealRotateRequest(): void;

  /**
   * 是否支持图像预览
   * @returns 是否支持
   * @private
   */
  private _isSupportImagePreview(): boolean;

  /**
   * 渲染迷你图像预览
   * @param params - 旋转参数
   * @returns 是否渲染成功
   * @private
   */
  private _renderMiniImagePreview(params: RotateParams): boolean;

  /**
   * 销毁迷你图像预览
   * @private
   */
  private _destroyMiniImagePreview(): void;

  /**
   * 按指定轴和角度旋转
   * @param angle - 目标角度（度）
   * @private
   */
  private _rotateByAxisAndAngle(angle: number): void;

  /**
   * 获取旋转增量
   * @param axis - 旋转轴（'yz' | 'xz' | 'xy'）
   * @param content - 内容对象
   * @param targetAngle - 目标角度
   * @returns 旋转增量
   * @private
   */
  private _getRotateDelta(
    axis: string,
    content: HardDecorationContent,
    targetAngle: number
  ): number;

  /**
   * 围绕世界坐标系轴旋转
   * @param content - 内容对象
   * @param axis - 世界坐标系旋转轴
   * @param angle - 旋转角度（度）
   * @returns 新的旋转向量
   * @private
   */
  private _rotateAroundWorldAxis(
    content: HardDecorationContent,
    axis: THREE.Vector3,
    angle: number
  ): Vector3;

  /**
   * 获取命令描述
   * @returns 命令描述文本
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 命令分类类型
   */
  getCategory(): string;
}