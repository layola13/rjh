/**
 * Module: module_set
 * Original ID: set
 * 
 * 配置模块，用于设置轮询间隔
 */

/**
 * 设置轮询间隔的配置类
 */
declare class ModuleSet {
  /**
   * 轮询间隔时间（毫秒）
   * @private
   */
  private _pollInterval: number;

  /**
   * 设置轮询间隔
   * @param interval - 轮询间隔时间，单位为毫秒
   */
  setPollInterval(interval: number): void;
}

export default ModuleSet;