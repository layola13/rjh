/**
 * View handler module for managing 2D/3D view switching and thumbnail view operations.
 * Handles view mode transitions, UI updates, and event coordination between different view types.
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { ThumbnailViewHandler } from './ThumbnailViewHandler';

/**
 * Represents the bounding box of a 2D view
 */
interface ViewBox {
  /** X coordinate of the view box */
  x: number;
  /** Y coordinate of the view box */
  y: number;
  /** Width of the view box */
  width: number;
  /** Height of the view box */
  height: number;
}

/**
 * Data structure for view mode change events
 */
interface ViewModeChangedData {
  /** The new view mode being activated */
  newViewMode: HSApp.View.ViewModeEnum;
}

/**
 * Data structure for environment activation events
 */
interface EnvironmentActivatedData {
  /** The ID of the newly activated environment */
  newEnvironmentId: string;
}

/**
 * Data structure for app settings value change events
 */
interface AppSettingsValueChangedData {
  /** The name of the setting field that changed */
  fieldName: string;
  /** The new value of the setting */
  value: unknown;
}

/**
 * Data structure for view activation events
 */
interface ViewActivatedData {
  /** The previously active view */
  oldView?: HSApp.View.BaseView;
  /** Flag to disable automatic viewbox updates */
  disableViewboxUpdate?: boolean;
}

/**
 * Generic event structure
 */
interface Event<T> {
  /** Event data payload */
  data: T;
  /** Event target element */
  target?: EventTarget;
}

/**
 * Signal for dispatching resize widget changes
 */
interface SignalResizeWidgetChanged {
  /** Dispatch a resize event with viewer type information */
  dispatch(data: { viewerType: string }): void;
}

/**
 * Configuration for Handler initialization
 */
interface HandlerConfig {
  /** Signal for notifying about resize widget changes */
  signalResizeWidgetChanged: SignalResizeWidgetChanged;
}

/**
 * Options for hide/show operations
 */
interface VisibilityOptions {
  /** Whether to enable UI updates during the operation */
  enableUpdate?: boolean;
}

/**
 * Options for view show operations
 */
interface ViewShowOptions {
  /** Whether to focus the view after showing */
  focus?: boolean;
}

/**
 * Main handler class for coordinating view switching and UI updates.
 * Manages the interaction between 2D views, 3D views, and thumbnail views.
 */
export class Handler {
  /** Reference to the main application instance */
  private app?: HSApp.Application;
  
  /** Handler for thumbnail view operations */
  private thumbnailViewHandler?: ThumbnailViewHandler;
  
  /** Signal hook for managing event listeners */
  private signalHook?: HSCore.Util.SignalHook;
  
  /** Cached view box for preserving 2D view state */
  private viewBox?: ViewBox;
  
  /** Collection of timer IDs for delayed 2D view switches */
  private switch2DViewTimers: number[];
  
  /** Signal dispatcher for resize widget changes */
  private signalResizeWidgetChanged: SignalResizeWidgetChanged;

  /**
   * Creates a new Handler instance
   * @param config - Configuration object containing required signals
   */
  constructor(config: HandlerConfig) {
    this.signalHook = new HSCore.Util.SignalHook(this);
    this.switch2DViewTimers = [];
    this.signalResizeWidgetChanged = config.signalResizeWidgetChanged;
  }

  /**
   * Gets the current size of the thumbnail view
   * @returns The size object from the thumbnail view handler, or undefined if not initialized
   */
  getSize(): unknown {
    return this.thumbnailViewHandler?.size;
  }

  /**
   * Initializes the handler with the application instance
   * @param app - The main application instance
   */
  init(app: HSApp.Application): void {
    this.app = app;
    this.initEditorContainer();
    this.thumbnailViewHandler = new ThumbnailViewHandler(
      document.querySelector<HTMLElement>('.resizewidgetcontainer')!
    );
    this.thumbnailViewHandler.render(() => {
      this.thumbnailViewHandler?.initLayout();
      this.updateView();
    });
    this.initEvent();
    this.initSignal();
  }

  /**
   * Initializes the DOM structure for editor containers.
   * Creates separate containers for 2D and 3D views with their auxiliary views.
   */
  private initEditorContainer(): void {
    const editorElement = document.getElementById('editor');

    // Create 2D editor container
    const editor2dContainer = document.createElement('div');
    editor2dContainer.classList.add('editor2dContainer');
    editor2dContainer.appendChild(document.getElementById('editor2d')!);
    editor2dContainer.appendChild(document.getElementById('aux2d')!);

    // Create 3D editor container
    const editor3dContainer = document.createElement('div');
    editor3dContainer.classList.add('editor3dContainer');
    editor3dContainer.appendChild(document.getElementById('editor3d')!);
    editor3dContainer.appendChild(document.getElementById('aux3d')!);

    // Create resize widget container
    const resizeWidgetContainer = document.createElement('div');
    resizeWidgetContainer.classList.add('resizewidgetcontainer');

    editorElement?.appendChild(editor2dContainer);
    editorElement?.appendChild(editor3dContainer);
    editorElement?.appendChild(resizeWidgetContainer);

    this.app?.getAux2DView().hide();
  }

