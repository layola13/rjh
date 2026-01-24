import { ProceduralTexture } from 'core/Textures/Procedurals/proceduralTexture';
import { Scene } from 'core/scene';
import { Color3 } from 'core/Maths/math.color';
import { Vector2 } from 'core/Maths/math.vector';
import { Nullable } from 'core/types';

/**
 * Procedural texture that generates a fire effect.
 * This texture uses shader-based animation to create realistic fire animations
 * with customizable colors, speed, and alpha blending.
 */
export declare class FireProceduralTexture extends ProceduralTexture {
    /**
     * Internal time counter for animation
     */
    private _time;

    /**
     * Movement speed of the fire effect in X and Y directions
     */
    private _speed;

    /**
     * Whether to automatically increment time each frame
     */
    private _autoGenerateTime;

    /**
     * Alpha threshold for transparency cutoff
     */
    private _alphaThreshold;

    /**
     * Array of 6 colors defining the fire's appearance
     */
    private _fireColors;

    /**
     * Creates a new FireProceduralTexture instance
     * @param name - Name of the texture
     * @param size - Size of the generated texture
     * @param scene - The scene the texture belongs to
     * @param fallbackTexture - Optional fallback texture if shader fails
     * @param generateMipMaps - Whether to generate mipmaps
     */
    constructor(
        name: string,
        size: number,
        scene: Nullable<Scene>,
        fallbackTexture?: ProceduralTexture,
        generateMipMaps?: boolean
    );

    /**
     * Predefined color palette for purple fire effect
     */
    static get PurpleFireColors(): Color3[];

    /**
     * Predefined color palette for green fire effect
     */
    static get GreenFireColors(): Color3[];

    /**
     * Predefined color palette for red fire effect (default)
     */
    static get RedFireColors(): Color3[];

    /**
     * Predefined color palette for blue fire effect
     */
    static get BlueFireColors(): Color3[];

    /**
     * Gets whether time auto-increments each frame
     */
    get autoGenerateTime(): boolean;

    /**
     * Sets whether time auto-increments each frame
     */
    set autoGenerateTime(value: boolean);

    /**
     * Gets the array of fire colors
     */
    get fireColors(): Color3[];

    /**
     * Sets the array of fire colors and updates the shader
     * @param colors - Array of 6 Color3 values defining the fire gradient
     */
    set fireColors(colors: Color3[]);

    /**
     * Gets the current time value for animation
     */
    get time(): number;

    /**
     * Sets the current time value and updates the shader
     */
    set time(value: number);

    /**
     * Gets the speed vector controlling fire movement
     */
    get speed(): Vector2;

    /**
     * Sets the speed vector and updates the shader
     */
    set speed(value: Vector2);

    /**
     * Gets the alpha threshold for transparency
     */
    get alphaThreshold(): number;

    /**
     * Sets the alpha threshold and updates the shader
     * @param value - Threshold value between 0 and 1
     */
    set alphaThreshold(value: number);

    /**
     * Updates all shader uniforms with current property values
     */
    updateShaderUniforms(): void;

    /**
     * Renders the procedural texture
     * @param useCameraPostProcess - Whether to use camera post-processing
     */
    render(useCameraPostProcess?: boolean): void;

    /**
     * Serializes the texture to a JSON object
     * @returns Serialized texture data
     */
    serialize(): any;

    /**
     * Parses a serialized FireProceduralTexture
     * @param parsedTexture - Parsed JSON data
     * @param scene - The scene to create the texture in
     * @param rootUrl - Root URL for loading resources
     * @returns The parsed FireProceduralTexture instance
     */
    static Parse(
        parsedTexture: any,
        scene: Scene,
        rootUrl: string
    ): FireProceduralTexture;
}