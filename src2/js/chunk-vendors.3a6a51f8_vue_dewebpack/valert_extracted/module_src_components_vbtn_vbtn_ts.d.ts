import './VBtn.sass';
import VSheet from '../VSheet';
import VProgressCircular from '../VProgressCircular';
import { factory as groupableFactory } from '../../mixins/groupable';
import { factory as toggleableFactory } from '../../mixins/toggleable';
import Positionable from '../../mixins/positionable';
import Routable from '../../mixins/routable';
import Sizeable from '../../mixins/sizeable';
import mixins from '../../util/mixins';
import { breaking } from '../../util/console';
import { VNode, CreateElement } from 'vue';
import { PropType } from 'vue/types/options';

/**
 * Button value type - can be string, number, or complex object
 */
type ButtonValue = string | number | Record<string, unknown> | null;

/**
 * Ripple configuration
 */
interface RippleConfig {
  circle: boolean;
}

/**
 * Component data structure
 */
interface VBtnData {
  proxyClass: string;
}

/**
 * Computed class object structure
 */
interface VBtnClasses {
  'v-btn': boolean;
  'v-btn--absolute': boolean;
  'v-btn--block': boolean;
  'v-btn--bottom': boolean;
  'v-btn--contained': boolean;
  'v-btn--depressed': boolean;
  'v-btn--disabled': boolean;
  'v-btn--fab': boolean;
  'v-btn--fixed': boolean;
  'v-btn--flat': boolean;
  'v-btn--icon': boolean;
  'v-btn--left': boolean;
  'v-btn--loading': boolean;
  'v-btn--outlined': boolean;
  'v-btn--right': boolean;
  'v-btn--round': boolean;
  'v-btn--rounded': boolean;
  'v-btn--router': boolean;
  'v-btn--text': boolean;
  'v-btn--tile': boolean;
  'v-btn--top': boolean;
  [key: string]: boolean;
}

/**
 * VBtn Component Props
 */
interface VBtnProps {
  /** Active class name, defaults to button toggle group's active class */
  activeClass: string;
  /** Expands button to 100% available width */
  block: boolean;
  /** Removes elevation (box-shadow) */
  depressed: boolean;
  /** Makes button round and floating */
  fab: boolean;
  /** Designates button as icon-only (round) */
  icon: boolean;
  /** Adds loading animation */
  loading: boolean;
  /** Applies outlined style */
  outlined: boolean;
  /** Prevents focus loss on click */
  retainFocusOnClick: boolean;
  /** Applies rounded corners */
  rounded: boolean;
  /** HTML tag to render as */
  tag: string;
  /** Applies text style (transparent background) */
  text: boolean;
  /** Removes border radius */
  tile: boolean;
  /** Button type attribute */
  type: string;
  /** Value used in button toggle groups */
  value: ButtonValue;
}

const BASE_MIXINS = mixins(
  VSheet,
  Routable,
  Positionable,
  Sizeable,
  groupableFactory('btnToggle'),
  toggleableFactory('inputValue')
);

/**
 * VBtn - Vuetify Button Component
 * 
 * A versatile button component with multiple style variants including
 * text, outlined, contained, icon, and FAB buttons. Supports loading
 * states, routing, and integration with button toggle groups.
 */
