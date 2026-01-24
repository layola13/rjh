/**
 * 拖拽事件处理组件的类型定义
 * 提供鼠标拖拽、点击等交互功能的React组件
 */

import * as React from 'react';

/**
 * 拖拽事件的数据负载接口
 */
interface DragEventPayload {
  /** 原生鼠标事件对象 */
  event: MouseEvent;
  /** 图标数据源（通常为图片URL） */
  icon: string;
}

/**
 * 鼠标点击事件的数据负载接口
 */
interface MouseClickPayload {
  /** 原生鼠标事件对象 */
  event: MouseEvent;
  /** 图标数据源（通常为图片URL） */
  icon: string;
}

/**
 * 命令管理器接口
 * 负责接收和分发各类交互命令
 */
interface CommandManager {
  /**
   * 接收命令
   * @param command - 命令类型（dragStart | dragMove | dragEnd | mouseClick）
   * @param payload - 命令携带的数据负载
   */
  receive(command: 'dragStart' | 'dragMove' | 'dragEnd', payload: DragEventPayload): void;
  receive(command: 'mouseClick', payload: MouseClickPayload): void;
}

/**
 * HSApp全局应用实例接口
 */
interface HSAppInstance {
  /** 命令管理器实例 */
  cmdManager: CommandManager;
}

/**
 * HSApp全局命名空间
 */
interface HSAppNamespace {
  App: {
    /**
     * 获取应用单例实例
     * @returns HSApp应用实例
     */
    getApp(): HSAppInstance;
  };
}

/**
 * 全局HSApp声明
 */
declare global {
  const HSApp: HSAppNamespace;
}

/**
 * 拖拽组件的属性接口
 */
interface DraggableComponentProps {
  /** 图标数据源URL */
  dataSrc: string;
  
  /** 图片的CSS类名 */
  classes?: string;
  
  /** 鼠标按下事件处理器 */
  mousedownhandle?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** 点击事件处理器 */
  clickhandle?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** 鼠标进入事件处理器 */
  mouseenterhandle?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** 鼠标离开事件处理器 */
  mouseleavehandle?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * 可拖拽图标组件
 * 
 * 功能特性：
 * - 支持拖拽操作（dragStart -> dragMove -> dragEnd）
 * - 区分点击与拖拽行为
 * - 提供完整的鼠标事件回调
 * 
 * @example
 *