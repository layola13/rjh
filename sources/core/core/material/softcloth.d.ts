/**
 * SoftCloth module
 * 
 * Provides the SoftCloth class which extends the Content base class.
 * Used for representing soft cloth content items in the system.
 */

import { Content } from './Content';

/**
 * SoftCloth class representing a soft cloth content entity.
 * 
 * Extends the base Content class to provide specialized functionality
 * for soft cloth items within the content management system.
 * 
 * @extends Content
 */
export declare class SoftCloth extends Content {
    /**
     * Creates a new SoftCloth instance.
     * 
     * @param e - First constructor parameter (inherited from Content)
     * @param t - Second constructor parameter (inherited from Content)
     * @param o - Third constructor parameter (inherited from Content)
     */
    constructor(e: unknown, t: unknown, o: unknown);
}