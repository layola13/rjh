/**
 * Module: EN_COMBINATIONOUT_TYPE
 * Original ID: 115338
 * Exports: EN_EXCLUDE_TYPE, EN_COMBINATIONOUT_TYPE
 */

/**
 * 排除类型枚举
 * Enum for exclusion types
 */
export enum EN_EXCLUDE_TYPE {
  /** 自定义排除类型 / Custom exclusion type */
  Custom = "custom"
}

/**
 * 组合输出类型枚举
 * Enum for combination output types
 */
export enum EN_COMBINATIONOUT_TYPE {
  /** 不组合 / No combination */
  noCombine = 0,
  
  /** 常规组合 / Common combination */
  commonCombine = 1,
  
  /** 自定义组合 / Custom combination */
  customCombine = 2,
  
  /** 物料组合 / Material combination */
  material = 3
}