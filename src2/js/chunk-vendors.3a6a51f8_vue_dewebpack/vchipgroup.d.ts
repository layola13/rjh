/**
 * VChipGroup Component Module
 * 
 * This module exports the VChipGroup component, which is a container for organizing
 * and managing multiple chip components in a group with selection capabilities.
 * 
 * @module VChipGroup
 * @see {@link ./VChipGroup/VChipGroup.ts} - Component implementation
 */

import type VChipGroupComponent from './VChipGroup/VChipGroup';

/**
 * VChipGroup component type
 * 
 * A group component that manages the layout and selection state of multiple chip elements.
 * Typically used for filtering, categorization, or multi-select interfaces.
 */
export type VChipGroup = typeof VChipGroupComponent;

/**
 * Default export of the VChipGroup component
 * 
 * @example
 *