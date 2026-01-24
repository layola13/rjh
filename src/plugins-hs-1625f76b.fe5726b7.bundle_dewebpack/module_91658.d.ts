/**
 * 可拖拽弹窗组件类型定义
 * @module DragPopupWindow
 */

import React from 'react';

/**
 * 弹窗组件的属性接口
 */
export interface DragPopupWindowProps {
  /** 提交回调函数 */
  submitcall?: () => void;
  
  /** 取消回调函数 */
  cancelcall?: () => void;
  
  /** 取消命令函数 */
  cancelCmd?: () => void;
  
  /** 弹窗容器的CSS类名 */
  windowname?: string;
  
  /** 确认按钮文本 */
  oklabel?: string;
  
  /** 取消按钮文本 */
  cancellabel?: string;
  
  /** 弹窗标题 */
  headername?: string;
  
  /** 弹窗内容元素 */
  contents?: React.ReactElement;
  
  /** 弹窗宽度（像素） */
  winwidth?: number;
  
  /** 弹窗距离右侧距离（像素） */
  winright?: number;
  
  /** 弹窗高度（像素） */
  winheight?: number;
  
  /** 弹窗距离顶部距离（像素） */
  wintop?: number;
  
  /** 弹窗最大高度（像素） */
  winMaxheight?: number;
  
  /** 是否显示帮助图标 */
  hasHelp?: boolean;
  
  /** 帮助提示文本 */
  tooltip?: string;
  
  /** 帮助弹出框内容 */
  popover?: string | React.ReactElement;
}

/**
 * 弹窗组件的状态接口
 */
export interface DragPopupWindowState {
  /** 鼠标是否悬停在确认按钮上 */
  isHovering: boolean;
}

/**
 * 可拖拽弹窗组件
 * 提供标题栏拖拽、确认/取消操作、帮助提示等功能
 */
export default class DragPopupWindow extends React.Component<
  DragPopupWindowProps,
  DragPopupWindowState
> {
  /** 弹窗当前X坐标（距右侧距离） */
  private x: number;
  
  /** 弹窗当前Y坐标（距顶部距离） */
  private y: number;
  
  /** 提交信号发射器 */
  private signalPopupSubmitted: HSCore.Util.Signal;
  
  /** 取消信号发射器 */
  private signalPopupCanceled: HSCore.Util.Signal;
  
  /** 是否正在拖动 */
  private moving: boolean;
  
  /** 鼠标最后一次X坐标 */
  private lastX: number | null;
  
  /** 鼠标最后一次Y坐标 */
  private lastY: number | null;
  
  /** 拖动开始时弹窗X坐标 */
  private beginX: number;
  
  /** 拖动开始时弹窗Y坐标 */
  private beginY: number;
  
  /** DOM引用：可拖拽弹窗容器 */
  private refs: {
    dragPopupWindow: HTMLDivElement;
    tooltipContainer: HTMLDivElement;
  };

  constructor(props: DragPopupWindowProps);

  /**
   * 组件挂载时的生命周期方法
   * 注册信号监听器和初始化帮助提示
   */
  componentDidMount(): void;

  /**
   * 组件卸载时的生命周期方法
   * 移除信号监听器
   */
  componentWillUnmount(): void;

  /**
   * 鼠标移入确认按钮的处理函数
   */
  handleMouseOver(): void;

  /**
   * 鼠标移出确认按钮的处理函数
   */
  handleMouseOut(): void;

  /**
   * 鼠标按下事件处理（开始拖拽）
   * @param event - 鼠标事件对象
   */
  onMouseDown(event: React.MouseEvent): void;

  /**
   * 鼠标释放事件处理（结束拖拽）
   * @param event - 鼠标事件对象
   */
  onMouseUp(event: MouseEvent): void;

  /**
   * 鼠标移动事件处理
   * @param event - 鼠标事件对象
   */
  onMouseMove(event: MouseEvent): void;

  /**
   * 执行拖动逻辑
   * @param event - 鼠标事件对象
   */
  onMove(event: MouseEvent): void;

  /**
   * 取消按钮点击处理函数
   * @param event - 鼠标事件对象
   * @param skipCancelCmd - 是否跳过取消命令执行
   * @returns 总是返回false以阻止默认行为
   */
  handleCancelClick(event?: React.MouseEvent, skipCancelCmd?: boolean): boolean;

  /**
   * 关闭弹窗的内部方法
   * 卸载React组件并清理DOM
   */
  private _closePopup(): void;

  /**
   * 确认按钮点击处理函数
   * @param event - 鼠标事件对象
   * @returns 总是返回false以阻止默认行为
   */
  handleOkClick(event?: React.MouseEvent): boolean;

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): React.ReactElement;
}

/**
 * HSCore全局命名空间扩展
 */
declare global {
  namespace HSCore {
    namespace Util {
      /**
       * 信号类，用于事件发布订阅
       */
      class Signal {
        constructor(context: unknown);
        
        /**
         * 监听信号
         * @param callback - 回调函数
         * @param context - 执行上下文
         */
        listen(callback: (() => void) | undefined, context: unknown): void;
        
        /**
         * 取消监听信号
         * @param callback - 回调函数
         * @param context - 执行上下文
         */
        unlisten(callback: (() => void) | undefined, context: unknown): void;
        
        /**
         * 分发信号，触发所有监听器
         */
        dispatch(): void;
      }
    }
  }

  namespace HSApp {
    /**
     * 应用程序类
     */
    class App {
      /**
       * 获取应用程序单例
       */
      static getApp(): App;
      
      /**
       * 错误日志记录器
       */
      errorLogger: {
        /**
         * 推送错误日志
         * @param message - 错误消息
         * @param details - 错误详情
         */
        push(
          message: string,
          details: {
            errorStack: Error;
            description: string;
            errorInfo: {
              info: unknown;
              path: {
                file: string;
                functionName: string;
              };
            };
          }
        ): void;
      };
    }
  }
}