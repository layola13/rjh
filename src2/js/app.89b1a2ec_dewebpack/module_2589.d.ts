/**
 * Localization module for window/door design system
 * Contains internationalized strings for operations, labels, tables, tabs, messages and selections
 */

/**
 * Main localization data structure
 */
export interface LocalizationData {
  /** User operations and actions */
  operations: Operations;
  /** UI labels and display text */
  label: Labels;
  /** Table column headers and data labels */
  table: TableHeaders;
  /** Tab navigation labels */
  tabs: TabLabels;
  /** User-facing messages and help text */
  message: Messages;
  /** Selection dropdown options */
  select: SelectOptions;
}

/**
 * User operations and action buttons
 */
export interface Operations {
  /** Drawing settings configuration */
  drawingSettings: string;
  /** User profile management */
  profile: string;
  /** Draw action */
  draw: string;
  /** Test functionality */
  test: string;
  /** Undo last action */
  undo: string;
  /** Redo last undone action */
  redo: string;
  /** Remove item */
  remove: string;
  /** Clear all */
  clear: string;
  /** Import window/door data */
  importWindoor: string;
  /** Import JSON data */
  importJson: string;
  /** Add custom variable */
  addVariable: string;
  /** Sort items */
  sort: string;
  /** Complete action */
  complete: string;
  /** Cancel action */
  cancel: string;
  /** Add condition rule */
  addCondition: string;
  /** Edit item */
  edit: string;
  /** Clone/duplicate item */
  clone: string;
  /** Delete item */
  delete: string;
  /** Add new item */
  add: string;
  /** Group sorting */
  groupSort: string;
  /** Add automatic rule */
  addAutomatic: string;
  /** Cancel automatic rule */
  cancelAutomatic: string;
  /** Add automatic cost calculation */
  addAutomaticCost: string;
  /** Cancel automatic cost calculation */
  cancelAutomaticCost: string;
  /** Sash series selection */
  sash_series: string;
  /** Import Excel file */
  import_excel: string;
  /** Download template file */
  download_template: string;
  /** Change parameters */
  changeParams: string;
  /** Try now action */
  try_now: string;
  /** Generate formula */
  generate_formula: string;
  /** Choose method/way */
  choose_way: string;
  /** Print sorting */
  print_sort: string;
  /** Import from file */
  from_file: string;
}

/**
 * UI labels and display text
 */
