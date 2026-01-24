/**
 * 模型分类键枚举
 * 定义了模型的访问级别和分类类型
 */

/**
 * 模型访问级别枚举
 * 用于标识模型的可见性和访问权限
 */
export enum ModelKeysEnums {
  /** 公共模型 - 所有用户可访问 */
  COMMON = "public",
  
  /** 企业模型 - 仅企业用户可访问 */
  ENTERPRISE = "enterprise",
  
  /** 私有模型 - 仅所有者可访问 */
  PRIVATE = "private",
  
  /** 其他类型模型 */
  OTHERS = "others"
}

/**
 * 模型类别枚举
 * 用于区分不同类型的建筑/装修元素
 */
export enum CategoryKeysEnums {
  /** 硬装类别 */
  HARD = "hard",
  
  /** 材质类别 */
  MATERIAL = "material",
  
  /** 背景墙类别 */
  BACKGROUNDWALL = "backgroundWall",
  
  /** 门类别 */
  DOOR = "door",
  
  /** 开口/洞口类别 */
  OPENING = "opening",
  
  /** 其他类别 */
  OTHERS = "others",
  
  /** 家具类别 */
  FURNITURE = "furniture",
  
  /** 家电类别 */
  APPLIANCE = "appliance"
}