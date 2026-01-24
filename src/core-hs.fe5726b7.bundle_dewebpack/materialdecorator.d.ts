/**
 * 材质装饰器模块
 * 用于处理材质相关逻辑，支持混合材质和普通材质的获取
 * @module MaterialDecorator
 */

import { ServiceManager } from './ServiceManager';

/**
 * 材质数据接口
 * 描述材质对象的完整结构
 */
interface Material {
  /** 材质纹理URI地址 */
  textureURI?: string;
  
  /** 材质搜索标识符 */
  seekId?: string;
  
  /** 混合绘制配置，可选 */
  mixpaint?: {
    /** 混合铺设配置标识 */
    mixPave: string;
  };
}

/**
 * 材质集合返回结果
 */
interface MaterialsResult {
  /** 材质数组 */
  materials: Material[];
}

/**
 * 材质装饰器类
 * 负责封装材质对象并提供统一的材质获取接口
 * 支持处理混合材质（mixpaint）和标准材质两种类型
 */
export class MaterialDecorator {
  /** 内部持有的材质对象 */
  private readonly _material: Material;

  /**
   * 构造函数
   * @param material - 需要装饰的材质对象
   */
  constructor(material: Material) {
    this._material = material;
  }

  /**
   * 获取材质集合
   * 
   * 逻辑分支：
   * 1. 如果材质包含 mixpaint 配置，则通过 MixPaveService 获取混合材质
   * 2. 否则，检查材质是否同时具有 seekId 和 textureURI，满足条件则返回该材质
   * 
   * @returns 包含材质数组的结果对象
   */
  getMaterials(): MaterialsResult {
    // 处理混合材质场景
    if (this._material.mixpaint) {
      const { mixPave } = this._material.mixpaint;
      return ServiceManager.getMixPaveService().getMaterials(mixPave);
    }

    // 处理标准材质场景
    const materials: Material[] = [];
    const { textureURI, seekId } = this._material;

    // 仅当材质同时具有 seekId 和 textureURI 时才添加到结果中
    if (seekId && textureURI) {
      materials.push(this._material);
    }

    return { materials };
  }
}