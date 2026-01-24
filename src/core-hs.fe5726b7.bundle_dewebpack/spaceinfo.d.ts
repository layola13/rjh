/**
 * 空间信息类
 * 用于管理和存储建筑空间的几何信息，包括路径、楼板、天花板、梁等构件
 * Module: SpaceInfo
 * Original ID: 8711
 */

import { TgUtil } from './TgUtil';

/**
 * 路径定义接口
 * 描述空间的边界路径，包括外轮廓和内部孔洞
 */
export interface SpacePath {
  /** 外轮廓路径点集合 */
  outer: unknown[];
  /** 内部孔洞路径点集合 */
  holes: unknown[];
}

/**
 * 图层接口
 * 包含楼板信息的图层对象
 */
export interface Layer {
  /** 楼板映射表，键为楼板ID，值为楼板对象 */
  floorSlabs: Record<string, Slab>;
}

/**
 * 楼板接口
 * 表示建筑中的楼板构件
 */
export interface Slab {
  /** 楼板的路径信息（可选） */
  path?: SpacePath;
  // 其他楼板属性...
}

/**
 * 空间信息类
 * 管理建筑空间的几何元素和构件关系
 */
export class SpaceInfo {
  /** 空间边界路径，包含外轮廓和孔洞 */
  path: SpacePath;
  
  /** 地板面集合 */
  floors: unknown[];
  
  /** 天花板面集合 */
  ceilings: unknown[];
  
  /** 楼板面集合 */
  slabFaces: unknown[];
  
  /** 结构面集合 */
  structureFaces: unknown[];
  
  /** 梁面集合 */
  beamFaces: unknown[];
  
  /** 结构构件集合 */
  structures: unknown[];
  
  /** 梁构件集合 */
  beams: unknown[];
  
  /** 所属图层的私有引用 */
  private _layer: Layer;

  /**
   * 构造函数
   * @param layer - 空间所属的图层对象
   */
  constructor(layer: Layer) {
    this.path = {
      outer: [],
      holes: []
    };
    this.floors = [];
    this.ceilings = [];
    this.slabFaces = [];
    this.structureFaces = [];
    this.beamFaces = [];
    this.structures = [];
    this.beams = [];
    this._layer = layer;
  }

  /**
   * 检查指定面是否属于当前空间
   * @param face - 待检查的面对象
   * @returns 如果面属于当前空间的任一构件集合则返回true，否则返回false
   */
  containFace(face: unknown): boolean {
    return !!face && (
      this.floors.includes(face) ||
      this.ceilings.includes(face) ||
      this.beamFaces.includes(face) ||
      this.structureFaces.includes(face) ||
      this.slabFaces.includes(face)
    );
  }

  /**
   * 获取所有面的集合
   * @returns 合并后的所有面数组，包括结构面、地板面、天花板面、楼板面和梁面
   */
  get allFaces(): unknown[] {
    return this.structureFaces
      .concat(this.floors)
      .concat(this.ceilings)
      .concat(this.slabFaces)
      .concat(this.beamFaces);
  }

  /**
   * 获取当前空间所属的楼板
   * 如果图层中只有一个楼板则直接返回，否则通过路径重叠判断查找匹配的楼板
   * @returns 所属的楼板对象，如果未找到则返回undefined
   */
  getBelongSlab(): Slab | undefined {
    const slabs = Object.values(this._layer.floorSlabs);
    
    if (slabs.length === 1) {
      return slabs[0];
    }
    
    return slabs.find((slab) => 
      slab.path !== undefined && 
      TgUtil.isPathPathOverlap(slab.path, this.path)
    );
  }
}