  /**
   * Registers signal listeners for various application events
   */
  private initSignal(): void {
    if (!this.app || !this.signalHook) return;

    this.signalHook
      .listen(this.app.signalPrimaryViewModeChanged, this.onPrimaryViewModeChanged)
      .listen(this.app.signal3DViewModeChanged, this.on3DViewModeChanged)
      .listen(this.app.signalEnvironmentActivated, this.onEnvironmentActivated)
      .listen(this.app.appSettings.signalValueChanged, this.onAppSettingsValueChanged)
      .listen(this.app.signalViewActivated, this.onViewActivated)
      .listen(this.app.signalEnvironmentResumed, this.onEnvironmentResumed);
  }

  /**
   * Clears all pending 2D view switch timers
   */
  private clearAll2dTimers(): void {
    this.switch2DViewTimers.forEach((timerId) => {
      if (timerId) {
        clearTimeout(timerId);
      }
    });
    this.switch2DViewTimers = [];
  }

  /**
   * Handles primary view mode changes
   * @param event - Event containing old and new view mode information
   */
  private onPrimaryViewModeChanged = (event: Event<ViewModeChangedData>): void => {
    if (
      this.app?.activeEnvironment.viewMode3D === HSApp.View.ViewModeEnum.Elevation &&
      event.data.newViewMode !== HSApp.View.ViewModeEnum.Elevation
    ) {
      this.thumbnailViewHandler?.onExitElevation();
    } else {
      this.on3DViewModeChanged(event);
    }
  };

  /**
   * Handles 3D view mode changes, including elevation mode
   * @param event - Event containing new view mode information
   */
  private on3DViewModeChanged = (event: Event<ViewModeChangedData>): void => {
    this.thumbnailViewHandler?.updateSwitch3DViewBtn();

    if (event.data.newViewMode === HSApp.View.ViewModeEnum.Elevation) {
      const is3DActive = this.app?.is3DViewActive() ?? false;
      if (is3DActive) {
        this.thumbnailViewHandler?.fit2DView();
      }
      this.thumbnailViewHandler?.updateShowExitElevationBtn(is3DActive);
    } else {
      this.thumbnailViewHandler?.updateShowExitElevationBtn(false);
    }
  };

  /**
   * Handles environment activation events
   * @param event - Event containing environment activation data
   */
  private onEnvironmentActivated = (event: Event<EnvironmentActivatedData>): void => {
    const supportsSingleRoomMode = this.app?.activeEnvironment.supportSingleRoomMode() ?? false;
    this.thumbnailViewHandler?.updateShowSingleRoomModeBtn(supportsSingleRoomMode);

    const newEnvironmentId = event.data.newEnvironmentId;
    if (
      newEnvironmentId &&
      newEnvironmentId !== HSFPConstants.Environment.Render &&
      this.thumbnailViewHandler?.getToggleModalShowStatus()
    ) {
      this.thumbnailViewHandler?.toggleModalShow(false);
    }
  };

  /**
   * Handles app settings value changes
   * @param event - Event containing the changed field name and new value
   */
  private onAppSettingsValueChanged = (event: Event<AppSettingsValueChangedData>): void => {
    if (event.data.fieldName === 'isSingleRoomMode') {
      this.thumbnailViewHandler?.updateSingleRoomMode(event.data.value as boolean);
    }
  };

  /**
   * Handles view activation events
   * @param event - Event containing view activation data
   */
  private onViewActivated = (event: Event<ViewActivatedData>): void => {
    this.updateView(event);
  };

  /**
   * Handles environment resumed events
   * @param event - Event containing environment resume data
   */
  private onEnvironmentResumed = (event: Event<unknown>): void => {
    const supportsSingleRoomMode = this.app?.activeEnvironment.supportSingleRoomMode() ?? false;
    this.thumbnailViewHandler?.updateShowSingleRoomModeBtn(supportsSingleRoomMode);
  };

  /**
   * Animates hiding of the inactive view
   * @param enableUpdate - Whether to enable UI updates during the animation (default: true)
   */
  animateHide(enableUpdate: boolean = true): void {
    if (this.app?.is2DViewActive()) {
      this.app.getActive3DView().hide();
    } else {
      this.app?.getActive2DView().hide();
    }
    this.thumbnailViewHandler?.hide({ enableUpdate });
  }

