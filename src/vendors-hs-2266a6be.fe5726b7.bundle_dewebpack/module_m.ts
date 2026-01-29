function extractCurrentPosition(input: unknown): [unknown] {
    const extracted = r(input);
    this.currentPos = extracted[0];
    return [extracted[0]];
}