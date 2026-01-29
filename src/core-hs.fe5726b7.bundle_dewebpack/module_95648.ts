export function trunc(value: number): number {
  const numericValue = +value;
  return (numericValue > 0 ? Math.floor : Math.ceil)(numericValue);
}

export default typeof Math.trunc !== 'undefined' ? Math.trunc : trunc;