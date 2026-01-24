import React, { Component, createContext, useContext, Context } from 'react';
import { Signal } from './Signal';
import { PAGES, defaultDragModel, PageConstructor, PageInfo } from './PageRegistry';
import { ThemeContext } from './ThemeContext';
import { modalContext, ModalContextType } from './ModalContext';
import { uuid } from './utils';

/**
 * 页面拖拽配置模型
 */
export interface PageDragModel {
  /** 页面尺寸配置 */
  pageSize?: {
    /** 宽度 */
    width: number;
    /** 高度 */
    height: number;
    /** X轴位置 */
    positionX: number;
  };
  /** 是否可缩放 */
  zoomable?: boolean;
}

/**
 * 页面项结构
 */
export interface PageItem<T = any> {
  /** 页面组件类 */
  Page: PageConstructor;
  /** 页面数据 */
  data?: T;
}

/**
 * 页面推送信号载荷
 */
export interface PagePushPayload {
  /** 视图管理器ID */
  id: string;
  /** 来源页面信息 */
  from?: PageInfo;
  /** 目标页面信息 */
  to: PageInfo;
}

/**
 * 视图上下文属性
 */
export interface ViewContextProps {
  /** 返回上一页 */
  back: () => void;
  /** 通过页面名称推送新页面 */
  pushPageByName: (pageName: string, data?: any) => void;
  /** 推送新页面 */
  push: (pageItem: PageItem) => void;
  /** 关闭视图 */
  close: () => void;
  /** 附加数据 */
  data?: any;
}

/**
 * 组件属性
 */
export interface ViewManagerProps {
  /** 视图数据 */
  data: {
    /** 要显示的页面配置 */
    showPage?: {
      /** 页面名称 */
      name: string;
      /** 页面数据 */
      data?: any;
    };
  };
  /** 关闭回调 */
  close: () => void;
}

/**
 * 组件状态
 */
interface ViewManagerState {
  /** 页面栈列表 */
  pageList: PageItem[];
}

/**
 * 视图上下文
 */
const ViewContext: Context<ViewContextProps | undefined> = createContext<ViewContextProps | undefined>(undefined);

/**
 * 页面推送信号
 * 用于监听页面导航事件
 */
export const signalPagePush = new Signal<PagePushPayload>();

/**
 * 高阶组件：为组件注入视图上下文属性
 * 
 * @param WrappedComponent - 要包装的组件
 * @returns 包装后的组件
 * 
 * @example
 *