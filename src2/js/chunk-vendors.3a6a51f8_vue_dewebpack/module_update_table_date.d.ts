/**
 * 更新表格日期模块
 * @module update:table-date
 */

/**
 * 表格日期的值类型（根据实际使用场景调整）
 */
type TableDateValue = string | Date | number;

/**
 * 包含表格日期属性的对象接口
 */
interface TableDateContainer {
  tableDate: TableDateValue;
}

/**
 * 更新表格日期
 * @param date - 要设置的日期值
 * @returns 返回设置后的日期值
 */
declare function updateTableDate(date: TableDateValue): TableDateValue;

export { updateTableDate, TableDateValue, TableDateContainer };