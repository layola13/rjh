interface Position {
  x?: number;
  y?: number;
  z?: number;
  rotation?: number;
  XRotation?: number;
  YRotation?: number;
}

interface Entity {
  x: number;
  y: number;
  z: number;
  rotation?: number;
  XRotation?: number;
  YRotation?: number;
}

export class MoveCustomizedPMInstanceRequest extends HSCore.Transaction.Request {
  private _entity: Entity;
  private _targetX?: number;
  private _targetY?: number;
  private _targetZ?: number;
  private _beforeX?: number;
  private _beforeY?: number;
  private _beforeZ?: number;
  private _afterX?: number;
  private _afterY?: number;
  private _afterZ?: number;
  private _previous: Position;
  private _next: Position;

  constructor(entity: Entity, previousPosition: Position, targetPosition: Position) {
    super();
    this._entity = entity;
    this._targetX = targetPosition.x;
    this._targetY = targetPosition.y;
    this._targetZ = targetPosition.z;
    this._beforeX = previousPosition.x;
    this._beforeY = previousPosition.y;
    this._beforeZ = previousPosition.z;
    this._previous = previousPosition;
    this._next = targetPosition;
  }

  onCommit(): void {
    if (this._targetX !== undefined) {
      this._entity.x = this._targetX;
    }
    if (this._targetY !== undefined) {
      this._entity.y = this._targetY;
    }
    if (this._targetZ !== undefined) {
      this._entity.z = this._targetZ;
    }
    this._afterX = this._entity.x;
    this._afterY = this._entity.y;
    this._afterZ = this._entity.z;
  }

  private _moveContent(): void {
    if (!this._next || !this._entity) {
      return;
    }

    if (this._next.x !== undefined && this._entity.x !== this._next.x) {
      this._entity.x = this._next.x;
    }
    if (this._next.y !== undefined && this._entity.y !== this._next.y) {
      this._entity.y = this._next.y;
    }
    if (this._next.z !== undefined && this._entity.z !== this._next.z) {
      this._entity.z = this._next.z;
    }
    if (this._next.rotation !== undefined && this._entity.rotation !== this._next.rotation) {
      this._entity.rotation = this._next.rotation;
    }
    if (this._next.XRotation !== undefined && this._entity.XRotation !== this._next.XRotation) {
      this._entity.XRotation = this._next.XRotation;
    }
    if (this._next.YRotation !== undefined && this._entity.YRotation !== this._next.YRotation) {
      this._entity.YRotation = this._next.YRotation;
    }
  }

  private _saveRestoreData(): void {
    this._previous = {
      x: this._entity.x,
      y: this._entity.y,
      z: this._entity.z,
      rotation: this._entity.rotation,
      XRotation: this._entity.XRotation,
      YRotation: this._entity.YRotation
    };
  }

  private _onUndoRedo(): void {
    this._next = this._previous;
    this._saveRestoreData();
    this._moveContent();
  }

  onUndo(): void {
    this._onUndoRedo();
  }

  onRedo(): void {
    this._onUndoRedo();
  }
}