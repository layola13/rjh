/**
 * GussetGroup 模块
 * 
 * 用于管理连接板组的图形对象，处理其在3D场景中的渲染和数据转换。
 * 该类继承自 BaseObject，负责将实体数据转换为图形渲染所需的数据结构。
 */

import { BaseObject } from './BaseObject';
import { TransUtil } from './TransUtil';
import * as THREE from 'three';

/**
 * 房间自定义属性接口
 */
interface RoomCustomAttrs {
  /** 房间类型，默认为 "none" */
  roomType: string;
}

/**
 * 元数据材质接口
 */
interface MetaDataMaterial {
  /** 模型纹理 */
  texture: THREE.Texture;
  /** 漫反射贴图UV变换矩阵 */
  diffuseMapUvTransform: THREE.Matrix3;
  /** 法线贴图UV变换矩阵 */
  normalMapUvTransform: THREE.Matrix3;
}

/**
 * 砖块视图属性接口
 */
interface BrickView {
  /** 实体ID */
  id: string;
  /** 视图平移向量 */
  viewTranslation: THREE.Vector3;
  /** 视图缩放向量 */
  viewScale: THREE.Vector3;
  /** 视图旋转四元数 */
  viewRotation: THREE.Quaternion;
}

/**
 * 元数据接口
 */
interface MetaData {
  /** 变体ID */
  variationId?: string;
  /** 查找ID */
  seekId: string;
  /** 内容类型 */
  contentType: {
    getTypeString(): string;
  };
  /** 3D模型 */
  model3d: unknown;
  /** 模型纹理 */
  modelTexture?: THREE.Texture;
}

/**
 * 模型实例接口
 */
interface ModelInstance {
  /** 砖块列表 */
  bricks: BrickView[];
  /** 元数据 */
  metaData?: MetaData;
  /** 元装饰器 */
  metaDecorator: {
    /** Z轴高度长度 */
    hZLength: number;
  };
}

/**
 * 表面实体接口
 */
interface SurfaceEntity {
  /** 模型实例映射表 */
  modelInstanceMap: Map<string, ModelInstance>;
  /** 面矩阵 */
  faceMatrix?: THREE.Matrix4;
  /** 面实体 */
  faceEntity: {
    id: string;
  };
  /**
   * 检查标志位是否开启
   * @param flag - 实体标志枚举值
   */
  isFlagOn(flag: number): boolean;
}

/**
 * 连接板组实体接口
 */
interface GussetGroupEntity {
  /** 实体ID */
  id: string;
  /** 子表面实体集合 */
  children: Record<string, SurfaceEntity>;
}

/**
 * 图形对象数据接口
 */
interface GraphicsObjectData {
  /** 实体ID */
  entityId: string;
  /** 查找ID */
  seekId: string;
  /** 内容类型 */
  contentType: string;
  /** 是否选中 */
  selected: boolean;
  /** 是否可见 */
  visible: boolean;
  /** 图形路径 */
  graphicsPath: string;
  /** 图形对象类型 */
  type: string;
  /** 世界矩阵 */
  matrixWorld: THREE.Matrix4;
  /** 材质 */
  material?: MetaDataMaterial;
  /** 模型 */
  model: unknown;
  /** 自定义属性 */
  customAttrs: RoomCustomAttrs;
  /** 模拟内容ID */
  simulatedContentId: string;
  /** 跳过合成 */
  skipComposite: boolean;
}

/**
 * 图形数据接口
 */
interface GraphicsData {
  /** 图形对象列表 */
  objects: GraphicsObjectData[];
  /** 网格定义列表 */
  meshDefs: unknown[];
}

/**
 * 上下文接口
 */
interface Context {
  /** 脏对象映射表 */
  dirtyObjectMap: Map<string, GussetGroup>;
  /** 对象映射表 */
  objectMap: Map<string, {
    updateRoomCustomAttrs(): RoomCustomAttrs | undefined;
  }>;
}

/**
 * 连接板组类
 * 
 * 负责处理连接板组的图形渲染数据生成，包括：
 * - 实体变更监听
 * - 砖块世界矩阵计算
 * - 材质数据提取
 * - 表面对象转换
 * - 图形数据导出
 */
export class GussetGroup extends BaseObject {
  /** 上下文对象 */
  protected context: Context;
  /** 连接板组实体 */
  protected entity: GussetGroupEntity;

  /**
   * 构造函数
   * @param context - 上下文对象
   * @param entity - 连接板组实体
   * @param options - 可选配置参数
   */
  constructor(context: Context, entity: GussetGroupEntity, options?: unknown) {
    super(context, entity, options);
  }

  /**
   * 实体变更回调
   * 当实体数据发生变化时，将对象标记为脏对象
   * @param entity - 变更的实体
   */
  protected _entityDirtied(entity: GussetGroupEntity): void {
    super._entityDirtied(entity);
    this.context.dirtyObjectMap.set(this.entity.id, this);
  }

