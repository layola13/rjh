/**
 * Customized Modeling Panel CSS Module Type Definitions
 * 
 * This module provides type definitions for a CSS module that styles a customized modeling panel,
 * including editing tools, tutorials, camera controls, and user guidance interfaces.
 */

/**
 * CSS Module Exports
 * 
 * Represents the class names exported by the CSS module for the customized modeling panel.
 * Each property corresponds to a CSS class that can be applied to DOM elements.
 */
interface CustomizedModelingPanelStyles {
  /**
   * Main container for the customized modeling panel
   * - Full viewport overlay with absolute positioning
   * - Hidden by default (display: none)
   * - High z-index for layering above other content
   */
  customizedModelingPanel: string;

  /**
   * Edit panel wrapper inside the main container
   */
  editPanel: string;

  /**
   * Frame container for the editing interface
   */
  editFrame: string;

  /**
   * Loading overlay indicator
   * - Absolute positioning over the entire viewport
   * - Hidden by default
   */
  customizedModelingLoading: string;

  /**
   * Tutorial overlay background
   * - Semi-transparent black background (30% opacity)
   * - Full viewport coverage
   */
  customizedModelingTutorial: string;

  /**
   * Tutorial modal window container
   * - Fixed dimensions (1000px width)
   * - Elevated z-index with shadow effects
   */
  customizedModelingTutorialwindow: string;

  /**
   * Close button for tutorial window
   */
  closewl: string;

  /**
   * Main content area of tutorial window
   */
  content: string;

  /**
   * Footer section of tutorial window
   */
  footer: string;

  /**
   * Custom checkbox styled span element
   */
  spcheckbox: string;

  /**
   * Checked state for custom checkbox
   */
  checked: string;

  /**
   * Footer text span
   */
  fsptext: string;

  /**
   * WebCAD toolbar container
   */
  webcadtoolbar: string;

  /**
   * Active state for toolbar items
   */
  actived: string;

  /**
   * Disabled state for toolbar items
   */
  disabled: string;

  /**
   * Hover state modifier
   */
  hover: string;

  /**
   * Normal icon state (typically hidden when active)
   */
  normal: string;

  /**
   * Selected icon state
   */
  selected: string;

  /**
   * Line raid complete plugin control
   */
  plugin_customizedModeling_lineraid_complete: string;

  /**
   * Group edit return to last action control
   */
  plugin_customizedModeling_groupEdit_returnLast: string;

  /**
   * Plane projection complete action button
   */
  plugin_customizedModeling_planeProjection_complete: string;

  /**
   * Group edit complete action button
   */
  plugin_customizedModeling_groupEdit_complete: string;

  /**
   * Frame mode toggle dropdown
   */
  toggleFrameModeDropDown: string;

  /**
   * Camera switch radio button group
   */
  customizedmodeling_cameraSwitchRadioButton: string;

  /**
   * Radio button list container
   */
  radioBtn: string;

  /**
   * Active radio button state
   */
  active: string;

  /**
   * Tutorial wishlist creation popup
   */
  createtutorialwishlist: string;

  /**
   * Popup window container
   */
  popupwindows: string;

  /**
   * Window contents wrapper
   */
  windowContents: string;

  /**
   * Contents wrapper with scrolling
   */
  contentsWrapper: string;

  /**
   * User guide container
   */
  userguide: string;

  /**
   * Guide container for tutorial steps
   */
  guideContainer: string;

  /**
   * State group container for navigation
   */
  stateGroupContainer: string;

  /**
   * Persistence state group container
   */
  persistencestateGroupContainer: string;

  /**
   * Guide tip text container
   */
  guideTipContainer: string;

  /**
   * Tip text element
   */
  tip: string;

  /**
   * Left arrow navigation button
   */
  arrowLeft: string;

  /**
   * Right arrow navigation button
   */
  arrowRight: string;

  /**
   * Action button in footer
   */
  actionButton: string;

  /**
   * Action label text
   */
  actionLabel: string;

  /**
   * Action descriptive text
   */
  actionText: string;

