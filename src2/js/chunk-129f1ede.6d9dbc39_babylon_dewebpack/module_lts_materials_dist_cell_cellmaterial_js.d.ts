import type { Nullable } from "core/types";
import type { Matrix } from "core/Maths/math.vector";
import type { Color3 } from "core/Maths/math.color";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { IAnimatable } from "core/Animations/animatable.interface";
import type { IEffectCreationOptions } from "core/Materials/effect";
import type { Mesh } from "core/Meshes/mesh";
import type { SubMesh } from "core/Meshes/subMesh";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { Scene } from "core/scene";
import { MaterialDefines } from "core/Materials/materialDefines";
import { PushMaterial } from "core/Materials/pushMaterial";

/**
 * Defines for the Cell Material shader compilation.
 * Controls which features are enabled in the shader.
 */
export declare class CellMaterialDefines extends MaterialDefines {
    /** Enable diffuse texture sampling */
    DIFFUSE: boolean;
    
    /** Enable clipping plane 1 */
    CLIPPLANE: boolean;
    
    /** Enable clipping plane 2 */
    CLIPPLANE2: boolean;
    
    /** Enable clipping plane 3 */
    CLIPPLANE3: boolean;
    
    /** Enable clipping plane 4 */
    CLIPPLANE4: boolean;
    
    /** Enable clipping plane 5 */
    CLIPPLANE5: boolean;
    
    /** Enable clipping plane 6 */
    CLIPPLANE6: boolean;
    
    /** Enable alpha testing */
    ALPHATEST: boolean;
    
    /** Enable point size rendering */
    POINTSIZE: boolean;
    
    /** Enable fog calculations */
    FOG: boolean;
    
    /** Enable normal attribute */
    NORMAL: boolean;
    
    /** Enable UV1 texture coordinates */
    UV1: boolean;
    
    /** Enable UV2 texture coordinates */
    UV2: boolean;
    
    /** Enable vertex colors */
    VERTEXCOLOR: boolean;
    
    /** Enable vertex alpha */
    VERTEXALPHA: boolean;
    
    /** Number of bone influencers for skinning */
    NUM_BONE_INFLUENCERS: number;
    
    /** Maximum bones per mesh */
    BonesPerMesh: number;
    
    /** Enable instanced rendering */
    INSTANCES: boolean;
    
    /** Enable per-instance colors */
    INSTANCESCOLOR: boolean;
    
    /** Enable N dot L lighting calculation */
    NDOTL: boolean;
    
    /** Enable custom user lighting */
    CUSTOMUSERLIGHTING: boolean;
    
    /** Use basic cell shading mode */
    CELLBASIC: boolean;
    
    /** Enable depth pre-pass */
    DEPTHPREPASS: boolean;
    
    /** Apply image processing as post-process */
    IMAGEPROCESSINGPOSTPROCESS: boolean;
    
    /** Skip final color clamping */
    SKIPFINALCOLORCLAMP: boolean;

    constructor();
}

/**
 * Cell (Toon) Material for creating stylized cartoon-like rendering effects.
 * Implements a non-photorealistic rendering technique with discrete shading bands.
 * 
 * @example
 *