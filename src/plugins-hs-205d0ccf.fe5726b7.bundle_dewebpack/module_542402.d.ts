/**
 * 语言选择列表项组件的类型定义
 * Module: module_542402
 * Original ID: 542402
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * 语言对象接口
 */
export interface Language {
  /** 语言代码 (例如: 'en', 'zh-CN') */
  code: string;
  /** 语言显示名称 (例如: 'English', '中文') */
  displayName: string;
}

/**
 * LanguageItem 组件的属性接口
 */
export interface LanguageItemProps {
  /** 语言对象，包含代码和显示名称 */
  lang: Language;
  /** 是否为当前选中的语言 */
  selected?: boolean;
  /** 语言被选中时的回调函数，接收语言代码作为参数 */
  onSelected?: (languageCode: string) => void;
}

/**
 * 语言选择列表项组件
 * 
 * @description 渲染单个语言选项，支持点击选择功能
 * @example
 *