/**
 * Module: KHR_animation_pointer.data
 * glTF 2.0 Extension for animating arbitrary properties via JSON Pointer
 */

import { Animation } from "core/Animations/animation";
import { Color3 } from "core/Maths/math.color";
import { AnimationPropertyInfo } from "../glTFLoaderAnimation";
import type { IAnimatable } from "core/Animations/animatable.interface";
import type { ILoaderNode, ILoaderMaterial, ILoaderLight, ILoaderCamera } from "../glTFLoaderInterfaces";

/**
 * Converts RGB color array to Color3 with scale factor
 * @param context - Animation context
 * @param values - Source color array
 * @param index - Starting index in array
 * @param scale - Scale multiplier
 * @returns Scaled Color3 instance
 */
function createScaledColor(
    context: unknown,
    values: ArrayLike<number>,
    index: number,
    scale: number
): Color3 {
    return Color3.FromArray(values, index).scale(scale);
}

/**
 * Gets a single float value from array with scale
 * @param context - Animation context
 * @param values - Source value array
 * @param index - Array index
 * @param scale - Scale multiplier
 * @returns Scaled float value
 */
function getScaledValue(
    context: unknown,
    values: ArrayLike<number>,
    index: number,
    scale: number
): number {
    return values[index] * scale;
}

/**
 * Gets a negated float value from array with scale
 * @param context - Animation context
 * @param values - Source value array
 * @param index - Array index
 * @param scale - Scale multiplier
 * @returns Negated scaled float value
 */
function getNegatedValue(
    context: unknown,
    values: ArrayLike<number>,
    index: number,
    scale: number
): number {
    return -values[index] * scale;
}

/**
 * Gets the second element from array with scale
 * @param context - Animation context
 * @param values - Source value array
 * @param index - Starting array index
 * @param scale - Scale multiplier
 * @returns Scaled value at index+1
 */
function getOffsetValue(
    context: unknown,
    values: ArrayLike<number>,
    index: number,
    scale: number
): number {
    return values[index + 1] * scale;
}

/**
 * Gets a float value doubled with scale
 * @param context - Animation context
 * @param values - Source value array
 * @param index - Array index
 * @param scale - Scale multiplier
 * @returns Doubled scaled value
 */
function getDoubledValue(
    context: unknown,
    values: ArrayLike<number>,
    index: number,
    scale: number
): number {
    return values[index] * scale * 2;
}

/**
 * Creates texture transform animation properties
 * @param propertyPrefix - Target texture property name
 * @returns Animation property descriptors for scale, offset, rotation
 */
function createTextureTransformAnimations(propertyPrefix: string): {
    scale: AnimationPropertyInfo[];
    offset: AnimationPropertyInfo[];
    rotation: AnimationPropertyInfo[];
} {
    return {
        scale: [
            new AnimationPropertyInfo(
                Animation.ANIMATIONTYPE_FLOAT,
                `${propertyPrefix}.uScale`,
                getScaledValue,
                () => 2
            ),
            new AnimationPropertyInfo(
                Animation.ANIMATIONTYPE_FLOAT,
                `${propertyPrefix}.vScale`,
                getOffsetValue,
                () => 2
            )
        ],
        offset: [
            new AnimationPropertyInfo(
                Animation.ANIMATIONTYPE_FLOAT,
                `${propertyPrefix}.uOffset`,
                getScaledValue,
                () => 2
            ),
            new AnimationPropertyInfo(
                Animation.ANIMATIONTYPE_FLOAT,
                `${propertyPrefix}.vOffset`,
                getOffsetValue,
                () => 2
            )
        ],
        rotation: [
            new AnimationPropertyInfo(
                Animation.ANIMATIONTYPE_FLOAT,
                `${propertyPrefix}.wAng`,
                getNegatedValue,
                () => 1
            )
        ]
    };
}

/**
 * Animation property info for camera properties
 */
declare class CameraAnimationPropertyInfo extends AnimationPropertyInfo {
    /**
     * Builds animations for camera targets
     * @param target - Loader camera node
     * @param animationName - Animation identifier
     * @param fps - Frames per second
     * @param keys - Animation keyframes
     * @param callback - Callback to apply built animation
     */
    buildAnimations(
        target: ILoaderCamera,
        animationName: string,
        fps: number,
        keys: unknown[],
        callback: (target: IAnimatable, animation: Animation) => void
    ): void;
}

/**
 * Animation property info for material properties
 */
declare class MaterialAnimationPropertyInfo extends AnimationPropertyInfo {
    /**
     * Builds animations for all materials in target
     * @param target - Loader material node
     * @param animationName - Animation identifier
     * @param fps - Frames per second
     * @param keys - Animation keyframes
     * @param callback - Callback to apply built animation
     */
    buildAnimations(
        target: ILoaderMaterial,
        animationName: string,
        fps: number,
        keys: unknown[],
        callback: (target: IAnimatable, animation: Animation) => void
    ): void;
}

/**
 * Animation property info for light properties
 */
