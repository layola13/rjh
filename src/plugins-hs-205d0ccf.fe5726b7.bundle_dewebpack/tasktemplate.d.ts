/**
 * 任务模板模块
 * 定义任务中心的任务配置和交互逻辑
 */

import { TaskCode } from './TaskCode';
import { uploadTask } from './uploadTask';
import { closeTips } from './utils';

/**
 * 任务模板配置项接口
 */
interface ITaskTemplateConfig {
  /** 任务代码标识 */
  taskCode: TaskCode;
  
  /**
   * 显示任务提示
   * 根据DOM元素位置展示引导提示框
   */
  showHint?: () => void;
  
  /**
   * 监听任务相关事件
   * 注册信号监听器以追踪任务进度
   */
  listen?: () => void;
  
  /**
   * 执行任务下一步操作
   * @param step - 步骤索引，默认为0
   */
  nextStep?: (step?: number) => void;
}

/**
 * 任务模板配置数组
 * 包含全景渲染、导入平面图、灵感库应用等任务的完整配置
 */
export declare const TaskTemplate: ReadonlyArray<ITaskTemplateConfig>;

/**
 * 全景渲染任务配置
 */
interface IPanoramaRenderTask extends ITaskTemplateConfig {
  taskCode: TaskCode.panoramarender;
  listen: () => void;
}

/**
 * 导入平面图任务配置
 */
interface IImportFloorplanTask extends ITaskTemplateConfig {
  taskCode: TaskCode.importfloorplan;
  showHint: () => void;
  listen: () => void;
  nextStep: (step?: number) => void;
}

/**
 * 灵感库应用任务配置
 */
interface IInspirationLibraryTask extends ITaskTemplateConfig {
  taskCode: TaskCode.inspirationlibraryapply;
  showHint: () => void;
  listen: () => void;
  nextStep: (step?: number) => void;
}

/**
 * 任务中心插件接口
 */
interface ITaskCenterPlugin {
  /** 全景渲染完成信号 */
  panoramarenderSignal: ISignal<{ type?: string }>;
  
  /** 导入平面图完成信号 */
  importFloorplanSignal?: ISignal<void>;
  
  /** 灵感库操作信号 */
  inspirationLibrarySignal?: ISignal<void>;
  
  /**
   * 显示提示框
   * @param options - 提示框配置
   * @param step - 可选的步骤索引
   */
  showHint(options: { rec: DOMRect }, step?: number): void;
  
  /**
   * 进入下一步
   * @param step - 步骤编号
   */
  nextStep(step: number): void;
}

/**
 * 信号接口（观察者模式）
 * @template T - 信号携带的数据类型
 */
interface ISignal<T> {
  /**
   * 监听信号
   * @param callback - 信号触发时的回调函数
   */
  listen(callback: (event: { data: T }) => void): void;
}

/**
 * 环境管理器接口
 */
interface IEnvironmentManager {
  /** 环境激活信号 */
  signalEnvironmentActivated: ISignal<{
    newEnvironmentId: string;
    oldEnvironmentId: string;
  }>;
}

/**
 * 目录信号管理器接口
 */
interface ICatalogSignalManager {
  /** 目录头部点击信号 */
  signalCatalogHeaderClick: ISignal<{
    menuData: { id: string };
  }>;
}