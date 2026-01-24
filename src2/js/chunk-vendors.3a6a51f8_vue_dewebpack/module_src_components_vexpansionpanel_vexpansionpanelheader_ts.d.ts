/**
 * VExpansionPanelHeader Component
 * 
 * A header component for expansion panels that provides click interactions,
 * icon animations, and visual feedback through ripple effects.
 * 
 * @module VExpansionPanelHeader
 */

import { VFadeTransition } from '../transitions';
import VIcon from '../VIcon';
import Colorable from '../../mixins/colorable';
import { inject } from '../../mixins/registrable';
import Ripple from '../../directives/ripple';
import { getSlot } from '../../util/helpers';
import mixins from '../../util/mixins';
import { VNode, VNodeData, CreateElement } from 'vue';
import { PropType } from 'vue/types/options';

/**
 * Ripple directive configuration type
 */
type RippleValue = boolean | {
  class?: string;
  center?: boolean;
};

/**
 * Expansion panel injection interface
 */
interface ExpansionPanel {
  /** Whether the panel is currently expanded */
  isActive: boolean;
  /** Whether the panel is disabled */
  isDisabled: boolean;
  /** Whether the panel is readonly */
  isReadonly: boolean;
  /** Register a header component */
  registerHeader(header: VExpansionPanelHeader): void;
  /** Unregister the header component */
  unregisterHeader(): void;
}

/**
 * Default slot scope data
 */
interface DefaultSlotScope {
  /** Whether the panel is open/active */
  open: boolean;
}

/**
 * Component data interface
 */
interface ComponentData {
  /** Tracks if mouse button is currently pressed */
  hasMousedown: boolean;
}

/**
 * VExpansionPanelHeader Component
 * 
 * Interactive header for expansion panels with icon rotation animation,
 * ripple effects, and customizable actions slot.
 */
const VExpansionPanelHeader = mixins(
  Colorable,
  inject('expansionPanel', 'v-expansion-panel-header', 'v-expansion-panel')
).extend({
  name: 'v-expansion-panel-header',

  directives: {
    ripple: Ripple,
  },

  props: {
    /**
     * Disable the expand icon rotation animation
     */
    disableIconRotate: Boolean,

    /**
     * The icon to use for the expand indicator
     * @default '$expand'
     */
    expandIcon: {
      type: String,
      default: '$expand',
    } as PropType<string>,

    /**
     * Hide the actions/icon area
     */
    hideActions: Boolean,

    /**
     * Enable ripple effect or configure ripple options
     * @default false
     */
    ripple: {
      type: [Boolean, Object] as PropType<RippleValue>,
      default: false,
    },
  },

  data(): ComponentData {
    return {
      hasMousedown: false,
    };
  },

  computed: {
    /**
     * CSS classes for the header element
     */
    classes(): Record<string, boolean> {
      return {
        'v-expansion-panel-header--active': this.isActive,
        'v-expansion-panel-header--mousedown': this.hasMousedown,
      };
    },

    /**
     * Whether the parent panel is currently active/expanded
     */
    isActive(): boolean {
      return this.expansionPanel.isActive;
    },

    /**
     * Whether the parent panel is disabled
     */
    isDisabled(): boolean {
      return this.expansionPanel.isDisabled;
    },

    /**
     * Whether the parent panel is readonly
     */
    isReadonly(): boolean {
      return this.expansionPanel.isReadonly;
    },
  },

  created(): void {
    this.expansionPanel.registerHeader(this);
  },

  beforeDestroy(): void {
    this.expansionPanel.unregisterHeader();
  },

  methods: {
    /**
     * Handle click events and emit to parent
     * @param event - The click event
     */
    onClick(event: MouseEvent): void {
      this.$emit('click', event);
    },

    /**
     * Generate the icon element with fade transition
     * @returns VNode containing the icon with transition
     */
    genIcon(): VNode {
      const iconContent: VNode[] =
        getSlot(this, 'actions') ?? [this.$createElement(VIcon, this.expandIcon)];

      return this.$createElement(VFadeTransition, [
        this.$createElement('div', {
          staticClass: 'v-expansion-panel-header__icon',
          class: {
            'v-expansion-panel-header__icon--disable-rotate': this.disableIconRotate,
          },
          directives: [
            {
              name: 'show',
              value: !this.isDisabled,
            },
          ],
        }, iconContent),
      ]);
    },
  },

  render(createElement: CreateElement): VNode {
    const vnodeData: VNodeData = this.setBackgroundColor(this.color, {
      staticClass: 'v-expansion-panel-header',
      class: this.classes,
      attrs: {
        tabindex: this.isDisabled ? -1 : null,
        type: 'button',
      },
      directives: [
        {
          name: 'ripple',
          value: this.ripple,
        },
      ],
      on: {
        ...this.$listeners,
        click: this.onClick,
        mousedown: (): void => {
          this.hasMousedown = true;
        },
        mouseup: (): void => {
          this.hasMousedown = false;
        },
      },
    });

    const defaultSlot = getSlot(
      this,
      'default',
      { open: this.isActive } as DefaultSlotScope,
      true
    );

    const children: VNode[] = [
      defaultSlot,
      ...(this.hideActions ? [] : [this.genIcon()]),
    ].filter(Boolean) as VNode[];

    return createElement('button', vnodeData, children);
  },
});

export default VExpansionPanelHeader;

/**
 * Type exports for external usage
 */
export type VExpansionPanelHeaderInstance = InstanceType<typeof VExpansionPanelHeader>;