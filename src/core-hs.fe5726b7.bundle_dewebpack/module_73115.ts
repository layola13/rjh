export default function objectIs<T>(value1: T, value2: T): boolean {
  return value1 === value2 
    ? value1 !== 0 || 1 / (value1 as number) === 1 / (value2 as number)
    : value1 !== value1 && value2 !== value2;
}