/**
 * Component type enumeration for system components
 * Defines abbreviated codes for different component types in the system
 * 
 * @module ComponentTypeDump
 */

/**
 * Enum representing different component types with their corresponding abbreviated codes
 * Used for identifying and categorizing various system components
 */
export enum ComponentTypeDump {
  /** Joint component type */
  Joint = "jt",
  
  /** Device component type */
  Device = "de",
  
  /** Strong electric component type */
  StrongElec = "sel",
  
  /** Weak electric component type */
  WeakElec = "wel",
  
  /** Hot water system component type */
  HotWater = "hw",
  
  /** Cold water system component type */
  ColdWater = "cw",
  
  /** GB Circuit component type */
  GBCircuit = "gbcr",
  
  /** GB Power System component type */
  GBPowerSys = "gbps"
}