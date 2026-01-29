import { RoomTypeRules } from './775602';

interface RoomTypeMatch {
  score: number;
  roomType: string;
}

interface RoomTypeRule {
  matchByCategoryOrContentType(data: unknown): RoomTypeMatch;
}

/**
 * Determines the room type based on the provided data by evaluating against defined rules.
 * 
 * @param data - The data object to evaluate against room type rules
 * @returns A promise that resolves to the determined room type string, or empty string if no match found
 */
export async function determineRoomType(data: unknown): Promise<string> {
  const matches: RoomTypeMatch[] = RoomTypeRules.map((rule: RoomTypeRule) => {
    return rule.matchByCategoryOrContentType(data);
  })
    .filter((match: RoomTypeMatch) => {
      return match.score > 3;
    })
    .sort((a: RoomTypeMatch, b: RoomTypeMatch) => {
      return b.score - a.score;
    });

  return matches[0]?.roomType ?? '';
}