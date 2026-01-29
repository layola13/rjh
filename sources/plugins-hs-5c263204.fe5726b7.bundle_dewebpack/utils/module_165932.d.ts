/**
 * 环境管理模块的类型定义
 * 用于处理不同环境类型的选择和显示
 */

/**
 * 环境类型到类别ID的映射配置
 */
interface EnvironmentCategoryMap {
  [HSFPConstants.Environment.Default]: 0;
  [HSFPConstants.Environment.NCustomizedCeilingModel]: 2;
  [HSFPConstants.Environment.NCustomizedBackgroundWall]: 2;
  [HSFPConstants.Environment.NCustomizedPlatform]: 2;
  [HSFPConstants.Environment.CustomizedPM]: 3;
  [HSFPConstants.Environment.TPZZCabinet]: 4;
  [HSFPConstants.Environment.MixPaint]: 5;
  [HSFPConstants.Environment.ConcealedWorkV2]: 6;
  [HSFPConstants.Environment.Render]: 7;
}

/**
 * UI管理器接口
 * 负责模型的显示和关闭
 */
interface UIManager {
  /**
   * 初始化UI组件
   */
  init(): void;

  /**
   * 显示模型
   * @param model - 要显示的模型数据
   * @param category - 类别ID，决定显示方式
   */
  showModel(model: unknown, category: number): void;

  /**
   * 关闭当前显示的模型
   */
  closeModel(): void;
}

/**
 * 环境管理器类
 * 管理不同环境类型的激活和UI显示
 */
export default class EnvironmentManager {
  /**
   * UI管理器实例
   */
  ui: UIManager;

  /**
   * 应用程序实例引用
   * @private
   */
  private _app: typeof HSApp.App;

  /**
   * 信号钩子，用于监听环境变化
   * @private
   */
  private _signalHook: HSCore.Util.SignalHook;

  /**
   * 当前选中的类别ID
   */
  selectedCategory: number;

  /**
   * 初始化环境管理器
   * 设置应用实例、信号监听和UI
   */
  init(): void;

  /**
   * 环境激活时的回调处理
   * 根据当前激活的环境ID更新选中的类别
   * @private
   */
  private onEnvActivated(): void;

  /**
   * 显示指定模型
   * @param model - 要显示的模型数据
   * @param category - 可选的类别ID，默认使用当前选中的类别
   */
  showModel(model: unknown, category?: number): void;

  /**
   * 关闭当前显示的模型
   */
  closeModel(): void;
}