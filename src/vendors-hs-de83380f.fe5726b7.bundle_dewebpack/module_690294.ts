function setPrototypeOf(target: any, prototype: any): void {
  Object.setPrototypeOf(target, prototype);
}

export default function inherits<T extends new (...args: any[]) => any>(
  subClass: T,
  superClass: T | null
): void {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  });

  Object.defineProperty(subClass, "prototype", {
    writable: false,
  });

  if (superClass) {
    setPrototypeOf(subClass, superClass);
  }
}