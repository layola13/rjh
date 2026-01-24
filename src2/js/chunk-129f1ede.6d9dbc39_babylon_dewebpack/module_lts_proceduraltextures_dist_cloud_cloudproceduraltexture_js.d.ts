import type { Scene } from '@babylonjs/core/scene';
import type { Nullable } from '@babylonjs/core/types';
import type { Color4 } from '@babylonjs/core/Maths/math.color';
import type { ProceduralTexture } from '@babylonjs/core/Materials/Textures/Procedurals/proceduralTexture';
import type { Texture } from '@babylonjs/core/Materials/Textures/texture';

/**
 * Procedural texture that generates realistic cloud patterns using fractal noise.
 * Supports customizable sky and cloud colors, amplitude, and octave levels.
 */
export declare class CloudProceduralTexture extends ProceduralTexture {
    /**
     * Internal sky color storage
     */
    private _skyColor: Color4;

    /**
     * Internal cloud color storage
     */
    private _cloudColor: Color4;

    /**
     * Internal amplitude storage for noise intensity
     */
    private _amplitude: number;

    /**
     * Internal octave count storage for fractal detail
     */
    private _numOctaves: number;

    /**
     * Creates a new cloud procedural texture instance.
     * @param name - Unique identifier for the texture
     * @param size - Texture dimensions (width/height in pixels)
     * @param scene - Scene to attach the texture to (null for current scene)
     * @param fallbackTexture - Optional fallback texture if shader compilation fails
     * @param generateMipMaps - Whether to generate mipmap levels for texture filtering
     */
    constructor(
        name: string,
        size: number,
        scene?: Nullable<Scene>,
        fallbackTexture?: Texture,
        generateMipMaps?: boolean
    );

    /**
     * Gets the sky background color.
     * @returns Current sky color as Color4
     */
    get skyColor(): Color4;

    /**
     * Sets the sky background color and updates shader uniforms.
     * @param value - New sky color (RGBA)
     */
    set skyColor(value: Color4);

    /**
     * Gets the cloud foreground color.
     * @returns Current cloud color as Color4
     */
    get cloudColor(): Color4;

    /**
     * Sets the cloud foreground color and updates shader uniforms.
     * @param value - New cloud color (RGBA)
     */
    set cloudColor(value: Color4);

    /**
     * Gets the noise amplitude controlling cloud intensity.
     * @returns Current amplitude value (typically 0-2 range)
     */
    get amplitude(): number;

    /**
     * Sets the noise amplitude and updates shader uniforms.
     * Higher values create more dramatic cloud formations.
     * @param value - Amplitude multiplier for noise generation
     */
    set amplitude(value: number);

    /**
     * Gets the number of fractal noise octaves.
     * @returns Current octave count (determines detail level)
     */
    get numOctaves(): number;

    /**
     * Sets the fractal octave count and updates shader uniforms.
     * More octaves produce finer detail at performance cost.
     * @param value - Number of noise layers to combine (typically 1-8)
     */
    set numOctaves(value: number);

    /**
     * Updates all shader uniform variables with current property values.
     * Called automatically when properties change.
     */
    updateShaderUniforms(): void;

    /**
     * Serializes the texture to JSON format for export/storage.
     * @returns Serialized object containing all texture properties
     */
    serialize(): any;

    /**
     * Parses a serialized cloud texture and reconstructs the instance.
     * @param parsedTexture - JSON object containing serialized texture data
     * @param scene - Scene to attach the reconstructed texture to
     * @param rootUrl - Base URL for loading associated resources
     * @returns New CloudProceduralTexture instance with restored properties
     */
    static Parse(
        parsedTexture: any,
        scene: Scene,
        rootUrl: string
    ): CloudProceduralTexture;
}