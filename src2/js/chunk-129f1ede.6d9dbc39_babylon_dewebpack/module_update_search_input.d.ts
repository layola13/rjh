/**
 * Updates the combox value for the search input module
 * 
 * @module module_update_search_input
 * @originalId update:search-input
 * 
 * @param value - The value to update in the combox
 * @returns The result of updating the combox value with frame "12"
 */
export function updateSearchInput<T = unknown>(value: T): unknown {
    return updateComboxValue(value, "frame", "12");
}

/**
 * Updates a combox control with the specified parameters
 * 
 * @param value - The value to set
 * @param field - The field name to update
 * @param frameId - The frame identifier
 * @returns The updated value or operation result
 */
declare function updateComboxValue<T>(
    value: T,
    field: string,
    frameId: string
): unknown;