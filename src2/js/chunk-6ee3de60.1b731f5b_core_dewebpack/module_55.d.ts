/**
 * 指针事件映射表类型
 * 定义了不同输入设备类型到统一指针事件的映射关系
 */
interface PointerEventMap {
  pointerout: string;
  pointerleave: string;
  pointerover: string;
  pointerenter: string;
  pointermove: string;
  pointerdown: string;
  pointerup: string;
  pointercancel: string;
  pointerclick: string;
  pointerdblclick: string;
}

/**
 * 指针位置信息
 */
interface PointerPosition {
  /** 指针唯一标识符 */
  id: number;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 内容区域位置和缩放信息
 */
interface ContentPosition {
  /** 顶部偏移 */
  top: number;
  /** 左侧偏移 */
  left: number;
  /** X轴缩放比例 */
  scaleX: number;
  /** Y轴缩放比例 */
  scaleY: number;
}

/**
 * 舞台配置选项
 */
interface StageConfig {
  /** 容器元素或选择器 */
  container?: HTMLElement | string;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 是否可见 */
  visible?: boolean;
  /** 裁剪函数（不支持，仅用于警告） */
  clipFunc?: Function;
  /** 裁剪宽度（不支持，仅用于警告） */
  clipWidth?: number;
  /** 裁剪高度（不支持，仅用于警告） */
  clipHeight?: number;
}

/**
 * 指针事件数据
 */
interface PointerEventData {
  /** 原生事件对象 */
  evt: Event;
  /** 目标节点 */
  target: any;
  /** 当前目标节点 */
  currentTarget: any;
  /** 指针ID（可选） */
  pointerId?: number;
}

/**
 * 转换为Canvas配置
 */
interface ToCanvasConfig {
  /** X偏移 */
  x?: number;
  /** Y偏移 */
  y?: number;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 像素比例 */
  pixelRatio?: number;
}

/**
 * 尺寸配置
 */
interface SizeConfig {
  width: number;
  height: number;
}

/**
 * 输入设备类型
 */
type InputDeviceType = 'mouse' | 'touch' | 'pointer';

/**
 * 事件类型元组：[原生事件名, 内部处理方法名]
 */
type EventTuple = [string, string];

/**
 * 获取输入设备类型
 * @param eventType - 事件类型字符串
 * @returns 设备类型: 'pointer' | 'touch' | 'mouse'
 */
export declare function getInputDeviceType(eventType: string): InputDeviceType;

/**
 * 获取指定事件类型的指针事件映射表
 * @param eventType - 事件类型字符串
 * @returns 对应的事件映射表，如果不支持则返回undefined
 */
export declare function getPointerEventMap(eventType: string): PointerEventMap | undefined;

/**
 * 验证并过滤舞台配置
 * 移除不支持的裁剪相关配置并发出警告
 * @param config - 原始配置对象
 * @returns 处理后的配置对象
 */
export declare function validateStageConfig(config?: StageConfig): StageConfig;

/**
 * Konva舞台类
 * 作为根容器管理所有图层，处理用户交互事件
 */
export declare class Stage extends Container {
  /** 内容DOM容器 */
  content: HTMLDivElement;
  
  /** 当前所有指针位置 */
  private _pointerPositions: PointerPosition[];
  
  /** 变化的指针位置（用于多点触控） */
  private _changedPointerPositions: PointerPosition[];
  
  /** 鼠标点击开始时的目标形状 */
  private mouseClickStartShape?: Shape;
  
  /** 触摸点击开始时的目标形状 */
  private touchClickStartShape?: Shape;
  
  /** 指针点击开始时的目标形状 */
  private pointerClickStartShape?: Shape;
  
  /** 鼠标点击结束时的目标形状 */
  private mouseClickEndShape?: Shape;
  
  /** 触摸点击结束时的目标形状 */
  private touchClickEndShape?: Shape;
  
  /** 指针点击结束时的目标形状 */
  private pointerClickEndShape?: Shape;
  
  /** 鼠标目标形状 */
  private mouseTargetShape?: Shape;
  
  /** 触摸目标形状 */
  private touchTargetShape?: Shape;
  
  /** 指针目标形状 */
  private pointerTargetShape?: Shape;
  
  /** 鼠标双击定时器 */
  private mouseDblTimeout?: number;
  
