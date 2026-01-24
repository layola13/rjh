/**
 * DiffTool插件模块
 * 提供差异对比工具的高亮显示、视图控制和角落标记功能
 */

import { BaseDiffToolPlugin } from './BaseDiffToolPlugin';
import { DiffCWViewController } from './DiffCWViewController';
import { HSFPConstants } from './constants';
import { HSApp } from './HSApp';
import { DiffToolGizmoUtil } from './DiffToolGizmoUtil';

/**
 * 插件配置选项
 */
interface PluginConfig {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 插件依赖项列表 */
  dependencies: string[];
}

/**
 * 场景图层对象
 */
interface SceneLayer {
  /** 图层ID */
  id: string;
  /** 图层名称 */
  name?: string;
  /** 图层可见性 */
  visible: boolean;
}

/**
 * 高亮Gizmo对象
 */
interface HighLightGizmo {
  /** Gizmo唯一标识 */
  id: string;
  /** 是否可见 */
  visible: boolean;
  /** 销毁方法 */
  destroy(): void;
}

/**
 * 暴露角落Gizmo对象
 */
declare class ExposedCornerGizmo {
  /**
   * 创建暴露角落Gizmo
   * @param param1 - 第一个参数
   * @param param2 - 第二个参数
   * @param param3 - 第三个参数
   * @param param4 - 第四个参数
   * @param param5 - 第五个参数
   */
  constructor(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown,
    param5: unknown
  );

  /** 销毁Gizmo */
  destroy(): void;
}

/**
 * DiffTool插件类
 * 继承自BaseDiffToolPlugin，提供差异对比工具的核心功能
 */
declare class DiffToolPlugin extends BaseDiffToolPlugin {
  /** 差异对比视图控制器 */
  private _diffCWViewController: DiffCWViewController;

  /**
   * 构造函数
   * 初始化插件配置和视图控制器
   */
  constructor();

  /**
   * 创建差异工具高亮Gizmo
   * @param param1 - 高亮目标对象
   * @param param2 - 高亮颜色或样式
   * @param param3 - 高亮范围
   * @param param4 - 附加选项
   * @returns 高亮Gizmo实例
   */
  createDiffToolHighLightGizmo(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown
  ): HighLightGizmo;

  /**
   * 创建暴露角落Gizmo
   * @param param1 - 角落位置
   * @param param2 - 角落类型
   * @param param3 - 角落尺寸
   * @param param4 - 角落样式
   * @param param5 - 附加配置
   * @returns 暴露角落Gizmo实例
   */
  createExposedCornerGizmo(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown,
    param5: unknown
  ): ExposedCornerGizmo;

  /**
   * 创建差异对比视图
   * @param container - 视图容器元素或配置
   */
  createDiffCWView(container: unknown): void;

  /**
   * 设置差异对比视图的可见性
   * @param visible - 是否可见
   * @param layer - 目标场景图层（可选，默认使用活动图层）
   */
  setDiffCWViewVisibility(visible: boolean, layer?: SceneLayer): void;

  /**
   * 销毁差异对比视图
   * @param options - 销毁选项
   */
  destroyDiffCW(options: unknown): void;
}

/**
 * 插件注册命名空间
 */
declare namespace HSApp {
  namespace Plugin {
    /**
     * 注册插件到应用程序
     * @param pluginName - 插件唯一标识名称
     * @param pluginClass - 插件类构造函数
     */
    function registerPlugin(
      pluginName: string,
      pluginClass: new () => DiffToolPlugin
    ): void;
  }
}

/**
 * 导出插件类供外部使用
 */
export { DiffToolPlugin, ExposedCornerGizmo };
export type { PluginConfig, SceneLayer, HighLightGizmo };