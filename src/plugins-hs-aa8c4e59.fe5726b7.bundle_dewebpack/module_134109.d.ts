/**
 * Autostyler Plugin
 * Handles template-based room styling and design inspiration features
 */

import { CommandManager } from './CommandManager';
import { CatalogPlugin } from './CatalogPlugin';
import { PersistencePlugin } from './PersistencePlugin';
import { InspirationLibraryHandler } from './InspirationLibraryHandler';
import { MetaProcessor } from './MetaProcessor';
import { SignalHook } from './SignalHook';
import { Storage } from './Storage';

/**
 * Room type and style attributes
 */
interface RoomAttribute {
  values: Array<{ value: string }>;
}

/**
 * Design metadata from user input
 */
interface DesignInfo {
  bedRoomNum: number;
  livingRoomNum: number;
  bathRoomNum: number;
  area: number;
}

/**
 * Room instance with type and geometry information
 */
interface Room {
  id: string;
  roomType: string;
  roomStyle?: string;
  getArea(): number;
}

/**
 * Styler template product data
 */
interface StylerTemplate {
  id: string;
  productType: HSCatalog.ProductTypeEnum;
  contentType: HSCatalog.ContentType | string;
  customizedRoom?: {
    roomType: string;
    roomStyle: string;
    roomArea: number;
    creator: string;
    designId: string;
    roomId: string;
  };
  apply?: string;
  unit?: string;
  area?: string;
  roomTypeName?: string;
  roomStyleName?: string;
  creatorGuid?: string;
  designId?: string;
  roomId?: string;
  name?: string;
  v?: string;
}

/**
 * Command execution parameters for importing templates
 */
interface ImportTemplateParams {
  app: HSApp.App;
  catalogPlugin: CatalogPlugin;
  storage: Storage;
  stylerTemplate: StylerTemplate;
  room?: Room;
  restore: (room: Room, showMaterialPickup?: boolean, extraData?: unknown) => void;
  isHelpDesign: boolean;
  showMaterialPickUpPage?: (options: MaterialPickUpPageOptions) => void;
  disablePanel?: boolean;
  signalTemplateDesignToLog: HSCore.Util.Signal;
}

/**
 * Command execution parameters for creating templates
 */
interface CreateTemplateParams {
  app: HSApp.App;
  creatingPanelDomNode: HTMLElement;
  pickImagePanelDomNode: HTMLElement;
  catalogPlugin: CatalogPlugin;
  signalSendingStylerTemplate: HSCore.Util.Signal;
  templateRoomType: string;
  callback?: () => void;
  signalTemplateDesignToLog: HSCore.Util.Signal;
}

/**
 * Plugin initialization configuration
 */
interface PluginInitConfig {
  app: HSApp.App;
  dependencies: Record<string, unknown>;
  signalSendingStylerTemplate: HSCore.Util.Signal;
  signalTemplateDesignToLog: HSCore.Util.Signal;
}

/**
 * Material pick-up page display options
 */
interface MaterialPickUpPageOptions {
  className?: string;
  showPanel: boolean;
  [key: string]: unknown;
}

/**
 * Track logging data for template design operations
 */
interface TrackLoggerData {
  templateDesignData: StylerTemplate | null;
  isHelpDesign: boolean | null;
}

/**
 * Template design logging payload
 */
interface TemplateDesignLogPayload {
  logType: 'apply' | 'create' | 'edit';
  data: {
    triggerType: string;
    trackLoggerRelativeData: TrackLoggerData;
    targetRoom?: Room;
    extraData?: unknown;
  };
}

/**
 * Meta processor initialization options
 */
interface MetaProcessorOptions {
  editingPanelDomNode: HTMLElement;
  pickImagePanelDomNode: HTMLElement;
  app: HSApp.App;
  floorPlan: HSApp.FloorPlan;
  cmdMgr: CommandManager;
  catalogPlugin: CatalogPlugin;
  signalSendingStylerTemplate: HSCore.Util.Signal;
  editingPanelCustomizedUIArr: unknown[];
}

