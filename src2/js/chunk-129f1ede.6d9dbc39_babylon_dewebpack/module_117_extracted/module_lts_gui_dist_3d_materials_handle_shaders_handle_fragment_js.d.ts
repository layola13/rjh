/**
 * Handle fragment shader module for 3D materials
 * Provides a simple fragment shader that renders a solid color
 */

/**
 * Shader name identifier
 */
export const HANDLE_SHADER_NAME = 'handlePixelShader';

/**
 * GLSL fragment shader source code for handle material
 * Renders a uniform colored surface with full opacity
 */
export const HANDLE_FRAGMENT_SHADER_SOURCE = `
uniform vec3 color;
void main(void) {
    gl_FragColor = vec4(color, 1.0);
}
`;

/**
 * Shader definition object containing name and compiled shader reference
 */
export interface HandleShaderDefinition {
  /** Unique identifier for the shader */
  name: string;
  /** Reference to the shader stored in the ShaderStore */
  shader: string;
}

/**
 * Exported handle pixel shader configuration
 * Registers the shader in the global ShaderStore and returns its definition
 */
export const handlePixelShader: HandleShaderDefinition = {
  name: HANDLE_SHADER_NAME,
  shader: HANDLE_FRAGMENT_SHADER_SOURCE
};