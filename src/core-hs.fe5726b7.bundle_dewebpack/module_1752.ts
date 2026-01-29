function convertToString(value: unknown, defaultValue?: string): string {
  return value === undefined 
    ? (arguments.length < 2 ? "" : defaultValue ?? "")
    : String(value);
}

export default convertToString;