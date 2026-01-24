/**
 * 接口：表示具有matches方法的工具对象
 * 用于检查元素是否匹配指定的CSS选择器
 */
interface MatcherUtility {
  /**
   * 检查元素是否匹配给定的CSS选择器
   * @param element - 要检查的DOM节点
   * @param selector - CSS选择器字符串
   * @returns 如果元素匹配选择器则返回true，否则返回false
   */
  matches(element: Node, selector: string): boolean;
}

/**
 * 查询匹配指定选择器的所有直接子节点
 * 
 * 此函数遍历父元素的所有直接子节点，并返回与给定CSS选择器匹配的节点数组。
 * 它不会递归查询嵌套的子元素，仅检查第一层子节点。
 * 
 * @param parentElement - 父DOM元素，其子节点将被查询
 * @param selector - CSS选择器字符串，用于筛选子节点
 * @returns 匹配选择器的子节点数组
 * 
 * @example
 *