/**
 * Gizmo Plugin - 处理测量、标注和控制手柄的插件模块
 * @module GizmoPlugin
 */

import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * 命令处理器接口
 */
interface IGizmoHandler {
  /**
   * 初始化处理器
   * @param arg1 - 初始化参数1
   * @param arg2 - 初始化参数2
   */
  init(arg1: unknown, arg2: unknown): void;

  /**
   * 反初始化处理器
   */
  uninit(): void;

  /**
   * 初始化SVG视图
   * @param factory - Gizmo工厂实例
   */
  _initSVGView(factory: unknown): void;

  /**
   * 启用SVG Gizmo控件
   */
  enableSVGGizmo(): void;

  /**
   * 禁用SVG Gizmo控件
   */
  disableSVGGizmo(): void;
}

/**
 * 插件配置选项
 */
interface IPluginOptions {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 依赖的其他插件 */
  dependencies: string[];
}

/**
 * 2D标注类型
 */
type LinearDimension2D = HSApp.View.SVG.LinearDimension;

/**
 * 3D线性标注类型
 */
type LinearDimension3D = HSApp.View.T3d.LinearDimension;

/**
 * 点标记器类型
 */
interface IPointMarker {
  new (
    arg1: unknown,
    arg2: unknown,
    arg3: unknown,
    arg4: unknown
  ): unknown;
}

/**
 * 切割造型标注类型
 */
interface ICutMoldingDimension {
  new (
    arg1: unknown,
    arg2: unknown,
    arg3: unknown,
    arg4: unknown
  ): unknown;
}

/**
 * 三维测量坐标轴类型
 */
interface IThreedMeasureAxis {
  new (arg1: unknown, arg2: unknown, arg3: unknown): unknown;
}

/**
 * Gizmo插件 - 负责处理场景中的测量、标注和交互控制手柄
 * @extends HSApp.Plugin.IPlugin
 */
declare class GizmoPlugin extends HSApp.Plugin.IPlugin {
  /** 内部命令处理器 */
  private _handler: IGizmoHandler;

  /** 应用实例引用 */
  private _app: HSApp.App;

  /**
   * 构造函数
   */
  constructor();

  /**
   * 插件激活时的回调
   * @param arg1 - 激活参数1
   * @param arg2 - 激活参数2
   */
  onActive(arg1: unknown, arg2: unknown): void;

  /**
   * 插件停用时的回调
   */
  onDeactive(): void;

  /**
   * 注册命令到命令管理器
   * @param cmdManager - 命令管理器实例
   */
  private _registerCommands(cmdManager: HSApp.CommandManager): void;

  /**
   * 注册请求到事务管理器
   * @param transManager - 事务管理器实例
   */
  private _registerRequests(transManager: HSApp.TransactionManager): void;

  /**
   * 创建2D线性标注
   * @param arg1 - 起点或配置参数
   * @param arg2 - 终点或样式参数
   * @param arg3 - 标注文本或偏移量
   * @param arg4 - 其他选项
   * @returns 2D标注实例
   */
  create2DDimension(
    arg1: unknown,
    arg2: unknown,
    arg3: unknown,
    arg4: unknown
  ): LinearDimension2D;

  /**
   * 判断输入是否为标注输入
   * @param input - 待检测的输入对象
   * @returns 是否为标注输入
   */
  isDimensionInput(input: unknown): boolean;

  /**
   * 创建点标记器
   * @param arg1 - 位置参数
   * @param arg2 - 样式参数
   * @param arg3 - 标记类型
   * @param arg4 - 其他选项
   * @returns 点标记器实例
   */
  createPointMarker(
    arg1: unknown,
    arg2: unknown,
    arg3: unknown,
    arg4: unknown
  ): unknown;

  /**
   * 创建3D线性标注
   * @param arg1 - 起点坐标
   * @param arg2 - 终点坐标
   * @param arg3 - 标注方向
   * @param arg4 - 标注偏移
   * @param arg5 - 文本内容
   * @param arg6 - 文本样式
   * @param arg7 - 箭头样式
   * @param arg8 - 其他选项
   * @returns 3D标注实例
   */
  createLinearDimension(
    arg1: unknown,
    arg2: unknown,
    arg3: unknown,
    arg4: unknown,
    arg5: unknown,
    arg6: unknown,
    arg7: unknown,
    arg8: unknown
  ): LinearDimension3D;

  /**
   * 创建坐标轴辅助对象
   * @param arg1 - 原点坐标
   * @param arg2 - 轴长度或缩放
   * @param arg3 - 显示选项
   * @returns 坐标轴实例
   */
  createCoordAix(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

  /**
   * 注册Gizmo工厂
   * @param factory - Gizmo工厂实例
   */
  registerGizmoFactory(factory: unknown): void;

  /**
   * 启用SVG Gizmo控件
   */
  enableSVGGizmo(): void;

  /**
   * 禁用SVG Gizmo控件
   */
  disableSVGGizmo(): void;

  /**
   * 获取切割造型标注Gizmo
   * @param arg1 - 造型对象
   * @param arg2 - 切割参数
   * @param arg3 - 标注配置
   * @param arg4 - 其他选项
   * @returns 切割造型标注实例
   */
  getCutMoldingDimensionGizmo(
    arg1: unknown,
    arg2: unknown,
    arg3: unknown,
    arg4: unknown
  ): unknown;
}

/**
 * 插件注册声明
 * 将GizmoPlugin注册到插件系统中
 */
declare module './HSApp' {
  namespace HSApp.Plugin {
    /**
     * 注册插件到插件管理器
     * @param pluginType - 插件类型（来自HSFPConstants.PluginType）
     * @param pluginClass - 插件类构造函数
     */
    function registerPlugin(
      pluginType: HSFPConstants.PluginType,
      pluginClass: typeof GizmoPlugin
    ): void;
  }
}

export { GizmoPlugin };
export default GizmoPlugin;