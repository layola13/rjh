/**
 * Module: TgLayerInfo
 * Provides layer information management including rooms, walls, slabs, and spatial relationships.
 */

import { Ceiling } from './14269';
import { Face } from './82625';
import { Floor } from './47264';
import { SlabFaceType } from './94828';
import { Wall } from './41464';
import { StructureFaceInfo } from './44681';
import { TgRoomInfo } from './40239';
import { TgSlabInfo } from './98956';
import { TgWallInfo } from './93600';
import { NCustomizedStructure } from './73858';
import { SlabFaceInfo } from './83936';
import { BeamFaceInfo } from './15975';
import { Plane, Loop, MathAlg, PolyCurve } from './55256';
import { TgWallUtil } from './85492';
import { TgUtil } from './93932';
import { BeamFaceType } from './80300';
import { SpaceInfo } from './8711';
import { Logger } from './41861';

/**
 * Enum representing overlap quality levels between geometric entities.
 */
export enum OverlapQuality {
    /** No overlap detected */
    No = 0,
    /** Partial overlap detected */
    Yes = 1,
    /** Complete/perfect overlap detected */
    Perfect = 2
}

/**
 * Represents a 2D path with an outer boundary and optional holes.
 */
interface Path2D {
    outer: any[];
    holes: any[][];
}

/**
 * Represents curve information with optional region labeling.
 */
interface CurveInfo {
    lregion?: string;
    curve: any;
}

/**
 * Represents a processing result containing a list of processed items.
 */
interface ProcessingResult {
    list: Array<{
        oldId?: string;
        outer: Array<{ edge: { curve: any }; isRev: boolean }>;
        holes: Array<Array<{ edge: { curve: any }; isRev: boolean }>>;
    }>;
}

/**
 * Main class for managing layer information including walls, rooms, slabs, and spatial relationships.
 * Provides methods to query and retrieve information about various geometric entities within a layer.
 */
export declare class TgLayerInfo {
    /** The associated layer instance */
    readonly layer: any;

    /** Map of wall IDs to wall information */
    private readonly _wallInfoMap: Map<string, TgWallInfo>;

    /** Map of structure face IDs to face information */
    private readonly _structureFaceInfoMap: Map<string, StructureFaceInfo>;

    /** Map of beam face IDs to face information */
    private readonly _beamFaceInfoMap: Map<string, BeamFaceInfo>;

    /** Map of slab face IDs to face information */
    private readonly _slabFaceInfoMap: Map<string, SlabFaceInfo>;

    /** Map of slab IDs to slab information */
    private readonly _slabInfoMap: Map<string, TgSlabInfo>;

    /** Raw room information data from the layer */
    private readonly _rawRoomInfos: any[];

    /** Map of structure face IDs to associated room information */
    private readonly _structureFaceRoomInfosMap: Map<string, TgRoomInfo[]>;

    /** Map of floor IDs to associated room information */
    private readonly _floorRoomInfosMap: Map<string, TgRoomInfo[]>;

    /** Map of ceiling IDs to associated room information */
    private readonly _ceilingRoomInfosMap: Map<string, TgRoomInfo[]>;

    /** Map of wall IDs to associated room information */
    private readonly _wallRoomInfosMap: Map<string, TgRoomInfo[]>;

    /** Map of raw room info to processed room information */
    private readonly _roomInfoMap: Map<any, TgRoomInfo>;

    /** Map of room region IDs to space information */
    private _spaceInfoMap: Map<string, SpaceInfo[]>;

    /**
     * Creates a new TgLayerInfo instance.
     * @param layer - The layer to analyze and manage information for
     */
    constructor(layer: any);

    /**
     * Initializes all layer information maps and relationships.
     * Processes walls, faces, slabs, rooms, and spatial data.
     */
    init(): void;

    /**
     * Retrieves all room infos that contain the specified structure face.
     * @param face - The structure face to query
     * @returns Array of room infos containing this face
     */
    private _getStructureFaceRoomInfos(face: Face): TgRoomInfo[];

    /**
     * Retrieves all room infos that contain the specified floor.
     * @param floor - The floor to query
     * @returns Array of room infos containing this floor
     */
    private _getFloorRoomInfos(floor: Floor): TgRoomInfo[];

    /**
     * Retrieves all room infos that contain the specified ceiling.
     * @param ceiling - The ceiling to query
     * @returns Array of room infos containing this ceiling
     */
    private _getCeilingRoomInfos(ceiling: Ceiling): TgRoomInfo[];

    /**
     * Retrieves all room infos that contain the specified wall.
     * @param wall - The wall to query
     * @returns Array of room infos containing this wall
     */
    private _getWallRoomInfos(wall: Wall): TgRoomInfo[];

    /**
     * Retrieves raw face information from the parent entity's room builder.
     * @param face - The face to query
     * @returns Raw face info or undefined if not found
     */
    private _getRawFaceInfo(face: Face): any | undefined;

