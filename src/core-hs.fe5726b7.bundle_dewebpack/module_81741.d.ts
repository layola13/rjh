/**
 * HSConstants模块类型定义
 * 
 * 此模块从内部模块470769重新导出HSConstants对象，
 * 并将其挂载到全局对象上供外部访问。
 * 
 * @module module_81741
 * @original-id 81741
 */

/**
 * HSConstants - HubSpot常量集合
 * 
 * 该对象包含HubSpot相关的常量定义。
 * 具体内容取决于模块470769的导出。
 * 
 * @remarks
 * - 此模块会将HSConstants挂载到全局对象(window/global)上
 * - 可通过`globalThis.HSConstants`或模块导入两种方式访问
 */
declare const HSConstants: unknown;

/**
 * 全局命名空间扩展
 * 在全局对象上添加HSConstants属性
 */
declare global {
  /**
   * 全局HSConstants对象引用
   * 包含HubSpot相关的常量配置
   */
  const HSConstants: unknown;
}

export = HSConstants;
export as namespace HSConstants;