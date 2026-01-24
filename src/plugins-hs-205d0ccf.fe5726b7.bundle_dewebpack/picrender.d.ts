/**
 * 图片/视频渲染组件模块
 * 支持多种媒体格式的渲染，包括图片(png/jpeg/gif)和视频(mp4)
 */

import React from 'react';

/**
 * 支持的媒体类型
 */
type MediaType = 'image/png' | 'image/jpeg' | 'image/gif' | 'video/mp4';

/**
 * PicRender 组件的属性接口
 */
export interface PicRenderProps {
  /** 图片或视频的URL地址 */
  picUrl?: string;
  /** 文件的MIME类型 */
  fileType?: MediaType;
}

/**
 * 媒体渲染器组件的属性接口
 */
interface MediaRendererProps {
  /** 媒体类型 */
  type: MediaType;
  /** CSS类名 */
  className: string;
  /** 媒体资源URL */
  src: string;
  /** 加载错误时的回调函数 */
  onError: () => void;
}

/**
 * 媒体类型配置项接口
 */
interface MediaTypeConfig {
  /** 用于渲染该媒体类型的组件 */
  component: string | React.ComponentType<MediaRendererProps>;
}

/**
 * 媒体类型配置映射表
 */
declare const MEDIA_TYPE_MAP: Record<MediaType, MediaTypeConfig>;

/**
 * 图片/视频渲染组件
 * 
 * 根据文件类型自动选择合适的渲染方式：
 * - 图片格式(png/jpeg/gif): 使用 <img> 标签
 * - 视频格式(mp4): 使用 <video> 标签，支持自动播放、循环和控制条
 * 
 * 当媒体加载失败时，会显示默认的错误占位图
 * 
 * @param props - 组件属性
 * @returns React元素
 * 
 * @example
 *