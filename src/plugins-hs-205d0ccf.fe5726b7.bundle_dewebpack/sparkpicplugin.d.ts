import { HSApp } from './HSApp';
import { Handler } from './Handler';

/**
 * SparkPic插件依赖项列表
 * 包含该插件运行所需的所有其他插件类型
 */
declare const SPARK_PIC_DEPENDENCIES: ReadonlyArray<string>;

/**
 * SparkPic插件配置接口
 */
interface SparkPicPluginConfig {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 插件依赖项数组 */
  dependencies: string[];
}

/**
 * SparkPic插件类
 * 提供Spark Pic图像处理功能的核心插件
 * 
 * @remarks
 * 该插件依赖多个子系统：工具栏、调整大小组件、单间模式、目录、
 * 左侧菜单、上下文工具、属性栏、页面头部、图层编辑、教学能力、
 * 用户信息、SparkPic图像处理、指南针等
 */
export declare class SparkPicPlugin extends HSApp.Plugin.IPlugin {
  /**
   * 内部处理器实例，负责具体业务逻辑
   * @private
   */
  private _handler: Handler;

  /**
   * 构造函数
   * 初始化插件配置和处理器实例
   */
  constructor();

  /**
   * 插件激活回调
   * 当插件被激活时调用，初始化处理器
   * 
   * @param event - 激活事件对象
   * @param context - 插件上下文
   */
  onActive(event: unknown, context: unknown): void;

  /**
   * 插件停用回调
   * 当插件被停用时调用，清理资源
   */
  onDeactive(): void;

  /**
   * 启动插件
   * 开始执行插件的主要功能
   */
  start(): void;

  /**
   * 获取刷新信号
   * 返回用于触发界面刷新的信号对象
   * 
   * @returns 刷新信号对象
   */
  getRefreshSignal(): unknown;

  /**
   * 获取倾斜校正信号
   * 返回用于处理相机倾斜校正的信号对象
   * 
   * @returns 倾斜校正信号对象
   */
  getTiltCorrectionSignal(): unknown;

  /**
   * 设置倾斜校正
   * 更新3D相机的倾斜校正参数
   * 
   * @param correction - 倾斜校正值
   * @returns 更新操作的结果
   */
  setTiltCorrection(correction: unknown): unknown;

  /**
   * 显示应用容器
   * 将插件的UI容器设置为可见状态
   */
  showAppContainer(): void;

  /**
   * 隐藏应用容器
   * 将插件的UI容器设置为隐藏状态
   */
  hideAppContainer(): void;
}

/**
 * HSApp命名空间扩展
 * 为HSApp.Plugin添加类型声明
 */
declare namespace HSApp {
  namespace Plugin {
    /**
     * 插件基类接口
     */
    class IPlugin {
      constructor(config: SparkPicPluginConfig);
    }

    /**
     * 注册插件到插件系统
     * 
     * @param pluginType - 插件类型标识符（来自HSFPConstants.PluginType）
     * @param pluginClass - 插件类构造函数
     */
    function registerPlugin(
      pluginType: string,
      pluginClass: typeof SparkPicPlugin
    ): void;
  }
}

/**
 * HSFPConstants全局常量
 * 包含插件类型定义
 */
declare global {
  const HSFPConstants: {
    PluginType: {
      /** 工具栏插件 */
      Toolbar: string;
      /** 调整大小组件插件 */
      ResizeWidget: string;
      /** 单间模式插件 */
      SingleRoom: string;
      /** 目录插件 */
      Catalog: string;
      /** 左侧菜单插件 */
      LeftMenu: string;
      /** 上下文工具插件 */
      ContextualTools: string;
      /** 属性栏插件 */
      PropertyBar: string;
      /** 页面头部插件 */
      PageHeader: string;
      /** 图层编辑插件 */
      LayerEdit: string;
      /** 教学能力插件 */
      TeachingAbility: string;
      /** 用户信息插件 */
      UserInfo: string;
      /** SparkPic图像插件 */
      SparkPicImage: string;
      /** 指南针插件 */
      Compass: string;
      /** SparkPic主插件 */
      SparkPic: string;
    };
  };
}