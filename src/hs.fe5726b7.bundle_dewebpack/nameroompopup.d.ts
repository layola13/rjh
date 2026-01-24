/**
 * NameRoomPopup - 房间命名弹窗模块
 * 用于检测和提示用户为未命名的房间进行命名
 */

import { Component, ReactElement } from 'react';

/**
 * 房间对象接口
 */
interface Room {
  /** 房间类型标识 */
  roomType?: string;
  /** 房间ID */
  id?: string;
  /** 其他房间属性 */
  [key: string]: unknown;
}

/**
 * 应用实例接口
 */
interface AppInstance {
  /** 平面图管理器 */
  floorplan: {
    /** 遍历所有房间 */
    forEachRoom(callback: (room: Room) => void): void;
  };
  /** 选择管理器 */
  selectionManager: {
    /** 取消所有选择 */
    unselectAll(): void;
    /** 选择指定对象 */
    select(item: Room): void;
  };
  /** 切换到2D视图 */
  switchTo2DView(): void;
  /** 应用参数 */
  appParams: {
    /** 当前语言环境 */
    locale: string;
  };
}

/**
 * 模态框选项接口
 */
interface ModalOptions {
  /** 弹窗标题 */
  title: string;
  /** 弹窗内容 */
  content: ReactElement;
  /** 是否启用复选框 */
  enableCheckbox: boolean;
  /** 是否显示底部按钮 */
  showFooter: boolean;
}

/**
 * 模态框静态类接口
 */
interface ModalStatic {
  /** 显示简单模态框 */
  simple(options: ModalOptions): void;
  /** 关闭指定类型的模态框 */
  close(type: string): void;
}

/**
 * 按钮组件属性接口
 */
interface ButtonProps {
  /** 样式类名 */
  className?: string;
  /** 按钮类型 */
  type?: 'primary' | 'default' | 'danger';
  /** 点击事件处理器 */
  onClick?: () => void;
  /** 子元素 */
  children?: React.ReactNode;
}

/**
 * 按钮组件类型
 */
type ButtonComponent = React.FC<ButtonProps>;

/**
 * NameRoomPopupContent 组件属性接口
 */
interface NameRoomPopupContentProps {
  /** 数据对象 */
  data: {
    /** 未命名的房间列表 */
    unnamedRooms: Room[];
  };
  /** 提示文本 */
  tips?: string;
}

/**
 * 房间命名弹窗主类
 * 提供检测未命名房间并显示提示弹窗的功能
 */
export declare class NameRoomPopup {
  /**
   * 检查是否存在未命名的房间
   * @returns 如果存在未命名房间返回true，否则返回false
   */
  static hasUnnamedRoom(): boolean;

  /**
   * 获取所有未命名的房间列表
   * @returns 未命名房间数组
   */
  static getUnnamedRooms(): Room[];

  /**
   * 检查未命名房间并显示弹窗提示
   * @param tips - 自定义提示文本
   * @returns 如果存在未命名房间并显示了弹窗返回true，否则返回false
   */
  static checkUnnamedRoomAndShowPopup(tips?: string): boolean;

  /**
   * 显示房间命名提示弹窗
   * @param unnamedRooms - 未命名的房间列表
   * @param tips - 自定义提示文本
   */
  static show(unnamedRooms: Room[], tips?: string): void;
}

/**
 * 房间命名弹窗内容组件
 * 内部使用的React组件，用于渲染弹窗UI
 */
declare class NameRoomPopupContent extends Component<NameRoomPopupContentProps> {
  /**
   * 操作按钮点击处理器
   * 切换到2D视图并选中第一个未命名房间
   */
  action(): void;

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): ReactElement;
}

/**
 * 全局HSApp对象接口
 */
declare global {
  const HSApp: {
    /** 应用配置 */
    Config: {
      /** 资源基础路径 */
      RES_BASEPATH: string;
    };
    /** 应用单例 */
    App: {
      /** 获取应用实例 */
      getApp(): AppInstance;
    };
  };

  /** 核心工具类 */
  const HSCore: {
    Util: {
      Room: {
        /** 判断是否为小房间 */
        isSmallRoom(room: Room): boolean;
      };
    };
  };

  /** 资源管理器 */
  const ResourceManager: {
    /** 获取国际化字符串 */
    getString(key: string): string;
  };

  /** React全局对象 */
  const React: {
    createElement: typeof import('react').createElement;
    Component: typeof import('react').Component;
  };

  /** 模态框工具 */
  const Modal: ModalStatic;

  /** 按钮组件 */
  const Button: ButtonComponent;
}