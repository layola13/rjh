/**
 * 收藏夹分组管理模块
 * 提供收藏夹分组的创建、编辑、删除等功能
 */

import React from 'react';
import { Popover, Button, IconfontView, SmartText } from './UIComponents';
import { FavInput } from './FavInput';

/**
 * 收藏夹分组数据结构
 */
export interface FavoriteGroup {
  /** 分组唯一标识符 */
  fid: string | number;
  /** 分组名称 */
  name: string;
  /** 该分组下的收藏项数量 */
  itemCount?: number;
}

/**
 * API 错误响应结构
 */
export interface ApiError {
  /** 错误返回码 */
  ret?: string;
  /** 错误消息 */
  message?: string;
}

/**
 * 主组件属性
 */
export interface AllGroupsProps {
  /** 添加新分组的回调函数 */
  addFolder?: (name: string) => Promise<void>;
  /** 更新分组名称的回调函数 */
  updateName?: (fid: string | number, newName: string) => Promise<void>;
  /** 删除分组的回调函数 */
  deleteFolder?: (fid: string | number, name: string) => Promise<void>;
  /** 点击分组项的回调函数 */
  handleClick?: (group: FavoriteGroup) => void;
  /** 收藏夹分组列表 */
  favoriteGroups?: FavoriteGroup[];
  /** 输入框最大长度限制 */
  favInputMaxLength?: number;
}

/**
 * 分组项组件属性
 */
export interface FavoriteGroupItemProps {
  /** 收藏夹分组列表（用于名称重复校验） */
  favoriteGroups: FavoriteGroup[];
  /** 当前分组数据 */
  data: FavoriteGroup;
  /** 更新分组名称的回调函数 */
  updateName?: (fid: string | number, newName: string) => Promise<void>;
  /** 删除分组的回调函数 */
  deleteFolder?: (fid: string | number, name: string) => Promise<void>;
  /** 点击分组项的回调函数 */
  handleClick?: (group: FavoriteGroup) => void;
  /** 是否显示编辑/删除按钮 */
  showEdit?: boolean;
  /** 输入框最大长度限制 */
  maxLength?: number;
}

/**
 * LiveHint 提示框配置选项
 */
interface LiveHintOptions {
  /** 提示状态类型 */
  status: string;
  /** 是否可关闭 */
  canclose: boolean;
}

/**
 * 收藏夹分组列表组件
 * 展示所有收藏夹分组，支持创建、编辑、删除操作
 */
declare function AllGroups(props: AllGroupsProps): React.ReactElement;

/**
 * 单个收藏夹分组项组件
 * 支持编辑名称、删除分组、点击切换等功能
 */
declare function FavoriteGroupItem(props: FavoriteGroupItemProps): React.ReactElement;

/**
 * 显示特殊字符错误提示
 * @param error - API 错误对象
 */
declare function handleSpecialCharactersError(error: ApiError): void;

/**
 * 显示删除确认对话框
 * @param fid - 分组ID
 * @param name - 分组名称
 * @param deleteFolder - 删除回调函数
 */
declare function showDeleteConfirmDialog(
  fid: string | number,
  name: string,
  deleteFolder?: (fid: string | number, name: string) => Promise<void>
): void;

/**
 * 全局资源管理器
 * 用于获取国际化字符串
 */
declare const ResourceManager: {
  getString(key: string): string;
};

/**
 * 全局提示组件
 * 用于显示操作提示信息
 */
declare const LiveHint: {
  show(message: string, duration: number, callback?: () => void, options?: LiveHintOptions): void;
  statusEnum: {
    warning: string;
    error: string;
    success: string;
  };
};

/**
 * 全局消息框组件
 * 用于显示确认对话框
 */
declare const MessageBox: {
  create(
    content: string,
    buttons: string[],
    defaultIndex: number,
    options?: { title?: string }
  ): {
    show(callback: (buttonIndex: number) => void): void;
  };
};

export default AllGroups;
export { FavoriteGroupItem };