  /**
   * Default view mode toolbar icon
   */
  toolbardefaultviewmode: string;

  /**
   * Tool icon generic class
   */
  toolicon: string;

  /**
   * Popover title (hidden by default)
   */
  'popover-title': string;

  /**
   * Right property bar container
   */
  rightpropertybar: string;

  /**
   * Edit material button
   */
  editMaterialButton: string;

  /**
   * Link button modifier
   */
  linkbtn: string;

  /**
   * Save customized model button
   */
  'save-customized-model-button': string;

  /**
   * Edit feature wall button
   */
  editFeatureWallButton: string;

  /**
   * Change type edit button
   */
  editChangeTypeButton: string;

  /**
   * Customized modeling type display
   */
  'customizedmodeling-type': string;

  /**
   * Label type text
   */
  labelType: string;

  /**
   * Save customized model container
   */
  saveCustomizedModel: string;

  /**
   * Add fixed height modifier
   */
  addfixed: string;

  /**
   * Third row in custom model layout
   */
  customModel_thirdRow: string;

  /**
   * Material replace content container
   */
  contentmaterialreplace: string;

  /**
   * Model type label
   */
  modeltype: string;

  /**
   * Model type dropdown container
   */
  modeltypedropdown: string;

  /**
   * View division container
   */
  viewdiv: string;

  /**
   * View button element
   */
  viewbutton: string;

  /**
   * View paragraph text
   */
  viewp: string;

  /**
   * View span text
   */
  viewspan: string;

  /**
   * View right arrow container
   */
  viewright: string;

  /**
   * View caret icon
   */
  viewcaret: string;

  /**
   * Model view unordered list
   */
  modelviewul: string;

  /**
   * Model view list item
   */
  modelviewli: string;

  /**
   * Model view selection indicator
   */
  modelviewsel: string;

  /**
   * Model output label
   */
  modeloutput: string;

  /**
   * Create customized model dialog
   */
  createcustomizedmodel: string;

  /**
   * Window wrapper for dialogs
   */
  windowWrapper: string;

  /**
   * Model output toggle container
   */
  modeloutputtogglecontainer: string;

  /**
   * Output item button
   */
  outputitem: string;

  /**
   * Enabled button state
   */
  buttonEnabled: string;

  /**
   * Disabled button state
   */
  buttonDisabled: string;

  /**
   * Model size range control
   */
  modelsizerange: string;

  /**
   * Type guide image display
   */
  typeguideimage: string;

  /**
   * Create customized model buttons container
   */
  createcustomizedmodelbuttons: string;

  /**
   * Create button
   */
  createbutton: string;

  /**
   * Cancel button
   */
  cancelbutton: string;

  /**
   * Model size container
   */
  modelsizecontainer: string;

  /**
   * Image button container
   */
  imagebtn: string;

  /**
   * Image button element
   */
  imagebutton: string;

  /**
   * Snapping plane help plugin button
   */
  plugin_customizedModeling_snapping_plane_help: string;

  /**
   * Invert face normal plugin button
   */
  plugin_customizedModeling_invert_face_normal: string;

  /**
   * View cube box container
   * - Positioned in top-right area
   * - Contains secondary view controls
   */
  viewCubeBox: string;

  /**
   * Secondary view switch control
   */
  'secondary-view-switch': string;

  /**
   * Views container
   */
  views: string;

  /**
   * Individual view button
   */
  view: string;

  /**
   * Inline list container
   */
  'list-inline': string;

  /**
   * Contents list modifier
   */
  contents: string;
}

/**
 * CSS Module Export
 * 
 * Default export providing access to all CSS class names as a typed object.
 */
declare const styles: CustomizedModelingPanelStyles;

export default styles;

/**
 * Named exports for individual class names (optional convenience exports)
 */
export const customizedModelingPanel: string;
export const editPanel: string;
export const editFrame: string;
export const customizedModelingLoading: string;
export const customizedModelingTutorial: string;
export const customizedModelingTutorialwindow: string;
export const webcadtoolbar: string;
export const rightpropertybar: string;
export const createcustomizedmodel: string;
export const viewCubeBox: string;