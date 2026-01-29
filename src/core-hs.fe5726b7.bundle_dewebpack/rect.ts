export class Box {
  top: number;
  right: number;
  bottom: number;
  left: number;

  constructor(top: number, right: number, bottom: number, left: number) {
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
  }

  static boundingBox(...coordinates: Coordinate[]): Box {
    const box = new Box(
      coordinates[0].y,
      coordinates[0].x,
      coordinates[0].y,
      coordinates[0].x
    );
    for (let i = 1; i < coordinates.length; i++) {
      box.expandToIncludeCoordinate(coordinates[i]);
    }
    return box;
  }

  getWidth(): number {
    return this.right - this.left;
  }

  getHeight(): number {
    return this.bottom - this.top;
  }

  clone(): Box {
    return new Box(this.top, this.right, this.bottom, this.left);
  }

  contains(target: Box | Coordinate): boolean {
    return Box.contains(this, target);
  }

  expand(top: number, right: number, bottom: number, left: number): this;
  expand(box: Box): this;
  expand(
    topOrBox: number | Box,
    right?: number,
    bottom?: number,
    left?: number
  ): this {
    if (typeof topOrBox === 'number') {
      this.top -= topOrBox;
      this.right += Number(right);
      this.bottom += Number(bottom);
      this.left -= Number(left);
    } else {
      this.top -= topOrBox.top;
      this.right += topOrBox.right;
      this.bottom += topOrBox.bottom;
      this.left -= topOrBox.left;
    }
    return this;
  }

  expandToInclude(box: Box): void {
    this.left = Math.min(this.left, box.left);
    this.top = Math.min(this.top, box.top);
    this.right = Math.max(this.right, box.right);
    this.bottom = Math.max(this.bottom, box.bottom);
  }

  expandToIncludeCoordinate(coord: Coordinate): void {
    this.top = Math.min(this.top, coord.y);
    this.right = Math.max(this.right, coord.x);
    this.bottom = Math.max(this.bottom, coord.y);
    this.left = Math.min(this.left, coord.x);
  }

  static equals(box1: Box | null, box2: Box | null): boolean {
    if (box1 === box2) return true;
    if (!box1 || !box2) return false;
    return (
      box1.top === box2.top &&
      box1.right === box2.right &&
      box1.bottom === box2.bottom &&
      box1.left === box2.left
    );
  }

  static contains(box: Box | null, target: Box | Coordinate | null): boolean {
    if (!box || !target) return false;
    if (target instanceof Box) {
      return (
        target.left >= box.left &&
        target.right <= box.right &&
        target.top >= box.top &&
        target.bottom <= box.bottom
      );
    }
    return (
      target.x >= box.left &&
      target.x <= box.right &&
      target.y >= box.top &&
      target.y <= box.bottom
    );
  }

  static relativePositionX(box: Box, coord: Coordinate): number {
    if (coord.x < box.left) return coord.x - box.left;
    if (coord.x > box.right) return coord.x - box.right;
    return 0;
  }

  static relativePositionY(box: Box, coord: Coordinate): number {
    if (coord.y < box.top) return coord.y - box.top;
    if (coord.y > box.bottom) return coord.y - box.bottom;
    return 0;
  }

  static distance(box: Box, coord: Coordinate): number {
    const dx = Box.relativePositionX(box, coord);
    const dy = Box.relativePositionY(box, coord);
    return Math.sqrt(dx * dx + dy * dy);
  }

  static intersects(box1: Box, box2: Box): boolean {
    return (
      box1.left <= box2.right &&
      box2.left <= box1.right &&
      box1.top <= box2.bottom &&
      box2.top <= box1.bottom
    );
  }

  static intersectsWithPadding(box1: Box, box2: Box, padding: number): boolean {
    return (
      box1.left <= box2.right + padding &&
      box2.left <= box1.right + padding &&
      box1.top <= box2.bottom + padding &&
      box2.top <= box1.bottom + padding
    );
  }

  ceil(): this {
    this.top = Math.ceil(this.top);
    this.right = Math.ceil(this.right);
    this.bottom = Math.ceil(this.bottom);
    this.left = Math.ceil(this.left);
    return this;
  }

  floor(): this {
    this.top = Math.floor(this.top);
    this.right = Math.floor(this.right);
    this.bottom = Math.floor(this.bottom);
    this.left = Math.floor(this.left);
    return this;
  }

  round(): this {
    this.top = Math.round(this.top);
    this.right = Math.round(this.right);
    this.bottom = Math.round(this.bottom);
    this.left = Math.round(this.left);
    return this;
  }

  translate(x: number, y?: number): this;
  translate(coord: Coordinate): this;
  translate(xOrCoord: number | Coordinate, y?: number): this {
    if (xOrCoord instanceof Coordinate) {
      this.left += xOrCoord.x;
      this.right += xOrCoord.x;
      this.top += xOrCoord.y;
      this.bottom += xOrCoord.y;
    } else {
      this.left += xOrCoord;
      this.right += xOrCoord;
      if (typeof y === 'number') {
        this.top += y;
        this.bottom += y;
      }
    }
    return this;
  }

  scale(scaleX: number, scaleY?: number): this {
    const actualScaleY = typeof scaleY === 'number' ? scaleY : scaleX;
    this.left *= scaleX;
    this.right *= scaleX;
    this.top *= actualScaleY;
    this.bottom *= actualScaleY;
    return this;
  }
}

