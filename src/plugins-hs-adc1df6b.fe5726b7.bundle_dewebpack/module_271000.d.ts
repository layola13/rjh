/**
 * 树形菜单/文件夹管理器
 * 用于管理层级结构的项目集合，支持添加、删除、显示和隐藏操作
 */

import type { default as FolderNode } from './FolderNode'; // 假设 module 5340 导出的类型

/**
 * 项目添加事件数据
 */
export interface ItemAddedEventData {
  /** 新添加的项目 */
  addedItem: unknown;
  /** 所属的文件夹节点 */
  folder: FolderNode;
}

/**
 * 项目移除事件数据
 */
export interface ItemRemovedEventData {
  /** 被移除的项目 */
  removedItem: unknown;
  /** 所属的文件夹节点 */
  folder: FolderNode;
}

/**
 * 信号/事件分发器接口
 */
export interface Signal<T> {
  /** 分发事件给所有监听者 */
  dispatch(data: T): void;
  /** 添加事件监听器 */
  add(callback: (data: T) => void): void;
  /** 移除事件监听器 */
  remove(callback: (data: T) => void): void;
}

/**
 * 文件夹节点配置选项
 */
export interface FolderNodeOptions {
  /** 节点名称 */
  name: string;
  /** 获取项目的回调函数 */
  itemGetter: (name: string) => unknown;
  /** 项目添加时的回调 */
  itemAddedCallback: (item: unknown, folder: FolderNode) => void;
  /** 项目移除时的回调 */
  itemRemovedCallback: (item: unknown, folder: FolderNode) => void;
}

/**
 * 树形菜单管理器类
 * 管理具有层级结构的项目集合，类似文件系统的文件夹结构
 */
export default class TreeMenuManager {
  /** 菜单名称 */
  readonly name: string;
  
  /** 项目添加事件信号 */
  readonly signalItemAdded: Signal<ItemAddedEventData>;
  
  /** 项目移除事件信号 */
  readonly signalItemRemoved: Signal<ItemRemovedEventData>;
  
  /** 根文件夹节点 */
  private readonly _root: FolderNode;

  /**
   * 创建树形菜单管理器实例
   * @param name - 菜单名称
   * @param rootData - 根节点数据
   * @param itemGetter - 项目获取函数
   * @param initialItems - 初始项目列表（可选）
   */
  constructor(
    name: string,
    rootData: unknown,
    itemGetter: (name: string) => unknown,
    initialItems?: unknown[]
  ) {
    this.name = name;
    this.signalItemAdded = new HSCore.Util.Signal<ItemAddedEventData>(this);
    this.signalItemRemoved = new HSCore.Util.Signal<ItemRemovedEventData>(this);

    this._root = new FolderNode(
      {
        name,
        itemGetter,
        itemAddedCallback: this._onItemAdded.bind(this),
        itemRemovedCallback: this._onItemRemoved.bind(this)
      },
      rootData
    );

    initialItems?.forEach((item) => {
      this._root.add(item);
    });
  }

  /**
   * 显示菜单
   */
  show(): void {
    this._root.show();
  }

  /**
   * 隐藏菜单
   */
  hide(): void {
    this._root.hide();
  }

  /**
   * 获取根节点
   * @returns 根文件夹节点
   */
  getRoot(): FolderNode {
    return this._root;
  }

  /**
   * 根据路径获取项目
   * @param path - 项目路径，使用 "/" 分隔，例如 "folder1/folder2/item"
   * @returns 找到的节点，如果路径为空则返回根节点，未找到返回 undefined
   */
  getItem(path?: string): FolderNode | undefined {
    let currentNode: FolderNode | undefined = this._root;

    if (!path) {
      return currentNode;
    }

    const segments = path.split('/');
    for (const segment of segments) {
      if (segment && currentNode) {
        currentNode = currentNode.getChild(segment);
      }
    }

    return currentNode;
  }

  /**
   * 添加项目到指定路径
   * @param item - 要添加的项目
   * @param parentPath - 父节点路径
   * @returns 添加后的节点，如果父节点不存在则返回 undefined
   */
  addItem(item: unknown, parentPath?: string): FolderNode | undefined {
    const parentNode = this.getItem(parentPath);
    return parentNode?.add(item);
  }

  /**
   * 根据路径移除项目
   * @param path - 项目完整路径，例如 "folder1/folder2/item"
   */
  removeItem(path?: string): void {
    if (!path) {
      return;
    }

    const segments = path.split('/');
    const itemName = segments.pop();
    const parentPath = segments.join('/');
    const parentNode = this.getItem(parentPath);

    if (parentNode && itemName) {
      parentNode.remove(itemName);
    }
  }

  /**
   * 项目添加事件处理器
   * @param item - 添加的项目
   * @param folder - 所属文件夹
   * @private
   */
  private _onItemAdded(item: unknown, folder: FolderNode): void {
    this.signalItemAdded.dispatch({
      addedItem: item,
      folder
    });
  }

  /**
   * 项目移除事件处理器
   * @param item - 移除的项目
   * @param folder - 所属文件夹
   * @private
   */
  private _onItemRemoved(item: unknown, folder: FolderNode): void {
    this.signalItemRemoved.dispatch({
      removedItem: item,
      folder
    });
  }
}

/**
 * HSCore 全局命名空间声明
 */
declare global {
  namespace HSCore {
    namespace Util {
      class Signal<T> {
        constructor(context: unknown);
        dispatch(data: T): void;
        add(callback: (data: T) => void): void;
        remove(callback: (data: T) => void): void;
      }
    }
  }
}