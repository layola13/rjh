/**
 * FavListPanel 组件的类型定义
 * 用于收藏夹列表面板，支持分组管理、批量移动、编辑名称等功能
 */

/**
 * 收藏夹分组信息
 */
export interface FavoriteGroup {
  /** 分组ID */
  fid: string | number;
  /** 分组名称 */
  name: string;
  /** 是否已收藏到该分组 */
  collected?: boolean;
}

/**
 * 提交操作的参数
 */
export interface SubmitParams {
  /** 实体名称（可选） */
  entityName?: string;
  /** 源文件夹ID（可选） */
  sourceFolderId?: string | number;
  /** 目标文件夹ID（可选） */
  folderId?: string | number;
  /** 文件夹名称（可选，用于创建新分组） */
  folderName?: string;
}

/**
 * 添加分组的返回结果
 */
export interface AddGroupResult {
  /** 新创建的分组ID */
  fid?: string | number;
  /** 返回码 */
  ret?: string;
}

/**
 * FavListPanel 组件属性
 */
export interface FavListPanelProps {
  /** 收藏夹分组列表 */
  favoriteGroups: FavoriteGroup[];
  
  /** 改变视图位置的回调函数（可选） */
  changeViewPosition?: () => void;
  
  /** 是否显示关闭按钮，默认 false */
  showCloseBtn?: boolean;
  
  /** 实体名称（可选） */
  entityName?: string;
  
  /** 是否显示编辑名称功能，默认 false */
  showEditName?: boolean;
  
  /** 是否为批量移动模式，默认 false */
  isBatchMove?: boolean;
  
  /** 是否为话题批量移动模式，默认 false */
  isTopicBatchMove?: boolean;
  
  /** 是否已收藏，默认 false */
  hasFaved?: boolean;
  
  /** 自定义 CSS 类名（可选） */
  className?: string;
  
  /** 移除 DOM 元素的回调函数（可选） */
  removeDom?: () => void;
  
  /** 添加新分组的回调函数（可选） */
  addGroup?: (groupName: string) => Promise<AddGroupResult>;
  
  /** 更新收藏的回调函数（可选） */
  updateFavorite?: (sourceFolderId?: string | number, targetFolderId?: string | number) => Promise<void>;
  
  /** 添加收藏的回调函数（可选） */
  handleAddFavorite?: (folderId: string | number) => Promise<void>;
  
  /** 更新实体名称的回调函数（可选） */
  handleUpdateEntityName?: (entityName: string) => Promise<void>;
  
  /** 取消操作的回调函数（可选） */
  onCancelCallback?: () => void;
  
  /** 提交操作的回调函数（可选） */
  onSubmitCallback?: () => void;
  
  /** 鼠标进入时的回调函数（可选） */
  handleMouseEnter?: () => void;
}

/**
 * FavListPanel 收藏夹列表面板组件
 * 
 * 功能特性：
 * - 支持多分组管理
 * - 支持批量移动
 * - 支持编辑实体名称
 * - 支持创建新分组
 * - 支持话题批量移动
 * 
 * @param props - 组件属性
 * @returns React 函数组件
 */
export declare function FavListPanel(props: FavListPanelProps): JSX.Element;