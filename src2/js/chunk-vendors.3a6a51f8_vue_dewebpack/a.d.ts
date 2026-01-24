/**
 * Vue component normalizer for webpack builds.
 * Handles component options normalization, SSR context injection, and style scoping.
 * 
 * @module VueComponentNormalizer
 */

/**
 * Represents Vue component options structure
 */
interface VueComponentOptions {
  /** Render function for the component */
  render?: Function;
  /** Static render functions for optimization */
  staticRenderFns?: Function[];
  /** Indicates if the component is compiled */
  _compiled?: boolean;
  /** Indicates if the component is functional */
  functional?: boolean;
  /** Scoped CSS identifier */
  _scopeId?: string;
  /** SSR registration function */
  _ssrRegister?: Function;
  /** Style injection function */
  _injectStyles?: Function;
  /** Lifecycle hook: before component creation */
  beforeCreate?: Function | Function[];
  /** Shadow DOM root for web components */
  shadowRoot?: ShadowRoot;
}

/**
 * Vue component constructor or options object
 */
type VueComponent = VueComponentOptions | {
  options: VueComponentOptions;
};

/**
 * Vue SSR context for server-side rendering
 */
interface VueSSRContext {
  /** Set of registered component identifiers */
  _registeredComponents?: Set<string>;
}

/**
 * Vue instance with internal properties
 */
interface VueInstance {
  /** Virtual node for the component */
  $vnode?: {
    ssrContext?: VueSSRContext;
  };
  /** Parent component instance */
  parent?: VueInstance;
  /** Root Vue instance */
  $root?: {
    $options?: {
      shadowRoot?: ShadowRoot;
    };
  };
}

/**
 * Result of component normalization
 */
interface NormalizedComponentResult {
  /** The original component export */
  exports: VueComponent;
  /** Normalized component options */
  options: VueComponentOptions;
}

/**
 * Normalizes a Vue component by merging render functions, styles, and SSR context.
 * This is the core webpack loader utility for Vue single-file components.
 * 
 * @param component - Vue component constructor or options object
 * @param render - Component render function
 * @param staticRenderFns - Array of static render functions for optimization
 * @param functionalTemplate - Whether the template is functional
 * @param injectStyles - Style injection callback for scoped CSS or CSS modules
 * @param scopeId - Unique identifier for scoped CSS (data-v-xxxxx)
 * @param moduleIdentifier - Unique module identifier for hot-reload and SSR
 * @param shadowMode - Whether the component uses Shadow DOM
 * @returns Normalized component with merged options
 */
export declare function normalizeComponent(
  component: VueComponent,
  render?: Function,
  staticRenderFns?: Function[],
  functionalTemplate?: boolean,
  injectStyles?: (this: VueInstance, context: VueSSRContext | ShadowRoot) => void,
  scopeId?: string,
  moduleIdentifier?: string,
  shadowMode?: boolean
): NormalizedComponentResult;