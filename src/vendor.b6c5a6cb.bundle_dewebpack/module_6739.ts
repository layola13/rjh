import { Filter } from './Filter';
import { settings } from './settings';

/**
 * Gaussian blur kernel weights for different kernel sizes
 */
const GAUSSIAN_WEIGHTS: Record<number, number[]> = {
  5: [0.153388, 0.221461, 0.250301],
  7: [0.071303, 0.131514, 0.189879, 0.214607],
  9: [0.028532, 0.067234, 0.124009, 0.179044, 0.20236],
  11: [0.0093, 0.028002, 0.065984, 0.121703, 0.175713, 0.198596],
  13: [0.002406, 0.009255, 0.027867, 0.065666, 0.121117, 0.174868, 0.197641],
  15: [0.000489, 0.002403, 0.009246, 0.02784, 0.065602, 0.120999, 0.174697, 0.197448]
};

/**
 * Fragment shader template for blur effect
 */
const FRAGMENT_SHADER_TEMPLATE = [
  'varying vec2 vBlurTexCoords[%size%];',
  'uniform sampler2D uSampler;',
  'void main(void)',
  '{',
  '    gl_FragColor = vec4(0.0);',
  '    %blur%',
  '}'
].join('\n');

/**
 * Generates vertex shader code for blur effect
 */
function generateVertexShader(kernelSize: number, isHorizontal: boolean): string {
  const halfKernel = Math.ceil(kernelSize / 2);
  
  let vertexShader = `
    attribute vec2 aVertexPosition;
    
    uniform mat3 projectionMatrix;
    uniform float strength;
    
    varying vec2 vBlurTexCoords[%size%];
    
    uniform vec4 inputSize;
    uniform vec4 outputFrame;
    
    vec4 filterVertexPosition( void )
    {
        vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;
        
        return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
    }
    
    vec2 filterTextureCoord( void )
    {
        return aVertexPosition * (outputFrame.zw * inputSize.zw);
    }
    
    void main(void)
    {
        gl_Position = filterVertexPosition();
        
        vec2 textureCoord = filterTextureCoord();
        %blur%
    }
  `;

  const sampleTemplate = isHorizontal
    ? 'vBlurTexCoords[%index%] = textureCoord + vec2(%sampleIndex% * strength, 0.0);'
    : 'vBlurTexCoords[%index%] = textureCoord + vec2(0.0, %sampleIndex% * strength);';

  let blurCode = '';
  for (let i = 0; i < kernelSize; i++) {
    const sampleOffset = i - (halfKernel - 1);
    let line = sampleTemplate.replace('%index%', i.toString());
    line = line.replace('%sampleIndex%', `${sampleOffset}.0`);
    blurCode += line + '\n';
  }

  vertexShader = vertexShader.replace('%blur%', blurCode);
  vertexShader = vertexShader.replace('%size%', kernelSize.toString());

  return vertexShader;
}

/**
 * Generates fragment shader code for blur effect
 */
function generateFragmentShader(kernelSize: number): string {
  const weights = GAUSSIAN_WEIGHTS[kernelSize];
  const numWeights = weights.length;
  
  let fragmentShader = FRAGMENT_SHADER_TEMPLATE;
  let blurCode = '';

  for (let i = 0; i < kernelSize; i++) {
    let line = `gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;`;
    line = line.replace('%index%', i.toString());
    
    const weightIndex = i >= numWeights ? kernelSize - i - 1 : i;
    line = line.replace('%value%', weights[weightIndex].toString());
    
    blurCode += line + '\n';
  }

  fragmentShader = fragmentShader.replace('%blur%', blurCode);
  fragmentShader = fragmentShader.replace('%size%', kernelSize.toString());

  return fragmentShader;
}

/**
 * Single-pass blur filter (horizontal or vertical)
 */
export class BlurFilterPass extends Filter {
  public horizontal: boolean;
  public resolution: number;
  public strength: number;
  public passes: number;
  private _quality: number;

  constructor(
    horizontal: boolean,
    strength: number = 8,
    quality: number = 4,
    resolution: number = settings.RESOLUTION,
    kernelSize: number = 5
  ) {
    const vertexShader = generateVertexShader(kernelSize, horizontal);
    const fragmentShader = generateFragmentShader(kernelSize);

    super(vertexShader, fragmentShader);

    this.horizontal = horizontal;
    this.resolution = resolution;
    this._quality = 0;
    this.quality = quality;
    this.blur = strength;
    this.strength = strength;
    this.passes = quality;
  }

