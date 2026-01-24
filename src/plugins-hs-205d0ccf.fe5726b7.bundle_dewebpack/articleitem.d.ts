/**
 * ArticleItem Component Module
 * Provides article list item display with keyword highlighting and tag support
 */

import React from 'react';
import { Signal } from 'signal-lib';

/**
 * Tag type enumeration
 * Re-exported from tag module
 */
export { TagType } from './tag-module';

/**
 * Tag configuration interface
 */
export interface TagConfig {
  /** Tag type identifier */
  type: string;
  /** Tag display name */
  name: string;
  /** Tag color in CSS format */
  color: string;
}

/**
 * Article item component props
 */
export interface ArticleItemProps {
  /** Tag configuration (JSON string or object) */
  tag?: string | TagConfig;
  /** Article title text */
  articleTitle: string;
  /** Article URL */
  articleUrl: string;
  /** Array of keywords to display */
  keywords?: string[];
  /** Search keys for highlighting */
  keys?: string[];
  /** Source identifier for tracking */
  from?: string;
  /** Navigation push function */
  push: (config: NavigationConfig) => void;
  /** Click event handler */
  onClick?: () => void;
}

/**
 * Navigation configuration
 */
export interface NavigationConfig {
  /** Target page component */
  Page: React.ComponentType;
  /** Page data payload */
  data: {
    /** Article URL */
    url: string;
    /** Article title */
    title: string;
  };
}

/**
 * Article view event payload
 */
export interface ArticleViewEventPayload extends ArticleItemProps {
  /** Event source identifier */
  from?: string;
}

/**
 * Signal for article view open events
 * Dispatches when an article item is clicked
 */
export const signalArticleViewOpen: Signal<ArticleViewEventPayload>;

/**
 * Keyword display component props
 */
interface KeywordProps {
  /** Array of keywords to display */
  keywords?: string[];
  /** Search keys for highlighting */
  keys?: string[];
}

/**
 * Tag display component props
 */
interface TagProps {
  /** Tag display name */
  name: string;
  /** Tag color in CSS format */
  color: string;
}

/**
 * Text highlight params
 */
interface HighlightParams {
  /** Search keys for highlighting */
  keys?: string[];
  /** Text content to highlight */
  text: string;
}

/**
 * Renders keyword list with highlighting
 * @param props - Keyword component props
 * @returns Keyword elements or null if no keywords
 */
declare function KeywordList(props: KeywordProps): React.ReactElement | null;

/**
 * Highlights search keys in text with <em> tags
 * @param params - Text and keys for highlighting
 * @returns HTML string with highlighted terms
 */
declare function highlightText(params: HighlightParams): string;

/**
 * Renders a colored tag label
 * @param props - Tag display props
 * @returns Tag element
 */
declare function Tag(props: TagProps): React.ReactElement;

/**
 * Article list item component
 * Displays article with tag, title, and keywords with search highlighting
 * @param props - Article item props
 * @returns Article item element
 */
export declare function ArticleItem(props: ArticleItemProps): React.ReactElement;

/**
 * Article item component with view tracking
 * Wraps ArticleItem with click handler that dispatches view signal and navigates
 * @param props - Article item props
 * @returns Enhanced article item element
 */
declare const ArticleItemWithTracking: React.ComponentType<ArticleItemProps>;

export default ArticleItemWithTracking;