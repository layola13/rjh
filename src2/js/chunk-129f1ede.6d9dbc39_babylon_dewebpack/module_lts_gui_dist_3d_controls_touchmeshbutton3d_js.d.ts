/**
 * 3D触摸网格按钮控件
 * 基于TouchButton3D扩展，用于将现有Mesh转换为可交互的3D按钮
 * @module TouchMeshButton3D
 */

import { TouchButton3D } from './touchButton3D';
import { Mesh } from '@babylonjs/core';

/**
 * GUI3D保留数据存储接口
 * 用于在Mesh的metadata中注入控件引用
 */
interface GUI3DReservedDataStore {
  /** 关联的控件实例 */
  control: TouchMeshButton3D;
}

/**
 * 3D触摸网格按钮类
 * 将现有的3D网格对象转换为具有触摸交互功能的按钮控件
 * 
 * @example
 *