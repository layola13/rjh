import { Matrix4, Vector3, Plane } from '@/geometry';
import { HSCore } from '@/core';
import { HSApp } from '@/app';
import { CmdMoveInHardDecoration } from '@/commands/CmdMoveInHardDecoration';

/**
 * 在墙面装饰环境中移动非标定制背景墙的命令
 * 
 * 该命令处理非标定制参数化背景墙(NCP Background Wall)在墙面装饰编辑器(WFA)中的移动操作，
 * 包括拖拽、吸附、高亮显示等交互逻辑。
 * 
 * @extends CmdMoveInHardDecoration
 */
export declare class CmdMoveNCPBgWallInWFA extends CmdMoveInHardDecoration {
  /**
   * 用于高亮显示的SVG路径对象
   * @private
   */
  private _highlightPath?: SVGPathElement;

  /**
   * 当前高亮的非标定制背景墙ID
   * @private
   */
  private _highLightNCustomizedBackgroundId?: string;

  /**
   * 构造函数
   * @param app - 应用程序实例
   * @param options - 命令选项配置
   */
  constructor(app: HSApp.App, options?: CommandOptions);

  /**
   * 命令执行完成时的回调
   * 清除内容的拖拽标志状态
   */
  onComplete(): void;

  /**
   * 命令取消时的回调
   * 清除拖拽状态并触发完成逻辑
   */
  onCancel(): void;

  /**
   * 移动前的预处理
   * 
   * - 设置内容的拖拽标志
   * - 高亮智能定制背景墙
   * - 在2D编辑模式下转换坐标系
   * 
   * @param event - 移动事件数据
   * @private
   */
  private _preMoving(event: MoveEvent): void;

  /**
   * 移动过程中的后处理
   * 
   * - 显示吸附提示视图
   * - 更改光标状态
   * 
   * @param event - 移动事件数据
   * @private
   */
  private _postMoving(event: MoveEvent): void;

  /**
   * 移动结束时的处理
   * 清除拖拽标志状态
   * 
   * @param event - 移动事件数据
   * @private
   */
  private _movingEnd(event: MoveEvent): void;

  /**
   * 获取内容的宿主实体
   * 
   * @param event - 移动事件数据
   * @returns 宿主实体（通常是墙面Face）
   * @private
   */
  private _getHost(event: MoveEvent): HSCore.Model.Face | HSCore.Model.Entity;

  /**
   * 设置NCP（非标定制参数化）内容的标志位
   * 
   * @param flag - 结构标志枚举值
   * @param isOn - 是否开启标志
   * @private
   */
  private _setNCPContentFlag(
    flag: HSCore.Model.StructureFlagEnum,
    isOn: boolean
  ): void;

  /**
   * 判断是否可以执行吸附操作
   * 
   * 根据以下条件判断：
   * - 移动方式（contentmovement/contentlift时禁用）
   * - 是否在2D背景墙编辑环境
   * - 宿主面是否在可添加特征模型的范围内
   * 
   * @returns 是否可以执行吸附
   * @private
   */
  private _isCanDoSnapping(): boolean;

  /**
   * 高亮显示关联的背景墙
   * 
   * 在2D和3D视图中同时高亮显示内容所在的背景墙区域：
   * - 2D视图：绘制SVG高亮路径
   * - 3D视图：高亮对应的网格模型
   * 
   * @private
   */
  private _highLightBackground(): void;

  /**
   * 清除背景墙的高亮显示
   * 隐藏SVG路径并移除3D网格高亮
   * 
   * @private
   */
  private _clearBackgroundwallHighLight(): void;

  /**
   * 获取吸附策略配置
   * 
   * 根据内容类型和视图模式（2D/3D）返回相应的吸附策略：
   * - CustomizedFeaturewall：墙体吸附
   * - CustomizedPersonalizedModel：个性化模型吸附
   * 
   * @returns 吸附策略配置对象
   * @private
   */
  private _getSnappingStrategies(): SnappingStrategyConfig;
}

/**
 * 命令选项配置接口
 */
interface CommandOptions {
  /** 移动方式："contentmovement" | "contentlift" | 其他 */
  moveby?: string;
  [key: string]: unknown;
}

/**
 * 移动事件数据接口
 */
interface MoveEvent {
  /** 位置坐标 [x, y, z] */
  position?: [number, number, number];
  /** 偏移量 */
  offset?: [number, number, number];
  /** 宿主实体 */
  host?: HSCore.Model.Face | HSCore.Model.Entity;
  [key: string]: unknown;
}

/**
 * 吸附策略配置接口
 */
interface SnappingStrategyConfig {
  /** 策略类数组 */
  strategies: Array<typeof HSApp.Snapping.SnapToWall2D | typeof HSApp.Snapping.SnapToWall3D>;
  /** 策略选项映射 */
  option: {
    [strategyClassName: string]: {
      /** 验证回调函数，判断目标面是否有效 */
      vialidatorCallback: (face: HSCore.Model.Face) => boolean;
    };
  };
}