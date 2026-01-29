/**
 * WindowFrame - 窗框参数化模型
 * 窗框是窗户的边框结构，继承自参数化模型基类
 */

import { ParametricModel, ParametricModel_IO } from '../../../parametric/ParametricModel';
import { Entity } from '../../../scene/Entity';
import { EntityField } from '../../../scene/decorators';
import * as THREE from 'three';

/**
 * 窗框参数接口
 */
export interface WindowFrameParameters {
  /** 起点位置 */
  from?: THREE.Vector3;
  /** 终点位置 */
  to?: THREE.Vector3;
  /** 标高 */
  elevation?: number;
  /** 高度 */
  height?: number;
  /** 窗户配置 */
  window?: {
    materialData?: {
      /** 接缝宽度 */
      seamWidth?: number;
    };
  };
}

/**
 * WindowFrame_IO - 窗框序列化处理器
 */
export class WindowFrame_IO extends ParametricModel_IO {
  private static _instance: WindowFrame_IO;

  /**
   * 获取单例实例
   */
  static instance(): WindowFrame_IO {
    if (!WindowFrame_IO._instance) {
      WindowFrame_IO._instance = new WindowFrame_IO();
    }
    return WindowFrame_IO._instance;
  }
}

/**
 * WindowFrame - 窗框参数化模型
 */
export class WindowFrame extends ParametricModel {
  @EntityField()
  parameters!: WindowFrameParameters;

  /**
   * 构造函数
   * @param id - 实体ID
   * @param parent - 父实体
   */
  constructor(id: string = '', parent?: Entity) {
    super(id, parent);
    
    // 初始化默认参数
    this.parameters = {
      from: new THREE.Vector3(0, 0, 0),
      to: new THREE.Vector3(0, 0, 0),
      elevation: 0,
      height: 0
    };
  }

  /**
   * 通过参数初始化
   * @param params - 初始化参数
   */
  initByParameters(params: WindowFrameParameters): void {
    super.initByParameters(params);
    
    // 如果存在窗户材质数据，设置接缝宽度为0
    if (params.window?.materialData) {
      if (!this.parameters.window) {
        this.parameters.window = {};
      }
      if (!this.parameters.window.materialData) {
        this.parameters.window.materialData = {};
      }
      this.parameters.window.materialData.seamWidth = 0;
    }
  }

  /**
   * 获取IO处理器
   */
  getIO(): WindowFrame_IO {
    return WindowFrame_IO.instance();
  }
}

// 注册实体类
declare global {
  namespace HSConstants {
    namespace ModelClass {
      const NgParametricWindow: string;
    }
  }
}

if (typeof Entity !== 'undefined' && Entity.registerClass) {
  Entity.registerClass(
    (globalThis as any).HSConstants?.ModelClass?.NgParametricWindow || 'NgParametricWindow',
    WindowFrame
  );
}