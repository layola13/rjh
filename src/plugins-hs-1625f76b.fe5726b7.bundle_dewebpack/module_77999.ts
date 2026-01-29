interface Position {
  x?: number;
  y?: number;
  z?: number;
  rotation?: number;
  XRotation?: number;
  YRotation?: number;
  host?: any;
  parent?: any;
}

interface Content {
  x: number;
  y: number;
  z: number;
  rotation: number;
  XRotation: number;
  YRotation: number;
  getHost(): any;
  assignTo(host: any): void;
  hasParent(parent: any): boolean;
  replaceParent(parent: any): void;
  getUniqueParent(): any;
  build(): void;
  dirtyGeometry(): void;
  updateMixPaintAndAlignFaces(): void;
  hostFace?: Face;
}

interface Face {
  dirtyGeometry(): void;
}

interface Opening extends Content {
  build(): void;
}

interface WallFace extends Face {
  dirtyGeometry(): void;
}

export default class MoveContentRequest extends HSCore.Transaction.Request {
  private _content: Content;
  private _previous: Position;
  private _next: Position;
  private _canDoAutoFit: boolean;
  private _hasAutoFit: boolean;
  private _slabOpeningAffectedWallFaces?: WallFace[];

  constructor(
    content: Content,
    previous: Position,
    next: Position,
    canDoAutoFit: boolean = false,
    hasAutoFit: boolean = true
  ) {
    super();
    this._content = content;
    this._previous = previous;
    this._next = next;
    this._canDoAutoFit = canDoAutoFit;
    this._hasAutoFit = hasAutoFit;
    this._slabOpeningAffectedWallFaces = undefined;
  }

  public onCommit(): void {
    this._moveContent();
  }

  private _moveContent(isUndoRedo: boolean = false): void {
    if (!this._next || !this._content) {
      return;
    }

    if (this._next.x !== undefined && this._content.x !== this._next.x) {
      this._content.x = this._next.x;
    }

    if (this._next.y !== undefined && this._content.y !== this._next.y) {
      this._content.y = this._next.y;
    }

    if (this._next.z !== undefined && this._content.z !== this._next.z) {
      this._content.z = this._next.z;
    }

    if (this._next.rotation !== undefined && this._content.rotation !== this._next.rotation) {
      this._content.rotation = this._next.rotation;
    }

    if (this._next.XRotation !== undefined && this._content.XRotation !== this._next.XRotation) {
      this._content.XRotation = this._next.XRotation;
    }

    if (this._next.YRotation !== undefined && this._content.YRotation !== this._next.YRotation) {
      this._content.YRotation = this._next.YRotation;
    }

    if (this._canDoAutoFit && (!this._hasAutoFit || isUndoRedo)) {
      HSApp.Util.Content.autoFitContent(this._next.host, this._content);
    }

    if (this._next.host !== this._content.getHost()) {
      this._content.assignTo(this._next.host);
    }

    if (this._next.parent && !this._content.hasParent(this._next.parent)) {
      this._content.replaceParent(this._next.parent);
    }

    this.customizedMove(isUndoRedo);

    if (this._content instanceof HSCore.Model.Opening) {
      this._content.build();
    } else {
      if (this._content instanceof HSCore.Model.Opening && HSCore.Util.Content.isWallOpening(this._content)) {
        this._content.dirtyGeometry();
        if (this._content.hostFace) {
          this._content.hostFace.dirtyGeometry();
        }
      }

      this.updateMixPaintAndFloorGeometryOfOpening();
      this.updateSlabHoleAffectedWalls();
    }
  }

  protected customizedMove(isUndoRedo: boolean): void {
    // Override in subclass if needed
  }

  private _saveRestoreData(): void {
    this._previous = {
      x: this._content.x,
      y: this._content.y,
      z: this._content.z,
      rotation: this._content.rotation,
      XRotation: this._content.XRotation,
      YRotation: this._content.YRotation,
      host: this._content.getHost(),
      parent: this._content.getUniqueParent()
    };
  }

  private _onUndoRedo(): void {
    this._next = this._previous;
    this._saveRestoreData();
    this._moveContent(true);
  }

  public onUndo(): void {
    this._onUndoRedo();
  }

  public onRedo(): void {
    this._onUndoRedo();
  }

  private updateMixPaintAndFloorGeometryOfOpening(): void {
    if (HSCore.Util.Content.isWallOpening(this._content)) {
      const hostFace = this._content.hostFace;
      if (hostFace) {
        hostFace.dirtyGeometry();
      }
      this._content.updateMixPaintAndAlignFaces();
    }

    if (HSCore.Util.Content.isSlabOpening(this._content)) {
      const host = this._content.getHost();
      if (host) {
        host.forEachFace((face: any) => {
          if (face instanceof HSCore.Model.Ceiling || face instanceof HSCore.Model.Floor) {
            face.dirtyGeometry();
            HSCore.Paint.PaintsUtil.updateFaceMixpaint(face);
          }
        });
      }
    }
  }

  private updateSlabHoleAffectedWalls(): void {
    if (!HSCore.Util.Content.isSlabOpening(this._content)) {
      return;
    }

    if (!this._slabOpeningAffectedWallFaces) {
      const previousAffectedFaces = HSCore.Util.Opening.getSlabHoleAffectedWallFaces(
        this._content,
        {
          xPos: this._previous.x,
          yPos: this._previous.y
        }
      );

      const nextAffectedFaces = HSCore.Util.Opening.getSlabHoleAffectedWallFaces(
        this._content,
        {
          xPos: this._next.x,
          yPos: this._next.y
        }
      );

      this._slabOpeningAffectedWallFaces = Array.from(
        new Set([...previousAffectedFaces, ...nextAffectedFaces])
      );
    }

    this._slabOpeningAffectedWallFaces.forEach((face: WallFace) => {
      face.dirtyGeometry();
    });
  }

  public getDescription(): string {
    return "移动物品";
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}