/**
 * Design import management module
 * Handles success and failure logic for design import operations
 */

/**
 * Signal type for event dispatching in HSCore
 */
interface HSCoreSignal {
  dispatch(...args: unknown[]): void;
}

/**
 * HSCore utilities namespace
 */
declare namespace HSCore {
  namespace Util {
    class Signal implements HSCoreSignal {
      dispatch(...args: unknown[]): void;
    }
  }
}

/**
 * Live hint status enumeration
 */
declare enum LiveHintStatusEnum {
  warning = 'warning',
  success = 'success',
  error = 'error',
  info = 'info'
}

/**
 * Live hint configuration options
 */
interface LiveHintOptions {
  /** Status type of the hint */
  status: LiveHintStatusEnum;
  /** Whether the hint can be closed by user */
  canclose: boolean;
}

/**
 * Live hint utility for displaying user notifications
 */
declare namespace LiveHint {
  const statusEnum: typeof LiveHintStatusEnum;
  function show(
    message: string,
    duration: number,
    callback?: () => void,
    options?: LiveHintOptions
  ): void;
}

/**
 * View mode enumeration for rendering
 */
declare enum ViewModeEnum {
  /** 2D plane view */
  Plane = 'Plane',
  /** Room Camera Perspective view */
  RCP = 'RCP'
}

/**
 * Image generation parameters
 */
interface ImageGenerationParams {
  /** Image width in pixels */
  width: number;
  /** Image height in pixels */
  height: number;
  /** Scaling factor */
  factor: number;
  /** Environment ID to render */
  environment: string;
  /** View mode for rendering */
  viewMode: ViewModeEnum;
}

/**
 * Automation test utility
 */
interface AutomationTestUtil {
  /** Check if running in automation test mode */
  isAutomationTest(): boolean;
  /** Generate 2D image from current scene */
  get2DImage(params: ImageGenerationParams): Promise<string>;
  /** Save base64 encoded image as PNG file */
  saveBase64ToPng(base64Data: string, viewMode: ViewModeEnum): void;
}

/**
 * Full screen loading overlay UI
 */
interface FullScreenLoading {
  /** Check if loading overlay is currently showing */
  isShowing(): boolean;
  /** Hide the loading overlay */
  hide(): void;
}

/**
 * HSApp UI namespace
 */
declare namespace HSApp {
  namespace UI {
    const FullScreenLoading: FullScreenLoading;
  }

  namespace View {
    const ViewModeEnum: typeof ViewModeEnum;
  }

  namespace App {
    interface Application {
      /** Default environment identifier */
      defaultEnvironmentId: string;
    }
    function getApp(): Application;
  }
}

/**
 * Success callback function type for design import
 */
type ImportSuccessCallback = (
  data: unknown,
  metadata: unknown,
  context: unknown
) => void;

/**
 * Manager class for handling design import operations
 * Coordinates UI feedback and automation testing during design import/application
 */
declare class DesignImportManager {
  /** Signal dispatched when design import is canceled */
  signalImportDesignCanceled: HSCoreSignal;
  
  /** Signal dispatched when room design is successfully applied */
  signalRoomDesignApplied: HSCoreSignal;

  constructor();

  /**
   * Handle success logic after design import
   * Hides loading screen, executes callback, and triggers automation test screenshots if applicable
   * 
   * @param callback - Function to execute after successful import
   * @param data - Import data payload
   * @param metadata - Additional metadata about the import
   * @param context - Contextual information for the import operation
   */
  dealWithSuccessLogicAfterImport(
    callback: ImportSuccessCallback,
    data: unknown,
    metadata: unknown,
    context: unknown
  ): void;

  /**
   * Handle failure logic after design import
   * Hides loading screen, displays error message, and dispatches cancellation signal
   * 
   * @param errorCode - Error code or identifier for the failure
   * @param errorMessage - Human-readable error message to display
   */
  dealWithFailLogicAfterImport(
    errorCode: unknown,
    errorMessage: string
  ): void;
}

export default DesignImportManager;