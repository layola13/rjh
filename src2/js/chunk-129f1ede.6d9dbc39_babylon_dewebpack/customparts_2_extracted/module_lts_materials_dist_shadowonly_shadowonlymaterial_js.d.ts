/**
 * Material that renders only shadows, making the mesh itself invisible while showing shadows cast upon it.
 * Useful for ground planes or surfaces that should only display shadow information.
 */
declare module "babylonjs-materials/shadowOnly" {
  import { Nullable } from "babylonjs/types";
  import { Matrix } from "babylonjs/Maths/math.vector";
  import { Color3 } from "babylonjs/Maths/math.color";
  import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
  import { IShadowLight } from "babylonjs/Lights/shadowLight";
  import { Scene } from "babylonjs/scene";
  import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
  import { SubMesh } from "babylonjs/Meshes/subMesh";
  import { Mesh } from "babylonjs/Meshes/mesh";
  import { PushMaterial } from "babylonjs/Materials/pushMaterial";
  import { MaterialDefines } from "babylonjs/Materials/materialDefines";

  /**
   * Defines for the ShadowOnly material.
   * Controls various rendering features and optimizations.
   */
  export class ShadowOnlyMaterialDefines extends MaterialDefines {
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
    /** Enable normal calculations */
    NORMAL: boolean;
    /** Number of bone influencers for skeletal animation */
    NUM_BONE_INFLUENCERS: number;
    /** Maximum bones per mesh */
    BonesPerMesh: number;
    /** Enable instanced rendering */
    INSTANCES: boolean;
    /** Apply image processing as post-process */
    IMAGEPROCESSINGPOSTPROCESS: boolean;
    /** Skip final color clamping */
    SKIPFINALCOLORCLAMP: boolean;

    constructor();
  }

  /**
   * Material that only renders shadows, making the mesh transparent except for shadows.
   * Perfect for creating invisible ground planes that catch shadows.
   */
  export class ShadowOnlyMaterial extends PushMaterial {
    /**
     * Flag indicating if alpha blending is needed for this material.
     * @internal
     */
    private _needAlphaBlending: boolean;

    /**
     * The active light used for shadow rendering.
     * @internal
     */
    private _activeLight: Nullable<IShadowLight>;

    /**
     * The color of the shadow. Default is black.
     */
    shadowColor: Color3;

    /**
     * The transparency level of the material (0 = fully transparent, 1 = fully opaque).
     */
    alpha: number;

    /**
     * Creates a new ShadowOnly material.
     * @param name - The name of the material
     * @param scene - The scene the material belongs to
     */
    constructor(name: string, scene: Scene);

    /**
     * Gets or sets the active light for shadow rendering.
     * If set, this light will be prioritized for shadow generation.
     */
    get activeLight(): Nullable<IShadowLight>;
    set activeLight(light: Nullable<IShadowLight>);

    /**
     * Specifies if the material needs alpha blending.
     * @returns True if alpha blending is required
     */
    needAlphaBlending(): boolean;

    /**
     * Specifies if the material needs alpha testing.
     * @returns Always false for ShadowOnly material
     */
    needAlphaTesting(): boolean;

    /**
     * Gets the texture used for alpha testing.
     * @returns Always null for ShadowOnly material
     */
    getAlphaTestTexture(): Nullable<BaseTexture>;

    /**
     * Finds the first shadow-enabled light affecting the mesh.
     * @param mesh - The mesh to check for shadow lights
     * @returns The first light with shadows enabled, or null if none found
     * @internal
     */
    private _getFirstShadowLightForMesh(mesh: AbstractMesh): Nullable<IShadowLight>;

    /**
     * Checks if the material is ready to render for a specific submesh.
     * @param mesh - The mesh to render
     * @param subMesh - The submesh to check
     * @param useInstances - Whether instanced rendering is used
     * @returns True if the material is ready to render
     */
    isReadyForSubMesh(
      mesh: AbstractMesh,
      subMesh: SubMesh,
      useInstances?: boolean
    ): boolean;

    /**
     * Binds the material to the submesh for rendering.
     * @param world - The world matrix
     * @param mesh - The mesh being rendered
     * @param subMesh - The submesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;

    /**
     * Clones the material.
     * @param name - The name of the cloned material
     * @returns A new instance of the material
     */
    clone(name: string): ShadowOnlyMaterial;

    /**
     * Serializes the material to a JSON object.
     * @returns The serialized material
     */
    serialize(): unknown;

    /**
     * Gets the class name of the material.
     * @returns "ShadowOnlyMaterial"
     */
    getClassName(): string;

    /**
     * Parses a serialized material.
     * @param source - The serialized material data
     * @param scene - The scene to create the material in
     * @param rootUrl - The root URL for resources
     * @returns The parsed material instance
     */
    static Parse(source: unknown, scene: Scene, rootUrl: string): ShadowOnlyMaterial;
  }
}