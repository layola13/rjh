function hasData<T extends Record<string, unknown>>(target: T): boolean {
    const data = (target as Record<string, unknown>)[this.expando];
    return data !== undefined && !isEmptyObject(data);
}

function isEmptyObject(obj: unknown): boolean {
    if (obj === null || obj === undefined) {
        return true;
    }
    
    if (typeof obj !== 'object') {
        return true;
    }
    
    for (const key in obj as object) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    
    return true;
}