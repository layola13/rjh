function filter<T>(this: T[], callback: ((element: T, index: number, array: T[]) => boolean) | T[] | string): T[] {
    return this.pushStack(filterElements(this, callback || [], false));
}

function filterElements<T>(
    elements: T[],
    selector: ((element: T, index: number, array: T[]) => boolean) | T[] | string,
    not: boolean
): T[] {
    if (typeof selector === 'function') {
        return elements.filter((element, index, array) => {
            const matches = selector(element, index, array);
            return not ? !matches : matches;
        });
    }
    
    if (Array.isArray(selector)) {
        return elements.filter(element => {
            const isIncluded = selector.includes(element);
            return not ? !isIncluded : isIncluded;
        });
    }
    
    if (typeof selector === 'string') {
        return elements.filter(element => {
            const matches = matchesSelector(element, selector);
            return not ? !matches : matches;
        });
    }
    
    return elements;
}

function matchesSelector<T>(element: T, selector: string): boolean {
    if (element && typeof element === 'object' && 'matches' in element) {
        const domElement = element as unknown as Element;
        return domElement.matches(selector);
    }
    return false;
}

interface ArrayLike<T> {
    pushStack(elements: T[]): T[];
}

declare global {
    interface Array<T> extends ArrayLike<T> {
        pushStack(elements: T[]): T[];
    }
}