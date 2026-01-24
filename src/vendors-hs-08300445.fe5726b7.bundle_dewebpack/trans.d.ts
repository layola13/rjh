/**
 * React component for translating text with interpolation and component composition.
 * Part of react-i18next library.
 */

import { ReactNode, ReactElement, ComponentType, Context } from 'react';
import { i18n, TFunction, TOptions, Namespace, DefaultNamespace } from 'i18next';

/**
 * Configuration options for Trans component behavior
 */
export interface TransReactOptions {
  /** Whether to support basic HTML nodes in translations */
  transSupportBasicHtmlNodes?: boolean;
  /** List of basic HTML node names to keep (e.g., ['br', 'strong', 'i']) */
  transKeepBasicHtmlNodesFor?: string[];
  /** Default parent component to wrap translated content */
  defaultTransParent?: ComponentType<any> | string;
  /** Function to generate hash keys for translations */
  hashTransKey?: (defaultValue: string) => string;
  /** Value for empty nodes in translation */
  transEmptyNodeValue?: string;
  /** Component to wrap text nodes */
  transWrapTextNodes?: ComponentType<any> | string;
  /** Function to unescape HTML entities */
  unescape?: (text: string) => string;
}

/**
 * Context value provided by I18nextProvider
 */
export interface I18nContextValue {
  /** The i18next instance */
  i18n?: i18n;
  /** Default namespace for translations */
  defaultNS?: Namespace;
}

/**
 * Props for the Trans component
 */
export interface TransProps {
  /** Content to translate - can include React components for interpolation */
  children?: ReactNode;
  
  /** Count value for pluralization */
  count?: number;
  
  /** Parent component to wrap the translated content */
  parent?: ComponentType<any> | string;
  
  /** Translation key to use */
  i18nKey?: string;
  
  /** Context for translation (e.g., 'male', 'female') */
  context?: string;
  
  /** Additional translation options */
  tOptions?: TOptions;
  
  /** Values for interpolation */
  values?: Record<string, unknown>;
  
  /** Default translation if key is not found */
  defaults?: string;
  
  /** Named components for replacements in translation */
  components?: readonly ReactElement[] | Record<string, ReactElement>;
  
  /** Namespace(s) to use for translation */
  ns?: Namespace | readonly Namespace[];
  
  /** Custom i18next instance */
  i18n?: i18n;
  
  /** Custom translation function */
  t?: TFunction;
  
  /** Whether to unescape HTML entities in translation */
  shouldUnescape?: boolean;
  
  /** Additional props to pass to parent component */
  [key: string]: any;
}

/**
 * Internal interpolation options for Trans component
 */
interface InterpolationOptions extends TOptions {
  interpolation?: {
    prefix?: string;
    suffix?: string;
    [key: string]: any;
  };
}

/**
 * Parsed HTML node structure from html-parse-stringify
 */
interface ParsedNode {
  type: 'tag' | 'text';
  name: string;
  attrs: Record<string, string>;
  children: ParsedNode[];
  content?: string;
  voidElement?: boolean;
  dummy?: boolean;
}

/**
 * Trans component for advanced translation with component interpolation.
 * 
 * Allows mixing React components with translated text, supporting:
 * - Pluralization via count prop
 * - Component interpolation (e.g., <Trans>Hello <strong>world</strong></Trans>)
 * - Variable interpolation via values prop
 * - Context-based translations
 * 
 * @example
 * <Trans i18nKey="welcome" values={{ name: 'John' }}>
 *   Hello <strong>{{ name }}</strong>!
 * </Trans>
 */
export function Trans(props: TransProps): ReactElement | ReactNode;

/**
 * Converts React node tree to a string representation for use as translation key.
 * 
 * @param children - React children to convert
 * @param options - Trans component options affecting node processing
 * @returns String representation of the node tree
 * 
 * @example
 * nodesToString(<div>Hello <strong>world</strong></div>, options)
 * // Returns: "<0>Hello <1>world</1></0>"
 */
export function nodesToString(
  children: ReactNode,
  options: TransReactOptions
): string;

/**
 * Checks if a React element has children.
 * 
 * @param element - React element to check
 * @param checkLength - If true, checks that children array has length > 0
 * @returns True if element has children
 */
declare function hasChildren(
  element: ReactElement | null | undefined,
  checkLength?: boolean
): boolean;

/**
 * Extracts children from a React element.
 * 
 * @param element - React element or children array
 * @returns Array of child elements
 */
declare function getChildren(
  element: ReactElement | ReactNode[] | ReactNode
): ReactNode[];

/**
 * Normalizes input to an array.
 * 
 * @param input - Value to normalize
 * @returns Array containing the input or the input itself if already an array
 */
declare function toArray<T>(input: T | T[]): T[];

/**
 * Merges object properties (internal helper for object spreading).
 * 
 * @param target - Target object to merge into
 * @param sources - Source objects to merge from
 * @returns Merged object
 */
declare function mergeObjects<T extends Record<string, any>>(
  target: T,
  ...sources: Partial<T>[]
): T;

/**
 * Renders translated content with component interpolation.
 * 
 * @param components - Named components for interpolation
 * @param translatedString - Translated string with placeholder tags
 * @param i18nInstance - i18next instance
 * @param reactOptions - Trans component configuration
 * @param translationOptions - Translation options with interpolation values
 * @param shouldUnescape - Whether to unescape HTML entities
 * @returns Array of React nodes representing the interpolated content
 */
declare function renderNodes(
  components: readonly ReactElement[] | Record<string, ReactElement> | undefined,
  translatedString: string,
  i18nInstance: i18n,
  reactOptions: TransReactOptions,
  translationOptions: TOptions,
  shouldUnescape?: boolean
): ReactNode[];

/**
 * Processes parsed HTML nodes and maps them to React components.
 * 
 * @param reactComponents - Array of React components for interpolation
 * @param parsedNodes - Parsed HTML node tree
 * @param nestedComponents - Components from nested context
 * @returns Processed React node array
 */
declare function mapAST(
  reactComponents: ReactElement[],
  parsedNodes: ParsedNode[],
  nestedComponents: Record<string, ReactElement>[]
): ReactNode[];