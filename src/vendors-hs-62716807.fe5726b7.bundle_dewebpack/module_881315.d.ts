/**
 * Filters object properties to only include valid HTML attributes.
 * Keeps data-*, aria-*, and role attributes, but excludes data-__* attributes.
 * 
 * @param attributes - Source object containing potential HTML attributes
 * @returns Filtered object containing only valid HTML attributes
 * 
 * @example
 *