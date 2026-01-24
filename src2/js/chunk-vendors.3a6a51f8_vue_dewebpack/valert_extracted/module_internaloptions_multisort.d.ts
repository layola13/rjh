/**
 * 多列排序配置项
 */
interface MultiSortColumn {
  /** 排序字段名 */
  field: string;
  /** 排序方向：'asc' 升序, 'desc' 降序 */
  order: 'asc' | 'desc';
}

/**
 * 多列排序配置
 * 可以是单个排序配置或多个排序配置的数组
 */
type MultiSortOption = MultiSortColumn | MultiSortColumn[] | null;

/**
 * 更新多列排序配置
 * 
 * 触发 'update:multi-sort' 事件，通知父组件排序配置已变更
 * 用于支持 v-model:multi-sort 双向绑定
 * 
 * @param multiSortOption - 新的排序配置，可以是单列排序、多列排序数组或 null（清除排序）
 * @emits update:multi-sort - 当排序配置改变时触发
 * 
 * @example
 *