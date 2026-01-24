import { ProceduralTexture } from 'core/Materials/Textures/Procedurals/proceduralTexture';
import { Color3 } from 'core/Maths/math.color';
import { Scene } from 'core/scene';
import { Nullable } from 'core/types';
import { Engine } from 'core/Engines/engine';

/**
 * Procedural texture that generates a marble pattern
 * Creates a realistic marble texture with customizable tiles and joint colors
 */
export declare class MarbleProceduralTexture extends ProceduralTexture {
    /**
     * Internal storage for the number of tiles in height direction
     */
    private _numberOfTilesHeight: number;

    /**
     * Internal storage for the number of tiles in width direction
     */
    private _numberOfTilesWidth: number;

    /**
     * Internal storage for the amplitude of the marble pattern
     */
    private _amplitude: number;

    /**
     * Internal storage for the color of the joints between tiles
     */
    private _jointColor: Color3;

    /**
     * Gets or sets the number of tiles in the height direction
     * @default 3
     */
    get numberOfTilesHeight(): number;
    set numberOfTilesHeight(value: number);

    /**
     * Gets or sets the number of tiles in the width direction
     * @default 3
     */
    get numberOfTilesWidth(): number;
    set numberOfTilesWidth(value: number);

    /**
     * Gets or sets the amplitude of the marble pattern
     * Controls the intensity of the marble effect
     * @default 9
     */
    get amplitude(): number;
    set amplitude(value: number);

    /**
     * Gets or sets the color of the joints between marble tiles
     * @default Color3(0.72, 0.72, 0.72)
     */
    get jointColor(): Color3;
    set jointColor(value: Color3);

    /**
     * Creates a new MarbleProceduralTexture
     * @param name - The name of the texture
     * @param size - The size of the texture (width and height)
     * @param scene - The scene the texture belongs to
     * @param fallbackTexture - Optional fallback texture if procedural generation fails
     * @param generateMipMaps - Whether to generate mip maps for the texture
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
     * Serializes the texture to a JSON object
     * @returns The serialized texture data
     */
    serialize(): any;

    /**
     * Parses a serialized MarbleProceduralTexture
     * @param parsedTexture - The parsed texture data
     * @param scene - The scene to create the texture in
     * @param rootUrl - The root URL for loading assets
     * @returns The newly created texture
     */
    static Parse(parsedTexture: any, scene: Scene, rootUrl: string): MarbleProceduralTexture;
}