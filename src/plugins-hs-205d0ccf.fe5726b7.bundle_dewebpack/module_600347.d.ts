import React from 'react';

/**
 * 相机按钮配置接口
 * 定义单个相机视图按钮的所有可用配置选项
 */
interface CameraButtonConfig {
  /** 相机位置控件配置 */
  cameraposition?: unknown;
  /** 相机设置控件配置 */
  setting?: unknown;
  /** 相机视图控件配置 */
  view?: unknown;
  /** 居中适配控件配置 */
  fitcenter?: unknown;
}

/**
 * 相机根组件数据接口
 */
interface CameraRootData {
  /** 当前选中的按钮索引 */
  selectedIndex: number;
  /** 按钮配置数组 */
  btns: CameraButtonConfig[];
  /** 是否禁用组件 */
  disable?: boolean;
}

/**
 * 相机根组件属性接口
 */
interface CameraRootProps {
  /** 组件数据配置 */
  data?: CameraRootData;
}

/**
 * 相机根组件状态接口
 */
interface CameraRootState {
  /** 当前组件数据状态 */
  data: CameraRootData;
}

/**
 * 相机根容器组件
 * 
 * 渲染相机控制面板，根据选中的按钮索引显示对应的控制选项，
 * 包括相机位置、设置、视图和居中适配等功能。
 * 
 * @example
 *