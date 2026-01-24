/**
 * 3D性能等级选择器组件
 * 用于显示和控制渲染性能等级（低/中/高）
 */

/**
 * 性能状态数据
 */
interface PerformanceStatusData {
  /** 性能状态：'low' | 'medium' | 'high' */
  status: 'low' | 'medium' | 'high';
  /** 是否为启动时的提示 */
  startup?: boolean;
}

/**
 * 性能变化事件
 */
interface PerformanceChangedEvent {
  data: PerformanceStatusData;
}

/**
 * 性能变化信号（观察者模式）
 */
interface Signal3dPerformance {
  /** 监听性能变化 */
  listen(callback: (event: PerformanceChangedEvent) => void, context: unknown): void;
  /** 取消监听 */
  unlisten?(callback: (event: PerformanceChangedEvent) => void, context: unknown): void;
}

/**
 * 组件数据属性
 */
interface PerformanceSelectorData {
  /** 当前选中的性能等级 (1: 低, 2: 中, 3: 高) */
  level: number;
  /** 性能变化信号 */
  signal3dPerformanceChanged?: Signal3dPerformance;
  /** 等级选择回调 */
  onLevelSelected?: (level: number) => void;
  /** 会话期间不再显示启动提示 */
  onSessionlyNomoreShowStartupHint?: () => void;
  /** 不再显示启动提示 */
  onNoMoreShowStartupHint?: () => void;
  /** 不再显示FPS低提示 */
  onNoMoreShowFpsLowHint?: () => void;
}

/**
 * 组件Props
 */
interface PerformanceSelectorProps {
  data: PerformanceSelectorData;
}

/**
 * 组件状态
 */
interface PerformanceSelectorState {
  /** 当前选中的等级 */
  selectedLevel: number;
  /** 鼠标悬停的等级 */
  hoveredLevel?: number;
  /** 是否显示提示框 */
  showTooltip: boolean;
  /** 鼠标是否进入组件区域 */
  mouseEntered?: boolean;
}

/**
 * SVG样式对象
 */
interface SVGStyle {
  fill?: string;
  opacity?: number;
  transform?: string;
  enableBackground?: string;
}

/**
 * 3D性能选择器组件
 * 提供三档性能等级的可视化选择界面
 */
declare class PerformanceSelector3DComponent extends React.Component<
  PerformanceSelectorProps,
  PerformanceSelectorState
> {
  /** 是否为启动时的提示 */
  private tooltipForStartup?: boolean;

  constructor(props: PerformanceSelectorProps);

  componentDidMount(): void;

  /**
   * 获取箭头旋转角度
   * @param level - 性能等级 (1: -62度, 2: 0度, 3: 62度)
   * @returns 旋转角度
   */
  private _getArrowDegree(level: number): number;

  /**
   * 获取箭头变换样式
   * @param degree - 旋转角度
   * @returns CSS transform样式对象
   */
  private _getArrowTransformStyle(degree: number): { transform: string };

  /**
   * 获取箭头样式
   * @param level - 性能等级
   * @returns 箭头样式对象
   */
  private _getArrowStyle(level: number): { transform: string };

  /**
   * 获取等级区域填充样式
   * @param selectedLevel - 当前选中的等级
   * @param hoveredLevel - 鼠标悬停的等级
   * @returns 三个等级区域的样式数组
   */
  private _getLevelStyles(
    selectedLevel: number,
    hoveredLevel?: number
  ): Array<{ fill: string }>;

  /**
   * 性能变化事件处理
   * @param event - 性能变化事件
   */
  private _onPerformanceChanged(event: PerformanceChangedEvent): void;

  /**
   * 等级点击事件处理
   * @param level - 被点击的等级
   */
  private _onLevelClicked(level: number): void;

  /**
   * 等级悬停事件处理
   * @param level - 鼠标悬停的等级（undefined表示移出）
   */
  private _onLevelHovered(level?: number): void;

  /**
   * "不再显示"按钮点击处理
   */
  private _onNoMoreShowClicked(): void;

  /**
   * 渲染等级提示信息
   * @returns React元素或undefined
   */
  private _renderLevelTooltipInfo(): React.ReactElement | undefined;

  /**
   * 渲染组件提示信息
   * @returns React元素或undefined
   */
  private _renderWidgetTooltipInfo(): React.ReactElement | undefined;

  render(): React.ReactElement;
}

/**
 * 性能选择器管理器
 * 用于创建、更新和销毁性能选择器组件实例
 */
export default class PerformanceSelector3DManager {
  /** 容器DOM元素 */
  private _containerElement: HTMLElement;
  /** 组件数据 */
  private _data: PerformanceSelectorData;

  /**
   * 构造函数（建议使用静态方法create）
   * @param data - 组件数据
   * @param container - 容器DOM元素
   */
  constructor(data: PerformanceSelectorData, container: HTMLElement);

  /**
   * 创建性能选择器实例
   * @param data - 组件数据
   * @param container - 容器DOM元素
   * @returns 性能选择器管理器实例
   */
  static create(
    data: PerformanceSelectorData,
    container: HTMLElement
  ): PerformanceSelector3DManager;

  /**
   * 更新组件数据
   * @param data - 要更新的数据（部分更新）
   */
  update(data: Partial<PerformanceSelectorData>): void;

  /**
   * 销毁组件实例
   */
  destroy(): void;

  /**
   * @deprecated 已废弃，请使用destroy()
   */
  destory(): void;

  /**
   * 渲染组件
   * @param data - 组件数据
   * @param container - 容器DOM元素
   */
  private _render(data: PerformanceSelectorData, container: HTMLElement): void;
}