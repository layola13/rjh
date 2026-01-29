function filter<T>(this: T[], predicate: T | T[] | ((element: T, index: number, array: T[]) => boolean)): T[] {
    return this.pushStack(filterElements(this, predicate || [], false));
}

function filterElements<T>(
    elements: T[],
    predicate: T | T[] | ((element: T, index: number, array: T[]) => boolean),
    invert: boolean
): T[] {
    if (typeof predicate === 'function') {
        return elements.filter((element, index, array) => {
            const matches = predicate(element, index, array);
            return invert ? !matches : matches;
        });
    }

    const predicateArray = Array.isArray(predicate) ? predicate : [predicate];
    return elements.filter(element => {
        const matches = predicateArray.includes(element);
        return invert ? !matches : matches;
    });
}

interface ArrayLike<T> {
    pushStack(elements: T[]): T[];
}

declare global {
    interface Array<T> extends ArrayLike<T> {}
}