  /**
   * 计算砖块的世界矩阵
   * @param brick - 砖块视图数据
   * @param faceMatrix - 面矩阵
   * @param zOffset - Z轴偏移量
   * @returns 转换后的世界矩阵
   */
  protected _getBrickWorldMatrix(
    brick: BrickView,
    faceMatrix: THREE.Matrix4,
    zOffset: number
  ): THREE.Matrix4 {
    const translation = brick.viewTranslation;
    const position = new THREE.Vector3(translation.x, translation.y, translation.z + zOffset);
    const scale = brick.viewScale;
    const rotation = brick.viewRotation;

    let matrix = new THREE.Matrix4();
    matrix.compose(position, rotation, scale);
    matrix.premultiply(faceMatrix);
    matrix = TransUtil.toModelMatrix(matrix);
    matrix = TransUtil.convertMatrixUnit(matrix, undefined);

    return matrix;
  }

  /**
   * 提取元数据材质信息
   * @param metaData - 元数据对象
   * @returns 材质数据，如果元数据不存在则返回 undefined
   */
  protected _getMetaDataMaterial(metaData?: MetaData): MetaDataMaterial | undefined {
    if (!metaData) {
      return undefined;
    }

    const diffuseUvTransform = new THREE.Matrix3();
    const uvTransformMatrix = diffuseUvTransform as any;
    if (uvTransformMatrix.setUvTransform) {
      uvTransformMatrix.setUvTransform(0, 0, 1, 1, 0, 0, 0);
    }

    const normalUvTransform = new THREE.Matrix3();

    return {
      texture: metaData.modelTexture!,
      diffuseMapUvTransform: diffuseUvTransform,
      normalMapUvTransform: normalUvTransform
    };
  }

  /**
   * 将表面实体转换为图形对象数据
   * @param surface - 表面实体
   * @param outputObjects - 输出的图形对象数组
   */
  protected _surfaceToObjects(
    surface: SurfaceEntity | undefined,
    outputObjects: GraphicsObjectData[]
  ): void {
    if (!surface) {
      return;
    }

    const modelInstanceMap = surface.modelInstanceMap;
    const faceMatrix = surface.faceMatrix;
    if (!faceMatrix) {
      return;
    }

    const baseHeight = HSCore.Util.Layer.getEntityBaseHeight(surface);
    const transformedMatrix = new THREE.Matrix4().multiplyMatrices(
      new THREE.Matrix4().makeTranslation(0, baseHeight, 0),
      faceMatrix
    );

    const faceEntityId = surface.faceEntity.id;
    const faceObject = this.context.objectMap.get(faceEntityId);
    const roomAttrs = faceObject?.updateRoomCustomAttrs();
    const customAttrs: RoomCustomAttrs = {
      roomType: roomAttrs?.roomType ?? 'none'
    };

    const isSelected = surface.isFlagOn(HSCore.Model.EntityFlagEnum.selected);
    const isVisible =
      !surface.isFlagOn(HSCore.Model.EntityFlagEnum.hidden) &&
      !surface.isFlagOn(HSCore.Model.EntityFlagEnum.removed);

    modelInstanceMap.forEach((instance: ModelInstance) => {
      const bricks = instance.bricks;
      const metaData = instance.metaData;
      if (!metaData) {
        return;
      }

      const zLength = instance.metaDecorator.hZLength;
      const seekId = metaData.variationId ?? metaData.seekId;
      const contentTypeString = metaData.contentType.getTypeString();
      const model = metaData.model3d;
      const material = this._getMetaDataMaterial(metaData);

      for (let brickIndex = 0, brickCount = bricks.length; brickIndex < brickCount; ++brickIndex) {
        const brick = bricks[brickIndex];
        const worldMatrix = this._getBrickWorldMatrix(brick, transformedMatrix, zLength);

        outputObjects.push({
          entityId: brick.id,
          seekId: seekId,
          contentType: contentTypeString,
          selected: isSelected,
          visible: isVisible,
          graphicsPath: `${brick.id}/model`,
          type: HSConstants.GraphicsObjectType.Model,
          matrixWorld: worldMatrix,
          material: material,
          model: model,
          customAttrs: customAttrs,
          simulatedContentId: seekId,
          skipComposite: true
        });
      }
    }, this);
  }

  /**
   * 转换为图形数据
   * 遍历所有子表面实体，生成图形渲染所需的完整数据结构
   * @returns 图形数据对象
   */
  public toGraphicsData(): GraphicsData {
    const graphicsData: GraphicsData = {
      objects: [],
      meshDefs: []
    };

    const entity = this.entity;
    if (!entity) {
      return graphicsData;
    }

    graphicsData.objects = [];
    const objects = graphicsData.objects;

    Object.values(entity.children).forEach((surface: SurfaceEntity) => {
      this._surfaceToObjects(surface, objects);
    });

    return graphicsData;
  }
}