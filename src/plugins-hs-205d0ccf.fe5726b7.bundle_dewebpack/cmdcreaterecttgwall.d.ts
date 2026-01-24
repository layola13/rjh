/**
 * 矩形墙体创建命令类型定义
 * @module CmdCreateRectTgWall
 */

import { Command } from 'HSApp/Cmd/Command';
import { Vector2 } from 'HSMath/Vector2';
import { Gizmo } from 'HSApp/View/Gizmo';
import { Dimension } from 'HSApp/View/Dimension';
import { SnapHelper } from 'HSApp/Helpers/SnapHelper';
import { EndPointItem, EndPointType } from 'HSApp/View/EndPointItem';
import { WallMode } from 'HSCore/Model/WallMode';
import { KeyCodes } from 'HSApp/Util/Keyboard';
import { Curve } from 'HSMath/Curve';

/**
 * 墙体设置配置接口
 */
interface WallSettings {
  /** 墙体宽度 */
  wallWidth: number;
  /** 墙体是否承重 */
  wallIsBearing: boolean;
  /** 墙体绘制模式（内侧/中线/外侧） */
  wallMode: WallMode;
  /** 保存设置 */
  save(): void;
}

/**
 * 点位数据接口
 */
interface PointData {
  /** 起始点 */
  start: Vector2;
  /** 结束点 */
  end: Vector2;
}

/**
 * 设置更新参数接口
 */
interface SettingUpdateParams {
  /** 墙体宽度 */
  wallWidth?: number;
  /** 墙体是否承重 */
  wallIsBearing?: boolean;
  /** 墙体绘制模式 */
  wallMode?: WallMode;
}

/**
 * 尺寸变化事件数据接口
 */
interface DimensionChangeEventData {
  data: {
    /** 新的点位坐标 */
    point?: Vector2;
    /** 触发的按键码 */
    keyCode?: number;
    /** 是否来自捕捉 */
    fromSnap?: boolean;
  };
}

/**
 * 全局设置变化事件数据接口
 */
interface GlobalUpdateEventData {
  data?: {
    /** 变化的字段名 */
    fieldName?: string;
  };
}

/**
 * 鼠标事件接口
 */
interface MouseEventData {
  /** 鼠标按键（0:左键 1:中键 2:右键） */
  button: number;
  /** 是否按下Ctrl键 */
  ctrlKey: boolean;
  /** 客户端X坐标 */
  clientX: number;
  /** 客户端Y坐标 */
  clientY: number;
  /** 事件类型 */
  type: string;
}

/**
 * 命令接收参数接口
 */
interface CommandReceiveParams {
  /** 触发的事件 */
  event: MouseEventData;
  /** 按键码 */
  keyCode?: number;
}

/**
 * 日志参数接口
 */
interface LogParams {
  /** 激活的操作分类 */
  activeSection: string;
  /** 激活分类的显示名称 */
  activeSectionName: string;
  /** 点击统计信息 */
  clicksRatio: {
    /** 操作ID */
    id: string;
    /** 操作名称 */
    name: string;
  };
}

/**
 * 矩形墙体创建命令
 * 用于在2D视图中交互式创建矩形房间墙体
 * @extends Command
 */
export declare class CmdCreateRectTgWall extends Command {
  /** 墙体创建辅助图形控件 */
  private _gizmo?: Gizmo;
  
  /** 捕捉辅助工具 */
  private _snapHelper?: SnapHelper;
  
  /** 当前鼠标位置 */
  private _pos?: Vector2;
  
  /** 矩形起始点 */
  private _start?: Vector2;
  
  /** 矩形结束点 */
  private _end?: Vector2;
  
  /** 当前位置显示项 */
  private _posItem?: EndPointItem;
  
  /** 起始点显示项 */
  private _startItem?: EndPointItem;
  
  /** 无操作状态显示项 */
  private _noActionItem?: EndPointItem;
  
  /** 当前激活的尺寸标注 */
  private _activeDimension?: Dimension;

  /**
   * 获取当前操作步骤
   * @returns 0表示未开始，1表示已设置起点
   */
  get step(): number;

  /**
   * 获取墙体类型
   * @returns 墙体类型（直线墙）
   */
  get wallType(): number;

  /**
   * 获取墙体设置
   * @returns 当前墙体配置
   */
  get setting(): WallSettings;

  /**
   * 获取2D画布视图
   * @returns 当前激活的2D视图
   */
  get canvas(): any;