export interface Labels {
  /** Profile size specification */
  profileSize: string;
  /** Show more options */
  more: string;
  /** Default value/option */
  default: string;
  /** Frame component */
  frame: string;
  /** Mullion (vertical/horizontal divider) */
  mullion: string;
  /** Sash (movable panel) */
  sash: string;
  /** Screen component */
  screen: string;
  /** Bead (glazing bead) */
  bead: string;
  /** Frame milling process */
  millingFrame: string;
  /** Glass installation gap */
  glassGap: string;
  /** Sash mullion */
  sashMullion: string;
  /** Anti-theft feature */
  antiTheft: string;
  /** Anti-theft mullion */
  antiTheftMullion: string;
  /** KFC waist profile */
  kfcWaist: string;
  /** Upper sash */
  upSash: string;
  /** Lower sash */
  downSash: string;
  /** Interlock mechanism */
  interlock: string;
  /** Corner joiner component */
  cornerJoiner: string;
  /** Connector component */
  connector: string;
  /** Frame mullion length (large) */
  frameMullionLg: string;
  /** Profile component */
  profile: string;
  /** Glass component */
  glass: string;
  /** Addon/accessory component */
  addon: string;
  /** Size specification */
  size: string;
  /** Calculation result output */
  calculationResult: string;
  /** Custom variable definition */
  customVariable: string;
  /** Available variables for formulas */
  availableVariables: string;
  /** Name field */
  name: string;
  /** Condition rule */
  condition: string;
  /** Value field */
  value: string;
  /** Optimization flag */
  isOptimize: string;
  /** Effective/active status */
  effective: string;
  /** Ineffective/inactive status */
  inEffective: string;
  /** Material type */
  material: string;
  /** Minimum area extra description */
  min_area_extra: string;
  /** Minimum area usage notice */
  min_area_extra_notice: string;
  /** Choose option */
  choose: string;
  /** Input field */
  input: string;
  /** Logical AND operator */
  and: string;
  /** Logical OR operator */
  or: string;
  /** Sash calculation result */
  sash_result: string;
  /** Outer color price */
  our_color_price: string;
  /** Inner color price */
  in_color_price: string;
  /** Grid label price */
  guigelabel_price: string;
  /** Net price */
  net_price: string;
  /** Product name price */
  product_name_price: string;
  /** Frame price */
  frame_price: string;
  /** Mullion price */
  mullion_price: string;
  /** Sash price */
  sash_price: string;
  /** Frame (Chinese) */
  边框: string;
  /** Mullion (Chinese) */
  中梃: string;
  /** End milling (Chinese) */
  端铣: string;
  /** Glass installation gap (Chinese) */
  玻璃安装缝隙: string;
  /** Overlap amount (Chinese) */
  扇搭接量: string;
  /** Deduction amount (Chinese) */
  扇玻扣减量: string;
  /** Bead (Chinese) */
  压线: string;
  /** Reinforced frame mullion */
  reinforcedFrameMullion: string;
  /** Parameter setting */
  parameter_setting: string;
  /** Choose slide way */
  choose_slide_way: string;
  /** CC minus operator */
  'cc-': string;
  /** CC plus operator */
  'cc+': string;
  /** Empty value */
  空: string;
  /** Total money amount */
  total_money: string;
  /** Total cost amount */
  total_cost: string;
  /** Yuan currency unit */
  yuan: string;
  /** Product detail information */
  product_detail: string;
  /** Standard configuration */
  standard_configuration: string;
  /** Aluminum material */
  aluminum: string;
  /** Hardware system */
  hardware_system: string;
  /** Adhesive strip/seal */
  adhesive_strip: string;
  /** Insulation strip */
  insulation_strip: string;
  /** Profile cavity */
  profile_cavity: string;
  /** Process details */
  process_details: string;
  /** Group corner process */
  group_corner_process: string;
  /** Sash chamfer */
  sash_chamfer: string;
  /** After-sales service */
  after_sales: string;
  /** Quality assurance */
  quality_assurance: string;
  /** Performance specifications */
  performance: string;
  /** Sound insulation rating */
  sound_insulation: string;
  /** Quote calculation tip */
  quote_count_tip: string;
}

/**
 * Table column headers and data labels
 */
export interface TableHeaders {
  /** Profile calculation result */
  profileResult: string;
  /** Item code/SKU */
  code: string;
  /** Item name */
  name: string;
  /** Item type */
  type: string;
  /** Cutting angle */
  cutAngle: string;
  /** Color specification */
  color: string;
  /** Calculation result */
  calculationResult: string;
  /** Glass calculation result */
  glassResult: string;
  /** Specifications */
  specs: string;
  /** Addon calculation result */
  addonResult: string;
  /** Quote calculation result */
  quoteResult: string;
  /** Item description */
  item: string;
  /** Price value */
  price: string;
  /** Match target criteria */
  matchTarget: string;
  /** Treat as quantity */
  asQuantity: string;
  /** Match type */
  matchType: string;
  /** Minimum size */
  minSize: string;
  /** Minimum length */
  minLength: string;
  /** Minimum size or length */
  minSizeAndLength: string;
  /** Note/comment field */
  note: string;
  /** Quantity count */
  quantity: string;
  /** Area measurement */
  area: string;
  /** Condition rule */
  condition: string;
  /** Value field */
  value: string;
  /** Operation action */
  operation: string;
  /** Auxiliary bar */
  auxibar: string;
  /** Optimization flag */
  isOptimize: string;
  /** Position type */
  posType: string;
  /** Size type */
  sizeType: string;
  /** Side position */
  sidePosition: string;
  /** Length measurement */
  length: string;
  /** Count value */
  count: string;
  /** Weight per meter */
  meterWeight: string;
  /** Condition (alternate) */
  condition2: string;
  /** Sash assignment method */
  sashAssignWay: string;
  /** Sash number */
  sashNum: string;
  /** Sash number track index */
  sashNumTrackIndex: string;
  /** Track index */
  trackIndex: string;
  /** Sash assignment method (alternate) */
  sashAssignWay2: string;
  /** Width/height measurement */
  length2: string;
  /** Sash assignment method (variant 3) */
  sashAssignWay3: string;
  /** Sash assignment method (variant 4) */
  sashAssignWay4: string;
  /** Name (alternate) */
  name2: string;
  /** Unit of measurement */
  unit: string;
  /** Cost calculation result */
  costResult: string;
  /** Weight per square meter */
  squareMeterWeight: string;
  /** Calculated length */
  calcLength: string;
  /** Calculated count */
  calcCount: string;
  /** Cost value */
  cost: string;
  /** Quote value */
  quote: string;
  /** Material automatic calculation */
  material_automatic: string;
  /** Auto-distinguished flag */
  auto_distinguished: string;
  /** Material automatic cost */
  material_automatic_cost: string;
  /** Sash assignment way (variant 1) */
  sash_assign_way1: string;
  /** Sash assignment way (variant 2) */
  sash_assign_way2: string;
  /** Sash assignment way (variant 3) */
  sash_assign_way3: string;
  /** Error message display */
  error_message: string;
  /** Effect/impact */
  effect: string;
  /** Prevent save action */
  prevent_save: string;
  /** Hint only (no enforcement) */
  hint_only: string;
  /** Markup percentage */
  mark_up: string;
  /** Discount percentage */
  discount: string;
  /** Basic money amount */
  basic_money: string;
}

