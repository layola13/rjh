/**
 * CustomizedModeling Plugin UI Module
 * Provides user interface functionality for the customized modeling environment
 */

declare namespace HSApp.Util.Core {
  interface Plugin {
    UI: CustomizedModelingUI;
    Handler: CustomizedModelingHandler;
    ModelingMsgHandler: ModelingMessageHandler;
    Tutorial: TutorialManager;
  }
}

/**
 * Main UI interface for customized modeling plugin
 */
export interface CustomizedModelingUI {
  /** Undo operation handler */
  _onUndoHandler: (() => void) | null;
  
  /** Redo operation handler */
  _onRedoHandler: (() => void) | null;
  
  /** Apply changes handler */
  _onApplyHandler: (() => void) | null;
  
  /** Cancel operation handler */
  _onCancelHandler: (() => void) | null;
  
  /** Message receiving handler */
  _onReceiveMsgHandler: ((message: ModelingMessage) => void) | null;
  
  /** Add material button click handler */
  _onAddMaterialbtnClkHandler: (() => void) | null;
  
  /** Edit type button click handler */
  _onEditTypebtnClkHandler: (() => void) | null;
  
  /** Toolbar plugin reference */
  toolbarPlugin: ToolbarPlugin | null;
  
  /** Current modeling host entity */
  _modelingHost: ModelingHost | null;
  
  /** Floor face reference */
  _floorFace: Face | null;
  
  /** Content type identifier */
  _contentType: ContentType | null;
  
  /** WebCAD environment flag */
  _webcadEnv: boolean;
  
  /** 2D mode flag */
  _in2DMode: boolean;
  
  /** Mirror mode flag */
  _inMirrorMode: boolean;
  
  /** Mirror button reference */
  _mirrorBtn: HTMLElement | undefined;
  
  /** Ellipse width input flag */
  ellipseWidthInput: boolean;
  
  /** Lock SVG reference */
  lockSvg: SVGElement | undefined;
  
  /** Edge input readonly flag */
  edgeInputReadOnly: boolean;
  
  /** Property bar items collection */
  propertybarList: Record<string, PropertyBarItem>;
  
  /** Transformation matrix */
  matrix: THREE.Matrix4 | null;
  
  /** Ceiling tooltip shown flag */
  _ceilingTooltipShown: boolean;
  
  /**
   * Initialize the UI with plugin dependencies
   * @param plugins - Map of plugin instances
   */
  init(plugins: Record<string, Plugin>): void;
  
  /**
   * Set right menu status
   * @param enabled - Enable/disable state
   */
  setRightmenuStatus(enabled: boolean): void;
  
  /**
   * Initialize right menu items
   */
  initRightmenuItems(): void;
  
  /**
   * Initialize left menu items
   */
  initLeftmenuItems(): void;
  
  /**
   * Get co-linear walls
   * @param wall - Target wall
   * @returns Array of co-linear walls
   */
  getCoWallsInLine(wall: Wall): Wall[];
  
  /**
   * Set the modeling host entity
   * @param host - Host entity
   * @param contentType - Content type
   * @param createNew - Create new flag
   * @param floorFace - Floor face reference
   */
  setModelingHost(
    host: ModelingHost,
    contentType: ContentType,
    createNew?: boolean,
    floorFace?: Face
  ): void;
  
  /**
   * Get current modeling host
   * @returns Current modeling host entity
   */
  getModelingHost(): ModelingHost | null;
  
  /**
   * Show loading indicator
   */
  showLoadingIcon(): void;
  
  /**
   * Hide loading indicator
   */
  hideLoadingIcon(): void;
  
  /**
   * Show the UI
   */
  show(): void;
  
  /**
   * Hide the UI
   */
  hide(): void;
  
  /**
   * Handle close button click
   */
  onCloseBtnClicked(): void;
  
  /**
   * Register undo handler
   * @param handler - Undo callback
   */
  onUndo(handler: () => void): void;
  
  /**
   * Register redo handler
   * @param handler - Redo callback
   */
  onRedo(handler: () => void): void;
  
  /**
   * Register apply handler
   * @param handler - Apply callback
   */
  onApply(handler: () => void): void;
  
  /**
   * Register cancel handler
   * @param handler - Cancel callback
   */
  onCancel(handler: () => void): void;
  
  /**
   * Register message receive handler
   * @param handler - Message callback
   */
  onReceiveMsg(handler: (message: ModelingMessage) => void): void;
  
  /**
   * Post message to modeling frame
   * @param message - Message object
   */
  postMessageToModeling(message: ModelingMessage): void;
  
  /**
   * Post UI message
   * @param commandName - Command name
   * @param action - Action name
   * @param data - Optional data
   * @param focusFrame - Focus frame flag
   */
  postUIMessage(
    commandName: string,
    action: string,
    data?: unknown,
    focusFrame?: boolean
  ): void;
  
  /**
   * Focus the edit frame
   */
  focusEditFrame(): void;
  
  /**
   * Show live hint message
   * @param message - Hint message
   * @param duration - Display duration in milliseconds
   * @param callback - Optional callback
   */
  showLiveHint(message: string, duration?: number, callback?: () => void): void;
  
  /**
   * Hide live hint
   */
  hideLiveHint(): void;
  
  /**
   * Show CAD upload popup
   */
  showCadUploadPopup(): void;
  
  /**
   * Build menu items
   * @returns Array of menu items
   */
  buildMenuItems(): MenuItem[];
  
  /**
   * Show context menu
   * @param event - Mouse event
   */
  showMenu(event: MouseEvent): void;
}

/**
 * Modeling message structure
 */
export interface ModelingMessage {
  /** Message name/type */
  name: string;
  
  /** Action to perform */
  action: string;
  
  /** Message data payload */
  data?: unknown;
}

/**
 * Menu item configuration
 */
export interface MenuItem {
  /** Item label */
  label: string;
  
  /** Unique identifier */
  id: string;
  
  /** Display order */
  order?: number;
  
  /** Disabled state */
  disable?: boolean;
  
  /** Icon source */
  src?: string;
  
  /** Click handler */
  onClick?: (event: MouseEvent) => void;
  
  /** Submenu items */
  children?: MenuItem[];
  
  /** Hotkey configuration */
  hotkey?: {
    win: string;
    mac: string;
  };
}

/**
 * Property bar item configuration
 */
export interface PropertyBarItem {
  /** Item ID */
  id: string;
  
  /** Control type */
  type: PropertyBarControlType;
  
  /** Display order */
  order: number;
  
  /** Item data */
  data?: unknown;
}

/**
 * Modeling host types union
 */
export type ModelingHost = Floor | Ceiling | Face | Wall;

export interface Floor {
  id: string;
  surfaceObj: SurfaceObject;
  realPath: Path3D[];
  getMaterial(): Material;
}

export interface Ceiling extends Floor {}

export interface Face {
  id: string;
  getFirstParent(): Entity;
}

export interface Wall {
  id: string;
  height3d: number;
  openings: Record<string, Opening>;
}

export interface Opening {
  id: string;
  profile: string;
  XScale: number;
  ZScale: number;
  x: number;
  y: number;
  z: number;
}

export type ContentType = number;

declare const a: {
  UI: CustomizedModelingUI;
  Handler: CustomizedModelingHandler;
  ModelingMsgHandler: ModelingMessageHandler;
  Tutorial: TutorialManager;
};

export default a;