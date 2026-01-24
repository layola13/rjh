/**
 * Babylon.js LTS Bundle - Type Definitions
 * 
 * This module aggregates type definitions for Babylon.js Long-Term Support packages,
 * including materials, loaders, serializers, GUI components, and procedural textures.
 */

// ============================================================================
// Core Entity Types
// ============================================================================

/** Binary data representation utilities */
export * from './byte';

/** 3D shape pivot point calculations and transformations */
export * from './shapepivotpoint';

/** Glass plane operations for transparent surface rendering */
export * from './glassplanop';

/** STL 3D model data structures and utilities */
export * from './stlmodel';

/** Keyframe JSON Loader manager for animation data */
export * from './kjlmgr';

/** Asset management and loading utilities */
export * from './assets';

/** Helper scene creation and manipulation */
export * from './helperscene';

/** Photo-to-mesh material generation */
export * from './phototmeshmate';

/** Custom shader material parts and fragments */
export * from './customparts';

/** 3D text helper utilities and rendering */
export * from './text3dhelper';

/** Animation creation and configuration utilities */
export * from './createanimation';

/** Texture cache management and optimization */
export * from './texturecacheitem';

/** Turning frame extension for rotation animations */
export * from './turningframeextension';

// ============================================================================
// UI Components
// ============================================================================

/** STL file viewer UI components */
export * from './stlui';

/** Room/scene UI management and controls */
export * from './roomui';

// ============================================================================
// Data Structures
// ============================================================================

/** Generic data structure utilities (type 'a') */
export * from './a';

/** Keyframe JSON Loader texture enumeration types */
export * from './kjltextureenum';

/** Annotation/marker item data structures */
export * from './markitem';

/** Polyline entity class definitions */
export * from './classentitypolyline';

/** Three.js scene integration layer */
export * from './threescene';

/** 3D model item metadata and properties */
export * from './modelitemdata';

/** Generic asset loader utilities */
export * from './loader';

/** Photo capture and texture generation */
export * from './takephoto';

/** Resource management and pooling */
export * from './resources';

// ============================================================================
// Extensions and Plugins
// ============================================================================

/** GSAP animation library integration extensions */
export * from './gsapextension';

/** Globally Unique Identifier generation utilities */
export * from './guid';

/** Profile cross-section item definitions */
export * from './profilecrossitem';

/** Marker position tracking and management */
export * from './markpos';

/** Event message type definitions and enumerations */
export * from './eventmessagetype';

/** Marker/annotation extension system */
export * from './markextension';

/** Axis face identification for 3D geometry */
export * from './axisfaces';