import { ProceduralTexture } from 'core/Textures/Procedurals/proceduralTexture';
import { Scene } from 'core/scene';
import { Color3 } from 'core/Maths/math.color';
import { Nullable } from 'core/types';
import { Engine } from 'core/Engines/engine';

/**
 * Class used to generate wood procedural texture
 * @see https://doc.babylonjs.com/divingDeeper/materials/using/proceduralTextures
 */
export declare class WoodProceduralTexture extends ProceduralTexture {
    /**
     * Internal amplitude scale value for wood grain pattern
     * @internal
     */
    private _ampScale;

    /**
     * Internal wood color value
     * @internal
     */
    private _woodColor;

    /**
     * Gets or sets the amplitude scale of the wood grain pattern
     * Higher values create more pronounced wood grain effects
     * @defaultValue 100
     */
    ampScale: number;

    /**
     * Gets or sets the base color of the wood texture
     * @defaultValue Color3(0.32, 0.17, 0.09) - Natural brown wood color
     */
    woodColor: Color3;

    /**
     * Creates a new WoodProceduralTexture instance
     * @param name - The name of the texture
     * @param size - The size of the texture (width = height)
     * @param scene - The scene the texture belongs to
     * @param fallbackTexture - Optional fallback texture if procedural generation fails
     * @param generateMipMaps - Whether to generate mipmaps for the texture
     */
    constructor(
        name: string,
        size: number,
        scene: Nullable<Scene>,
        fallbackTexture?: ProceduralTexture,
        generateMipMaps?: boolean
    );

    /**
     * Updates the shader uniforms with current property values
     * Called internally when properties change
     */
    updateShaderUniforms(): void;

    /**
     * Serializes the texture to a JSON representation
     * @returns The serialized texture data
     */
    serialize(): any;

    /**
     * Parses a serialized wood procedural texture
     * @param parsedTexture - The parsed texture data
     * @param scene - The scene to add the texture to
     * @param rootUrl - The root URL for loading assets
     * @returns The parsed WoodProceduralTexture instance
     */
    static Parse(
        parsedTexture: any,
        scene: Scene,
        rootUrl: string
    ): WoodProceduralTexture;
}