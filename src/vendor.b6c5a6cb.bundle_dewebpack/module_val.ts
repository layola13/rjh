interface ValHook {
  get?(elem: HTMLElement, name: string): any;
  set?(elem: HTMLElement, value: any, name: string): any;
}

interface JQueryLike {
  isFunction(obj: any): boolean;
  map<T, U>(array: T[], callback: (item: T, index: number) => U): U[];
  valHooks: {
    [key: string]: ValHook;
  };
}

declare const b: JQueryLike;

const REPLACE_PATTERN = /\r/g;

function val(this: HTMLElement[], value?: any): string | undefined | HTMLElement[] {
  let hook: ValHook | undefined;
  let hookResult: any;
  let normalizedValue: any;
  const firstElement = this[0];

  if (arguments.length > 0) {
    const isValueFunction = b.isFunction(value);

    return this.each(function(this: HTMLElement, index: number): void {
      if (this.nodeType !== 1) {
        return;
      }

      let computedValue: any;
      if (isValueFunction) {
        computedValue = (value as Function).call(this, index, b(this).val());
      } else {
        computedValue = value;
      }

      if (computedValue == null) {
        normalizedValue = "";
      } else if (typeof computedValue === "number") {
        normalizedValue = String(computedValue);
      } else if (Array.isArray(computedValue)) {
        normalizedValue = b.map(computedValue, (item: any) => {
          return item == null ? "" : String(item);
        });
      } else {
        normalizedValue = computedValue;
      }

      hook = b.valHooks[this.type] || b.valHooks[this.nodeName.toLowerCase()];

      if (hook && "set" in hook && hook.set(this, normalizedValue, "value") !== undefined) {
        return;
      }

      (this as HTMLInputElement).value = normalizedValue;
    });
  }

  if (!firstElement) {
    return undefined;
  }

  hook = b.valHooks[firstElement.type] || b.valHooks[firstElement.nodeName.toLowerCase()];

  if (hook && "get" in hook) {
    hookResult = hook.get(firstElement, "value");
    if (hookResult !== undefined) {
      return hookResult;
    }
  }

  hookResult = (firstElement as HTMLInputElement).value;

  if (typeof hookResult === "string") {
    return hookResult.replace(REPLACE_PATTERN, "");
  }

  return hookResult == null ? "" : hookResult;
}

export { val };