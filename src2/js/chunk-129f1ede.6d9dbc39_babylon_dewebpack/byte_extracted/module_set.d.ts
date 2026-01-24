/**
 * MTL文件加载器配置模块
 * 用于控制材质纹理的Y轴反转行为
 * @module module_set
 */

declare namespace MTLFileLoader {
  /**
   * 控制纹理Y轴是否反转
   * 
   * @description
   * 在某些3D应用程序中，纹理坐标系统的Y轴方向可能不同。
   * 此属性允许在加载MTL材质文件时反转纹理的Y轴坐标。
   * 
   * @defaultValue false
   * @example
   *