/**
 * Tab navigation labels
 */
export interface TabLabels {
  /** Bar/profile tab */
  bar: string;
  /** Sash tab */
  sash: string;
  /** Double sash tab */
  doubleSash: string;
  /** Sliding sash tab */
  slideSash: string;
  /** Folding sash tab */
  foldSash: string;
  /** Quote tab */
  quote: string;
  /** Cost tab */
  cost: string;
  /** More settings tab */
  more: string;
  /** Design rule tab */
  rule: string;
  /** Glass tab */
  glass: string;
  /** Sash glass tab */
  sashGlass: string;
}

/**
 * User-facing messages and help text
 */
export interface Messages {
  /** Prompt to choose BOM code */
  enter_bom_code: string;
  /** Prompt to enter color */
  enter_color: string;
  /** Prompt to enter cost */
  enter_cost: string;
  /** Prompt to enter quote */
  enter_quote: string;
  /** Prompt to choose material */
  enter_material: string;
  /** Prompt to enter length reduction */
  enter_reduction: string;
  /** Prompt to enter formula */
  enter_formula: string;
  /** Sash calculation detail description */
  sash_detail: string;
  /** Screen calculation detail description */
  screen_detail: string;
  /** Dimension calculation detail description */
  dim_detail: string;
  /** Anti-theft calculation detail description */
  antiTheft_detail: string;
  /** Profile default calculation detail */
  profile_default_detail: string;
  /** Double sash calculation detail */
  doubleSash_detail: string;
  /** Sliding sash calculation detail (variant 1) */
  slideSash_detail1: string;
  /** Sliding sash calculation detail (variant 2) */
  slideSash_detail2: string;
  /** Sliding sash calculation detail (variant 3) */
  slideSash_detail3: string;
  /** Folding sash calculation detail */
  foldSash_detail: string;
  /** Folding sash calculation detail (variant 2) */
  foldSash_detail2: string;
  /** Confirmation prompt for delete */
  confirm_delete: string;
  /** Parameter setting description */
  parameter_setting_des: string;
  /** Sash assignment way detail description */
  sashAssignWay_detail: string;
}

/**
 * Selection dropdown options
 */
export interface SelectOptions {
  /** Profile selection option */
  profile: string;
  /** Hardware selection option */
  hardware: string;
  /** Glass selection option */
  glass: string;
  /** Addon selection option */
  addon: string;
  /** Sash selection option */
  sash: string;
}

/**
 * Default export of parsed localization data
 */
declare const localizationData: LocalizationData;

export default localizationData;