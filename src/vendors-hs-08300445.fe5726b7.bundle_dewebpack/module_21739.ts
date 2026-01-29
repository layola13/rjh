type ObserverCallback = (target: Element) => void;

const elementObservers = new Map<Element, Set<ObserverCallback>>();

const intersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
        const target = entry.target;
        const callbacks = elementObservers.get(target);
        
        callbacks?.forEach((callback: ObserverCallback) => {
            callback(target);
        });
    });
});

export function observe(element: Element, callback: ObserverCallback): void {
    if (!elementObservers.has(element)) {
        elementObservers.set(element, new Set<ObserverCallback>());
        intersectionObserver.observe(element);
    }
    
    elementObservers.get(element)?.add(callback);
}

export function unobserve(element: Element, callback: ObserverCallback): void {
    if (!elementObservers.has(element)) {
        return;
    }
    
    const callbacks = elementObservers.get(element);
    callbacks?.delete(callback);
    
    if (callbacks?.size === 0) {
        intersectionObserver.unobserve(element);
        elementObservers.delete(element);
    }
}

export const _el = null;
export const _rs = null;