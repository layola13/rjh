/**
 * Enum representing different types of roof configurations.
 * Used to specify the architectural style and structure of a roof.
 * 
 * @module ENParamRoofType
 * @enum {string}
 */
export enum ENParamRoofType {
  /**
   * Flat roof with no pitch or slope.
   * Commonly used in modern and commercial architecture.
   */
  Plane = "Plane",

  /**
   * Roof with a single sloped surface.
   * Also known as a shed or skillion roof.
   */
  Pitched = "Pitched",

  /**
   * Roof with alternating slopes creating a zigzag pattern.
   * Features multiple ridge lines in a chevron arrangement.
   */
  HerringBone = "HerringBone",

  /**
   * Roof with sloped ends and sides.
   * All sides slope downward to the walls, forming no gables.
   */
  Hip = "Hip",

  /**
   * Asymmetrical gabled roof with one long side and one short side.
   * Traditional New England colonial style.
   */
  SaltBox = "SaltBox",

  /**
   * Gabled roof extended at the eaves to cover a porch or walkway.
   * Features triangular gable ends with extended roofline.
   */
  BoxGable = "BoxGable",

  /**
   * Roof with four equally sloped sides meeting at a single apex point.
   * Forms a pyramid shape, commonly used on square buildings.
   */
  Pyramid = "Pyramid"
}