export interface ActionConfig {
  actionType?: string;
  [key: string]: unknown;
}

export interface Action {
  manager?: ActionManager;
  onExecute(config: ActionConfig): void;
  onComplete(): void;
  onCancel(): void;
}

export type ActionType =
  | "communityInspiration"
  | "aiModelerUpload"
  | "aiMoodboardUpload"
  | "aiMaterial"
  | "applyAIMoodBoard"
  | "specialTopicModel";

export class CommunityInspirationAction implements Action {
  manager?: ActionManager;
  onExecute(config: ActionConfig): void {}
  onComplete(): void {}
  onCancel(): void {}
}

export class AIModelerAction implements Action {
  manager?: ActionManager;
  onExecute(config: ActionConfig): void {}
  onComplete(): void {}
  onCancel(): void {}
}

export class ApplyAIMoodBoard implements Action {
  manager?: ActionManager;
  onExecute(config: ActionConfig): void {}
  onComplete(): void {}
  onCancel(): void {}
}

export class SpecialTopicModel implements Action {
  manager?: ActionManager;
  onExecute(config: ActionConfig): void {}
  onComplete(): void {}
  onCancel(): void {}
}

export class ActionManager {
  private _currentAction?: Action;

  /**
   * Execute an action by type
   */
  execute(actionType: ActionType, config?: Record<string, unknown>): void {
    this.cancel();

    switch (actionType) {
      case "communityInspiration":
        this._currentAction = new CommunityInspirationAction();
        break;
      case "aiModelerUpload":
      case "aiMoodboardUpload":
      case "aiMaterial":
        this._currentAction = new AIModelerAction();
        break;
      case "applyAIMoodBoard":
        this._currentAction = new ApplyAIMoodBoard();
        break;
      case "specialTopicModel":
        this._currentAction = new SpecialTopicModel();
        break;
    }

    if (this._currentAction) {
      this._currentAction.manager = this;
      this._currentAction.onExecute({
        ...(config ?? {}),
        actionType,
      });
    }
  }

  /**
   * Complete the current action
   */
  complete(): void {
    if (this._currentAction) {
      this._currentAction.onComplete();
      this._currentAction = undefined;
    }
  }

  /**
   * Cancel the current action
   */
  cancel(): void {
    if (this._currentAction) {
      this._currentAction.onCancel();
      this._currentAction = undefined;
    }
  }
}