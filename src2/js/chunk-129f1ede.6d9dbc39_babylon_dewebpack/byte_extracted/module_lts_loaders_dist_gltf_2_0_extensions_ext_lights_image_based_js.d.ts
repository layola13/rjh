/**
 * Loader extension for glTF EXT_lights_image_based.
 * This extension provides image-based lighting using spherical harmonics and cube textures.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_lights_image_based
 */

import { Observable } from "core/Misc/observable";
import { RawCubeTexture } from "core/Materials/Textures/rawCubeTexture";
import { Quaternion } from "core/Maths/math.vector";
import { Matrix } from "core/Maths/math.vector";
import { SphericalHarmonics } from "core/Maths/sphericalPolynomial";
import { SphericalPolynomial } from "core/Maths/sphericalPolynomial";
import { Scalar } from "core/Maths/math.scalar";
import { GLTFLoader, ArrayItem } from "../glTFLoader";
import { IScene, ILoaderExtension } from "../glTFLoaderInterfaces";
import { Nullable } from "core/types";

/** Extension name */
export const EXT_LIGHTS_IMAGE_BASED_NAME = "EXT_lights_image_based";

/**
 * Represents a single specular image reference in the extension
 */
interface ISpecularImageReference {
    /** Index of the image in the glTF images array */
    [index: number]: number;
}

/**
 * Represents a light definition in EXT_lights_image_based
 */
interface IEXTLightsImageBasedLight {
    /** Optional name of the light */
    name?: string;
    
    /** Intensity/brightness multiplier for the light (default: 1.0) */
    intensity?: number;
    
    /** Rotation quaternion [x, y, z, w] for the light orientation */
    rotation?: [number, number, number, number];
    
    /** Array of spherical harmonic coefficients for irradiance (27 floats: 9 coefficients × 3 RGB channels) */
    irradianceCoefficients?: number[];
    
    /** Size (width/height) of each specular cube map face in pixels */
    specularImageSize: number;
    
    /** 
     * 2D array of image indices: outer array = mip levels, inner array = 6 cube faces 
     * Format: specularImages[mipLevel][faceIndex] = imageIndex
     */
    specularImages: number[][];
    
    /** @internal Cached promise for loaded texture */
    _loaded?: Promise<void>;
    
    /** @internal Resulting Babylon.js texture */
    _babylonTexture?: RawCubeTexture;
}

/**
 * Root structure of EXT_lights_image_based extension in glTF
 */
interface IEXTLightsImageBasedExtension {
    /** Array of image-based lights defined in this extension */
    lights: IEXTLightsImageBasedLight[];
}

/**
 * Scene extension reference to a specific light
 */
interface IEXTLightsImageBasedSceneExtension {
    /** Index into the lights array */
    light: number;
}

/**
 * Loader extension for EXT_lights_image_based.
 * Loads image-based lighting data and applies it as environment texture to the scene.
 */
export class EXT_lights_image_based implements ILoaderExtension {
    /** Name of this extension */
    public readonly name = EXT_LIGHTS_IMAGE_BASED_NAME;
    
    /** Whether this extension is enabled for the current glTF */
    public enabled: boolean;
    
    /** Reference to the parent glTF loader */
    private _loader: GLTFLoader;
    
    /** Array of lights defined in the extension */
    private _lights?: IEXTLightsImageBasedLight[];
    
    /**
     * Creates a new instance of the EXT_lights_image_based extension
     * @param loader The parent glTF loader
     */
    constructor(loader: GLTFLoader) {
        this.name = EXT_LIGHTS_IMAGE_BASED_NAME;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(EXT_LIGHTS_IMAGE_BASED_NAME);
    }
    
    /**
     * Disposes the extension and releases resources
     */
    public dispose(): void {
        this._loader = null!;
        delete this._lights;
    }
    
    /**
     * Called when the glTF is initially loading.
     * Extracts the lights array from the root extension data.
     */
    public onLoading(): void {
        const extensions = this._loader.gltf.extensions;
        
        if (extensions && extensions[this.name]) {
            const extensionData = extensions[this.name] as IEXTLightsImageBasedExtension;
            this._lights = extensionData.lights;
        }
    }
    
