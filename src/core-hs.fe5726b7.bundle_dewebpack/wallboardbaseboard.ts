import { WallMolding } from './WallMolding';
import { MoldingTypeEnum } from './MoldingTypeEnum';
import { Entity } from './Entity';

/**
 * Represents a wall board baseboard molding element.
 * This class extends WallMolding to provide specific functionality for baseboards.
 */
export class WallBoardBaseboard extends WallMolding {
    wallBoardBaseboardPath: unknown;

    constructor(id: string = "", options?: unknown) {
        super(id, options);
        this.wallBoardBaseboardPath = undefined;
        this.type = MoldingTypeEnum.WallBoardBaseboard;
        this.setFlagOn(HSCore.Model.EntityFlagEnum.unselectable);
    }

    /**
     * Creates a deep copy of this WallBoardBaseboard instance.
     * @returns A new WallBoardBaseboard instance with copied properties
     */
    clone(): WallBoardBaseboard {
        const clonedInstance = new WallBoardBaseboard();
        clonedInstance._copyFrom(this);
        return clonedInstance;
    }
}

Entity.registerClass(HSConstants.ModelClass.NgWallBoardBaseboard, WallBoardBaseboard);