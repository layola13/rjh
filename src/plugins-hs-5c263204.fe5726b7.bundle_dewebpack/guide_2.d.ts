/**
 * Guide组件 - 新手引导功能模块
 * 提供分步引导、遮罩层、提示框等交互式引导功能
 */

import React from 'react';

/**
 * 位置配置 - 支持数值或字符串类型的定位
 */
interface Position {
  /** 上边距 */
  top?: number | string;
  /** 左边距 */
  left?: number | string;
  /** 右边距 */
  right?: number | string;
  /** 下边距 */
  bottom?: number | string;
}

/**
 * 步骤提示配置
 */
interface StepTip {
  /** 目标DOM元素选择器 */
  ele?: string;
  /** 提示文本内容 */
  tip?: string;
  /** 位置配置 - 支持函数动态计算 */
  position?: Position | (() => Position);
}

/**
 * 构建块样式配置 - 用于高亮区域的分块遮罩
 */
interface BuildBlockStyles {
  /** 顶部遮罩样式 */
  topBlockStyle: {
    height: number | string;
    zIndex: number;
  };
  /** 中间遮罩样式 */
  middleBlockStyle: {
    height: number | string;
  };
  /** 中间左侧遮罩样式 */
  middleLeftBlockStyle: {
    width: number | string;
    zIndex: number;
  };
  /** 中间中央遮罩样式 */
  middleCenterBlockStyle: {
    width: number | string;
    height?: number | string;
  };
  /** 中间右侧遮罩样式 */
  middleRightBlockStyle: {
    zIndex: number;
  };
  /** 底部遮罩样式 */
  bottomBlockStyle: {
    height: string;
    zIndex: number;
  };
}

/**
 * 构建块配置 - 定义高亮区域的分块规则
 */
interface BuildBlocks {
  /** 目标元素选择器 */
  element: string;
  /** 顶部块配置 */
  topBlock?: {
    height?: number;
    zIndex?: number;
  };
  /** 中间块配置 */
  middleBlock?: {
    /** 高度调整 */
    height?: number;
    /** 左侧块 */
    middleLeftBlock?: {
      width?: number;
      zIndex?: number;
    };
    /** 中央块 */
    middleCenterBlock?: {
      width?: number;
      height?: number;
    };
    /** 右侧块 */
    middleRightBlock?: {
      zIndex?: number;
    };
  };
  /** 底部块配置 */
  bottomBlock?: {
    height?: string;
    zIndex?: number;
  };
}

/**
 * 下一步提示项配置
 */
interface NextStepTipItem {
  /** 目标元素选择器 */
  element?: string;
  /** 位置配置 */
  position?: Position;
}

/**
 * 步骤选项配置
 */
interface StepOptions {
  /** 当前步骤序号 */
  stepNum: number;
  /** 步骤提示配置 */
  stepTip: StepTip;
  /** 是否显示步骤提示 */
  showStepTip?: boolean;
  /** 是否显示下一步提示 */
  showNextStepTip?: boolean;
  /** 下一步提示数组 */
  nextStepTipArr?: NextStepTipItem[];
  /** 下一步提示回调 */
  nextStepTipCallBack?: () => void;
  /** 是否显示引导 */
  showGuide?: boolean;
  /** 是否显示遮罩 */
  showMask?: boolean;
  /** 构建块配置 */
  buildBlocks?: BuildBlocks;
  /** 总步骤数 */
  stepCount?: number;
  /** 是否显示多重遮罩 */
  showMasks?: boolean;
  /** 是否显示工具栏遮罩 */
  showGuideToolbarMask?: boolean;
  /** 是否隐藏二级工具栏 */
  hideTwoLevelToolbar?: boolean;
  /** 是否隐藏下一步按钮 */
  hideNextbtn?: boolean;
  /** 是否为最后一步 */
  isFinalStep?: boolean;
}

/**
 * 信号动作类型
 */
type SignalActionType = 'skip' | 'finish';

/**
 * 信号分发器
 */
interface SignalDispatcher {
  dispatch(action: { type: SignalActionType }): void;
}

/**
 * Guide组件属性
 */
export interface GuideProps {
  /** 步骤标题数组 */
  stepsTitle: string[];
  /** 步骤配置选项 */
  stepOptions: StepOptions;
  /** 引导日志信号分发器 */
  signalGuideToLog: SignalDispatcher;
}

/**
 * Guide组件状态
 */
interface GuideState {
  /** 当前步骤序号 */
  stepNum: number;
  /** 步骤提示配置 */
  stepTip: StepTip;
  /** 是否显示步骤提示 */
  showStepTip: boolean;
  /** 是否显示下一步提示 */
  showNextStepTip?: boolean;
  /** 下一步提示数组 */
  nextStepTipArr?: NextStepTipItem[];
  /** 当前下一步提示序号 */
  nextStepTipNum: number;
  /** 下一步提示回调 */
  nextStepTipCallBack?: () => void;
  /** 步骤标题数组 */
  stepsTitle: string[];
  /** 总步骤数 */
  stepCount: number;
  /** 是否显示引导 */
  showGuide: boolean;
  /** 是否显示工具栏遮罩 */
  showGuideToolbarMask: boolean;
  /** 是否显示遮罩 */
  showMask: boolean;
  /** 是否显示多重遮罩 */
  showMasks: boolean;
  /** 遮罩层z-index */
  maskZIndex: number;
  /** 左侧悬停状态 */
  hoverLeft: boolean;
  /** 右侧悬停状态 */
  hoverRight: boolean;
  /** 是否隐藏二级工具栏 */
  hideTwoLevelToolbar: boolean;
  /** 是否隐藏下一步按钮 */
  hideNextbtn: boolean;
  /** 是否为最后一步 */
  isFinalStep: boolean;
  /** 构建块配置 */
  buildBlocks?: BuildBlocks;
}

/**
 * 退出引导返回信息
 */
interface ExitGuideInfo {
  /** 步骤序号 */
  stepNum?: number;
  /** 精确步骤序号 */
  stepAccurateNum?: number;
  /** 是否为自定义引导 */
  isCustomGuide?: boolean;
}

/**
 * Guide组件 - 新手引导核心组件
 * 
 * @remarks
 * 提供分步引导流程，包括：
 * - 步骤提示与定位
 * - 遮罩层高亮
 * - 下一步提示
 * - 引导进度跟踪
 * - 本地存储状态管理
 * 
 * @example
 *