/**
 * 配置模块
 * 
 * 包含应用程序的全局配置选项
 */

/**
 * 应用程序配置接口
 */
export interface Config {
  /**
   * FGI（前景图像）功能开关
   * 
   * @default true
   */
  FgiEnable: boolean;

  /**
   * 剪切背景墙功能开关
   * 
   * @default true
   */
  ClipBackgroundWallEnable: boolean;
}

/**
 * 默认配置对象
 * 
 * 导出包含所有默认启用功能的配置实例
 */
export declare const Config: Config;