/**
 * ImageDetail 组件模块
 * 用于展示图片详情，支持缩放、导航、下载、分享等操作
 */

import React from 'react';

/**
 * 渲染任务数据接口
 */
export interface RenderTaskData {
  /** 子任务唯一标识 */
  subTaskId: string;
  /** 图片名称 */
  imageName: string;
  /** 图片URL地址 */
  imageUrl: string;
  /** 图片宽度（像素） */
  picWight: number;
  /** 图片高度（像素） */
  picHeight: number;
  /** 宽度比例 */
  proportionWidth: number;
  /** 高度比例 */
  proportionHeight: number;
  /** 房间类型名称 */
  roomTypeName: string;
  /** 风格类型名称 */
  styleTypeName: string;
  /** 处理状态码 */
  processStatus: number;
  /** 处理进度（0-100） */
  processSchedule: number;
  /** 预计剩余时长（秒） */
  processRemainingDuration: number;
  /** 是否包含水印 */
  includeWatermark?: boolean;
}

/**
 * 任务信息接口
 */
export interface TaskInfo {
  /** 任务ID */
  taskId: string;
  /** 其他任务相关属性 */
  [key: string]: unknown;
}

/**
 * 关闭回调函数类型
 * @param shouldRefresh - 是否需要刷新
 * @param task - 可选的任务信息
 */
export type HandleCloseCallback = (shouldRefresh: boolean, task?: TaskInfo) => void;

/**
 * 删除回调函数类型
 * @param data - 被删除的渲染任务数据
 */
export type HandleDeleteCallback = (data: RenderTaskData) => void;

/**
 * 查看回调函数类型
 * @param data - 被查看的渲染任务数据
 */
export type HandleViewedCallback = (data: RenderTaskData) => void;

/**
 * ImageDetail 组件属性接口
 */
export interface ImageDetailProps {
  /** 当前显示的图片数据 */
  data: RenderTaskData;
  /** 图片数据列表 */
  dataList: RenderTaskData[];
  /** 关联的任务信息 */
  task: TaskInfo;
  /** 关闭详情时的回调函数 */
  handleClose: HandleCloseCallback;
  /** 删除图片时的回调函数 */
  handleDelete: HandleDeleteCallback;
  /** 查看图片时的回调函数（可选） */
  handleViewed?: HandleViewedCallback;
}

/**
 * AI 参数项接口
 */
interface AIParamItem {
  /** 参数名称 */
  name: string;
  /** 参数值 */
  value: string;
}

/**
 * 操作按钮配置接口
 */
interface ActionConfig {
  /** 操作名称 */
  name: string;
  /** 图标标识 */
  icon: string;
  /** 点击处理函数 */
  handleClick: () => void;
  /** 是否显示 VIP 标识 */
  showVip?: boolean;
  /** 工具提示组件 */
  toolTipCom?: () => React.ReactElement;
  /** 是否不可用 */
  unable?: boolean;
  /** 是否禁用 */
  disable?: boolean | string;
}

/**
 * 处理状态接口
 */
interface ProcessStatus {
  /** 处理状态码 */
  processStatus: number;
  /** 处理进度百分比 */
  processSchedule: number;
  /** 预计剩余时长（秒） */
  processRemainingDuration: number;
}

/**
 * ImageDetail 组件
 * 
 * 功能说明：
 * - 支持图片缩放、平移操作
 * - 左右箭头导航浏览图片列表
 * - 提供下载、分享、删除等操作
 * - 支持去水印功能（会员特权）
 * - 显示图片尺寸、比例等 AI 参数信息
 * - 实时显示图片处理进度
 * 
 * @param props - 组件属性
 * @returns React 组件
 */
export declare function ImageDetail(props: ImageDetailProps): React.ReactElement | null;

export default ImageDetail;