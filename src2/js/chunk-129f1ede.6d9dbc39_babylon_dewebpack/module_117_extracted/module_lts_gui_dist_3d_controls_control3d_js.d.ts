/**
 * 3D GUI控件基类
 * 提供3D空间中可交互控件的核心功能，包括位置、缩放、行为管理和指针事件处理
 */

import { Observable } from "core/Misc/observable";
import { Vector3 } from "core/Maths/math.vector";
import { AbstractMesh } from "core/Meshes/abstractMesh";
import { TransformNode } from "core/Meshes/transformNode";
import { Node } from "core/node";
import { Scene } from "core/scene";
import { PointerEventTypes, PointerInfo } from "core/Events/pointerEvents";
import { Behavior } from "core/Behaviors/behavior";
import { Material } from "core/Materials/material";
import { Vector3WithInfo } from "./vector3WithInfo";

/**
 * GUI3D保留数据存储接口
 */
interface GUI3DReservedDataStore {
  /** 关联的控件实例 */
  control?: Control3D;
  [key: string]: unknown;
}

/**
 * 节点保留数据存储接口
 */
interface NodeReservedDataStore {
  /** GUI3D相关数据 */
  GUI3D?: GUI3DReservedDataStore;
  [key: string]: unknown;
}

/**
 * 支持触摸按钮的3D控件接口
 */
interface TouchButton3D {
  /** 生成指针事件类型 */
  _generatePointerEventType(
    eventType: number,
    pointerInfo: PointerInfo,
    downCount: number
  ): number;
}

/**
 * 3D GUI管理器接口
 */
interface GUI3DManager {
  /** 场景实例 */
  scene: Scene;
  /** 上次按下的控件映射（按指针ID） */
  _lastControlDown: Record<number, Control3D>;
  /** 上次悬停的控件映射（按指针ID） */
  _lastControlOver: Record<number, Control3D>;
  /** 上次拾取的控件 */
  _lastPickedControl?: Control3D;
}

/**
 * 3D控件基类
 * 所有3D GUI控件的抽象基类，提供位置、缩放、可见性、行为系统和完整的指针交互事件
 */
export declare class Control3D {
  /** 控件名称 */
  name: string;

  /** 指针按下计数器 */
  private _downCount: number;

  /** 指针进入计数器（-1表示未初始化） */
  private _enterCount: number;

  /** 按指针ID记录的按下次数 */
  private _downPointerIds: Record<number, number>;

  /** 控件是否可见 */
  private _isVisible: boolean;

  /** 是否由管理器缩放 */
  _isScaledByManager: boolean;

  /** 关联的3D节点 */
  private _node?: TransformNode | AbstractMesh;

  /** 宿主GUI管理器 */
  _host: GUI3DManager;

  /** 附加的行为列表 */
  private _behaviors: Behavior<Control3D>[];

  /**
   * 指针移动时触发的观察者
   * 参数: (position: Vector3WithInfo)
   */
  onPointerMoveObservable: Observable<Vector3WithInfo>;

  /**
   * 指针移出控件时触发的观察者
   * 参数: (control: Control3D)
   */
  onPointerOutObservable: Observable<Control3D>;

  /**
   * 指针按下时触发的观察者
   * 参数: (position: Vector3WithInfo)
   */
  onPointerDownObservable: Observable<Vector3WithInfo>;

  /**
   * 指针抬起时触发的观察者
   * 参数: (position: Vector3WithInfo)
   */
  onPointerUpObservable: Observable<Vector3WithInfo>;

  /**
   * 指针点击时触发的观察者（按下并抬起）
   * 参数: (position: Vector3WithInfo)
   */
  onPointerClickObservable: Observable<Vector3WithInfo>;

  /**
   * 指针进入控件时触发的观察者
   * 参数: (control: Control3D)
   */
  onPointerEnterObservable: Observable<Control3D>;

  /**
   * 指针进入时的动画回调
   */
  pointerEnterAnimation?: () => void;

  /**
   * 指针移出时的动画回调
   */
  pointerOutAnimation?: () => void;

  /**
   * 指针按下时的动画回调
   */
  pointerDownAnimation?: () => void;

  /**
   * 指针抬起时的动画回调
   */
  pointerUpAnimation?: () => void;

  /**
   * 创建3D控件实例
   * @param name 控件名称
   */
  constructor(name?: string);

  /**
   * 获取或设置控件的位置
   * 如果节点不存在，返回零向量
   */
  get position(): Vector3;
  set position(value: Vector3);

  /**
   * 获取或设置控件的缩放
   * 如果节点不存在，返回单位缩放(1,1,1)
   * 设置时会将_isScaledByManager标志设为false
   */
  get scaling(): Vector3;
  set scaling(value: Vector3);

  /**
   * 获取附加到此控件的所有行为
   */
  get behaviors(): ReadonlyArray<Behavior<Control3D>>;

