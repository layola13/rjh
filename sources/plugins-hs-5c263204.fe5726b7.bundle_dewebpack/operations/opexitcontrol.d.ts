import { OperationId, BaseOperation } from './operations';

/**
 * Operation controller for handling exit actions in the application.
 * Manages navigation back behavior and environment cleanup when exiting render mode.
 */
export class OpExitControl extends BaseOperation {
  /**
   * Returns the unique identifier for this operation.
   * @returns The exit operation ID
   */
  static getId(): OperationId {
    return OperationId.Exit;
  }

  /**
   * Executes the exit operation logic.
   * Handles back navigation through UI elements and exits render environment if applicable.
   * 
   * @param context - The execution context containing operation state and parameters
   */
  onExecute(context: OperationContext): void {
    // Only proceed if this is not a question tone operation
    if (context.isQuestionTone === 0) {
      // Attempt to click the back button in the render image browser header
      const headerBackButton = document.querySelector<HTMLElement>(
        '#renderImageBrowser .ribpCommonHeader .back-button'
      );
      headerBackButton?.click();

      // Schedule a delayed click on the grid header back button
      setTimeout(() => {
        const gridBackButton = document.querySelector<HTMLElement>(
          '#renderImageBrowser .ribpGridHeader .back-container'
        );
        gridBackButton?.click();
      }, 10);

      // Exit render environment if currently in render mode
      if (this.app.activeEnvironmentId === 'render') {
        this.app.pluginManager
          .getPlugin<RenderPlugin>('hsw.plugin.render.Plugin')
          .exitRenderEnvironment();
      }

      // Mark operation as completed
      context.isFuncDone = true;

      // Get and set recommended follow-up operations
      const recommendedOperations = OpExitControl.getRecommendedOperationTypes(
        OpExitControl.getId()
      );
      context.recommendedOperationTypes = recommendedOperations;
    }

    // Finalize the operation
    this.onFinish('success', context.reply, context);
  }
}

/**
 * Context object passed to operation execution methods.
 */
interface OperationContext {
  /** Indicates if the operation was triggered in question tone mode (0 = false, non-zero = true) */
  isQuestionTone: number;
  
  /** Flag indicating whether the function has completed execution */
  isFuncDone: boolean;
  
  /** Response data to be sent back to the caller */
  reply: unknown;
  
  /** List of recommended operations to present to the user after this operation */
  recommendedOperationTypes?: OperationId[];
}

/**
 * Plugin interface for render-related functionality.
 */
interface RenderPlugin {
  /** Exits the render environment and returns to the default environment */
  exitRenderEnvironment(): void;
}