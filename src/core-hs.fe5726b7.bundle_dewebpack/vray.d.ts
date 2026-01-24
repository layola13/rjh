/**
 * Vray光照导出模块
 * 提供Vray渲染器的光照导出、模板管理和房间查找功能
 * @module Vray
 */

/**
 * Vray类型名称枚举
 * 定义Vray渲染器支持的各种光源和对象类型
 */
export enum VrayTypeNameEnum {
  // 具体枚举值需要从源模块54006获取
}

/**
 * 根据相机查找对应的房间
 * @param camera - 相机对象
 * @returns 找到的房间对象，如果未找到则返回null
 */
export function findRoomByCamera(camera: unknown): unknown;

/**
 * 检查是否为V3版本模板
 * @param template - 待检查的模板对象
 * @returns 如果是V3模板返回true，否则返回false
 */
export function isTemplateV3(template: unknown): boolean;

/**
 * 检查是否已应用V3版本模板
 * @param target - 待检查的目标对象
 * @returns 如果已应用V3模板返回true，否则返回false
 */
export function isAppliedTemplateV3(target: unknown): boolean;

/**
 * 检查是否为空模板
 * @param template - 待检查的模板对象
 * @returns 如果是空模板返回true，否则返回false
 */
export function isEmptyTemplate(template: unknown): boolean;

/**
 * 检查是否已应用空模板
 * @param target - 待检查的目标对象
 * @returns 如果已应用空模板返回true，否则返回false
 */
export function isAppliedEmptyTemplate(target: unknown): boolean;

/**
 * 同步光照组
 * 用于同步场景中的光照分组配置
 * @param lightGroup - 光照组配置对象
 */
export function syncLightGroup(lightGroup: unknown): void;

/**
 * 获取V3模板属性
 * @param template - 模板对象
 * @param propertyName - 属性名称
 * @returns 模板中指定的属性值
 */
export function getTemplateV3Property(template: unknown, propertyName: string): unknown;

/**
 * 获取模板的默认阳光配置
 * @param template - 模板对象
 * @returns 默认阳光光源配置
 */
export function getDefaultSunlightForTemplate(template: unknown): unknown;

/**
 * Vray光照导出器
 * 负责将场景光照数据导出为Vray渲染器可识别的格式
 */
export namespace VrayLightExporter {
  // 导出器的具体接口和类型需要从源模块54006获取
}