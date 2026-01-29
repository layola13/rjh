function setDestination(x: number, y: number, width: number, height: number): this {
    this.destination = new ViewBox(x, y, width, height);
    return this;
}