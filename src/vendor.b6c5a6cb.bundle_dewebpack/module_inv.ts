function getInvariantBits(value: number): number {
    return (value & 8) !== 0 ? value & 15 : (-value) & 7;
}