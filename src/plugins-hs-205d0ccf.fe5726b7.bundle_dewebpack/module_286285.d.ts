/**
 * 任务中心模块
 * 提供任务配置获取、验证和状态更新功能
 */

/**
 * 任务代码枚举类型
 * 从依赖模块 372714 导入
 */
export declare enum TaskCode {
  // 具体值需要参考 module 372714 的定义
}

/**
 * 任务配置响应数据结构
 */
export interface TaskConfigData {
  [key: string]: unknown;
}

/**
 * MTOP API 响应结构
 */
export interface MtopResponse<T = unknown> {
  data: {
    msg: string;
    data: T | null;
  };
}

/**
 * 获取任务中心配置
 * 
 * @returns Promise，成功时返回配置数据，失败时返回 null
 * @example
 * const config = await getConfig();
 * if (config) {
 *   console.log('配置加载成功', config);
 * }
 */
export declare function getConfig(): Promise<TaskConfigData | null>;

/**
 * 验证当前 URL 查询参数中的任务代码是否合法
 * 
 * 从 URL 的 taskcode 参数中提取任务代码，
 * 并检查是否在 TaskCode 枚举的有效值范围内
 * 
 * @returns 如果任务代码合法返回 true，否则返回 false 并在控制台输出错误
 * @example
 * if (isTaskLegal()) {
 *   // 执行任务相关逻辑
 * } else {
 *   // 处理非法任务
 * }
 */
export declare function isTaskLegal(): boolean;

/**
 * 上传/更新任务状态
 * 
 * 调用 MTOP 接口更新指定任务代码的状态
 * 
 * @param taskCode - 要更新的任务代码
 * @returns void
 * @example
 * uploadTask('DAILY_SIGNIN');
 */
export declare function uploadTask(taskCode: string): void;

/**
 * 全局 NWTK 对象声明
 */
declare global {
  interface Window {
    NWTK: {
      mtop: {
        TaskCenter: {
          /**
           * 获取任务中心配置
           */
          getConfig(params: Record<string, never>): Promise<MtopResponse<TaskConfigData>>;
          
          /**
           * 更新任务状态
           */
          updatetaskstatus(params: {
            data: {
              taskCode: string;
            };
          }): void;
        };
      };
    };
    
    HSApp: {
      Util: {
        Url: {
          /**
           * 获取 URL 查询参数
           */
          getQueryStrings(): Record<string, string>;
        };
      };
    };
  }
  
  const NWTK: Window['NWTK'];
  const HSApp: Window['HSApp'];
}