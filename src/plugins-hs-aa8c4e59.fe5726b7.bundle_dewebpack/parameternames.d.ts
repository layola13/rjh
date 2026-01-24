/**
 * Parameter names used throughout the application for identifying properties.
 * This enum-like object defines standardized keys for spatial and hierarchical properties.
 * 
 * @module ParameterNames
 */

/**
 * Parameter name constants for object properties.
 * These keys are used to access and manipulate various properties of spatial objects.
 */
export enum ParameterNames {
  /** Identifier for the parent object in a hierarchy */
  parentId = "parentId",
  
  /** Center point coordinates of an object */
  center = "center",
  
  /** Rotation angle or quaternion of an object */
  rotation = "rotation",
  
  /** Scale factor(s) applied to an object */
  scale = "scale",
  
  /** Dimensions or size of an object */
  size = "size",
  
  /** Path or route associated with an object */
  path = "path",
  
  /** Area measurement or region definition */
  area = "area",
  
  /** Identifier for the room containing the object */
  roomId = "roomId",
  
  /** Identifier for the layer the object belongs to */
  layerId = "layerId"
}