declare class LightAnimationPropertyInfo extends AnimationPropertyInfo {
    /**
     * Builds animations for light targets
     * @param target - Loader light node
     * @param animationName - Animation identifier
     * @param fps - Frames per second
     * @param keys - Animation keyframes
     * @param callback - Callback to apply built animation
     */
    buildAnimations(
        target: ILoaderLight,
        animationName: string,
        fps: number,
        keys: unknown[],
        callback: (target: IAnimatable, animation: Animation) => void
    ): void;
}

/**
 * Animation pointer tree structure mapping glTF JSON paths to Babylon.js animation properties.
 * Defines all supported animation targets for KHR_animation_pointer extension.
 */
export declare const animationPointerTree: {
    /** Node-level animations (transforms, visibility, etc.) */
    nodes: {
        __array__: Record<string, unknown> & {
            __target__: true;
        };
    };

    /** Material property animations */
    materials: {
        __array__: {
            __target__: true;

            /** PBR Metallic-Roughness workflow properties */
            pbrMetallicRoughness: {
                baseColorFactor: MaterialAnimationPropertyInfo[];
                metallicFactor: MaterialAnimationPropertyInfo[];
                roughnessFactor: MaterialAnimationPropertyInfo[];
                baseColorTexture: {
                    extensions: {
                        KHR_texture_transform: ReturnType<typeof createTextureTransformAnimations>;
                    };
                };
            };

            /** Emissive color animation */
            emissiveFactor: MaterialAnimationPropertyInfo[];

            /** Normal map strength */
            normalTexture: {
                scale: MaterialAnimationPropertyInfo[];
            };

            /** Ambient occlusion properties */
            occlusionTexture: {
                strength: MaterialAnimationPropertyInfo[];
                extensions: {
                    KHR_texture_transform: ReturnType<typeof createTextureTransformAnimations>;
                };
            };

            /** Emissive texture transform */
            emissiveTexture: {
                extensions: {
                    KHR_texture_transform: ReturnType<typeof createTextureTransformAnimations>;
                };
            };

            /** Material extension properties */
            extensions: {
                /** Index of refraction */
                KHR_materials_ior: {
                    ior: MaterialAnimationPropertyInfo[];
                };

                /** Clear coat layer */
                KHR_materials_clearcoat: {
                    clearcoatFactor: MaterialAnimationPropertyInfo[];
                    clearcoatRoughnessFactor: MaterialAnimationPropertyInfo[];
                };

                /** Sheen layer */
                KHR_materials_sheen: {
                    sheenColorFactor: MaterialAnimationPropertyInfo[];
                    sheenRoughnessFactor: MaterialAnimationPropertyInfo[];
                };

                /** Specular workflow */
                KHR_materials_specular: {
                    specularFactor: MaterialAnimationPropertyInfo[];
                    specularColorFactor: MaterialAnimationPropertyInfo[];
                };

                /** Emissive strength multiplier */
                KHR_materials_emissive_strength: {
                    emissiveStrength: MaterialAnimationPropertyInfo[];
                };

                /** Light transmission */
                KHR_materials_transmission: {
                    transmissionFactor: MaterialAnimationPropertyInfo[];
                };

                /** Volumetric properties */
                KHR_materials_volume: {
                    attenuationColor: MaterialAnimationPropertyInfo[];
                    attenuationDistance: MaterialAnimationPropertyInfo[];
                    thicknessFactor: MaterialAnimationPropertyInfo[];
                };

                /** Iridescence effect */
                KHR_materials_iridescence: {
                    iridescenceFactor: MaterialAnimationPropertyInfo[];
                    iridescenceIor: MaterialAnimationPropertyInfo[];
                    iridescenceThicknessMinimum: MaterialAnimationPropertyInfo[];
                    iridescenceThicknessMaximum: MaterialAnimationPropertyInfo[];
                };
            };
        };
    };

    /** Camera property animations */
    cameras: {
        __array__: {
            __target__: true;

            /** Orthographic camera properties */
            orthographic: {
                xmag: CameraAnimationPropertyInfo[];
                ymag: CameraAnimationPropertyInfo[];
                zfar: CameraAnimationPropertyInfo[];
                znear: CameraAnimationPropertyInfo[];
            };

            /** Perspective camera properties */
            perspective: {
                yfov: CameraAnimationPropertyInfo[];
                zfar: CameraAnimationPropertyInfo[];
                znear: CameraAnimationPropertyInfo[];
            };
        };
    };

    /** Extension-specific animations */
    extensions: {
        /** Punctual lights extension */
        KHR_lights_punctual: {
            lights: {
                __array__: {
                    __target__: true;

                    /** Light color */
                    color: LightAnimationPropertyInfo[];

                    /** Light intensity */
                    intensity: LightAnimationPropertyInfo[];

                    /** Light range */
                    range: LightAnimationPropertyInfo[];

                    /** Spotlight cone angles */
                    spot: {
                        innerConeAngle: LightAnimationPropertyInfo[];
                        outerConeAngle: LightAnimationPropertyInfo[];
                    };
                };
            };
        };
    };
};