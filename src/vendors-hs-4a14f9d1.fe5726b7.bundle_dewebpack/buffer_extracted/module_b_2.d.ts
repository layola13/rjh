/**
 * 从日期结构中提取月份缩写（前3个字符）
 * 
 * @remarks
 * 此函数接收一个包含 tm_mon 属性的日期结构对象，
 * 通过 tm_mon 索引访问月份名称数组，并返回月份名称的前3个字符作为缩写。
 * 
 * @param dateStruct - 包含 tm_mon（月份索引）属性的日期结构对象
 * @returns 月份的3字符缩写（例如："Jan", "Feb", "Mar"）
 * 
 * @example
 *