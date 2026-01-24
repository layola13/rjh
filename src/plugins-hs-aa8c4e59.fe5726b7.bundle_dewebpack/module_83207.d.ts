/**
 * Design entity provider module
 * Registers a provider that collects design entities from the application
 */

import { DesignEntity } from './module_872204';
import { registerProvider, ProviderConfig, EntityCollector } from './module_208816';

declare global {
  namespace HSApp {
    interface App {
      /**
       * Gets the singleton application instance
       */
      getApp(): unknown;
    }
    const App: App;
  }
}

/**
 * Configuration for the Design provider
 */
interface DesignProviderConfig extends ProviderConfig {
  type: 'Design';
}

/**
 * Design entity collector implementation
 */
interface DesignEntityCollector extends EntityCollector {
  /**
   * Collects design entities from the application
   * @returns Array of design entities accepted by the application
   */
  collectEntity(): DesignEntity[];
}

/**
 * Registers a Design provider that collects design entities
 */
registerProvider<DesignProviderConfig, DesignEntityCollector>(
  {
    type: 'Design'
  },
  {
    collectEntity(): DesignEntity[] {
      return [new DesignEntity().accept(HSApp.App.getApp())];
    }
  }
);