/**
 * VContent component - deprecated wrapper for VMain
 * @deprecated Use v-main instead of v-content
 * @module VContent
 */

import type { VNode, CreateElement } from 'vue';
import type { Component } from 'vue/types/options';
import type VMain from '../VMain/VMain';

/**
 * VContent component options interface
 * Extends VMain component with deprecation warnings
 */
export interface VContentOptions {
  /**
   * Component name
   */
  name: string;

  /**
   * Lifecycle hook called when component is created
   * Shows deprecation warning to use v-main instead
   */
  created(this: Vue): void;

  /**
   * Render function for VContent component
   * Wraps VMain render output with v-content specific classes
   * 
   * @param createElement - Vue's createElement function
   * @returns Virtual DOM node with v-content styling
   */
  render(this: Vue, createElement: CreateElement): VNode;
}

/**
 * VContent component - deprecated alias for VMain
 * 
 * @deprecated This component is deprecated. Use VMain (v-main) instead.
 * 
 * This component extends VMain and adds:
 * - Deprecation warning on creation
 * - Legacy v-content CSS classes for backward compatibility
 * 
 * @example
 *