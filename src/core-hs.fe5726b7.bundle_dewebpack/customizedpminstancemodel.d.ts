/**
 * Customized PM (Physical Model) Instance Model
 * Handles rendering and graphics data generation for customized DIY model instances
 */

import { BaseObject } from './BaseObject';
import { Util } from './Util';
import { TransUtil } from './TransUtil';

/**
 * Graphics data structure containing mesh definitions and objects
 */
interface GraphicsData {
    /** Array of graphics objects to render */
    objects: GraphicsObject[];
    /** Array of mesh definitions with geometry data */
    meshDefs: MeshDefinition[];
    /** Array of edge information for wireframe rendering */
    edgeInfos: EdgeInfo[];
}

/**
 * Mesh information from the DIY SDK
 */
interface MeshInfo {
    /** Vertex indices forming triangles */
    indices: number[];
    /** Vertex normal vectors */
    normals: number[];
    /** Vertex positions */
    verts: number[];
    /** UV texture coordinates */
    uvs: number[];
    /** Unique identifier for this mesh */
    id: string;
    /** Element ID reference */
    eleId: number;
    /** Whether this is a molding face */
    isMoldingFace?: boolean;
    /** Whether this is a light band face */
    isLightBandFace?: boolean;
}

/**
 * Material information data
 */
interface MaterialInfo {
    /** Base texture URI or data */
    texture?: string;
    /** Normal map texture */
    normalTexture?: string;
    /** Alternative texture URI */
    textureURI?: string;
    /** Diffuse color */
    color?: number;
    /** Material properties */
    [key: string]: unknown;
}

/**
 * Graphics object representing a renderable mesh instance
 */
interface GraphicsObject {
    /** Type of graphics object */
    type: string;
    /** Hierarchical path for graphics tree */
    graphicsPath: string;
    /** Reference to mesh definition */
    mesh: string;
    /** Material properties for rendering */
    material: MaterialObject;
    /** Associated entity ID */
    entityId: string;
    /** Custom attributes for special rendering */
    customAttrs: CustomAttributes;
}

/**
 * Custom attributes for special rendering cases
 */
interface CustomAttributes {
    /** Type of special rendering (e.g., "LightBand") */
    type?: string;
    /** Light band element index */
    lightBandIndex?: number;
}

/**
 * Material object with rendering properties
 */
interface MaterialObject {
    /** Color mode enumeration */
    colorMode?: number;
    /** Diffuse color */
    color?: number;
    /** Normal texture reference */
    normalTexture?: string;
    /** UV transform matrix for diffuse map */
    diffuseMapUvTransform?: THREE.Matrix3;
    /** UV transform matrix for normal map */
    normalMapUvTransform?: THREE.Matrix3;
    /** Additional material properties */
    [key: string]: unknown;
}

/**
 * Mesh definition with complete geometry data
 */
interface MeshDefinition {
    /** Total number of vertices */
    vertexCount: number;
    /** Total number of indices */
    indexCount: number;
    /** Face indices array */
    faceIndices: Uint32Array;
    /** Vertex normal vectors */
    vertexNormals: Float32Array;
    /** Vertex position coordinates */
    vertexPositions: Float32Array;
    /** Vertex UV coordinates */
    vertexUVs: Float32Array;
    /** Unique mesh key identifier */
    meshKey: string;
    /** Face tag identifier */
    faceTag: string;
    /** Shape element ID */
    shapeid: number;
}

/**
 * Edge information for wireframe rendering
 */
interface EdgeInfo {
    /** Edge data structure */
    [key: string]: unknown;
}

/**
 * Result of mesh creation containing both definition and object
 */
interface MeshCreationResult {
    /** Mesh definition with geometry */
    meshDef: MeshDefinition;
    /** Graphics object with material */
    object: GraphicsObject;
}

/**
 * Entity interface representing a customized model instance
 */
interface CustomizedEntity {
    /** Entity unique identifier */
    ID: string;
    /** Modeling document ID */
    modelingDocId: string;
    /** Instance ID within the document */
    instanceId?: string;
    /** Check if DIY document is opened */
    isDiyDocOpened(): boolean;
    /** Check if entity has specific flag set */
    isFlagOn(flag: number): boolean;
    /** Get transformation matrix */
    getTransformMatrix(): THREE.Matrix4;
    /** Get default material data */
    getDefaultMaterialData(): MaterialInfo;
}

/**
 * Customized PM Instance Model
 * Manages rendering and graphics generation for customized DIY model instances.
 * Converts DIY SDK mesh data into graphics objects suitable for rendering.
 */
export class CustomizedPMInstanceModel extends BaseObject {
    /** Internal mesh index counter for unique identification */
    private _index: number = 0;

    /**
     * Creates a new CustomizedPMInstanceModel instance
     * @param entity - The customized entity to render
     * @param parent - Parent object in the scene graph
     * @param context - Rendering context
     */
    constructor(entity: CustomizedEntity, parent: unknown, context: unknown) {
        super(entity, parent, context);
        this._index = 0;

        // Listen for material changes to invalidate geometry
        this.signalHook.listen(entity.signalMaterialChanged, (): void => {
            this.geometryDirty = true;
        });
    }

