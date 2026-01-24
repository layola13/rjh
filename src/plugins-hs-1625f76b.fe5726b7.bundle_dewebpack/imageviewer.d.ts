/**
 * Image viewer component for AI mood board functionality
 * @module ImageViewer
 */

/**
 * Props for the ImageViewer component
 */
export interface ImageViewerProps {
  /**
   * Callback function to close the image viewer
   */
  close: () => void;

  /**
   * Main task identifier for the mood board
   */
  taskId: string;

  /**
   * Sub-task identifier for the mood board parsing model
   */
  subTaskId: string;
}

/**
 * Message event types for postMessage communication
 */
type MessageEventType = 'closePopup' | 'applyDesign';

/**
 * Structure of message data received from iframe
 */
interface MessageEventData {
  /**
   * Event type identifier
   */
  eType: MessageEventType;
}

/**
 * Extended MessageEvent with typed data
 */
interface CustomMessageEvent extends MessageEvent {
  data?: MessageEventData;
}

/**
 * Response structure from mood board parse model submission
 */
interface MoodParseModelResponse {
  /**
   * Return status codes array
   */
  ret?: string[];
}

/**
 * ImageViewer React component for displaying and interacting with AI-generated mood boards
 * 
 * Features:
 * - Displays mood board content in an iframe
 * - Handles cross-origin communication via postMessage
 * - Supports closing viewer and applying designs
 * - Integrates with event tracking and plugin system
 * 
 * @param props - Component properties
 * @returns React functional component
 */
export declare function ImageViewer(props: ImageViewerProps): React.ReactElement;

/**
 * Global HSApp namespace (assumed to be available in runtime)
 */
declare global {
  namespace HSApp {
    namespace Config {
      const EZHOME_HOST: string;
    }

    namespace Util {
      enum EventGroupEnum {
        Catalog = 'Catalog'
      }

      namespace EventTrack {
        function instance(): EventTracker;
      }

      interface EventTracker {
        track(group: EventGroupEnum, eventName: string): void;
      }
    }

    namespace App {
      function getApp(): Application;

      interface Application {
        pluginManager: PluginManager;
      }

      interface PluginManager {
        getPlugin(pluginType: string): Plugin | null;
      }

      interface Plugin {
        executeAction(actionName: string, params: Record<string, unknown>): void;
      }
    }
  }

  namespace HSFPConstants {
    namespace PluginType {
      const StartUpAction: string;
    }
  }

  const ResourceManager: {
    getString(key: string): string;
  };
}