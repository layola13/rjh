export interface TopoNameData {
  sId: string;
  t: string;
  i: number;
  sI: number;
  sD?: boolean;
}

export class TopoName {
  private _type: string;
  private _index: number;
  private _sourceIndex: number;
  private _isSameDirection?: boolean;

  public readonly sourceId: string;

  constructor(
    sourceId: string,
    type: string,
    index: number,
    sourceIndex: number,
    isSameDirection?: boolean
  ) {
    this.sourceId = sourceId;
    this._type = type;
    this._index = index;
    this._sourceIndex = sourceIndex;
    this._isSameDirection = isSameDirection;
  }

  set index(value: number) {
    this._index = value;
  }

  get index(): number {
    return this._index !== undefined ? this._index : 0;
  }

  get type(): string {
    return this._type || "";
  }

  get sourceIndex(): number {
    return this._sourceIndex === undefined ? -1 : this._sourceIndex;
  }

  get id(): string {
    let identifier = `${this.sourceId}_${this.type}_${this.index}_${this.sourceIndex}`;
    if (this._isSameDirection !== undefined) {
      identifier = `${identifier}_${this._isSameDirection}`;
    }
    return identifier;
  }

  get isSameDirection(): boolean | undefined {
    return this._isSameDirection;
  }

  clone(): TopoName {
    return new TopoName(
      this.sourceId,
      this._type,
      this._index,
      this._sourceIndex,
      this._isSameDirection
    );
  }

  dump(): TopoNameData {
    return {
      sId: this.sourceId,
      t: this._type,
      i: this._index,
      sI: this._sourceIndex,
      sD: this._isSameDirection
    };
  }

  static load(data: TopoNameData): TopoName {
    return new TopoName(data.sId, data.t, data.i, data.sI, data.sD);
  }
}