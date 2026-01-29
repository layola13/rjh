export function kebabCase(str: string): string {
  return str.replace(/[A-Z]/g, (match: string): string => {
    return "-" + match.toLowerCase();
  }).toLowerCase();
}