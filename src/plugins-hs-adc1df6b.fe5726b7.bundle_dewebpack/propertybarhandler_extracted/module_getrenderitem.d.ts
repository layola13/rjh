/**
 * React component props for rendering an item
 * 用于渲染项目的React组件属性
 */
interface RenderItemProps<TData = unknown, TEntity = unknown> {
  /** 
   * Data to be passed to the render component
   * 传递给渲染组件的数据
   */
  data: TData;
  
  /** 
   * Entity object associated with the render item
   * 与渲染项关联的实体对象
   */
  entity: TEntity;
}

/**
 * Generates a function that creates a React element for rendering an item
 * 生成一个用于创建渲染项React元素的函数
 * 
 * @template TData - Type of the data object
 * @template TEntity - Type of the entity object
 * @param data - The data to be rendered
 * @param entity - The entity associated with the data
 * @returns A function that returns a React element
 */
declare function getRenderItem<TData = unknown, TEntity = unknown>(
  data: TData,
  entity: TEntity
): () => React.ReactElement<RenderItemProps<TData, TEntity>>;

export default getRenderItem;