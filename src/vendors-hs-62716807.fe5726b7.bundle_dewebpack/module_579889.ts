type ClassValue = string | number | boolean | undefined | null | ClassArray | ClassDictionary;

interface ClassDictionary {
  [id: string]: boolean | undefined | null;
}

interface ClassArray extends Array<ClassValue> {}

function toValue(mix: ClassValue): string {
  let str = "";
  
  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object" && mix !== null) {
    if (Array.isArray(mix)) {
      const length = mix.length;
      for (let index = 0; index < length; index++) {
        const item = mix[index];
        if (item) {
          const result = toValue(item);
          if (result) {
            if (str) {
              str += " ";
            }
            str += result;
          }
        }
      }
    } else {
      for (const key in mix) {
        if (mix[key]) {
          if (str) {
            str += " ";
          }
          str += key;
        }
      }
    }
  }
  
  return str;
}

/**
 * Concatenates class names conditionally
 * @param inputs - Class values to concatenate
 * @returns Combined class name string
 */
export function clsx(...inputs: ClassValue[]): string {
  let index = 0;
  let result = "";
  const length = inputs.length;
  
  while (index < length) {
    const input = inputs[index];
    if (input) {
      const value = toValue(input);
      if (value) {
        if (result) {
          result += " ";
        }
        result += value;
      }
    }
    index++;
  }
  
  return result;
}

export default clsx;