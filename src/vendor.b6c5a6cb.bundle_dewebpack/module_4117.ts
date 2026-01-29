import { RenderTexture } from './RenderTexture';
import { CanvasRenderTarget } from './CanvasRenderTarget';
import { Rectangle } from './Rectangle';

interface Renderer {
  resolution: number;
  width: number;
  height: number;
  extract?: Extract | null;
  gl: WebGLRenderingContext;
  renderTexture: {
    bind(texture: RenderTexture | null): void;
  };
  generateTexture(target: unknown): RenderTexture;
}

interface Frame {
  x: number;
  y: number;
  width: number;
  height: number;
}

const tempRectangle = new Rectangle();

export class Extract {
  renderer: Renderer;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
    renderer.extract = this;
  }

  /**
   * Creates an HTMLImageElement from the given target
   */
  image(target?: unknown, format?: string, quality?: number): HTMLImageElement {
    const image = new Image();
    image.src = this.base64(target, format, quality);
    return image;
  }

  /**
   * Converts the target to a base64 encoded string
   */
  base64(target?: unknown, format?: string, quality?: number): string {
    return this.canvas(target).toDataURL(format, quality);
  }

  /**
   * Extracts a canvas from the target
   */
  canvas(target?: unknown): HTMLCanvasElement {
    let resolution: number;
    let frame: Frame;
    let renderTexture: RenderTexture | undefined;
    const renderer = this.renderer;
    let flipY = false;
    let shouldDestroyTexture = false;

    if (target) {
      if (target instanceof RenderTexture) {
        renderTexture = target;
      } else {
        renderTexture = this.renderer.generateTexture(target);
        shouldDestroyTexture = true;
      }
    }

    if (renderTexture) {
      resolution = renderTexture.baseTexture.resolution;
      frame = renderTexture.frame;
      flipY = false;
      renderer.renderTexture.bind(renderTexture);
    } else {
      resolution = this.renderer.resolution;
      flipY = true;
      frame = tempRectangle;
      frame.width = this.renderer.width;
      frame.height = this.renderer.height;
      renderer.renderTexture.bind(null);
    }

    const width = Math.floor(frame.width * resolution + 0.0001);
    const height = Math.floor(frame.height * resolution + 0.0001);
    let canvasBuffer = new CanvasRenderTarget(width, height, 1);
    const pixels = new Uint8Array(4 * width * height);
    const gl = renderer.gl;

    gl.readPixels(
      frame.x * resolution,
      frame.y * resolution,
      width,
      height,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      pixels
    );

    const imageData = canvasBuffer.context.getImageData(0, 0, width, height);
    Extract.arrayPostDivide(pixels, imageData.data);
    canvasBuffer.context.putImageData(imageData, 0, 0);

    if (flipY) {
      const flippedBuffer = new CanvasRenderTarget(canvasBuffer.width, canvasBuffer.height, 1);
      flippedBuffer.context.scale(1, -1);
      flippedBuffer.context.drawImage(canvasBuffer.canvas, 0, -height);
      canvasBuffer.destroy();
      canvasBuffer = flippedBuffer;
    }

    if (shouldDestroyTexture && renderTexture) {
      renderTexture.destroy(true);
    }

    return canvasBuffer.canvas;
  }

  /**
   * Extracts pixel data from the target
   */
  pixels(target?: unknown): Uint8Array {
    let resolution: number;
    let frame: Frame;
    let renderTexture: RenderTexture | undefined;
    const renderer = this.renderer;
    let shouldDestroyTexture = false;

    if (target) {
      if (target instanceof RenderTexture) {
        renderTexture = target;
      } else {
        renderTexture = this.renderer.generateTexture(target);
        shouldDestroyTexture = true;
      }
    }

    if (renderTexture) {
      resolution = renderTexture.baseTexture.resolution;
      frame = renderTexture.frame;
      renderer.renderTexture.bind(renderTexture);
    } else {
      resolution = renderer.resolution;
      frame = tempRectangle;
      frame.width = renderer.width;
      frame.height = renderer.height;
      renderer.renderTexture.bind(null);
    }

    const width = frame.width * resolution;
    const height = frame.height * resolution;
    const pixels = new Uint8Array(4 * width * height);
    const gl = renderer.gl;

    gl.readPixels(
      frame.x * resolution,
      frame.y * resolution,
      width,
      height,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      pixels
    );

    if (shouldDestroyTexture && renderTexture) {
      renderTexture.destroy(true);
    }

    Extract.arrayPostDivide(pixels, pixels);
    return pixels;
  }

  /**
   * Destroys the extract instance
   */
  destroy(): void {
    this.renderer.extract = null;
    this.renderer = null!;
  }

  /**
   * Post-divides alpha channel for proper color values
   */
  static arrayPostDivide(source: Uint8Array, destination: Uint8Array | Uint8ClampedArray): void {
    for (let index = 0; index < source.length; index += 4) {
      const alpha = destination[index + 3] = source[index + 3];
      
      if (alpha !== 0) {
        destination[index] = Math.round(Math.min(255 * source[index] / alpha, 255));
        destination[index + 1] = Math.round(Math.min(255 * source[index + 1] / alpha, 255));
        destination[index + 2] = Math.round(Math.min(255 * source[index + 2] / alpha, 255));
      } else {
        destination[index] = source[index];
        destination[index + 1] = source[index + 1];
        destination[index + 2] = source[index + 2];
      }
    }
  }
}