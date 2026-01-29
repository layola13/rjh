import { isNumber } from './utils';

/**
 * Represents a 2D affine transformation matrix.
 * The transformation is defined by a 3x3 matrix:
 * [ m00  m01  m02 ]
 * [ m10  m11  m12 ]
 * [  0    0    1  ]
 */
export class AffineTransform {
  private m00_: number = 1;
  private m11_: number = 1;
  private m10_: number = 0;
  private m01_: number = 0;
  private m02_: number = 0;
  private m12_: number = 0;

  constructor();
  constructor(m00: number, m10: number, m01: number, m11: number, m02: number, m12: number);
  constructor(m00?: number, m10?: number, m01?: number, m11?: number, m02?: number, m12?: number) {
    if (arguments.length === 6) {
      this.setTransform(m00 ?? 0, m10 ?? 0, m01 ?? 0, m11 ?? 0, m02 ?? 0, m12 ?? 0);
    } else if (arguments.length !== 0) {
      throw new Error('Insufficient matrix parameters');
    }
  }

  /**
   * Checks if this transform is the identity transform.
   */
  isIdentity(): boolean {
    return this.m00_ === 1 && this.m10_ === 0 && this.m01_ === 0 && 
           this.m11_ === 1 && this.m02_ === 0 && this.m12_ === 0;
  }

  /**
   * Creates a copy of this transform.
   */
  clone(): AffineTransform {
    return new AffineTransform(this.m00_, this.m10_, this.m01_, this.m11_, this.m02_, this.m12_);
  }

  /**
   * Sets the matrix values of this transform.
   */
  setTransform(m00: number, m10: number, m01: number, m11: number, m02: number, m12: number): this {
    if (!(isNumber(m00) && isNumber(m10) && isNumber(m01) && 
          isNumber(m11) && isNumber(m02) && isNumber(m12))) {
      throw new Error('Invalid transform parameters');
    }
    this.m00_ = m00;
    this.m10_ = m10;
    this.m01_ = m01;
    this.m11_ = m11;
    this.m02_ = m02;
    this.m12_ = m12;
    return this;
  }

  /**
   * Copies matrix values from another transform.
   */
  copyFrom(transform: AffineTransform): this {
    this.m00_ = transform.m00_;
    this.m10_ = transform.m10_;
    this.m01_ = transform.m01_;
    this.m11_ = transform.m11_;
    this.m02_ = transform.m02_;
    this.m12_ = transform.m12_;
    return this;
  }

  /**
   * Applies a post-scale transformation.
   */
  scale(scaleX: number, scaleY: number): this {
    this.m00_ *= scaleX;
    this.m10_ *= scaleX;
    this.m01_ *= scaleY;
    this.m11_ *= scaleY;
    return this;
  }

  /**
   * Applies a pre-scale transformation.
   */
  preScale(scaleX: number, scaleY: number): this {
    this.m00_ *= scaleX;
    this.m01_ *= scaleX;
    this.m02_ *= scaleX;
    this.m10_ *= scaleY;
    this.m11_ *= scaleY;
    this.m12_ *= scaleY;
    return this;
  }

  /**
   * Applies a post-translation.
   */
  translate(translateX: number, translateY: number): this {
    this.m02_ += translateX * this.m00_ + translateY * this.m01_;
    this.m12_ += translateX * this.m10_ + translateY * this.m11_;
    return this;
  }

  /**
   * Applies a pre-translation.
   */
  preTranslate(translateX: number, translateY: number): this {
    this.m02_ += translateX;
    this.m12_ += translateY;
    return this;
  }

  /**
   * Applies a post-rotation.
   */
  rotate(angle: number, centerX: number, centerY: number): this {
    return this.concatenate(AffineTransform.getRotateInstance(angle, centerX, centerY));
  }

  /**
   * Applies a pre-rotation.
   */
  preRotate(angle: number, centerX: number, centerY: number): this {
    return this.preConcatenate(AffineTransform.getRotateInstance(angle, centerX, centerY));
  }

  /**
   * Applies a post-shear transformation.
   */
  shear(shearX: number, shearY: number): this {
    const temp00 = this.m00_;
    const temp10 = this.m10_;
    this.m00_ += shearY * this.m01_;
    this.m10_ += shearY * this.m11_;
    this.m01_ += shearX * temp00;
    this.m11_ += shearX * temp10;
    return this;
  }

  /**
   * Applies a pre-shear transformation.
   */
  preShear(shearX: number, shearY: number): this {
    const temp00 = this.m00_;
    const temp01 = this.m01_;
    const temp02 = this.m02_;
    this.m00_ += shearX * this.m10_;
    this.m01_ += shearX * this.m11_;
    this.m02_ += shearX * this.m12_;
    this.m10_ += shearY * temp00;
    this.m11_ += shearY * temp01;
    this.m12_ += shearY * temp02;
    return this;
  }

  /**
   * Returns a CSS matrix string representation.
   */
  toString(): string {
    return `matrix(${[this.m00_, this.m10_, this.m01_, this.m11_, this.m02_, this.m12_].join(', ')})`;
  }

  getScaleX(): number {
    return this.m00_;
  }

  getScaleY(): number {
    return this.m11_;
  }

  getTranslateX(): number {
    return this.m02_;
  }

  getTranslateY(): number {
    return this.m12_;
  }

