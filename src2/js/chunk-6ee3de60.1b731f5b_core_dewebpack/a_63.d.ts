/**
 * 检查给定对象是否为调度器(Scheduler)
 * 
 * 调度器是RxJS等响应式编程库中用于控制任务执行时机的核心概念。
 * 有效的调度器必须实现schedule方法来安排异步或同步任务。
 * 
 * @param value - 待检查的对象
 * @returns 如果对象存在且具有函数类型的schedule属性则返回true，否则返回false
 * 
 * @example
 *