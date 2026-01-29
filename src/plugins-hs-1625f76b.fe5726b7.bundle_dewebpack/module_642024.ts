import { RoomTypeRules } from './11744';
import { HSCore } from './635589';

interface ContentInfo {
  entityId: string;
  seekId: string;
  contentType: string;
  categoryId: string;
}

interface RoomTypeMatch {
  score: number;
  roomType: string;
}

/**
 * Determines the room type based on matching rules
 * @param room - The room entity to analyze
 * @returns The determined room type string, or empty string if no match
 */
export function determineRoomType(room: unknown): string {
  const matches: RoomTypeMatch[] = RoomTypeRules.map((rule) => 
    rule.matchByCategoryOrContentType(room)
  )
    .filter((match) => match.score > 3)
    .sort((a, b) => b.score - a.score);

  return matches[0]?.roomType ?? '';
}

/**
 * Retrieves information about all contents within a specific room
 * @param room - The room entity to query
 * @returns Array of content information objects
 */
export function getContentsInfoInRoom(room: unknown): ContentInfo[] {
  const contentsInfo: ContentInfo[] = [];
  const uniqueParent = room.getUniqueParent();

  if (uniqueParent instanceof HSCore.Model.Layer) {
    uniqueParent.forEachContent((content) => {
      if (content.isContentInRoom(room)) {
        contentsInfo.push({
          entityId: content.id,
          seekId: content.metadata.seekId,
          contentType: content.metadata.contentType.getTypeString(),
          categoryId: content.metadata.categories[0]
        });
      }
    });
  }

  return contentsInfo;
}