import React from 'react';

/**
 * Cookie key for storing user guide read status
 */
declare const GUIDE_READ_COOKIE_KEY = "pinhua-userguidereaded";

/**
 * Props for the UserGuideDialog component
 */
interface UserGuideDialogProps {
  /** Additional props passed to the component */
  [key: string]: unknown;
}

/**
 * State for the UserGuideDialog component
 */
interface UserGuideDialogState {
  /** Whether the user has already read the guide */
  guideReaded: boolean;
}

/**
 * Reference to the dialog component
 */
interface DialogRef {
  /** Handler for closing the dialog via cancel button */
  handleCancelClick: () => void;
}

/**
 * Props for the UploadContent component (shown after guide is completed)
 */
interface UploadContentProps {
  /** Callback invoked when content is loaded */
  onLoad: () => void;
  /** Callback to reset the guide read state */
  needGuide: () => void;
}

/**
 * Props for the GuideContent component (shown on first visit)
 */
interface GuideContentProps {
  /** Callback invoked when user completes the guide */
  next: () => void;
}

/**
 * Props for the Dialog component wrapper
 */
interface DialogWrapperProps {
  /** Unique identifier for the dialog window */
  windowname: string;
  /** Title text displayed in dialog header */
  headername: string;
  /** Content to render inside the dialog */
  contents: React.ReactElement;
  /** Width of the dialog window in pixels */
  winwidth: number;
  /** Reference callback for accessing dialog methods */
  ref?: (instance: DialogRef | null) => void;
}

/**
 * User guide dialog component that shows either an introductory guide
 * or upload interface based on whether the user has completed the guide.
 * 
 * Uses cookies to persist guide completion state across sessions.
 */
declare class UserGuideDialog extends React.Component<UserGuideDialogProps, UserGuideDialogState> {
  /** Reference to the dialog wrapper component */
  private ref?: DialogRef;

  /**
   * Initialize component with guide read state from cookies
   */
  constructor(props: UserGuideDialogProps);

  /**
   * Mark the guide as completed and update state
   * Sets cookie and transitions to upload view
   */
  private onGuideFinish: () => void;

  /**
   * Reset the guide completion state
   * Clears cookie and returns to guide view
   */
  private resetGuideReadState: () => void;

  /**
   * Close the dialog by triggering the cancel handler
   */
  private close: () => void;

  /**
   * Render the appropriate dialog content based on guide completion state
   * @returns Dialog with either guide content or upload interface
   */
  render(): React.ReactElement<DialogWrapperProps>;
}

/**
 * UploadContent component - displays tile upload interface after guide completion
 */
declare const UploadContent: React.ComponentType<UploadContentProps>;

/**
 * GuideContent component - displays introductory guide for first-time users
 */
declare const GuideContent: React.ComponentType<GuideContentProps>;

/**
 * DialogWrapper component - modal dialog container
 */
declare const DialogWrapper: React.ComponentType<DialogWrapperProps>;

/**
 * ResourceManager utility for retrieving localized strings
 */
declare const ResourceManager: {
  /**
   * Get localized string by key
   * @param key - Resource string identifier
   * @returns Localized string value
   */
  getString(key: string): string;
};

export default UserGuideDialog;