import { VNode, CreateElement, RenderContext } from 'vue';

/**
 * Props for grid component factory
 */
export interface GridComponentProps {
  /** Element ID attribute */
  id?: string;
  /** HTML tag name to render */
  tag?: string;
}

/**
 * Data object passed to functional component render function
 */
export interface GridComponentData {
  /** Static CSS classes */
  staticClass?: string;
  /** HTML attributes */
  attrs?: Record<string, any>;
  /** DOM properties */
  domProps?: Record<string, any>;
}

/**
 * Render context for grid functional component
 */
export interface GridRenderContext extends RenderContext<GridComponentProps> {
  /** Component props */
  props: GridComponentProps;
  /** Component data (classes, attrs, etc.) */
  data: GridComponentData;
  /** Child VNodes */
  children?: VNode[];
}

/**
 * Options for Vue functional component created by grid factory
 */
export interface GridComponent {
  /** Component name */
  name: string;
  /** Mark as functional component */
  functional: boolean;
  /** Component props definition */
  props: {
    id: { type: StringConstructor };
    tag: {
      type: StringConstructor;
      default: string;
    };
  };
  /** Render function */
  render(
    createElement: CreateElement,
    context: GridRenderContext
  ): VNode;
}

/**
 * Factory function that creates a Vue functional grid component
 * 
 * @param componentName - Base name for the grid component (will be prefixed with 'v-')
 * @returns Vue component definition object
 * 
 * @example
 *