export class Rect {
  left: number;
  top: number;
  width: number;
  height: number;

  constructor(left: number, top: number, width: number, height: number) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }

  clone(): Rect {
    return new Rect(this.left, this.top, this.width, this.height);
  }

  toBox(): Box {
    const right = this.left + this.width;
    const bottom = this.top + this.height;
    return new Box(this.top, right, bottom, this.left);
  }

  static createFromPositionAndSize(position: Coordinate, size: Size): Rect {
    return new Rect(position.x, position.y, size.width, size.height);
  }

  static createFromBox(box: Box): Rect {
    return new Rect(box.left, box.top, box.right - box.left, box.bottom - box.top);
  }

  static equals(rect1: Rect | null, rect2: Rect | null): boolean {
    if (rect1 === rect2) return true;
    if (!rect1 || !rect2) return false;
    return (
      rect1.left === rect2.left &&
      rect1.width === rect2.width &&
      rect1.top === rect2.top &&
      rect1.height === rect2.height
    );
  }

  intersection(other: Rect): boolean {
    const left = Math.max(this.left, other.left);
    const right = Math.min(this.left + this.width, other.left + other.width);
    if (left <= right) {
      const top = Math.max(this.top, other.top);
      const bottom = Math.min(this.top + this.height, other.top + other.height);
      if (top <= bottom) {
        this.left = left;
        this.top = top;
        this.width = right - left;
        this.height = bottom - top;
        return true;
      }
    }
    return false;
  }

  static intersection(rect1: Rect, rect2: Rect): Rect | null {
    const left = Math.max(rect1.left, rect2.left);
    const right = Math.min(rect1.left + rect1.width, rect2.left + rect2.width);
    if (left <= right) {
      const top = Math.max(rect1.top, rect2.top);
      const bottom = Math.min(
        rect1.top + rect1.height,
        rect2.top + rect2.height
      );
      if (top <= bottom) {
        return new Rect(left, top, right - left, bottom - top);
      }
    }
    return null;
  }

  static intersects(rect1: Rect, rect2: Rect): boolean {
    return (
      rect1.left <= rect2.left + rect2.width &&
      rect2.left <= rect1.left + rect1.width &&
      rect1.top <= rect2.top + rect2.height &&
      rect2.top <= rect1.top + rect1.height
    );
  }

  intersects(other: Rect): boolean {
    return Rect.intersects(this, other);
  }

  static difference(rect1: Rect, rect2: Rect): Rect[] {
    const intersection = Rect.intersection(rect1, rect2);
    if (!intersection || !intersection.height || !intersection.width) {
      return [rect1.clone()];
    }

    const result: Rect[] = [];
    let currentTop = rect1.top;
    let currentHeight = rect1.height;
    const rect1Right = rect1.left + rect1.width;
    const rect1Bottom = rect1.top + rect1.height;
    const rect2Right = rect2.left + rect2.width;
    const rect2Bottom = rect2.top + rect2.height;

    if (rect2.top > rect1.top) {
      result.push(
        new Rect(rect1.left, rect1.top, rect1.width, rect2.top - rect1.top)
      );
      currentTop = rect2.top;
      currentHeight -= rect2.top - rect1.top;
    }

    if (rect2Bottom < rect1Bottom) {
      result.push(
        new Rect(rect1.left, rect2Bottom, rect1.width, rect1Bottom - rect2Bottom)
      );
      currentHeight = rect2Bottom - currentTop;
    }

    if (rect2.left > rect1.left) {
      result.push(
        new Rect(rect1.left, currentTop, rect2.left - rect1.left, currentHeight)
      );
    }

    if (rect2Right < rect1Right) {
      result.push(
        new Rect(rect2Right, currentTop, rect1Right - rect2Right, currentHeight)
      );
    }

    return result;
  }

  difference(other: Rect): Rect[] {
    return Rect.difference(this, other);
  }

  boundingRect(other: Rect): void {
    const maxRight = Math.max(this.left + this.width, other.left + other.width);
    const maxBottom = Math.max(this.top + this.height, other.top + other.height);
    this.left = Math.min(this.left, other.left);
    this.top = Math.min(this.top, other.top);
    this.width = maxRight - this.left;
    this.height = maxBottom - this.top;
  }

  static boundingRect(rect1: Rect | null, rect2: Rect | null): Rect | null {
    if (!rect1 || !rect2) return null;
    const result = new Rect(rect1.left, rect1.top, rect1.width, rect1.height);
    result.boundingRect(rect2);
    return result;
  }

  contains(target: Coordinate | Rect): boolean {
    if (target instanceof Coordinate) {
      return (
        target.x >= this.left &&
        target.x <= this.left + this.width &&
        target.y >= this.top &&
        target.y <= this.top + this.height
      );
    }
    return (
      this.left <= target.left &&
      this.left + this.width >= target.left + target.width &&
      this.top <= target.top &&
      this.top + this.height >= target.top + target.height
    );
  }

  squaredDistance(coord: Coordinate): number {
    const dx =
      coord.x < this.left
        ? this.left - coord.x
        : Math.max(coord.x - (this.left + this.width), 0);
    const dy =
      coord.y < this.top
        ? this.top - coord.y
        : Math.max(coord.y - (this.top + this.height), 0);
    return dx * dx + dy * dy;
  }

  distance(coord: Coordinate): number {
    return Math.sqrt(this.squaredDistance(coord));
  }

  getSize(): Size {
    return new Size(this.width, this.height);
  }

  getTopLeft(): Coordinate {
    return new Coordinate(this.left, this.top);
  }

  getCenter(): Coordinate {
    return new Coordinate(
      this.left + this.width / 2,
      this.top + this.height / 2
    );
  }

  getBottomRight(): Coordinate {
    return new Coordinate(this.left + this.width, this.top + this.height);
  }

  ceil(): this {
    this.left = Math.ceil(this.left);
    this.top = Math.ceil(this.top);
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this;
  }

  floor(): this {
    this.left = Math.floor(this.left);
    this.top = Math.floor(this.top);
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this;
  }

  round(): this {
    this.left = Math.round(this.left);
    this.top = Math.round(this.top);
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this;
  }

  translate(x: number, y?: number): this;
  translate(coord: Coordinate): this;
  translate(xOrCoord: number | Coordinate, y?: number): this {
    if (xOrCoord instanceof Coordinate) {
      this.left += xOrCoord.x;
      this.top += xOrCoord.y;
    } else {
      this.left += xOrCoord;
      if (typeof y === 'number') {
        this.top += y;
      }
    }
    return this;
  }

  scale(scaleX: number, scaleY?: number): this {
    const actualScaleY = typeof scaleY === 'number' ? scaleY : scaleX;
    this.left *= scaleX;
    this.width *= scaleX;
    this.top *= actualScaleY;
    this.height *= actualScaleY;
    return this;
  }
}

