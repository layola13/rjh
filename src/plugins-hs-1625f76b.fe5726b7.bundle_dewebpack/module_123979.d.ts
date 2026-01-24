/**
 * 淘宝好货佣金组件
 * 用于在iframe中加载淘宝好货分享页面，并通过postMessage进行跨域通信
 */

import * as React from 'react';

/**
 * 组件属性接口
 */
export interface CommissionDownloadProps {
  /**
   * 商品ID列表，用于查询佣金信息
   */
  seekIds: string[] | number[];
}

/**
 * iframe样式接口
 */
export interface IframeStyle {
  border: number;
  width: number;
  height: number;
}

/**
 * postMessage消息接口
 */
export interface PostMessageData {
  /**
   * 消息标识键
   */
  key: string;
  /**
   * 消息内容值
   */
  value: string[] | number[];
}

/**
 * 淘宝好货佣金下载组件
 * 通过iframe嵌入淘宝好货分享页面，实现商品佣金信息的获取和展示
 * 
 * @example
 *