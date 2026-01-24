/**
 * Feedback textarea edit block component for collecting user feedback with text and image support.
 * Provides a rich text editor with image paste functionality and character limit validation.
 */

import type { RefObject } from 'react';
import type { FeedbackBlock } from './FeedbackBlock';

/**
 * Data structure for feedback textarea content
 */
interface FeedbackTextareaData {
  /** The text content of the feedback */
  content?: string;
}

/**
 * Props for FeedbackTextareaEditBlock component
 */
interface FeedbackTextareaEditBlockProps {
  /** Form field name */
  name: string;
  /** Label text displayed above the textarea */
  label: string;
  /** Whether this field is required */
  required?: boolean;
  /** Maximum character length allowed */
  maxLen: number;
  /** Initial data for the textarea */
  data?: FeedbackTextareaData;
}

/**
 * Component state structure
 */
interface FeedbackTextareaEditBlockState {
  /** Current text value (filtered) */
  value: string;
  /** Absolute text value (raw) */
  absoluteValue: string;
  /** Current text length */
  textLen: number;
  /** List of uploaded image URLs */
  imgList: string[];
}

/**
 * Editor instance reference type
 */
interface EditorRef {
  /** The editor instance */
  editor: {
    /** Text container DOM element */
    $textContainerElem: {
      elems: HTMLElement[];
    };
    /** Text editing methods */
    txt: {
      /** Get current text content */
      text(): string;
      /** Append content to editor */
      append(content: string): void;
      /** Get HTML content */
      html(): string;
    };
    /** Text element reference */
    $textElem?: {
      elems: HTMLElement[];
    };
  };
}

/**
 * Editor configuration options
 */
interface EditorConfig {
  /** Editor height in pixels */
  height: number;
  /** Available menu items (empty for no menus) */
  menus: string[];
  /** Whether to filter pasted styles */
  pasteFilterStyle: boolean;
  /** Whether to ignore pasted images */
  pasteIgnoreImg: boolean;
  /** Whether to show fullscreen button */
  showFullScreen: boolean;
  /** Whether to display images as base64 */
  uploadImgShowBase64: boolean;
  /** Placeholder text */
  placeholder: string;
  /** Z-index for editor */
  zIndex: number;
}

/**
 * Return type for getValue method
 */
interface FeedbackValue {
  [key: string]: string | string[];
  'extraData.image'?: string[];
}

/**
 * FeedbackTextareaEditBlock component
 * 
 * A rich text editor component for collecting feedback with support for:
 * - Text input with character limit
 * - Image paste functionality
 * - Required field validation
 * - Real-time character counting
 * 
 * @extends FeedbackBlock
 */
export declare class FeedbackTextareaEditBlock extends FeedbackBlock<
  FeedbackTextareaEditBlockProps,
  FeedbackTextareaEditBlockState
> {
  /**
   * Reference to the editor component
   */
  editorRef: RefObject<EditorRef>;

  /**
   * Constructor
   * @param props - Component props
   */
  constructor(props: FeedbackTextareaEditBlockProps);

  /**
   * Lifecycle: Called after component mounts
   * Binds event handlers to the editor
   */
  componentDidMount(): void;

  /**
   * Lifecycle: Called before component unmounts
   * Removes event handlers from the editor
   */
  componentWillUnmount(): void;

  /**
   * Handles image paste events
   * Uploads image to S3 and inserts into editor
   * 
   * @param file - The image file to upload
   * @param callback - Callback function receiving the uploaded image URL
   */
  handleImg(file: File, callback: (url: string) => void): Promise<void>;

  /**
   * Binds event handlers to the editor
   * - Handles paste events for image upload
   * - Prevents event propagation for keydown/keypress
   * - Enforces character limit on keypress
   */
  bindEvents(): void;

  /**
   * Removes event handlers from the editor
   */
  offEvents(): void;

  /**
   * Gets the current form value
   * Returns an object with the field name as key and content as value
   * If images exist, adds them to extraData.image
   * 
   * @returns Object containing form field value and optional image data
   */
  getValue(): FeedbackValue;

  /**
   * Indicates whether this component extends data structure
   * @returns Always returns true
   */
  dataExtend(): boolean;

  /**
   * Checks if the field is empty when required
   * @returns True if field is required and empty, false otherwise
   */
  isEmpty(): boolean;

  /**
   * Keeps cursor at the end of the content
   * @param element - The DOM element to focus
   */
  keepLastIndex(element: HTMLElement | null): void;

  /**
   * Renders the feedback textarea edit block component
   * @returns React element
   */
  render(): JSX.Element;
}