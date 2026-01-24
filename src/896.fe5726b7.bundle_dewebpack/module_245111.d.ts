/**
 * VIP用户配置模块
 * 提供不同VIP等级的UI配置和状态处理
 */

import React from 'react';

/** VIP状态类型 */
export type VipStatus = 'in_use' | 'finished' | 'not_started';

/** VIP等级类型 */
export type VipLevel = 'notVip' | 'base' | 'high';

/** 用户VIP信息接口 */
export interface UserVipInfo {
  /** VIP状态 */
  status: VipStatus;
  /** 是否即将过期 */
  isAboutToExpire: boolean;
  /** VIP等级 */
  level?: VipLevel;
  /** 过期时间 */
  expireTime?: number;
}

/** 标题样式配置 */
export interface TitleStyle {
  /** 标题名称（国际化key） */
  name?: string;
  /** 文字颜色 */
  color?: string;
}

/** 用户信息项样式配置 */
export interface UserInfoItemStyle {
  /** 背景渐变或颜色 */
  background?: string;
  /** 边框样式 */
  border?: string;
}

/** 浮动按钮信息配置 */
export interface FloatButtonInfo {
  /** 背景渐变色数组 [起始色, 结束色] */
  background: [string, string];
  /** 图标资源 */
  icon: string;
  /** 按钮文本 */
  text: string;
  /** 右侧图标颜色 */
  rightIconColor: string;
}

/** VIP等级配置接口 */
export interface VipLevelConfig {
  /** VIP等级名称（国际化key） */
  name: string;
  
  /** VIP图标资源（可以是单个图标或状态映射） */
  icon: string | {
    /** 使用中的图标 */
    in_use: string;
    /** 已过期的图标 */
    finished: string;
  };
  
  /**
   * 获取用户信息标题配置
   * @param userVipInfo - 用户VIP信息
   * @returns 标题样式配置
   */
  userInfoTitle: (userVipInfo: UserVipInfo) => TitleStyle;
  
  /**
   * 获取用户信息CSS类名
   * @param userVipInfo - 用户VIP信息
   * @returns CSS类名或undefined
   */
  getUserInfoClassName: (userVipInfo: UserVipInfo) => string | undefined;
  
  /**
   * 获取用户信息项内联样式
   * @param userVipInfo - 用户VIP信息
   * @returns 样式对象
   */
  getUserInfoItemStyle: (userVipInfo: UserVipInfo) => UserInfoItemStyle;
  
  /**
   * 获取用户信息底部内容
   * @param userVipInfo - 用户VIP信息
   * @returns React元素或null
   */
  getUserInfoBottom?: (userVipInfo: UserVipInfo) => React.ReactElement | string | null;
  
  /**
   * 获取用户信息顶部右侧图标
   * @param userVipInfo - 用户VIP信息
   * @returns React元素
   */
  getUserInfoTopRightIcon?: (userVipInfo: UserVipInfo) => React.ReactElement;
  
  /**
   * 获取浮动按钮配置信息
   * @param userVipInfo - 用户VIP信息
   * @returns 浮动按钮配置或false
   */
  getFloatButtonInfo: (userVipInfo: UserVipInfo) => FloatButtonInfo | false;
}

/**
 * 根据VIP等级获取对应配置
 * @param level - VIP等级标识
 * @returns VIP等级配置对象
 */
export declare function getConfig(level: string): VipLevelConfig;

/**
 * 获取用户信息底部显示内容
 * @param userVipInfo - 用户VIP信息
 * @returns React元素或null（已过期时返回null，即将过期时显示过期提示）
 */
export declare function getUserInfoBottom(userVipInfo: UserVipInfo): React.ReactElement | null;

/**
 * 获取用户信息顶部右侧图标
 * @param userVipInfo - 用户VIP信息
 * @returns React元素（续费按钮或箭头图标）
 */
export declare function getUserInfoTopRightIcon(userVipInfo: UserVipInfo): React.ReactElement;