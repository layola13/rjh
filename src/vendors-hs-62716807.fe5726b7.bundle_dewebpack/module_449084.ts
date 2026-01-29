interface DatePickerLocale {
  lang: {
    placeholder: string;
    yearPlaceholder: string;
    quarterPlaceholder: string;
    monthPlaceholder: string;
    weekPlaceholder: string;
    rangePlaceholder: [string, string];
    rangeYearPlaceholder: [string, string];
    rangeMonthPlaceholder: [string, string];
    rangeWeekPlaceholder: [string, string];
    [key: string]: unknown;
  };
  timePickerLocale: {
    [key: string]: unknown;
  };
}

import defaultLocale from './defaultLocale';
import timePickerLocale from './timePickerLocale';

const datePickerLocale: DatePickerLocale = {
  lang: {
    placeholder: "Select date",
    yearPlaceholder: "Select year",
    quarterPlaceholder: "Select quarter",
    monthPlaceholder: "Select month",
    weekPlaceholder: "Select week",
    rangePlaceholder: ["Start date", "End date"],
    rangeYearPlaceholder: ["Start year", "End year"],
    rangeMonthPlaceholder: ["Start month", "End month"],
    rangeWeekPlaceholder: ["Start week", "End week"],
    ...defaultLocale
  },
  timePickerLocale: {
    ...timePickerLocale
  }
};

export default datePickerLocale;