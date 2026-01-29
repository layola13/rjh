/**
 * TutorialList组件的类型定义
 * @module TutorialList
 */

import React from 'react';

/**
 * 教程项接口
 */
export interface Tutorial {
  /** 教程标题 */
  title: string;
  /** 教程链接地址 */
  url: string;
}

/**
 * TutorialList组件的属性接口
 */
export interface TutorialListProps {
  /** 教程列表数组 */
  tutorials: Tutorial[];
}

/**
 * 教程列表组件
 * 渲染一个包含多个教程链接的列表
 * 
 * @param props - 组件属性
 * @returns React函数组件
 * 
 * @example
 *