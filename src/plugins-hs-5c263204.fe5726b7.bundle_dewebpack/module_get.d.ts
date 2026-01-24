/**
 * Feedback entry interface representing user feedback data
 * 
 * @module module_get
 * @description Retrieves the FeedbackEntry class/interface from the parent module
 */

/**
 * Represents a single feedback entry in the system
 */
export interface FeedbackEntry {
  /** Unique identifier for the feedback entry */
  id: string;
  
  /** Timestamp when the feedback was created */
  timestamp: number | Date;
  
  /** User ID who submitted the feedback */
  userId?: string;
  
  /** Feedback content or message */
  content: string;
  
  /** Rating or score associated with the feedback (if applicable) */
  rating?: number;
  
  /** Category or type of feedback */
  type?: 'bug' | 'feature' | 'improvement' | 'comment' | string;
  
  /** Current status of the feedback */
  status?: 'pending' | 'reviewed' | 'resolved' | 'closed';
  
  /** Additional metadata associated with the feedback */
  metadata?: Record<string, unknown>;
}

/**
 * Factory function that returns the FeedbackEntry type/class
 * 
 * @returns The FeedbackEntry class or interface
 */
declare function getFeedbackEntry(): typeof FeedbackEntry;

export default getFeedbackEntry;