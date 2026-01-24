/**
 * Module: module_199863
 * Original ID: 199863
 * 
 * A plugin that manages read-only state for design documents.
 * Handles document opening/closing events and sign-in status changes
 * to enforce read-only restrictions when necessary.
 */

import { SignalHook } from 'HSCore.Util';
import { EntityFlagEnum } from 'HSCore.Model';

/**
 * Constants for live hint display duration (milliseconds)
 */
const LIVE_HINT_DURATION = 10000;

/**
 * Signal hook for managing event subscriptions
 */
interface ISignalHook {
  listen(signal: any, handler: Function): ISignalHook;
  unlistenAll(): void;
}

/**
 * Application interface with floorplan and signal support
 */
interface IApplication {
  signalDocumentOpening: any;
  signalDocumentOpened: any;
  floorplan: IFloorplan;
}

/**
 * Floorplan interface for managing entity flags
 */
interface IFloorplan {
  setFlagOn(flag: EntityFlagEnum, recursive: boolean): void;
  setFlagOff(flag: EntityFlagEnum, recursive: boolean): void;
}

/**
 * Plugin configuration map
 */
interface IPluginMap {
  [key: string]: ISignInPlugin;
}

/**
 * Sign-in plugin interface with signal support
 */
interface ISignInPlugin {
  signals: {
    signalSigninSucceeded: any;
    signalSignoutSucceeded: any;
  };
}

/**
 * Document opening event data
 */
interface IDocumentOpeningEvent {
  data: {
    designMetaObj?: any;
  };
}

/**
 * Live hint interface for displaying user notifications
 */
interface ILiveHint {
  show(message: string, duration: number, callback: () => void, options: { canclose: boolean }): void;
  hide(): void;
}

/**
 * Read-only design document manager plugin.
 * Monitors document state and user authentication to enforce read-only restrictions.
 */
export default class ReadOnlyDesignPlugin {
  private _app!: IApplication;
  private _signalHook!: ISignalHook;
  private _liveHint: ILiveHint | null = null;
  private _appChangedForReadonly: boolean = false;

  /**
   * Initialize the plugin with application instance and plugin dependencies
   * @param app - The main application instance
   * @param pluginMap - Map of available plugins keyed by type
   */
  init(app: IApplication, pluginMap: IPluginMap): void {
    this._app = app;
    const signInPlugin = pluginMap[HSFPConstants.PluginType.SignIn];
    const signalHook = new HSCore.Util.SignalHook(this);
    
    this._signalHook = signalHook;
    signalHook
      .listen(app.signalDocumentOpening, this._onDocumentOpening)
      .listen(app.signalDocumentOpened, this._onDocumentOpened)
      .listen(signInPlugin.signals.signalSigninSucceeded, this._onSignInStatusChanged)
      .listen(signInPlugin.signals.signalSignoutSucceeded, this._onSignInStatusChanged);
  }

  /**
   * Clean up plugin resources and remove all signal listeners
   */
  uninit(): void {
    this._signalHook.unlistenAll();
  }

  /**
   * Handle document opening event
   * @param event - Document opening event containing metadata
   */
  private _onDocumentOpening(event: IDocumentOpeningEvent): void {
    if (event.data.designMetaObj && HSApp.Util.Design.isReadOnly()) {
      this._onOpenReadonlyDesign(false);
    }
  }

  /**
   * Handle document opened event
   */
  private _onDocumentOpened(): void {
    this._checkReadOnlyStatus();
  }

  /**
   * Configure application for read-only design mode
   * @param showHint - Whether to display a live hint notification to the user
   */
  private _onOpenReadonlyDesign(showHint: boolean): void {
    this._app.floorplan.setFlagOn(HSCore.Model.EntityFlagEnum.unselectable, true);
    this._app.floorplan.setFlagOn(HSCore.Model.EntityFlagEnum.freezed, true);

    if (showHint && LiveHint) {
      const hintMessage = ResourceManager.getString("open_readonly_design_livehint");
      if (hintMessage) {
        this._liveHint = LiveHint;
        LiveHint.show(hintMessage, LIVE_HINT_DURATION, () => {
          LiveHint.hide();
          this._liveHint = null;
        }, {
          canclose: false
        });
      }
    }

    this._appChangedForReadonly = true;
  }

  /**
   * Restore application to normal editable mode
   */
  private _onOpenNormalDesign(): void {
    if (this._appChangedForReadonly) {
      this._app.floorplan.setFlagOff(HSCore.Model.EntityFlagEnum.unselectable, true);
      this._app.floorplan.setFlagOff(HSCore.Model.EntityFlagEnum.freezed, true);
      
      if (this._liveHint) {
        this._liveHint.hide();
      }
      
      this._appChangedForReadonly = false;
    }
  }

  /**
   * Handle sign-in status change events
   */
  private _onSignInStatusChanged(): void {
    this._checkReadOnlyStatus();
  }

  /**
   * Check current read-only status and update application state accordingly
   */
  private _checkReadOnlyStatus(): void {
    if (HSApp.Util.Design.isReadOnly()) {
      this._onOpenReadonlyDesign(true);
    } else {
      this._onOpenNormalDesign();
    }
  }
}