  /** 触摸双击定时器 */
  private touchDblTimeout?: number;
  
  /** 指针双击定时器 */
  private pointerDblTimeout?: number;
  
  /** 指针位置（单点兼容） */
  pointerPos?: PointerPosition;
  
  /** 缓冲Canvas */
  bufferCanvas: SceneCanvas;
  
  /** 缓冲碰撞检测Canvas */
  bufferHitCanvas: HitCanvas;

  /**
   * 构造函数
   * @param config - 舞台配置选项
   */
  constructor(config: StageConfig);

  /**
   * 验证添加的子节点类型（仅允许Layer和FastLayer）
   * @param child - 要添加的子节点
   */
  protected _validateAdd(child: Node): void;

  /**
   * 检查可见性并更新DOM显示状态
   */
  private _checkVisibility(): void;

  /**
   * 设置容器元素
   * @param container - DOM元素或CSS选择器
   * @returns 当前舞台实例
   */
  setContainer(container: HTMLElement | string): this;

  /**
   * 是否应绘制碰撞检测层
   * @returns 始终返回true
   */
  shouldDrawHit(): boolean;

  /**
   * 清空所有子图层
   * @returns 当前舞台实例
   */
  clear(): this;

  /**
   * 克隆舞台
   * @param config - 克隆配置（必须提供新容器）
   * @returns 克隆的舞台实例
   */
  clone(config?: Partial<StageConfig>): this;

  /**
   * 销毁舞台及其DOM元素
   * @returns 当前舞台实例
   */
  destroy(): this;

  /**
   * 获取当前指针位置（单点模式）
   * @returns 指针位置坐标，如果未注册则返回null并发出警告
   */
  getPointerPosition(): PointerPosition | null;

  /**
   * 根据ID获取指针位置
   * @param pointerId - 指针唯一标识符
   * @returns 对应的指针位置，未找到则返回undefined
   */
  private _getPointerById(pointerId: number): PointerPosition | undefined;

  /**
   * 获取所有指针位置（多点触控）
   * @returns 指针位置数组
   */
  getPointersPositions(): PointerPosition[];

  /**
   * 获取舞台引用
   * @returns 自身
   */
  getStage(): this;

  /**
   * 获取内容DOM容器
   * @returns 内容div元素
   */
  getContent(): HTMLDivElement;

  /**
   * 转换为KonvaCanvas对象
   * @param config - 转换配置
   * @returns SceneCanvas实例
   */
  protected _toKonvaCanvas(config?: ToCanvasConfig): SceneCanvas;

  /**
   * 获取指定位置的交叉节点（碰撞检测）
   * @param position - 坐标位置
   * @returns 相交的节点，未找到则返回null
   */
  getIntersection(position: PointerPosition): Node | null;

  /**
   * 调整DOM尺寸以匹配舞台宽高
   */
  private _resizeDOM(): void;

  /**
   * 添加子图层
   * @param layer - 图层实例或多个图层
   * @returns 当前舞台实例
   */
  add(...layer: Layer[]): this;

  /**
   * 获取父节点
   * @returns 始终返回null（舞台是根节点）
   */
  getParent(): null;

  /**
   * 获取所属图层
   * @returns 始终返回null（舞台不属于任何图层）
   */
  getLayer(): null;

  /**
   * 检查是否捕获了指定指针
   * @param pointerId - 指针ID
   * @returns 是否已捕获
   */
  hasPointerCapture(pointerId: number): boolean;

  /**
   * 捕获指定指针
   * @param pointerId - 指针ID
   */
  setPointerCapture(pointerId: number): void;

  /**
   * 释放指针捕获
   * @param pointerId - 指针ID
   */
  releaseCapture(pointerId: number): void;

  /**
   * 获取所有子图层
   * @returns 图层数组
   */
  getLayers(): Layer[];

  /**
   * 绑定内容DOM的事件监听器
   */
  private _bindContentEvents(): void;

  /**
   * 处理指针进入事件
   * @param event - 原生事件对象
   */
  private _pointerenter(event: PointerEvent | MouseEvent | TouchEvent): void;

  /**
   * 处理指针悬停事件
   * @param event - 原生事件对象
   */
  private _pointerover(event: PointerEvent | MouseEvent | TouchEvent): void;

