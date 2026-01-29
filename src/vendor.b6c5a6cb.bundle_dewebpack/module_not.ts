function not<T extends Element>(this: ArrayLike<T>, selector?: string | Element | ArrayLike<Element>): ArrayLike<T> {
    return this.pushStack(filter(this, selector || [], true));
}

function filter<T extends Element>(
    elements: ArrayLike<T>, 
    selector: string | Element | ArrayLike<Element>, 
    not: boolean
): T[] {
    const results: T[] = [];
    const length = elements.length;
    
    for (let i = 0; i < length; i++) {
        const element = elements[i];
        const matches = matchesSelector(element, selector);
        
        if (matches !== not) {
            results.push(element);
        }
    }
    
    return results;
}

function matchesSelector<T extends Element>(
    element: T, 
    selector: string | Element | ArrayLike<Element>
): boolean {
    if (typeof selector === 'string') {
        return element.matches?.(selector) ?? false;
    }
    
    if (selector instanceof Element) {
        return element === selector;
    }
    
    if (selector && 'length' in selector) {
        for (let i = 0; i < selector.length; i++) {
            if (element === selector[i]) {
                return true;
            }
        }
    }
    
    return false;
}

interface ArrayLike<T> {
    length: number;
    [index: number]: T;
    pushStack(elements: T[]): ArrayLike<T>;
}