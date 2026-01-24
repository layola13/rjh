/**
 * VFileInput Component Type Definitions
 * 
 * A file input component that extends VTextField, providing enhanced file selection
 * capabilities with features like chips display, file size counters, and custom styling.
 */

import Vue, { VNode, VueConstructor } from 'vue';
import { PropValidator } from 'vue/types/options';

/**
 * File size unit base type
 * - 1000: Decimal (SI) units (KB, MB, GB)
 * - 1024: Binary units (KiB, MiB, GiB)
 */
type FileSizeBase = 1000 | 1024;

/**
 * Model value type - accepts single File or array of Files
 */
type FileInputValue = File | File[] | null | undefined;

/**
 * Scoped slot data for custom selection rendering
 */
interface SelectionSlotData {
  /** Display text for the file */
  text: string;
  /** The File object */
  file: File;
  /** Index in the file array */
  index: number;
}

/**
 * Component props interface
 */
interface VFileInputProps {
  /** Display files as chips */
  chips?: boolean;
  
  /** Show clear button (default: true) */
  clearable?: boolean;
  
  /** Translation key for counter with size (default: "$vuetify.fileInput.counterSize") */
  counterSizeString?: string;
  
  /** Translation key for counter without size (default: "$vuetify.fileInput.counter") */
  counterString?: string;
  
  /** Hide the native file input element */
  hideInput?: boolean;
  
  /** Placeholder text when no files selected */
  placeholder?: string;
  
  /** Icon to display in prepend slot (default: "$file") */
  prependIcon?: string;
  
  /** Readonly state - NOT SUPPORTED, logs error (default: false) */
  readonly?: boolean;
  
  /** Show file sizes. Boolean or base unit (1000/1024) (default: false) */
  showSize?: boolean | FileSizeBase;
  
  /** Use small chips variant */
  smallChips?: boolean;
  
  /** Max filename length before truncation (default: 22) */
  truncateLength?: number | string;
  
  /** Input type attribute (default: "file") */
  type?: string;
  
  /** V-model value - File or File[] */
  value?: FileInputValue;
}

/**
 * Computed properties interface
 */
interface VFileInputComputed {
  /** Combined CSS classes including base VTextField classes */
  classes: Record<string, boolean>;
  
  /** Formatted counter text with file count and optional size */
  computedCounterValue: string;
  
  /** Internal value normalized to array */
  internalArrayValue: File[];
  
  /** Internal reactive value with getter/setter */
  internalValue: FileInputValue;
  
  /** Whether any files are selected */
  isDirty: boolean;
  
  /** Whether label should be in active state */
  isLabelActive: boolean;
  
  /** Whether multiple file selection is enabled */
  isMultiple: boolean;
  
  /** Array of formatted file names with optional sizes */
  text: string[];
  
  /** File size display base (1000 or 1024) */
  base: FileSizeBase | undefined;
  
  /** Whether chip display mode is active */
  hasChips: boolean;
}

/**
 * Component methods interface
 */
interface VFileInputMethods {
  /**
   * Clear all selected files
   */
  clearableCallback(): void;
  
  /**
   * Generate chip elements for each selected file
   * @returns Array of VChip VNodes
   */
  genChips(): VNode[];
  
  /**
   * Generate the control wrapper element
   * @returns Control VNode
   */
  genControl(): VNode;
  
  /**
   * Generate the file input element and selections display
   * @returns Array containing selections and input VNodes
   */
  genInput(): VNode[];
  
  /**
   * Generate the prepend icon slot
   * @returns Prepend slot VNode or null
   */
  genPrependSlot(): VNode | null;
  
  /**
   * Generate text display for selected files
   * @returns Array of display strings
   */
  genSelectionText(): string[];
  
  /**
   * Generate the selections display area
   * @returns Selections wrapper VNode
   */
  genSelections(): VNode;
  
  /**
   * Generate the text field slot with click handler
   * @returns Text field slot VNode
   */
  genTextFieldSlot(): VNode;
  
  /**
   * Handle file input change event
   * @param event - Native input change event
   */
  onInput(event: Event): void;
  
  /**
   * Handle keydown events
   * @param event - Keyboard event
   */
  onKeyDown(event: KeyboardEvent): void;
  
  /**
   * Truncate filename to specified length with ellipsis
   * @param text - Filename to truncate
   * @returns Truncated filename
   */
  truncateText(text: string): string;
}

/**
 * VFileInput Component
 * 
 * A file upload component that extends VTextField with enhanced file handling.
 * Supports single/multiple files, chip display, size indicators, and custom styling.
 * 
 * @example
 *