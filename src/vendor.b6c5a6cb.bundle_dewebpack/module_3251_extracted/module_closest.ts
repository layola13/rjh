interface Element {
  nodeType: number;
  parentNode: Element | null;
}

interface Collection<T> {
  length: number;
  [index: number]: T;
}

interface jQuery {
  find: {
    matchesSelector(element: Element, selector: string): boolean;
  };
  uniqueSort<T>(elements: T[]): T[];
}

interface JQueryCollection extends Collection<Element> {
  index(element: Element): number;
}

function closest(
  this: Collection<Element>,
  selector: string | JQueryCollection,
  context?: Element,
  jquery?: jQuery
): Element[] {
  let currentElement: Element | null;
  let index = 0;
  const collectionLength = this.length;
  const matchedElements: Element[] = [];
  const isJQueryObject = typeof selector !== "string" && selector as JQueryCollection;
  const COMPLEX_SELECTOR_REGEX = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;

  if (!COMPLEX_SELECTOR_REGEX.test(selector as string)) {
    for (; index < collectionLength; index++) {
      for (
        currentElement = this[index];
        currentElement && currentElement !== context;
        currentElement = currentElement.parentNode
      ) {
        const isElementNode = currentElement.nodeType < 11;
        const matchesSelector = isJQueryObject
          ? isJQueryObject.index(currentElement) > -1
          : currentElement.nodeType === 1 &&
            jquery!.find.matchesSelector(currentElement, selector as string);

        if (isElementNode && matchesSelector) {
          matchedElements.push(currentElement);
          break;
        }
      }
    }
  }

  return matchedElements.length > 1
    ? jquery!.uniqueSort(matchedElements)
    : matchedElements;
}