    /**
     * Converts entity data to graphics data for rendering
     * @returns Graphics data containing meshes, objects, and edge information
     */
    toGraphicsData(): GraphicsData {
        const graphicsData: GraphicsData = {
            objects: [],
            meshDefs: [],
            edgeInfos: []
        };

        // Return empty data if DIY document is not opened
        if (!this.entity.isDiyDocOpened()) {
            return graphicsData;
        }

        // Return empty data if entity is hidden or removed
        if (
            this.entity.isFlagOn(HSCore.Model.EntityFlagEnum.hidden) ||
            this.entity.isFlagOn(HSCore.Model.EntityFlagEnum.removed)
        ) {
            return graphicsData;
        }

        const modelingDocId = this.entity.modelingDocId;
        const instanceIds = this.entity.instanceId ? [this.entity.instanceId] : undefined;
        const rawGraphicsData = DiySdk.DmDiyApi.getGraphicsData(modelingDocId, instanceIds);

        // Process each graphics data item
        for (let i = 0; i < rawGraphicsData.length; ++i) {
            const meshInfoArray = rawGraphicsData[i].meshInfo;
            const materialInfoArray = rawGraphicsData[i].matInfo;

            // Create mesh objects from mesh info
            for (let j = 0; j < meshInfoArray.length; j++) {
                const meshInfo = meshInfoArray[j];
                const materialInfo = materialInfoArray?.[j];
                const meshResult = this._createModelMesh(meshInfo, materialInfo);

                if (meshResult) {
                    graphicsData.meshDefs.push(meshResult.meshDef);
                    graphicsData.objects.push(meshResult.object);
                }
            }

            // Add edge information
            const edgeInfo = rawGraphicsData[i].edgeInfo;
            graphicsData.edgeInfos.push(edgeInfo);
        }

        return graphicsData;
    }

    /**
     * Cleanup resources when object is destroyed
     */
    onCleanup(): void {
        super.onCleanup();
    }

    /**
     * Update local transformation matrix when position changes
     */
    onUpdatePosition(): void {
        const entity = this.entity as CustomizedEntity;
        this._matrixLocal = entity.getTransformMatrix();
        TransUtil.convertMatrixUnit(this._matrixLocal, undefined);
    }

    /**
     * Creates a model mesh with material from mesh and material info
     * @param meshInfo - Mesh geometry information
     * @param materialInfo - Optional material information
     * @returns Mesh creation result or undefined if invalid
     */
    private _createModelMesh(
        meshInfo: MeshInfo,
        materialInfo?: MaterialInfo
    ): MeshCreationResult | undefined {
        // Generate material object
        let materialObject: MaterialObject;
        if (materialInfo) {
            materialObject = Util.getMaterialObject(materialInfo);
            // Use color mode if no textures present
            if (
                !materialInfo.texture &&
                !materialInfo.normalTexture &&
                !materialInfo.textureURI
            ) {
                materialObject.colorMode = HSCore.Material.ColorModeEnum.color;
            }
        } else {
            materialObject = Util.getMaterialObject(this.entity.getDefaultMaterialData());
        }

        // Create graphics object
        const graphicsObject: GraphicsObject = {
            type: HSConstants.GraphicsObjectType.Mesh,
            graphicsPath: `${this.entity.ID}/${this._index}`,
            mesh: `${this.entity.ID}/${this._index}`,
            material: materialObject,
            entityId: this.entity.ID,
            customAttrs: {}
        };

        // Create mesh definition
        const meshDefinition: Partial<MeshDefinition> = {};
        meshDefinition.vertexCount = meshInfo.indices.length;

        // Validate minimum vertex count for a triangle
        if (meshDefinition.vertexCount < 3) {
            return undefined;
        }

        // Populate mesh definition
        meshDefinition.indexCount = meshInfo.indices.length;
        meshDefinition.faceIndices = new Uint32Array(meshInfo.indices);
        meshDefinition.vertexNormals = new Float32Array(meshInfo.normals);
        meshDefinition.vertexPositions = new Float32Array(meshInfo.verts);
        meshDefinition.vertexUVs = new Float32Array(meshInfo.uvs);
        meshDefinition.meshKey = graphicsObject.mesh;
        meshDefinition.faceTag = meshInfo.id;
        meshDefinition.shapeid = meshInfo.eleId;

        // Initialize UV transform matrices
        graphicsObject.material.diffuseMapUvTransform = new THREE.Matrix3();
        graphicsObject.material.normalMapUvTransform = new THREE.Matrix3();

        // Remove normal texture for non-molding faces
        if (graphicsObject.material.normalTexture && !meshInfo.isMoldingFace) {
            graphicsObject.material.normalTexture = '';
        }

        // Increment mesh index
        ++this._index;

        // Handle light band faces with custom rendering
        if (meshInfo.isLightBandFace) {
            graphicsObject.material.color =
                HSConstants.Constants.DEFAULT_CUSTOMIZEDMODEL_MATERIAL.color;
            graphicsObject.customAttrs.type = 'LightBand';
            graphicsObject.customAttrs.lightBandIndex = meshInfo.eleId;
        }

        return {
            meshDef: meshDefinition as MeshDefinition,
            object: graphicsObject
        };
    }
}