  /**
   * 获取所有尺寸标注
   * @returns 包含辅助图形和捕捉辅助的所有尺寸标注
   */
  get dimensions(): Dimension[];

  /**
   * 命令执行入口
   * 初始化辅助工具、监听器和显示项
   */
  onExecute(): void;

  /**
   * 接收用户交互事件
   * @param eventType - 事件类型（mousedown/mousemove/click/keydown等）
   * @param params - 事件参数
   * @returns 是否阻止事件继续传播
   */
  onReceive(eventType: string, params: CommandReceiveParams): boolean;

  /**
   * 处理鼠标移动事件
   * @param event - 鼠标事件数据
   */
  onMouseMove(event: MouseEventData): void;

  /**
   * 处理鼠标点击事件
   * @param event - 鼠标事件数据
   */
  onClick(event: MouseEventData): void;

  /**
   * 命令清理回调
   * 移除监听器、清理辅助工具和显示项
   */
  onCleanup(): void;

  /**
   * 处理键盘按下事件
   * @param keyCode - 按键码
   * - SPACE: 切换墙体绘制模式（内侧/中线/外侧）
   * - DELETE: 重置当前绘制状态
   */
  onKeyDown(keyCode: number): void;

  /**
   * 更新墙体设置
   * @param params - 需要更新的设置参数
   */
  updateSetting(params?: SettingUpdateParams): void;

  /**
   * 获取命令描述
   * @returns 命令的用户可读描述
   */
  getDescription(): string;

  /**
   * 判断命令是否可交互
   * @returns 总是返回true
   */
  isInteractive(): boolean;

  /**
   * 获取命令所属分类
   * @returns 日志分组类型（墙体操作）
   */
  getCategory(): string;

  /**
   * 获取当前命令参数（用于日志统计）
   * @returns 包含操作分类和点击统计的日志参数
   */
  getCurrentParams(): LogParams;

  /**
   * 设置当前鼠标位置
   * @param position - 新的位置坐标
   * @param type - 端点类型（激活/捕捉/静态）
   * @param event - 可选的鼠标事件（用于显示提示）
   * @private
   */
  private _setPos(position: Vector2, type: EndPointType, event?: MouseEventData): void;

  /**
   * 设置矩形起始点
   * @param position - 起始点坐标，传入undefined清除起点
   * @private
   */
  private _setStart(position?: Vector2): void;

  /**
   * 设置矩形结束点
   * @param position - 结束点坐标，传入undefined清除终点
   * @private
   */
  private _setEnd(position?: Vector2): void;

  /**
   * 回退到上一步操作
   * @private
   */
  private _back(): void;

  /**
   * 进入下一步操作
   * @param position - 新设置的点位
   * @private
   */
  private _next(position: Vector2): void;

  /**
   * 完成矩形墙体创建
   * @param endPosition - 矩形结束点坐标
   * @private
   */
  private _finish(endPosition: Vector2): void;

  /**
   * 重置所有绘制状态
   * @private
   */
  private _reset(): void;

  /**
   * 聚焦指定的尺寸标注
   * @param dimension - 需要激活的尺寸标注
   * @private
   */
  private _focusDimension(dimension?: Dimension): void;

  /**
   * 提交墙体创建事务
   * @param curves - 墙体的曲线路径数组
   * @private
   */
  private _commit(curves: Curve[]): void;

  /**
   * 将屏幕坐标转换为模型坐标
   * @param event - 鼠标事件数据
   * @returns 模型空间中的点坐标
   * @private
   */
  private _getModelPoint(event: MouseEventData): Vector2;

  /**
   * 刷新捕捉辅助工具的参考数据
   * @private
   */
  private _refreshSnapHelper(): void;

  /**
   * 显示其他UI元素（墙体尺寸标注、顶点等）
   * @private
   */
  private _showOthers(): void;

  /**
   * 隐藏其他UI元素（墙体尺寸标注、顶点等）
   * @private
   */
  private _hideOthers(): void;

  /**
   * 获取当前点位数据
   * @returns 起点和终点的数据对象，未设置则返回undefined
   * @private
   */
  private _getPointData(): PointData | undefined;

  /**
   * 全局设置变化监听器
   * @param event - 全局设置变化事件数据
   * @private
   */
  private _updateByGlobal(event: GlobalUpdateEventData): void;

  /**
   * 尺寸标注变化监听器
   * @param event - 尺寸变化事件数据
   * @private
   */
  private _onDimensionChange(event: DimensionChangeEventData): void;

  /**
   * 视图范围变化监听器
   * @private
   */
  private _onViewBoxChanged(): void;
}