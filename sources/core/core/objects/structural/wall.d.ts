import { ExtrudedBody } from './ExtrudedBody';

/**
 * Represents a wall structure that extends from ExtrudedBody.
 * Provides methods for updating and converting wall data to graphics representations.
 */
export class Wall extends ExtrudedBody {
    /**
     * Creates a new Wall instance.
     * 
     * @param param1 - First constructor parameter (type depends on ExtrudedBody implementation)
     * @param param2 - Second constructor parameter (type depends on ExtrudedBody implementation)
     * @param param3 - Third constructor parameter (type depends on ExtrudedBody implementation)
     * @param param4 - Fourth constructor parameter (type depends on ExtrudedBody implementation)
     */
    constructor(param1: unknown, param2: unknown, param3: unknown, param4: unknown);

    /**
     * Updates the wall state.
     * Calls the parent ExtrudedBody's update implementation.
     */
    onUpdate(): void;

    /**
     * Asynchronously converts wall data to graphics data.
     * Returns empty mesh definitions and objects if conversion fails.
     * 
     * @returns Promise resolving to graphics data with mesh definitions and objects
     */
    toGraphicsDataAsync(): Promise<GraphicsData>;

    /**
     * Synchronously converts wall data to graphics data.
     * 
     * @returns Graphics data with mesh definitions and objects
     */
    toGraphicsData(): GraphicsData;
}

/**
 * Graphics data structure containing mesh definitions and scene objects.
 */
interface GraphicsData {
    /** Array of mesh definitions */
    meshDefs: unknown[];
    /** Array of scene objects */
    objects: unknown[];
}