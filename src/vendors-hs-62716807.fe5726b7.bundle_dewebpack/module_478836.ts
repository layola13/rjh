import Pagination from './Pagination';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import Calendar from './Calendar';

interface ComponentLocale {
  locale?: string;
  [key: string]: unknown;
}

interface GlobalLocale {
  placeholder: string;
}

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

interface ModalLocale {
  okText: string;
  cancelText: string;
  justOkText: string;
}

interface PopconfirmLocale {
  okText: string;
  cancelText: string;
}

interface TransferLocale {
  titles: string[];
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

interface UploadLocale {
  uploading: string;
  removeFile: string;
  uploadError: string;
  previewFile: string;
  downloadFile: string;
}

interface EmptyLocale {
  description: string;
}

interface IconLocale {
  icon: string;
}

interface TextLocale {
  edit: string;
  copy: string;
  copied: string;
  expand: string;
}

interface PageHeaderLocale {
  back: string;
}

interface DateValidationLocale {
  format: string;
  parse: string;
  invalid: string;
}

interface TypesValidationLocale {
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

interface StringValidationLocale {
  len: string;
  min: string;
  max: string;
  range: string;
}

interface NumberValidationLocale {
  len: string;
  min: string;
  max: string;
  range: string;
}

interface ArrayValidationLocale {
  len: string;
  min: string;
  max: string;
  range: string;
}

interface PatternValidationLocale {
  mismatch: string;
}

interface ValidateMessagesLocale {
  default: string;
  required: string;
  enum: string;
  whitespace: string;
  date: DateValidationLocale;
  types: TypesValidationLocale;
  string: StringValidationLocale;
  number: NumberValidationLocale;
  array: ArrayValidationLocale;
  pattern: PatternValidationLocale;
}

interface FormLocale {
  optional: string;
  defaultValidateMessages: ValidateMessagesLocale;
}

interface ImageLocale {
  preview: string;
}

interface Locale {
  locale: string;
  Pagination: ComponentLocale;
  DatePicker: ComponentLocale;
  TimePicker: ComponentLocale;
  Calendar: ComponentLocale;
  global: GlobalLocale;
  Table: TableLocale;
  Modal: ModalLocale;
  Popconfirm: PopconfirmLocale;
  Transfer: TransferLocale;
  Upload: UploadLocale;
  Empty: EmptyLocale;
  Icon: IconLocale;
  Text: TextLocale;
  PageHeader: PageHeaderLocale;
  Form: FormLocale;
  Image: ImageLocale;
}

const VALIDATION_TYPE_MESSAGE = '${label} is not a valid ${type}';

const enUS: Locale = {
  locale: 'en',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Please select'
  },
  Table: {
    filterTitle: 'Filter menu',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    filterEmptyText: 'No filters',
    emptyText: 'No data',
    selectAll: 'Select current page',
    selectInvert: 'Invert current page',
    selectNone: 'Clear all data',
    selectionAll: 'Select all data',
    sortTitle: 'Sort',
    expand: 'Expand row',
    collapse: 'Collapse row',
    triggerDesc: 'Click to sort descending',
    triggerAsc: 'Click to sort ascending',
    cancelSort: 'Click to cancel sorting'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Cancel',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Cancel'
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Search here',
    itemUnit: 'item',
    itemsUnit: 'items',
    remove: 'Remove',
    selectCurrent: 'Select current page',
    removeCurrent: 'Remove current page',
    selectAll: 'Select all data',
    removeAll: 'Remove all data',
    selectInvert: 'Invert current page'
  },
  Upload: {
    uploading: 'Uploading...',
    removeFile: 'Remove file',
    uploadError: 'Upload error',
    previewFile: 'Preview file',
    downloadFile: 'Download file'
  },
  Empty: {
    description: 'No Data'
  },
  Icon: {
    icon: 'icon'
  },
  Text: {
    edit: 'Edit',
    copy: 'Copy',
    copied: 'Copied',
    expand: 'Expand'
  },
  PageHeader: {
    back: 'Back'
  },
  Form: {
    optional: '(optional)',
    defaultValidateMessages: {
      default: 'Field validation error for ${label}',
      required: 'Please enter ${label}',
      enum: '${label} must be one of [${enum}]',
      whitespace: '${label} cannot be a blank character',
      date: {
        format: '${label} date format is invalid',
        parse: '${label} cannot be converted to a date',
        invalid: '${label} is an invalid date'
      },
      types: {
        string: VALIDATION_TYPE_MESSAGE,
        method: VALIDATION_TYPE_MESSAGE,
        array: VALIDATION_TYPE_MESSAGE,
        object: VALIDATION_TYPE_MESSAGE,
        number: VALIDATION_TYPE_MESSAGE,
        date: VALIDATION_TYPE_MESSAGE,
        boolean: VALIDATION_TYPE_MESSAGE,
        integer: VALIDATION_TYPE_MESSAGE,
        float: VALIDATION_TYPE_MESSAGE,
        regexp: VALIDATION_TYPE_MESSAGE,
        email: VALIDATION_TYPE_MESSAGE,
        url: VALIDATION_TYPE_MESSAGE,
        hex: VALIDATION_TYPE_MESSAGE
      },
      string: {
        len: '${label} must be ${len} characters',
        min: '${label} must be at least ${min} characters',
        max: '${label} must be up to ${max} characters',
        range: '${label} must be between ${min}-${max} characters'
      },
      number: {
        len: '${label} must be equal to ${len}',
        min: '${label} must be minimum ${min}',
        max: '${label} must be maximum ${max}',
        range: '${label} must be between ${min}-${max}'
      },
      array: {
        len: 'Must be ${len} ${label}',
        min: 'At least ${min} ${label}',
        max: 'At most ${max} ${label}',
        range: 'The amount of ${label} must be between ${min}-${max}'
      },
      pattern: {
        mismatch: '${label} does not match the pattern ${pattern}'
      }
    }
  },
  Image: {
    preview: 'Preview'
  }
};

export default enUS;