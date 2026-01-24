/**
 * ThreeScene Module
 * 
 * This module serves as the main entry point for the ThreeScene and KJLMgr classes.
 * It re-exports these classes from their respective internal modules.
 * 
 * @module ThreeScene
 */

/**
 * ThreeScene class - Main 3D scene management class
 * 
 * Handles the creation, initialization, and management of Three.js scenes.
 * Provides methods for rendering, updating, and managing 3D objects within the scene.
 * 
 * @class ThreeScene
 * @see module:119/ThreeScene
 */
export { ThreeScene } from './119';

/**
 * KJLMgr class - Manager class for KJL-related functionality
 * 
 * Manages KJL (likely a custom system) operations and lifecycle.
 * Provides centralized control and coordination for KJL-related features.
 * 
 * @class KJLMgr
 * @see module:161/KJLMgr
 */
export { KJLMgr } from './161';