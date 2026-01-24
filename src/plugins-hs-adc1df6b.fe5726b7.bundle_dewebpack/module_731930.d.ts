/**
 * 楼梯模块工具函数类型声明
 * Module: module_731930
 */

import type { HSCore } from 'HSCore';
import type { HSApp } from 'HSApp';
import type { HSFPConstants } from 'HSFPConstants';
import type { HSCatalog } from 'HSCatalog';

/**
 * 材质数据映射类型
 */
export type MaterialDataMap = Map<string, HSCore.Material.MixPaint | Record<string, unknown>>;

/**
 * 用户权益信息接口
 */
export interface UserBenefitInfo {
  /** 权益是否可用 */
  useful?: boolean;
}

/**
 * 用户信息接口
 */
export interface UserInfo {
  /** 会员信息 */
  memberInfo?: {
    /** 会员类型 */
    memberType: HSFPConstants.GlobalMemberType;
    /** 是否有效会员 */
    validMember?: boolean;
  };
  /** 是否为企业用户 */
  isEnterprise?: boolean;
  /** 是否为公寓定制UI */
  apartmentCustomizedUI?: boolean;
  /**
   * 检查用户权益
   * @param benefit - 权益名称
   * @returns 权益信息
   */
  checkBenefit(benefit: string): UserBenefitInfo | undefined;
}

/**
 * 全局用户对象
 */
declare global {
  const adskUser: UserInfo;
}

/**
 * 检查当前用户是否为VIP会员
 * 
 * @returns 如果用户是以下任一情况则返回true：
 * - 拥有楼梯模型使用权益
 * - 会员类型为Pro或Master
 * - 企业有效会员
 * - 公寓定制UI用户
 */
export function isVip(): boolean;

/**
 * 弹出VIP权益提示框
 * 
 * 如果用户已经是VIP则不执行任何操作。
 * 否则显示营销徽章插件的会员模态框。
 */
export function popVip(): void;

/**
 * 替换模型材质
 * 
 * 支持以下模型类型：
 * - NCustomizedFeatureModel（自定义特征模型）
 * - NCustomizedModelMolding（自定义模型造型）
 * - 其他自定义模型
 * 
 * @param model - 需要替换材质的模型对象
 * @param meshKeys - 需要应用材质的网格键数组
 * @param catalogMeta - 材质目录元数据
 * @param skipTransaction - 是否跳过事务处理，默认为false
 * 
 * @remarks
 * - 对于墙纸类型（Wallwrap），会自动计算投影平面和瓦片尺寸
 * - 替换完成后会自动刷新上下文工具、属性栏和材质图片缓存
 */
export function replaceMaterial(
  model: HSCore.Model.NCustomizedFeatureModel | HSCore.Model.NCustomizedModelMolding | HSCore.Model.CustomizedModel,
  meshKeys: string[],
  catalogMeta: HSCatalog.CatalogMeta,
  skipTransaction?: boolean
): void;

/**
 * 记录楼梯操作日志
 * 
 * 用于追踪用户在属性面板中对楼梯样式的修改操作。
 * 
 * @param eventId - 事件ID
 * @param eventName - 事件名称
 * 
 * @remarks
 * 日志包含以下信息：
 * - 描述：修改楼梯属性
 * - 活动区域：StairStyleReplace（属性面板替换楼梯操作）
 * - 点击率统计：包含事件ID和名称
 */
export function stairLogger(eventId: string, eventName: string): void;