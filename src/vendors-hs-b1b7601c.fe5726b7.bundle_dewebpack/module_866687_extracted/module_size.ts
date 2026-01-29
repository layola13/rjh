function resize(width: number, height: number): this {
    const dimensions = calculateDimensions(this, width, height);
    return this.rx(dimensions.width / 2).ry(dimensions.height / 2);
}