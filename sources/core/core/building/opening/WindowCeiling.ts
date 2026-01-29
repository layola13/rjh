/**
 * WindowCeiling - 窗天花板
 * 窗户上方的天花板处理，用于处理窗洞口顶部的装饰面
 */

import { ExtrudedBody, ExtrudedBody_IO } from '../ExtrudedBody';
import { Entity } from '../../scene/Entity';
import * as THREE from 'three';

/**
 * 窗天花板参数接口
 */
export interface WindowCeilingParameters {
  /** 挤出方向 */
  direction?: THREE.Vector3;
  /** 材质数据 */
  materialData?: any;
  /** 内部材质数据 */
  innerMaterialData?: any;
}

/**
 * WindowCeiling_IO - 窗天花板序列化处理器
 */
export class WindowCeiling_IO extends ExtrudedBody_IO {
  private static _instance: WindowCeiling_IO;

  /**
   * 加载实体数据
   * @param entity - 目标实体
   * @param data - 序列化数据
   * @param options - 加载选项
   */
  load(entity: WindowCeiling, data: any, options?: any): void {
    super.load(entity, data, options);
    // 加载完成后触发参数变更
    entity.onParametersChanged();
  }

  /**
   * 获取单例实例
   */
  static instance(): WindowCeiling_IO {
    if (!WindowCeiling_IO._instance) {
      WindowCeiling_IO._instance = new WindowCeiling_IO();
    }
    return WindowCeiling_IO._instance;
  }
}

/**
 * WindowCeiling - 窗天花板模型
 * 继承自ExtrudedBody，表示窗户上方的天花板装饰面
 */
export class WindowCeiling extends ExtrudedBody {
  parameters!: WindowCeilingParameters;

  /**
   * 构造函数
   * @param id - 实体ID
   * @param parent - 父实体
   */
  constructor(id: string = '', parent?: Entity) {
    super(id, parent);
  }

  /**
   * 通过参数初始化
   * @param params - 初始化参数
   */
  initByParameters(params: WindowCeilingParameters): void {
    // 设置挤出方向为向下（Z轴负方向）
    params.direction = new THREE.Vector3(0, 0, -1);
    
    super.initByParameters(params);
    
    // 添加吸附面键
    this.addSnappingFaceKey('extrudedface');
    
    // 设置默认材质
    if (typeof HSConstants !== 'undefined' && HSConstants.Constants?.DEFAULT_WALL_INNER_MATERIAL) {
      const MaterialData = (globalThis as any).MaterialData;
      if (MaterialData?.create) {
        this.parameters.materialData = MaterialData.create(
          HSConstants.Constants.DEFAULT_WALL_INNER_MATERIAL
        );
      }
    }
  }

  /**
   * 参数变更回调
   */
  onParametersChanged(): void {
    super.onParametersChanged();
    
    const params = this.parameters;
    if (!params) return;

    // 如果有内部材质数据，应用到挤出面
    if (params.innerMaterialData) {
      this.setMaterial('extrudedface', params.innerMaterialData);
    } else {
      // 使用默认白色涂料材质
      if (typeof HSCore !== 'undefined' && HSCore.Material?.Manager) {
        const manager = HSCore.Material.Manager.instance();
        const defaultMaterial = manager.getDefaultMaterialData('DEFAULT_WALL_WHITE_PAINT');
        if (defaultMaterial) {
          this.setMaterial('extrudedface', defaultMaterial.clone());
        }
      }
    }
  }

  /**
   * 获取IO处理器
   */
  getIO(): WindowCeiling_IO {
    return WindowCeiling_IO.instance();
  }
}

// 全局声明
declare global {
  namespace HSConstants {
    namespace ModelClass {
      const NgParametricWindowCeiling: string;
    }
    namespace Constants {
      const DEFAULT_WALL_INNER_MATERIAL: string;
    }
  }
  
  namespace HSCore {
    namespace Material {
      class Manager {
        static instance(): Manager;
        getDefaultMaterialData(name: string): any;
      }
    }
  }
}

// 注册实体类
if (typeof Entity !== 'undefined' && Entity.registerClass) {
  Entity.registerClass(
    (globalThis as any).HSConstants?.ModelClass?.NgParametricWindowCeiling || 'NgParametricWindowCeiling',
    WindowCeiling
  );
}