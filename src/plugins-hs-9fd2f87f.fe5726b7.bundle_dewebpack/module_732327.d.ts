/**
 * 定制建模插件 - 房间附着交互组件类型定义
 * @module hsw.plugin.customizedmodeling
 */

/**
 * 检测当前环境是否支持 Reflect.construct
 * @returns 是否支持构造函数反射
 */
declare function checkReflectConstructSupport(): boolean;

/**
 * 获取对象原型链上的属性或方法
 * @param target - 目标对象（实例或原型）
 * @param propertyKey - 属性键名
 * @param context - 执行上下文
 * @param flags - 标志位：1=从原型获取, 2=绑定上下文
 * @returns 属性值或绑定后的函数
 */
declare function getPrototypeProperty<T>(
  target: object,
  propertyKey: string,
  context: unknown,
  flags: number
): T;

/**
 * 房间高亮基础交互组件
 * 提供房间选择、高亮显示等基础功能
 */
declare class GizmoBase extends HSApp.View.SVG.Temp {
  /**
   * 房间高亮路径元素
   */
  protected _roomHighlight?: RaphaelElement;

  /**
   * 当前悬停的房间实体
   */
  protected _room?: HSCore.Model.Floor | HSCore.Model.Ceiling;

  /**
   * 当前选中的面
   */
  protected _face?: HSCore.Model.Face;

  /**
   * SVG 元素集合
   */
  element: RaphaelElement[];

  /**
   * 构造函数
   * @param context - SVG 上下文
   * @param layer - 图层对象
   * @param options - 配置选项
   */
  constructor(context: RaphaelPaper, layer: unknown, options: unknown);

  /**
   * 构建房间高亮显示元素
   * 创建带默认样式的矩形路径
   */
  buildRoomHighlight(): void;

  /**
   * 更新房间高亮显示
   * 根据当前房间几何形状更新路径
   */
  updateRoomHighlight(): void;

  /**
   * 构建房间高亮路径字符串
   * @returns SVG 路径字符串（如 "M10,20L30,40Z"）或空字符串
   */
  buildRoomHighlightPath(): string;

  /**
   * 清理组件资源
   * 移除所有 SVG 元素并重置状态
   */
  onCleanup(): void;

  /**
   * 处理房间悬停事件
   * @param room - 悬停的房间实体
   */
  roomHover(room: HSCore.Model.Floor | HSCore.Model.Ceiling | undefined): void;

  /**
   * 重置组件状态
   * 清空选择并重置房间引用
   */
  reset(): void;

  /**
   * 拾取指定屏幕坐标处的实体
   * @param event - 鼠标事件
   * @param screenX - 屏幕 X 坐标
   * @param screenY - 屏幕 Y 坐标
   * @returns 拾取结果对象
   */
  pick(
    event: MouseEvent,
    screenX: number,
    screenY: number
  ): HSApp.View.SVG.PickResult;
}

/**
 * 墙体附着交互组件
 * 支持同线墙体的联动高亮与选择
 */
declare class WallAttachedGizmo extends GizmoBase {
  /**
   * 同线墙体填充高亮元素数组
   */
  protected _coWallsHighlight?: RaphaelElement[];

  /**
   * 同线墙体边框高亮元素数组
   */
  protected _coWallsBorderHighlight?: RaphaelElement[];

  /**
   * 当前选中的墙体
   */
  protected _coWall?: HSCore.Model.NgWall;

  /**
   * 同线墙体模型数组
   */
  protected _coWallsInLine: HSCore.Model.NgWall[];

  /**
   * 同线墙体 SVG 视图数组
   */
  protected _svgWallsInLine: HSApp.View.SVG.Wall[];

  /**
   * 构造函数
   * @param context - SVG 上下文
   * @param layer - 图层对象
   * @param options - 配置选项
   */
  constructor(context: RaphaelPaper, layer: unknown, options: unknown);

  /**
   * 设置当前操作的墙体
   * 自动计算同线墙体并更新视图
   * @param wall - 墙体实体
   */
  setCoWall(wall: HSCore.Model.NgWall | undefined): void;

  /**
   * 构建同线墙体高亮元素
   * 为每个墙体创建填充和边框高亮
   */
  buildCoWallsHighlight(): void;

  /**
   * 更新同线墙体高亮显示
   * 刷新所有墙体的路径和可见性
   */
  updateCoWallsHighlight(): void;

  /**
   * 绘制组件
   * 执行完整的渲染流程
   */
  onDraw(): void;

  /**
   * 处理鼠标移动事件
   * @param event - 鼠标事件
   * @param screenX - 屏幕 X 坐标
   * @param screenY - 屏幕 Y 坐标
   */
  onMouseMove(event: MouseEvent, screenX: number, screenY: number): void;

