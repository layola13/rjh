import { Component } from 'react';
import { Dispatch } from 'redux';

/**
 * 收藏夹分组项的数据结构
 */
export interface FavoriteGroupItem {
  /** 收藏夹ID */
  fid: string;
  /** 分组名称 */
  name: string;
  /** 是否为默认分组 (0: 非默认, 1: 默认) */
  whetherDefault: number;
}

/**
 * 产品分组信息
 */
export interface ProductGroupInfo {
  /** 搜索ID */
  seekId: string;
}

/**
 * 收藏夹配置
 */
export interface FavoriteConfig {
  /** 收藏夹ID */
  fid: string;
}

/**
 * 收藏夹跳转参数
 */
export interface FavoriteJumpParams {
  /** 收藏夹ID */
  fid: string;
  /** 分组名称 */
  name: string;
}

/**
 * Redux State
 */
export interface ReduxState {
  /** 所有分组列表 */
  groupItems: FavoriteGroupItem[];
}

/**
 * 组件属性
 */
export interface FavoriteGroupListItemProps {
  /** 当前分组项数据 */
  groupItem: FavoriteGroupItem;
  /** 是否为收藏夹产品页面 */
  isFavoriteProductPage: boolean;
  /** 是否选中 */
  checked: boolean;
  /** 产品分组信息 */
  productGroupInfo: ProductGroupInfo;
  /** 当前选中的分组ID */
  selectedId: string;
  /** 所有分组列表 (来自Redux) */
  groupItems: FavoriteGroupItem[];
  /** Redux dispatch 方法 */
  dispatch: Dispatch;
  /** 选中项回调 */
  onSelectedItem: (fid: string, seekId: string, element: JQuery<HTMLElement>) => void;
  /** 设置当前收藏夹分组 */
  setCurrentFavgroup: (name: string, fid: string) => void;
}

/**
 * 组件状态
 */
export interface FavoriteGroupListItemState {
  /** 原始文本值（编辑前） */
  originTextValue?: string;
}

/**
 * 收藏夹分组列表项组件
 * 用于显示和管理单个收藏夹分组，支持编辑、删除和选择操作
 */
export default class FavoriteGroupListItem extends Component<
  FavoriteGroupListItemProps,
  FavoriteGroupListItemState
> {
  /** 列表项DOM引用 */
  private _listItem: HTMLLIElement | null;
  
  /** 信号钩子 */
  public signalHook: HSCore.Util.SignalHook;
  
  /** 原始文本值（编辑前的分组名称） */
  private originTextValue: string;

  constructor(props: FavoriteGroupListItemProps);

  /**
   * 组件挂载后的生命周期
   * 初始化列表项的样式和文本内容
   */
  componentDidMount(): void;

  /**
   * 选中列表项的处理函数
   * @param fid - 收藏夹ID
   * @param seekId - 搜索ID
   */
  private _onSelectedItem(fid: string, seekId: string): void;

  /**
   * 搜索点击处理函数
   * 触发收藏夹分组跳转
   */
  private _onSrearchClick(): void;

  /**
   * 编辑按钮点击处理函数
   * 进入编辑模式
   * @param event - 鼠标事件
   */
  private _onEditClick(event: React.MouseEvent): void;

  /**
   * 编辑确认按钮点击处理函数
   * 保存编辑后的分组名称
   * @param event - 鼠标事件
   */
  private _onEditOkClick(event: React.MouseEvent): void;

  /**
   * 输入框变化处理函数
   * 实时校验分组名称是否重复
   * @param event - 输入事件
   */
  private _onChange(event: React.ChangeEvent<HTMLInputElement>): void;

  /**
   * 键盘按键抬起处理函数
   * Enter键触发保存
   * @param event - 键盘事件
   */
  private _onhandlekeyup(event: React.KeyboardEvent<HTMLInputElement>): void;

  /**
   * 删除按钮点击处理函数
   * 显示确认对话框并删除分组
   * @param event - 鼠标事件
   */
  private _deleteClick(event: React.MouseEvent): void;

  /**
   * 设置列表项DOM引用
   * @param element - 列表项DOM元素
   */
  private _setListItem(element: HTMLLIElement | null): void;

  render(): JSX.Element;
}

/**
 * 更新分组信息的 Redux Action
 * @param fid - 收藏夹ID
 * @param name - 新的分组名称
 */
export function updateGroup(fid: string, name: string): any;

/**
 * 删除分组的 Redux Action
 * @param fid - 收藏夹ID
 * @param name - 分组名称
 */
export function deleteGroup(fid: string, name: string): any;

/**
 * 工具类：收藏夹相关辅助方法
 */
declare class FavoriteUtils {
  /**
   * 检查分组名称是否重复
   * @param groupItems - 所有分组列表
   * @param newName - 新的分组名称
   * @param originalName - 原始分组名称（编辑时）
   * @returns 是否重复
   */
  static isDuplicateInName(
    groupItems: FavoriteGroupItem[],
    newName: string,
    originalName?: string
  ): boolean;

  /**
   * 解析资源URL
   * @param relativePath - 相对路径
   * @returns 完整URL
   */
  static parseURL(relativePath: string): string;
}

/**
 * 资源管理器
 */
declare namespace ResourceManager {
  /**
   * 获取本地化字符串
   * @param key - 字符串键名
   */
  function getString(key: string): string;

  /**
   * 注入SVG图片到DOM元素
   * @param element - 目标DOM元素
   */
  function injectSVGImage(element: HTMLElement | null): void;
}

/**
 * 消息弹窗
 */
declare namespace MessageBox {
  /**
   * 创建消息弹窗
   * @param content - 弹窗内容
   * @param buttons - 按钮文本数组
   * @param defaultIndex - 默认按钮索引
   * @param options - 配置选项
   * @param modal - 是否模态
   * @param center - 是否居中
   */
  function create(
    content: string,
    buttons: string[],
    defaultIndex: number,
    options: { title: string },
    modal: boolean,
    center: boolean
  ): {
    show(callback: (buttonIndex: number) => void): void;
  };
}

/**
 * 实时提示
 */
declare namespace LiveHint {
  enum statusEnum {
    warning = 'warning',
    success = 'success',
    error = 'error',
  }

  /**
   * 显示提示信息
   * @param message - 提示消息
   * @param duration - 显示时长（毫秒）
   * @param position - 位置
   * @param options - 配置选项
   */
  function show(
    message: string,
    duration: number,
    position: undefined,
    options: { status: statusEnum; canclose: boolean }
  ): void;
}

/**
 * HSCore 工具命名空间
 */
declare namespace HSCore.Util {
  /**
   * 信号钩子类
   */
  class SignalHook {
    constructor(component: Component);
  }
}

/**
 * HSApp 应用命名空间
 */
declare namespace HSApp.App {
  /**
   * 获取应用实例
   */
  function getApp(): {
    pluginManager: {
      getPlugin(type: string): CatalogPlugin;
    };
  };
}

/**
 * 目录插件接口
 */
interface CatalogPlugin {
  /** 收藏夹分组跳转信号 */
  signalFavoritegroupJump: {
    dispatch(params: FavoriteJumpParams): void;
  };

  /**
   * 获取当前配置
   */
  getCurrentConfig(): FavoriteConfig;

  /**
   * 设置当前配置
   */
  setCurrentConfig(config: FavoriteConfig): void;
}

/**
 * 常量：插件类型
 */
declare namespace HSFPConstants {
  enum PluginType {
    Catalog = 'Catalog',
  }
}