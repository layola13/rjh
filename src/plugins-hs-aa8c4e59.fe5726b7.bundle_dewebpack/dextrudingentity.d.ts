import { CustomizationEntity } from './CustomizationEntity';
import { CustomizationEntityFactory } from './CustomizationEntityFactory';
import { HSConstants } from './HSConstants';
import { Parameter, DataType } from './Parameter';
import { CustomizationParamKey } from './CustomizationParamKey';
import { genMaterialInfoFromMeta } from './MaterialUtils';

/**
 * 材质元数据接口
 */
interface MaterialMetadata {
  [key: string]: unknown;
}

/**
 * 材质接口
 */
interface Material {
  /** 材质元数据 */
  metadata?: MaterialMetadata;
}

/**
 * 拉伸实体数据接口
 */
interface ExtrudingEntityData {
  /** X轴尺寸 */
  XSize: number;
  /** Y轴尺寸 */
  YSize: number;
  /** Z轴尺寸 */
  ZSize: number;
  /** 材质信息 */
  material: Material;
}

/**
 * 实例数据结果接口
 */
interface InstanceData {
  /**
   * 添加参数到实例数据
   * @param parameter 要添加的参数
   */
  addParameter(parameter: Parameter): void;
}

/**
 * 拉伸实体类
 * 用于处理3D拉伸几何体的自定义实体
 */
export class DExtrudingEntity extends CustomizationEntity {
  /**
   * 获取实体的实例数据
   * @param entityData 拉伸实体的数据对象
   * @returns 包含尺寸和材质参数的实例数据
   */
  getInstanceData(entityData: ExtrudingEntityData): InstanceData {
    // 调用父类方法获取基础实例数据
    const instanceData = super.getInstanceData(entityData);

    // 添加尺寸参数（X、Y、Z三个维度）
    instanceData.addParameter(
      new Parameter(
        CustomizationParamKey.Size,
        [entityData.XSize, entityData.YSize, entityData.ZSize],
        DataType.ArrayPoint3D
      )
    );

    // 如果存在材质元数据，添加材质参数
    if (entityData.material.metadata) {
      instanceData.addParameter(
        new Parameter(
          CustomizationParamKey.Material,
          genMaterialInfoFromMeta(entityData.material.metadata),
          DataType.Object
        )
      );
    }

    return instanceData;
  }
}

// 注册拉伸实体创建器到工厂
CustomizationEntityFactory.registerEntityCreator(
  HSConstants.ModelClass.DExtruding,
  DExtrudingEntity
);