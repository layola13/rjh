/**
 * Room type determination and content management utilities
 */

/**
 * Content information within a room
 */
export interface ContentInfo {
  /** Unique identifier for the entity */
  entityId: string;
  /** Seek identifier for content lookup */
  seekId: string;
  /** Type of content as string representation */
  contentType: string;
  /** Primary category identifier */
  categoryId: string;
}

/**
 * Room type matching result with confidence score
 */
export interface RoomTypeMatch {
  /** Matched room type identifier */
  roomType: string;
  /** Confidence score for the match (higher is better) */
  score: number;
}

/**
 * Room type rule interface for matching logic
 */
export interface RoomTypeRule {
  /**
   * Match room type based on category or content type
   * @param room - Room entity to analyze
   * @returns Matching result with score
   */
  matchByCategoryOrContentType(room: RoomEntity): RoomTypeMatch;
}

/**
 * Room entity interface
 */
export interface RoomEntity {
  /** Unique identifier */
  id: string;
  /**
   * Get the unique parent container
   * @returns Parent layer or undefined
   */
  getUniqueParent(): LayerEntity | undefined;
}

/**
 * Content entity within a layer
 */
export interface ContentEntity {
  /** Unique identifier */
  id: string;
  /** Content metadata */
  metadata: {
    /** Seek identifier */
    seekId: string;
    /** Content type descriptor */
    contentType: {
      /**
       * Get string representation of content type
       * @returns Type string
       */
      getTypeString(): string;
    };
    /** Array of category identifiers */
    categories: string[];
  };
  /**
   * Check if content is contained within a room
   * @param room - Room entity to check
   * @returns True if content is in the room
   */
  isContentInRoom(room: RoomEntity): boolean;
}

/**
 * Layer entity that can contain multiple content items
 */
export interface LayerEntity {
  /**
   * Iterate over each content item in the layer
   * @param callback - Function called for each content
   */
  forEachContent(callback: (content: ContentEntity) => void): void;
}

/**
 * Determine the room type based on content and category analysis
 * @param room - Room entity to analyze
 * @returns Determined room type string, or empty string if no match found
 */
export declare function determineRoomType(room: RoomEntity): string;

/**
 * Extract all content information contained within a room
 * @param room - Room entity to query
 * @returns Array of content information objects
 */
export declare function getContentsInfoInRoom(room: RoomEntity): ContentInfo[];