/**
 * Encodes a URI component with custom replacements for specific characters.
 * Converts encoded characters back to their readable form for better URL readability.
 * 
 * @param value - The string value to encode
 * @returns The encoded string with specific characters preserved
 */
declare function encodeValue(value: string): string;

/**
 * Serializer function type for custom parameter serialization.
 * 
 * @param params - The parameters object to serialize
 * @returns The serialized string representation
 */
type ParamSerializer = (params: any) => string;

/**
 * Builds a URL by appending query parameters to a base URL.
 * Handles arrays, dates, objects, and various data types in parameters.
 * Supports custom serialization through an optional serializer function.
 * 
 * @param url - The base URL to append parameters to
 * @param params - The parameters object to serialize and append
 * @param serializer - Optional custom serializer function for parameters
 * @returns The complete URL with query parameters appended
 * 
 * @example
 *