import React from 'react';

/**
 * 用户引导数据项接口
 * 描述单个引导页的数据结构
 */
interface GuideDataItem {
  /** 引导页图标文件名 */
  icon: string;
  /** 引导提示文本的国际化键 */
  tip: string;
}

/**
 * 用户引导组件的属性接口
 */
interface UserGuideProps {
  /** 点击"知道了"按钮时的回调函数 */
  next: () => void;
}

/**
 * 用户引导组件的状态接口
 */
interface UserGuideState {
  /** 当前显示的引导页索引（从0开始） */
  currentGuideIndex: number;
}

/**
 * 用户引导组件
 * 
 * 用于展示多页引导教程，支持前后翻页浏览。
 * 包含5个预设的引导页面，每页包含图标和提示文本。
 * 
 * @example
 *