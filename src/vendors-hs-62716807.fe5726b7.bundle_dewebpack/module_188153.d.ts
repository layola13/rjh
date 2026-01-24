/**
 * 安全地获取对象属性描述符中的特定字段值
 * 
 * @param target - 目标对象
 * @param propertyKey - 属性键名
 * @param descriptorField - 属性描述符的字段名（如 'get', 'set', 'value', 'writable' 等）
 * @returns 返回描述符字段的值，如果获取失败则返回 undefined
 * 
 * @example
 *