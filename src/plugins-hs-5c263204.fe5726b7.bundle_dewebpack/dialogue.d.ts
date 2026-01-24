/**
 * Dialogue component props interface
 * Represents a single dialogue message in the chat interface
 */
export interface DialogueProps {
  /** Current interaction state containing selections and callbacks */
  interaction: InteractionState;
  
  /** Whether the dialogue is currently loading */
  isLoading: boolean;
  
  /** Whether this message is from the host (AI assistant) */
  isHost: boolean;
  
  /** Whether user interaction should be disabled */
  disableInteraction: boolean;
  
  /** Callback function to refresh the UI */
  uiRefresh?: () => void;
  
  /** Whether the dialogue is in processing state */
  isProcess: boolean;
  
  /** Function to update the dialogue data list */
  setDialogueDataList: (data: DialogueData[]) => void;
  
  /** Function to update loading state */
  setLoading: (loading: boolean) => void;
  
  /** Custom component data for specialized UI elements */
  customedCompData?: CustomComponentData;
  
  /** Function to set text input state */
  setTextInputingFunc?: (isInputing: boolean) => void;
  
  /** Function to set whether current user is AI modeler */
  setIsCurrentAIModeler?: (isModeler: boolean) => void;
  
  /** Avatar image URL for the message sender */
  avatar: string;
  
  /** Message content (can be string, HTML, or structured data) */
  content: string | StructuredContent;
  
  /** Timestamp of when the message was created */
  timestamp: number;
  
  /** Whether to display the timestamp */
  isShowtime: boolean;
  
  /** Whether this is a temporary message */
  isTemporary?: boolean;
  
  /** Whether the user is blocked from interaction */
  isBlocked?: boolean;
  
  /** The most recent user request text */
  newestUserReq: string;
  
  /** Callback when user commits an action */
  onCommit?: () => void;
  
  /** Callback when user inputs text */
  onUserInput: (input: string) => void;
  
  /** Callback when dialogue should be terminated */
  onDialogueTerminate: () => void;
}

/**
 * Interaction state containing user selections and callbacks
 */
export interface InteractionState {
  /** Array of selection items for user to choose from */
  selectionItem?: SelectionItem[];
  
  /** Callback function when user makes a selection */
  selectionCallback: (index: number) => void;
  
  /** Custom component data for specialized interactions */
  customComponentData?: CustomComponentData;
}

/**
 * Individual selection item in a dialogue interaction
 */
export interface SelectionItem {
  /** Display label for the selection button */
  label: string;
  
  /** Index of this selection item */
  index: number;
  
  /** Whether this button is disabled */
  disabled?: boolean;
  
  /** Whether this is a file upload confirmation button */
  isConfirmUploadBtn?: boolean;
}

/**
 * Dialogue data structure for the message list
 */
export interface DialogueData {
  /** Avatar image URL */
  avatar: string;
  
  /** Message content */
  content: string;
  
  /** Whether this is from the host (AI) */
  isHost: boolean;
  
  /** Whether to show timestamp */
  isShowtime: boolean;
  
  /** Interaction state for this message */
  interaction: InteractionState;
  
  /** Message timestamp */
  timestamp: number;
  
  /** Whether this is a temporary message */
  isTemporary?: boolean;
  
  /** Custom component data */
  customedCompData?: CustomComponentData;
}

/**
 * Structured content types for complex message layouts
 */
export type StructuredContent = DropDownContent | LinkContent;

/**
 * Dropdown content structure
 */
export interface DropDownContent {
  /** Content type identifier */
  type: 'dropDown';
  
  /** Dropdown data */
  data: {
    /** Main message text */
    message?: string;
    
    /** Dropdown menu items */
    items?: DropDownItem[];
    
    /** Tutorial section title */
    tutorialTitle?: string;
    
    /** Tutorial items */
    tutorials?: TutorialItem[];
  };
}

/**
 * Link content structure
 */
export interface LinkContent {
  /** Content type identifier */
  type: 'link';
  
  /** Link data */
  data: {
    /** Message text */
    message?: string;
    
    /** Link URL */
    url?: string;
    
    /** Link display text */
    text?: string;
    
    /** Click handler */
    onClick?: () => void;
  };
}

/**
 * Dropdown menu item
 */
export interface DropDownItem {
  /** Item label */
  label: string;
  
  /** Item value */
  value: string | number;
}

/**
 * Tutorial list item
 */
export interface TutorialItem {
  /** Tutorial title */
  title: string;
  
  /** Tutorial URL */
  url: string;
}

/**
 * Custom component data types
 */
export type CustomComponentData = 
  | RadioComponentData 
  | CheckboxComponentData 
  | BlockOptionsComponentData 
  | LinkComponentData;

/**
 * Radio button component data
 */
export interface RadioComponentData {
  type: 'radio';
  options: Array<{
    label: string;
    value: string | number;
  }>;
}

/**
 * Checkbox component data
 */
export interface CheckboxComponentData {
  type: 'checkbox';
  options: Array<{
    label: string;
    value: string | number;
    checked?: boolean;
  }>;
}

/**
 * Block options component data
 */
export interface BlockOptionsComponentData {
  type: 'blockOption';
  options: Array<{
    label: string;
    value: string | number;
    icon?: string;
  }>;
}

/**
 * Link component data
 */
export interface LinkComponentData {
  type: 'link';
  url: string;
  text: string;
  onClick?: () => void;
}

/**
 * Dialogue component for rendering individual chat messages
 * Supports rich content including selections, dropdowns, links, and custom components
 * 
 * @param props - Dialogue component properties
 * @returns React element representing a single dialogue message
 */
export declare function Dialogue(props: DialogueProps): JSX.Element;