import React from 'react';
import { CheckBox } from './CheckBox';

/**
 * Props for the ReasonItem component
 */
export interface ReasonItemProps {
  /** The text label to display for this reason option */
  text: string;
  
  /** Callback function triggered when the checkbox state changes */
  onChangeChecked: (checked: boolean, index: number) => void;
  
  /** Whether this reason item is currently checked */
  checked: boolean;
  
  /** The index of this reason item in the list */
  index: number;
  
  /** Flag indicating if this is the last item (which shows a textarea) */
  isLastFlag: boolean;
  
  /** Callback function triggered when the textarea content changes */
  onChangeTextReason: (text: string) => void;
}

/**
 * Internal state for the ReasonItem component
 */
export interface ReasonItemState {
  /** Whether the checkbox is checked */
  checked: boolean;
}

/**
 * A reason item component that displays a checkbox with a label,
 * and optionally a textarea for additional input when it's the last item.
 * 
 * Used in report panels to allow users to select and provide reasons.
 */
export default class ReasonItem extends React.Component<ReasonItemProps, ReasonItemState> {
  /**
   * Reference to the textarea element for "other reason" input
   */
  private otherReasonText: React.RefObject<HTMLTextAreaElement>;

  constructor(props: ReasonItemProps);

  /**
   * Handles checkbox state change
   * @param checked - The new checked state
   */
  changeChecked(checked: boolean): void;

  /**
   * Handles textarea content change
   * @param event - The change event from the textarea
   */
  changeTextReason(event: React.ChangeEvent<HTMLTextAreaElement>): void;

  render(): React.ReactElement;
}