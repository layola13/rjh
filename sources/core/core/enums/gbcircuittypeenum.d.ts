/**
 * 国标电路类型枚举模块
 * 包含电路、电线、线管、断路器等相关类型定义
 */

/**
 * 国标户内电缆类型枚举
 * 定义家用电缆的规格型号
 */
export enum GBHouseHoldCableTypeEnum {
  /** BV750 2×10平方+地线10平方 PVC25管 */
  BV750_2X10P_E10PVC25 = 1,
  /** BV750 2×10平方+地线10平方 PVC25管 */
  BV750_2X10_E10PVC25 = 2,
  /** BV750 2×16平方+地线16平方 PVC32管 */
  BV750_2X16_E16PVC32 = 3,
}

/**
 * 国标总断路器类型枚举
 * 定义总开关断路器的型号规格
 */
export enum GBTotalBreakerTypeEnum {
  /** 施耐德C65N 20A 2P断路器 */
  C65N_20_2P = 30,
  /** 施耐德C65N 25A 2P断路器 */
  C65N_25_2P = 31,
  /** 施耐德C65N 40A 2P断路器 */
  C65N_40_2P = 32,
  /** 施耐德C65N 63A 2P断路器 */
  C65N_63_2P = 33,
}

/**
 * 国标断路器类型枚举
 * 定义各类断路器的型号和规格
 */
export enum GBBreakerTypeEnum {
  /** DPN系列 16A 1P断路器 */
  DPN_16_1P = 10,
  /** DPN系列 20A 1P断路器 */
  DPN_20_1P = 11,
  /** DPN系列 25A 1P断路器 */
  DPN_25_1P = 12,
  /** DPN系列 32A 1P断路器 */
  DPN_32_1P = 13,
  /** 施耐德C65N 20A 2P断路器 */
  C65N_20_2P = 30,
  /** 施耐德C65N 25A 2P断路器 */
  C65N_25_2P = 31,
  /** 施耐德C65N 40A 2P断路器 */
  C65N_40_2P = 32,
  /** 施耐德C65N 63A 2P断路器 */
  C65N_63_2P = 33,
  /** 施耐德C65K 15A 1P断路器 */
  C65K_15_1P = 50,
  /** 施耐德C65K 20A 1P断路器 */
  C65K_20_1P = 51,
  /** 施耐德C65K 25A 1P断路器 */
  C65K_25_1P = 52,
  /** 施耐德C65K 32A 1P断路器 */
  C65K_32_1P = 53,
}

/**
 * 国标线管类型枚举
 * 定义PVC线管的直径规格
 */
export enum GBTubeTypeEnum {
  /** PVC线管 直径16mm */
  PVC16 = 1,
  /** PVC线管 直径20mm */
  PVC20 = 2,
  /** PVC线管 直径25mm */
  PVC25 = 3,
  /** PVC线管 直径32mm */
  PVC32 = 4,
  /** PVC线管 直径40mm */
  PVC40 = 5,
}

/**
 * 国标电线类型枚举
 * 定义BVR系列铜芯软线的规格型号
 */
export enum GBWireTypeEnum {
  /** BVR 2×1.5平方 */
  BVR_2X1D5 = 10,
  /** BVR 2×2.5平方 */
  BVR_2X2D5 = 11,
  /** BVR 2×4平方 */
  BVR_2X4 = 12,
  /** BVR 2×6平方 */
  BVR_2X6 = 13,
  /** BVR 2×2.5平方+地线2.5平方 */
  BVR_2X2D5_E2D5 = 14,
  /** BVR 2×4平方+地线4平方 */
  BVR_2X4_E4 = 15,
  /** BVR 2×6平方+地线6平方 */
  BVR_2X6_E6 = 16,
  /** BVR 2×4平方+地线2.5平方 */
  BVR_2X4_E2D5 = 17,
}

/**
 * 国标电路类型枚举
 * 定义电路的用途分类
 */
export enum GBCircuitTypeEnum {
  /** 照明回路 (Lighting) */
  WL = 1,
  /** 洗衣机回路 (Washing machine) */
  WX = 2,
  /** 空调回路 (Air conditioner) */
  WP_K = 3,
  /** 普通插座回路 (Power socket) */
  WP = 4,
}