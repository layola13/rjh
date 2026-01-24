import type { CSSProperties, ReactElement } from 'react';

/**
 * 渲染任务状态码枚举
 */
export enum RenderJobStatusCode {
  /** 任务失败 */
  FAILED = 'FAILED',
  /** 任务已分发/渲染中 */
  DISPATCHED = 'DISPATCHED',
  /** 任务排队中 */
  PENDING = 'PENDING',
  /** 任务成功完成 */
  SUCCESS = 'SUCCESS'
}

/**
 * 操作类型枚举
 */
export enum ActionKey {
  /** 生成图片 */
  Generate = 'Generate',
  /** 下载图片 */
  Download = 'Download',
  /** 分享图片 */
  Share = 'Share',
  /** 删除图片 */
  Delete = 'Delete',
  /** 反馈 */
  FeedBack = 'FeedBack'
}

/**
 * 图片数据接口
 */
export interface ImageData {
  /** 图片URL地址 */
  imageUrl: string;
  /** 处理状态码 */
  processStatus: RenderJobStatusCode;
  /** 处理进度（0-100） */
  processSchedule?: number;
  /** 剩余处理时长（秒） */
  processRemainingDuration?: number;
  /** 分辨率升级标记 */
  upgradeResolutionTag?: boolean;
  /** 其他数据字段 */
  [key: string]: unknown;
}

/**
 * 工具提示项配置
 */
export interface TooltipItem {
  /** 操作唯一键 */
  key: ActionKey;
  /** 图标类名 */
  icon: string;
  /** 标题多语言键 */
  title: string;
  /** 点击回调函数 */
  callback: () => void;
  /** 是否禁用 */
  disable?: boolean;
}

/**
 * 图片卡片组件属性
 */
export interface ImageCardProps {
  /** 图片数据 */
  data: ImageData;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 删除处理函数 */
  handleDelete: (data: ImageData) => void;
  /** 更新分辨率处理函数 */
  handleUpdateResolution?: (data: ImageData) => void;
  /** 查看详情处理函数 */
  viewDetail: (data: ImageData) => void;
  /** 重新绘制处理函数 */
  rePaint: () => void;
}

/**
 * 卡片工具提示组件属性
 */
export interface CardTooltipProps {
  /** 工具提示项列表 */
  tooltipItems: TooltipItem[];
}

/**
 * 进度容器组件属性
 */
export interface ProgressContainerProps {
  /** 自定义类名 */
  customClassName?: string;
  /** 处理进度（0-100） */
  processSchedule: number;
  /** 剩余处理时长（秒） */
  processRemainingDuration: number;
}

/**
 * 图片操作工具类
 */
export declare namespace Action {
  /**
   * 下载图片
   * @param data - 图片数据
   */
  function downloadImage(data: ImageData): void;

  /**
   * 显示分享弹窗
   * @param data - 图片数据
   */
  function showShareModal(data: ImageData): void;

  /**
   * 显示反馈入口
   * @param data - 图片数据
   */
  function showFeedBackEntry(data: ImageData): void;
}

/**
 * 图片卡片组件
 * 根据图片数据的处理状态渲染不同的卡片视图
 * 
 * @param props - 组件属性
 * @returns React元素
 * 
 * @example
 *