/**
 * WebGL-based image processing and filtering library
 */

interface TextureOptions {
  width: number;
  height: number;
  format: number;
  type: number;
}

interface FilterOptions {
  brightness?: number;
  contrast?: number;
  hue?: number;
  saturation?: number;
  temperature?: number;
  exposure?: number;
  sharpen?: number;
  highlight?: number;
  shadow?: number;
}

interface Color {
  r: number;
  g: number;
  b: number;
  a?: number;
}

interface EntityIds {
  instanceid: string;
}

interface EntityData {
  ids: EntityIds;
  color: Color;
}

class Shader {
  private program: WebGLProgram;
  private vertexAttribute: number | null = null;
  private texCoordAttribute: number | null = null;

  constructor(
    private gl: WebGLRenderingContext,
    vertexSource?: string,
    fragmentSource?: string
  ) {
    this.program = gl.createProgram()!;
    
    const defaultVertexShader = this.getDefaultVertexShader();
    const defaultFragmentShader = this.getDefaultFragmentShader();

    const vertex = vertexSource || defaultVertexShader;
    const fragment = `precision highp float;\n${fragmentSource || defaultFragmentShader}`;

    gl.attachShader(this.program, this.compileShader(gl.VERTEX_SHADER, vertex));
    gl.attachShader(this.program, this.compileShader(gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      throw new Error(`Link error: ${gl.getProgramInfoLog(this.program)}`);
    }
  }

  private compileShader(type: number, source: string): WebGLShader {
    const shader = this.gl.createShader(type)!;
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      throw new Error(`Compile error: ${this.gl.getShaderInfoLog(shader)}`);
    }

    return shader;
  }

  private getDefaultVertexShader(): string {
    return `
      attribute vec2 vertex;
      attribute vec2 _texCoord;
      varying vec2 texCoord;
      void main() {
        texCoord = _texCoord;
        gl_Position = vec4(vertex * 2.0 - 1.0, 0.0, 1.0);
      }
    `;
  }

  private getDefaultFragmentShader(): string {
    return `
      uniform sampler2D texture;
      varying vec2 texCoord;
      void main() {
        gl_FragColor = texture2D(texture, texCoord);
      }
    `;
  }

  uniforms(uniformValues: Record<string, number | number[]>): this {
    this.gl.useProgram(this.program);

    for (const name in uniformValues) {
      if (!uniformValues.hasOwnProperty(name)) continue;

      const location = this.gl.getUniformLocation(this.program, name);
      if (location === null) continue;

      const value = uniformValues[name];

      if (Array.isArray(value)) {
        this.setUniformArray(location, value);
      } else {
        this.gl.uniform1f(location, value);
      }
    }

    return this;
  }

  private setUniformArray(location: WebGLUniformLocation, value: number[]): void {
    const floatArray = new Float32Array(value);

    switch (value.length) {
      case 1:
        this.gl.uniform1fv(location, floatArray);
        break;
      case 2:
        this.gl.uniform2fv(location, floatArray);
        break;
      case 3:
        this.gl.uniform3fv(location, floatArray);
        break;
      case 4:
        this.gl.uniform4fv(location, floatArray);
        break;
      case 9:
        this.gl.uniformMatrix3fv(location, false, floatArray);
        break;
      case 16:
        this.gl.uniformMatrix4fv(location, false, floatArray);
        break;
      default:
        throw new Error(`Unsupported uniform array length: ${value.length}`);
    }
  }

  textures(textureUnits: Record<string, number>): this {
    this.gl.useProgram(this.program);

    for (const name in textureUnits) {
      if (textureUnits.hasOwnProperty(name)) {
        this.gl.uniform1i(
          this.gl.getUniformLocation(this.program, name),
          textureUnits[name]
        );
      }
    }

    return this;
  }

  drawRect(left?: number, top?: number, right?: number, bottom?: number): void {
    const viewport = this.gl.getParameter(this.gl.VIEWPORT) as number[];

    const normalizedTop = top !== undefined ? (top - viewport[1]) / viewport[3] : 0;
    const normalizedLeft = left !== undefined ? (left - viewport[0]) / viewport[2] : 0;
    const normalizedRight = right !== undefined ? (right - viewport[0]) / viewport[2] : 1;
    const normalizedBottom = bottom !== undefined ? (bottom - viewport[1]) / viewport[3] : 1;

    this.setupBuffers();
    this.bindVertexData(normalizedLeft, normalizedTop, normalizedRight, normalizedBottom);
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
  }

  private setupBuffers(): void {
    if (this.vertexAttribute === null) {
      this.vertexAttribute = this.gl.getAttribLocation(this.program, 'vertex');
      this.gl.enableVertexAttribArray(this.vertexAttribute);
    }

    if (this.texCoordAttribute === null) {
      this.texCoordAttribute = this.gl.getAttribLocation(this.program, '_texCoord');
      this.gl.enableVertexAttribArray(this.texCoordAttribute);
    }
  }

  private bindVertexData(left: number, top: number, right: number, bottom: number): void {
    this.gl.useProgram(this.program);
    
    // Vertex buffer setup would go here
    this.gl.vertexAttribPointer(this.vertexAttribute!, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.vertexAttribPointer(this.texCoordAttribute!, 2, this.gl.FLOAT, false, 0, 0);
  }

  destroy(): void {
    this.gl.deleteProgram(this.program);
  }
}

class Texture {
  private id: WebGLTexture;
  width: number;
  height: number;
  private format: number;
  private type: number;

  constructor(
    private gl: WebGLRenderingContext,
    width: number,
    height: number,
    format: number,
    type: number
  ) {
    this.id = gl.createTexture()!;
    this.width = width;
    this.height = height;
    this.format = format;
    this.type = type;

    gl.bindTexture(gl.TEXTURE_2D, this.id);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    if (width && height) {
      gl.texImage2D(gl.TEXTURE_2D, 0, this.format, width, height, 0, this.format, this.type, null);
    }
  }

  loadContentsOf(element: HTMLImageElement | HTMLCanvasElement | ImageData): void {
    this.width = 'width' in element ? element.width : 0;
    this.height = 'height' in element ? element.height : 0;

    this.gl.bindTexture(this.gl.TEXTURE_2D, this.id);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.format, this.format, this.type, element as any);
  }

  use(textureUnit: number = 0): void {
    this.gl.activeTexture(this.gl.TEXTURE0 + textureUnit);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.id);
  }

  unuse(textureUnit: number = 0): void {
    this.gl.activeTexture(this.gl.TEXTURE0 + textureUnit);
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
  }

  destroy(): void {
    this.gl.deleteTexture(this.id);
  }
}

function clamp(min: number, value: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = reject;
  });
}

export { Shader, Texture, clamp, loadImage, Color, FilterOptions, EntityData };