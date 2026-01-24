import { EventType } from './EventType';
import { PushSash, Handle } from './Sash';
import { EditHardwareOnFrameTool, ToolType } from './Tools';
import { OpenDirection } from './OpenDirection';

/**
 * 编辑把手工具类
 * 用于在框架上编辑门窗把手的位置和属性
 */
export declare class EditHandleTool extends EditHardwareOnFrameTool {
  /**
   * 视图实例引用
   */
  readonly view: View;

  /**
   * 构造函数
   * @param view - 当前操作的视图对象
   */
  constructor(view: View);

  /**
   * 当硬件被编辑时的回调处理
   * 处理把手编辑后的铰链同步、指示器更新和其他关联窗扇的同步
   * @param hardware - 被编辑的硬件对象（把手）
   * @param position - 编辑后的位置或参数
   */
  onHardwareEdited(hardware: Hardware, position: unknown): void;

  /**
   * 广播把手位置变化事件
   * 通过事件总线发送handle_position_change事件
   */
  protected broadcastHandleChange(): void;
}

/**
 * 视图接口
 * 表示渲染和交互的视图对象
 */
interface View {
  /**
   * 事件总线，用于发布订阅事件
   */
  eventBus: EventBus;
}

/**
 * 事件总线接口
 */
interface EventBus {
  /**
   * 发射事件
   * @param event - 事件对象
   */
  emit(event: Event): void;
}

/**
 * 事件对象接口
 */
interface Event {
  /**
   * 事件类型
   */
  type: EventType;
  /**
   * 事件载荷数据
   */
  payload: EventPayload;
}

/**
 * 事件载荷接口
 */
interface EventPayload {
  /**
   * 多边形ID，标识受影响的窗扇
   */
  pid: PolyId;
  /**
   * 关联的视图
   */
  view: View;
}

/**
 * 多边形ID接口
 * 用于唯一标识窗扇的多边形区域
 */
interface PolyId {
  /**
   * 判断两个PolyId是否相等
   * @param other - 另一个PolyId
   * @returns 是否相等
   */
  equalTo(other: PolyId): boolean;
}

/**
 * 硬件管理器接口
 * 管理窗扇上的所有硬件组件（把手、铰链等）
 */
interface HardwareManager {
  /**
   * 把手组件
   */
  handle?: Handle;
  /**
   * 铰链组件列表
   */
  hinges: Hinge[];
  /**
   * 指示器组件
   */
  indicator: Indicator;

  /**
   * 根据把手位置计算合适的铰链边索引
   * @param handle - 把手对象
   * @returns 铰链应该安装的边索引
   */
  properHingeIndexByHandle(handle: Hardware): number;

  /**
   * 匹配开启方向
   * 根据硬件配置自动匹配窗扇的开启方向
   */
  matchOpenDirection(): void;
}

/**
 * 窗扇接口
 */
interface Sash {
  /**
   * 是否为独立窗扇
   */
  isStandalone: boolean;
  /**
   * 滑动方向
   */
  slide: OpenDirection;
  /**
   * 硬件管理器
   */
  hardwareManager: HardwareManager;
  /**
   * 多边形ID
   */
  polyId: PolyId;
  /**
   * 顶层框架引用
   */
  topFrame: TopFrame;
}

/**
 * 顶层框架接口
 */
interface TopFrame {
  /**
   * 窗扇管理器
   */
  sashManager: SashManager;
}

/**
 * 窗扇管理器接口
 */
interface SashManager {
  /**
   * 所有窗扇列表
   */
  sashes: Sash[];
}

/**
 * 铰链接口
 */
interface Hinge {
  /**
   * 铰链所在的边索引
   */
  edgeIndex: number;

  /**
   * 更新多边形区域
   */
  updatePoly(): void;

  /**
   * 在视图中绘制
   * @param view - 目标视图
   */
  draw(view: View): void;
}

/**
 * 指示器接口
 * 用于显示硬件的视觉指示
 */
interface Indicator {
  /**
   * 更新多边形区域
   */
  updatePoly(): void;

  /**
   * 在视图中绘制
   * @param view - 目标视图
   */
  draw(view: View): void;
}

/**
 * 硬件基类接口
 * 代表门窗上的硬件组件（把手、铰链等）
 */
interface Hardware {
  /**
   * 对齐到另一个硬件
   * @param target - 目标硬件
   * @param force - 是否强制对齐
   */
  alignTo(target: Hardware, force: boolean): void;

  /**
   * 更新多边形区域
   */
  updatePoly(): void;

  /**
   * 在视图中绘制
   * @param view - 目标视图
   */
  draw(view: View): void;
}