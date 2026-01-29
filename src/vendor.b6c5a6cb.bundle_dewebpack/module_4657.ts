import { Texture } from './Texture';
import { Sprite } from './Sprite';
import { Ticker, UPDATE_PRIORITY } from './Ticker';

export interface FrameObject {
  texture: Texture;
  time: number;
}

export type AnimatedSpriteTextures = Texture[] | FrameObject[];

export class AnimatedSprite extends Sprite {
  private _textures: Texture[] | null;
  private _durations: number[] | null;
  private _autoUpdate: boolean;
  private _isConnectedToTicker: boolean;
  private _currentTime: number;
  private _playing: boolean;
  private _previousFrame: number | null;

  public animationSpeed: number;
  public loop: boolean;
  public updateAnchor: boolean;
  public onComplete: (() => void) | null;
  public onFrameChange: ((currentFrame: number) => void) | null;
  public onLoop: (() => void) | null;

  constructor(textures: AnimatedSpriteTextures, autoUpdate: boolean = true) {
    const firstTexture = textures[0] instanceof Texture 
      ? textures[0] 
      : (textures[0] as FrameObject).texture;
    
    super(firstTexture);

    this._textures = null;
    this._durations = null;
    this._autoUpdate = autoUpdate;
    this._isConnectedToTicker = false;
    this.animationSpeed = 1;
    this.loop = true;
    this.updateAnchor = false;
    this.onComplete = null;
    this.onFrameChange = null;
    this.onLoop = null;
    this._currentTime = 0;
    this._playing = false;
    this._previousFrame = null;
    this.textures = textures;
  }

  public stop(): void {
    if (this.playing) {
      this._playing = false;
      if (this._autoUpdate && this._isConnectedToTicker) {
        Ticker.shared.remove(this.update, this);
        this._isConnectedToTicker = false;
      }
    }
  }

  public play(): void {
    if (!this.playing) {
      this._playing = true;
      if (this._autoUpdate && !this._isConnectedToTicker) {
        Ticker.shared.add(this.update, this, UPDATE_PRIORITY.HIGH);
        this._isConnectedToTicker = true;
      }
    }
  }

  public gotoAndStop(frame: number): void {
    this.stop();
    const previousFrame = this.currentFrame;
    this._currentTime = frame;
    if (previousFrame !== this.currentFrame) {
      this.updateTexture();
    }
  }

  public gotoAndPlay(frame: number): void {
    const previousFrame = this.currentFrame;
    this._currentTime = frame;
    if (previousFrame !== this.currentFrame) {
      this.updateTexture();
    }
    this.play();
  }

  public update(deltaTime: number): void {
    const elapsed = this.animationSpeed * deltaTime;
    const previousFrame = this.currentFrame;

    if (this._durations !== null) {
      let timeInFrame = (this._currentTime % 1) * this._durations[this.currentFrame];
      timeInFrame += (elapsed / 60) * 1000;

      while (timeInFrame < 0) {
        this._currentTime--;
        timeInFrame += this._durations[this.currentFrame];
      }

      const direction = Math.sign(this.animationSpeed * deltaTime);
      this._currentTime = Math.floor(this._currentTime);

      while (timeInFrame >= this._durations[this.currentFrame]) {
        timeInFrame -= this._durations[this.currentFrame] * direction;
        this._currentTime += direction;
      }

      this._currentTime += timeInFrame / this._durations[this.currentFrame];
    } else {
      this._currentTime += elapsed;
    }

    if (this._currentTime < 0 && !this.loop) {
      this.gotoAndStop(0);
      if (this.onComplete) {
        this.onComplete();
      }
    } else if (this._currentTime >= this._textures!.length && !this.loop) {
      this.gotoAndStop(this._textures!.length - 1);
      if (this.onComplete) {
        this.onComplete();
      }
    } else if (previousFrame !== this.currentFrame) {
      if (this.loop && this.onLoop) {
        const shouldTriggerLoop = 
          (this.animationSpeed > 0 && this.currentFrame < previousFrame) ||
          (this.animationSpeed < 0 && this.currentFrame > previousFrame);
        
        if (shouldTriggerLoop) {
          this.onLoop();
        }
      }
      this.updateTexture();
    }
  }

  private updateTexture(): void {
    const currentFrame = this.currentFrame;

    if (this._previousFrame !== currentFrame) {
      this._previousFrame = currentFrame;
      this._texture = this._textures![currentFrame];
      this._textureID = -1;
      this._textureTrimmedID = -1;
      this._cachedTint = 0xFFFFFF;
      this.uvs = this._texture._uvs.uvsFloat32;

      if (this.updateAnchor) {
        this._anchor.copyFrom(this._texture.defaultAnchor);
      }

      if (this.onFrameChange) {
        this.onFrameChange(this.currentFrame);
      }
    }
  }

  public destroy(options?: boolean | object): void {
    this.stop();
    super.destroy(options);
    this.onComplete = null;
    this.onFrameChange = null;
    this.onLoop = null;
  }

  public static fromFrames(frames: string[]): AnimatedSprite {
    const textures: Texture[] = [];
    for (let i = 0; i < frames.length; ++i) {
      textures.push(Texture.from(frames[i]));
    }
    return new AnimatedSprite(textures);
  }

  public static fromImages(images: string[]): AnimatedSprite {
    const textures: Texture[] = [];
    for (let i = 0; i < images.length; ++i) {
      textures.push(Texture.from(images[i]));
    }
    return new AnimatedSprite(textures);
  }

  public get totalFrames(): number {
    return this._textures!.length;
  }

  public get textures(): AnimatedSpriteTextures {
    return this._textures!;
  }

  public set textures(value: AnimatedSpriteTextures) {
    if (value[0] instanceof Texture) {
      this._textures = value as Texture[];
      this._durations = null;
    } else {
      this._textures = [];
      this._durations = [];
      const frameObjects = value as FrameObject[];
      
      for (let i = 0; i < frameObjects.length; i++) {
        this._textures.push(frameObjects[i].texture);
        this._durations.push(frameObjects[i].time);
      }
    }

    this._previousFrame = null;
    this.gotoAndStop(0);
    this.updateTexture();
  }

  public get currentFrame(): number {
    let frame = Math.floor(this._currentTime) % this._textures!.length;
    if (frame < 0) {
      frame += this._textures!.length;
    }
    return frame;
  }

  public get playing(): boolean {
    return this._playing;
  }

  public get autoUpdate(): boolean {
    return this._autoUpdate;
  }

  public set autoUpdate(value: boolean) {
    if (value !== this._autoUpdate) {
      this._autoUpdate = value;
      
      if (!this._autoUpdate && this._isConnectedToTicker) {
        Ticker.shared.remove(this.update, this);
        this._isConnectedToTicker = false;
      } else if (this._autoUpdate && !this._isConnectedToTicker && this._playing) {
        Ticker.shared.add(this.update, this);
        this._isConnectedToTicker = true;
      }
    }
  }
}