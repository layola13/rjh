/**
 * Vray光照导出模块
 * 提供Vray渲染引擎的光照配置、模板管理和导出功能
 */

/**
 * 根据相机查找所属房间
 * @param camera - 相机对象
 * @returns 返回相机所在的房间信息
 */
export function findRoomByCamera(camera: unknown): unknown;

/**
 * 判断是否为V3版本模板
 * @param template - 模板对象
 * @returns 如果是V3模板返回true，否则返回false
 */
export function isTemplateV3(template: unknown): boolean;

/**
 * 判断是否已应用V3版本模板
 * @param template - 模板对象
 * @returns 如果已应用V3模板返回true，否则返回false
 */
export function isAppliedTemplateV3(template: unknown): boolean;

/**
 * 判断是否为空模板
 * @param template - 模板对象
 * @returns 如果是空模板返回true，否则返回false
 */
export function isEmptyTemplate(template: unknown): boolean;

/**
 * 判断是否已应用空模板
 * @param template - 模板对象
 * @returns 如果已应用空模板返回true，否则返回false
 */
export function isAppliedEmptyTemplate(template: unknown): boolean;

/**
 * 同步光照组配置
 * @param lightGroup - 光照组对象
 */
export function syncLightGroup(lightGroup: unknown): void;

/**
 * 获取V3模板的属性值
 * @param template - V3模板对象
 * @param propertyName - 属性名称
 * @returns 返回指定的属性值
 */
export function getTemplateV3Property(template: unknown, propertyName: string): unknown;

/**
 * 获取模板的默认阳光配置
 * @param template - 模板对象
 * @returns 返回默认阳光光源配置
 */
export function getDefaultSunlightForTemplate(template: unknown): unknown;

/**
 * Vray光源类型枚举
 */
export enum VrayTypeNameEnum {
  // 具体枚举值需要根据实际实现补充
}

/**
 * Vray光照导出器命名空间
 * 包含所有光照导出相关的类型和函数
 */
export namespace VrayLightExporter {
  export { VrayTypeNameEnum };
  // 其他导出的类型和函数
}

/**
 * 默认导出：Vray光照导出器
 */
export { VrayLightExporter };