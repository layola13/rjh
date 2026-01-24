/**
 * 3D GUI管理器模块
 * 负责管理和协调3D GUI控件的交互、拾取和渲染
 */

import { Observable } from "core/Misc/observable";
import { Scene } from "core/scene";
import { UtilityLayerRenderer } from "core/Rendering/utilityLayerRenderer";
import { PointerInfo, PointerEventTypes } from "core/Events/pointerEvents";
import { PickingInfo } from "core/Collisions/pickingInfo";
import { AbstractMesh } from "core/Meshes/abstractMesh";
import { Vector3 } from "core/Maths/math.vector";
import { Material } from "core/Materials/material";
import { Container3D } from "./controls/container3D";
import { Control3D } from "./controls/control3D";

/**
 * 控件保留数据存储接口
 */
interface ControlReservedDataStore {
  GUI3D?: {
    control?: Control3D;
  };
}

/**
 * 扩展的AbstractMesh接口，包含GUI3D保留数据
 */
interface MeshWithGUI3D extends AbstractMesh {
  reservedDataStore?: ControlReservedDataStore;
}

/**
 * 3D GUI管理器
 * 管理3D空间中的GUI控件，处理用户交互和拾取事件
 */
export declare class GUI3DManager {
  /**
   * MRTK（Mixed Reality Toolkit）真实缩放比例常量
   * 用于在混合现实环境中提供符合人体工程学的控件大小
   */
  static readonly MRTK_REALISTIC_SCALING: number;

  /**
   * 关联的场景对象
   */
  get scene(): Scene;

  /**
   * 用于渲染3D GUI的实用层渲染器
   */
  get utilityLayer(): UtilityLayerRenderer | null;

  /**
   * 控件全局缩放系数
   * 设置此值会自动缩放所有子控件
   */
  get controlScaling(): number;
  set controlScaling(value: number);

  /**
   * 是否使用真实缩放
   * 启用时会应用MRTK_REALISTIC_SCALING比例
   */
  get useRealisticScaling(): boolean;
  set useRealisticScaling(value: boolean);

  /**
   * 根容器，包含所有3D GUI控件
   */
  get rootContainer(): Container3D;

  /**
   * 当拾取点发生变化时触发的可观察对象
   * 通知观察者新的拾取点坐标（如果没有拾取则为null）
   */
  readonly onPickedPointChangedObservable: Observable<Vector3 | null>;

  /**
   * 当发生拾取操作时触发的可观察对象
   * 通知观察者被拾取的网格对象
   */
  readonly onPickingObservable: Observable<AbstractMesh | null>;

  /**
   * 构造函数
   * @param scene - 关联的场景，如果未提供则使用最后创建的场景
   */
  constructor(scene?: Scene);

  /**
   * 检查管理器是否包含指定控件
   * @param control - 要检查的3D控件
   * @returns 如果包含该控件则返回true
   */
  containsControl(control: Control3D): boolean;

  /**
   * 添加3D控件到根容器
   * @param control - 要添加的3D控件
   * @returns 当前管理器实例（支持链式调用）
   */
  addControl(control: Control3D): GUI3DManager;

  /**
   * 从根容器移除3D控件
   * @param control - 要移除的3D控件
   * @returns 当前管理器实例（支持链式调用）
   */
  removeControl(control: Control3D): GUI3DManager;

  /**
   * 释放管理器及其所有资源
   * 包括控件、材质、观察者和实用层
   */
  dispose(): void;

  /**
   * 内部方法：处理指针移出事件
   * @param pointerId - 指针ID
   * @param isPointerUp - 是否为指针抬起事件
   * @private
   */
  private _handlePointerOut(pointerId: number, isPointerUp: boolean): void;

  /**
   * 内部方法：执行拾取操作
   * @param pointerInfo - 指针事件信息
   * @returns 如果成功拾取到控件则返回true
   * @private
   */
  private _doPicking(pointerInfo: PointerInfo): boolean;

  /**
   * 自定义控件缩放系数（内部使用）
   * @private
   */
  private _customControlScaling: number;

  /**
   * 记录每个指针当前悬停的控件
   * @private
   */
  private _lastControlOver: Record<number, Control3D>;

  /**
   * 记录每个指针当前按下的控件
   * @private
   */
  private _lastControlDown: Record<number, Control3D>;

  /**
   * 共享材质缓存（用于优化性能）
   * @private
   */
  private _sharedMaterials: Record<string, Material>;

  /**
   * 触摸交互专用共享材质缓存
   * @private
   */
  private _touchSharedMaterials: Record<string, Material>;

  /**
   * 关联的场景对象（内部引用）
   * @private
   */
  private _scene: Scene;

  /**
   * 场景销毁事件观察者
   * @private
   */
  private _sceneDisposeObserver: Nullable<Observer<Scene>>;

  /**
   * 实用层渲染器（内部引用）
   * @private
   */
  private _utilityLayer: UtilityLayerRenderer | null;

  /**
   * 指针移出事件观察者
   * @private
   */
  private _pointerOutObserver: Nullable<Observer<number>>;

  /**
   * 指针事件观察者
   * @private
   */
  private _pointerObserver: Nullable<Observer<PointerInfo>>;

  /**
   * 根容器（内部引用）
   * @private
   */
  private _rootContainer: Container3D;
}