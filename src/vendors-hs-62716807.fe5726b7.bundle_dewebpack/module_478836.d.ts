/**
 * Ant Design English (en-US) locale configuration
 * Provides translation strings and locale-specific settings for all Ant Design components
 */

import type { Locale as PaginationLocale } from 'antd/lib/pagination';
import type { Locale as DatePickerLocale } from 'antd/lib/date-picker';
import type { Locale as TimePickerLocale } from 'antd/lib/time-picker';
import type { Locale as CalendarLocale } from 'antd/lib/calendar';

/**
 * Validation message template parameters
 */
interface ValidationMessageParams {
  /** Field label */
  label?: string;
  /** Field type */
  type?: string;
  /** Enumeration values */
  enum?: string;
  /** Required length */
  len?: number;
  /** Minimum length/value */
  min?: number;
  /** Maximum length/value */
  max?: number;
  /** Pattern to match */
  pattern?: string;
}

/**
 * Type validation messages structure
 */
interface TypeValidationMessages {
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
}

/**
 * Date validation messages structure
 */
interface DateValidationMessages {
  format: string;
  parse: string;
  invalid: string;
}

/**
 * String validation messages structure
 */
interface StringValidationMessages {
  len: string;
  min: string;
  max: string;
  range: string;
}

/**
 * Number validation messages structure
 */
interface NumberValidationMessages {
  len: string;
  min: string;
  max: string;
  range: string;
}

/**
 * Array validation messages structure
 */
interface ArrayValidationMessages {
  len: string;
  min: string;
  max: string;
  range: string;
}

/**
 * Pattern validation messages structure
 */
interface PatternValidationMessages {
  mismatch: string;
}

/**
 * Form validation messages structure
 */
interface FormValidateMessages {
  default?: string;
  required?: string;
  enum?: string;
  whitespace?: string;
  date?: DateValidationMessages;
  types?: TypeValidationMessages;
  string?: StringValidationMessages;
  number?: NumberValidationMessages;
  array?: ArrayValidationMessages;
  pattern?: PatternValidationMessages;
}

/**
 * Table component locale configuration
 */
interface TableLocale {
  filterTitle: string;
  filterConfirm: string;
  filterReset: string;
  filterEmptyText: string;
  emptyText: string;
  selectAll: string;
  selectInvert: string;
  selectNone: string;
  selectionAll: string;
  sortTitle: string;
  expand: string;
  collapse: string;
  triggerDesc: string;
  triggerAsc: string;
  cancelSort: string;
}

/**
 * Modal component locale configuration
 */
interface ModalLocale {
  okText: string;
  cancelText: string;
  justOkText: string;
}

/**
 * Popconfirm component locale configuration
 */
interface PopconfirmLocale {
  okText: string;
  cancelText: string;
}

/**
 * Transfer component locale configuration
 */
interface TransferLocale {
  titles: [string, string];
  searchPlaceholder: string;
  itemUnit: string;
  itemsUnit: string;
  remove: string;
  selectCurrent: string;
  removeCurrent: string;
  selectAll: string;
  removeAll: string;
  selectInvert: string;
}

/**
 * Upload component locale configuration
 */
interface UploadLocale {
  uploading: string;
  removeFile: string;
  uploadError: string;
  previewFile: string;
  downloadFile: string;
}

/**
 * Empty component locale configuration
 */
interface EmptyLocale {
  description: string;
}

/**
 * Icon component locale configuration
 */
interface IconLocale {
  icon: string;
}

/**
 * Text component locale configuration
 */
interface TextLocale {
  edit: string;
  copy: string;
  copied: string;
  expand: string;
}

/**
 * PageHeader component locale configuration
 */
interface PageHeaderLocale {
  back: string;
}

/**
 * Form component locale configuration
 */
interface FormLocale {
  optional: string;
  defaultValidateMessages: FormValidateMessages;
}

/**
 * Image component locale configuration
 */
interface ImageLocale {
  preview: string;
}

/**
 * Global locale configuration
 */
interface GlobalLocale {
  placeholder: string;
}

/**
 * Complete Ant Design locale configuration interface
 */
interface AntdLocale {
  /** Locale identifier (e.g., 'en', 'zh-CN') */
  locale: string;
  
  /** Pagination component locale */
  Pagination: PaginationLocale;
  
  /** DatePicker component locale */
  DatePicker: DatePickerLocale;
  
  /** TimePicker component locale */
  TimePicker: TimePickerLocale;
  
  /** Calendar component locale */
  Calendar: CalendarLocale;
  
  /** Global component settings */
  global: GlobalLocale;
  
  /** Table component locale */
  Table: TableLocale;
  
  /** Modal component locale */
  Modal: ModalLocale;
  
  /** Popconfirm component locale */
  Popconfirm: PopconfirmLocale;
  
  /** Transfer component locale */
  Transfer: TransferLocale;
  
  /** Upload component locale */
  Upload: UploadLocale;
  
  /** Empty component locale */
  Empty: EmptyLocale;
  
  /** Icon component locale */
  Icon: IconLocale;
  
  /** Text component locale */
  Text: TextLocale;
  
  /** PageHeader component locale */
  PageHeader: PageHeaderLocale;
  
  /** Form component locale */
  Form: FormLocale;
  
  /** Image component locale */
  Image: ImageLocale;
}

/**
 * Default English locale configuration for Ant Design
 */
declare const locale: AntdLocale;

export default locale;
export type {
  AntdLocale,
  TableLocale,
  ModalLocale,
  PopconfirmLocale,
  TransferLocale,
  UploadLocale,
  EmptyLocale,
  IconLocale,
  TextLocale,
  PageHeaderLocale,
  FormLocale,
  FormValidateMessages,
  ImageLocale,
  GlobalLocale,
  ValidationMessageParams
};