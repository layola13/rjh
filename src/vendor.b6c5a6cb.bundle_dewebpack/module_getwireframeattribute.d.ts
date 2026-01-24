/**
 * 为几何体生成线框属性的缓冲区
 * @description 将三角形网格转换为线框表示，通过复制索引创建边缘
 * @param geometry - 包含顶点位置和索引的几何体对象
 * @returns 包含线框索引数据的缓冲区属性
 */
declare function getWireframeAttribute(geometry: BufferGeometry): BufferAttribute;

/**
 * 几何体对象接口
 */
interface BufferGeometry {
  /** 几何体唯一标识符 */
  id: number;
  /** 顶点索引数组（可选） */
  index: BufferAttribute | null;
  /** 几何体属性集合 */
  attributes: {
    /** 顶点位置属性 */
    position: BufferAttribute;
    [key: string]: BufferAttribute;
  };
}

/**
 * 缓冲区属性接口
 */
interface BufferAttribute {
  /** 底层类型化数组数据 */
  array: TypedArray;
}

/**
 * TypeScript 支持的类型化数组联合类型
 */
type TypedArray =
  | Uint16Array
  | Uint32Array
  | Float32Array
  | Int16Array
  | Int32Array
  | Uint8Array
  | Int8Array;