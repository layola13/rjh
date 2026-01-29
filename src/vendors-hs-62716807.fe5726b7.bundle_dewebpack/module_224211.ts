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

interface DatePickerLocale {
  lang?: Record<string, unknown>;
  timePickerLocale?: Record<string, unknown>;
}

interface TimePickerLocale {
  placeholder?: string;
}

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

interface ValidateMessages {
  default?: string;
  required?: string;
  enum?: string;
  whitespace?: string;
  date?: {
    format?: string;
    parse?: string;
    invalid?: string;
  };
  types?: {
    string?: string;
    method?: string;
    array?: string;
    object?: string;
    number?: string;
    date?: string;
    boolean?: string;
    integer?: string;
    float?: string;
    regexp?: string;
    email?: string;
    url?: string;
    hex?: string;
  };
  string?: {
    len?: string;
    min?: string;
    max?: string;
    range?: string;
  };
  number?: {
    len?: string;
    min?: string;
    max?: string;
    range?: string;
  };
  array?: {
    len?: string;
    min?: string;
    max?: string;
    range?: string;
  };
  pattern?: {
    mismatch?: string;
  };
}

interface FormLocale {
  optional: string;
  defaultValidateMessages: ValidateMessages;
}

interface ImageLocale {
  preview: string;
}

interface Locale {
  locale: string;
  Pagination: PaginationLocale;
  DatePicker: DatePickerLocale;
  TimePicker: TimePickerLocale;
  Calendar: CalendarLocale;
  global: {
    placeholder: string;
  };
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

const VALIDATION_MESSAGE_TEMPLATE = "${label} is not a valid ${type}";

const enUSLocale: Locale = {
  locale: "en",
  Pagination: {},
  DatePicker: {},
  TimePicker: {},
  Calendar: {},
  global: {
    placeholder: "Please select"
  },
  Table: {
    filterTitle: "Filter menu",
    filterConfirm: "OK",
    filterReset: "Reset",
    filterEmptyText: "No filters",
    emptyText: "No data",
    selectAll: "Select current page",
    selectInvert: "Invert current page",
    selectNone: "Clear all data",
    selectionAll: "Select all data",
    sortTitle: "Sort",
    expand: "Expand row",
    collapse: "Collapse row",
    triggerDesc: "Click to sort descending",
    triggerAsc: "Click to sort ascending",
    cancelSort: "Click to cancel sorting"
  },
  Modal: {
    okText: "OK",
    cancelText: "Cancel",
    justOkText: "OK"
  },
  Popconfirm: {
    okText: "OK",
    cancelText: "Cancel"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Search here",
    itemUnit: "item",
    itemsUnit: "items",
    remove: "Remove",
    selectCurrent: "Select current page",
    removeCurrent: "Remove current page",
    selectAll: "Select all data",
    removeAll: "Remove all data",
    selectInvert: "Invert current page"
  },
  Upload: {
    uploading: "Uploading...",
    removeFile: "Remove file",
    uploadError: "Upload error",
    previewFile: "Preview file",
    downloadFile: "Download file"
  },
  Empty: {
    description: "No Data"
  },
  Icon: {
    icon: "icon"
  },
  Text: {
    edit: "Edit",
    copy: "Copy",
    copied: "Copied",
    expand: "Expand"
  },
  PageHeader: {
    back: "Back"
  },
  Form: {
    optional: "(optional)",
    defaultValidateMessages: {
      default: "Field validation error for ${label}",
      required: "Please enter ${label}",
      enum: "${label} must be one of [${enum}]",
      whitespace: "${label} cannot be a blank character",
      date: {
        format: "${label} date format is invalid",
        parse: "${label} cannot be converted to a date",
        invalid: "${label} is an invalid date"
      },
      types: {
        string: VALIDATION_MESSAGE_TEMPLATE,
        method: VALIDATION_MESSAGE_TEMPLATE,
        array: VALIDATION_MESSAGE_TEMPLATE,
        object: VALIDATION_MESSAGE_TEMPLATE,
        number: VALIDATION_MESSAGE_TEMPLATE,
        date: VALIDATION_MESSAGE_TEMPLATE,
        boolean: VALIDATION_MESSAGE_TEMPLATE,
        integer: VALIDATION_MESSAGE_TEMPLATE,
        float: VALIDATION_MESSAGE_TEMPLATE,
        regexp: VALIDATION_MESSAGE_TEMPLATE,
        email: VALIDATION_MESSAGE_TEMPLATE,
        url: VALIDATION_MESSAGE_TEMPLATE,
        hex: VALIDATION_MESSAGE_TEMPLATE
      },
      string: {
        len: "${label} must be ${len} characters",
        min: "${label} must be at least ${min} characters",
        max: "${label} must be up to ${max} characters",
        range: "${label} must be between ${min}-${max} characters"
      },
      number: {
        len: "${label} must be equal to ${len}",
        min: "${label} must be minimum ${min}",
        max: "${label} must be maximum ${max}",
        range: "${label} must be between ${min}-${max}"
      },
      array: {
        len: "Must be ${len} ${label}",
        min: "At least ${min} ${label}",
        max: "At most ${max} ${label}",
        range: "The amount of ${label} must be between ${min}-${max}"
      },
      pattern: {
        mismatch: "${label} does not match the pattern ${pattern}"
      }
    }
  },
  Image: {
    preview: "Preview"
  }
};

export default enUSLocale;