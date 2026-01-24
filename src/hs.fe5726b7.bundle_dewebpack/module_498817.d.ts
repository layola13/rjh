/**
 * Factory class for creating instances with custom configuration.
 * Extends a base class and provides a static factory method.
 * 
 * Module: module_498817
 * Original ID: 498817
 */

import BaseClass from './715061'; // u.default
import DefaultConfig from './648320'; // c.default

/**
 * Constructor parameters for the factory class
 */
interface FactoryParameters {
  /** First configuration parameter */
  param1: unknown;
  /** Second configuration parameter */
  param2: unknown;
}

/**
 * Factory class that extends BaseClass with default configuration injection.
 * Provides a convenient static factory method for instance creation.
 */
declare class Factory extends BaseClass {
  /**
   * Constructs a new Factory instance.
   * 
   * @param param1 - First configuration parameter
   * @param param2 - Second configuration parameter
   */
  constructor(param1: unknown, param2: unknown);

  /**
   * Static factory method for creating instances.
   * 
   * @param param1 - First configuration parameter
   * @param param2 - Second configuration parameter
   * @returns A new Factory instance
   */
  static create(param1: unknown, param2: unknown): Factory;
}

export default Factory;