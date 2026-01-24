/**
 * BOM处理器结果类型枚举
 * 用于分类不同类型的BOM（物料清单）处理结果
 */
export enum BomProcessorResultType {
  /** 设计信息 */
  DesignInfo = "design info",
  /** 图层信息 */
  LayerInfo = "layer info",
  /** 板材信息 */
  SlabInfo = "slab info",
  /** 房间信息 */
  RoomInfo = "room info",
  /** 墙体信息 */
  WallInfo = "wall info",
  /** 装饰线条信息 */
  MoldingInfo = "molding info",
  /** 定制模型信息 */
  CustomizedModelInfo = "customized model info",
  /** 内容信息 */
  ContentInfo = "content info",
  /** 开口信息 */
  OpeningInfo = "opening info",
  /** 板材开口信息 */
  SlabOpeningInfo = "slab opening info",
  /** 铺设信息 */
  PaveInfo = "pave info",
  /** 房屋建模信息 */
  HouseModelingInfo = "house modeling info",
  /** 裸露转角信息 */
  ExposedCornerInfo = "exposed corner info",
  /** 其他信息 */
  OtherInfo = "other info"
}

/**
 * 面类型枚举
 * 定义不同类型的表面处理方式
 */
export enum FaceType {
  /** 普通面 */
  normal = "normal",
  /** 开放式石材面 */
  openStone = "openStone"
}

/**
 * 孔洞类型枚举
 * 定义建筑结构中的开口类型
 */
export enum HoleType {
  /** 门洞 */
  door = "door",
  /** 窗洞 */
  window = "window"
}