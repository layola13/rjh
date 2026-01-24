/**
 * KHR_lights_punctual extension for glTF 2.0
 * Implements support for punctual lights (directional, point, and spot lights) in glTF files.
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_lights_punctual
 */

import type { IGLTFLoaderExtension } from '../glTFLoaderExtension';
import type { ILoader } from '../glTFLoader';
import type { INode } from '../glTFLoaderInterfaces';
import type { Nullable } from 'core/types';
import type { DirectionalLight, PointLight, SpotLight, Light } from 'core/Lights/light';
import type { TransformNode } from 'core/Meshes/transformNode';
import type { Scene } from 'core/scene';
import type { AssetContainer } from 'core/assetContainer';
import type { Vector3, Color3 } from 'core/Maths/math';

/**
 * Light type enumeration for KHR_lights_punctual extension
 */
type LightType = 'directional' | 'point' | 'spot';

/**
 * Spot light specific properties
 */
interface IKHRLightsPunctual_Spot {
    /** Inner cone angle in radians. Defaults to 0. */
    innerConeAngle?: number;
    /** Outer cone angle in radians. Defaults to PI/4. */
    outerConeAngle?: number;
}

/**
 * Light definition for KHR_lights_punctual extension
 */
interface IKHRLightsPunctual_Light {
    /** Name of the light */
    name?: string;
    /** RGB color of the light in linear space */
    color?: number[];
    /** Brightness multiplier. Defaults to 1. */
    intensity?: number;
    /** Light type: directional, point, or spot */
    type: LightType;
    /** Range hint for attenuation. Defaults to infinity. */
    range?: number;
    /** Spot light specific properties */
    spot?: IKHRLightsPunctual_Spot;
    /** Internal reference to the Babylon light instance */
    _babylonLight?: Light;
}

/**
 * Root extension object containing light definitions
 */
interface IKHRLightsPunctual {
    /** Array of light definitions */
    lights: IKHRLightsPunctual_Light[];
}

/**
 * Node extension data referencing a light index
 */
interface IKHRLightsPunctual_LightReference {
    /** Index of the light in the lights array */
    light: number;
}

/**
 * Loader extension for KHR_lights_punctual
 * Adds support for directional, point, and spot lights to glTF models.
 */
export class KHR_lights implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    public readonly name: string = 'KHR_lights_punctual';

    /**
     * Defines whether this extension is enabled.
     */
    public enabled: boolean;

    /**
     * Reference to the glTF loader
     */
    private _loader: ILoader;

    /**
     * Array of light definitions from the extension
     */
    private _lights?: IKHRLightsPunctual_Light[];

    /**
     * Creates a new KHR_lights_punctual extension instance
     * @param loader The glTF loader
     */
    constructor(loader: ILoader) {
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(this.name);
    }

    /**
     * Disposes of this extension and cleans up resources
     */
    public dispose(): void {
        this._loader = null!;
        delete this._lights;
    }

    /**
     * Called when the loader is loading the glTF file.
     * Extracts light definitions from the root extension object.
     */
    public onLoading(): void {
        const extensions = this._loader.gltf.extensions;
        if (extensions?.[this.name]) {
            const extensionData = extensions[this.name] as IKHRLightsPunctual;
            this._lights = extensionData.lights;
            // Assign array item indices for reference resolution
            ArrayItem.Assign(this._lights);
        }
    }

    /**
     * Loads a node with a light reference
     * @param context The context for logging
     * @param node The glTF node
     * @param assign The function to assign the loaded Babylon transform node
     * @returns A promise that resolves with the loaded transform node
     */
    public loadNodeAsync(
        context: string,
        node: INode,
        assign: (babylonTransformNode: TransformNode) => void
    ): Nullable<Promise<TransformNode>> {
        return GLTFLoader.LoadExtensionAsync<IKHRLightsPunctual_LightReference>(
            context,
            node,
            this.name,
            (extensionContext, extension) => {
                return this._loader.loadNodeAsync(context, node, (babylonNode) => {
                    const light = ArrayItem.Get<IKHRLightsPunctual_Light>(
                        extensionContext,
                        this._lights!,
                        extension.light
                    );

                    const lightName = light.name || babylonNode.name;
                    const scene = this._loader.babylonScene;

                    // Block adding light to scene collection if loading into asset container
                    scene._blockEntityCollection = !!this._loader._assetContainer;

                    let babylonLight: Light;

                    // Create appropriate light type
                    switch (light.type) {
                        case 'directional':
                            babylonLight = new DirectionalLight(
                                lightName,
                                Vector3.Backward(),
                                scene
                            );
                            break;

                        case 'point':
                            babylonLight = new PointLight(
                                lightName,
                                Vector3.Zero(),
                                scene
                            );
                            break;

                        case 'spot': {
                            const spotLight = new SpotLight(
                                lightName,
                                Vector3.Zero(),
                                Vector3.Backward(),
                                0,
                                1,
                                scene
                            );
                            // Set cone angles (glTF uses half-angles, Babylon uses full angles)
                            spotLight.angle = 2 * (light.spot?.outerConeAngle ?? Math.PI / 4);
                            spotLight.innerAngle = 2 * (light.spot?.innerConeAngle ?? 0);
                            babylonLight = spotLight;
                            break;
                        }

                        default:
                            scene._blockEntityCollection = false;
                            throw new Error(
                                `${extensionContext}: Invalid light type (${(light as any).type})`
                            );
                    }

                    // Assign to asset container if present
                    babylonLight._parentContainer = this._loader._assetContainer;
                    scene._blockEntityCollection = false;

                    // Store reference to Babylon light
                    light._babylonLight = babylonLight;

                    // Configure light properties
                    babylonLight.falloffType = Light.FALLOFF_GLTF;
                    babylonLight.diffuse = light.color
                        ? Color3.FromArray(light.color)
                        : Color3.White();
                    babylonLight.intensity = light.intensity ?? 1;
                    babylonLight.range = light.range ?? Number.MAX_VALUE;
                    babylonLight.parent = babylonNode;

                    // Register light with loader
                    this._loader._babylonLights.push(babylonLight);

                    // Add metadata for pointer mapping
                    GLTFLoader.AddPointerMetadata(babylonLight, extensionContext);

                    assign(babylonNode);
                });
            }
        );
    }
}

// Register the extension with the glTF loader
GLTFLoader.RegisterExtension('KHR_lights_punctual', (loader: ILoader) => {
    return new KHR_lights(loader);
});