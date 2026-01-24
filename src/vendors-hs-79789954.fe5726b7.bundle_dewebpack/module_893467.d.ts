/**
 * Utility functions for content filtering and ID generation in HSCore Model system
 */

/**
 * Global ID counter for generating unique identifiers
 */
let idCounter: number = 0;

/**
 * Generates a unique string ID by incrementing an internal counter
 * @returns A unique string identifier
 */
export function idGenerator(): string {
    idCounter++;
    return idCounter.toString();
}

/**
 * Checks if a content item is a valid target based on room type and content type filters
 * @param content - The content item to validate
 * @param context - Optional context containing floor information for room-specific filtering
 * @returns True if the content is a valid target, false otherwise
 */
export function isTargetContent(
    content: HSCore.Model.Content,
    context?: { floor: HSCore.Model.Floor; _isParametricContent: (content: HSCore.Model.Content) => boolean }
): boolean {
    // Check if content is not flagged as removed
    if (!content.isFlagOff(HSCore.Model.EntityFlagEnum.removed)) {
        return false;
    }

    // Exclude specific content types
    if (
        !content.contentType ||
        content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CeilingAttached) ||
        content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedPersonalizedModel) ||
        content instanceof HSCore.Model.Opening ||
        content instanceof HSCore.Model.CornerWindow ||
        content instanceof HSCore.Model.Door ||
        content instanceof HSCore.Model.Window ||
        content instanceof HSCore.Model.BayWindow ||
        content instanceof HSCore.Model.CornerFlatWindow ||
        content instanceof HSCore.Model.POrdinaryWindow ||
        content instanceof HSCore.Model.ParametricOpening
    ) {
        return false;
    }

    // If context is provided, apply room-specific filtering
    if (context) {
        return isRoomSpecificContent(content, context);
    }

    return true;
}

/**
 * Validates content based on room-specific rules
 * @param content - The content item to validate
 * @param context - Context containing floor and parametric content checker
 * @returns True if content matches room-specific criteria
 */
function isRoomSpecificContent(
    content: HSCore.Model.Content,
    context: { floor: HSCore.Model.Floor; _isParametricContent: (content: HSCore.Model.Content) => boolean }
): boolean {
    const { floor, _isParametricContent } = context;

    // Content must be in the room and not be a group or parametric content
    if (
        !content.isContentInRoom(floor) ||
        content instanceof HSCore.Model.Group ||
        _isParametricContent(content)
    ) {
        return false;
    }

    return isAllowedContentTypeForRoom(content, floor.roomType);
}

/**
 * Determines if a content type is allowed in a specific room type
 * @param content - The content item to check
 * @param roomType - The type of room
 * @returns True if the content type is allowed in the room
 */
function isAllowedContentTypeForRoom(content: HSCore.Model.Content, roomType: HSCore.Model.RoomTypeEnum): boolean {
    const RoomType = HSCore.Model.RoomTypeEnum;
    const ContentType = HSCatalog.ContentTypeEnum;

    const allowedContentTypes: HSCatalog.ContentTypeEnum[] = [
        ContentType.SingleSeatSofa,
        ContentType.Table,
        ContentType.Dresser,
        "coffee table - round" as any,
        "coffee table - irregular shape" as any,
        ContentType.CoffeTable,
        ContentType.Chair,
        "armchair" as any,
        "single bed" as any,
        "king-size bed" as any,
        ContentType.StorageUnit,
        ContentType.Armoire,
        ContentType.FloorBasedKitchenCabinet,
        ContentType.NightTable,
        ContentType.MediaUnit,
        ContentType.FloorBasedMediaUnit,
        ContentType.HutchBuffet,
        "side table" as any,
        ContentType.TelevisionWallAttached,
        ContentType.TelevisionOnTopOfOthers,
        ContentType.Rug
    ];

    switch (roomType) {
        case RoomType.Bedroom:
        case RoomType.SecondBathroom:
        case RoomType.MasterBathroom:
        case RoomType.ElderlyRoom:
        case RoomType.NannyRoom:
            return content.contentType.isTypeOf(allowedContentTypes);
        default:
            return false;
    }
}

/**
 * Recursively collects all target content items from a content structure
 * @param source - Content item, array of content, or group to process
 * @param targetCollection - Array to collect valid target content items
 */
export function getTargetContent(
    source: HSCore.Model.Content | HSCore.Model.Content[] | HSCore.Model.Group,
    targetCollection: HSCore.Model.Content[]
): void {
    if (Array.isArray(source)) {
        source.forEach(item => getTargetContent(item, targetCollection));
    } else if (source instanceof HSCore.Model.Group) {
        source.forEachMember(member => getTargetContent(member, targetCollection));
    } else if (source instanceof HSCore.Model.Content && isTargetContent(source)) {
        targetCollection.push(source);
    }
}

/**
 * HSCore namespace declarations
 */
declare namespace HSCore.Model {
    class Content {
        contentType: HSCatalog.ContentType;
        isFlagOff(flag: EntityFlagEnum): boolean;
        isContentInRoom(floor: Floor): boolean;
    }

    class Group extends Content {
        forEachMember(callback: (member: Content) => void): void;
    }

    class Floor {
        roomType: RoomTypeEnum;
    }

    class Opening extends Content {}
    class CornerWindow extends Content {}
    class Door extends Content {}
    class Window extends Content {}
    class BayWindow extends Content {}
    class CornerFlatWindow extends Content {}
    class POrdinaryWindow extends Content {}
    class ParametricOpening extends Content {}

    enum EntityFlagEnum {
        removed
    }

    enum RoomTypeEnum {
        Bedroom,
        SecondBathroom,
        MasterBathroom,
        ElderlyRoom,
        NannyRoom
    }
}

declare namespace HSCatalog {
    class ContentType {
        isTypeOf(types: ContentTypeEnum | ContentTypeEnum[]): boolean;
    }

    enum ContentTypeEnum {
        SingleSeatSofa,
        Table,
        Dresser,
        CoffeTable,
        Chair,
        StorageUnit,
        Armoire,
        FloorBasedKitchenCabinet,
        NightTable,
        MediaUnit,
        FloorBasedMediaUnit,
        HutchBuffet,
        TelevisionWallAttached,
        TelevisionOnTopOfOthers,
        Rug,
        ext_CeilingAttached,
        CustomizedPersonalizedModel
    }
}