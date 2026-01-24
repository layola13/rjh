/**
 * Updates the items-per-page value by emitting an update event to the parent component.
 * 
 * This method is typically used in pagination components to notify parent components
 * when the user changes the number of items displayed per page.
 * 
 * @param itemsPerPage - The new number of items to display per page
 * @emits update:items-per-page - Emitted when the items per page value changes
 * 
 * @example
 *