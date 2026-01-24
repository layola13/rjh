/**
 * Mentions Component - Type Definitions
 * Ant Design Mentions component for @mention functionality
 */

import * as React from 'react';

/**
 * Mention item configuration returned by getMentions utility
 */
export interface MentionItem {
  /** The prefix character that triggered the mention (e.g., '@', '#') */
  prefix: string;
  /** The value after the prefix */
  value: string;
}

/**
 * Configuration options for getMentions utility function
 */
export interface GetMentionsConfig {
  /** Prefix character(s) to identify mentions. Can be a string or array of strings. Default: '@' */
  prefix?: string | string[];
  /** Character(s) used to split the input text. Default: ' ' (space) */
  split?: string;
}

/**
 * Props for the Mentions.Option component
 */
export interface OptionProps {
  /** The value of the option */
  value: string;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** The content to display in the option */
  children?: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * Props for the main Mentions component
 */
export interface MentionsProps {
  /** Custom CSS class prefix. Default: 'ant-mentions' */
  prefixCls?: string;
  /** Additional CSS class name */
  className?: string;
  /** Whether the mentions input is disabled */
  disabled?: boolean;
  /** Show loading indicator and disable filtering */
  loading?: boolean;
  /** Custom filter function for options. Return false to hide the option */
  filterOption?: boolean | ((input: string, option: OptionProps) => boolean);
  /** Content to display when no options match */
  notFoundContent?: React.ReactNode;
  /** Mention options (Mentions.Option components) */
  children?: React.ReactNode;
  /** Callback when input receives focus */
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
  /** Callback when input loses focus */
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Callback when a mention is selected */
  onSelect?: (option: OptionProps, prefix: string) => void;
  /** Callback when search text changes */
  onSearch?: (text: string, prefix: string) => void;
  /** The controlled value */
  value?: string;
  /** The default value */
  defaultValue?: string;
  /** Character(s) to trigger mention dropdown. Can be string or array. Default: '@' */
  prefix?: string | string[];
  /** Character to split mentions. Default: ' ' */
  split?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Text direction: 'ltr' or 'rtl' */
  direction?: 'ltr' | 'rtl';
  /** Auto size configuration for textarea */
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  /** Maximum number of rows */
  rows?: number;
  /** Allow clearing the value */
  allowClear?: boolean;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Tab index */
  tabIndex?: number;
}

/**
 * Mentions.Option sub-component
 */
export interface OptionComponent extends React.FC<OptionProps> {
  displayName?: string;
}

/**
 * Main Mentions component interface
 */
export interface MentionsComponent extends React.ForwardRefExoticComponent<MentionsProps & React.RefAttributes<HTMLTextAreaElement>> {
  /** Display name for debugging */
  displayName?: string;
  
  /**
   * Option sub-component for defining mention options
   * @example
   * <Mentions>
   *   <Mentions.Option value="user1">User 1</Mentions.Option>
   *   <Mentions.Option value="user2">User 2</Mentions.Option>
   * </Mentions>
   */
  Option: OptionComponent;
  
  /**
   * Utility function to extract mentions from text
   * @param text - The text to parse for mentions
   * @param config - Configuration for parsing (prefix and split characters)
   * @returns Array of mention items found in the text
   * @example
   * Mentions.getMentions('@user1 hello @user2', { prefix: '@', split: ' ' })
   * // Returns: [{ prefix: '@', value: 'user1' }, { prefix: '@', value: 'user2' }]
   */
  getMentions: (text?: string, config?: GetMentionsConfig) => MentionItem[];
}

/**
 * Ant Design Mentions Component
 * 
 * A component for @mention functionality in text inputs, allowing users to
 * mention other users, topics, or entities with autocomplete suggestions.
 * 
 * @example
 *