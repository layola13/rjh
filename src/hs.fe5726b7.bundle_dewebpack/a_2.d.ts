/**
 * Event types for view lifecycle and content interactions
 * @module ViewEventTypes
 */

/**
 * Enumeration of view and content-related event types
 */
export declare enum ViewEventTypes {
  /** Fired when a view is in the process of activating */
  ViewActivating = "viewactivating",
  
  /** Fired when a view has been fully activated */
  ViewActivated = "viewactivated",
  
  /** Generic content event */
  Content = "content",
  
  /** Fired when mouse enters content area */
  ContentMouseOver = "contentmouseover",
  
  /** Fired when mouse leaves content area */
  ContentMouseLeave = "contentmouseleave"
}

/**
 * Readonly object containing view event type constants
 */
export declare const ViewEventTypes: Readonly<{
  readonly ViewActivating: "viewactivating";
  readonly ViewActivated: "viewactivated";
  readonly Content: "content";
  readonly ContentMouseOver: "contentmouseover";
  readonly ContentMouseLeave: "contentmouseleave";
}>;

export default ViewEventTypes;