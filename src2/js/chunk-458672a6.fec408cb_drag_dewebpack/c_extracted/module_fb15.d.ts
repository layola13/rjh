/**
 * Vue Draggable Component
 * A Vue component wrapper for SortableJS providing drag-and-drop functionality
 * 
 * @module draggable
 * @requires sortablejs
 */

import type { VNode, VNodeData, ComponentOptions, CreateElement } from 'vue';
import type Sortable from 'sortablejs';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Sortable event types for drag start, add, remove, update, and end
 */
type SortableEvent = 'Start' | 'Add' | 'Remove' | 'Update' | 'End';

/**
 * Sortable interaction event types
 */
type SortableInteractionEvent = 'Choose' | 'Unchoose' | 'Sort' | 'Filter' | 'Clone';

/**
 * All possible Sortable event names
 */
type AllSortableEvents = 'Move' | SortableEvent | SortableInteractionEvent;

/**
 * Context information for a draggable element
 */
interface DraggableContext<T = unknown> {
  /** Index of the element in the list */
  index: number;
  /** The actual element data */
  element: T;
  /** Future index after drag operation (computed) */
  futureIndex?: number;
}

/**
 * Related context from a move event
 */
interface RelatedContext<T = unknown> {
  /** The list containing the related element */
  list?: T[];
  /** The component instance */
  component?: DraggableComponentInstance<T>;
  /** Index of the related element */
  index?: number;
  /** The related element data */
  element?: T;
}

/**
 * Move event parameters
 */
interface MoveEvent<T = unknown> {
  /** The drag event */
  dragged: HTMLElement;
  /** The element being dragged over */
  related: HTMLElement;
  /** The target container */
  to: HTMLElement;
  /** The source container */
  from: HTMLElement;
  /** Whether will insert after the related element */
  willInsertAfter: boolean;
  /** Context of the dragged element */
  draggedContext?: DraggableContext<T>;
  /** Context of the related element */
  relatedContext?: RelatedContext<T>;
}

/**
 * Change events emitted by the draggable component
 */
interface ChangeEvent<T = unknown> {
  /** Element was added */
  added?: {
    element: T;
    newIndex: number;
  };
  /** Element was removed */
  removed?: {
    element: T;
    oldIndex: number;
  };
  /** Element was moved */
  moved?: {
    element: T;
    oldIndex: number;
    newIndex: number;
  };
}

/**
 * SortableJS event object
 */
interface SortableJSEvent {
  /** The dragged element */
  item: HTMLElement & { _underlying_vm_?: unknown };
  /** Source container */
  from: HTMLElement;
  /** Target container */
  to: HTMLElement;
  /** Old index in source */
  oldIndex: number;
  /** New index in target */
  newIndex: number;
  /** Clone element (for clone mode) */
  clone?: HTMLElement;
  /** Pull mode ('clone' or undefined) */
  pullMode?: 'clone' | string;
  /** Related element */
  related?: HTMLElement;
}

/**
 * Component data for rendering
 */
interface ComponentData {
  /** Event handlers */
  on?: Record<string, Function>;
  /** Component props */
  props?: Record<string, unknown>;
  /** HTML attributes */
  attrs?: Record<string, unknown>;
}

/**
 * Draggable component props
 */
interface DraggableProps<T = unknown> {
  /** SortableJS options (deprecated, use direct props instead) */
  options?: Sortable.Options;
  /** The list to make draggable (v-model alternative) */
  list?: T[] | null;
  /** The list to make draggable (v-model) */
  value?: T[] | null;
  /** Disable transitions during drag */
  noTransitionOnDrag?: boolean;
  /** Function to clone elements */
  clone?: (element: T) => T;
  /** Root element tag (deprecated, use 'tag' instead) */
  element?: string;
  /** Root element tag */
  tag?: string;
  /** Callback for move validation */
  move?: ((evt: MoveEvent<T>, originalEvent: Event) => boolean | -1 | 1) | null;
  /** Data to pass to the component */
  componentData?: ComponentData | null;
}

/**
 * Draggable component data
 */
interface DraggableData {
  /** Whether component is in transition mode */
  transitionMode: boolean;
  /** Whether component is non-functional */
  noneFunctionalComponentMode: boolean;
  /** Visible element indexes */
  visibleIndexes?: number[];
}

/**
 * Internal draggable component instance
 */
interface DraggableComponentInstance<T = unknown> {
  /** The real list (list or value prop) */
  realList?: T[];
  /** Get the underlying view model for an element */
  getUnderlyingVm?: (element: HTMLElement) => DraggableContext<T> | null;
  /** Get the visible index mapping */
  getVmIndex?: (index: number) => number;
  /** Child components */
  $children?: DraggableComponentInstance<T>[];
  /** Component options */
  $options?: ComponentOptions<never>;
}

