/**
 * 3D操作轴配置模块
 * 包含旋转、移动、缩放等操作的视觉样式和比例因子定义
 */

import { Vector3 } from './Vector3';

/**
 * 旋转指示器在不同视图模式下的缩放因子
 */
export declare const RotationScaleFactor: {
  /** 第一人称视图缩放比例 */
  FPScale: number;
  /** 轨道视图缩放比例 */
  OrbitScale: number;
  /** 正交视图缩放比例 */
  OrthScale: number;
};

/**
 * 旋转指示器的颜色和透明度配置
 */
export declare const RotationColor: {
  /** XY平面法向圆弧颜色 (蓝色: 0x327FFF) */
  normalArcColor_xy: number;
  /** 默认法向圆弧颜色 (蓝色: 0x327FFF) */
  normalArcColor: number;
  /** 悬停时圆弧颜色 (青色: 0x005DFF) */
  hoverArcColor: number;
  /** XY平面法向圆弧透明度 */
  normalOpacity_xy: number;
  /** 默认法向圆弧透明度 */
  normalOpacity: number;
  /** 悬停时透明度 */
  hoverOpacity: number;
};

/**
 * 调整框颜色配置
 */
export declare const ResizeBoxColor: {
  /** 正常状态颜色 (蓝色: 0x0000FF) */
  NormalColor: number;
  /** 警告状态颜色 (红色: 0xFF0000) */
  WaringColor: number;
};

/**
 * 移动箭头在不同视图模式下的缩放因子
 */
export declare const MoveArrowScaleFactor: {
  /** 第一人称视图X轴缩放 */
  FPScaleX: number;
  /** 第一人称视图Y轴缩放 */
  FPScaleY: number;
  /** 第一人称视图半径缩放 */
  FPScaleRadius: number;
  /** 轨道视图X轴缩放 */
  OrbitScaleX: number;
  /** 轨道视图Y轴缩放 */
  OrbitScaleY: number;
  /** 轨道视图半径缩放 */
  OrbitScaleRadius: number;
  /** 正交视图X轴缩放 */
  OrthScaleX: number;
  /** 正交视图Y轴缩放 */
  OrthScaleY: number;
  /** 正交视图半径缩放 */
  OrthScaleRadius: number;
};

/**
 * 移动箭头的颜色和透明度配置
 */
export declare const MoveArrowColor: {
  /** 正常状态红色箭头 (0xF74D4C) */
  normalRed: number;
  /** 悬停状态红色箭头 (0xF42120) */
  hoverRed: number;
  /** 正常状态蓝色箭头 (0x327FFF) */
  normalBlue: number;
  /** 悬停状态蓝色箭头 (0x005DFF) */
  hoverBlue: number;
  /** 正常状态绿色箭头 (0x50CE18) */
  normalGreen: number;
  /** 悬停状态绿色箭头 (0x43D100) */
  hoverGreen: number;
  /** 正常状态透明度 */
  normalOpacity: number;
  /** 悬停状态透明度 */
  hoverOpacity: number;
};

/**
 * 常用向量定义（只读）
 * 用于定义旋转平面的法向量和角度零点方向
 */
export declare const ConstantVector: {
  /** XY平面角度零点方向 (Y轴正方向) */
  xyAngleZeroDir: Readonly<Vector3>;
  /** YZ平面角度零点方向 (Z轴正方向) */
  yzAngleZeroDir: Readonly<Vector3>;
  /** XZ平面角度零点方向 (X轴正方向) */
  xzAngleZeroDir: Readonly<Vector3>;
  /** XY平面法向量 (Z轴正方向) */
  xyNormal: Readonly<Vector3>;
  /** YZ平面法向量 (X轴正方向) */
  yzNormal: Readonly<Vector3>;
  /** XZ平面法向量 (Y轴正方向) */
  xzNormal: Readonly<Vector3>;
};

/**
 * 坐标轴在不同视图模式下的缩放因子
 */
export declare const AxisScaleFactor: {
  /** 第一人称视图缩放比例 */
  FPScale: number;
  /** 轨道视图缩放比例 */
  OrbitScale: number;
  /** 正交视图缩放比例 */
  OrthScale: number;
};

/**
 * 三维坐标轴颜色枚举
 */
export declare enum AxisColorEnum {
  /** X轴颜色 (红色: 0xF74D4C) */
  AxisXColor = 16206924,
  /** Y轴颜色 (蓝色: 0x327FFF) */
  AxisYColor = 3309055,
  /** Z轴颜色 (绿色: 0x50CE18) */
  AxisZColor = 5293848
}