/**
 * Fluent Button Fragment Shader Module
 * 
 * This module defines the fragment shader for Babylon.js Fluent Design button materials.
 * It handles edge effects, proximity-based interactions, blob animations, and wireframe rendering.
 * 
 * @module FluentButtonFragmentShader
 * @packageDocumentation
 */

/**
 * Shader name identifier used for registration in the ShaderStore
 */
export declare const SHADER_NAME: "fluentButtonPixelShader";

/**
 * Complete GLSL fragment shader source code for the Fluent Button material.
 * 
 * This shader implements:
 * - Edge detection and fading effects
 * - Proximity-based hover highlighting for VR/AR interactions
 * - Blob texture animations with pulsing effects
 * - Wireframe rendering with dynamic width
 * - Selection states and visual feedback
 * - Global hand tracking integration (left/right index and thumb tips)
 * 
 * @remarks
 * The shader uses varying inputs from the vertex shader including position, normal,
 * UV coordinates, tangent space vectors, vertex colors, and custom extra data.
 */
export declare const FLUENT_BUTTON_FRAGMENT_SHADER_SOURCE: string;

/**
 * Shader registration object containing the shader name and source code.
 * 
 * This object is typically used to register the shader with Babylon.js ShaderStore
 * for runtime compilation and material binding.
 * 
 * @example
 *