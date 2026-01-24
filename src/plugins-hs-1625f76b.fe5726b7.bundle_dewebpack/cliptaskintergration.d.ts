/**
 * 剪切任务集成管理器
 * 用于处理背景墙等参数化元素的剪切任务调度和UI提示
 */
export declare class ClipTaskIntergration {
  /**
   * 单例实例
   * @private
   */
  private static _ins?: ClipTaskIntergration;

  /**
   * 信号钩子，用于监听和管理剪切任务信号
   * @private
   */
  private _signalHook: HSCore.Util.SignalHook<ClipTaskIntergration>;

  /**
   * 构造函数
   * 初始化信号钩子实例
   */
  constructor();

  /**
   * 获取ClipTaskIntergration单例实例
   * @returns ClipTaskIntergration实例
   */
  static getInstance(): ClipTaskIntergration;

  /**
   * 延迟执行剪切任务
   * 使用requestIdleCallback在浏览器空闲时执行任务，提升性能
   * @param callback - 待执行的回调函数
   * @param shouldDispatchSignal - 是否触发剪切任务信号（默认false）
   */
  runClipTaskDefer(callback: () => void, shouldDispatchSignal?: boolean): void;

  /**
   * 检查宿主对象上是否存在背景墙
   * @param entity - 包含宿主对象的实体
   * @returns 如果宿主墙体上存在参数化背景墙或背景墙单元则返回true
   * @private
   */
  private _existBackgroundWallOnHost(entity: { host?: HSCore.Model.Wall }): boolean;

  /**
   * 监听剪切任务信号
   * 显示加载提示UI并跟踪任务执行时间
   * @param tipMessage - 提示信息文本（默认使用资源管理器中的插件提示文本）
   */
  listenClipTaskSignal(tipMessage?: string): void;

  /**
   * 停止监听剪切任务信号
   * 禁用剪切任务管理器并清除所有信号监听
   */
  unlistenClipTaskSignal(): void;

  /**
   * 判断是否需要显示剪切相关UI
   * @param target - 目标实体对象（Entity、Opening或ParametricOpening）
   * @returns 如果实体有障碍物信息或开口所在墙体存在背景墙则返回true
   */
  isNeedShowUI(target: HSCore.Model.Entity | HSCore.Model.Opening | HSCore.Model.ParametricOpening): boolean;
}

/**
 * HSCore全局命名空间类型定义
 */
declare global {
  namespace HSCore {
    namespace Util {
      /**
       * 信号钩子类
       * 用于事件监听和管理
       */
      class SignalHook<T> {
        constructor(owner: T);
        listen<D>(signal: Signal<D>, handler: (event: SignalEvent<D>) => void): void;
        unlistenAll(): void;
      }

      /**
       * 信号类
       */
      interface Signal<T> {
        dispatch(data: T): void;
      }

      /**
       * 信号事件
       */
      interface SignalEvent<T> {
        data: T;
      }

      /**
       * 剪切任务管理器
       */
      namespace NCPClipTaskManager {
        const clipTaskSignal: Signal<ClipTaskSignalData>;
        function enable(): void;
        function disable(): void;
      }

      /**
       * 剪切任务信号数据
       */
      interface ClipTaskSignalData {
        show?: boolean;
        state?: NCPClipTaskManagerState;
      }

      /**
       * 剪切任务管理器状态枚举
       */
      enum NCPClipTaskManagerState {
        Finished = 'Finished'
      }

      /**
       * 自定义特征模型工具类
       */
      namespace NCustomizedFeatureModel {
        function getObstacleInfos(entity: HSCore.Model.Entity): unknown[];
      }
    }

    namespace Model {
      /**
       * 墙体模型
       */
      class Wall {
        faces: Record<string, Record<string, Face>>;
      }

      /**
       * 面模型
       */
      interface Face {
        contents: Record<string, WallContent>;
      }

      /**
       * 墙体内容基类
       */
      type WallContent = NCustomizedParametricBackgroundWall | NCPBackgroundWallUnit | unknown;

      /**
       * 参数化背景墙
       */
      class NCustomizedParametricBackgroundWall {}

      /**
       * 背景墙单元
       */
      class NCPBackgroundWallUnit {}

      /**
       * 实体模型
       */
      class Entity {}

      /**
       * 开口模型
       */
      class Opening {
        host?: Wall;
      }

      /**
       * 参数化开口模型
       */
      class ParametricOpening {
        host?: Wall;
      }
    }
  }

  /**
   * 资源管理器
   */
  namespace ResourceManager {
    function getString(key: string): string;
  }

  /**
   * 实时提示UI
   */
  namespace LiveHint {
    enum statusEnum {
      loading = 'loading'
    }

    interface ShowOptions {
      status?: statusEnum;
      animation?: boolean;
    }

    function show(message: string, param2?: unknown, param3?: unknown, options?: ShowOptions): void;
    function hide(): void;
  }

  /**
   * 浏览器空闲回调参数
   */
  interface IdleDeadline {
    timeRemaining(): number;
  }

  function requestIdleCallback(callback: (deadline: IdleDeadline) => void): number;
}