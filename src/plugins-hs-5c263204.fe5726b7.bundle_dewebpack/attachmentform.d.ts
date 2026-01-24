/**
 * AttachmentForm Component
 * 
 * A React component for handling file attachments with image preview functionality.
 * Supports uploading image files (PNG, JPEG) with loading states and error handling.
 * 
 * @module AttachmentForm
 */

import * as React from 'react';

/**
 * Form states during file upload lifecycle
 */
type FormState = 'add' | 'loading' | 'loaded' | 'fail';

/**
 * Component props for AttachmentForm
 */
interface AttachmentFormProps {
  /** Additional props can be extended here */
  [key: string]: any;
}

/**
 * Component state interface
 */
interface AttachmentFormState {
  /** Base64 data URL of the uploaded image */
  dataUrl: string;
  /** Current state of the form */
  formState: FormState;
}

/**
 * File information returned by getFile method
 */
interface AttachmentFile {
  /** Original filename */
  name: string;
  /** Base64 encoded data URL */
  dataUrl: string;
}

/**
 * Ref object structure for AttachmentForm component
 */
interface AttachmentFormRefs {
  /** File input element */
  fileElem: HTMLInputElement;
  /** SVG icon references */
  [key: `svgIcon-${string}`]: HTMLImageElement;
}

/**
 * AttachmentForm Component
 * 
 * Provides a user interface for uploading image attachments with:
 * - Click-to-upload functionality
 * - Image preview
 * - Loading indicator
 * - Error handling
 * - File removal capability
 * 
 * @example
 *