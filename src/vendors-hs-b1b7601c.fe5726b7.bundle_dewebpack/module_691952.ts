export default function generateId(length?: number, base?: number): string {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  const result: string[] = [];
  const radix = base ?? characters.length;

  if (length) {
    for (let i = 0; i < length; i++) {
      result[i] = characters[Math.floor(Math.random() * radix)];
    }
  } else {
    // Generate UUID v4 format
    result[8] = result[13] = result[18] = result[23] = "-";
    result[14] = "4";

    for (let i = 0; i < 36; i++) {
      if (!result[i]) {
        const randomValue = Math.floor(Math.random() * 16);
        result[i] = characters[i === 19 ? (randomValue & 0x3) | 0x8 : randomValue];
      }
    }
  }

  return result.join("");
}