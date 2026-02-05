// @ts-nocheck
import { OperationId, BaseOperation } from './operations';

interface ExecuteContext {
  isQuestionTone: number;
  reply: string;
  recommendedOperationTypes?: string[];
}

interface TransactionManager {
  canUndo(): boolean;
  undo(): void;
}

interface App {
  transManager: TransactionManager;
}

declare const ResourceManager: {
  getString(key: string): string;
};

export class OpUndoControl extends BaseOperation {
  protected app!: App;

  constructor() {
    super();
  }

  static getId(): OperationId {
    return OperationId.Undo;
  }

  protected onExecute(context: ExecuteContext): void {
    if (this.checkCommandSupport() || context.isQuestionTone !== 0) {
      let reply = context.reply;

      if (context.isQuestionTone === 0) {
        if (this.app.transManager.canUndo()) {
          this.app.transManager.undo();
          const recommendedTypes = OpUndoControl.getRecommendedOperationTypes(
            OpUndoControl.getId()
          );
          context.recommendedOperationTypes = recommendedTypes;
        } else {
          reply = ResourceManager.getString("homegpt_undo_tip");
        }
      }

      this.onFinish("success", reply, context);
    } else {
      this.onFinish(
        "success",
        ResourceManager.getString("homegpt_undo_render_tip"),
        context
      );
    }
  }

  protected checkCommandSupport(): boolean {
    return true;
  }

  protected onFinish(status: string, message: string, context: ExecuteContext): void {
    // Implementation from BaseOperation
  }

  static getRecommendedOperationTypes(operationId: OperationId): string[] {
    return [];
  }
}