/**
 * Slot data structure
 */
interface SlotData {
  /** Child VNodes */
  children: VNode[] | undefined;
  /** Number of header slot elements */
  headerOffset: number;
  /** Number of footer slot elements */
  footerOffset: number;
}

// ============================================================================
// Constants
// ============================================================================

/** Standard sortable events */
const SORTABLE_EVENTS: readonly SortableEvent[] = ['Start', 'Add', 'Remove', 'Update', 'End'] as const;

/** Interaction events */
const INTERACTION_EVENTS: readonly SortableInteractionEvent[] = ['Choose', 'Unchoose', 'Sort', 'Filter', 'Clone'] as const;

/** All event handler names (e.g., 'onMove', 'onStart', etc.) */
const EVENT_HANDLER_NAMES: readonly string[] = ['Move', ...SORTABLE_EVENTS, ...INTERACTION_EVENTS]
  .map(event => `on${event}`);

/** Currently dragged element reference */
let currentDraggedElement: HTMLElement | null = null;

// ============================================================================
// Component Declaration
// ============================================================================

declare const DraggableComponent: ComponentOptions<never> & {
  name: 'draggable';
  inheritAttrs: false;
  props: DraggableProps;
  data(this: never): DraggableData;
  render(this: DraggableComponentMethods, createElement: CreateElement): VNode;
  created(this: DraggableComponentMethods): void;
  mounted(this: DraggableComponentMethods): void;
  beforeDestroy(this: DraggableComponentMethods): void;
  computed: {
    rootContainer(this: DraggableComponentMethods): HTMLElement;
    realList(this: DraggableComponentMethods): unknown[] | null;
  };
  watch: {
    options: {
      handler(this: DraggableComponentMethods, newOptions: Sortable.Options): void;
      deep: true;
    };
    $attrs: {
      handler(this: DraggableComponentMethods, newAttrs: Record<string, unknown>): void;
      deep: true;
    };
    realList(this: DraggableComponentMethods): void;
  };
  methods: DraggableComponentMethods;
};

/**
 * Component methods interface
 */
interface DraggableComponentMethods {
  /** Internal SortableJS instance */
  _sortable?: Sortable;
  /** Cached context during drag */
  context?: DraggableContext;
  /** Header slot offset */
  headerOffset: number;
  /** Footer slot offset */
  footerOffset: number;
  /** Visible element indexes */
  visibleIndexes?: number[];
  
  /** Get whether component is functional */
  getIsFunctional(): boolean;
  /** Get the root element tag name */
  getTag(): string;
  /** Update SortableJS options */
  updateOptions(options: Record<string, unknown>): void;
  /** Get child VNodes */
  getChildrenNodes(): VNode[] | undefined;
  /** Compute visible element indexes */
  computeIndexes(): void;
  /** Get the underlying Vue model for an element */
  getUnderlyingVm(element: HTMLElement): DraggableContext | null;
  /** Get potential draggable component from element */
  getUnderlyingPotencialDraggableComponent(element: HTMLElement & { __vue__?: unknown }): DraggableComponentInstance;
  /** Emit change events */
  emitChanges(changes: ChangeEvent): void;
  /** Alter the list using a mutator function */
  alterList(mutator: (list: unknown[]) => void): void;
  /** Splice the list */
  spliceList(...args: unknown[]): void;
  /** Update element position in list */
  updatePosition(oldIndex: number, newIndex: number): void;
  /** Get related context from move event */
  getRelatedContextFromMoveEvent(event: SortableJSEvent): RelatedContext;
  /** Get the visible index from raw index */
  getVmIndex(rawIndex: number): number;
  /** Get the transition-group component instance */
  getComponent(): DraggableComponentInstance;
  /** Reset transition data for an element */
  resetTransitionData(index: number): void;
  /** Handle drag start event */
  onDragStart(event: SortableJSEvent): void;
  /** Handle element added event */
  onDragAdd(event: SortableJSEvent): void;
  /** Handle element removed event */
  onDragRemove(event: SortableJSEvent): void;
  /** Handle element updated (reordered) event */
  onDragUpdate(event: SortableJSEvent): void;
  /** Update a property with header offset */
  updateProperty(obj: Record<string, number>, property: string): void;
  /** Compute the future index during drag */
  computeFutureIndex(relatedContext: RelatedContext, event: SortableJSEvent): number;
  /** Handle drag move event */
  onDragMove(event: SortableJSEvent, originalEvent: Event): boolean | -1 | 1;
  /** Handle drag end event */
  onDragEnd(): void;
}

export default DraggableComponent;
export type { 
  DraggableProps, 
  DraggableContext, 
  RelatedContext, 
  MoveEvent, 
  ChangeEvent,
  SortableJSEvent,
  ComponentData
};