  /**
   * 添加一个行为到控件
   * @param behavior 要添加的行为实例
   * @returns 当前控件实例（支持链式调用）
   */
  addBehavior(behavior: Behavior<Control3D>): this;

  /**
   * 移除一个行为
   * @param behavior 要移除的行为实例
   * @returns 当前控件实例（支持链式调用）
   */
  removeBehavior(behavior: Behavior<Control3D>): this;

  /**
   * 根据名称获取行为
   * @param name 行为名称
   * @returns 匹配的行为实例，未找到则返回null
   */
  getBehaviorByName(name: string): Behavior<Control3D> | null;

  /**
   * 获取或设置控件的可见性
   * 设置时会同步更新关联的mesh的启用状态
   */
  get isVisible(): boolean;
  set isVisible(value: boolean);

  /**
   * 获取控件的类型名称
   */
  get typeName(): string;

  /**
   * 获取控件的类名（已废弃，使用typeName代替）
   * @returns 类型名称字符串
   */
  getClassName(): string;

  /**
   * 内部方法：获取类型名称
   * 子类应重写此方法返回具体类型
   * @returns 类型名称，基类返回"Control3D"
   */
  protected _getTypeName(): string;

  /**
   * 获取关联的3D节点（TransformNode或AbstractMesh）
   */
  get node(): TransformNode | AbstractMesh | undefined;

  /**
   * 获取关联的网格对象
   * 如果节点不是AbstractMesh类型，返回null
   */
  get mesh(): AbstractMesh | null;

  /**
   * 将控件链接到指定的变换节点
   * @param transformNode 目标父节点
   * @returns 当前控件实例（支持链式调用）
   */
  linkToTransformNode(transformNode: TransformNode): this;

  /**
   * 准备节点：创建节点（如果不存在）并配置材质
   * @param scene 场景实例
   */
  _prepareNode(scene: Scene): void;

  /**
   * 注入GUI3D保留数据存储到节点
   * 确保节点的reservedDataStore.GUI3D对象存在
   * @param node 目标节点
   * @returns GUI3D数据存储对象
   */
  protected _injectGUI3DReservedDataStore(
    node: Node
  ): GUI3DReservedDataStore;

  /**
   * 创建控件关联的3D节点
   * 子类应重写此方法创建具体的节点类型
   * @param scene 场景实例
   * @returns 创建的节点，基类返回null
   */
  protected _createNode(scene: Scene): TransformNode | AbstractMesh | null;

  /**
   * 应用材质到网格
   * 子类应重写此方法设置具体的材质
   * @param mesh 目标网格
   */
  protected _affectMaterial(mesh: AbstractMesh): void;

  /**
   * 判断控件是否为触摸按钮3D类型
   * @param control 待检查的控件
   * @returns 如果是触摸按钮返回true
   */
  protected _isTouchButton3D(
    control: Control3D
  ): control is Control3D & TouchButton3D;

  /**
   * 处理指针移动事件
   * @param control 当前控件
   * @param position 指针位置信息
   */
  _onPointerMove(control: Control3D, position: Vector3WithInfo): void;

  /**
   * 处理指针进入事件
   * @param control 当前控件
   * @returns 如果是首次进入返回true
   */
  _onPointerEnter(control: Control3D): boolean;

  /**
   * 处理指针移出事件
   * @param control 当前控件
   */
  _onPointerOut(control: Control3D): void;

  /**
   * 处理指针按下事件
   * @param control 当前控件
   * @param position 指针位置
   * @param pointerId 指针ID
   * @param buttonIndex 按钮索引
   * @returns 如果是首次按下返回true
   */
  _onPointerDown(
    control: Control3D,
    position: Vector3,
    pointerId: number,
    buttonIndex: number
  ): boolean;

  /**
   * 处理指针抬起事件
   * @param control 当前控件
   * @param position 指针位置
   * @param pointerId 指针ID
   * @param buttonIndex 按钮索引
   * @param notifyClick 是否触发点击事件
   */
  _onPointerUp(
    control: Control3D,
    position: Vector3,
    pointerId: number,
    buttonIndex: number,
    notifyClick: boolean
  ): void;

  /**
   * 强制触发指针抬起事件
   * @param pointerId 指针ID，如果为null则重置所有指针状态
   */
  forcePointerUp(pointerId?: number | null): void;

  /**
   * 处理观察者通知
   * 根据事件类型分发到相应的处理方法
   * @param eventType 指针事件类型
   * @param position 指针位置
   * @param pointerInfo 指针信息
   * @param pointerId 指针ID
   * @param buttonIndex 按钮索引
   * @returns 如果事件被处理返回true
   */
  _processObservables(
    eventType: number,
    position: Vector3,
    pointerInfo: PointerInfo | null,
    pointerId: number,
    buttonIndex: number
  ): boolean;

  /**
   * 释放节点资源
   */
  protected _disposeNode(): void;

  /**
   * 释放控件及其所有资源
   * 清理观察者、节点和行为
   */
  dispose(): void;
}