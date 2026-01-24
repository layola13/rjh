/**
 * Feedback dialog type definitions
 * Provides UI components for collecting user feedback on recommendations
 */

/**
 * Enum defining types of feedback dialogs
 */
export enum FEEDBACK_TYPE_ENUM {
  /** Feedback for auto-recommendation features */
  AUTORECOMMEND = "recommend_autorecommend_feedback_tip",
  /** Feedback for accessory recommendations */
  ACCESSORIES = "recommend_accessories_feedback_tip",
  /** Other types of feedback */
  OTHERS = "其他"
}

/**
 * Props for the FeedbackDialog component
 */
export interface FeedbackDialogProps {
  /** Type of feedback dialog to display */
  type: string;
  /** Callback invoked when dialog is closed */
  onClose: () => void;
  /** Optional callback invoked when user indicates satisfaction */
  onSatisfy?: () => void;
  /** Optional callback invoked when user indicates dissatisfaction */
  onUnSatisfy?: () => void;
}

/**
 * Feedback dialog component
 * Displays a dialog allowing users to provide satisfaction feedback
 * 
 * @param props - Component properties
 * @returns React element representing the feedback dialog
 */
export declare const FeedbackDialog: React.FC<FeedbackDialogProps>;

/**
 * Factory function parameters for creating feedback dialogs
 */
export interface FeedbackDialogFactoryParams {
  /** Type of feedback dialog */
  type: string;
  /** Callback for close action */
  onClose?: () => void;
  /** Callback for satisfaction action */
  onSatisfy?: () => void;
  /** Callback for dissatisfaction action */
  onUnSatisfy?: () => void;
}

/**
 * Factory function to create FeedbackDialog instances
 * 
 * @param type - Type of feedback dialog (from FEEDBACK_TYPE_ENUM)
 * @param onClose - Optional callback invoked when dialog closes (defaults to noop)
 * @param onSatisfy - Optional callback invoked on positive feedback (defaults to noop)
 * @param onUnSatisfy - Optional callback invoked on negative feedback (defaults to noop)
 * @returns React element instance of FeedbackDialog
 */
export declare function FeedbackDialogFactory(
  type: string,
  onClose?: () => void,
  onSatisfy?: () => void,
  onUnSatisfy?: () => void
): React.ReactElement<FeedbackDialogProps>;