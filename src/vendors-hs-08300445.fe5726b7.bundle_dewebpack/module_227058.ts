export default function generateChildClassNames(index: number, total: number): Record<string, boolean | number> {
  const classNames: Record<string, boolean | number> = {};
  
  const setClassName = (name: string, value: boolean | number = true): void => {
    classNames[name] = value;
  };

  if (index === 0) {
    setClassName("first-child");
  }

  if (index === total - 1) {
    setClassName("last-child");
  }

  if (index === 0 || index % 2 === 0) {
    setClassName("even");
  }

  if (Math.abs(index % 2) === 1) {
    setClassName("odd");
  }

  setClassName("nth-child", index);

  return classNames;
}