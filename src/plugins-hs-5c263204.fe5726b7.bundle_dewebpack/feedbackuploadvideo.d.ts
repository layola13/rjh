/**
 * Feedback video upload component module
 * Handles video recording and upload functionality for user feedback
 */

import { FeedbackSwitchBlock } from './FeedbackSwitchBlock';

/**
 * IPC channel name for client recording communication
 */
export declare const clientRecordingChannel: string;

/**
 * State interface for FeedbackUploadVideo component
 */
interface FeedbackUploadVideoState {
  /**
   * Whether the video upload feature is enabled/checked
   */
  checked: boolean;
}

/**
 * Electron IPC renderer interface for video recording
 */
interface ElectronIpcRenderer {
  /**
   * Send a message to the main process
   * @param channel - The IPC channel name
   * @param args - Optional arguments to send
   */
  send(channel: string, ...args: unknown[]): void;

  /**
   * Listen for a single event from the main process
   * @param channel - The IPC channel name
   * @param listener - Callback function to handle the event
   */
  once(
    channel: string,
    listener: (event: unknown, response: unknown) => void
  ): void;
}

/**
 * Extended Window interface with Electron APIs
 */
interface WindowWithElectron extends Window {
  electron: {
    ipcRenderer: ElectronIpcRenderer;
  };
}

/**
 * Feedback video upload component
 * Extends FeedbackSwitchBlock to provide video recording capabilities
 * for user feedback submissions
 */
export declare class FeedbackUploadVideo extends FeedbackSwitchBlock {
  /**
   * Component state
   */
  state: FeedbackUploadVideoState;

  /**
   * Retrieves the recorded video data from the Electron main process
   * 
   * @returns Promise that resolves with the video data if recording is enabled,
   *          or undefined if the feature is not checked/enabled
   * 
   * @throws May reject if the IPC communication fails or video recording is unavailable
   * 
   * @remarks
   * This method:
   * 1. Checks if video recording is enabled via `state.checked`
   * 2. Sends a request to the Electron main process via IPC
   * 3. Waits for the response containing the recorded video data
   * 4. Returns the video data or undefined if disabled
   */
  getValue(): Promise<unknown | undefined>;
}