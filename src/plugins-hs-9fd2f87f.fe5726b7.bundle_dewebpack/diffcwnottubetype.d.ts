/**
 * 差异化冷热水非管道类型枚举
 * 定义了各种非管道类型的排水和管道设施
 * @module DiffCWNotTubeType
 */
export enum DiffCWNotTubeType {
  /**
   * 燃气表
   */
  GassMeter = "gass meter",

  /**
   * 水表
   */
  WaterMeter = "water meter",

  /**
   * 地漏
   */
  FloorDrain = "floor drain",

  /**
   * 马桶地排孔
   */
  ToiletFloorHole = "toilet floor hole",

  /**
   * 马桶墙排
   */
  ToiletWallRow = "toilet wall row",

  /**
   * 平台排水
   */
  PlatformDrainage = "platform drainage",

  /**
   * 洗脸盆墙排
   */
  BasinWallRow = "basin wall row"
}