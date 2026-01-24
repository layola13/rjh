/**
 * 检查一个DOM元素是否包含另一个元素
 * 
 * @param container - 可能的父容器元素
 * @param target - 要检查的目标元素
 * @returns 如果container包含target则返回true，否则返回false
 * 
 * @remarks
 * 此函数首先尝试使用原生的Element.contains()方法。
 * 如果不可用，则通过遍历DOM树向上查找父节点来判断包含关系。
 * 
 * @example
 *