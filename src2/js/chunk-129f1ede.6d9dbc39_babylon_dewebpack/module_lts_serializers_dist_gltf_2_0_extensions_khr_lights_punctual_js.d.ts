/**
 * KHR_lights_punctual glTF extension exporter
 * Exports Babylon.js lights to glTF 2.0 KHR_lights_punctual extension
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_lights_punctual
 */

import type { Nullable } from "core/types";
import type { Node } from "core/node";
import type { ShadowLight, DirectionalLight, PointLight, SpotLight, Light } from "core/Lights/light";
import type { Vector3 } from "core/Maths/math.vector";
import type { Quaternion } from "core/Maths/math.vector";
import type { Color3 } from "core/Maths/math.color";
import type { Scene } from "core/scene";
import type { _Exporter } from "../glTFExporter";
import type { INode, IKHRLightsPunctual, IKHRLightsPunctual_Light, IKHRLightsPunctual_LightReference } from "../glTFData";

/**
 * Light type enumeration for KHR_lights_punctual
 */
type LightType = "point" | "directional" | "spot";

/**
 * Spot light specific properties
 */
interface IKHRLightsPunctual_Spot {
    /** Inner cone angle in radians */
    innerConeAngle?: number;
    /** Outer cone angle in radians */
    outerConeAngle?: number;
}

/**
 * Light definition for KHR_lights_punctual extension
 */
interface IKHRLightsPunctual_LightDefinition {
    /** Type of the light */
    type: LightType;
    /** RGB color of the light */
    color?: number[];
    /** Brightness multiplier */
    intensity?: number;
    /** Range/distance of the light */
    range?: number;
    /** Spot light specific properties */
    spot?: IKHRLightsPunctual_Spot;
}

/**
 * Container for all lights in the extension
 */
interface IKHRLightsPunctual_Lights {
    /** Array of light definitions */
    lights: IKHRLightsPunctual_LightDefinition[];
}

/**
 * Exporter extension for KHR_lights_punctual
 * Handles conversion of Babylon.js light nodes to glTF light extension format
 */
export declare class KHR_lights_punctual {
    /** Name of the extension */
    readonly name: "KHR_lights_punctual";
    
    /** Whether this extension is enabled */
    enabled: boolean;
    
    /** Whether this extension is required in the glTF file */
    required: boolean;
    
    /** Reference to the main glTF exporter */
    private readonly _exporter: _Exporter;
    
    /** Collection of exported lights, null if no lights have been exported */
    private _lights: Nullable<IKHRLightsPunctual_Lights>;
    
    /**
     * Creates a new KHR_lights_punctual extension
     * @param exporter The glTF exporter instance
     */
    constructor(exporter: _Exporter);
    
    /**
     * Dispose and release resources
     */
    dispose(): void;
    
    /**
     * Indicates whether this extension was actually used during export
     */
    get wasUsed(): boolean;
    
    /**
     * Called during the export process to write extension data to the glTF
     * Adds the lights array to the glTF extensions object
     */
    onExporting(): void;
    
    /**
     * Post-processes a node after export to add light extension data
     * Converts Babylon.js ShadowLight instances to glTF light definitions
     * @param context Current export context path
     * @param node The glTF node being exported
     * @param babylonNode The source Babylon.js node
     * @param nodeMap Mapping of Babylon.js unique IDs to glTF node indices
     * @returns Promise that resolves to the modified node or null
     */
    postExportNodeAsync(
        context: string,
        node: INode,
        babylonNode: Node,
        nodeMap: { [key: number]: number }
    ): Promise<Nullable<INode>>;
}