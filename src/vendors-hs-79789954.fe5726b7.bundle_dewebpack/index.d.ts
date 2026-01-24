/**
 * Webpack Bundle Type Definitions
 * 
 * This module aggregates type definitions from various sub-modules
 * related to architectural layout planning, geometric operations,
 * and constraint-based space arrangement.
 */

// ============================================================================
// Geometric Utilities
// ============================================================================

/**
 * Mathematical utility functions for geometric calculations
 */
export * from './mathutil';

/**
 * Specialized mathematical operations
 */
export * from './math';

/**
 * Epsilon constants for floating-point comparisons
 */
export * from './epsilon';

/**
 * Axis-Aligned Bounding Box utilities
 */
export * from './aabb';

/**
 * Finite plane representation and operations
 */
export * from './finiteplane';

/**
 * Polygon geometry operations
 */
export * from './polygon';

/**
 * Buffer geometry operations
 */
export * from './buffer';

/**
 * Well-Known Text (WKT) format utilities for geometric data interchange
 */
export * from './wktutils';

// ============================================================================
// Spatial Operations
// ============================================================================

/**
 * Face-level geometric operations
 */
export * from './faceoperator';

/**
 * Body-level geometric operations
 */
export * from './bodyoperator';

/**
 * Region cutting and subdivision operations
 */
export * from './regioncutter';

/**
 * Floor cutting and partitioning operations
 */
export * from './floorcutter';

/**
 * Region utility functions
 */
export * from './regionutil';

/**
 * Model-level utility functions
 */
export * from './modelutil';

/**
 * Minimum edge length constraints
 */
export * from './min_edge_length';

// ============================================================================
// Feature Extraction & Recognition
// ============================================================================

/**
 * Base feature extraction interface
 */
export * from './feature';

/**
 * Generic feature extractor
 */
export * from './featureextractor';

/**
 * Generic extractor base class
 */
export * from './extractor';

/**
 * Convex L-shaped space feature recognition
 */
export * from './convexlshapefeature';

/**
 * Convex U-shaped space feature recognition
 */
export * from './convexushapefeature';

/**
 * Concave U-shaped space feature recognition
 */
export * from './concaveushapefeature';

/**
 * Convex region feature recognition
 */
export * from './convexuregionfeature';

/**
 * Convex hallway-shaped space feature recognition
 */
export * from './convexhallwayshapefeature';

/**
 * Opening (doors/windows) extraction
 */
export * from './openingsextractor';

/**
 * Opening dumps extraction
 */
export * from './openingdumpsextractor';

/**
 * Room space extraction
 */
export * from './roomextractor';

/**
 * Building contents extraction
 */
export * from './contentsextractor';

/**
 * Constraint rules extraction
 */
export * from './constraintsextractor';

// ============================================================================
// Space Data Models
// ============================================================================

/**
 * Balcony space data structure
 */
export * from './balconydata';

/**
 * Kitchen space data structure
 */
export * from './kitchendata';

/**
 * Curtain wall data structure
 */
export * from './curtaindata';

/**
 * Floor skeleton representation
 */
export * from './floorskeleton';

/**
 * Fake/placeholder content data
 */
export * from './fakecontent';

/**
 * Content utility functions
 */
export * from './contentutils';

/**
 * Content replacement operations
 */
export * from './replacecontent';

// ============================================================================
// Room Type & Usage
// ============================================================================

/**
 * Room type utility functions
 */
export * from './roomtypeutil';

/**
 * Usage type enumeration
 */
export * from './enusagetype';

/**
 * Complement type helper utilities
 */
export * from './complementtypehelper';

// ============================================================================
// Constraint System
// ============================================================================

/**
 * Constraint type definitions
 */
export * from './constrainttype';

/**
 * Constraint layout engine
 */
export * from './constraintlayout';

/**
 * Constraint layout API
 */
export * from './constraintlayoutapi';

/**
 * Constraint utility functions
 */
export * from './constraintutil';

/**
 * Region constraint object definitions
 */
export * from './regionconstraintobject';

// ============================================================================
// Grouping & Analysis
// ============================================================================

/**
 * Group marking operations
 */
export * from './groupmarker';

/**
 * Group utility functions
 */
export * from './grouputil';

/**
 * Group analysis algorithms
 */
export * from './groupanalyzer';

/**
 * Group reason type enumeration
 */
export * from './engroupreasontype';

/**
 * Group rules and validation
 */
export * from './grouprule';

// ============================================================================
// Solver & Planning
// ============================================================================

/**
 * Constraint solver engine
 */
export * from './solver';

/**
 * Solver utility functions
 */
export * from './solverutil';

/**
 * Passageway planning algorithms
 */
export * from './passagewayplaner';

// ============================================================================
// Utilities & Helpers
// ============================================================================

/**
 * Double precision comparison utilities
 */
export * from './doublejudge';

/**
 * Hint box UI component
 */
export * from './hintbox';

/**
 * Generic utility module 'h'
 */
export * from './h';

/**
 * Generic utility module 'a'
 * Note: Duplicate export - consider consolidating
 */
export * from './a';