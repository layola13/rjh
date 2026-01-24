/**
 * Module: ParametricBathroomCabinet_IO
 * 
 * This module provides parametric bathroom cabinet entity classes with I/O serialization support.
 * Exports both the entity class and its I/O handler for data persistence and network communication.
 */

import { Entity } from './Entity';
import { ParametricContentBase_IO, ParametricContentBase } from './ParametricContentBase';

/**
 * I/O handler for ParametricBathroomCabinet entity.
 * 
 * Handles serialization and deserialization of bathroom cabinet data for:
 * - Database persistence
 * - Network transmission
 * - File import/export
 * 
 * @extends ParametricContentBase_IO
 */
export declare class ParametricBathroomCabinet_IO extends ParametricContentBase_IO {
    /**
     * Returns the singleton instance of the I/O handler.
     * @returns The shared ParametricBathroomCabinet_IO instance
     */
    static instance(): ParametricBathroomCabinet_IO;
}

/**
 * Parametric bathroom cabinet entity.
 * 
 * Represents a customizable bathroom cabinet with parametric properties
 * such as dimensions, materials, and configuration options.
 * 
 * This entity is registered with the model class identifier:
 * HSConstants.ModelClass.ParametricBathroomCabinet
 * 
 * @extends ParametricContentBase
 */
export declare class ParametricBathroomCabinet extends ParametricContentBase {
    /**
     * Returns the I/O handler for this entity type.
     * 
     * Used by the serialization framework to read/write entity data.
     * 
     * @returns The singleton ParametricBathroomCabinet_IO instance
     */
    getIO(): ParametricBathroomCabinet_IO;
}