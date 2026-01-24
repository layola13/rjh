/**
 * 多列排序更新处理函数
 * 
 * 当组件内部的多列排序状态发生变化时，通过此方法向父组件发射更新事件。
 * 这是 Vue 的 v-model 或 .sync 修饰符的典型实现模式。
 * 
 * @param sortConfig - 多列排序配置对象，包含排序列和排序方向等信息
 * @emits update:multi-sort - 向父组件发射排序配置更新事件
 * 
 * @example
 *