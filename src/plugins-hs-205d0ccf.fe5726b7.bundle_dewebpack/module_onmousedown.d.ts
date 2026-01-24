/**
 * HSApp view mode enumeration
 * Defines the different view modes available in the 3D application
 */
declare namespace HSApp {
  namespace View {
    /**
     * Available view modes for the 3D viewer
     */
    enum ViewModeEnum {
      /** Orbit view mode - allows rotating around the scene */
      OrbitView = 'orbit',
      /** Other potential view modes */
      PerspectiveView = 'perspective',
      OrthographicView = 'orthographic'
    }
  }
}

/**
 * Component state interface
 * Represents the state structure for tab selection
 */
interface ComponentState {
  /** Currently selected tab identifier */
  currentSelectedTab: 'view' | 'settings' | 'properties';
}

/**
 * Component props interface
 * Defines the properties passed to the component
 */
interface ComponentProps {
  /**
   * Callback function invoked when switching 3D view mode
   * @param viewMode - The target view mode to switch to
   * @returns void
   */
  onSwitch3DView: (viewMode: HSApp.View.ViewModeEnum) => void;
}

/**
 * Mouse down event handler
 * Handles mouse down events to switch to view tab and orbit view mode
 * 
 * @param event - The mouse event object
 * @returns void
 * 
 * @remarks
 * This function performs two actions:
 * 1. Updates component state to set "view" as the current selected tab
 * 2. Triggers a 3D view mode switch to OrbitView
 */
declare function onMouseDown(
  this: { 
    setState: (state: Partial<ComponentState>) => void;
    props: ComponentProps;
  },
  event: MouseEvent
): void;