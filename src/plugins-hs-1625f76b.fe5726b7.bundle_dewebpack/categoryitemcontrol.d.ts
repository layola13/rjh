import React from 'react';

/**
 * Props for the CategoryItemControl component
 */
export interface CategoryItemControlProps {
  /** The display name/key for the category */
  keyName: string;
  
  /** Whether this category item is currently selected */
  selected: boolean;
  
  /** The category object/identifier */
  category: unknown;
  
  /** 
   * Callback function triggered when the category is clicked
   * @param category - The category that was clicked
   */
  handleCategoryClick: (category: unknown) => void;
}

/**
 * State for the CategoryItemControl component
 */
export interface CategoryItemControlState {
  /** Whether the mouse is currently hovering over this item */
  isHovering: boolean;
}

/**
 * A React component that renders a single category filter item with hover and selection states.
 * Displays the category name and handles click interactions.
 */
export declare class CategoryItemControl extends React.Component<
  CategoryItemControlProps,
  CategoryItemControlState
> {
  /**
   * Creates an instance of CategoryItemControl
   * @param props - Component props
   */
  constructor(props: CategoryItemControlProps);

  /**
   * Component state
   */
  state: CategoryItemControlState;

  /**
   * Handles mouse over event to set hovering state to true
   */
  handleMouseOver(): void;

  /**
   * Handles mouse out event to set hovering state to false
   */
  handleMouseOut(): void;

  /**
   * Renders the category item as a list item with interactive elements
   * @returns React element representing the category filter item
   */
  render(): React.ReactElement;
}