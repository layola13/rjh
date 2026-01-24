/**
 * 移动参数化背景墙请求类
 * 用于处理参数化背景墙的移动、定位和自适应逻辑
 */

import type { BaseRequest } from './BaseRequest';

/**
 * 目标面信息接口
 * 描述背景墙需要附着的目标面的几何信息
 */
export interface TargetFaceInfo {
  /** 外轮廓点集 */
  outer?: Array<{ x: number; y: number; z?: number }>;
  
  /** 孔洞轮廓集合 */
  holes?: Array<Array<{ x: number; y: number; z?: number }>>;
  
  /** 目标面ID */
  targetFaceId?: string;
  
  /** 新的外轮廓（自适应后） */
  newOuter?: Array<{ x: number; y: number; z?: number }>;
  
  /** 面的深度/厚度参数 */
  D?: number;
}

/**
 * 背景墙内容对象接口
 */
export interface BackgroundWallContent {
  /** X坐标 */
  x: number;
  
  /** Y坐标 */
  y: number;
  
  /** Z坐标 */
  z: number;
  
  /** 旋转角度 */
  rotation: number;
  
  /** X轴旋转 */
  XRotation: number;
  
  /** Y轴旋转 */
  YRotation: number;
  
  /** 是否可缩放 */
  isScalable: boolean;
  
  /** 参数配置 */
  parameters: {
    /** 是否自动适应 */
    isAutoFit: boolean;
    
    /** 目标面信息 */
    targetFaceInfo?: TargetFaceInfo;
  };
  
  /**
   * 初始化背景墙到目标面
   * @param faceInfo - 目标面信息
   */
  initBackgroundWall(faceInfo?: TargetFaceInfo): void;
  
  /**
   * 检查尺寸是否在目标面范围内
   * @param faceInfo - 目标面信息
   * @returns 是否在范围内
   */
  isSizeInRangeByTargetFaceInfo(faceInfo: TargetFaceInfo): boolean;
  
  /**
   * 标记裁剪几何需要更新
   */
  dirtyClipGeometry(): void;
  
  /**
   * 标记面材质需要更新
   */
  dirtyFaceMaterials(): void;
  
  /**
   * 标记子模型需要更新
   * @param param1 - 更新参数1
   * @param param2 - 更新参数2
   * @param param3 - 更新参数3
   */
  dirtyChildModels(param1: boolean, param2: boolean, param3: boolean): void;
  
  /**
   * 获取宿主对象
   */
  getHost(): unknown;
  
  /**
   * 获取唯一父对象
   */
  getUniqueParent(): unknown;
}

/**
 * 请求的上一状态快照
 */
export interface PreviousState {
  x: number;
  y: number;
  z: number;
  rotation: number;
  XRotation: number;
  YRotation: number;
  host: unknown;
  parent: unknown;
  isAutoFit: boolean;
  isScalable: boolean;
  targetFaceInfo?: TargetFaceInfo;
}

/**
 * 下一状态配置
 */
export interface NextState {
  /** 目标面信息 */
  targetFaceInfo?: TargetFaceInfo;
  
  /** 是否自动适应 */
  isAutoFit: boolean;
  
  /** 是否可缩放 */
  isScalable: boolean;
}

/**
 * 移动参数化背景墙请求类
 * 继承自基础请求类，实现参数化背景墙的移动和适配逻辑
 */
export declare class MoveParamrtricBackgroundWallRequest extends BaseRequest {
  /**
   * 背景墙内容对象
   */
  protected _content: BackgroundWallContent;
  
  /**
   * 目标面信息
   */
  protected _targetFaceInfo?: TargetFaceInfo;
  
  /**
   * 是否保持自动适应
   */
  protected _keepAutoFit: boolean;
  
  /**
   * 上一状态快照
   */
  protected _previous?: PreviousState;
  
  /**
   * 下一状态配置
   */
  protected _next?: NextState;
  
  /**
   * 是否可以执行自动适应
   */
  protected _canDoAutoFit: boolean;
  
  /**
   * 构造函数
   * @param content - 背景墙内容对象
   * @param param2 - 第二个参数（具体类型未知）
   * @param param3 - 第三个参数（具体类型未知）
   * @param param4 - 第四个参数，默认false
   * @param param5 - 第五个参数，默认true
   * @param targetFaceInfo - 目标面信息
   * @param keepAutoFit - 是否保持自动适应，默认false
   */
  constructor(
    content: BackgroundWallContent,
    param2: unknown,
    param3: unknown,
    param4?: boolean,
    param5?: boolean,
    targetFaceInfo?: TargetFaceInfo,
    keepAutoFit?: boolean
  );
  
  /**
   * 自定义移动逻辑
   * 处理背景墙的移动、自适应和尺寸限制检查
   * @param isRedo - 是否为重做操作，默认false
   */
  customizedMove(isRedo?: boolean): void;
  
  /**
   * 保存恢复数据
   * 将当前状态保存到_previous用于撤销操作
   */
  protected _saveRestoreData(): void;
  
  /**
   * 获取日志分类
   * @returns 日志分组类型
   */
  getCategory(): string;
  
  /**
   * 获取操作描述
   * @returns 操作描述文本
   */
  getDescription(): string;
}