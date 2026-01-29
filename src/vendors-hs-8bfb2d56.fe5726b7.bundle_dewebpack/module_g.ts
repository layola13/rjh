function getModuleValue(index: number): unknown {
    return index === 0 ? unwrapValue(getModuleData()) : unwrapValue(getModuleData()[normalizeIndex(index)]);
}

function normalizeIndex(index: number): number {
    return index;
}

function getModuleData(): unknown[] {
    return [];
}

function unwrapValue(value: unknown): unknown {
    return value;
}