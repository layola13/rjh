import React from 'react';

/**
 * 租户类型枚举
 */
export enum TenantType {
  /** FP租户 */
  FP = 'fp',
  /** EZHome租户 */
  EZHOME = 'ezhome'
}

/**
 * 新手引导组件的属性接口
 */
export interface GuideGlobalProps {
  /**
   * 退出引导的回调函数
   */
  exitGuide: () => void;

  /**
   * 显示引导的回调函数
   */
  showGuide: () => void;
}

/**
 * 全局新手引导组件
 * 
 * 根据租户类型展示不同的引导背景，提供复制设计和退出引导功能
 * 
 * @param props - 组件属性
 * @returns React元素
 */
declare function GuideGlobal(props: GuideGlobalProps): React.ReactElement;

export default GuideGlobal;