  apply(
    filterManager: any,
    input: any,
    output: any,
    clearMode: number
  ): void {
    if (output) {
      if (this.horizontal) {
        this.uniforms.strength = (1 / output.width) * (output.width / input.width);
      } else {
        this.uniforms.strength = (1 / output.height) * (output.height / input.height);
      }
    } else {
      if (this.horizontal) {
        this.uniforms.strength = (1 / filterManager.renderer.width) * (filterManager.renderer.width / input.width);
      } else {
        this.uniforms.strength = (1 / filterManager.renderer.height) * (filterManager.renderer.height / input.height);
      }
    }

    this.uniforms.strength *= this.strength;
    this.uniforms.strength /= this.passes;

    if (this.passes === 1) {
      filterManager.applyFilter(this, input, output, clearMode);
    } else {
      const tempTexture = filterManager.getFilterTexture();
      const renderer = filterManager.renderer;
      
      let currentInput = input;
      let currentOutput = tempTexture;

      this.state.blend = false;
      filterManager.applyFilter(this, currentInput, currentOutput, true);

      for (let i = 1; i < this.passes - 1; i++) {
        renderer.renderTexture.bind(currentInput, currentInput.filterFrame);
        this.uniforms.uSampler = currentOutput;

        const temp = currentOutput;
        currentOutput = currentInput;
        currentInput = temp;

        renderer.shader.bind(this);
        renderer.geometry.draw(5);
      }

      this.state.blend = true;
      filterManager.applyFilter(this, currentOutput, output, clearMode);
      filterManager.returnFilterTexture(tempTexture);
    }
  }

  get blur(): number {
    return this.strength;
  }

  set blur(value: number) {
    this.padding = 1 + 2 * Math.abs(value);
    this.strength = value;
  }

  get quality(): number {
    return this._quality;
  }

  set quality(value: number) {
    this._quality = value;
    this.passes = value;
  }
}

/**
 * Two-pass blur filter combining horizontal and vertical blur
 */
export class BlurFilter extends Filter {
  public blurXFilter: BlurFilterPass;
  public blurYFilter: BlurFilterPass;
  public resolution: number;
  private _repeatEdgePixels: boolean;

  constructor(
    strength: number = 8,
    quality: number = 4,
    resolution: number = settings.RESOLUTION,
    kernelSize: number = 5
  ) {
    super();

    this.blurXFilter = new BlurFilterPass(true, strength, quality, resolution, kernelSize);
    this.blurYFilter = new BlurFilterPass(false, strength, quality, resolution, kernelSize);
    this.resolution = resolution;
    this.quality = quality;
    this.blur = strength;
    this._repeatEdgePixels = false;
  }

  apply(
    filterManager: any,
    input: any,
    output: any,
    clearMode: number
  ): void {
    const xStrength = Math.abs(this.blurXFilter.strength);
    const yStrength = Math.abs(this.blurYFilter.strength);

    if (xStrength && yStrength) {
      const tempTexture = filterManager.getFilterTexture();
      this.blurXFilter.apply(filterManager, input, tempTexture, true);
      this.blurYFilter.apply(filterManager, tempTexture, output, clearMode);
      filterManager.returnFilterTexture(tempTexture);
    } else if (yStrength) {
      this.blurYFilter.apply(filterManager, input, output, clearMode);
    } else {
      this.blurXFilter.apply(filterManager, input, output, clearMode);
    }
  }

  updatePadding(): void {
    if (this._repeatEdgePixels) {
      this.padding = 0;
    } else {
      this.padding = 2 * Math.max(
        Math.abs(this.blurXFilter.strength),
        Math.abs(this.blurYFilter.strength)
      );
    }
  }

  get blur(): number {
    return this.blurXFilter.blur;
  }

  set blur(value: number) {
    this.blurXFilter.blur = value;
    this.blurYFilter.blur = value;
    this.updatePadding();
  }

  get quality(): number {
    return this.blurXFilter.quality;
  }

  set quality(value: number) {
    this.blurXFilter.quality = value;
    this.blurYFilter.quality = value;
  }

  get blurX(): number {
    return this.blurXFilter.blur;
  }

  set blurX(value: number) {
    this.blurXFilter.blur = value;
    this.updatePadding();
  }

  get blurY(): number {
    return this.blurYFilter.blur;
  }

  set blurY(value: number) {
    this.blurYFilter.blur = value;
    this.updatePadding();
  }

  get blendMode(): any {
    return this.blurYFilter.blendMode;
  }

  set blendMode(value: any) {
    this.blurYFilter.blendMode = value;
  }

  get repeatEdgePixels(): boolean {
    return this._repeatEdgePixels;
  }

  set repeatEdgePixels(value: boolean) {
    this._repeatEdgePixels = value;
    this.updatePadding();
  }
}