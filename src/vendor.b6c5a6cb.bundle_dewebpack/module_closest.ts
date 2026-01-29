interface Element {
  nodeType: number;
  parentNode: Element | null;
}

interface JQueryLike {
  length: number;
  [index: number]: Element;
  pushStack(elements: Element[]): JQueryLike;
}

interface JQueryStatic {
  find: {
    matchesSelector(element: Element, selector: string): boolean;
  };
  uniqueSort(elements: Element[]): Element[];
}

const COMPLEX_SELECTOR_REGEX = /complex-pattern/; // Replace with actual pattern from 'k'

function closest(
  this: JQueryLike,
  selector: string | JQueryLike,
  context?: Element,
  jQueryStatic?: JQueryStatic
): JQueryLike {
  let currentElement: Element | null;
  let index = 0;
  const totalElements = this.length;
  const matchedElements: Element[] = [];
  const isSelectorObject = typeof selector !== "string" && selector as JQueryLike;

  if (!COMPLEX_SELECTOR_REGEX.test(selector as string)) {
    for (; index < totalElements; index++) {
      for (
        currentElement = this[index];
        currentElement && currentElement !== context;
        currentElement = currentElement.parentNode
      ) {
        if (
          currentElement.nodeType < 11 &&
          (isSelectorObject
            ? (isSelectorObject as any).index(currentElement) > -1
            : currentElement.nodeType === 1 &&
              jQueryStatic?.find.matchesSelector(currentElement, selector as string))
        ) {
          matchedElements.push(currentElement);
          break;
        }
      }
    }
  }

  return this.pushStack(
    matchedElements.length > 1
      ? jQueryStatic?.uniqueSort(matchedElements) ?? matchedElements
      : matchedElements
  );
}

export { closest };