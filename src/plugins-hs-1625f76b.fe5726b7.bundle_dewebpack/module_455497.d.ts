/**
 * Content Manipulation Plugin
 * Manages content manipulation functionality including property bars, gizmos, and commands
 */

import { HSCore } from '../../core/types';
import { HSApp } from '../../app/types';
import { HSFPConstants } from '../../constants';

/**
 * Property bar handler for version 2
 */
interface IPropertyBarV2Handler {
  /**
   * Handles property bar population events
   */
  onPopulatePropertyBar(event: PropertyBarPopulateEvent): void;
}

/**
 * Event data for property bar population
 */
interface PropertyBarPopulateEvent {
  data: unknown;
}

/**
 * Selection change event data
 */
interface SelectionChangedEvent {
  data: {
    newEntities: HSCore.Model.Entity[];
  };
}

/**
 * Content flag change event data
 */
interface ContentFlagChangedEvent {
  data: {
    flag?: HSCore.Model.EntityFlagEnum;
    notRefresh?: boolean;
  };
}

/**
 * Property card item definition
 */
interface PropertyCardItem {
  type?: string;
  data?: {
    label: string;
  };
}

/**
 * Property card definition
 */
interface PropertyCard {
  id: string;
  label: string;
  items: PropertyCardItem[];
}

/**
 * Plugin registry map
 */
interface PluginRegistry {
  [HSFPConstants.PluginType.ContextualTools]: IContextualToolsPlugin;
  [HSFPConstants.PluginType.PropertyBar]: IPropertyBarPlugin;
  [HSFPConstants.PluginType.LeftMenu]: unknown;
}

/**
 * Contextual tools plugin interface
 */
interface IContextualToolsPlugin {
  signalRetiringStatusBar: HSCore.Util.Signal;
}

/**
 * Property bar plugin interface
 */
interface IPropertyBarPlugin {
  signalPopulatePropertyBar: HSCore.Util.Signal;
}

/**
 * Initialization parameters
 */
interface InitParams {
  app: HSApp.App.Application;
}

/**
 * Gizmo factory interface
 */
interface IGizmoFactory {
  // Gizmo factory methods
}

/**
 * Content Manipulation Plugin
 * Handles content manipulation operations, property bars, gizmos, and related commands
 */
export default class ContentManipulationPlugin {
  private _app!: HSApp.App.Application;
  private _cmdMgr!: HSApp.Command.CommandManager;
  private _contextualToolsPlugin!: IContextualToolsPlugin;
  private _propertyBarV2Handler: IPropertyBarV2Handler;
  private _signalHook!: HSCore.Util.SignalHook;
  private _contentSignalHook!: HSCore.Util.SignalHook;
  private _entities?: HSCore.Model.Entity[];
  
  /**
   * Flag indicating if size card is currently hidden
   */
  public sizecardIsHidden: boolean;

  constructor() {
    this._propertyBarV2Handler = new PropertyBarV2Handler();
    this.sizecardIsHidden = true;
  }

  /**
   * Initialize the plugin
   * @param params - Initialization parameters containing the app instance
   * @param plugins - Registry of available plugins
   */
  public init_(params: InitParams, plugins: PluginRegistry): void {
    const { app } = params;
    this._app = app;

    const contextualToolsPlugin = plugins[HSFPConstants.PluginType.ContextualTools];
    this._contextualToolsPlugin = contextualToolsPlugin;

    const propertyBarPlugin = plugins[HSFPConstants.PluginType.PropertyBar];
    const cmdManager = app.cmdManager;
    this._cmdMgr = cmdManager;

    this._initDomRoot();
    this._registerCommands(cmdManager);
    this._registerRequests(app.transManager);
    this._registerGizmo(app.getMain2DView());
    this._registerGizmo(app.getAux2DView());

    this.sizecardIsHidden = true;

    const signalHook = new HSCore.Util.SignalHook(this);
    this._signalHook = signalHook;
    
    signalHook
      .listen(contextualToolsPlugin.signalRetiringStatusBar, this._onRetiringStatusBar)
      .listen(propertyBarPlugin.signalPopulatePropertyBar, this._onPopulatePropertyBar)
      .listen(app.keyboardManager.signalKeyDown, this._onKeyDown)
      .listen(app.selectionManager.signalSelectionChanged, (event: SelectionChangedEvent) => {
        return this.resetSelectionType(event.data.newEntities);
      });

    this._contentSignalHook = new HSCore.Util.SignalHook(this);
  }

  /**
   * Reset selection type based on selected entities
   * @param entities - Array of selected entities
   */
  public resetSelectionType(entities: HSCore.Model.Entity[]): void {
    if (!entities?.[0]) {
      return;
    }

    const gizmoManager = this._app.getMain3DView().gizmoManager;
    const currentSelectionType = gizmoManager.getSelectionType();
    const { Reset, Scale } = HSApp.View.GizmoSelectionType;
    
    let newSelectionType = currentSelectionType;
    const currentCommand = HSApp.App.getApp().cmdManager.current;

    // Skip if creating wall face assembly
    if (currentCommand?.type === HSFPConstants.CommandType.CreateWallFaceAssembly) {
      return;
    }

    const firstEntity = entities[0];
    
    // Skip if entity is or belongs to wall face assembly
    if (firstEntity instanceof HSCore.Model.Entity) {
      const decorator = new HSCore.Model.WallFaceAssemblyDecorator();
      const hasWallFaceParent = decorator.getWallFaceAssemblyParent(firstEntity);
      const isWallFaceAssembly = firstEntity instanceof HSCore.Model.WallFaceAssembly;
      
      if (hasWallFaceParent || isWallFaceAssembly) {
        return;
      }
    }

    // Toggle reset flag based on customization
    if (HSApp.Util.Entity.includeCustomization(firstEntity)) {
      newSelectionType &= ~Reset;
    } else {
      newSelectionType |= Reset;
    }

    // Override for NCP background wall units
    if (firstEntity instanceof HSCore.Model.NCPBackgroundWallUnit) {
      newSelectionType = Scale;
    }

    this._app.getActive3DView().gizmoManager.setSelectionType(newSelectionType);
  }

