/**
 * Drag and drop directive types
 */
export interface DragEventDirective {
  inserted(element: HTMLElement, binding: DirectiveBinding): void;
}

export interface SizeDirective {
  inserted(element: HTMLElement, binding: DirectiveBinding): void;
}

export interface DirectiveBinding {
  value: any;
  oldValue: any;
  expression: string;
  arg?: string;
  modifiers: Record<string, boolean>;
}

/**
 * Component Props
 */
export interface WebviewFrameProps {
  src: string;
  width: number;
  height: number;
}

/**
 * Order Information Structure
 */
export interface OrderInfo {
  window_no: string;
  product_name: string;
  width: number;
  height: number;
  area: number;
  count: number;
  price: number;
  install_position: string;
  color: string;
  note: string;
  hole_pic_url: string;
}

/**
 * Drawing Component Data
 */
export interface DrawingComponentData {
  action_list: ActionItem[];
  action_right_list: ActionItem[];
  leave_confirm: boolean;
  leave_config: string;
  paper_list: any[];
  loading: boolean;
  isnumber: number;
  url: string;
  copy_event: any;
  order_form_keys: Record<string, string>;
  rightCardShow: boolean;
  mullion_equally_divided_way: number;
  displayGlassSpec: boolean;
  reflect: boolean;
  overlay: boolean;
  choose_windoor: boolean;
  initValue: number;
  eventPayload: Record<string, any>;
  calcPosition: CalcPosition;
  editType: 'length' | 'degree';
  script_id: number;
  readWebccFrame: boolean;
  clds: { src: string };
  curProductName: string;
  material_automatic: boolean;
  material_automatic_cost: boolean;
  tyCreate3dDialog: boolean;
  showPreview: boolean;
}

export interface ActionItem {
  icon: string;
  action: string;
  label: string;
  show?: string;
}

export interface CalcPosition {
  clientX: string | number;
  clientY: string | number;
}

/**
 * Script Calculation Result
 */
export interface ScriptResult {
  order_bar: BarItem[];
  order_glass: GlassItem[];
  order_addon: AddonItem[];
  order_sub_bar: SubBarItem[];
  order_cost: CostItem[];
  order_addition: any[];
  order_offer_price: OfferPriceItem[];
  order_poly_glass: PolyGlassItem[];
}

export interface BarItem {
  code: string;
  name: string;
  color: string;
  type: string;
  script_type: string;
  auxibar: string;
  length: number;
  count: number;
  angle_one: string;
  angle_two: string;
  weight: number;
  note: string;
  meter_weight: number;
  size_type: number;
  is_optimize: boolean;
  print_sort: number;
}

export interface GlassItem {
  name: string;
  specs: string;
  note: string;
  height: number;
  width: number;
  count: number;
  type: string;
}

export interface AddonItem {
  code: string;
  name: string;
  specs: string;
  note: string;
  color: string;
  count: number;
  length: number;
}

export interface SubBarItem {
  master_code: string;
  bom_code: string;
  name: string;
  color: string;
  length: number;
  count: number;
  material: string;
}

export interface CostItem {
  name: string;
  cost: string;
  note: string;
}

export interface OfferPriceItem {
  name: string;
  price: number;
  count: number;
  quantity: number;
  money: number;
  unit: string;
  note: string;
  match_target: string;
  asQuantity: boolean;
  min_size: number;
  match_type: string;
  as_order_area: boolean;
  discount: number;
}

export interface PolyGlassItem {
  serial: string;
  svg: string;
  area: number;
}

/**
 * Main Drawing Component Methods
 */
export interface DrawingComponentMethods {
  initActionBar(): void;
  beforeLeave(config: any, force?: boolean): void;
  leaveAction(config: any): void;
  doBarAction(action: { action: string }): void;
  changeRightCardShow(show: boolean): void;
  handleKey(event: { srcKey: string }): void;
  beforeRefreshClose(): void;
  initCanvasEvent(): void;
  saveOrder(type?: string, createNew?: boolean): Promise<void>;
  saveData(type?: string): Promise<void>;
  afterSave(type: string, isNew?: boolean, response?: any, isScript?: boolean): void;
  uploadOrderImage(count: number): Promise<{ code: number; data: string[] }>;
  created3D(): Promise<void>;
  goToOutput(skipCheck?: boolean, data?: any): Promise<void>;
  selectBox(): void;
  showProductList(): void;
  getScriptList(productId: number): Promise<any>;
  getCustomVariableList(productId: number): Promise<any[]>;
  scriptCalculation(script: any, order: any, vars: any): Promise<{ result: ScriptResult; summary: any }>;
  getDividedWay(): void;
  callKeyboard(): void;
  cancelKeyboard(): void;
  confirmKeyboard(value: { value: number; direction?: string }): void;
  chooseWindoorSubmit(selected?: any[]): void;
  hideMostOperation(script: { id: number; drawing_data?: string }): void;
  downloadPic(method: 'toData' | 'toNoDimData'): void;
  lengthenWaiting(): Promise<void>;
  asyncTimer(duration: number): Promise<void>;
  generateRandomTime(max: number): number;
  create_scene(): void;
  setProductName(name: string): void;
  sunnyhouseApply(): void;
  getLoginStatus(): void;
  updateMultipoint(data: any): void;
  initListener(): void;
  destroyListener(): void;
  gobuy(): void;
  test(blob: Blob): void;
  saveToLibrary(): Promise<void>;
}

/**
 * Vue Component Definition
 */
declare const DrawingComponent: import('vue').ComponentOptions<
  import('vue').default,
  DrawingComponentData,
  DrawingComponentMethods,
  Record<string, any>,
  WebviewFrameProps
>;

export default DrawingComponent;