export class Size {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  static equals(size1: Size | null, size2: Size | null): boolean {
    if (size1 === size2) return true;
    if (!size1 || !size2) return false;
    return size1.width === size2.width && size1.height === size2.height;
  }

  clone(): Size {
    return new Size(this.width, this.height);
  }

  getLongest(): number {
    return Math.max(this.width, this.height);
  }

  getShortest(): number {
    return Math.min(this.width, this.height);
  }

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }

  aspectRatio(): number {
    return this.width / this.height;
  }

  isEmpty(): boolean {
    return !this.area();
  }

  ceil(): this {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this;
  }

  fitsInside(other: Size): boolean {
    return this.width <= other.width && this.height <= other.height;
  }

  floor(): this {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this;
  }

  round(): this {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this;
  }

  scale(scaleX: number, scaleY?: number): this {
    const actualScaleY = typeof scaleY === 'number' ? scaleY : scaleX;
    this.width *= scaleX;
    this.height *= actualScaleY;
    return this;
  }

  scaleToCover(target: Size): this {
    const scale =
      this.aspectRatio() <= target.aspectRatio()
        ? target.width / this.width
        : target.height / this.height;
    return this.scale(scale);
  }

  scaleToFit(target: Size): this {
    const scale =
      this.aspectRatio() > target.aspectRatio()
        ? target.width / this.width
        : target.height / this.height;
    return this.scale(scale);
  }
}

