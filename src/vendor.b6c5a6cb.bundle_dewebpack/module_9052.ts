import { Filter, defaultFilterVertex } from '@pixi/core';

/**
 * NoiseFilter applies random noise to the texture.
 * @class
 * @extends Filter
 */
export class NoiseFilter extends Filter {
  /**
   * Creates a new NoiseFilter instance.
   * @param noise - The intensity of the noise effect (0-1). Default is 0.5.
   * @param seed - The random seed value. Default is Math.random().
   */
  constructor(noise: number = 0.5, seed: number = Math.random()) {
    const fragmentShader = `
      precision highp float;
      
      varying vec2 vTextureCoord;
      varying vec4 vColor;
      
      uniform float uNoise;
      uniform float uSeed;
      uniform sampler2D uSampler;
      
      float rand(vec2 co)
      {
        return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
      }
      
      void main()
      {
        vec4 color = texture2D(uSampler, vTextureCoord);
        float randomValue = rand(gl_FragCoord.xy * uSeed);
        float diff = (randomValue - 0.5) * uNoise;
        
        // Un-premultiply alpha before applying the color matrix. See issue #3539.
        if (color.a > 0.0) {
          color.rgb /= color.a;
        }
        
        color.r += diff;
        color.g += diff;
        color.b += diff;
        
        // Premultiply alpha again.
        color.rgb *= color.a;
        
        gl_FragColor = color;
      }
    `;

    super(defaultFilterVertex, fragmentShader, {
      uNoise: 0,
      uSeed: 0
    });

    this.noise = noise;
    this.seed = seed;
  }

  /**
   * Gets the noise intensity.
   * @returns The current noise value.
   */
  get noise(): number {
    return this.uniforms.uNoise;
  }

  /**
   * Sets the noise intensity.
   * @param value - The noise intensity (0-1).
   */
  set noise(value: number) {
    this.uniforms.uNoise = value;
  }

  /**
   * Gets the random seed value.
   * @returns The current seed value.
   */
  get seed(): number {
    return this.uniforms.uSeed;
  }

  /**
   * Sets the random seed value.
   * @param value - The seed value for randomization.
   */
  set seed(value: number) {
    this.uniforms.uSeed = value;
  }
}