/**
 * Floorplan extension data for template import tracking
 */
interface ImportTemplateExtData {
  id: string;
  roomId: string;
  roomType: string;
  roomArea: number;
}

interface FloorplanExtInspiration {
  importTemplate?: {
    datas?: ImportTemplateExtData[];
  };
}

/**
 * DOM node name enumeration
 */
interface DomNodeNameEnum {
  CREATE_AUTOSTYLE_TEMPLATE_PANEL: string;
  EDIT_AUTOSTYLE_TEMPLATE_PANEL: string;
  PICK_IMAGE_PANEL: string;
}

/**
 * Autostyler Plugin
 * Manages room design templates, AI-assisted styling, and material selection
 */
export default class AutostylerPlugin {
  private _app?: HSApp.App;
  private _previousImportTemplateExt?: FloorplanExtInspiration['importTemplate'];
  private _signalSendingStylerTemplate?: HSCore.Util.Signal;
  private _signalTemplateDesignToLog?: HSCore.Util.Signal;
  private _editingPanelCustomizedUIArr?: unknown[];
  private _storage?: Storage;
  private _persistencePlugin?: PersistencePlugin;
  private _maxStylerTemplateCunt?: number;
  private _floor?: Room | null;
  private _currentIndex: number = 0;
  private _currentDesignType: string = '';
  private _designResult: StylerTemplate[] = [];
  private _lockBtn: boolean = false;
  private _showSuccessLiveHint: boolean = true;
  private _cmdMgr?: CommandManager;
  private _hadOpenMaterialPickUpPagePanel: boolean = false;
  private _trackLoggerRelativeData: TrackLoggerData = {
    templateDesignData: null,
    isHelpDesign: null,
  };
  private _catalogPlugin?: CatalogPlugin;
  private _signalHook?: SignalHook;
  private _metaProces?: MetaProcessor;
  private _enumDomNodeName?: DomNodeNameEnum;
  private _pluginContainerDomNode?: HTMLElement;
  private _autostylerDomNode?: HTMLElement;
  private _inspirationLibraryHandler?: InspirationLibraryHandler;

  /**
   * Initialize the autostyler plugin
   * @param config - Plugin configuration including app instance and dependencies
   */
  init(config: PluginInitConfig): void;

  /**
   * Import a styler template into the current design
   * @param template - The template product to import
   * @param room - Optional target room for the template
   */
  importStylerTemplate(template: StylerTemplate, room?: Room): void;

  /**
   * Handle document open event (automation test support)
   */
  onOpenDesign(): void;

  /**
   * Clean up plugin resources and event listeners
   */
  uninit(): void;

  /**
   * Register a customized UI component for the editing panel
   * @param component - UI component to add
   */
  addEditingPanelCustomizedUI_(component: unknown): void;

  /**
   * Register the meta processor for template management
   * @private
   */
  private _registerMetaProcessor(): void;

  /**
   * Get the meta processor instance
   * @returns The active meta processor
   */
  getMetaProcessor(): MetaProcessor;

  /**
   * Create DOM structure for plugin UI panels
   * @private
   */
  private _CreateHtmlDoms(): void;

  /**
   * Destroy plugin DOM elements
   * @private
   */
  private _DestroyHtmlDoms(): void;

  /**
   * Import room design for automation testing
   * @param room - Target room
   * @param template - Template metadata
   * @private
   */
  private _importRoomDesign(room?: Room, template?: StylerTemplate): void;

  /**
   * Handle add to styler template library action
   * @param templateRoomType - Room type for the template
   * @param callback - Optional callback after save
   */
  onClickedAddtoStylerTemplateLibrary(
    templateRoomType: string,
    callback?: () => void
  ): Promise<void>;

  /**
   * Validate that room type information is complete
   * @returns True if all rooms have valid room types
   */
  checkRoomTypeInfo(): boolean;

  /**
   * Get design metadata (bedroom, living room, bathroom counts and area)
   * @returns Design information object
   */
  getDesignInfo(): DesignInfo;

