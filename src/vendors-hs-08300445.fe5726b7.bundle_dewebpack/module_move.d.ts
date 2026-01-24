/**
 * Moves an item from one index to another in a collection.
 * 
 * @param sourceIndex - The index of the item to move
 * @param targetIndex - The index to move the item to
 * 
 * @remarks
 * This function performs the following validations:
 * - Ensures sourceIndex and targetIndex are different
 * - Validates that both indices are within valid bounds (0 to collection.length - 1)
 * - Updates both the keys array and the collection array when indices are valid
 * 
 * @example
 *