  /**
   * Handle environment bar population event
   * @param event - Environment bar event
   */
  private _onPopulateEnvironmentBar(event: { data: unknown }): void {
    const selectedEntities = this._app.selectionManager.selected();
    
    if (selectedEntities.length === 0) {
      return;
    }

    if (HSApp.Util.Entity.isTypeOf(HSCore.Model.Content, selectedEntities)) {
      this._entities = selectedEntities.slice(0);
    }
  }

  /**
   * Handle property bar population event
   * @param event - Property bar populate event
   */
  private _onPopulatePropertyBar(event: PropertyBarPopulateEvent): void {
    this._propertyBarV2Handler.onPopulatePropertyBar(event);
  }

  /**
   * Hide the size card UI
   */
  public hidesizecard_(): void {
    this.sizecardIsHidden = true;
  }

  /**
   * Show the size card UI
   */
  public showsizecard_(): void {
    this.sizecardIsHidden = false;
  }

  /**
   * Build right property card configuration
   * @param items - Array of property card items
   * @returns Array containing the size card configuration
   */
  private _buildRightProperCard(items: PropertyCardItem[]): PropertyCard[] {
    return [{
      id: 'sizecard',
      label: '',
      items
    }];
  }

  /**
   * Build cabinet entrance UI configuration
   * @param label - Label text for the cabinet app button
   * @returns Cabinet app card configuration
   */
  private _buildEnterCabinet(label: string): PropertyCard {
    return {
      id: 'cabinetapp',
      label: '',
      items: [{
        type: 'cabinetapp',
        data: { label }
      }]
    };
  }

  /**
   * Handle content flag change events
   * @param event - Content flag changed event
   */
  private _onContentFlagChanged(event: ContentFlagChangedEvent): void {
    const { data } = event;
    
    if (!data) {
      return;
    }

    const isSelectionFlag = data.flag === HSCore.Model.EntityFlagEnum.selected;
    const shouldSkipRefresh = data.notRefresh;

    if (isSelectionFlag || shouldSkipRefresh) {
      return;
    }

    this._app.signalContextualtoolRefresh.dispatch();
  }

  /**
   * Initialize DOM root element for the plugin
   */
  private _initDomRoot(): void {
    const container = document.querySelector('#plugin-container');
    if (!container) {
      return;
    }

    const pluginRoot = document.createElement('div');
    pluginRoot.className = 'contentmanipulation';
    container.appendChild(pluginRoot);
  }

  /**
   * Register all plugin commands
   * @param commandManager - Command manager instance
   */
  private _registerCommands(commandManager: HSApp.Command.CommandManager): void {
    const { CommandType } = HSFPConstants;

    commandManager.register([
      [CommandType.NudgeContent, NudgeContentCommand],
      [CommandType.ResizeContent, ResizeContentCommand],
      [CommandType.ResizeContents, ResizeContentsCommand],
      [CommandType.Resize3DContent, Resize3DContentCommand],
      [
        CommandType.ChangeNCPBackgroundWallBase,
        CommandType.OpenIndependentPanel,
        ChangeNCPBackgroundWallBaseAdapter
      ],
      [
        CommandType.ChangeParametricContentBase,
        CommandType.OpenIndependentPanel,
        ChangeParametricContentBaseAdapter
      ]
    ]);
  }

  /**
   * Register all plugin requests
   * @param transactionManager - Transaction manager instance
   */
  private _registerRequests(transactionManager: HSApp.Transaction.TransactionManager): void {
    const { RequestType } = HSFPConstants;

    transactionManager.register([
      [RequestType.MoveContent, MoveContentRequest],
      [RequestType.RenameContent, RenameContentRequest],
      [RequestType.ResizeContent, ResizeContentRequest],
      [RequestType.ResizeOpeningProfile, ResizeOpeningProfileRequest],
      [RequestType.ChangeComponentMaterial, ChangeComponentMaterialRequest]
    ]);
  }

  /**
   * Register gizmo factory for a view
   * @param view - 2D view instance
   * @returns Registered gizmo factory or null if view is invalid
   */
  private _registerGizmo(view: HSApp.View.View2D | null): IGizmoFactory | null {
    if (!view) {
      return null;
    }

    const gizmoFactory = new ContentGizmoFactory(view, this._app);
    view.registerGizmoFactory(gizmoFactory);
    return gizmoFactory;
  }

  /**
   * Unregister gizmo factory from a view
   * @param view - 2D view instance
   * @param factory - Gizmo factory to unregister
   */
  private _unregisterGizmo(
    view: HSApp.View.View2D | null,
    factory: IGizmoFactory
  ): void {
    view?.unregisterGizmoFactory(factory);
  }

  /**
   * Get property bar V2 handler instance
   * @returns Property bar V2 handler
   */
  public getPropertyBarV2Handlers(): IPropertyBarV2Handler {
    return this._propertyBarV2Handler;
  }

  /**
   * Handle retiring status bar event
   * @private
   */
  private _onRetiringStatusBar(): void {
    // Implementation for retiring status bar
  }

  /**
   * Handle keyboard key down event
   * @private
   */
  private _onKeyDown(): void {
    // Implementation for key down handling
  }
}

// Export as default
export { ContentManipulationPlugin };