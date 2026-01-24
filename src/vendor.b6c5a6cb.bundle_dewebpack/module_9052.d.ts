/**
 * NoiseFilter - 噪声滤镜效果
 * 
 * 为纹理添加随机噪声效果，常用于创建颗粒感或模拟胶片效果。
 * 基于 PixiJS Filter 系统实现。
 * 
 * @module @pixi/filter-noise
 * @version 5.2.4
 * @license MIT
 */

import { Filter } from '@pixi/core';

/**
 * 噪声滤镜类
 * 
 * 通过在每个像素添加随机值来创建噪声效果。
 * 使用 GLSL 着色器实现高性能的 GPU 加速渲染。
 * 
 * @example
 *