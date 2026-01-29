import { OperationId, BaseOperation } from './operations';

interface ExecuteContext {
  isQuestionTone: number;
  reply: string;
  isFuncDone: boolean;
  recommendedOperationTypes?: string[];
}

interface TransactionManager {
  canRedo(): boolean;
  redo(): void;
}

interface Application {
  transManager: TransactionManager;
}

declare const ResourceManager: {
  getString(key: string): string;
};

export class OpRedoControl extends BaseOperation {
  protected app!: Application;

  constructor() {
    super();
  }

  static getId(): OperationId {
    return OperationId.Redo;
  }

  protected onExecute(context: ExecuteContext): void {
    if (this.checkCommandSupport() || context.isQuestionTone !== 0) {
      let reply = context.reply;

      if (context.isQuestionTone === 0) {
        if (this.app.transManager.canRedo()) {
          this.app.transManager.redo();
          context.isFuncDone = true;
          const recommendedTypes = OpRedoControl.getRecommendedOperationTypes(
            OpRedoControl.getId()
          );
          context.recommendedOperationTypes = recommendedTypes;
        } else {
          reply = ResourceManager.getString('homegpt_redo_tip');
        }
      }

      this.onFinish('success', reply, context);
    } else {
      this.onFinish(
        'success',
        ResourceManager.getString('homegpt_redo_render_tip'),
        context
      );
    }
  }

  protected checkCommandSupport(): boolean {
    return false;
  }

  protected onFinish(
    status: string,
    message: string,
    context: ExecuteContext
  ): void {}

  protected static getRecommendedOperationTypes(operationId: OperationId): string[] {
    return [];
  }
}