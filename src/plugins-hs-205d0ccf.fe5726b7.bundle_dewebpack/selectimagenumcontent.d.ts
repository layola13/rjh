/**
 * 图片数量选择组件的类型定义
 * @module SelectImageNumContent
 */

/**
 * 优惠券数量信息
 */
export interface CouponNumInfo {
  /** 剩余优惠券总数 */
  totalNum: number;
  /** 可选的图片数量列表 */
  imgCountList: number[];
  /** 需要授权的图片数量列表 */
  imgCountAuthList: number[];
}

/**
 * 图片数量选择组件的属性
 */
export interface SelectImageNumContentProps {
  /** 默认选中的图片数量，默认为 1 */
  defaultNum?: number;
  
  /** 
   * 点击选择数量时的回调函数
   * @param selectedNum - 用户选择的图片数量
   */
  onClick: (selectedNum: number) => void;
  
  /**
   * 获取优惠券数量信息的异步函数
   * @returns 返回包含优惠券信息的 Promise
   */
  getCouponNum: () => Promise<CouponNumInfo>;
}

/**
 * 图片数量选择组件
 * 
 * 用于展示可用的图片生成数量选项，并处理用户选择。
 * 支持优惠券授权验证和剩余数量提示。
 * 
 * @param props - 组件属性
 * @returns React 函数组件
 * 
 * @example
 *