  /**
   * Calculate and validate total design room area
   * @returns Total area in current display units
   */
  checkDesignRooms(): number;

  /**
   * Prompt user to input design info if incomplete
   * @returns Promise resolving to true if info is valid
   */
  checkDesignInfo(): Promise<boolean>;

  /**
   * Execute command to add template to library
   * @param templateRoomType - Room type for the template
   * @param callback - Optional callback after creation
   * @private
   */
  private _executeAddToStylerTemplateLibraryCommand(
    templateRoomType: string,
    callback?: () => void
  ): void;

  /**
   * Handle command termination event
   * @param event - Command termination event data
   * @private
   */
  private _onCommandTerminated(event: { data: { cmd: { type: string } } }): void;

  /**
   * Import styler template for a single room with AI suggestions
   * @param room - Target room
   * @param roomType - Room type identifier
   * @param designType - Design style type
   */
  importStylerTemplateForSingleRoom(
    room: Room,
    roomType: string,
    designType: string
  ): void;

  /**
   * Fetch design data from server
   * @param roomType - Room type identifier
   * @param designType - Design style type
   * @private
   */
  private _getDesignData(roomType: string, designType: string): Promise<void>;

  /**
   * Apply fetched styler template to room
   * @param room - Target room
   * @param template - Template to apply
   * @private
   */
  private _getStylerTemplateAndApply(room: Room, template: StylerTemplate): void;

  /**
   * Restore design to state before template import
   * @param room - Room to restore
   * @param showMaterialPickup - Whether to show material pickup UI
   * @param extraData - Additional restoration data
   */
  restore(room: Room, showMaterialPickup?: boolean, extraData?: unknown): void;

  /**
   * Execute restore command callback
   * @param room - Room to restore
   * @param extraData - Additional data for logging
   */
  restoreCallBack(room: Room, extraData?: unknown): void;

  /**
   * Save imported template metadata to floorplan extension
   * @param template - Template that was imported
   * @param rooms - Rooms affected by the import
   */
  saveImportTemplateToFloorplanExt(template: StylerTemplate, rooms: Room[]): void;

  /**
   * Clear template import data from floorplan extension
   */
  clearImportTemplateOfFloorplanExt(): void;

  /**
   * Log template design restore action
   * @param room - Room being restored
   * @param extraData - Additional logging data
   * @private
   */
  private _handleRestoreTemplateDesignTrackLog(room: Room, extraData?: unknown): void;

  /**
   * Show LiveHint offering to try another design scheme
   * @param room - Room for which to show alternatives
   */
  showTryOtherSchemeLiveHint(room?: Room): void;

  /**
   * Check if current environment is the default environment
   * @returns True if in default environment
   * @private
   */
  private _checkCurrentEnv(): boolean;

  /**
   * Build product data structure from design results
   * @param designs - Raw design data from server
   * @private
   */
  private _productBuilder(designs: StylerTemplate[]): void;

  /**
   * Show or hide material pick-up page
   * @param options - Display options for the page
   */
  showMaterialPickUpPage(options: MaterialPickUpPageOptions): void;

  /**
   * Hide material pick-up page
   */
  hideMaterialPickUpPage(): void;

  /**
   * Create pickup model for material selection
   * @param param1 - First parameter for model creation
   * @param param2 - Second parameter for model creation
   */
  createPickupModel(param1: unknown, param2: unknown): void;

  /**
   * Create pickup model by room ID
   * @param roomId - Target room identifier
   * @param param - Additional parameter
   */
  createPickupModelByRoomId(roomId: string, param: unknown): void;

  /**
   * Get strategy manager from inspiration library handler
   * @returns Strategy manager instance
   */
  getStrategyManager(): unknown;

  /**
   * Merge duplicate IDs in ID map
   * @param idMap - Map of IDs to merge
   * @returns Merged ID map
   */
  mergeSameIdsForIdMap(idMap: unknown): unknown;
}