export class Coordinate {
  x: number;
  y: number;

  constructor(x?: number, y?: number) {
    this.x = x !== undefined ? x : 0;
    this.y = y !== undefined ? y : 0;
  }

  clone(): Coordinate {
    return new Coordinate(this.x, this.y);
  }

  equals(other: Coordinate): boolean {
    return other instanceof Coordinate && Coordinate.equals(this, other);
  }

  static equals(coord1: Coordinate | null, coord2: Coordinate | null): boolean {
    if (coord1 === coord2) return true;
    if (!coord1 || !coord2) return false;
    return coord1.x === coord2.x && coord1.y === coord2.y;
  }

  static distance(coord1: Coordinate, coord2: Coordinate): number {
    const dx = coord1.x - coord2.x;
    const dy = coord1.y - coord2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static magnitude(coord: Coordinate): number {
    return Math.sqrt(coord.x * coord.x + coord.y * coord.y);
  }

  static squaredDistance(coord1: Coordinate, coord2: Coordinate): number {
    const dx = coord1.x - coord2.x;
    const dy = coord1.y - coord2.y;
    return dx * dx + dy * dy;
  }

  static difference(coord1: Coordinate, coord2: Coordinate): Coordinate {
    return new Coordinate(coord1.x - coord2.x, coord1.y - coord2.y);
  }

  static sum(coord1: Coordinate, coord2: Coordinate): Coordinate {
    return new Coordinate(coord1.x + coord2.x, coord1.y + coord2.y);
  }

  ceil(): this {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  }

  floor(): this {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }

  round(): this {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }

  translate(x: number, y?: number): this;
  translate(coord: Coordinate): this;
  translate(xOrCoord: number | Coordinate, y?: number): this {
    if (xOrCoord instanceof Coordinate) {
      this.x += xOrCoord.x;
      this.y += xOrCoord.y;
    } else {
      this.x += Number(xOrCoord);
      if (typeof y === 'number') {
        this.y += y;
      }
    }
    return this;
  }

  scale(scaleX: number, scaleY?: number): this {
    const actualScaleY = typeof scaleY === 'number' ? scaleY : scaleX;
    this.x *= scaleX;
    this.y *= actualScaleY;
    return this;
  }

  rotateRadians(angle: number, origin?: Coordinate): void {
    const pivot = origin ?? new Coordinate(0, 0);
    const originalX = this.x;
    const originalY = this.y;
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    this.x = (originalX - pivot.x) * cosAngle - (originalY - pivot.y) * sinAngle + pivot.x;
    this.y = (originalX - pivot.x) * sinAngle + (originalY - pivot.y) * cosAngle + pivot.y;
  }

  rotateDegrees(angle: number, origin?: Coordinate): void {
    const radians = (angle * Math.PI) / 180;
    this.rotateRadians(radians, origin);
  }
}