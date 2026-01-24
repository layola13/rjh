/**
 * Updates the items per page setting
 * Emits an "update:items-per-page" event with the new page size
 * 
 * @param itemsPerPage - The new number of items to display per page
 * @returns The result of the event emission (typically void or boolean)
 */
declare function updateItemsPerPage(itemsPerPage: number): void;

export = updateItemsPerPage;