/**
 * 墙体类型枚举
 */
export enum WallType {
  /** 直线墙 */
  Line = "Line",
  /** 三点圆弧墙 */
  ArcThree = "ArcThree",
  /** 高度圆弧墙 */
  ArcHeight = "ArcHeight"
}

/**
 * 墙体创建设置接口
 */
interface WallSettings {
  /** 墙体宽度 */
  wallWidth: number;
  /** 墙体模式（内侧/中间/外侧） */
  wallMode: WallMode;
  /** 是否承重墙 */
  wallIsBearing: boolean;
  /** 是否开启正交模式 */
  orthoModeOn: boolean;
  /** 是否使用弧墙高度模式 */
  wallArcHeight: boolean;
  /** 保存设置 */
  save(): void;
}

/**
 * 墙体模式枚举
 */
enum WallMode {
  Inner = "Inner",
  Middle = "Middle",
  Outer = "Outer"
}

/**
 * 端点类型枚举
 */
enum EndPointType {
  Active = "Active",
  Snap = "Snap",
  Static = "Static"
}

/**
 * 吸附类型枚举
 */
enum SnapType {
  FootPoint = "FootPoint"
}

/**
 * 吸附结果接口
 */
interface SnapResult {
  /** 偏移向量 */
  offset?: Vector2;
  /** 吸附类型 */
  type?: SnapType;
}

/**
 * 尺寸标注接口
 */
interface Dimension {
  /** 激活尺寸标注 */
  focus(): void;
  /** 失焦尺寸标注 */
  blur(): void;
  /** 是否支持激活 */
  supportActive(): boolean;
  /** 获取下一个尺寸标注 */
  static getNextDimension(dimensions: Dimension[], current?: Dimension): Dimension | undefined;
}

/**
 * 端点项配置接口
 */
interface EndPointItemData {
  /** 位置坐标 */
  position: Vector2;
  /** 是否悬停高亮 */
  hoverOn?: boolean;
  /** 端点类型 */
  type?: EndPointType;
}

/**
 * 端点项显示类
 */
declare class EndPointItem {
  constructor(context: any);
  type: EndPointType;
  updateData(data: EndPointItemData): void;
  show(): void;
  hide(): void;
  dispose(): void;
}

/**
 * 墙体吸附数据接口
 */
interface WallSnapData {
  /** 吸附宽度 */
  width: number;
  /** 墙体模式（覆盖） */
  mode?: WallMode;
}

/**
 * 墙体创建Gizmo接口
 */
interface CreateTgWallGizmo {
  /** 墙体路径曲线 */
  curve?: Curve2d;
  /** 墙体中线曲线 */
  middleCurve?: Curve2d;
  /** 墙体路径集合 */
  wallPath: Curve2d[];
  /** 所有尺寸标注 */
  dimensions: Dimension[];
  /** 线段尺寸标注 */
  lineDimension: Dimension;
  /** 弧高尺寸标注 */
  archHeightDimension: Dimension;
  /** 墙体宽度 */
  wallWidth: number;
  /** 墙体模式 */
  wallMode: WallMode;
  /** 信号监听器 */
  signal: SignalListener<DimensionChangeEvent>;
  /** 设置墙体吸附数据 */
  setWallSnapData(data: WallSnapData): void;
  /** 绘制Gizmo */
  draw(): void;
  /** 清理资源 */
  onCleanup(): void;
}

/**
 * 吸附辅助器配置接口
 */
interface SnapHelperConfig {
  /** 是否开启正交模式 */
  orthoModeOn: boolean;
  /** 是否开启前点正交吸附 */
  prePointOrthoSnap: boolean;
}

/**
 * 吸附辅助器接口
 */
