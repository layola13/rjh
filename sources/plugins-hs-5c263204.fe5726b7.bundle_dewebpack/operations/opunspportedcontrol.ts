import { OperationId, BaseOperation } from './operations';

interface ExecuteContext {
  reply: unknown;
  recommendedOperationTypes?: string[];
}

export class OpUnsupportedControl extends BaseOperation {
  static getId(): OperationId {
    return OperationId.Others;
  }

  onExecute(context: ExecuteContext): void {
    const recommendedTypes = OpUnsupportedControl.getRecommendedOperationTypes(
      OpUnsupportedControl.getId()
    );
    context.recommendedOperationTypes = recommendedTypes;
    this.onFinish('success', context.reply, context);
  }
}