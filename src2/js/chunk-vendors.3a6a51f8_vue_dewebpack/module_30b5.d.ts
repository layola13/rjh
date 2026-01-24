/**
 * Builds a URL by appending query parameters to the base URL.
 * Handles various parameter formats including objects, arrays, and URLSearchParams.
 * 
 * @param url - The base URL to append parameters to
 * @param params - The parameters to serialize and append (object, array, or URLSearchParams)
 * @param paramsSerializer - Optional custom serializer function for the parameters
 * @returns The complete URL with serialized query parameters appended
 * 
 * @example
 *