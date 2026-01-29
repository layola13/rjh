import { FeedbackSwitchBlock } from './FeedbackSwitchBlock';
import { clientRecordingChannel } from './constants';

interface IpcRenderer {
  send(channel: string): void;
  once(channel: string, listener: (event: unknown, data: string | null) => void): void;
}

interface ElectronWindow extends Window {
  electron: {
    ipcRenderer: IpcRenderer;
  };
}

declare const window: ElectronWindow;

/**
 * Feedback upload video component that extends FeedbackSwitchBlock.
 * Handles video recording retrieval via IPC communication.
 */
export class FeedbackUploadVideo extends FeedbackSwitchBlock {
  /**
   * Retrieves the recorded video data if the component is checked.
   * @returns Promise resolving to the video data string, or undefined if not checked
   */
  async getValue(): Promise<string | undefined> {
    if (!this.state.checked) {
      return;
    }

    const videoData = await this.requestRecording();
    return videoData;
  }

  /**
   * Requests recording data from the Electron main process via IPC.
   * @returns Promise resolving to the recording data string
   */
  private requestRecording(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const ipcRenderer = window.electron.ipcRenderer;
      
      ipcRenderer.send(clientRecordingChannel);
      
      ipcRenderer.once(clientRecordingChannel, (_event: unknown, data: string | null) => {
        if (data) {
          resolve(data);
        } else {
          reject();
        }
      });
    });
  }
}