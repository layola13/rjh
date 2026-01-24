/**
 * ApplyAIMoodBoard Command
 * 
 * A command that applies AI-generated mood board layouts to selected rooms in the design tool.
 * Handles fetching mood board data from remote sources with retry logic and displays material picker for unused items.
 */

import { CommunityInspirationAction } from './CommunityInspirationAction';
import { HSCore } from './HSCore';

/**
 * Mood board data structure returned from the API
 */
interface MoodBoardData {
  /** URL to the mood board image */
  moodBoardImageUrl?: string;
  /** Layout configuration data */
  layouts?: unknown;
  /** Material assignments */
  materials?: unknown;
}

/**
 * Status information for mood board application progress
 */
interface ApplyStatus {
  /** Current status: 'pending' | 'processing' | 'completed' | 'failed' */
  status: string;
  /** IDs of items that couldn't be applied */
  unusedSeekIds?: string[];
  /** Associated mood board data */
  moodBoardData?: MoodBoardData;
}

/**
 * Execution parameters for the command
 */
interface ExecuteParams {
  /** Template ID for the mood board to apply */
  templateId?: string;
}

/**
 * API response structure from the mood board service
 */
interface MoodBoardApiResponse {
  /** Return status codes */
  ret?: string[];
  /** Response data payload */
  data?: {
    /** Whether data is available */
    hasData: boolean;
    /** URL to fetch JSON configuration */
    url: string;
  };
}

/**
 * Command for applying AI-generated mood boards to room layouts
 * 
 * @remarks
 * This command integrates with the design tool's selection system to apply
 * AI-curated mood boards to selected room faces. It handles:
 * - Fetching mood board data from remote services
 * - Retry logic with exponential backoff
 * - Material application to room layouts
 * - Displaying unused materials for manual selection
 * 
 * @extends CommunityInspirationAction
 */
export declare class ApplyAIMoodBoard extends CommunityInspirationAction {
  /**
   * Timer ID for retry operations
   * @private
   */
  private timerId?: number;

  /**
   * Cached mood board data
   * @private
   */
  private moodBoardData?: MoodBoardData;

  /**
   * Current template ID being processed
   * @private
   */
  private templateId?: string;

  /**
   * Execute the mood board application command
   * 
   * @param templateId - Optional template ID to use instead of cached value
   * @returns Promise resolving to true if application succeeded, false otherwise
   */
  executeCmd(templateId?: string): Promise<boolean>;

  /**
   * Called when the command is executed from the UI
   * 
   * @param params - Execution parameters including template ID
   */
  onExecute(params?: ExecuteParams): void;

  /**
   * Handler for document opened events
   * @private
   */
  private _onDocumentOpened(): void;

  /**
   * Attempt to fetch mood board data from URL query string template ID
   * 
   * @remarks
   * This method extracts the template ID from URL parameters and fetches
   * the associated mood board configuration
   */
  tryGetMoodBoardData(): Promise<void>;

  /**
   * Fetch mood board data with retry logic
   * 
   * @param templateId - Template ID to fetch data for
   * @returns Promise resolving to mood board data or undefined on failure
   * 
   * @remarks
   * Shows loading indicator and retries up to 12 times with 5-second delays.
   * Displays error hints on failure.
   */
  retryGetMoodBoardData(templateId: string): Promise<MoodBoardData | undefined>;

  /**
   * Get the JSON URL for a mood board template
   * 
   * @param templateId - Template ID to fetch URL for
   * @returns Promise resolving to the JSON data URL
   * 
   * @throws Rejects if API response indicates failure or no data
   */
  getJsonUrl(templateId: string): Promise<string>;

  /**
   * Fetch and parse JSON data from a URL
   * 
   * @param url - URL to fetch JSON from
   * @returns Promise resolving to the parsed JSON data
   * 
   * @remarks
   * Adds cache-busting timestamp and no-cache headers
   */
  fetchJsonData(url: string): Promise<MoodBoardData>;

  /**
   * Retry a promise-returning function with exponential backoff
   * 
   * @param promiseFn - Function that returns a Promise to retry
   * @param maxRetries - Maximum number of retry attempts (default: 12)
   * @param delayMs - Delay between retries in milliseconds (default: 5000)
   * @returns Promise resolving to the function's result or undefined after max retries
   * 
   * @template T - Return type of the promise function
   */
  retryPromise<T>(
    promiseFn: () => Promise<T>,
    maxRetries?: number,
    delayMs?: number
  ): Promise<T | undefined>;

  /**
   * Display material picker panel for unused mood board items
   * 
   * @param unusedSeekIds - Array of material IDs that weren't applied
   * @param coverImageUrl - URL of the mood board cover image
   * 
   * @remarks
   * Does nothing if unusedSeekIds array is empty
   */
  showPanel(unusedSeekIds: string[], coverImageUrl?: string): void;
}