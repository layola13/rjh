/**
 * Module: module_getRenderItem
 * Original ID: getRenderItem
 * 
 * Creates a React element with data and entity props.
 * 
 * @returns A React element representing the rendered item
 */
declare function getRenderItem<TData = unknown, TEntity = unknown>(
  data: TData,
  entity: TEntity
): React.ReactElement;

/**
 * Props interface for the render item component
 */
interface RenderItemProps<TData = unknown, TEntity = unknown> {
  /** The data object to be rendered */
  data: TData;
  /** The entity associated with this render item */
  entity: TEntity;
}

export { getRenderItem, RenderItemProps };