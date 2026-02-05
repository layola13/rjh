// @ts-nocheck
import { OperationId, BaseOperation } from './operations';

interface SelectionOption {
  index: number;
  label: string;
}

export class OpDebugSelection extends BaseOperation {
  static getId(): OperationId {
    return OperationId.DebugSelection;
  }

  static createMockMessage(): Record<string, unknown> {
    return {
      ...super.createMockMessage(),
      operationType: OperationId.DebugSelection
    };
  }

  onExecute(context: unknown): void {
    const selectionOptions: SelectionOption[] = [
      {
        index: 0,
        label: "Selection 1"
      },
      {
        index: 1,
        label: "Selection 2"
      }
    ];

    this.onQuerySelection(
      "OpDebugSelection - Need user selection",
      selectionOptions,
      (firstSelection: unknown) => {
        this.onQuerySelection(
          "OpDebugSelection 2 - Need user selection",
          selectionOptions,
          (secondSelection: unknown) => {
            this.onFinish("success", (context as any).reply, context);
          }
        );
      }
    );
  }
}