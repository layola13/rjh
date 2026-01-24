/**
 * Activatable Mixin
 * Provides functionality for components that can be activated by user interaction.
 * Supports click, hover, and focus activation modes.
 */

import type { VNode } from 'vue';
import type { Vue } from 'vue/types/vue';

/**
 * Type guard for checking value types
 */
type ActivatorType = string | object;

/**
 * Event listener map for activator events
 */
interface ActivatorListeners {
  click?: (event: Event) => void;
  mouseenter?: (event: MouseEvent) => void;
  mouseleave?: (event: MouseEvent) => void;
  focus?: (event: FocusEvent) => void;
}

/**
 * Activator slot scope properties
 */
interface ActivatorSlotScope {
  /** Whether the component is currently active */
  value: boolean;
  /** Event listeners to bind to the activator element */
  on: ActivatorListeners;
  /** Accessibility attributes for the activator */
  attrs: ActivatorAttributes;
}

/**
 * ARIA attributes for activator elements
 */
interface ActivatorAttributes {
  /** ARIA role */
  role: string;
  /** Indicates popup presence */
  'aria-haspopup': boolean;
  /** Indicates expanded state */
  'aria-expanded': string;
}

/**
 * Value proxy for two-way binding
 */
interface ValueProxy {
  value: boolean;
}

/**
 * Component data structure
 */
interface ActivatableData {
  /** The resolved activator DOM element */
  activatorElement: HTMLElement | null;
  /** VNodes for the activator slot */
  activatorNode: VNode[];
  /** Registered event types */
  events: string[];
  /** Active event listeners */
  listeners: ActivatorListeners;
}

/**
 * Activatable Mixin
 * 
 * Extends Delayable and Toggleable mixins to provide activation behavior.
 * Allows components to be activated via click, hover, or focus interactions.
 * 
 * @mixin
 * @extends Delayable
 * @extends Toggleable
 */
declare const Activatable: {
  /** Component name identifier */
  name: 'activatable';

  /** Component properties */
  props: {
    /**
     * Activator element selector or reference
     * Can be a CSS selector string or a Vue component/element reference
     * @default null
     */
    activator: {
      default: null;
      validator: (value: unknown) => boolean;
    };

    /**
     * Disables the activatable behavior
     * @default false
     */
    disabled: {
      type: typeof Boolean;
      default: boolean;
    };

    /**
     * Whether the activator is internal to the component
     * When true, searches within component; when false, searches document
     * @default false
     */
    internalActivator: {
      type: typeof Boolean;
      default: boolean;
    };

    /**
     * Activates the component on hover
     * @default false
     */
    openOnHover: {
      type: typeof Boolean;
      default: boolean;
    };

    /**
     * Activates the component on focus
     * @default false
     */
    openOnFocus: {
      type: typeof Boolean;
      default: boolean;
    };
  };

  /** Component data factory */
  data(): ActivatableData;

  /** Property watchers */
  watch: {
    /** Reset activator when selector changes */
    activator: 'resetActivator';
    /** Reset activator when focus mode changes */
    openOnFocus: 'resetActivator';
    /** Reset activator when hover mode changes */
    openOnHover: 'resetActivator';
  };

  /** Lifecycle: component mounted */
  mounted(): void;

  /** Lifecycle: before component destruction */
  beforeDestroy(): void;

  methods: {
    /**
     * Registers event listeners on the activator element
     * @returns void
     */
    addActivatorEvents(): void;

    /**
     * Generates the activator VNode with slot scope
     * @returns Array of VNodes for the activator slot
     */
    genActivator(): VNode[];

    /**
     * Generates ARIA attributes for the activator element
     * @returns Accessibility attributes object
     */
    genActivatorAttributes(): ActivatorAttributes;

    /**
     * Generates event listeners based on activation mode
     * @returns Event listener map
     */
    genActivatorListeners(): ActivatorListeners;

    /**
     * Resolves and returns the activator element
     * @param event - Optional triggering event
     * @returns The activator DOM element or null
     */
    getActivator(event?: Event): HTMLElement | null;

    /**
     * Retrieves the default slot content with value proxy
     * @returns Slot content VNodes
     */
    getContentSlot(): VNode | VNode[];

    /**
     * Creates a proxy object for two-way value binding
     * @returns Value proxy with getter/setter
     */
    getValueProxy(): ValueProxy;

    /**
     * Removes all registered event listeners from activator
     * @returns void
     */
    removeActivatorEvents(): void;

    /**
     * Resets the activator by removing old listeners and registering new ones
     * @returns void
     */
    resetActivator(): void;
  };
};

export default Activatable;