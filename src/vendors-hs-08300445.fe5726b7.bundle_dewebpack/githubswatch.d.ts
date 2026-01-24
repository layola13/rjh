/**
 * GitHub风格的色块组件
 * 用于颜色选择器中显示单个颜色样本
 */

import React from 'react';
import { HandleHover, ColorResult } from 'react-color';
import { Swatch } from './Swatch';

/**
 * GithubSwatch组件的属性接口
 */
export interface GithubSwatchProps {
  /** 鼠标悬停状态 */
  hover?: boolean;
  /** 颜色值 */
  color: string;
  /** 点击事件回调 */
  onClick?: (color: ColorResult, event: React.MouseEvent) => void;
  /** 悬停事件回调 */
  onSwatchHover?: (color: ColorResult, event: React.MouseEvent) => void;
}

/**
 * 内部样式接口
 */
interface SwatchStyles {
  swatch: React.CSSProperties;
}

/**
 * GitHub风格的色块组件（不带悬停处理）
 * 显示一个25x25的颜色方块，悬停时显示高亮边框和阴影
 */
export const GithubSwatch: React.FC<GithubSwatchProps> = ({
  hover,
  color,
  onClick,
  onSwatchHover
}) => {
  /** 悬停时的焦点样式 */
  const focusStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 2,
    outline: '2px solid #fff',
    boxShadow: '0 0 5px 2px rgba(0, 0, 0, 0.25)'
  };

  /** 基础样式 */
  const baseSwatchStyle: React.CSSProperties = {
    width: '25px',
    height: '25px',
    fontSize: '0'
  };

  /** 根据悬停状态计算最终样式 */
  const styles: SwatchStyles = {
    swatch: hover ? { ...baseSwatchStyle, ...focusStyle } : baseSwatchStyle
  };

  return (
    <div style={styles.swatch}>
      <Swatch
        color={color}
        onClick={onClick}
        onHover={onSwatchHover}
        focusStyle={focusStyle}
      />
    </div>
  );
};

/**
 * 默认导出：带悬停处理的GithubSwatch组件
 * 自动追踪鼠标悬停状态并传递给组件
 */
export default HandleHover<GithubSwatchProps>(GithubSwatch);