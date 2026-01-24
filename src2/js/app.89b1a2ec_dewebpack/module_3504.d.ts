/**
 * Internationalization (i18n) localization strings for window product management system.
 * This module exports an object containing key-value pairs for UI text labels,
 * messages, and notifications used throughout the application.
 * 
 * @module LocalizationStrings
 */

/**
 * Localization string keys and their corresponding translated values.
 * Primarily used for English language UI elements in a window/glass manufacturing
 * and product management system.
 */
export interface LocalizationStrings {
  /** Label for creating new content */
  newContents: string;
  
  /** Label for exiting edit mode */
  exitEditing: string;
  
  /** Label for share action */
  share: string;
  
  /** Label for script/formula */
  script: string;
  
  /** Label for edit action */
  edit: string;
  
  /** Label for opening new window */
  newWindow: string;
  
  /** Label for type number field */
  typeNumber: string;
  
  /** Label for type name field */
  typeName: string;
  
  /** Label for delete action */
  delete: string;
  
  /** Tip message prompting user to add window type first */
  Tips: string;
  
  /** Label for catalog/directory level */
  catalog: string;
  
  /** Label for primary/first-level directory */
  catalog1: string;
  
  /** Label for secondary/second-level directory */
  catalog2: string;
  
  /** Label for superior/parent directory */
  Above: string;
  
  /** Label for directory name field */
  directoryName: string;
  
  /** Label for add directory action */
  add_directory: string;
  
  /** Label for edit directory action */
  edit_directory: string;
  
  /** Label for remarks/notes field */
  remarks: string;
  
  /** Label for window catalog section */
  windowCatalog: string;
  
  /** Label for save marking action */
  save_marking: string;
  
  /** Label for test script action */
  test_script: string;
  
  /** Label for add action */
  add: string;
  
  /** Label for clone/duplicate action */
  clone: string;
  
  /** Label for select all action */
  select_all: string;
  
  /** Label for deselect all action */
  not_at_all: string;
  
  /** Label for input field */
  input: string;
  
  /** Label for code field */
  code: string;
  
  /** Label for name field */
  name: string;
  
  /** Label for color field */
  color: string;
  
  /** Label for length dimension */
  length: string;
  
  /** Label for count/quantity */
  count: string;
  
  /** Label for first angle measurement */
  angle_one: string;
  
  /** Label for second angle measurement */
  angle_two: string;
  
  /** Label for angle measurement */
  angle: string;
  
  /** Label for material list section */
  material_list: string;
  
  /** Label for profile list section */
  profile_list: string;
  
  /** Label for glass list section */
  glass_list: string;
  
  /** Label for addon/accessories list section */
  addon_list: string;
  
  /** Label for cost list section */
  cost_list: string;
  
  /** Label for order log section */
  order_log: string;
  
  /** Label for condition field */
  condition: string;
  
  /** Label for note field */
  note: string;
  
  /** Label for result field */
  result: string;
  
  /** Label for specifications */
  specs: string;
  
  /** Label for height dimension */
  height: string;
  
  /** Label for width dimension */
  width: string;
  
  /** Label for cost script section */
  cost: string;
  
  /** Label for costing/cost calculation */
  costing: string;
  
  /** Alternative label for cost script */
  cost1: string;
  
  /** Label for bar script section */
  bar: string;
  
  /** Alternative label for bar */
  bar1: string;
  
  /** Label for glass script section */
  glass: string;
  
  /** Alternative label for glass */
  glass1: string;
  
  /** Label for hardware script section */
  addon: string;
  
  /** Alternative label for hardware */
  addon1: string;
  
  /** Label for window library section */
  window_library: string;
  
  /** Label for product management section */
  product_management: string;
  
  /** Warning message prefix: "Please select " */
  warning1: string;
  
  /** Warning message separator/spacer */
  warning2: string;
  
  /** Warning message prefix: "Default " */
  warning3: string;
  
  /** Warning message suffix: " the first choice " */
  warning4: string;
  
  /** Warning message: "Please select to delete " */
  warning5: string;
  
  /** Label for add series action */
  add_series: string;
  
  /** Label for edit series action */
  edit_series: string;
  
  /** Label for add script action */
  add_script: string;
  
  /** Label for go back/return action */
  go_back: string;
  
