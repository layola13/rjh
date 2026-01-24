/**
 * Ant Design English (en_US) Locale Package
 * 
 * This module provides complete internationalization translations for all Ant Design components.
 * Used for configuring the default language of the component library.
 * 
 * @module LocaleProvider
 * @see https://ant.design/components/locale-provider/
 */

/**
 * Validation message template interpolation values
 */
interface ValidationTemplateContext {
  /** Field label name */
  label: string;
  /** Expected data type */
  type: string;
  /** Enum allowed values */
  enum: string;
  /** String/Array/Number length requirement */
  len: number;
  /** Minimum value/length */
  min: number;
  /** Maximum value/length */
  max: number;
  /** Pattern for regex validation */
  pattern: string;
}

/**
 * Pagination component locale configuration
 */
interface PaginationLocale {
  items_per_page?: string;
  jump_to?: string;
  jump_to_confirm?: string;
  page?: string;
  prev_page?: string;
  next_page?: string;
  prev_5?: string;
  next_5?: string;
  prev_3?: string;
  next_3?: string;
}

/**
 * DatePicker component locale configuration
 */
interface DatePickerLocale {
  lang?: Record<string, unknown>;
  timePickerLocale?: Record<string, unknown>;
  dateFormat?: string;
  dateTimeFormat?: string;
  weekFormat?: string;
  monthFormat?: string;
}

/**
 * TimePicker component locale configuration
 */
interface TimePickerLocale {
  placeholder?: string;
  rangePlaceholder?: [string, string];
}

/**
 * Calendar component locale configuration
 */
interface CalendarLocale {
  today?: string;
  now?: string;
  backToToday?: string;
  ok?: string;
  clear?: string;
  month?: string;
  year?: string;
  timeSelect?: string;
  dateSelect?: string;
  monthSelect?: string;
  yearSelect?: string;
  decadeSelect?: string;
}

/**
 * Table component locale configuration
 */
interface TableLocale {
  /** Filter dropdown menu title */
  filterTitle: string;
  /** Filter confirm button text */
  filterConfirm: string;
  /** Filter reset button text */
  filterReset: string;
  /** Empty filter text */
  filterEmptyText: string;
  /** Empty data text */
  emptyText: string;
  /** Select all rows on current page */
  selectAll: string;
  /** Invert selection on current page */
  selectInvert: string;
  /** Clear all selected data */
  selectNone: string;
  /** Select all data across pages */
  selectionAll: string;
  /** Sort column title */
  sortTitle: string;
  /** Expand row icon title */
  expand: string;
  /** Collapse row icon title */
  collapse: string;
  /** Trigger descending sort tooltip */
  triggerDesc: string;
  /** Trigger ascending sort tooltip */
  triggerAsc: string;
  /** Cancel sorting tooltip */
  cancelSort: string;
}

/**
 * Modal component locale configuration
 */
interface ModalLocale {
  /** Confirm button text */
  okText: string;
  /** Cancel button text */
  cancelText: string;
  /** Single button (OK only) text */
  justOkText: string;
}

/**
 * Popconfirm component locale configuration
 */
interface PopconfirmLocale {
  /** Confirm button text */
  okText: string;
  /** Cancel button text */
  cancelText: string;
}

/**
 * Transfer component locale configuration
 */
interface TransferLocale {
  /** Source and target panel titles */
  titles: [string, string];
  /** Search input placeholder */
  searchPlaceholder: string;
  /** Singular item unit */
  itemUnit: string;
  /** Plural items unit */
  itemsUnit: string;
  /** Remove item action text */
  remove: string;
  /** Select current page action text */
  selectCurrent: string;
  /** Remove current page action text */
  removeCurrent: string;
  /** Select all data action text */
  selectAll: string;
  /** Remove all data action text */
  removeAll: string;
  /** Invert current page selection action text */
  selectInvert: string;
}

/**
 * Upload component locale configuration
 */
interface UploadLocale {
  /** Uploading status text */
  uploading: string;
  /** Remove file action text */
  removeFile: string;
  /** Upload error message */
  uploadError: string;
  /** Preview file action text */
  previewFile: string;
  /** Download file action text */
  downloadFile: string;
}

/**
 * Empty component locale configuration
 */
interface EmptyLocale {
  /** No data description text */
  description: string;
}

/**
 * Icon component locale configuration
 */
interface IconLocale {
  /** Icon aria-label */
  icon: string;
}

/**
 * Text component locale configuration
 */
interface TextLocale {
  /** Edit action text */
  edit: string;
  /** Copy action text */
  copy: string;
  /** Copied success feedback text */
  copied: string;
  /** Expand action text */
  expand: string;
}

/**
 * PageHeader component locale configuration
 */
interface PageHeaderLocale {
  /** Back button text */
  back: string;
}

/**
 * Form validation messages locale configuration
 */
interface FormValidateMessages {
  /** Default validation error message template */
  default: string;
  /** Required field validation message template */
  required: string;
  /** Enum validation message template */
  enum: string;
  /** Whitespace validation message template */
  whitespace: string;
  /** Date validation messages */
  date: {
    /** Date format error message template */
    format: string;
    /** Date parse error message template */
    parse: string;
    /** Invalid date message template */
    invalid: string;
  };
  /** Type validation messages for different data types */
  types: {
    string: string;
    method: string;
    array: string;
    object: string;
    number: string;
    date: string;
    boolean: string;
    integer: string;
    float: string;
    regexp: string;
    email: string;
    url: string;
    hex: string;
  };
  /** String validation messages */
  string: {
    /** Exact length validation message template */
    len: string;
    /** Minimum length validation message template */
    min: string;
    /** Maximum length validation message template */
    max: string;
    /** Length range validation message template */
    range: string;
  };
  /** Number validation messages */
  number: {
    /** Equal value validation message template */
    len: string;
    /** Minimum value validation message template */
    min: string;
    /** Maximum value validation message template */
    max: string;
    /** Value range validation message template */
    range: string;
  };
  /** Array validation messages */
  array: {
    /** Exact array length validation message template */
    len: string;
    /** Minimum array length validation message template */
    min: string;
    /** Maximum array length validation message template */
    max: string;
    /** Array length range validation message template */
    range: string;
  };
  /** Pattern validation messages */
  pattern: {
    /** Pattern mismatch message template */
    mismatch: string;
  };
}

/**
 * Form component locale configuration
 */
interface FormLocale {
  /** Optional field indicator text */
  optional: string;
  /** Default validation error messages */
  defaultValidateMessages: FormValidateMessages;
}

/**
 * Image component locale configuration
 */
interface ImageLocale {
  /** Image preview text */
  preview: string;
}

/**
 * Global component settings
 */
interface GlobalLocale {
  /** Default placeholder text for select/input components */
  placeholder: string;
}

/**
 * Complete Ant Design locale configuration object
 * 
 * @example
 *