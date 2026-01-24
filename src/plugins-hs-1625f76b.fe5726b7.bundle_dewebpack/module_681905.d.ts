/**
 * 模型申请面板组件类型定义
 * @module ModelApplyPanel
 */

import React from 'react';

/**
 * 图片信息接口
 */
export interface PictureInfo {
  /** 图片加载状态 */
  loading: boolean;
  /** 图片URL地址 */
  url: string;
  /** 图片唯一标识符 */
  id: number;
  /** 图片加载错误标识 */
  error?: boolean;
}

/**
 * 组件状态接口
 */
export interface ModelApplyPanelState {
  /** 已上传的图片列表 */
  pictures: PictureInfo[];
  /** 表单-模型名称 */
  form_name: string;
  /** 表单-模型描述 */
  form_describe: string;
  /** 表单-联系方式 */
  form_connect: string;
  /** 上传失败标识-文件过大 */
  upload_picture_fail_size_large: boolean;
  /** 上传失败标识-文件类型错误 */
  upload_picture_fail_type_error: boolean;
}

/**
 * 组件属性接口
 */
export interface ModelApplyPanelProps {
  /** 组件初始化配置 */
  [key: string]: unknown;
}

/**
 * 客户端信息接口
 */
export interface ClientInfo {
  [key: string]: unknown;
}

/**
 * 提交数据接口
 */
export interface SubmitData {
  /** 客户端信息 */
  clientInfo: ClientInfo;
  /** 数据来源 */
  source: string;
  /** 模型描述 */
  description: string;
  /** 图片URL列表 */
  imageUrls: string[];
  /** 模型名称 */
  modelName: string;
}

/**
 * 模型申请面板组件
 * 用于用户提交模型申请请求，包含模型名称、描述、图片上传和联系方式
 */
export default class ModelApplyPanel extends React.Component<
  ModelApplyPanelProps,
  ModelApplyPanelState
> {
  /**
   * 图片ID计数器，用于生成唯一ID
   */
  count: number;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: ModelApplyPanelProps);

  /**
   * 关闭面板
   * 卸载组件并隐藏弹窗
   */
  closePanel(): void;

  /**
   * 添加图片
   * 打开文件选择器，验证文件大小和类型，上传图片
   * @remarks
   * - 最多支持6张图片
   * - 单张图片大小不超过5MB
   * - 仅支持 jpeg/jpg/png 格式
   */
  addPicture(): void;

  /**
   * 加载图片到服务器
   * @param file - 待上传的文件对象
   * @returns 返回上传后的图片URL（不含查询参数）
   */
  loadPicture(file: File): Promise<string>;

  /**
   * 删除指定图片
   * @param pictureId - 图片ID
   * @param event - 点击事件对象
   */
  deletePicture(pictureId: number, event?: React.MouseEvent): void;

  /**
   * 提交表单
   * 收集用户反馈信息和表单数据，提交到服务器
   * @remarks
   * 提交成功后显示成功提示并关闭面板
   * 提交失败时记录错误日志并显示警告提示
   */
  onSubmit(): void;

  /**
   * 更新模型名称
   * @param event - 输入框变化事件
   */
  addName(event: React.ChangeEvent<HTMLInputElement>): void;

  /**
   * 更新模型描述
   * @param event - 文本框变化事件
   */
  addDescribe(event: React.ChangeEvent<HTMLTextAreaElement>): void;

  /**
   * 更新联系方式
   * @param event - 输入框变化事件
   */
  addConnect(event: React.ChangeEvent<HTMLInputElement>): void;

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): React.ReactElement;
}