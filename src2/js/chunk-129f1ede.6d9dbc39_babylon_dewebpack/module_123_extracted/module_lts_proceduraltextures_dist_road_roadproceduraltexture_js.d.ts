import { ProceduralTexture } from '@babylonjs/core/Materials/Textures/Procedurals/proceduralTexture';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Scene } from '@babylonjs/core/scene';
import { Nullable } from '@babylonjs/core/types';

/**
 * Procedural texture that generates a road pattern.
 * Creates a customizable road texture using shader-based generation.
 */
export declare class RoadProceduralTexture extends ProceduralTexture {
    /**
     * The color of the road surface.
     * @default Color3(0.53, 0.53, 0.53) - Medium gray
     */
    private _roadColor: Color3;

    /**
     * Creates a new RoadProceduralTexture instance.
     * @param name - The name of the texture
     * @param size - The size of the texture (width and height)
     * @param scene - The scene the texture belongs to
     * @param fallbackTexture - Optional fallback texture if shader compilation fails
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
     * Gets the color of the road.
     * @returns The current road color
     */
    get roadColor(): Color3;

    /**
     * Sets the color of the road and updates the shader uniforms.
     * @param value - The new road color
     */
    set roadColor(value: Color3);

    /**
     * Updates the shader uniforms with current property values.
     * Called internally when properties change.
     */
    updateShaderUniforms(): void;

    /**
     * Serializes the texture to a JSON representation.
     * @returns The serialized texture data
     */
    serialize(): any;

    /**
     * Parses a serialized RoadProceduralTexture and reconstructs it.
     * @param parsedTexture - The serialized texture data
     * @param scene - The scene to create the texture in
     * @param rootUrl - The root URL for loading resources
     * @returns The reconstructed RoadProceduralTexture instance
     */
    static Parse(
        parsedTexture: any,
        scene: Scene,
        rootUrl: string
    ): RoadProceduralTexture;
}