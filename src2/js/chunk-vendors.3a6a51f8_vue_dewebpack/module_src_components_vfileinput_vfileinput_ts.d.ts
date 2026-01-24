/**
 * VFileInput Component
 * A file input component that extends VTextField with file selection capabilities
 */

import Vue, { VNode, PropType } from 'vue';
import { VTextField } from '../VTextField';
import { VChip } from '../VChip';

/**
 * File object structure
 */
interface FileObject extends File {
  name: string;
  size: number;
}

/**
 * Selection slot scope data
 */
interface SelectionSlotScope {
  /** Formatted text representation of the file */
  text: string;
  /** The file object */
  file: FileObject;
  /** Index of the file in the selection */
  index: number;
}

/**
 * Component computed properties interface
 */
interface VFileInputComputed {
  /** Combined CSS classes for the component */
  classes: Record<string, boolean>;
  /** Computed counter value with size information */
  computedCounterValue: string;
  /** Internal array representation of selected files */
  internalArrayValue: FileObject[];
  /** Internal file value getter/setter */
  internalValue: FileObject | FileObject[] | undefined;
  /** Whether the input has any files selected */
  isDirty: boolean;
  /** Whether the label should be in active state */
  isLabelActive: boolean;
  /** Whether multiple file selection is enabled */
  isMultiple: boolean;
  /** Array of formatted file names */
  text: string[];
  /** Base unit for file size calculation (1000 or 1024) */
  base: number | undefined;
  /** Whether chips display mode is enabled */
  hasChips: boolean;
}

/**
 * VFileInput component declaration
 * Extends VTextField to provide file input functionality with chips, counter, and size display
 */
declare const VFileInput: Vue.extend<
  Vue,
  {
    /** Internal lazy value storage */
    lazyValue: FileObject | FileObject[] | undefined;
    /** Initial value for reset functionality */
    initialValue: FileObject | FileObject[] | undefined;
  },
  {
    /**
     * Clear the file selection
     */
    clearableCallback(): void;

    /**
     * Generate chip components for selected files
     * @returns Array of VChip VNodes
     */
    genChips(): VNode[];

    /**
     * Generate the control element
     * @returns VNode for the control wrapper
     */
    genControl(): VNode;

    /**
     * Generate the input element and selections
     * @returns Array containing selections and input VNodes
     */
    genInput(): VNode[];

    /**
     * Generate the prepend icon slot
     * @returns VNode for prepend slot or null
     */
    genPrependSlot(): VNode | null;

    /**
     * Generate selection text display
     * @returns Array of formatted text strings
     */
    genSelectionText(): string[];

    /**
     * Generate the selections display area
     * @returns VNode containing file selections
     */
    genSelections(): VNode;

    /**
     * Generate the text field slot wrapper
     * @returns VNode for text field slot
     */
    genTextFieldSlot(): VNode;

    /**
     * Handle file input change event
     * @param event - The input change event
     */
    onInput(event: Event): void;

    /**
     * Handle keydown events
     * @param event - The keyboard event
     */
    onKeyDown(event: KeyboardEvent): void;

    /**
     * Truncate long file names with ellipsis
     * @param text - The file name to truncate
     * @returns Truncated file name
     */
    truncateText(text: string): string;
  },
  VFileInputComputed,
  {
    /** Display files as chips */
    chips: boolean;
    
    /** Show clear button (default: true) */
    clearable: boolean;
    
    /** Translation key for counter with size (default: "$vuetify.fileInput.counterSize") */
    counterSizeString: string;
    
    /** Translation key for counter (default: "$vuetify.fileInput.counter") */
    counterString: string;
    
    /** Hide the native input element */
    hideInput: boolean;
    
    /** Placeholder text when no file is selected */
    placeholder: string;
    
    /** Icon to display in prepend slot (default: "$file") */
    prependIcon: string;
    
    /** Make the input readonly (default: false, not supported) */
    readonly: boolean;
    
    /** Show file size in display (boolean or 1000/1024 for base unit) */
    showSize: boolean | 1000 | 1024;
    
    /** Display small-sized chips */
    smallChips: boolean;
    
    /** Maximum length before truncating file names (default: 22) */
    truncateLength: number | string;
    
    /** Input type attribute (default: "file") */
    type: string;
    
    /** Selected file(s) - single File or array of Files */
    value: FileObject | FileObject[] | undefined;
  }
>;

export default VFileInput;

/**
 * VFileInput Props Type Definition
 */
export interface VFileInputProps {
  chips?: boolean;
  clearable?: boolean;
  counterSizeString?: string;
  counterString?: string;
  hideInput?: boolean;
  placeholder?: string;
  prependIcon?: string;
  readonly?: boolean;
  showSize?: boolean | 1000 | 1024;
  smallChips?: boolean;
  truncateLength?: number | string;
  type?: string;
  value?: File | File[];
}

/**
 * VFileInput Events
 */
export interface VFileInputEvents {
  /** Emitted when file selection changes */
  change: FileObject | FileObject[] | undefined;
  
  /** Emitted on keydown events */
  keydown: KeyboardEvent;
}

/**
 * VFileInput Slots
 */
export interface VFileInputSlots {
  /** Customize file selection display */
  selection?: (scope: SelectionSlotScope) => VNode[];
  
  /** Prepend outer slot */
  prepend?: () => VNode[];
}