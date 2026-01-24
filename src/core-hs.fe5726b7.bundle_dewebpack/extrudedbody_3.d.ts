/**
 * 挤出体模型模块
 * 提供挤出几何体的参数化建模功能
 */

import { ParametricModel_IO, ParametricModel } from './ParametricModel';
import { Entity } from './Entity';

/**
 * 挤出体参数接口
 */
interface ExtrudedBodyParameters {
  /** 挤出轮廓的点集合 */
  points?: Array<{ x: number; y: number; z: number }>;
  /** 挤出方向向量 */
  direction?: { x: number; y: number; z: number };
  /** 材质数据 */
  materialData?: MaterialData;
  /** 多面材质数据映射表 */
  materialDatas?: Record<string, MaterialData>;
}

/**
 * 材质数据接口
 */
interface MaterialData {
  [key: string]: unknown;
}

/**
 * 序列化选项接口
 */
interface SerializationOptions {
  [key: string]: unknown;
}

/**
 * 序列化后的数据结构
 */
interface SerializedExtrudedBody {
  /** 吸附面键集合 */
  snappingFaceKeys: string[];
  /** 隐藏面键集合 */
  hideFaceKeys: string[];
  [key: string]: unknown;
}

/**
 * 挤出体模型的序列化/反序列化处理器
 * 负责挤出体数据的持久化和恢复
 */
export class ExtrudedBody_IO extends ParametricModel_IO {
  /**
   * 将挤出体实例序列化为JSON对象
   * @param entity - 要序列化的挤出体实例
   * @param callback - 序列化后的回调函数
   * @param includeMetadata - 是否包含元数据
   * @param options - 序列化选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: ExtrudedBody,
    callback?: (data: unknown[], entity: ExtrudedBody) => void,
    includeMetadata: boolean = true,
    options: SerializationOptions = {}
  ): unknown[] {
    const serializedData = super.dump(entity, undefined, includeMetadata, options);
    const primaryData = serializedData[0] as SerializedExtrudedBody;
    
    // 保存吸附面和隐藏面的配置
    primaryData.snappingFaceKeys = entity.snappingFaceKeys;
    primaryData.hideFaceKeys = entity.hideFaceKeys;
    
    if (callback) {
      callback(serializedData, entity);
    }
    
    return serializedData;
  }

  /**
   * 从序列化数据恢复挤出体实例
   * @param entity - 要填充的挤出体实例
   * @param data - 序列化的数据
   * @param context - 加载上下文
   */
  load(
    entity: ExtrudedBody,
    data: SerializedExtrudedBody,
    context: unknown
  ): void {
    super.load(entity, data, context);
    
    // 触发参数变更以更新材质等属性
    entity.onParametersChanged();
    
    // 恢复吸附面配置
    if (data.snappingFaceKeys) {
      entity.snappingFaceKeys = data.snappingFaceKeys;
    }
    
    // 恢复隐藏面配置
    if (data.hideFaceKeys) {
      entity.hideFaceKeys = data.hideFaceKeys;
    }
  }

  /**
   * 获取单例实例
   */
  static instance(): ExtrudedBody_IO {
    // 单例实现（具体实现由基类提供）
    return new ExtrudedBody_IO();
  }
}

/**
 * 挤出体参数化模型类
 * 通过轮廓点集和挤出方向创建三维几何体
 */
export class ExtrudedBody extends ParametricModel {
  /** 可用于吸附的面键集合 */
  snappingFaceKeys: string[] = [];
  
  /** 需要隐藏的面键集合 */
  hideFaceKeys: string[] = [];
  
  /** 挤出体参数 */
  parameters: ExtrudedBodyParameters;

  /**
   * 构造函数
   * @param id - 实体唯一标识符
   * @param data - 初始化数据
   */
  constructor(id: string = "", data?: unknown) {
    super(id, data);
    this.snappingFaceKeys = [];
    this.hideFaceKeys = [];
    this.parameters = {
      points: []
    };
  }

  /**
   * 通过参数对象初始化挤出体
   * @param params - 初始化参数
   */
  initByParameters(params: ExtrudedBodyParameters): void {
    super.initByParameters(params);
    
    if (params.points != null) {
      this.parameters.points = params.points;
    }
    
    if (params.direction != null) {
      this.parameters.direction = params.direction;
    }
  }

  /**
   * 参数变更时的回调
   * 更新所有面的材质配置
   */
  onParametersChanged(): void {
    const params = this.parameters;
    
    // 应用通用材质到原始面和挤出面
    if (params.materialData) {
      this.setMaterial("originalface", params.materialData);
      this.setMaterial("extrudedface", params.materialData);
      
      // 为每个侧面应用材质
      if (this.parameters.points) {
        for (let i = 0; i < this.parameters.points.length; ++i) {
          this.setMaterial(`sideface${i}`, params.materialData);
        }
      }
    }
    
    // 应用特定面的材质配置
    if (params.materialDatas) {
      for (const faceKey of Object.keys(params.materialDatas)) {
        this.setMaterial(faceKey, params.materialDatas[faceKey]);
      }
    }
  }

  /**
   * 添加可吸附面
   * @param faceKey - 面的唯一键
   */
  addSnappingFaceKey(faceKey: string): void {
    this.snappingFaceKeys.push(faceKey);
  }

  /**
   * 添加隐藏面
   * @param faceKey - 面的唯一键
   */
  addHideFaceKey(faceKey: string): void {
    this.hideFaceKeys.push(faceKey);
  }

  /**
   * 获取序列化处理器实例
   * @returns IO处理器
   */
  getIO(): ExtrudedBody_IO {
    return ExtrudedBody_IO.instance();
  }

  /**
   * 设置面材质（由基类提供）
   * @param faceKey - 面键
   * @param materialData - 材质数据
   */
  protected setMaterial(faceKey: string, materialData: MaterialData): void {
    // 实现由基类提供
  }
}

// 注册实体类到全局类型系统
declare const HSConstants: {
  ModelClass: {
    NgParametricExtrudedBody: string;
  };
};

Entity.registerClass(HSConstants.ModelClass.NgParametricExtrudedBody, ExtrudedBody);