    /**
     * Loads a scene with image-based lighting applied.
     * @param context The glTF context string for logging
     * @param scene The glTF scene to load
     * @returns Promise that resolves when the scene and lighting are loaded
     */
    public loadSceneAsync(context: string, scene: IScene): Promise<void> {
        return GLTFLoader.LoadExtensionAsync<IEXTLightsImageBasedSceneExtension>(
            context,
            scene,
            this.name,
            (extensionContext, extension) => {
                const promises: Promise<void>[] = [];
                
                // Load the base scene
                promises.push(this._loader.loadSceneAsync(context, scene));
                
                this._loader.logOpen(`${extensionContext}`);
                
                // Get the light reference
                const light = ArrayItem.Get(
                    `${extensionContext}/light`,
                    this._lights!,
                    extension.light
                );
                
                // Load the light and apply it as environment texture
                promises.push(
                    this._loadLightAsync(
                        `/extensions/${this.name}/lights/${extension.light}`,
                        light
                    ).then((texture) => {
                        this._loader.babylonScene.environmentTexture = texture;
                    })
                );
                
                this._loader.logClose();
                
                return Promise.all(promises).then(() => {});
            }
        );
    }
    
    /**
     * Loads an image-based light and creates a cube texture.
     * @param context The glTF context string for logging
     * @param light The light definition to load
     * @returns Promise that resolves to the created cube texture
     */
    private _loadLightAsync(
        context: string,
        light: IEXTLightsImageBasedLight
    ): Promise<RawCubeTexture> {
        // Return cached promise if already loading/loaded
        if (light._loaded) {
            return light._loaded.then(() => light._babylonTexture!);
        }
        
        const imagePromises: Promise<void>[] = [];
        
        this._loader.logOpen(`${context}`);
        
        // 2D array to store loaded image data: [mipLevel][faceIndex]
        const imageDataArray: ArrayBufferView[][] = new Array(light.specularImages.length);
        
        // Load all specular images for all mip levels
        for (let mipLevel = 0; mipLevel < light.specularImages.length; mipLevel++) {
            const mipImages = light.specularImages[mipLevel];
            imageDataArray[mipLevel] = new Array(mipImages.length);
            
            for (let faceIndex = 0; faceIndex < mipImages.length; faceIndex++) {
                const imageIndex = mipImages[faceIndex];
                const imageContext = `${context}/specularImages/${mipLevel}/${faceIndex}`;
                
                this._loader.logOpen(`${imageContext}`);
                
                const imageData = ArrayItem.Get(
                    imageContext,
                    this._loader.gltf.images!,
                    imageIndex
                );
                
                imagePromises.push(
                    this._loader
                        .loadImageAsync(`/images/${imageIndex}`, imageData)
                        .then((loadedData) => {
                            imageDataArray[mipLevel][faceIndex] = loadedData;
                        })
                );
                
                this._loader.logClose();
            }
        }
        
        this._loader.logClose();
        
        // Create the texture once all images are loaded
        light._loaded = Promise.all(imagePromises).then(() => {
            const cubeTexture = new RawCubeTexture(
                this._loader.babylonScene,
                null,
                light.specularImageSize
            );
            
            cubeTexture.name = light.name ?? "environment";
            light._babylonTexture = cubeTexture;
            
            // Apply intensity
            if (light.intensity != null) {
                cubeTexture.level = light.intensity;
            }
            
            // Apply rotation
            if (light.rotation) {
                let rotationQuaternion = Quaternion.FromArray(light.rotation);
                
                // Invert rotation for left-handed coordinate systems
                if (!this._loader.babylonScene.useRightHandedSystem) {
                    rotationQuaternion = Quaternion.Inverse(rotationQuaternion);
                }
                
                Matrix.FromQuaternionToRef(
                    rotationQuaternion,
                    cubeTexture.getReflectionTextureMatrix()
                );
            }
            
            // Validate and process irradiance coefficients
            if (!light.irradianceCoefficients) {
                throw new Error(`${context}: Irradiance coefficients are missing`);
            }
            
            const sphericalHarmonics = SphericalHarmonics.FromArray(
                light.irradianceCoefficients
            );
            sphericalHarmonics.scaleInPlace(light.intensity ?? 1.0);
            sphericalHarmonics.convertIrradianceToLambertianRadiance();
            
            const sphericalPolynomial = SphericalPolynomial.FromHarmonics(sphericalHarmonics);
            
            // Calculate mip level scaling factor
            const lodScale = (imageDataArray.length - 1) / Scalar.Log2(light.specularImageSize);
            
            // Update the cube texture with RGBD data
            return cubeTexture.updateRGBDAsync(imageDataArray, sphericalPolynomial, lodScale);
        });
        
        return light._loaded.then(() => light._babylonTexture!);
    }
}

// Register the extension with the glTF loader
GLTFLoader.RegisterExtension(EXT_LIGHTS_IMAGE_BASED_NAME, (loader) => {
    return new EXT_lights_image_based(loader);
});