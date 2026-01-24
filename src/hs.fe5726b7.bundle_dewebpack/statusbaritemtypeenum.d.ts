/**
 * Status bar item type enumeration
 * Defines all available status bar component types
 */
export enum StatusBarItemTypeEnum {
  /** Custom image button component */
  CImageButton = "CImageButton",
  
  /** Underlay image settings component */
  UnderlayimgSetting = "UnderlayimgSetting",
  
  /** Standard image button component */
  ImageButton = "ImageButton",
  
  /** Zoom view control component */
  ZoomView = "ZoomView",
  
  /** 3D performance widget component */
  Performance3dWidget = "Performance3dWidget",
  
  /** Dropdown selector component */
  DropDown = "DropDown",
  
  /** Material dropdown list component */
  MaterialDropdownList = "MaterialDropdownList",
  
  /** Vertical divider component */
  Vdivider = "Vdivider",
  
  /** Render preview widget component */
  RenderPreviewWidget = "RenderPreviewWidget",
  
  /** Size limit widget component */
  SizeLimitWidget = "SizeLimitWidget"
}

/**
 * Frozen status bar item type constant object
 * Provides immutable access to status bar item type values
 */
export const STATUS_BAR_ITEM_TYPES: Readonly<Record<keyof typeof StatusBarItemTypeEnum, string>> = Object.freeze({
  CImageButton: "CImageButton",
  UnderlayimgSetting: "UnderlayimgSetting",
  ImageButton: "ImageButton",
  ZoomView: "ZoomView",
  Performance3dWidget: "Performance3dWidget",
  DropDown: "DropDown",
  MaterialDropdownList: "MaterialDropdownList",
  Vdivider: "Vdivider",
  RenderPreviewWidget: "RenderPreviewWidget",
  SizeLimitWidget: "SizeLimitWidget"
});

/**
 * Type alias for status bar item type values
 */
export type StatusBarItemType = `${StatusBarItemTypeEnum}`;