  /** Message indicating no series available */
  no_series: string;
  
  /** Message indicating no pictures available */
  no_pictures: string;
  
  /** Message indicating no script available */
  no_script: string;
  
  /** Label for intelligence/smart script */
  intelligence_script: string;
  
  /** Label for template script */
  template_script: string;
  
  /** Label for share product action */
  share_product: string;
  
  /** Label for send to customer action */
  send_customer: string;
  
  /** Warning message: "Please input series name" */
  warning6: string;
  
  /** Label for series name field */
  series_name: string;
  
  /** Label for import script action */
  import_script: string;
  
  /** Label for cover/replace action */
  cover: string;
  
  /** Text for cover/replace instructions */
  cover_text: string;
  
  /** Label for select window action */
  select_window: string;
  
  /** Warning message: "Please select window first!" */
  warning7: string;
  
  /** Warning message: "Please select a directory first" */
  warning8: string;
  
  /** Label for choose dealer action */
  choose_dealer: string;
  
  /** Label for send scripts action */
  send_scripts: string;
  
  /** Warning message: "Please select the formula to share first!" */
  warning9: string;
  
  /** Label for search action */
  search: string;
  
  /** Confirmation message prefix: "This action shares the selected formula to " */
  actionwill: string;
  
  /** Label for contact information field */
  contactwith: string;
  
  /** Confirmation message: "Please confirm the operation !" */
  confirm_action: string;
  
  /** Label for track index field */
  track_index: string;
  
  /** Sort option: new items first */
  new_added_first: string;
  
  /** Sort option: new items last */
  new_added_last: string;
  
  /** Label for sort action */
  sort: string;
  
  /** Label for cancel action */
  cancel: string;
  
  /** Label for type field */
  type: string;
  
  /** Label for upload to market action */
  upload_market: string;
  
  /** Label for upload image action */
  upload_image: string;
  
  /** Label for province field */
  province: string;
  
  /** Label for city field */
  city: string;
  
  /** Label for product brand field */
  product_brand: string;
  
  /** Label for formula type field */
  formula_type: string;
  
  /** Label for window type field */
  window_type: string;
  
  /** Label for formula name field */
  formula_name: string;
  
  /** Label for formula description field */
  formula_describe: string;
  
  /** Label indicating item has been read */
  have_read: string;
  
  /** Label for agreement/terms */
  agreement: string;
  
  /** Label for confirm upload action */
  confirm_upload: string;
  
  /** Success message: upload successful, awaiting review */
  upload_success: string;
  
  /** Error message: description exceeds limit */
  description_exceed: string;
  
  /** Label for product mall/marketplace section */
  product_mall: string;
  
  /** Label for edit name action */
  edit_name: string;
  
  /** Label for new name field */
  new_name: string;
  
  /** Label for choose customer action */
  choose_customer: string;
  
  /** Label for share script action */
  share_script: string;
  
  /** Label for copy password action */
  copy_password: string;
  
  /** Message displayed when password is copied */
  copy_password_message: string;
  
  /** Message prefix for displaying password */
  password_message: string;
  
  /** Prompt for password input */
  input_password: string;
  
  /** Label for new window action (duplicate of newWindow) */
  new_window: string;
  
  /** Label for polyglass list section */
  poly_glass_list: string;
  
  /** Label for serial number field */
  serial: string;
  
  /** Label for area measurement */
  area: string;
  
  /** Label for SVG/picture field */
  svg: string;
  
  /** Label for product management section (alternative) */
  product_manage: string;
  
  /** Default label for undefined/untitled items */
  undefined: string;
  
  /** Label for video course section */
  course: string;
  
  /** Label for input code field */
  input_code: string;
  
  /** Label for target product field */
  target_product: string;
  
  /** Label for intelligent formula section */
  intelligent_formula: string;
  
  /** Label for recycle bin section */
  recycle: string;
  
  /** Label for restore action */
  restore: string;
  
  /** Label for primary category field */
  primary_category: string;
  
  /** Label for secondary category field */
  secondary_category: string;
  
  /** Label for restore product action */
  restore_product: string;
  
  /** Prompt message: "please select category" */
  please_select_category: string;
}

/**
 * Default English localization strings for the application.
 * Contains all UI labels, messages, and notifications.
 */
declare const localizationData: LocalizationStrings;

export default localizationData;