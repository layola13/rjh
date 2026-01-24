/**
 * 编辑参数化背景墙自动适配状态的请求类
 * 
 * @description 该类用于处理参数化背景墙的自动适配功能的开启/关闭操作，
 * 继承自 HSCore.Transaction.Common.StateRequest 基类，实现了完整的事务处理机制
 * 
 * @module EditParametricBackgroundWallIsAutoFitRequest
 * @since 1.0.0
 */

/**
 * 目标面信息接口
 * 用于描述背景墙的目标安装面的几何信息
 */
interface TargetFaceInfo {
  /** 外边界点数组，用于定义面的轮廓 */
  outer?: Array<unknown>;
  /** 新的外边界点数组，可选的更新值 */
  newOuter?: Array<unknown>;
}

/**
 * 参数化背景墙的参数接口
 * 包含背景墙实体的所有可配置参数
 */
interface BackgroundWallParameters {
  /** 是否启用自动适配模式 */
  isAutoFit: boolean;
  /** 目标安装面的几何信息 */
  targetFaceInfo?: TargetFaceInfo;
}

/**
 * 参数化背景墙实体接口
 * 代表场景中的一个背景墙对象
 */
interface ParametricBackgroundWallEntity {
  /** 背景墙的配置参数 */
  parameters: BackgroundWallParameters;
  /** 是否允许缩放操作 */
  isScalable: boolean;
  
  /**
   * 根据目标面信息初始化背景墙
   * @param targetFaceInfo - 目标面的几何信息
   */
  initBackgroundWall(targetFaceInfo: TargetFaceInfo): void;
  
  /**
   * 根据尺寸初始化背景墙（非自动适配模式）
   */
  initBySize(): void;
}

/**
 * 编辑参数化背景墙自动适配状态请求类
 * 
 * @class EditParametricBackgroundWallIsAutoFitRequest
 * @extends {HSCore.Transaction.Common.StateRequest}
 * 
 * @description 
 * 该类负责管理参数化背景墙的自动适配状态切换，支持完整的事务操作：
 * - 提交(onCommit)：应用自动适配状态变更
 * - 撤销(onUndo)：回退到之前的状态
 * - 重做(onRedo)：重新应用变更
 * 
 * @example
 *