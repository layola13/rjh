/**
 * 插件类型枚举
 * 定义系统中可用的插件类型
 */
declare enum HSFPConstants {
  PluginType = "PluginType"
}

declare namespace HSFPConstants {
  /**
   * 插件类型定义
   */
  enum PluginType {
    /** 自定义建模插件 */
    CustomizedModeling = "CustomizedModeling"
  }
}

/**
 * 自定义建模插件接口
 * 处理与材质和建模相关的UI交互
 */
interface ICustomizedModelingPlugin {
  /**
   * 处理UI中"添加材质"按钮的点击事件
   * 当用户在界面上点击添加材质按钮时触发此方法
   * 
   * @returns {void}
   */
  onUIAddMaterialBtnClk(): void;
}

/**
 * 基础插件接口
 * 所有插件的通用接口
 */
interface IPlugin {
  // 可根据实际需求扩展通用插件属性和方法
}

/**
 * 插件管理器接口
 * 负责管理和检索系统中的各种插件
 */
interface IPluginManager {
  /**
   * 根据插件类型获取对应的插件实例
   * 
   * @template T - 插件实例的类型
   * @param {HSFPConstants.PluginType} pluginType - 要获取的插件类型
   * @returns {T} 对应类型的插件实例
   * 
   * @example
   *