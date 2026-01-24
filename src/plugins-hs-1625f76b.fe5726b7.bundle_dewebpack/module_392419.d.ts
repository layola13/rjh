/**
 * CSS module for content tag dialog component
 * Provides styles for tag dialogs, tooltips, and property bars
 */

/**
 * CSS module export function signature
 * @param exports - Module exports object
 * @param cssLoader - CSS loader utility function
 * @param moduleId - Unique module identifier
 */
declare module 'module_392419' {
  /**
   * CSS loader function type
   * @param sourceMap - Whether to include source maps
   * @returns CSS loader instance with push method
   */
  type CSSLoader = (sourceMap: boolean) => {
    /**
     * Push CSS content to the loader
     * @param data - Tuple containing module ID and CSS content
     */
    push(data: [string, string]): void;
  };

  /**
   * Module initialization function
   * Loads and registers CSS styles for content tag dialog components
   * 
   * Styles include:
   * - `.contentTagDialog` - Main dialog container styles
   * - `.tagInfo` - Tag information display styles
   * - `.tagDialogContent` - Dialog content area styles
   * - `.contentTagTooltip` - Tooltip container styles
   * - `.propertybar-container` - Property bar styles
   * - Responsive styles for `.global-en` locale
   * 
   * @param exports - Module exports object to be populated
   * @param cssLoaderFactory - Factory function to create CSS loader (module 986380)
   * @param moduleId - Current module identifier
   */
  export default function(
    exports: { id: string; exports?: unknown },
    cssLoaderFactory: CSSLoader,
    moduleId: { id: string }
  ): void;

  /**
   * CSS class names available in this module
   */
  export interface ContentTagDialogStyles {
    /** Button base styles */
    'btn': string;
    /** Footer button container */
    'footerbuttons': string;
    /** Primary action button */
    'btn-primary': string;
    /** Default/cancel button */
    'btn-default': string;
    /** Tag information container */
    'tagInfo': string;
    /** Fixed width tag label */
    'tagItemLabelFixWidth': string;
    /** Tag item label */
    'tagItemLabel': string;
    /** Individual tag item */
    'tagItem': string;
    /** Tag item name */
    'tagItemName': string;
    /** Empty label placeholder */
    'emptyLabel': string;
    /** Editable tag info field */
    'editTagInfo': string;
    /** Multi-choice selection item */
    'multiChoiceItem': string;
    /** Multi-choice list item */
    'multiChoiceItemLi': string;
    /** Selected item state */
    'itemSelected': string;
    /** Item selection button */
    'itemSelectBtn': string;
    /** Dialog content container */
    'tagDialogContent': string;
    /** Dialog item row */
    'tagDialogItem': string;
    /** Multi-select dialog item */
    'tagDialogItemMulti': string;
    /** Single-select dialog item */
    'tagDialogItemSingle': string;
    /** Dialog item label */
    'tagDialogItemLabel': string;
    /** Multi-select item label */
    'tagDialogItemLabelMulti': string;
    /** Dropdown component */
    'dropdown': string;
    /** Tag input field */
    'tagInput': string;
    /** Input element */
    'input': string;
    /** Arrow group controls */
    'arrowgroup': string;
    /** Dropdown caret icon */
    'caret': string;
    /** Dropdown menu */
    'dropdown-menu': string;
    /** Large symbol class indicator */
    'bigSymbolClass': string;
    /** Single large symbol class */
    'bigSymbolClassSingle': string;
    /** Window header */
    'windowHeader': string;
    /** Image button in header */
    'imagebtn': string;
    /** Popup window container */
    'popupwindows': string;
    /** Empty divider element */
    'emptyDiv': string;
    /** Window wrapper */
    'windowWrapper': string;
    /** Close button */
    'popupwindow-close-btn': string;
    /** Window title */
    'title': string;
    /** Window contents area */
    'windowContents': string;
    /** Tooltip container */
    'contentTagTooltip': string;
    /** Tooltip text content */
    'contentTagTooltipText': string;
    /** Title tooltip wrapper */
    'contentTagTitleTip': string;
    /** Image button */
    'imageButton': string;
    /** Tooltip positioning container */
    'tooltipContainer': string;
    /** Unit label */
    'unitLabel': string;
    /** Clear float utility */
    'clear': string;
    /** Type selector */
    'type': string;
    /** Stack layout */
    'stack': string;
    /** Clearfix utility */
    'clearfix': string;
    /** Card title */
    'cardtitle': string;
    /** English locale overrides */
    'global-en': string;
    /** Property bar container */
    'propertybar-container': string;
    /** Content tag help icon */
    'content-tag-help': string;
    /** Contents wrapper */
    'contentsWrapper': string;
    /** Content tag select dropdown */
    'content-tag-select': string;
    /** Select container */
    'tp-select-container': string;
    /** Select value display */
    'tp-select-container-value': string;
    /** Select dropdown icon */
    'tp-select-downicon': string;
    /** Select popup menu */
    'content-tag-select-popup': string;
    /** Select popup domain */
    'tp-select-popdom': string;
    /** Number input component */
    'homestyler-numberinput': string;
    /** Number input wrapper */
    'homestyler-numberinput-wrap': string;
    /** Number input suffix */
    'homestyler-numberinput-suffix': string;
    /** Number input content */
    'homestyler-numberinput-content': string;
  }
}