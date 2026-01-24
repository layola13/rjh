/**
 * Enumeration of group reason types
 * Defines the possible reasons for grouping items or elements
 */
export enum EnGroupReasonType {
  /**
   * Item is positioned on the floor
   */
  OnTheFloor = "onTheFloor",
  
  /**
   * Item is positioned on the wall
   */
  OnTheWall = "onTheWall",
  
  /**
   * Item requires adaptation or adjustment
   */
  Adaptation = "adaptation"
}