  /**
   * 处理房间悬停事件
   * 检查墙体是否属于当前房间
   * @param room - 悬停的房间实体
   */
  roomHover(room: HSCore.Model.Floor | HSCore.Model.Ceiling | undefined): void;

  /**
   * 处理墙体悬停事件
   * @param wall - 悬停的墙体实体
   * @param screenX - 屏幕 X 坐标
   * @param screenY - 屏幕 Y 坐标
   */
  ngWallHover(
    wall: HSCore.Model.NgWall,
    screenX: number,
    screenY: number
  ): void;

  /**
   * 处理共墙悬停事件
   * @param wall - 共墙实体
   */
  coWallHover(wall: HSCore.Model.NgWall | undefined): void;

  /**
   * 判断墙体是否属于当前房间
   * @param wall - 墙体实体
   * @returns 是否属于当前房间
   */
  isCowallInRoom(wall: HSCore.Model.NgWall | undefined): boolean;

  /**
   * 处理鼠标点击事件
   * 触发墙体选择命令
   * @param event - 鼠标事件
   * @param screenX - 屏幕 X 坐标
   * @param screenY - 屏幕 Y 坐标
   */
  onMouseClick(event: MouseEvent, screenX: number, screenY: number): void;
}

/**
 * 墙体附着物移动交互组件
 * 用于处理墙面附着内容的移动操作
 */
declare class MoveWallAttachedGizmo extends WallAttachedGizmo {
  /**
   * 当前移动命令对象
   */
  protected cmdMove: HSFPConstants.Command | null;

  /**
   * 激活组件
   */
  activate(): void;

  /**
   * 停用组件
   */
  deactivate(): void;

  /**
   * 绘制组件
   * 检测移动命令并触发渲染
   */
  draw(): void;

  /**
   * 处理鼠标点击事件（空实现）
   */
  onMouseClick(event: MouseEvent, screenX: number, screenY: number): void;

  /**
   * 处理鼠标移动事件
   * 在移动模式下禁用高亮
   */
  onMouseMove(event: MouseEvent, screenX: number, screenY: number): void;
}

/**
 * 房间附着交互组件
 * 支持地板和天花板的选择与高亮
 */
declare class RoomAttachedGizmo extends GizmoBase {
  /**
   * 构造函数
   * @param context - SVG 上下文
   * @param layer - 图层对象
   * @param options - 配置选项
   */
  constructor(context: RaphaelPaper, layer: unknown, options: unknown);

  /**
   * 绘制组件
   * 渲染房间高亮效果
   */
  draw(): void;

  /**
   * 处理鼠标移动事件
   * 检测地板/天花板并更新高亮
   * @param event - 鼠标事件
   * @param screenX - 屏幕 X 坐标
   * @param screenY - 屏幕 Y 坐标
   */
  onMouseMove(event: MouseEvent, screenX: number, screenY: number): void;

  /**
   * 处理鼠标点击事件
   * 触发房间选择命令，自动处理天花板转换
   * @param event - 鼠标事件
   * @param screenX - 屏幕 X 坐标
   * @param screenY - 屏幕 Y 坐标
   */
  onMouseClick(event: MouseEvent, screenX: number, screenY: number): void;
}

/**
 * 房间附着物移动交互组件
 * 用于处理房间内容的移动操作
 */
declare class MoveRoomAttachedGizmo extends WallAttachedGizmo {
  /**
   * 当前移动命令对象
   */
  protected cmdMove: HSFPConstants.Command | null;

  /**
   * 激活组件
   */
  activate(): void;

  /**
   * 停用组件
   */
  deactivate(): void;

  /**
   * 绘制组件
   * 检测移动命令并触发渲染
   */
  draw(): void;

  /**
   * 处理鼠标点击事件（空实现）
   */
  onMouseClick(event: MouseEvent, screenX: number, screenY: number): void;

  /**
   * 处理鼠标移动事件
   * 在移动模式下禁用高亮
   */
  onMouseMove(event: MouseEvent, screenX: number, screenY: number): void;
}

/**
 * Raphael 图形元素接口
 */
interface RaphaelElement {
  attr(params: Record<string, unknown>): RaphaelElement;
  hide(): void;
  show(): void;
}

/**
 * Raphael 画布接口
 */
interface RaphaelPaper {
  path(pathString: string): RaphaelElement;
  hscanvas: unknown;
  _viewBox: number[];
  getBoundingClientRect(): DOMRect;
}

/**
 * 模块导出
 */
export { RoomAttachedGizmo };