interface SnapHelper {
  /** 前一个参考点 */
  prePoint?: Vector2;
  /** 所有尺寸标注 */
  dimensions: Dimension[];
  /** 信号监听器 */
  signal: SignalListener<DimensionChangeEvent>;
  /** 是否点吸附 */
  isPointSnap: boolean;
  /** 执行吸附计算 */
  snap(point: Vector2, step: number, startPoint?: Vector2): SnapResult | undefined;
  /** 吸附到CAD点 */
  snapCadPoints(point: Vector2): Vector2 | undefined;
  /** 根据曲线隐藏尺寸标注 */
  hideDimensionByCurves(curves: Curve2d[]): void;
  /** 刷新移动点数据 */
  refreshForMovePoint(walls: Wall[]): void;
  /** 清除首个数据 */
  clearFirstData(): void;
  /** 隐藏辅助器 */
  hide(): void;
  /** 释放资源 */
  dispose(): void;
}

/**
 * 尺寸标注变化事件接口
 */
interface DimensionChangeEvent {
  data: {
    /** 更新的点坐标 */
    point?: Vector2;
    /** 触发的键盘码 */
    keyCode?: number;
    /** 是否来自吸附 */
    fromSnap?: boolean;
  };
}

/**
 * 头部工具栏配置接口
 */
interface HeadToolConfig {
  items: Array<{
    checkBox: {
      checked: boolean;
      name: string;
      onChange: (checked: boolean) => void;
    };
  }>;
}

/**
 * 头部工具栏组件
 */
declare class HeadToolComp {
  constructor(context: any, config: HeadToolConfig);
  dispose(): void;
}

/**
 * 二维向量类
 */
declare class Vector2 {
  constructor(x: number | Vector2, y?: number | Vector2);
  x: number;
  y: number;
  add(offset: Vector2): this;
  clone(): Vector2;
  equals(other: Vector2): boolean;
  subtracted(other: Vector2): Vector2;
  multiply(scalar: number): Vector2;
  cross(other: Vector2): number;
}

/**
 * 二维曲线基类
 */
declare class Curve2d {
  /** 获取曲线终点 */
  getEndPt(): Vector2;
}

/**
 * 二维直线类
 */
declare class Line2d extends Curve2d {
  constructor(start: Vector2, end: Vector2);
  /** 获取中点 */
  getMidPt(): Vector2;
  /** 获取右侧法向量 */
  getRightNormal(): Vector2;
  /** 获取线段长度 */
  getLength(): number;
}

/**
 * 二维圆弧类
 */
declare class Arc2d extends Curve2d {
  /** 通过三点创建圆弧 */
  static makeArcByThreePoints(p1: Vector2, p2: Vector2, p3: Vector2): Arc2d;
}

/**
 * 墙体实体接口
 */
interface Wall {
  // 墙体相关属性
}

/**
 * 鼠标事件接口
 */
interface MouseEvent {
  type: string;
  button: number;
  clientX: number;
  clientY: number;
  ctrlKey: boolean;
}

/**
 * 命令接收参数接口
 */
interface CommandReceiveParams {
  event: MouseEvent;
  keyCode: number;
}

/**
 * 命令当前参数接口
 */
interface CommandCurrentParams {
  activeSection: string;
  activeSectionName: string;
  clicksRatio: {
    id: string;
    name: string;
    subItem: {
      id: string;
      name: string;
    };
  };
}

/**
 * 信号监听器接口
 */
interface SignalListener<T> {
  listen(callback: (event: T) => void): void;
  unlisten(callback: (event: T) => void): void;
}

/**
 * 性能日志接口
 */
interface PerformanceLogger {
  time(operation: string): void;
  timeEnd(operation: string, log?: boolean): void;
}

/**
 * 命令上下文接口
 */
interface CommandContext {
  app: Application;
}

/**
 * 应用程序接口
 */
interface Application {
  pluginManager: PluginManager;
  selectionManager: SelectionManager;
  appSettings: AppSettings;
  transManager: TransactionManager;
  floorplan: Floorplan;
  getActive2DView(): Canvas2DView;
}

/**
 * 创建TG墙体命令类
 * 支持创建直线墙和圆弧墙
 */
