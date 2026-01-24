/**
 * 自定义柜体插件请求类型定义
 * 
 * 该模块定义了与自定义柜体相关的插件请求类型常量。
 * 这些常量用于标识不同的插件操作请求。
 */

/**
 * 自定义柜体插件请求类型映射接口
 * 
 * @interface CustomizedCabinetPluginRequests
 */
export interface CustomizedCabinetPluginRequests {
  /**
   * 调整台面上内容的请求类型
   * 
   * 用于触发调整放置在台面(CounterTop)上的内容的操作请求
   * 
   * @type {string}
   * @readonly
   */
  readonly AdjustContentOnCounterTop: "hsw.plugin.customizedcabinet.AdjustContentOnCounterTopRequest";
}

/**
 * 自定义柜体插件请求类型常量对象
 * 
 * @constant
 * @type {Readonly<CustomizedCabinetPluginRequests>}
 */
declare const customizedCabinetPluginRequests: Readonly<CustomizedCabinetPluginRequests>;

export default customizedCabinetPluginRequests;