export default BASE_MIXINS.extend().extend({
  name: 'v-btn',

  props: {
    activeClass: {
      type: String,
      default(this: any): string {
        return this.btnToggle ? this.btnToggle.activeClass : '';
      }
    },
    block: Boolean,
    depressed: Boolean,
    fab: Boolean,
    icon: Boolean,
    loading: Boolean,
    outlined: Boolean,
    retainFocusOnClick: Boolean,
    rounded: Boolean,
    tag: {
      type: String,
      default: 'button'
    },
    text: Boolean,
    tile: Boolean,
    type: {
      type: String,
      default: 'button'
    },
    value: {
      type: null as unknown as PropType<ButtonValue>,
      default: null
    }
  },

  data(): VBtnData {
    return {
      proxyClass: 'v-btn--active'
    };
  },

  computed: {
    /**
     * Computed CSS classes for the button based on props and state
     */
    classes(this: any): VBtnClasses {
      return {
        'v-btn': true,
        ...Routable.options.computed.classes.call(this),
        'v-btn--absolute': this.absolute,
        'v-btn--block': this.block,
        'v-btn--bottom': this.bottom,
        'v-btn--contained': this.contained,
        'v-btn--depressed': this.depressed || this.outlined,
        'v-btn--disabled': this.disabled,
        'v-btn--fab': this.fab,
        'v-btn--fixed': this.fixed,
        'v-btn--flat': this.isFlat,
        'v-btn--icon': this.icon,
        'v-btn--left': this.left,
        'v-btn--loading': this.loading,
        'v-btn--outlined': this.outlined,
        'v-btn--right': this.right,
        'v-btn--round': this.isRound,
        'v-btn--rounded': this.rounded,
        'v-btn--router': Boolean(this.to),
        'v-btn--text': this.text,
        'v-btn--tile': this.tile,
        'v-btn--top': this.top,
        ...this.themeClasses,
        ...this.groupClasses,
        ...this.elevationClasses,
        ...this.sizeableClasses
      };
    },

    /**
     * Determines if button should have contained style (elevated)
     */
    contained(this: any): boolean {
      return Boolean(!this.isFlat && !this.depressed && !this.elevation);
    },

    /**
     * Computed ripple configuration based on button type
     */
    computedRipple(this: any): boolean | RippleConfig {
      const defaultRipple: boolean | RippleConfig = 
        !this.icon && !this.fab || { circle: true };
      
      return !this.disabled && (this.ripple ?? defaultRipple);
    },

    /**
     * Determines if button has flat styling (no elevation)
     */
    isFlat(this: any): boolean {
      return Boolean(this.icon || this.text || this.outlined);
    },

    /**
     * Determines if button should be circular
     */
    isRound(this: any): boolean {
      return Boolean(this.icon || this.fab);
    },

    /**
     * Computed inline styles for the button
     */
    styles(this: any): Record<string, unknown> {
      return {
        ...this.measurableStyles
      };
    }
  },

  created(this: any): void {
    const deprecatedProps: Array<[string, string]> = [
      ['flat', 'text'],
      ['outline', 'outlined'],
      ['round', 'rounded']
    ];

    deprecatedProps.forEach(([oldProp, newProp]: [string, string]) => {
      if (this.$attrs.hasOwnProperty(oldProp)) {
        breaking(oldProp, newProp, this);
      }
    });
  },

  methods: {
    /**
     * Handles button click event
     * @param event - The native click event
     */
    click(this: any, event: MouseEvent): void {
      // Remove focus unless retain flag is set or it's a FAB without detail
      if (!this.retainFocusOnClick && !this.fab && event.detail) {
        (this.$el as HTMLElement).blur();
      }

      this.$emit('click', event);

      // Toggle state if part of button toggle group
      if (this.btnToggle) {
        this.toggle();
      }
    },

    /**
     * Generates the button content wrapper with default slot
     * @returns VNode containing button content
     */
    genContent(this: any): VNode {
      return this.$createElement('span', {
        staticClass: 'v-btn__content'
      }, this.$slots.default);
    },

    /**
     * Generates the loading indicator
     * @returns VNode containing loading spinner
     */
    genLoader(this: any): VNode {
      return this.$createElement('span', {
        class: 'v-btn__loader'
      }, this.$slots.loader || [
        this.$createElement(VProgressCircular, {
          props: {
            indeterminate: true,
            size: 23,
            width: 2
          }
        })
      ]);
    }
  },

  /**
   * Render function for the button component
   * @param createElement - Vue's createElement function
   * @returns The rendered VNode
   */
  render(this: any, createElement: CreateElement): VNode {
    const children: VNode[] = [
      this.genContent(),
      this.loading && this.genLoader()
    ];

    // Choose color application method based on button style
    const colorApplier = this.isFlat ? this.setTextColor : this.setBackgroundColor;
    
    const { tag, data } = this.generateRouteLink();

    // Set button-specific attributes
    if (tag === 'button') {
      data.attrs.type = this.type;
      data.attrs.disabled = this.disabled;
    }

    // Serialize value attribute
    const valueType = typeof this.value;
    data.attrs.value = ['string', 'number'].includes(valueType)
      ? this.value
      : JSON.stringify(this.value);

    return createElement(
      tag,
      this.disabled ? data : colorApplier(this.color, data),
      children
    );
  }
});