/**
 * 吊顶灯光计算模块
 * 负责计算天花板面隐藏时的灯光位置和属性
 * Module: module_30599
 * Original ID: 30599
 */

import BaseLight from './module_42288';

/**
 * 灯光属性接口
 */
interface LightProperties {
  /** 灯光位置坐标 */
  position: {
    x: number;
    y: number;
    z: number;
  };
  /** IES光度文件配置 */
  ies: unknown;
  /** 光照强度 */
  intensity: number;
  /** 色温 */
  temperature: number;
}

/**
 * 实体对象接口
 */
interface Entity {
  /** 获取实体位置 */
  getPosition(): THREE.Vector3;
  /** 获取实体尺寸 */
  getSize(): THREE.Vector3;
  /** 前向向量 */
  frontForwardVec: THREE.Vector2;
}

/**
 * 目标对象接口
 */
interface Target {
  /** 判断天花板面是否隐藏 */
  isCeilingFaceHidden(): boolean;
}

/**
 * 吊顶灯光计算类
 * 继承自基础灯光类，专门处理天花板灯光的位置计算
 */
export default class CeilingLightComputer extends BaseLight {
  /** 灯光位置偏移量（米） */
  static readonly offset: number = 0.16;

  /**
   * 计算灯光属性
   * @param entity - 实体对象，包含位置、尺寸等信息
   * @param target - 目标对象，用于判断天花板状态
   * @param param2 - 第三个参数（具体类型待定）
   * @param param3 - 第四个参数（具体类型待定）
   * @returns 灯光属性数组，天花板隐藏时返回空数组
   */
  protected _compute(
    entity: Entity,
    target: Target,
    param2: unknown,
    param3: unknown
  ): LightProperties[] {
    // 如果天花板面被隐藏，不计算灯光
    if (target.isCeilingFaceHidden()) {
      return [];
    }

    // 获取实体的基础位置
    const position = entity.getPosition();
    
    // 计算垂直偏移量：实体高度的一半加上固定偏移
    const verticalOffset = entity.getSize().y / 2 + CeilingLightComputer.offset;
    
    // 获取默认灯光属性
    const { intensity, temperature, ies } = super.getDefaultLight(entity, target, param2);
    
    // 实体平面位置（X-Y平面）
    const entityPlanePosition = new THREE.Vector2(position.x, position.y);
    
    // 计算灯光最终位置
    const lightPlanePosition = new THREE.Vector2();
    lightPlanePosition.addVectors(
      entityPlanePosition,
      entity.frontForwardVec.multiplyScalar(verticalOffset)
    );

    // 返回完整的灯光配置
    return [
      {
        ...super.getDefaultLight(entity, target, param2),
        position: {
          x: lightPlanePosition.x,
          y: lightPlanePosition.y,
          z: position.z
        },
        ies,
        intensity,
        temperature
      }
    ];
  }
}