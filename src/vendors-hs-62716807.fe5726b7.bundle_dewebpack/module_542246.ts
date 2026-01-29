export interface TimePickerLocale {
  placeholder: string;
  rangePlaceholder: [string, string];
}

const timePickerLocale: TimePickerLocale = {
  placeholder: "Select time",
  rangePlaceholder: ["Start time", "End time"]
};

export default timePickerLocale;