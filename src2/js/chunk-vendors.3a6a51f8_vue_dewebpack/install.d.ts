import Vue, { VueConstructor, PluginObject } from 'vue';
import { consoleError } from './util/console';

/**
 * Vuetify component definition with optional subcomponents
 */
interface VuetifyComponent extends Vue {
  $_vuetify_subcomponents?: Record<string, VuetifyComponent>;
}

/**
 * Vuetify installation options
 */
interface InstallOptions {
  /** Components to register globally */
  components?: Record<string, VuetifyComponent>;
  /** Directives to register globally */
  directives?: Record<string, Vue.DirectiveOptions>;
}

/**
 * Vuetify framework instance attached to Vue
 */
interface VuetifyFramework {
  isHydrating?: boolean;
  breakpoint: {
    update(isSSR?: boolean): void;
  };
  init(vm: Vue, ssrContext?: unknown): void;
  framework: unknown;
}

/**
 * Extended Vue options with Vuetify support
 */
interface VuetifyVueOptions {
  vuetify?: VuetifyFramework;
  parent?: Vue & { $vuetify?: VuetifyFramework };
}

/**
 * Install function with tracking flag
 */
interface InstallFunction {
  (vue: VueConstructor, options?: InstallOptions): void;
  installed?: boolean;
}

/**
 * Recursively registers Vuetify components and their subcomponents
 * @param components - Object containing component definitions
 * @returns true if components were registered
 */
function registerComponents(
  vue: VueConstructor,
  components?: Record<string, VuetifyComponent>
): boolean {
  if (!components) {
    return false;
  }

  for (const name in components) {
    const component = components[name];
    
    if (component) {
      const hasSubcomponents = registerComponents(vue, component.$_vuetify_subcomponents);
      
      if (!hasSubcomponents) {
        vue.component(name, component);
      }
    }
  }

  return true;
}

/**
 * Installs Vuetify plugin into Vue application
 * @param vue - Vue constructor
 * @param options - Installation options including components and directives
 */
export const install: InstallFunction = function install(
  vue: VueConstructor,
  options: InstallOptions = {}
): void {
  // Prevent duplicate installation
  if (install.installed) {
    return;
  }

  install.installed = true;

  // Warn if multiple Vue instances detected
  if (Vue !== vue) {
    consoleError(
      'Multiple instances of Vue detected\n' +
      'See https://github.com/vuetifyjs/vuetify/issues/4068\n\n' +
      'If you\'re seeing "$attrs is readonly", it\'s caused by this'
    );
  }

  const components = options.components ?? {};
  const directives = options.directives ?? {};

  // Register directives
  for (const name in directives) {
    const directive = directives[name];
    vue.directive(name, directive);
  }

  // Register components recursively
  registerComponents(vue, components);

  // Install Vuetify mixin if not already installed
  if (!vue.$_vuetify_installed) {
    vue.$_vuetify_installed = true;

    vue.mixin({
      beforeCreate(this: Vue): void {
        const options = this.$options as VuetifyVueOptions;

        if (options.vuetify) {
          // Initialize root Vuetify instance
          options.vuetify.init(this, this.$ssrContext);
          this.$vuetify = vue.observable(options.vuetify.framework) as VuetifyFramework;
        } else {
          // Inherit from parent component
          this.$vuetify = options.parent?.$vuetify ?? this;
        }
      },

      beforeMount(this: Vue): void {
        const options = this.$options as VuetifyVueOptions;

        if (options.vuetify && this.$el?.hasAttribute('data-server-rendered')) {
          this.$vuetify.isHydrating = true;
          this.$vuetify.breakpoint.update(true);
        }
      },

      mounted(this: Vue): void {
        const options = this.$options as VuetifyVueOptions;

        if (options.vuetify && this.$vuetify.isHydrating) {
          this.$vuetify.isHydrating = false;
          this.$vuetify.breakpoint.update();
        }
      }
    });
  }
};

// Augment Vue types
declare module 'vue/types/vue' {
  interface Vue {
    $vuetify: VuetifyFramework;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    vuetify?: VuetifyFramework;
  }
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    $_vuetify_installed?: boolean;
  }
}