import { Filter, defaultVertex } from '@pixi/core';

/**
 * Alpha filter that adjusts the transparency of a display object.
 * @pixi/filter-alpha - v5.2.4
 */
export class AlphaFilter extends Filter {
  /**
   * Creates an instance of AlphaFilter.
   * @param alpha - The alpha value to apply (0 = transparent, 1 = opaque)
   */
  constructor(alpha: number = 1) {
    const fragmentShader = `
      varying vec2 vTextureCoord;
      
      uniform sampler2D uSampler;
      uniform float uAlpha;
      
      void main(void)
      {
        gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;
      }
    `;

    super(defaultVertex, fragmentShader, {
      uAlpha: 1
    });

    this.alpha = alpha;
  }

  /**
   * Gets the alpha value.
   */
  get alpha(): number {
    return this.uniforms.uAlpha;
  }

  /**
   * Sets the alpha value.
   */
  set alpha(value: number) {
    this.uniforms.uAlpha = value;
  }
}