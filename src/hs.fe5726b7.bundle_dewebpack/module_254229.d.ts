/**
 * Autodesk User Module
 * 
 * This module exports the Autodesk user object to the global scope.
 * The actual implementation is provided by module 990365.
 * 
 * @module adskUser
 */

/**
 * Autodesk User interface
 * Represents the global Autodesk user object attached to the window/global scope.
 * 
 * Note: The exact structure depends on the implementation from module 990365.
 * This is a placeholder type that should be refined based on the actual module.
 */
export interface AdskUser {
  // Add specific properties based on module 990365's implementation
  // Example properties (to be refined):
  // userId?: string;
  // isAuthenticated?: boolean;
  // profile?: UserProfile;
  // [key: string]: unknown;
}

/**
 * Global augmentation to add adskUser to the global scope
 */
declare global {
  /**
   * Global Autodesk user object
   */
  var adskUser: AdskUser | undefined;
  
  interface Window {
    /**
     * Autodesk user object attached to window
     */
    adskUser?: AdskUser;
  }
}

export {};