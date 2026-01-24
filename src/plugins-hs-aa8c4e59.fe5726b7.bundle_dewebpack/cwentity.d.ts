/**
 * Module: CWEntity
 * Comprehensive Water Entity for managing strong/weak electrical systems and water routes
 */

import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { ParameterNames } from './ParameterNames';
import { CWPowerSystemEntity } from './CWPowerSystemEntity';
import { CWTubeTreeEntity } from './CWTubeTreeEntity';

/**
 * Strong electrical system configuration
 */
interface StrongElecData {
  /** Type of household cable used */
  houseHoldCableType: string;
  /** Type of total breaker */
  totalBreakerType: string;
  /** Array of power system IDs */
  powerSystems: string[];
  /** Electrical parts/components */
  parts: unknown[];
}

/**
 * Weak electrical terminal configuration
 */
interface WeakElecTerminal {
  /** Route IDs associated with this terminal */
  routes: string[];
  /** Category/type of terminal */
  category: string;
}

/**
 * Weak electrical system configuration
 */
interface WeakElecData {
  /** Array of terminals */
  terminals: WeakElecTerminal[];
}

/**
 * Water system configuration (cold/hot)
 */
interface WaterSystemData {
  /** Route IDs for water pipes */
  routes: string[];
  /** Water system parts/components */
  parts: unknown[];
}

/**
 * Power system source data
 */
interface PowerSystemSource {
  /** Unique identifier */
  id: string;
  /** Additional power system properties */
  [key: string]: unknown;
}

/**
 * Strong electrical system source
 */
interface StrongElecSource {
  /** Household cable type */
  houseHoldCableType: string;
  /** Total breaker type */
  totalBreakerType: string;
  /** Power system configurations */
  powerSystems: PowerSystemSource[];
  /** Electrical parts */
  parts: unknown[];
}

/**
 * Route source data
 */
interface RouteSource {
  /** Unique route identifier */
  id: string;
  /** Additional route properties */
  [key: string]: unknown;
}

/**
 * Weak electrical terminal source
 */
interface WeakElecTerminalSource {
  /** Routes in this terminal */
  routes: RouteSource[];
  /** Terminal category */
  category: string;
}

/**
 * Weak electrical system source
 */
interface WeakElecSource {
  /** Terminal configurations */
  terminals: WeakElecTerminalSource[];
}

/**
 * Water system source (cold/hot)
 */
interface WaterSystemSource {
  /** Water routes */
  routes: RouteSource[];
  /** Water system parts */
  parts: unknown[];
}

/**
 * Entity type information
 */
interface EntityType {
  /** Class type identifier */
  classType: string;
}

/**
 * Complete CW entity source data structure
 */
interface CWEntitySource {
  /** Unique entity identifier */
  id: string;
  /** Parent entity ID */
  parentId: string;
  /** Entity class type */
  classType: string;
  /** Strong electrical system (optional) */
  strongElec?: StrongElecSource;
  /** Weak electrical system */
  weakElec: WeakElecSource;
  /** Cold water system */
  coldWater: WaterSystemSource;
  /** Hot water system */
  hotWater: WaterSystemSource;
}

/**
 * Comprehensive Water Entity
 * Manages strong electrical, weak electrical, cold water, and hot water systems
 * 
 * @extends AcceptEntity
 */
export declare class CWEntity extends AcceptEntity {
  /**
   * Constructs a new CWEntity instance
   */
  constructor();

  /**
   * Builds child entities from source data
   * Creates power system entities and tube tree entities for all routes
   * 
   * @param source - Source data containing all system configurations
   */
  protected buildChildren(source: CWEntitySource): void;

  /**
   * Builds entity metadata and instance data
   * Sets the instance data and entity type from source
   * 
   * @param source - Source data for entity construction
   */
  protected buildEntityData(source: CWEntitySource): void;

  /**
   * Transforms source data into structured InstanceData
   * Converts all nested objects and arrays into parameter format
   * 
   * @param source - Raw source data
   * @returns Structured instance data with typed parameters
   */
  protected getInstanceData(source: CWEntitySource): InstanceData;
}