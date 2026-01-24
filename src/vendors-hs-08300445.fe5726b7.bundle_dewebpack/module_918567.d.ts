/**
 * 检查一个 DOM 元素是否包含另一个 DOM 元素
 * 
 * @param container - 可能包含目标元素的容器元素
 * @param target - 需要检查的目标元素
 * @returns 如果 container 包含 target 则返回 true，否则返回 false
 * 
 * @remarks
 * 此函数首先尝试使用原生的 `contains` 方法进行检查。
 * 如果不支持，则通过遍历父节点链来判断包含关系。
 * 
 * @example
 *