/**
 * Module: module_update_table_date
 * Original ID: update:table-date
 * 
 * Updates the tableDate property on an object
 */

/**
 * Updates the table date property
 * @param target - The target object containing tableDate property
 * @param date - The new date value to set
 * @returns The updated date value
 */
declare function updateTableDate<T extends { tableDate: D }, D = unknown>(
  target: T,
  date: D
): D;

export default updateTableDate;

/**
 * Alternative signature if 'e' is a global/module-scoped object
 */
declare namespace UpdateTableDate {
  interface TableDateContainer<T = unknown> {
    tableDate: T;
  }
  
  type UpdateFunction<T = unknown> = (date: T) => T;
}

export { UpdateTableDate };