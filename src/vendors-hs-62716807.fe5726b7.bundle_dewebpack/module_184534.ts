export default function trunc(value: number): number {
  const numericValue = +value;
  return (numericValue > 0 ? Math.floor : Math.ceil)(numericValue);
}