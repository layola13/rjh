import { MaterialDefines } from 'core/Materials/materialDefines';
import { PushMaterial } from 'core/Materials/pushMaterial';
import { Scene } from 'core/scene';
import { Mesh } from 'core/Meshes/mesh';
import { SubMesh } from 'core/Meshes/subMesh';
import { AbstractMesh } from 'core/Meshes/abstractMesh';
import { Color3 } from 'core/Maths/math.color';
import { Nullable } from 'core/types';
import { IShadowLight } from 'core/Lights/shadowLight';
import { BaseTexture } from 'core/Materials/Textures/baseTexture';

/**
 * Defines the material options for ShadowOnlyMaterial
 */
export interface IShadowOnlyMaterialDefines extends MaterialDefines {
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
    /** Enable point size rendering */
    POINTSIZE: boolean;
    /** Enable fog rendering */
    FOG: boolean;
    /** Enable normal vectors */
    NORMAL: boolean;
    /** Number of bone influences per vertex */
    NUM_BONE_INFLUENCERS: number;
    /** Number of bones per mesh */
    BonesPerMesh: number;
    /** Enable instanced rendering */
    INSTANCES: boolean;
    /** Apply image processing as post-process */
    IMAGEPROCESSINGPOSTPROCESS: boolean;
    /** Skip final color clamping */
    SKIPFINALCOLORCLAMP: boolean;
    /** Enable cascaded shadow maps level 0 */
    SHADOWCSM0?: boolean;
}

/**
 * Material that renders only shadows, making the mesh itself invisible while preserving shadow casting
 * Useful for creating shadow-receiving planes or ground meshes
 */
export declare class ShadowOnlyMaterial extends PushMaterial {
    /**
     * Color of the shadow (default: black)
     */
    shadowColor: Color3;

    /**
     * Alpha transparency value (0-1)
     */
    alpha: number;

    /**
     * Specific light to use for shadow rendering
     * If not set, uses the first shadow-enabled light found
     */
    activeLight: Nullable<IShadowLight>;

    /**
     * Creates a new ShadowOnlyMaterial instance
     * @param name - Name of the material
     * @param scene - Scene to attach the material to
     */
    constructor(name: string, scene: Scene);

    /**
     * Checks if the material requires alpha blending
     * @returns True if alpha blending is needed
     */
    needAlphaBlending(): boolean;

    /**
     * Checks if the material requires alpha testing
     * @returns Always returns false for this material
     */
    needAlphaTesting(): boolean;

    /**
     * Gets the texture used for alpha testing
     * @returns Always returns null for this material
     */
    getAlphaTestTexture(): Nullable<BaseTexture>;

    /**
     * Checks if the material is ready to render for a specific submesh
     * @param mesh - The mesh to render
     * @param subMesh - The submesh to render
     * @param useInstances - Whether instances are being used
     * @returns True if the material is ready
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;

    /**
     * Binds material properties to the shader for rendering a submesh
     * @param world - World transformation matrix
     * @param mesh - The mesh being rendered
     * @param subMesh - The submesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;

    /**
     * Clones the material
     * @param name - Name for the cloned material
     * @returns Cloned material instance
     */
    clone(name: string): ShadowOnlyMaterial;

    /**
     * Serializes the material to a JSON object
     * @returns Serialized material data
     */
    serialize(): any;

    /**
     * Gets the class name of the material
     * @returns "ShadowOnlyMaterial"
     */
    getClassName(): string;

    /**
     * Parses a serialized material
     * @param source - Serialized material data
     * @param scene - Scene to create the material in
     * @param rootUrl - Root URL for resources
     * @returns Parsed material instance
     */
    static Parse(source: any, scene: Scene, rootUrl: string): ShadowOnlyMaterial;
}