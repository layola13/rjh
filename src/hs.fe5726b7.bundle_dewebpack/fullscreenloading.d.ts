/**
 * 全屏加载组件模块
 * 提供全屏加载提示功能，支持简单加载和多阶段进度条加载
 * @module FullScreenLoading
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Progress } from 'antd';

/**
 * 简单加载组件的属性
 */
interface SimpleLoadingProps {
  /** 加载提示文本 */
  text: string;
}

/**
 * 多阶段进度条加载组件的属性
 */
interface ProgressLoadingProps {
  /** 主要提示文本 */
  text: string;
  /** 额外提示文本（可选） */
  extraText?: string;
  /** 当前所处的阶段编号 */
  stageNum: number;
  /** 进度条总数量 */
  barNum?: number;
}

/**
 * 加载类型枚举
 */
const enum LoadingType {
  /** 简单加载 */
  Simple = 1,
  /** 多阶段进度条加载 */
  Progress = 2
}

/**
 * 简单加载组件
 * 显示加载图标和文本提示
 * @param props - 组件属性
 * @returns React元素
 */
function SimpleLoadingComponent(props: SimpleLoadingProps): React.ReactElement {
  return (
    <div className="fullScreenLoading">
      <div>
        <img className="loadingIcon" src={/* loadingIcon */} />
      </div>
      <div className="loadingText">{props.text}</div>
    </div>
  );
}

/**
 * 多阶段进度条加载组件
 * 显示多个进度条，表示不同阶段的加载进度
 * @param props - 组件属性
 * @returns React元素
 */
function ProgressLoadingComponent(props: ProgressLoadingProps): React.ReactElement {
  const totalBars = props.barNum || 3;
  const percentages: number[] = [];
  let isAfterCurrent = false;

  // 计算每个进度条的百分比
  for (let i = 1; i <= totalBars; i++) {
    if (i === props.stageNum) {
      // 当前阶段显示70%
      percentages.push(70);
      isAfterCurrent = true;
    } else if (isAfterCurrent) {
      // 当前阶段之后显示0%
      percentages.push(0);
    } else {
      // 当前阶段之前显示100%
      percentages.push(100);
    }
  }

  // 渲染进度条列表
  const progressBars = percentages.map((percent) => {
    // 为完成的进度条添加随机key，避免React复用
    const key = percent === 100 ? Math.round(Math.random() * 10000) : 0;
    
    return (
      <div className="loading-progress" key={key}>
        <Progress
          percent={percent}
          strokeWidth={6}
          strokeColor="black"
          showInfo={false}
        />
      </div>
    );
  });

  return (
    <div className="fullScreenLoading">
      <div className="container">
        <div className="info">
          <div className="main">{props.text}</div>
          <div className="extra">{props.extraText || ''}</div>
          <div className="loading-bar">{progressBars}</div>
        </div>
        <div className="icon">
          <img className="loading-Icon" src={/* loadingIconAlt */} />
        </div>
      </div>
    </div>
  );
}

/**
 * 全屏加载管理类
 * 提供静态方法控制全屏加载UI的显示和隐藏
 */
export class FullScreenLoading {
  /** 当前是否正在显示加载UI */
  private static _isShowing?: boolean;
  
  /** 挂载加载组件的DOM节点 */
  private static _domNode?: HTMLDivElement;

  /**
   * 显示全屏加载UI
   * @param text - 加载提示文本
   * @param loadingType - 加载类型（1: 简单加载, 2: 进度条加载）
   * @param extraText - 额外提示文本（仅进度条模式使用）
   * @param stageNum - 当前阶段编号（仅进度条模式使用）
   * @param barNum - 进度条总数（仅进度条模式使用，默认3）
   * @returns Promise，在渲染完成后resolve
   */
  static show(
    text?: string,
    loadingType?: LoadingType,
    extraText?: string,
    stageNum?: number,
    barNum?: number
  ): Promise<void> {
    return new Promise((resolve) => {
      // 确保DOM节点已创建
      this.loadDomNode();

      // 如果未显示或者是进度条模式，则渲染组件
      if (!this._isShowing || loadingType === LoadingType.Progress) {
        this._isShowing = true;
        this._domNode!.focus();

        const defaultText = ResourceManager.getString('background_processing');
        let component: React.ReactElement = (
          <SimpleLoadingComponent text={text || defaultText} />
        );

        // 进度条模式
        if (loadingType === LoadingType.Progress) {
          component = (
            <ProgressLoadingComponent
              text={text || defaultText}
              extraText={extraText}
              stageNum={stageNum!}
              barNum={barNum}
            />
          );
        }

        ReactDOM.render(component, this._domNode!, () => {
          setTimeout(() => {
            resolve();
          });
        });
      }
    });
  }

  /**
   * 初始化并获取DOM挂载节点
   * 创建一个阻止所有事件传播的容器div
   */
  static loadDomNode(): void {
    if (!this._domNode) {
      const container = document.createElement('div');
      document.body.appendChild(container);

      // 阻止所有事件冒泡的处理函数
      const stopPropagation = (event: Event): void => {
        event.stopPropagation();
      };

      // 注册事件监听器，阻止用户交互穿透到下层
      container.addEventListener('click', stopPropagation, true);
      container.addEventListener('dblclick', stopPropagation, true);
      container.addEventListener('mousedown', stopPropagation, true);
      container.addEventListener('mouseup', stopPropagation, true);
      container.addEventListener('mousemove', stopPropagation, true);
      container.addEventListener('mouseover', stopPropagation, true);
      container.addEventListener('mouseout', stopPropagation, true);
      container.addEventListener('keypress', stopPropagation, true);
      container.addEventListener('keyup', stopPropagation, true);

      this._domNode = container;
      this._isShowing = false;
    }
  }

  /**
   * 隐藏全屏加载UI
   * 卸载React组件并失去焦点
   */
  static hide(): void {
    if (this._domNode && this._isShowing) {
      this._domNode.blur();
      ReactDOM.unmountComponentAtNode(this._domNode);
      this._isShowing = false;
    }
  }

  /**
   * 检查加载UI当前是否正在显示
   * @returns 是否正在显示
   */
  static isShowing(): boolean {
    return this._isShowing ?? false;
  }
}

/**
 * 全局资源管理器声明（假设存在于全局作用域）
 */
declare const ResourceManager: {
  getString(key: string): string;
};