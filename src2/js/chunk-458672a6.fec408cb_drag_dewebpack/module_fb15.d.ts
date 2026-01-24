/**
 * Vue Draggable Component
 * A Vue.js component for drag-and-drop functionality based on Sortable.js
 * @module draggable
 */

import { VNode, VNodeComponentOptions, CreateElement, VueConstructor } from 'vue';
import Sortable, { Options as SortableOptions, SortableEvent, MoveEvent } from 'sortablejs';

// ================================================================================
// Type Definitions
// ================================================================================

/**
 * Draggable component props interface
 */
export interface DraggableProps<T = any> {
  /** Sortable.js options (deprecated - use direct props instead) */
  options?: SortableOptions;
  
  /** The list to be draggable */
  list?: T[] | null;
  
  /** Alternative to list prop for v-model usage */
  value?: T[] | null;
  
  /** Disable transitions during drag operations */
  noTransitionOnDrag?: boolean;
  
  /** Function to clone elements when dragging */
  clone?: (original: T) => T;
  
  /** HTML element tag to render (deprecated - use tag instead) */
  element?: string;
  
  /** HTML element tag to render */
  tag?: string;
  
  /** Callback to control move operations */
  move?: ((evt: MoveEvent, originalEvent: Event) => boolean | -1 | 1) | null;
  
  /** Data to pass to the component (props, attrs, on) */
  componentData?: ComponentData | null;
}

/**
 * Component data structure for passing to child components
 */
export interface ComponentData {
  props?: Record<string, any>;
  attrs?: Record<string, any>;
  on?: Record<string, Function>;
}

/**
 * Context of a dragged element
 */
export interface DragContext<T = any> {
  /** Index in the list */
  index: number;
  
  /** The actual element */
  element: T;
  
  /** Future index after potential move */
  futureIndex?: number;
}

/**
 * Related context during move event
 */
export interface RelatedContext<T = any> {
  /** The related component */
  component?: any;
  
  /** The list of the related component */
  list?: T[];
  
  /** Index of the related element */
  index?: number;
  
  /** The related element */
  element?: T;
}

/**
 * Change event payloads
 */
export interface ChangeEvent<T = any> {
  added?: {
    element: T;
    newIndex: number;
  };
  removed?: {
    element: T;
    oldIndex: number;
  };
  moved?: {
    element: T;
    oldIndex: number;
    newIndex: number;
  };
}

/**
 * Render result containing children and offsets
 */
interface RenderResult {
  children: VNode[];
  headerOffset: number;
  footerOffset: number;
}

/**
 * Computed attributes structure
 */
interface ComputedAttributes {
  attrs?: Record<string, any>;
  on?: Record<string, Function>;
  props?: Record<string, any>;
}

// ================================================================================
// Component Data Interface
// ================================================================================

export interface DraggableData {
  /** Whether component is in transition mode */
  transitionMode: boolean;
  
  /** Whether using non-functional component mode */
  noneFunctionalComponentMode: boolean;
  
  /** Visible indexes after filtering hidden elements */
  visibleIndexes?: number[];
  
  /** Current drag context */
  context?: DragContext;
  
  /** Header slot offset */
  headerOffset?: number;
  
  /** Footer slot offset */
  footerOffset?: number;
  
  /** Sortable.js instance */
  _sortable?: Sortable;
}

// ================================================================================
// Component Methods Interface
// ================================================================================

export interface DraggableMethods<T = any> {
  /** Check if component is functional */
  getIsFunctional(): boolean;
  
  /** Get the tag name to render */
  getTag(): string;
  
  /** Update Sortable.js options */
  updateOptions(options: Record<string, any>): void;
  
  /** Get child VNodes */
  getChildrenNodes(): VNode[] | undefined;
  
  /** Compute visible indexes */
  computeIndexes(): void;
  
  /** Get underlying Vue model for an element */
  getUnderlyingVm(element: HTMLElement): DragContext<T> | null;
  
  /** Get potential draggable component from element */
  getUnderlyingPotencialDraggableComponent(element: any): any;
  
  /** Emit change events */
  emitChanges(event: ChangeEvent<T>): void;
  
  /** Alter the list with a function */
  alterList(fn: (list: T[]) => void): void;
  
  /** Splice the list */
  spliceList(...args: any[]): void;
  
  /** Update element position in list */
  updatePosition(oldIndex: number, newIndex: number): void;
  
  /** Get related context from move event */
  getRelatedContextFromMoveEvent(evt: MoveEvent): RelatedContext<T>;
  
  /** Get VM index from visible index */
  getVmIndex(visibleIndex: number): number;
  
  /** Get transition group component */
  getComponent(): any;
  
  /** Reset transition data for an element */
  resetTransitionData(index: number): void;
  
  /** Handler for drag start event */
  onDragStart(evt: SortableEvent): void;
  
  /** Handler for element added event */
  onDragAdd(evt: SortableEvent): void;
  
  /** Handler for element removed event */
  onDragRemove(evt: SortableEvent): void;
  
  /** Handler for element updated event */
  onDragUpdate(evt: SortableEvent): void;
  
  /** Update property with header offset */
  updateProperty(obj: any, property: string): void;
  
  /** Compute future index during move */
  computeFutureIndex(relatedContext: RelatedContext<T>, evt: MoveEvent): number;
  
  /** Handler for drag move event */
  onDragMove(evt: MoveEvent, originalEvent: Event): boolean | -1 | 1;
  
  /** Handler for drag end event */
  onDragEnd(): void;
}

// ================================================================================
// Component Computed Properties Interface
// ================================================================================

export interface DraggableComputed<T = any> {
  /** Root container element */
  rootContainer: HTMLElement;
  
  /** The actual list being used (list or value) */
  realList: T[] | null;
}

// ================================================================================
// Main Component Declaration
// ================================================================================

declare const DraggableComponent: {
  name: 'draggable';
  inheritAttrs: false;
  props: DraggableProps;
  data(): DraggableData;
  render(h: CreateElement): VNode;
  created(): void;
  mounted(): void;
  beforeDestroy(): void;
  computed: DraggableComputed;
  watch: {
    options: {
      handler(newOptions: SortableOptions): void;
      deep: true;
    };
    $attrs: {
      handler(newAttrs: Record<string, any>): void;
      deep: true;
    };
    realList(): void;
  };
  methods: DraggableMethods;
};

export default DraggableComponent;

// ================================================================================
// Event Names Constants
// ================================================================================

/** Sortable.js lifecycle events */
export type SortableLifecycleEvents = 'Start' | 'Add' | 'Remove' | 'Update' | 'End';

/** Sortable.js interaction events */
export type SortableInteractionEvents = 'Choose' | 'Unchoose' | 'Sort' | 'Filter' | 'Clone';

/** All sortable event names */
export type SortableEventNames = 'Move' | SortableLifecycleEvents | SortableInteractionEvents;

// ================================================================================
// Vue Plugin Installation
// ================================================================================

export function install(Vue: VueConstructor): void;