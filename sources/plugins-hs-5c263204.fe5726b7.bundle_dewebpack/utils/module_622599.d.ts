/**
 * 查询DOM元素并在其渲染完成后返回
 * 
 * @param selector - CSS选择器字符串，用于查询目标DOM元素
 * @param delay - 可选的延迟时间（毫秒），在元素找到后等待指定时间再返回，默认为0
 * @returns Promise<Element | null> - 返回找到的DOM元素，如果超时则返回null
 * 
 * @remarks
 * 此函数会持续查询指定选择器的DOM元素，直到：
 * 1. 元素存在且具有有效的宽度（已渲染）
 * 2. 超过10秒超时时间
 * 
 * 使用requestIdleCallback在浏览器空闲时进行查询，避免阻塞主线程
 */
export declare function handleQueryDomProcess(
  selector: string,
  delay?: number
): Promise<Element | null>;