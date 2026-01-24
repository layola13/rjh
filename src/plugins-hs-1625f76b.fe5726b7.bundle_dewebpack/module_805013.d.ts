/**
 * Tag information display component
 * Renders a list of tag items with optional input fields and labels
 */

import React from 'react';

/**
 * Represents a single tag field item
 */
interface TagFieldItem {
  /** Display name of the tag */
  dispName: string;
  /** Whether this item requires input */
  needInput?: boolean;
  /** Label for the input field (when needInput is true) */
  inputFieldLabel?: string;
  /** Text expression value (when needInput is true) */
  textExpression?: string;
}

/**
 * Represents a tag group item
 */
interface TagItem {
  /** Label for this tag group */
  label: string;
  /** Whether this tag has structured field items */
  hasTagField?: boolean;
  /** Array of tag field items (when hasTagField is true) or simple string items */
  items: TagFieldItem[] | string[];
}

/**
 * Props for the TagInfo component data object
 */
interface TagInfoData {
  /** Array of tag items to display */
  items: TagItem[];
  /** Description text to show when items array is empty */
  emptyDesc: string;
}

/**
 * Props for the TagInfo component
 */
interface TagInfoProps {
  /** Tag data containing items and empty description */
  data: TagInfoData;
}

/**
 * State for the TagInfo component
 */
interface TagInfoState {
  /** Current tag items */
  items: TagItem[];
  /** Current empty description text */
  emptyDesc: string;
}

/**
 * Tag information display component
 * Displays a list of tags with optional input fields and handles empty states
 */
declare class TagInfo extends React.Component<TagInfoProps, TagInfoState> {
  constructor(props: TagInfoProps);

  /**
   * Derives state from props when they change
   * @param props - New props
   * @param state - Current state
   * @returns New state object or null if no update needed
   */
  static getDerivedFromProps(
    props: TagInfoProps,
    state: TagInfoState
  ): Partial<TagInfoState> | null;

  /**
   * Renders the tag information display
   * @returns React element containing tag items or empty message
   */
  render(): React.ReactElement;
}

export default TagInfo;