import { Point, ObservablePoint, Rectangle } from './math';
import { Texture } from './texture';
import { Container } from './display';
import { BLEND_MODES } from './constants';
import { Shader } from './shader';

/**
 * Sprite 配置选项
 */
export interface SpriteOptions {
  /** 纹理是否需要销毁 */
  texture?: boolean;
  /** 基础纹理是否需要销毁 */
  baseTexture?: boolean;
}

/**
 * Sprite 类 - 用于显示纹理的基础显示对象
 * 
 * Sprite 是 PixiJS 中最常用的显示对象之一，用于在屏幕上显示图像/纹理。
 * 它继承自 Container，因此可以包含子元素。
 * 
 * @example
 *