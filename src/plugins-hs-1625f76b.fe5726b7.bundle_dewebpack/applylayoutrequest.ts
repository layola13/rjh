import { HSCore } from './635589';
import { ContentUtils } from './416345';

interface ConstraintResult {
  targetCOs: Array<{ targetContent: any }>;
  roomEntityObject: any;
}

interface ConstraintLayout {
  constraint(applyMode: any): Promise<ConstraintResult>;
  postProcess(fakeContents: any[], targetCOs: Array<{ targetContent: any }>, roomEntityObject: any): Promise<void>;
}

export class ApplyLayoutRequest extends HSCore.Transaction.Common.StateRequest {
  private constraintLayout: ConstraintLayout;
  private applyMode: any;

  constructor(constraintLayout: ConstraintLayout, applyMode: any) {
    super();
    this.constraintLayout = constraintLayout;
    this.applyMode = applyMode;
  }

  private async doRequest(): Promise<void> {
    try {
      const constraintResult = await this.constraintLayout.constraint(this.applyMode);
      const { targetCOs, roomEntityObject } = constraintResult;
      
      const fakeContents = await ContentUtils.instantiateFakeContents(
        targetCOs.map((co) => co.targetContent)
      );
      
      await this.constraintLayout.postProcess(fakeContents, targetCOs, roomEntityObject);
    } catch (error) {
      console.error(error);
    }
  }

  async onCommitAsync(): Promise<void> {
    await this.doRequest();
  }

  onUndo(): void {
    super.onUndo([]);
  }

  onRedo(): void {
    super.onRedo([]);
  }

  canTransactField(): boolean {
    return true;
  }
}