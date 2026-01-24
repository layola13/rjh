/**
 * Region switcher component for language/region selection
 * @module RegionSwitcher
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Region configuration object
 */
export interface Region {
  /** Unique region code (e.g., 'en-US', 'zh-CN') */
  code: string;
  /** Region code for API requests */
  regioncode: string;
  /** Human-readable display name */
  displayName: string;
  /** Additional region metadata */
  [key: string]: unknown;
}

/**
 * Component state interface
 */
interface RegionSwitcherState {
  /** Currently selected region code */
  selectedcode: string;
  /** Whether the region dropdown is visible */
  show: boolean;
}

/**
 * Component props interface
 */
interface RegionSwitcherProps {
  /** Available regions list */
  regions: Region[];
  /** Currently active region */
  current: Region;
  /** Callback fired when region selection changes */
  onSelectedChange?: (code: string, region: Region) => void;
}

/**
 * Region switcher component
 * Displays a dropdown menu for selecting language/region preferences
 */
export default class RegionSwitcher extends React.Component<RegionSwitcherProps, RegionSwitcherState> {
  static propTypes: {
    regions: PropTypes.Requireable<unknown[]>;
    current: PropTypes.Requireable<object>;
    onSelectedChange: PropTypes.Requireable<(...args: unknown[]) => unknown>;
  };

  constructor(props: RegionSwitcherProps);

  /**
   * Handle region selection change
   * @param code - Selected region code
   * @param region - Selected region object
   */
  onSelectedChange(code: string, region: Region): void;

  /**
   * Show the region dropdown menu
   */
  onShow(): void;

  /**
   * Hide the region dropdown menu
   */
  onHide(): void;

  /**
   * Render the list of available regions
   * @returns Region list element or null
   */
  renderItems(): React.ReactElement | null;

  /**
   * Render the component
   */
  render(): React.ReactElement;
}