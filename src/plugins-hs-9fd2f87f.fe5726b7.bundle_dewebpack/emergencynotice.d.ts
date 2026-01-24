/**
 * 紧急通知组件模块
 * 用于显示可拖拽的紧急公告通知
 */

import { CSSProperties, ReactElement } from 'react';

/**
 * 紧急通知数据接口
 */
export interface EmergencyNoticeData {
  /** 通知标题 */
  title: string;
  
  /** 通知消息内容 */
  message: string;
  
  /** 详情链接URL (可选) */
  detailsUrl?: string;
}

/**
 * 可拖拽模态框配置接口
 */
export interface DraggableModalConfig {
  /** 初始宽度 (像素) */
  initialWidth: number;
  
  /** 初始高度 (像素) */
  initialHeight: number;
  
  /** 拖拽配置 */
  draggable: {
    /** 拖拽手柄选择器 */
    handle: string;
    
    /** 取消拖拽的区域选择器 */
    cancel: string;
    
    /** 拖拽开始回调 */
    onStart: () => void;
    
    /** 拖拽结束回调 */
    onStop: () => void;
    
    /** 拖拽图标元素 */
    icon: ReactElement;
  };
  
  /** 边界限制配置 */
  bounds: {
    /** 顶部边界 (像素) */
    top: number;
    
    /** 左侧边界 (像素) */
    left: number;
    
    /** 底部边界 (像素) */
    bottom: number;
    
    /** 右侧边界 (像素) */
    right: number;
  };
  
  /** 工具栏位置 */
  barPosition: 'left' | 'right' | 'top' | 'bottom';
  
  /** 缩放配置 */
  zoomable: {
    /** 高度配置函数 */
    height: () => {
      /** 最小高度 (像素) */
      min: number;
    };
  };
  
  /** 拖拽轴向限制 */
  axis: 'x' | 'y' | 'both';
  
  /** 内容是否自动调整大小 */
  contentAutoSize: boolean;
}

/**
 * 紧急通知组件属性接口
 */
export interface EmergencyNoticeProps {
  /** 通知数据 */
  data: EmergencyNoticeData;
  
  /** 关闭通知的回调函数 */
  handleClose: () => void;
}

/**
 * 图标视图组件属性接口
 */
export interface IconfontViewProps {
  /** 图标类型标识 */
  showType: string;
  
  /** 自定义样式 */
  customStyle?: CSSProperties;
  
  /** 背景扩展尺寸 (像素) */
  bgExtendSize?: number;
  
  /** 图标点击回调 */
  iconOnclick?: (event: React.MouseEvent) => void;
}

/**
 * 跑马灯组件属性接口
 */
export interface MarqueeProps {
  /** CSS类名 */
  className?: string;
  
  /** 鼠标悬停时是否暂停 */
  pauseOnHover?: boolean;
  
  /** 是否显示渐变效果 */
  gradient?: boolean;
  
  /** 滚动速度 */
  speed?: number;
  
  /** 间隔像素 */
  intervalPixels?: number;
  
  /** 子元素 */
  children?: React.ReactNode;
}

/**
 * 可拖拽模态框组件
 */
export declare const DraggableModal: React.FC<
  DraggableModalConfig & {
    style?: CSSProperties;
    children?: React.ReactNode;
  }
>;

/**
 * 图标字体视图组件
 */
export declare const IconfontView: React.FC<IconfontViewProps>;

/**
 * 跑马灯文本滚动组件
 */
export declare const Marquee: React.FC<MarqueeProps>;

/**
 * 紧急通知主组件
 * 
 * @description
 * 显示可拖拽的紧急公告通知，支持以下功能：
 * - 可在屏幕内拖拽移动
 * - 鼠标悬停时显示详细内容
 * - 支持跳转到详情页面
 * - 可关闭通知
 * 
 * @param props - 组件属性
 * @returns React函数组件
 * 
 * @example
 *