export declare class CmdCreateTgWall extends Command {
  /**
   * 构造函数
   * @param drawArc - 是否绘制弧墙
   */
  constructor(drawArc: boolean);

  /**
   * 当前绘制步骤
   * 0: 未开始, 1: 已设置起点, 2: 已设置终点
   */
  readonly step: number;

  /**
   * 当前墙体类型
   */
  readonly wallType: WallType;

  /**
   * 墙体设置对象
   */
  readonly setting: WallSettings;

  /**
   * 2D画布视图
   */
  readonly canvas: Canvas2DView;

  /**
   * 所有尺寸标注数组
   */
  readonly dimensions: Dimension[];

  /**
   * 命令执行入口
   * 初始化Gizmo、吸附辅助器、端点项等
   */
  onExecute(): void;

  /**
   * 接收用户交互事件
   * @param eventType - 事件类型（mousedown/mousemove/click/keydown等）
   * @param params - 事件参数
   * @returns 是否阻止事件传播
   */
  onReceive(eventType: string, params: CommandReceiveParams): boolean;

  /**
   * 处理鼠标移动事件
   * @param event - 鼠标事件对象
   */
  onMouseMove(event: MouseEvent): void;

  /**
   * 处理鼠标点击事件
   * @param event - 鼠标事件对象
   */
  onClick(event: MouseEvent): void;

  /**
   * 处理键盘按下事件
   * @param keyCode - 键盘码
   * - SPACE: 切换墙体模式（内侧/中间/外侧）
   * - SHIFT: 切换正交模式
   * - ALT: 切换弧墙高度模式
   * - DELETE: 重置当前绘制
   */
  onKeyDown(keyCode: number): void;

  /**
   * 命令清理回调
   * 释放所有资源
   */
  onCleanup(): void;

  /**
   * 命令是否支持撤销重做
   * @returns true表示支持
   */
  canUndoRedoInCommand(): boolean;

  /**
   * 更新墙体设置
   * @param settings - 部分设置对象
   */
  updateSetting(settings?: {
    wallIsBearing?: boolean;
    wallWidth?: number;
    wallMode?: WallMode;
    orthoModeOn?: boolean;
    wallArcHeight?: boolean;
  }): void;

  /**
   * 命令是否可交互
   * @returns true表示可交互
   */
  isInteractive(): boolean;

  /**
   * 获取命令描述文本
   * @returns 描述字符串
   */
  getDescription(): string;

  /**
   * 获取当前命令参数（用于日志统计）
   * @returns 参数对象
   */
  getCurrentParams(): CommandCurrentParams;

  /**
   * 获取命令分类
   * @returns 分类标识
   */
  getCategory(): string;

  /**
   * 获取命令模式
   * @returns 模式标识（Line或Arc）
   */
  getMode(): string;
}

/**
 * 命令基类
 */
declare abstract class Command {
  protected context: CommandContext;
  protected mgr: CommandManager | undefined;
}

// 补充类型声明
declare interface Canvas2DView {
  gizmoManager: GizmoManager;
  context: any;
  displayLayers: { temp: any };
  displayList: Record<string, any>;
}

declare interface GizmoManager {
  addGizmo(gizmo: any): void;
  removeGizmo(gizmo: any): void;
  getTypeGizmo(type: any): any[];
}

declare interface PluginManager {
  getPlugin(type: string): Plugin | undefined;
}

declare interface Plugin {
  update(): void;
}

declare interface SelectionManager {
  unselectAll(): void;
}

declare interface AppSettings {
  signalValueChanged: SignalListener<{ data: { fieldName: string } }>;
}

declare interface TransactionManager {
  commit(request: any): void;
  createRequest(type: string, args: any[]): any;
}

declare interface Floorplan {
  scene: Scene;
}

declare interface Scene {
  activeLayer: Layer;
}

declare interface Layer {
  walls: Record<string, Wall>;
  underlay?: Underlay;
}

declare interface Underlay {
  show: boolean;
}

declare interface CommandManager {
  cancel(): void;
}