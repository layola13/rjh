/**
 * Blur filter implementation for PixiJS
 * Provides both single-pass and two-pass (X/Y) blur effects
 */

import { Filter } from '@pixi/core';
import { settings } from '@pixi/settings';

/**
 * Gaussian blur kernel weights for different kernel sizes
 * Keys represent the kernel size, values are the weight arrays
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
 * Fragment shader template for blur sampling
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
 * Generates vertex shader for blur pass
 * @param kernelSize - Size of the blur kernel
 * @param horizontal - Whether this is a horizontal blur pass
 * @returns Generated vertex shader source
 */
function generateVertexShader(kernelSize: number, horizontal: boolean): string {
  const halfSize = Math.ceil(kernelSize / 2);
  
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
    }`;
  
  const sampleTemplate = horizontal
    ? 'vBlurTexCoords[%index%] = textureCoord + vec2(%sampleIndex% * strength, 0.0);'
    : 'vBlurTexCoords[%index%] = textureCoord + vec2(0.0, %sampleIndex% * strength);';
  
  let blurCode = '';
  for (let i = 0; i < kernelSize; i++) {
    const sampleOffset = i - (halfSize - 1);
    let sampleLine = sampleTemplate
      .replace('%index%', String(i))
      .replace('%sampleIndex%', `${sampleOffset}.0`);
    blurCode += sampleLine + '\n';
  }
  
  return vertexShader
    .replace('%blur%', blurCode)
    .replace('%size%', String(kernelSize));
}

/**
 * Generates fragment shader for blur pass
 * @param kernelSize - Size of the blur kernel
 * @returns Generated fragment shader source
 */
function generateFragmentShader(kernelSize: number): string {
  const weights = GAUSSIAN_WEIGHTS[kernelSize];
  const weightCount = weights.length;
  
  let fragmentShader = FRAGMENT_SHADER_TEMPLATE;
  let blurCode = '';
  
  for (let i = 0; i < kernelSize; i++) {
    let weightIndex = i;
    if (i >= weightCount) {
      weightIndex = kernelSize - i - 1;
    }
    
    const sampleLine = `gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;`
      .replace('%index%', String(i))
      .replace('%value%', String(weights[weightIndex]));
    
    blurCode += sampleLine + '\n';
  }
  
  return fragmentShader
    .replace('%blur%', blurCode)
    .replace('%size%', String(kernelSize));
}

/**
 * Single-pass blur filter (either horizontal or vertical)
 */
export declare class BlurFilterPass extends Filter {
  /**
   * Whether this is a horizontal blur pass
   */
  horizontal: boolean;
  
  /**
   * Resolution of the filter
   */
  resolution: number;
  
  /**
   * Internal quality storage
   * @private
   */
  private _quality: number;
  
  /**
   * Blur strength/radius
   */
  strength: number;
  
  /**
   * Number of passes to apply
   */
  passes: number;
  
  /**
   * Creates a new BlurFilterPass
   * @param horizontal - Whether to blur horizontally (true) or vertically (false)
   * @param strength - Blur strength/radius (default: 8)
   * @param quality - Quality/number of passes (default: 4)
   * @param resolution - Filter resolution (default: settings.RESOLUTION)
   * @param kernelSize - Size of the blur kernel (default: 5)
   */
  constructor(
    horizontal: boolean,
    strength?: number,
    quality?: number,
    resolution?: number,
    kernelSize?: number
  );
  
  /**
   * Applies the blur filter
   * @param filterManager - Filter manager
   * @param input - Input render texture
   * @param output - Output render texture
   * @param clear - Whether to clear the output before rendering
   */
  apply(
    filterManager: any,
    input: any,
    output: any,
    clear: boolean
  ): void;
  
  /**
   * Gets or sets the blur strength
   */
  blur: number;
  
  /**
   * Gets or sets the quality (number of passes)
   */
  quality: number;
}

/**
 * Two-pass blur filter (combines horizontal and vertical passes)
 */
export declare class BlurFilter extends Filter {
  /**
   * Horizontal blur filter pass
   */
  blurXFilter: BlurFilterPass;
  
  /**
   * Vertical blur filter pass
   */
  blurYFilter: BlurFilterPass;
  
  /**
   * Resolution of the filter
   */
  resolution: number;
  
  /**
   * Internal storage for repeatEdgePixels setting
   * @private
   */
  private _repeatEdgePixels: boolean;
  
  /**
   * Creates a new BlurFilter
   * @param strength - Blur strength/radius (default: 8)
   * @param quality - Quality/number of passes (default: 4)
   * @param resolution - Filter resolution (default: settings.RESOLUTION)
   * @param kernelSize - Size of the blur kernel (default: 5)
   */
  constructor(
    strength?: number,
    quality?: number,
    resolution?: number,
    kernelSize?: number
  );
  
  /**
   * Applies the two-pass blur filter
   * @param filterManager - Filter manager
   * @param input - Input render texture
   * @param output - Output render texture
   * @param clear - Whether to clear the output before rendering
   */
  apply(
    filterManager: any,
    input: any,
    output: any,
    clear: boolean
  ): void;
  
  /**
   * Updates padding based on blur strength and repeatEdgePixels setting
   * @private
   */
  private updatePadding(): void;
  
  /**
   * Gets or sets the overall blur strength (affects both X and Y)
   */
  blur: number;
  
  /**
   * Gets or sets the quality (affects both X and Y passes)
   */
  quality: number;
  
  /**
   * Gets or sets horizontal blur strength
   */
  blurX: number;
  
  /**
   * Gets or sets vertical blur strength
   */
  blurY: number;
  
  /**
   * Gets or sets the blend mode
   */
  blendMode: number;
  
  /**
   * Gets or sets whether to clamp/repeat edge pixels
   * When true, padding is set to 0; when false, padding is based on blur strength
   */
  repeatEdgePixels: boolean;
}