  /**
   * Animates showing of the inactive view
   * @param enableUpdate - Whether to enable UI updates during the animation (default: true)
   */
  animateShow(enableUpdate: boolean = true): void {
    if (this.app?.is2DViewActive()) {
      this.app.getActive3DView().show({ focus: false });
    } else {
      this.app?.getActive2DView().show({ focus: false });
    }
    this.thumbnailViewHandler?.show({ enableUpdate });
  }

  /**
   * Hides the UI without animation
   * @param enableUpdate - Whether to enable UI updates (default: true)
   */
  uiHide(enableUpdate: boolean = true): void {
    this.thumbnailViewHandler?.hide({ enableUpdate });
  }

  /**
   * Shows the UI without animation
   * @param enableUpdate - Whether to enable UI updates (default: true)
   */
  uiShow(enableUpdate: boolean = true): void {
    this.thumbnailViewHandler?.show({ enableUpdate });
  }

  /**
   * Enters simple mode for the UI
   */
  enterSimpleMode(): void {
    this.thumbnailViewHandler?.updateSimpleMode(true);
  }

  /**
   * Exits simple mode for the UI
   */
  exitSimpleMode(): void {
    this.thumbnailViewHandler?.updateSimpleMode(false);
  }

  /**
   * Changes the z-index of UI elements
   * @param element - The target element identifier
   * @param zIndex - The new z-index value
   */
  changeZIndex(element: string, zIndex: number): void {
    this.thumbnailViewHandler?.changeZIndex(element, zIndex);
  }

  /**
   * Updates the active view and thumbnail display.
   * Handles switching between 2D and 3D views with appropriate animations and state preservation.
   * @param event - Optional event containing view change information
   */
  updateView(event?: Event<ViewActivatedData>): void {
    if (!this.app) return;

    let oldView: HSApp.View.BaseView | undefined;
    if (event?.data) {
      oldView = event.data.oldView;
    }

    if (this.app.is3DViewActive()) {
      // Switch to 2D thumbnail view
      this.thumbnailViewHandler?.switchThumbnailView('2d', () => {
        this.switch2DViewTimers.push(
          window.setTimeout(() => {
            this.thumbnailViewHandler?.fit2DView(true);
          })
        );
      });

      const active2DView = this.app.getActive2DView();
      if (active2DView && (oldView !== active2DView || !event?.data?.disableViewboxUpdate)) {
        this.viewBox = active2DView.getViewBox();
      }
    } else {
      // Switch to 3D thumbnail view
      this.thumbnailViewHandler?.switchThumbnailView('3d', () => {
        const active2DView = this.app?.getActive2DView();
        this.clearAll2dTimers();

        if (active2DView) {
          if (this.viewBox) {
            active2DView.resize(window.innerWidth, window.innerHeight);
            active2DView.setViewBox(
              this.viewBox.x,
              this.viewBox.y,
              this.viewBox.width,
              this.viewBox.height
            );
          } else {
            active2DView.fit();
          }
        }
      });
    }

    this.updateUI();

    // Dispatch resize events
    if (this.app.isMain3DViewActive()) {
      this.signalResizeWidgetChanged.dispatch({
        viewerType: this.app.getMain3DView().name
      });
    } else if (this.app.isMain2DViewActive()) {
      this.signalResizeWidgetChanged.dispatch({
        viewerType: this.app.getMain2DView().name
      });
    }
  }

  /**
   * Updates UI elements after view changes.
   * Resets opacity and triggers size recalculations.
   */
  private updateUI(): void {
    const main2DView = this.app?.getMain2DView();
    if (main2DView?.displayLayers?.background) {
      main2DView.displayLayers.background.style('opacity', 1);
    }

    const active3DView = this.app?.getActive3DView();
    active3DView?.onSizeChange();
  }

  /**
   * Initializes window resize event listeners
   */
  private initEvent(): void {
    if (!this.app) return;

    site.signalWindowResizeEnd.listen((event: Event<{ stopPropagation: () => void }>) => {
      const eventData = event.data;
      
      if (event.target) {
        if (this.app?.is3DViewActive()) {
          this.app.getActive3DView().onSizeChange();
          this.viewBox = undefined;
        } else {
          this.app?.getActive2DView().fit();
        }
      }

      eventData.stopPropagation();
    }, this);
  }

  /**
   * Folds (collapses) the resize widget UI
   */
  foldResizeWidget(): void {
    this.thumbnailViewHandler?.thumbnailModal?.toggleModalShow(true);
    this.thumbnailViewHandler?.thumbnailModal?.showToggleModalBtn(true);
  }
}