/**
 * Property bar control type enumeration
 * Defines all available control types that can be used in the property bar
 */
export enum PropertyBarControlTypeEnum {
  NumberInput = "numberinput",
  LengthInput = "lengthinput",
  AreaInput = "areaInput",
  Button = "button",
  Image = "image",
  ImageButton = "imagebutton",
  ImageBtnWithHelp = "ImageBtnWithHelp",
  LinkButton = "linkbutton",
  CImageButton = "CImageButton",
  ImageButtonWithPopup = "ImageButtonWithPopup",
  DropDownList = "dropdownlist",
  DropDownRoomTypeList = "dropdownroomtypelist",
  DropDownEditList = "dropdowneditlist",
  ViewModeDropdown = "viewModeDropdown",
  Slider = "slider",
  SliderScale = "sliderscale",
  Enter = "enter",
  CameraSwitchWidget = "cameraSwitchWidget",
  Divider = "divider",
  SubDivider = "subdivider",
  ArrowDivider = "arrowdivider",
  Space = "space",
  Popup = "popup",
  Checkbox = "checkbox",
  ColorCheckbox = "colorCheckbox",
  RadioButton = "radioButton",
  Label = "label",
  ToggleBtn = "toggleBtn",
  ToggleButton = "toggleButton",
  ToggleBtnNew = "toggleBtnNew",
  StatusBtn = "statusBtn",
  NinePatch = "ninePatch",
  Rotation = "rotation",
  VDivider = "vdivider",
  HelpTip = "helptip",
  HintView = "hintview",
  Img = "img",
  BlockAlign = "blockalign",
  TitleLabel = "titlelabel",
  ImgBtn = "imgbtn",
  NoChoice = "nochoice",
  GeneralLengthInput = "generallengthinput",
  CabinetApp = "cabinetapp",
  Performance3dCtrl = "performance3dCtrl",
  TagItems = "tagitems",
  SliderInput = "sliderInput",
  DoubleSliderInput = "doubleSliderInput",
  ImageTextButton = "imageTextButton",
  CircleImage = "circleImage",
  ColorPicker = "colorPicker",
  RadioButtonCard = "radioButtonCard"
}

/**
 * Signal utility for event dispatching
 */
interface Signal<T> {
  dispatch(value: T): void;
}

/**
 * Control configuration data
 */
interface ControlData {
  id?: string;
  visible?: boolean;
  hidden?: boolean;
  text?: string;
  template?: string;
  className?: string;
  width?: number;
  range?: [number, number];
  value?: unknown;
  options?: Record<string, unknown>;
  label?: string;
  onValueChange?: (this: Control, event: Event) => void;
  onValueChangeStart?: (this: Control, event: Event) => void;
  onValueChangeEnd?: (this: Control, event: Event) => void;
  onopenpopup?: (size: number) => void;
  onclosepopup?: (size: number) => void;
  [key: string]: unknown;
}

/**
 * Control definition
 */
interface ControlDefinition {
  id?: string;
  type: PropertyBarControlTypeEnum | string;
  data?: ControlData;
}

/**
 * Base control interface
 */
interface Control {
  update?(data: ControlData): void;
  destroy?(): void;
  setValue?(value: unknown): void;
  addEventListener?(event: string, handler: (event: Event) => void, useCapture: boolean): void;
}

/**
 * Control factory interface
 */
interface ControlFactory {
  create(container: JQuery, data: ControlData): Control;
}

/**
 * Property bar item wrapper
 */
interface PropertyBarItem {
  propertyBar: PropertyBar;
  nodeElement?: JQuery;
  control?: Control;
  
  /**
   * Creates a property bar item
   * @param data - Control configuration data
   * @param factory - Control factory for creating the control instance
   * @param container - Parent container element
   */
  create(data: ControlData, factory: ControlFactory | null, container: JQuery): PropertyBarItem;
  
  /**
   * Updates the control with new data
   * @param data - Updated control data
   */
  update(data: ControlData): void;
  
  /**
   * Destroys the control and cleans up resources
   */
  destroy(): void;
  
  /**
   * @deprecated Use destroy() instead
   */
  destory(): void;
}

/**
 * PropertyBar class
 * Manages a collection of UI controls in a property bar
 */
export declare class PropertyBar {
  /**
   * Signal dispatched when the property bar grows in size (e.g., popup opens)
   */
  signalSizeGrow: Signal<number>;
  
  /**
   * Signal dispatched when the property bar shrinks in size (e.g., popup closes)
   */
  signalSizeShrink: Signal<number>;
  
  private _name: string;
  private _rootElement: JQuery | null;
  private _containerElement: JQuery | null;
  private _containerElementHeader: JQuery | null;
  private _controlsByKey: Map<string, PropertyBarItem>;
  private _propertyBarItem: PropertyBarItem;
  private onopenpopup: (size: number) => void;
  private onclosepopup: (size: number) => void;
  
  /**
   * Creates a new PropertyBar instance
   * @param name - Unique name identifier for the property bar
   */
  constructor(name: string);
  
  /**
   * Factory method to create a PropertyBar instance
   * @param name - Unique name identifier for the property bar
   * @returns A new PropertyBar instance
   */
  static create(name: string): PropertyBar;
  
  /**
   * Retrieves a control by its ID
   * @param id - The control identifier
   * @returns The control item if found, undefined otherwise
   */
  getControlById(id: string): PropertyBarItem | undefined;
  
  /**
   * Shows the property bar and appends it to a container
   * @param container - Optional jQuery container element (defaults to body)
   */
  show(container?: JQuery): void;
  
  /**
   * Hides the property bar and detaches it from the DOM
   */
  hide(): void;
  
  /**
   * Clears all controls from the property bar
   */
  clear(): void;
  
  /**
   * Adds a single control to the property bar
   * @param definition - Control definition object
   * @returns The created property bar item
   */
  addControl(definition: ControlDefinition): PropertyBarItem | undefined;
  
  /**
   * Sets multiple controls, replacing any existing controls
   * @param definitions - Array of control definitions
   * @returns Map of control IDs to property bar items
   */
  setControls(definitions: ControlDefinition[]): Record<string, PropertyBarItem>;
  
  /**
   * Initializes the property bar DOM structure
   * @private
   */
  private _init(): void;
  
  /**
   * Removes all controls and cleans up resources
   * @private
   */
  private _removeAll(): void;
  
  /**
   * Internal method to add a control based on its type
   * @private
   * @param definition - Control definition object
   * @returns The created property bar item
   */
  private _addControl(definition: ControlDefinition): PropertyBarItem | undefined;
}