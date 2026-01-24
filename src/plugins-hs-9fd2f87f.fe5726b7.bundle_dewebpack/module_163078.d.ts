/**
 * 3D模型实例化工具模块
 * 提供模型边界盒计算、实例化转换和路径分离功能
 */

/** 面数据结构 */
interface Face {
  /** 面的唯一标识 */
  id: string;
  /** SVG路径数据 */
  path: string | Array<[string, ...number[]]>;
}

/** 模型数据结构 */
interface ModelData {
  /** 内部面集合 */
  innerFaces: Face[];
  /** 外部面集合 */
  outterFaces: Array<{ path: string }>;
}

/** 边界盒坐标 */
interface BoundingBox {
  /** 左上角X坐标 */
  x: number;
  /** 左上角Y坐标 */
  y: number;
  /** 右下角X坐标 */
  x2: number;
  /** 右下角Y坐标 */
  y2: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 中心点X坐标 */
  cx: number;
  /** 中心点Y坐标 */
  cy: number;
}

/** 实例化参数 */
interface InstanceParameters {
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 中心点X坐标 */
  cx: number;
  /** 中心点Y坐标 */
  cy: number;
}

/** 实例化后的模板数据 */
interface InstancedTemplate {
  /** 面ID */
  id: string;
  /** 转换后的路径 */
  path: string;
}

/** 实例化后的模型数据 */
interface InstancedModelData {
  /** 模板面数据 */
  template: InstancedTemplate[];
  /** 外部面路径集合 */
  outterFaces: string[];
}

/** 实例化结果 */
interface InstanceResult {
  /** 实例化后的模型数据 */
  mdl: InstancedModelData;
  /** 实例边界盒 */
  instancedBBox: BoundingBox;
}

/** 带模型数据的实例结果（用于路径分离） */
interface InstanceResultWithModel {
  mdl: {
    template: Array<{
      id: string;
      path: Array<[string, ...number[]]>;
    }>;
  };
}

/**
 * 3D模型工具类
 * 提供模型边界计算、实例化和路径处理功能
 */
declare const ModelUtils: {
  /**
   * 获取模型的边界盒
   * @param model - 模型数据
   * @returns 边界盒对象，如果模型为空则返回null
   */
  getBoundingBox(model: ModelData | null | undefined): BoundingBox | null;

  /**
   * 根据参数创建模型实例
   * 对模型进行缩放、镜像和平移变换
   * @param model - 源模型数据
   * @param params - 实例化参数（宽高和中心点）
   * @returns 实例化结果，包含转换后的模型和边界盒
   */
  getInstanceModel(
    model: ModelData | null | undefined,
    params: InstanceParameters
  ): InstanceResult | undefined;

  /**
   * 将模型路径分离为独立的面
   * 将连续路径按M命令分割成多个独立面
   * @param instanceResult - 实例化结果对象，会直接修改其中的template数组
   */
  pathsSeperate(instanceResult: InstanceResultWithModel): void;
};

export default ModelUtils;