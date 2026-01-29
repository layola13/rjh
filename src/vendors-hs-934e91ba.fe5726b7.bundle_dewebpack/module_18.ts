function convertValue(value: number): number {
    return Number(0 === value ? 0 : 1 === value ? 1 : 2);
}

export { convertValue };