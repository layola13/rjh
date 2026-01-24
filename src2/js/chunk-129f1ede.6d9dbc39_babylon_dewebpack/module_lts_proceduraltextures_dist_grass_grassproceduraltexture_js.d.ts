import { ProceduralTexture } from 'core/Materials/Textures/Procedurals/proceduralTexture';
import { Color3 } from 'core/Maths/math.color';
import { Scene } from 'core/scene';
import { Nullable } from 'core/types';
import { SerializationHelper } from 'core/Misc/decorators.serialization';

/**
 * Grass procedural texture which generates grass-like patterns
 * Useful for creating natural ground textures with grass appearance
 */
export declare class GrassProceduralTexture extends ProceduralTexture {
    /**
     * Ground base color
     * @internal
     */
    private _groundColor: Color3;

    /**
     * Array of grass color variations (typically 3 colors for variety)
     * @internal
     */
    private _grassColors: Color3[];

    /**
     * Creates a new GrassProceduralTexture
     * @param name - Defines the name of the texture
     * @param size - Defines the size of the texture (width and height)
     * @param scene - Defines the scene the texture belongs to
     * @param fallbackTexture - Defines the fallback texture to use when this texture is not ready
     * @param generateMipMaps - Defines whether to generate mipmaps for the texture
     */
    constructor(
        name: string,
        size: number,
        scene: Nullable<Scene>,
        fallbackTexture?: ProceduralTexture,
        generateMipMaps?: boolean
    );

    /**
     * Updates the shader uniforms with current color values
     * Sends herb colors and ground color to the shader
     */
    updateShaderUniforms(): void;

    /**
     * Gets the array of grass color variations
     * @returns Array of Color3 representing different grass shades
     */
    get grassColors(): Color3[];

    /**
     * Sets the array of grass color variations
     * Automatically updates shader uniforms when changed
     * @param value - Array of Color3 for grass color variations
     */
    set grassColors(value: Color3[]);

    /**
     * Gets the ground base color
     * @returns The ground Color3
     */
    get groundColor(): Color3;

    /**
     * Sets the ground base color
     * Automatically updates shader uniforms when changed
     * @param value - The ground Color3 to set
     */
    set groundColor(value: Color3);

    /**
     * Serializes the texture to a JSON representation
     * @returns Serialized texture data including custom type and color arrays
     */
    serialize(): any;

    /**
     * Parses a serialized GrassProceduralTexture
     * @param parsedTexture - The parsed texture data
     * @param scene - The scene to create the texture in
     * @param rootUrl - The root URL for loading assets
     * @returns The reconstructed GrassProceduralTexture instance
     */
    static Parse(
        parsedTexture: any,
        scene: Scene,
        rootUrl: string
    ): GrassProceduralTexture;
}