  /**
   * 获取指定设备类型的目标形状
   * @param deviceType - 设备类型前缀
   * @returns 目标形状或null
   */
  private _getTargetShape(deviceType: string): Shape | null;

  /**
   * 处理指针离开事件
   * @param event - 原生事件对象
   */
  private _pointerleave(event: PointerEvent | MouseEvent | TouchEvent): void;

  /**
   * 处理指针按下事件
   * @param event - 原生事件对象
   */
  private _pointerdown(event: PointerEvent | MouseEvent | TouchEvent): void;

  /**
   * 处理指针移动事件
   * @param event - 原生事件对象
   */
  private _pointermove(event: PointerEvent | MouseEvent | TouchEvent): void;

  /**
   * 处理指针抬起事件
   * @param event - 原生事件对象
   */
  private _pointerup(event: PointerEvent | MouseEvent | TouchEvent): void;

  /**
   * 处理右键菜单事件
   * @param event - 原生事件对象
   */
  private _contextmenu(event: MouseEvent): void;

  /**
   * 处理鼠标滚轮事件
   * @param event - 原生事件对象
   */
  private _wheel(event: WheelEvent): void;

  /**
   * 处理指针取消事件
   * @param event - 原生事件对象
   */
  private _pointercancel(event: PointerEvent): void;

  /**
   * 处理指针捕获丢失事件
   * @param event - 原生事件对象
   */
  private _lostpointercapture(event: PointerEvent): void;

  /**
   * 设置指针位置（从原生事件中提取）
   * @param event - 原生事件对象
   */
  setPointersPositions(event: PointerEvent | MouseEvent | TouchEvent | Event): void;

  /**
   * @deprecated 已弃用，请使用setPointersPositions
   */
  _setPointerPosition(event: Event): void;

  /**
   * 获取内容区域的位置和缩放信息
   * @returns 位置和缩放数据
   */
  private _getContentPosition(): ContentPosition;

  /**
   * 构建DOM结构
   */
  private _buildDOM(): void;

  /**
   * 缓存方法（舞台不支持缓存）
   * @returns 当前实例
   */
  cache(): this;

  /**
   * 清除缓存（舞台无操作）
   * @returns 当前实例
   */
  clearCache(): this;

  /**
   * 批量绘制所有子图层
   * @returns 当前实例
   */
  batchDraw(): this;

  /** 节点类型标识 */
  nodeType: 'Stage';
}

/**
 * 自定义图层类
 * 扩展了Layer并添加绘制生命周期事件
 */
export declare class CustomLayer extends Layer {
  /**
   * 构造函数
   * @param config - 图层配置
   */
  constructor(config?: any);

  /**
   * 绘制碰撞检测层（触发drawhit_webcc事件）
   * @param canvas - Canvas对象
   * @param top - 顶层节点
   */
  drawHit(canvas?: any, top?: any): any;

  /**
   * 绘制场景（触发drawscene_webcc事件）
   * @param canvas - Canvas对象
   * @param top - 顶层节点
   */
  drawScene(canvas?: any, top?: any): any;
}

/**
 * @deprecated 快速图层（已弃用）
 * 请使用 new Layer({ listening: false }) 替代
 */
export declare class FastLayer extends Layer {
  /**
   * 构造函数
   * @param config - 图层配置
   */
  constructor(config?: any);

  /** 节点类型标识 */
  nodeType: 'FastLayer';
}

/**
 * 分组容器类
 * 用于组织和管理形状及子分组
 */
export declare class Group extends Container {
  /**
   * 验证添加的子节点类型（仅允许Group和Shape）
   * @param child - 要添加的子节点
   */
  protected _validateAdd(child: Node): void;

  /** 节点类型标识 */
  nodeType: 'Group';
}

/**
 * 全局舞台实例数组
 */
export declare const stages: Stage[];

/**
 * 事件映射配置常量
 * 包含mouse、touch、pointer三种设备类型的事件映射
 */
export declare const POINTER_EVENT_MAPS: {
  mouse: PointerEventMap;
  touch: PointerEventMap;
  pointer: PointerEventMap;
};

/**
 * 原生事件到内部方法的映射表
 * 格式: [原生事件名, 内部处理方法名]
 */
export declare const EVENT_BINDINGS: ReadonlyArray<EventTuple>;