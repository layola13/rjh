import { Vector2, TObject, TransferDLayout, TransferDType, ObjectManager } from './core';

interface Texture2D {
  mIsNormalMap: boolean;
  mIsLinearSpace: boolean;
  mIsSRGB: boolean;
  mIsRGBM: boolean;
  mAutoGenerateMipmaps: boolean;
  mIntensityScale: number;
  mSourcePath: string;
  mTextureData: any;
  mSamplerAddressX: number;
  mSamplerAddressY: number;
  mSamplerFilter: number;
  mSamplerCompareFunc: number;
  getTextureResource(): any;
}

interface UVTransform {
  offset: Vector2;
  repeat: Vector2;
  rotation: number;
  center: Vector2;
}

interface Material {
  setUVTransform?(transform: UVTransform): void;
}

interface TransferOptions {
  layout: TransferDLayout;
  dataType: TransferDType;
  typeString?: string;
}

interface TransferContext {
  TransferInternal<T>(options: TransferOptions, value: T, name: string): T;
}

/**
 * Texture2DInstance manages a 2D texture with UV transformation properties.
 * Wraps a Texture2D resource and provides offset, repeat, rotation, and center controls.
 */
export class Texture2DInstance extends TObject {
  private mTexture: Texture2D;
  private mOffset: Vector2;
  private mRepeat: Vector2;
  private mRotation: number;
  private mCenter: Vector2;

  constructor(texture: Texture2D) {
    super();
    this.mTexture = texture;
    this.mOffset = Vector2.Zero();
    this.mRepeat = Vector2.One();
    this.mRotation = 0;
    this.mCenter = Vector2.Zero();
  }

  get mIsNormalMap(): boolean {
    return this.mTexture.mIsNormalMap;
  }

  set mIsNormalMap(value: boolean) {
    this.mTexture.mIsNormalMap = value;
  }

  get mIsLinearSpace(): boolean {
    return this.mTexture.mIsLinearSpace;
  }

  set mIsLinearSpace(value: boolean) {
    this.mTexture.mIsLinearSpace = value;
  }

  get mIsSRGB(): boolean {
    return this.mTexture.mIsSRGB;
  }

  set mIsSRGB(value: boolean) {
    this.mTexture.mIsSRGB = value;
  }

  get mIsRGBM(): boolean {
    return this.mTexture.mIsRGBM;
  }

  set mIsRGBM(value: boolean) {
    this.mTexture.mIsRGBM = value;
  }

  get mAutoGenerateMipmaps(): boolean {
    return this.mTexture.mAutoGenerateMipmaps;
  }

  set mAutoGenerateMipmaps(value: boolean) {
    this.mTexture.mAutoGenerateMipmaps = value;
  }

  get mIntensityScale(): number {
    return this.mTexture.mIntensityScale;
  }

  set mIntensityScale(value: number) {
    this.mTexture.mIntensityScale = value;
  }

  get mSourcePath(): string {
    return this.mTexture.mSourcePath;
  }

  set mSourcePath(value: string) {
    this.mTexture.mSourcePath = value;
  }

  get mTextureData(): any {
    return this.mTexture.mTextureData;
  }

  set mTextureData(value: any) {
    this.mTexture.mTextureData = value;
  }

  get mSamplerAddressX(): number {
    return this.mTexture.mSamplerAddressX;
  }

  set mSamplerAddressX(value: number) {
    this.mTexture.mSamplerAddressX = value;
  }

  get mSamplerAddressY(): number {
    return this.mTexture.mSamplerAddressY;
  }

  set mSamplerAddressY(value: number) {
    this.mTexture.mSamplerAddressY = value;
  }

  get mSamplerFilter(): number {
    return this.mTexture.mSamplerFilter;
  }

  set mSamplerFilter(value: number) {
    this.mTexture.mSamplerFilter = value;
  }

  get mSamplerCompareFunc(): number {
    return this.mTexture.mSamplerCompareFunc;
  }

  set mSamplerCompareFunc(value: number) {
    this.mTexture.mSamplerCompareFunc = value;
  }

  getTextureResource(): any {
    return this.mTexture.getTextureResource();
  }

  setTextureData(data: any): void {
    this.mTextureData = data;
  }

  getTexture(): Texture2D {
    return this.mTexture;
  }

  setTexture(texture: Texture2D): void {
    this.mTexture = texture;
  }

  getOffset(): Vector2 {
    return this.mOffset;
  }

  setOffset(offset: Vector2): void {
    this.mOffset.copyFrom(offset);
  }

  getRepeat(): Vector2 {
    return this.mRepeat;
  }

  setRepeat(repeat: Vector2): void {
    this.mRepeat.copyFrom(repeat);
  }

  getCenter(): Vector2 {
    return this.mCenter;
  }

  setCenter(center: Vector2): void {
    this.mCenter.copyFrom(center);
  }

  getRotation(): number {
    return this.mRotation;
  }

  setRotation(rotation: number): void {
    this.mRotation = rotation;
  }

  setTransformToMaterial(material: Material): void {
    material.setUVTransform?.({
      offset: this.getOffset(),
      repeat: this.getRepeat(),
      rotation: this.getRotation(),
      center: this.getCenter()
    });
  }

  Transfer(context: TransferContext): void {
    super.Transfer?.(context);
    this.TransferInternal(context);
  }

  TransferInternal(context: TransferContext): void {
    this.mTexture = context.TransferInternal(
      {
        layout: TransferDLayout.Default,
        dataType: TransferDType.RefPtr,
        typeString: 'Texture2D'
      },
      this.mTexture,
      'Texture'
    );

    this.mOffset = context.TransferInternal(
      {
        layout: TransferDLayout.Default,
        dataType: TransferDType.Struct,
        typeString: 'Vector2'
      },
      this.mOffset,
      'Offset'
    );

    this.mRepeat = context.TransferInternal(
      {
        layout: TransferDLayout.Default,
        dataType: TransferDType.Struct,
        typeString: 'Vector2'
      },
      this.mRepeat,
      'Repeat'
    );

    this.mCenter = context.TransferInternal(
      {
        layout: TransferDLayout.Default,
        dataType: TransferDType.Struct,
        typeString: 'Vector2'
      },
      this.mCenter,
      'Center'
    );

    this.mRotation = context.TransferInternal(
      {
        layout: TransferDLayout.Default,
        dataType: TransferDType.Float32
      },
      this.mRotation,
      'Rotation'
    );
  }
}

ObjectManager.RegisterClass(Texture2DInstance, 'Texture2DInstance', false);