function isOnePointZero(value: string | number): boolean {
  return typeof value === "string" && value.indexOf(".") !== -1 && parseFloat(value) === 1;
}

function isPercentage(value: string | number): boolean {
  return typeof value === "string" && value.indexOf("%") !== -1;
}

export function bound01(n: string | number, max: number): number {
  let value = n;
  
  if (isOnePointZero(value)) {
    value = "100%";
  }
  
  const isPercent = isPercentage(value);
  value = max === 360 ? value : Math.min(max, Math.max(0, parseFloat(String(value))));
  
  if (isPercent) {
    value = parseInt(String(Number(value) * max), 10) / 100;
  }
  
  if (Math.abs(Number(value) - max) < 1e-6) {
    return 1;
  }
  
  if (max === 360) {
    value = (Number(value) < 0 ? Number(value) % max + max : Number(value) % max) / parseFloat(String(max));
  } else {
    value = (Number(value) % max) / parseFloat(String(max));
  }
  
  return Number(value);
}

export function boundAlpha(alpha: string | number): number {
  let a = parseFloat(String(alpha));
  
  if (isNaN(a) || a < 0 || a > 1) {
    a = 1;
  }
  
  return a;
}

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function convertToPercentage(value: string | number): string {
  if (Number(value) <= 1) {
    return `${100 * Number(value)}%`;
  }
  return String(value);
}

export function pad2(character: string): string {
  return character.length === 1 ? "0" + character : String(character);
}

export { isOnePointZero, isPercentage };