interface RotationState {
  XRotation: number;
  YRotation: number;
  rotation: number;
}

interface Content {
  XRotation: number;
  YRotation: number;
  rotation: number;
}

/**
 * Request class for rotating content in 3D space
 * Manages undo/redo operations for content rotation
 */
export class RotateContentRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _content: Content;
  private readonly _oldRotation: RotationState;
  private readonly _newRotation: RotationState;

  /**
   * @param content - The content object to rotate
   * @param oldRotation - Previous rotation values [XRotation, YRotation, rotation]
   * @param newRotation - New rotation values [XRotation, YRotation, rotation]
   */
  constructor(
    content: Content,
    oldRotation: [number, number, number],
    newRotation: [number, number, number]
  ) {
    super();
    
    this._content = content;
    this._oldRotation = {
      XRotation: oldRotation[0],
      YRotation: oldRotation[1],
      rotation: oldRotation[2]
    };
    this._newRotation = {
      XRotation: newRotation[0],
      YRotation: newRotation[1],
      rotation: newRotation[2]
    };
  }

  onCommit(): void {
    this.rotateContent(this._newRotation);
    super.onCommit();
  }

  canTransactField(): boolean {
    return true;
  }

  private rotateContent(rotationState: RotationState): void {
    const { XRotation, YRotation, rotation } = rotationState;
    
    if (this._content.XRotation !== XRotation) {
      this._content.XRotation = XRotation;
    }
    
    if (this._content.YRotation !== YRotation) {
      this._content.YRotation = YRotation;
    }
    
    if (this._content.rotation !== rotation) {
      this._content.rotation = rotation;
    }
  }

  onUndo(): void {
    super.onUndo();
    this.rotateContent(this._oldRotation);
  }

  onRedo(): void {
    super.onRedo();
    this.rotateContent(this._newRotation);
  }

  getDescription(): string {
    return "旋转模型";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}