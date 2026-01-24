/**
 * Help Search Component - A search input component for help center navigation
 * Provides search functionality with hover states, focus management, and keyboard support
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Props interface for HelpSearchItem component
 */
interface HelpSearchItemProps {
  /** Controls component visibility */
  visible: boolean;
  /** Enables/disables user interaction */
  enable: boolean;
  /** Visual pressed state indicator */
  isPressed?: boolean;
  /** Optional label text */
  label?: string;
}

/**
 * Internal component state
 */
interface HelpSearchItemState {
  /** Mouse hover state */
  hover: boolean;
  /** Interaction enabled state */
  enable: boolean;
  /** Visual pressed state */
  isPressed: boolean;
  /** Input focus state */
  isFocus: boolean;
  /** Current search query string */
  searchStr: string;
}

/**
 * HelpSearchItem - Interactive search component for help center
 * 
 * Features:
 * - Real-time search input with clear button
 * - Keyboard navigation (Enter to search)
 * - Event tracking integration
 * - Hover and focus state management
 * - Opens help center search results in new window
 */
declare class HelpSearchItem extends React.Component<HelpSearchItemProps, HelpSearchItemState> {
  /**
   * PropTypes validation
   */
  static propTypes: {
    visible: PropTypes.Validator<boolean>;
    enable: PropTypes.Validator<boolean>;
    isPressed: PropTypes.Requireable<boolean>;
  };

  /**
   * Default prop values
   */
  static defaultProps: {
    visible: boolean;
    isPressed: boolean;
  };

  /**
   * Component state initialization
   */
  state: HelpSearchItemState;

  /**
   * Reference to search input element
   */
  refs: {
    searchInput: HTMLInputElement;
  };

  /**
   * Constructor
   * @param props - Component properties
   */
  constructor(props: HelpSearchItemProps);

  /**
   * Checks if component is enabled for interaction
   * @returns true if enabled, false otherwise
   */
  _isEnabled(): boolean;

  /**
   * Mouse enter event handler - sets hover state
   */
  _onMouseEnter(): void;

  /**
   * Mouse leave event handler - clears hover state
   */
  _onMouseLeave(): void;

  /**
   * Click handler to prevent event propagation
   * @param event - React mouse event
   */
  _onHandleClick(event: React.MouseEvent<HTMLElement>): void;

  /**
   * Focus event handler - sets focus state
   */
  _onFocus(): void;

  /**
   * Blur event handler - clears focus state
   */
  _onBlur(): void;

  /**
   * Clears search input and resets search string state
   * @param event - Optional mouse event
   */
  _handleClearUp(event?: React.MouseEvent<HTMLElement>): void;

  /**
   * Keyboard event handler - triggers search on Enter key
   * @param event - React keyboard event
   */
  _searchTextOnKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void;

  /**
   * Input change handler - updates search string state
   * @param event - React change event
   */
  _handleChange(event: React.ChangeEvent<HTMLInputElement>): void;

  /**
   * Search execution handler
   * - Opens help center with search query
   * - Tracks search event via analytics
   * - Clears search input after execution
   * @param event - React mouse event
   */
  _onClick(event: React.MouseEvent<HTMLElement>): void;

  /**
   * Renders the search component UI
   * @returns React element containing search input, clear button, and search icon
   */
  render(): React.ReactElement;
}

export default HelpSearchItem;