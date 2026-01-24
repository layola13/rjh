/**
 * MDI (Material Design Icons) SVG path definitions for common UI icons.
 * Each property contains an SVG path string that can be used with the <path> element.
 * All paths are designed for a 24x24 viewBox.
 */
declare module './src/services/icons/presets/mdi-svg' {
  /**
   * Collection of Material Design Icon SVG paths
   */
  interface MdiSvgIcons {
    /** Checkmark icon - indicates completion or confirmation */
    complete: string;
    
    /** Cancel icon - circle with X, used for canceling operations */
    cancel: string;
    
    /** Close icon - X symbol, used for closing dialogs or dismissing content */
    close: string;
    
    /** Delete icon - circle with X, used for delete operations */
    delete: string;
    
    /** Clear icon - X symbol, used for clearing input or content */
    clear: string;
    
    /** Success icon - circle with checkmark, indicates successful operation */
    success: string;
    
    /** Info icon - circle with 'i', used for informational messages */
    info: string;
    
    /** Warning icon - exclamation mark, used for warning messages */
    warning: string;
    
    /** Error icon - triangle with exclamation, used for error messages */
    error: string;
    
    /** Previous icon - left chevron, used for navigation backwards */
    prev: string;
    
    /** Next icon - right chevron, used for navigation forwards */
    next: string;
    
    /** Checkbox checked state - box with checkmark */
    checkboxOn: string;
    
    /** Checkbox unchecked state - empty box */
    checkboxOff: string;
    
    /** Checkbox indeterminate state - box with horizontal line */
    checkboxIndeterminate: string;
    
    /** Delimiter icon - filled circle, used as separator or bullet point */
    delimiter: string;
    
    /** Sort icon - vertical arrow, used for sorting operations */
    sort: string;
    
    /** Expand icon - downward chevron, used for expanding content */
    expand: string;
    
    /** Menu icon - three horizontal lines (hamburger menu) */
    menu: string;
    
    /** Subgroup icon - downward chevron, used for nested items */
    subgroup: string;
    
    /** Dropdown icon - downward chevron, used for dropdown menus */
    dropdown: string;
    
    /** Radio button selected state - filled circle with inner dot */
    radioOn: string;
    
    /** Radio button unselected state - empty circle */
    radioOff: string;
    
    /** Edit icon - pencil, used for editing operations */
    edit: string;
    
    /** Rating empty state - outline star, used in rating systems */
    ratingEmpty: string;
    
    /** Rating full state - filled star, used in rating systems */
    ratingFull: string;
    
    /** Rating half state - half-filled star, used in rating systems */
    ratingHalf: string;
    
    /** Loading icon - circular arrows, indicates loading state */
    loading: string;
    
    /** First page icon - double arrow pointing left, used for pagination */
    first: string;
    
    /** Last page icon - double arrow pointing right, used for pagination */
    last: string;
    
    /** Unfold icon - bidirectional vertical arrows, used for expand/collapse all */
    unfold: string;
    
    /** File attachment icon - paperclip, used for file operations */
    file: string;
    
    /** Plus icon - addition symbol, used for adding items */
    plus: string;
    
    /** Minus icon - subtraction symbol, used for removing items */
    minus: string;
  }

  const mdiSvgIcons: MdiSvgIcons;
  export default mdiSvgIcons;
}