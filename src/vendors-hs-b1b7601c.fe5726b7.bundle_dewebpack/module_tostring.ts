function toString(this: { x: number; y: number; width: number; height: number }): string {
    return `${this.x} ${this.y} ${this.width} ${this.height}`;
}