/**
 * BOM3 数据转换模块
 * 提供将BOM数据转换为BOM3格式的功能
 */

import { FaceGroupPredicate } from './module_316619';
import { B3Context } from './module_160188';
import { B3Layer } from './module_250190';
import { B3Pave } from './module_648125';
import { B3Design } from './module_528189';
import { B3Slab } from './module_53251';
import { B3Opening } from './module_915847';

/**
 * BOM3响应状态
 */
export interface Bom3Status {
  /** 状态码，-1表示成功 */
  code: number;
  /** 状态描述信息 */
  message: string;
}

/**
 * 设计信息接口
 */
export interface DesignInfo {
  /** 内部面积 */
  innerArea: number;
  /** 设计面积 */
  designArea: number;
  /** 其他设计属性 */
  [key: string]: unknown;
}

/**
 * 图层数据接口
 */
export interface LayerData {
  /** 内部面积 */
  innerArea?: number;
  /** 设计面积 */
  designArea?: number;
  /** 其他图层属性 */
  [key: string]: unknown;
}

/**
 * 面组数据接口
 */
export interface FaceGroupData {
  /** 面ID数组 */
  faceIds: string[];
  /** 2D数据 */
  '2D': unknown;
}

/**
 * 板坯开口数据类型
 */
export type SlabOpeningData = unknown;

/**
 * 板坯数据类型
 */
export type SlabData = unknown;

/**
 * BOM3数据结构
 */
export interface Bom3Data {
  /** 响应状态 */
  status: Bom3Status;
  /** 数据载荷 */
  data: {
    /** 设计信息 */
    designInfo: DesignInfo;
    /** 图层列表 */
    layers: LayerData[];
    /** 板坯列表 */
    slabs: SlabData[];
    /** 面组列表 */
    faceGroups: FaceGroupData[];
    /** 板坯开口列表 */
    slabOpenings: SlabOpeningData[];
  };
}

/**
 * 面组实例接口
 */
interface FaceGroupInstance {
  /** 获取参数值 */
  getParameterValue(paramName: string): string;
}

/**
 * 面组实体接口
 */
interface FaceGroupEntity {
  /** 实例引用 */
  instance: FaceGroupInstance;
}

/**
 * 将BOM数据转换为BOM3格式
 * 
 * @param contextData - BOM上下文数据
 * @returns BOM3格式的数据对象
 * 
 * @remarks
 * 该函数执行以下操作：
 * 1. 构建设计信息（Design Info）
 * 2. 处理所有图层数据
 * 3. 查找并转换面组（Face Groups）
 * 4. 转换板坯（Slabs）数据
 * 5. 转换开口（Openings）数据
 * 6. 计算并汇总面积信息
 */
export function bomDataToBom3(contextData: unknown): Bom3Data {
  // 初始化B3上下文
  const context = new B3Context(contextData);
  
  // 构建设计信息
  const design = new B3Design(context);
  const designInfo = design.buildBom3Data(context.designEntity);
  
  // 处理图层数据
  const layerBuilder = new B3Layer(context);
  const layers: LayerData[] = [];
  
  context.layers.forEach((layer: unknown) => {
    layers.push(layerBuilder.buildBom3Data(layer));
  });
  
  // 查找并处理面组数据
  const faceGroupPredicate = new FaceGroupPredicate();
  const faceGroupEntities = context.dbApi.findAll(
    context.paves,
    faceGroupPredicate
  ) as FaceGroupEntity[];
  
  const paveBuilder = new B3Pave(context);
  const faceGroups: FaceGroupData[] = faceGroupEntities.map(
    (entity: FaceGroupEntity) => {
      const paveData = paveBuilder.buildBom3Data(entity);
      const faceGroupIdParam = entity.instance.getParameterValue('faceGroupId');
      
      return {
        faceIds: faceGroupIdParam.split('-'),
        '2D': paveData
      };
    }
  );
  
  // 处理板坯数据
  const slabBuilder = new B3Slab(context);
  const slabs: SlabData[] = context.slabs.map((slab: unknown) => {
    return slabBuilder.buildBom3Data(slab);
  });
  
  // 处理开口数据
  const openingBuilder = new B3Opening(context);
  const slabOpenings: SlabOpeningData[] = context.slabHoles.map(
    (hole: unknown) => {
      return openingBuilder.buildBom3Data(hole);
    }
  );
  
  // 计算总内部面积
  designInfo.innerArea = layers.reduce(
    (total: number, layer: LayerData) => {
      return total + (layer.innerArea || 0);
    },
    0
  );
  
  // 计算总设计面积
  designInfo.designArea = layers.reduce(
    (total: number, layer: LayerData) => {
      return total + (layer.designArea || 0);
    },
    0
  );
  
  return {
    status: {
      code: -1,
      message: 'OK'
    },
    data: {
      designInfo,
      layers,
      slabs,
      faceGroups,
      slabOpenings
    }
  };
}

/**
 * 转换为BOM3格式（未实现）
 * 
 * @throws {Error} 该方法尚未实现
 * @deprecated 请使用 bomDataToBom3 函数
 */
export function toBom3(): never {
  throw new Error('toBom3 is not implemented. Use bomDataToBom3 instead.');
}