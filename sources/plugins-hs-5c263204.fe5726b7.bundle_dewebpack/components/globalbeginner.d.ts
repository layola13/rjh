/**
 * GlobalBeginner Component
 * 新手引导弹窗组件，通过iframe嵌入引导页面
 */

import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

/**
 * 组件属性接口
 */
export interface GlobalBeginnerProps {
  /** 屏幕尺寸标识，用于适配不同分辨率 */
  size: 'small' | 'medium' | 'large';
  
  /** 关闭弹窗时的回调函数 */
  onCloseHandler: () => void;
}

/**
 * 组件状态接口
 */
interface GlobalBeginnerState {
  /** 弹窗可见性 */
  visible: boolean;
  
  /** iframe加载状态 */
  loading: boolean;
}

/**
 * 消息事件数据接口
 */
interface MessageEventData {
  /** 事件类型 */
  eType: 'closeIframe' | 'openPayUrl' | 'newDocument' | 'startGuide';
  
  /** 事件携带的数据 */
  eData?: {
    /** 支付审批链接 */
    approveUrl?: string;
    
    /** 引导目的 */
    purpose?: string;
    
    [key: string]: unknown;
  };
}

/**
 * 扩展的MessageEvent接口
 */
interface BeginnerMessageEvent extends MessageEvent {
  data: MessageEventData;
}

/**
 * 全局新手引导组件
 * 
 * 功能说明：
 * - 通过iframe加载新手引导页面
 * - 监听iframe发送的postMessage消息进行交互
 * - 支持关闭引导、打开支付链接、创建新文档、启动引导等操作
 * 
 * @example
 *