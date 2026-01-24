import type { CSSProperties, ForwardRefExoticComponent, MouseEvent, ReactNode, RefAttributes } from 'react';

/**
 * Locale configuration for internationalization
 */
export interface AddButtonLocale {
  /**
   * ARIA label for the add button
   * Used for accessibility purposes
   * @default "Add tab"
   */
  addAriaLabel?: string;
}

/**
 * Editable configuration for tab management
 */
export interface EditableConfig {
  /**
   * Whether to show the add button
   * @default true
   */
  showAdd?: boolean;

  /**
   * Custom icon to display in the add button
   * Can be a React node or string
   */
  addIcon?: ReactNode;

  /**
   * Callback fired when edit action occurs
   * @param action - The type of edit action ('add' | 'remove')
   * @param options - Additional options containing the event
   */
  onEdit: (action: 'add' | 'remove', options: { event: MouseEvent<HTMLButtonElement> }) => void;
}

/**
 * Props for the AddButton component
 */
export interface AddButtonProps {
  /**
   * CSS class prefix for BEM-style naming
   * Used to generate className like `${prefixCls}-nav-add`
   */
  prefixCls: string;

  /**
   * Editable configuration
   * If false, the button will not be rendered
   */
  editable?: EditableConfig | false;

  /**
   * Locale configuration for internationalization
   */
  locale?: AddButtonLocale;

  /**
   * Inline styles to apply to the button element
   */
  style?: CSSProperties;
}

/**
 * A button component for adding new tabs
 * 
 * @remarks
 * This component renders an "Add" button that triggers the `onEdit` callback
 * when clicked. It supports customization through the `editable` prop.
 * 
 * @example
 *