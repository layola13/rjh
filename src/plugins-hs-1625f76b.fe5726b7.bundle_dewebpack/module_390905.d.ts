/**
 * Camera position module constants
 * 
 * Defines DOM element identifiers and CSS class names used throughout the camera positioning system.
 * These constants ensure consistent references to UI elements across the application.
 * 
 * @module CameraPositionConstants
 */

/**
 * CSS class name for the camera list container element
 * @remarks Used to identify and style the main container holding the list of cameras
 */
export const cameraListClass: string = "camera_list_container";

/**
 * ID of the large camera list element
 * @remarks Used for the expanded/detailed view of the camera list
 */
export const cameralgList: string = "camera_lg_list";

/**
 * ID of the create camera button or trigger element
 * @remarks Used to identify the UI element that initiates camera creation
 */
export const createCameraId: string = "createcamera";

/**
 * ID of the navigator component element
 * @remarks Used for the navigation panel within the camera positioning interface
 */
export const ngNavigatorId: string = "np_navigator";

/**
 * ID of the overlay element
 * @remarks Used for modal overlays or semi-transparent layers in the camera positioning UI
 */
export const overlayId: string = "cameraposition_overlay";

/**
 * ID of the root container div for the camera position module
 * @remarks The main wrapper element for all camera positioning UI components
 */
export const rootDivId: string = "cameraposition_main";