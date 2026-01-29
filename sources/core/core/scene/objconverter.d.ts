/**
 * OBJ文件转换器
 * 负责将BREP（边界表示）模型转换为OBJ格式
 */
export declare class OBJConverter {
  /**
   * 单例实例
   * @private
   */
  private static _instance?: OBJConverter;

  /**
   * 将BREP模型转换为OBJ格式字符串
   * @param brep - 边界表示模型对象
   * @returns OBJ格式的字符串表示
   */
  brep2obj(brep: BrepModel): string;

  /**
   * 获取OBJConverter的单例实例
   * @returns OBJConverter单例实例
   */
  static getInstance(): OBJConverter;
}

/**
 * BREP模型接口
 * 表示边界表示的3D模型
 */
export interface BrepModel {
  /**
   * 获取模型的所有面
   * @returns 面对象数组
   */
  getFaces(): Face[];
}

/**
 * 面接口
 * 表示3D模型中的一个面
 */
export interface Face {
  /**
   * 将连续面离散化为网格
   * @returns 离散化后的网格对象
   */
  discrete(): Mesh;
}

/**
 * 网格接口
 * 表示离散化后的三角网格数据
 */
export interface Mesh {
  // 网格数据结构（具体字段取决于MathAlg.MeshUtil.toFlatMesh的实现）
}

/**
 * 扁平化网格接口
 * 表示转换为扁平数组格式的网格数据
 */
export interface FlatMesh {
  // 扁平化后的网格数据（具体字段取决于ObjParser.exportMeshes的输入要求）
}