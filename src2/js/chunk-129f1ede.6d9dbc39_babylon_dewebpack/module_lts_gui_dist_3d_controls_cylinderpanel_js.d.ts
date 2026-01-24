/**
 * 3D圆柱形面板控件，用于在圆柱体表面排列子元素
 * Module: cylinderPanel
 */

import { Observable } from 'core/Misc/observable';
import { Vector3, Matrix, Axis, Space, TmpVectors } from 'core/Maths/math.vector';
import { VolumeBasedPanel } from './volumeBasedPanel';
import { Container3D } from './container3D';

/**
 * 网格节点信息
 */
export interface GridNode {
  /** 网格的3D网格对象 */
  mesh?: {
    /** 使网格朝向指定位置 */
    lookAt(target: Vector3): void;
    /** 旋转网格 */
    rotate(axis: Vector3, angle: number, space: Space): void;
  };
  /** 节点位置 */
  position: Vector3;
}

/**
 * 圆柱形面板 - 在圆柱体表面按网格排列3D控件
 * 继承自VolumeBasedPanel，提供圆柱形布局能力
 */
export declare class CylinderPanel extends VolumeBasedPanel {
  private _radius;

  /**
   * 获取或设置圆柱体半径
   * 修改半径会触发子元素重新排列
   * @default 5
   */
  get radius(): number;
  set radius(value: number);

  /**
   * 将网格节点映射到圆柱体表面
   * 根据容器的方向设置，调整网格的朝向
   * @param node - 要映射的网格节点
   * @param position - 网格在2D平面的位置坐标
   */
  protected _mapGridNode(node: GridNode, position: Vector3): void;

  /**
   * 将2D坐标映射到圆柱体表面的3D坐标
   * 使用圆柱坐标系统进行转换
   * @param position - 2D平面坐标（x用于计算弧度，y为高度）
   * @returns 圆柱体表面的3D坐标
   */
  private _cylindricalMapping(position: Vector3): Vector3;

  constructor();
}