  getShearX(): number {
    return this.m01_;
  }

  getShearY(): number {
    return this.m10_;
  }

  /**
   * Post-concatenates this transform with another transform.
   */
  concatenate(transform: AffineTransform): this {
    let temp = this.m00_;
    let temp2 = this.m01_;
    this.m00_ = transform.m00_ * temp + transform.m10_ * temp2;
    this.m01_ = transform.m01_ * temp + transform.m11_ * temp2;
    this.m02_ += transform.m02_ * temp + transform.m12_ * temp2;

    temp = this.m10_;
    temp2 = this.m11_;
    this.m10_ = transform.m00_ * temp + transform.m10_ * temp2;
    this.m11_ = transform.m01_ * temp + transform.m11_ * temp2;
    this.m12_ += transform.m02_ * temp + transform.m12_ * temp2;
    return this;
  }

  /**
   * Pre-concatenates this transform with another transform.
   */
  preConcatenate(transform: AffineTransform): this {
    let temp = this.m00_;
    let temp2 = this.m10_;
    this.m00_ = transform.m00_ * temp + transform.m01_ * temp2;
    this.m10_ = transform.m10_ * temp + transform.m11_ * temp2;

    temp = this.m01_;
    temp2 = this.m11_;
    this.m01_ = transform.m00_ * temp + transform.m01_ * temp2;
    this.m11_ = transform.m10_ * temp + transform.m11_ * temp2;

    temp = this.m02_;
    temp2 = this.m12_;
    this.m02_ = transform.m00_ * temp + transform.m01_ * temp2 + transform.m02_;
    this.m12_ = transform.m10_ * temp + transform.m11_ * temp2 + transform.m12_;
    return this;
  }

  /**
   * Transforms an array of coordinates.
   */
  transform(source: number[], sourceOffset: number, dest: number[], destOffset: number, numPoints: number): void {
    let srcIndex = sourceOffset;
    let destIndex = destOffset;
    const endIndex = sourceOffset + 2 * numPoints;

    while (srcIndex < endIndex) {
      const x = source[srcIndex++];
      const y = source[srcIndex++];
      dest[destIndex++] = x * this.m00_ + y * this.m01_ + this.m02_;
      dest[destIndex++] = x * this.m10_ + y * this.m11_ + this.m12_;
    }
  }

  /**
   * Calculates the determinant of this transform.
   */
  getDeterminant(): number {
    return this.m00_ * this.m11_ - this.m01_ * this.m10_;
  }

  /**
   * Checks if this transform is invertible.
   */
  isInvertible(): boolean {
    const determinant = this.getDeterminant();
    return isFinite(determinant) && isFinite(this.m02_) && isFinite(this.m12_) && determinant !== 0;
  }

  /**
   * Creates an inverse transform.
   */
  createInverse(): AffineTransform {
    const determinant = this.getDeterminant();
    return new AffineTransform(
      this.m11_ / determinant,
      -this.m10_ / determinant,
      -this.m01_ / determinant,
      this.m00_ / determinant,
      (this.m01_ * this.m12_ - this.m11_ * this.m02_) / determinant,
      (this.m10_ * this.m02_ - this.m00_ * this.m12_) / determinant
    );
  }

  /**
   * Creates a scale transform instance.
   */
  static getScaleInstance(scaleX: number, scaleY: number): AffineTransform {
    return new AffineTransform().setToScale(scaleX, scaleY);
  }

  /**
   * Creates a translation transform instance.
   */
  static getTranslateInstance(translateX: number, translateY: number): AffineTransform {
    return new AffineTransform().setToTranslation(translateX, translateY);
  }

  /**
   * Creates a shear transform instance.
   */
  static getShearInstance(shearX: number, shearY: number): AffineTransform {
    return new AffineTransform().setToShear(shearX, shearY);
  }

  /**
   * Creates a rotation transform instance.
   */
  static getRotateInstance(angle: number, centerX: number, centerY: number): AffineTransform {
    return new AffineTransform().setToRotation(angle, centerX, centerY);
  }

  /**
   * Sets this transform to a scale transform.
   */
  setToScale(scaleX: number, scaleY: number): this {
    return this.setTransform(scaleX, 0, 0, scaleY, 0, 0);
  }

  /**
   * Sets this transform to a translation transform.
   */
  setToTranslation(translateX: number, translateY: number): this {
    return this.setTransform(1, 0, 0, 1, translateX, translateY);
  }

  /**
   * Sets this transform to a shear transform.
   */
  setToShear(shearX: number, shearY: number): this {
    return this.setTransform(1, shearY, shearX, 1, 0, 0);
  }

  /**
   * Sets this transform to a rotation transform.
   */
  setToRotation(angle: number, centerX: number, centerY: number): this {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return this.setTransform(
      cos,
      sin,
      -sin,
      cos,
      centerX - centerX * cos + centerY * sin,
      centerY - centerX * sin - centerY * cos
    );
  }

  /**
   * Checks equality with another transform.
   */
  equals(transform: AffineTransform | null | undefined): boolean {
    return this === transform || 
           (!!transform && 
            this.m00_ === transform.m00_ && 
            this.m01_ === transform.m01_ && 
            this.m02_ === transform.m02_ && 
            this.m10_ === transform.m10_ && 
            this.m11_ === transform.m11_ && 
            this.m12_ === transform.m12_);
  }
}