/**
 * 图片项组件的类型定义
 * 用于展示可选择的图片列表项
 */

import type { Component, MouseEvent } from 'react';

/**
 * 图片信息接口
 */
export interface PictureInfo {
  /** 图片URL地址 */
  url: string;
  /** 图片ID（可选） */
  id?: string;
  /** 图片名称（可选） */
  name?: string;
  /** 其他图片元数据 */
  [key: string]: unknown;
}

/**
 * 用户数据接口
 */
export interface UserData {
  /** 用户ID */
  id?: string;
  /** 用户名称 */
  name?: string;
  /** 其他用户数据 */
  [key: string]: unknown;
}

/**
 * PictureItem 组件的属性接口
 */
export interface PictureItemProps {
  /** 图片信息对象 */
  picInfo: PictureInfo;
  /** 用户数据对象 */
  userData: UserData;
  /** 点击通知回调函数 */
  clickNotify: (userData: UserData) => void;
  /** 初始选中状态 */
  initialSelected: boolean;
}

/**
 * PictureItem 组件的状态接口
 */
export interface PictureItemState {
  /** 当前选中状态 */
  selected: boolean;
}

/**
 * 图片项组件类
 * 
 * @description
 * 可点击选择的图片组件，支持选中状态切换
 * 
 * @example
 *