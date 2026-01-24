/**
 * 自动本地持久化任务
 * 负责将设计数据自动保存到本地存储
 */

import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

/**
 * 任务执行上下文
 */
interface TaskContext {
  /** 设计ID，如果存在则跳过自动保存 */
  designId?: string;
  /** 设计数据 */
  data: Record<string, unknown>;
  /** 文件扩展名 */
  ext: string;
}

/**
 * 任务执行结果
 */
interface TaskResult {
  /** 执行状态 */
  status: 'success' | 'error';
}

/**
 * 自动本地持久化任务类
 * 用于将平面图设计数据自动保存到本地存储中
 */
export class AutoLocalPersisterTask {
  /** 自动保存存储实例 */
  private readonly autoSaveStorage: HSApp.Util.Storage;

  /**
   * 构造函数
   * 初始化带压缩功能的本地存储
   */
  constructor() {
    this.autoSaveStorage = new HSApp.Util.Storage('hsw.app', {
      compress: true,
    });
  }

  /**
   * 执行自动保存任务
   * @param _event - 事件对象（未使用）
   * @param context - 任务上下文，包含设计数据和元信息
   * @returns Promise，解析为任务执行结果
   */
  execute(_event: unknown, context: TaskContext): Promise<TaskResult> {
    // 如果已存在设计ID，说明是已保存的设计，无需自动保存
    if (context.designId) {
      return Promise.resolve({ status: 'success' });
    }

    const app = HSApp.App.getApp();
    
    // 合并设计数据和扩展名
    const designData = {
      ...context.data,
      ext: context.ext,
    };

    // 将设计数据序列化为JSON字符串
    const jsonString = app.floorplan.jsonToString(designData);

    // 使用Web Worker处理数据（可能用于压缩或其他处理）
    return new Promise<string>((resolve, reject) => {
      const worker = new Worker(/* worker script path */);
      
      worker.onmessage = (event: MessageEvent<string>) => {
        resolve(event.data);
      };
      
      worker.onerror = (error: ErrorEvent) => {
        reject(error);
      };
      
      worker.postMessage(jsonString);
    }).then((processedData: string) => {
      // 使用平面图元数据的魔术值作为存储键
      const storageKey = `design.${HSCore.Doc.FloorplanMeta.magic}`;
      
      // 将处理后的数据保存到本地存储
      this.autoSaveStorage.set(storageKey, processedData, true);
      
      return { status: 'success' };
    });
  }
}