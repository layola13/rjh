/**
 * VExpansionPanelContent Component
 * 
 * A component that provides the content area for expansion panels.
 * Handles lazy loading, transitions, and registration with parent expansion panel.
 */

import { VNode, CreateElement } from 'vue';
import { VExpandTransition } from '../transitions';
import Bootable from '../../mixins/bootable';
import Colorable from '../../mixins/colorable';
import { inject } from '../../mixins/registrable';
import { getSlot } from '../../util/helpers';
import mixins from '../../util/mixins';

/**
 * Interface for the parent expansion panel instance
 */
interface ExpansionPanelInstance {
  /** Whether the expansion panel is currently active/expanded */
  isActive: boolean;
  /** Register this content component with the parent panel */
  registerContent(content: VExpansionPanelContent): void;
  /** Unregister this content component from the parent panel */
  unregisterContent(): void;
}

/**
 * Interface for directive configuration
 */
interface DirectiveConfig {
  /** Directive name */
  name: string;
  /** Directive value */
  value: boolean;
}

/**
 * VExpansionPanelContent Component
 * 
 * Provides animated content area for expansion panels with lazy loading support.
 * Automatically registers with parent v-expansion-panel component.
 * 
 * @example
 * <v-expansion-panel>
 *   <v-expansion-panel-content color="primary">
 *     <div>Panel content here</div>
 *   </v-expansion-panel-content>
 * </v-expansion-panel>
 */
export default interface VExpansionPanelContent extends InstanceType<ReturnType<typeof mixins>> {
  /** Reference to parent expansion panel instance */
  expansionPanel: ExpansionPanelInstance;
  /** Color prop inherited from Colorable mixin */
  color?: string;
  /** Method to show lazy content, inherited from Bootable mixin */
  showLazyContent(fn: () => VNode[]): VNode[];
  /** Method to set background color, inherited from Colorable mixin */
  setBackgroundColor(color: string | undefined, data: Record<string, unknown>): Record<string, unknown>;
}

declare const VExpansionPanelContent: {
  new (): {
    /** Component name for Vue DevTools */
    readonly name: 'v-expansion-panel-content';

    /** Reference to parent expansion panel */
    expansionPanel: ExpansionPanelInstance;

    /** Computed property that returns whether the panel is active */
    readonly isActive: boolean;

    /**
     * Lifecycle hook: Register this content with parent panel on creation
     */
    created(): void;

    /**
     * Lifecycle hook: Unregister from parent panel before destruction
     */
    beforeDestroy(): void;

    /**
     * Render function that creates the expansion panel content with transition
     * 
     * @param createElement - Vue's createElement function
     * @returns VNode with expand transition wrapper
     */
    render(createElement: CreateElement): VNode;
  };
};

export default VExpansionPanelContent;