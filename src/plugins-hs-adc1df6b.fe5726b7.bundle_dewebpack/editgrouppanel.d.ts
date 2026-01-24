/**
 * 编辑组面板组件的类型定义
 * @module EditGroupPanel
 */

import React from 'react';

/**
 * 组元数据接口
 */
interface GroupMeta {
  /** 组ID */
  id: string;
  /** 组名称 */
  name: string;
  /** 缩略图URL */
  thumbnail: string;
  /** 图片列表 */
  images?: string[];
}

/**
 * 保存数据接口
 */
interface SaveData {
  /** 组ID */
  id: string;
  /** 组名称（最大20字符） */
  name: string;
  /** 图片URL列表 */
  images: string[];
  /** 缩略图URL */
  thumbnail: string;
}

/**
 * 图片遮罩状态枚举
 */
type PictureMaskEnum = 'none' | 'loading' | 'error' | 'hover';

/**
 * EditGroupPanel组件的属性接口
 */
interface EditGroupPanelProps {
  /** 组元数据 */
  meta: GroupMeta;
  /** 初始图片数据（可选） */
  imgData?: File | Blob;
  /** 保存回调函数 */
  onSave?: (data: SaveData) => void;
  /** 取消回调函数 */
  onCancel: () => void;
}

/**
 * EditGroupPanel组件的状态接口
 */
interface EditGroupPanelState {
  /** 图片遮罩状态 */
  pictureMaskEnum: PictureMaskEnum;
  /** 当前图片URL */
  picUrl: string;
  /** 当前名称长度（按字节计算） */
  currentNameLength: number;
  /** 名称长度提示消息 */
  nameLengthMessage: string;
  /** 名称校验是否通过 */
  checkName: boolean;
  /** 是否禁用保存按钮 */
  disableBtn: boolean;
}

/**
 * 编辑组面板组件
 * 用于编辑组的名称和缩略图
 * 
 * @class EditGroupPanel
 * @extends {React.Component<EditGroupPanelProps, EditGroupPanelState>}
 * 
 * @example
 *