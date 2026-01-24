/**
 * Checks if the given direction value represents a vertical orientation.
 * 
 * This function uses bitwise AND operation with mask 0b11 (3) to extract
 * the lower 2 bits and checks if the result equals 0b10 (2), which typically
 * indicates a vertical direction in direction enumeration systems.
 * 
 * @param direction - The direction value to check (typically from a direction enum)
 * @returns True if the direction is vertical, false otherwise
 * 
 * @example
 *