    /**
     * Retrieves raw slab information from the parent entity's slab builder.
     * @param slab - The floor slab to query
     * @returns Raw slab info or undefined if not found
     */
    private _getRawSlabInfo(slab: Floor): any | undefined;

    /**
     * Finds the slab info that contains the specified structure face.
     * @param face - The structure face to search for
     * @returns Slab info containing this face or undefined
     */
    private _getStructureFaceSlabInfo(face: Face): TgSlabInfo | undefined;

    /**
     * Gets all space infos across all room regions.
     * @returns Array of all space infos
     */
    getSpaceInfos(): SpaceInfo[];

    /**
     * Gets space infos for a specific room region.
     * @param region - The room region to query
     * @returns Array of space infos for this region
     */
    getSpaceInfosByRoomRegion(region: any): SpaceInfo[];

    /**
     * Gets wall information for the specified wall.
     * @param wall - The wall to query
     * @returns Wall info or undefined if not found
     */
    getWallInfo(wall: Wall): TgWallInfo | undefined;

    /**
     * Gets structure face information for the specified face.
     * @param face - The structure face to query
     * @returns Structure face info or undefined if not found
     */
    getStructureFaceInfo(face: Face): StructureFaceInfo | undefined;

    /**
     * Gets beam face information for the specified face.
     * @param face - The beam face to query
     * @returns Beam face info or undefined if not found
     */
    getBeamFaceInfo(face: Face): BeamFaceInfo | undefined;

    /**
     * Gets slab information for the specified slab.
     * @param slab - The floor slab to query
     * @returns Slab info or undefined if not found
     */
    getSlabInfo(slab: Floor): TgSlabInfo | undefined;

    /**
     * Gets slab face information for the specified face.
     * @param face - The slab face to query
     * @returns Slab face info or undefined if not found
     */
    getSlabFaceInfo(face: Face): SlabFaceInfo | undefined;

    /**
     * Gets all room infos associated with the specified floor.
     * @param floor - The floor to query
     * @returns Array of room infos (empty if none found)
     */
    getFloorRoomInfos(floor: Floor): TgRoomInfo[];

    /**
     * Gets all room infos associated with the specified ceiling.
     * @param ceiling - The ceiling to query
     * @returns Array of room infos (empty if none found)
     */
    getCeilingRoomInfos(ceiling: Ceiling): TgRoomInfo[];

    /**
     * Gets all room infos associated with the specified structure face.
     * @param face - The structure face to query
     * @returns Array of room infos (empty if none found)
     */
    getStructureFaceRoomInfos(face: Face): TgRoomInfo[];

    /**
     * Gets all room infos associated with the specified beam face.
     * @param face - The beam face to query
     * @returns Array of room infos containing this beam face
     */
    getBeamFaceRoomInfos(face: Face): TgRoomInfo[];

    /**
     * Gets all room infos associated with the specified wall.
     * @param wall - The wall to query
     * @returns Array of room infos (empty if none found)
     */
    getWallRoomInfos(wall: Wall): TgRoomInfo[];

    /**
     * Gets all room information objects.
     */
    get roomInfos(): TgRoomInfo[];

    /**
     * Gets all slab information objects.
     */
    get slabInfos(): TgSlabInfo[];

    /**
     * Finds walls that are not associated with any room.
     * @returns Array of isolated walls
     */
    getIsolatedWalls(): Wall[];

    /**
     * Gets all room infos associated with the specified face based on its type.
     * Determines face type (floor, ceiling, structure, beam) and returns appropriate room infos.
     * @param face - The face to query
     * @returns Array of room infos associated with this face
     */
    getFaceRoomInfos(face: Face): TgRoomInfo[];

    /**
     * Builds and returns a map of room regions to their space information.
     * Analyzes spatial relationships between rooms, structures, floors, ceilings, beams, and slabs.
     * @returns Map of room region IDs to arrays of space infos
     */
    private _getSpaceInfoMap(): Map<string, SpaceInfo[]>;

    /**
     * Checks if a curve is contained within a path defined by loops.
     * @param loops - Array of loops defining the path boundaries
     * @param curve - The curve to test
     * @returns OverlapQuality indicating if curve is inside path
     */
    private _isCurveInPath(loops: Loop[], curve: any): OverlapQuality;

    /**
     * Checks if a curve overlaps with a path defined by loops.
     * @param loops - Array of loops defining the path boundaries
     * @param curve - The curve to test for overlap
     * @returns OverlapQuality indicating degree of overlap (No, Yes, or Perfect)
     */
    private _isCurveOverlapPath(loops: Loop[], curve: any): OverlapQuality;

    /**
     * Splits a region into multiple paths based on split curves.
     * Uses boolean operations to generate final path geometries.
     * @param region - The room region containing path and split curves
     * @returns Array of resulting paths after splitting
     */
    private _getSpacePaths(region: { path: Path2D; splitCurves: Array<{ curve: any }> }): Path2D[];
}