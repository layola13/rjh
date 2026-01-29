export enum RecordType {
  Structure = 0,
  Hole = 1,
  Slab = 2,
  Beam = 3
}

export interface RecordFaceData {
  mId: string;
  rT: RecordType;
  oK?: string;
  eK?: string;
  isA?: boolean;
  sInfos?: LinkStructureInfo[];
  isB?: boolean;
  oCTopoIds?: string[];
  type?: number;
}

export interface RecordFaceConstructorParams {
  masterId: string;
  originKey?: string;
  extraKey?: string;
  isAux?: boolean;
}

export interface LinkStructureInfo {
  id: string;
  type: number;
}

export function loadRecordFace(data: RecordFaceData): RecordFace {
  switch (data.rT) {
    case RecordType.Beam:
      return BeamRecordFace.load(data);
    case RecordType.Hole:
      return HoleRecordFace.load(data);
    case RecordType.Slab:
      return SlabRecordFace.load(data);
    case RecordType.Structure:
    default:
      return StructureRecordFace.load(data);
  }
}

export function getRecordFaceFinalKey(originKey: string, extraKey?: string): string {
  return extraKey ? `${originKey}$${extraKey}` : originKey;
}

export abstract class RecordFace {
  masterId: string;
  originKey: string;
  isAux?: boolean;
  protected _extraKey?: string;

  constructor(params: RecordFaceConstructorParams) {
    this.masterId = params.masterId;
    this.originKey = params.originKey || "";
    this._extraKey = params.extraKey;
    this.isAux = params.isAux;
  }

  get order(): number {
    return 0;
  }

  abstract getRecordType(): RecordType;

  isStructure(): boolean {
    return this.getRecordType() === RecordType.Structure;
  }

  isHole(): boolean {
    return this.getRecordType() === RecordType.Hole;
  }

  isBeam(): boolean {
    return this.getRecordType() === RecordType.Beam;
  }

  isSlab(): boolean {
    return this.getRecordType() === RecordType.Slab;
  }

  copyFrom(source: RecordFace): void {
    this.masterId = source.masterId;
    this.originKey = source.originKey;
    this.isAux = source.isAux;
    this._extraKey = source._extraKey;
  }

  set extraKey(value: string | undefined) {
    this._extraKey = value;
  }

  get finalKey(): string {
    return getRecordFaceFinalKey(this.originKey, this._extraKey);
  }

  dump(): RecordFaceData {
    const data: RecordFaceData = {
      mId: this.masterId,
      rT: this.getRecordType()
    };

    if (this.originKey) {
      data.oK = this.originKey;
    }

    if (this._extraKey) {
      data.eK = this._extraKey;
    }

    if (this.isAux) {
      data.isA = this.isAux;
    }

    return data;
  }
}

export class StructureRecordFace extends RecordFace {
  linkStructureInfos: LinkStructureInfo[] = [];

  getRecordType(): RecordType {
    return RecordType.Structure;
  }

  get order(): number {
    const parsedValue = parseInt(this._extraKey || "");
    return isNaN(parsedValue) ? 0 : parsedValue;
  }

  clone(): StructureRecordFace {
    const cloned = new StructureRecordFace({
      masterId: this.masterId
    });

    cloned.copyFrom(this);
    cloned.linkStructureInfos = this.linkStructureInfos.map(info => ({
      id: info.id,
      type: info.type
    }));

    return cloned;
  }

  dump(): RecordFaceData {
    const data = super.dump();

    if (this.linkStructureInfos.length) {
      data.sInfos = this.linkStructureInfos;
    }

    return data;
  }

  static load(data: RecordFaceData): StructureRecordFace {
    const instance = new StructureRecordFace({
      masterId: data.mId,
      originKey: data.oK,
      extraKey: data.eK,
      isAux: data.isA
    });

    if (data.sInfos) {
      instance.linkStructureInfos = data.sInfos;
    }

    return instance;
  }
}

export class HoleRecordFace extends RecordFace {
  type: number = 0; // OpeningFaceType.side
  isBottom?: boolean;
  observeCoEdgeTopoNameIds: string[] = [];

  getRecordType(): RecordType {
    return RecordType.Hole;
  }

  dump(): RecordFaceData {
    const data = super.dump();

    if (this.isBottom) {
      data.isB = this.isBottom;
    }

    if (this.observeCoEdgeTopoNameIds.length) {
      data.oCTopoIds = this.observeCoEdgeTopoNameIds;
    }

    data.type = this.type;

    return data;
  }

  static load(data: RecordFaceData): HoleRecordFace {
    const instance = new HoleRecordFace({
      masterId: data.mId,
      originKey: data.oK,
      extraKey: data.eK,
      isAux: data.isA
    });

    instance.isBottom = data.isB;
    instance.type = data.type ?? 0;

    if (data.oCTopoIds) {
      instance.observeCoEdgeTopoNameIds = data.oCTopoIds;
    }

    return instance;
  }
}

export class SlabRecordFace extends RecordFace {
  type: number = 0; // SlabFaceType.side

  getRecordType(): RecordType {
    return RecordType.Slab;
  }

  clone(): SlabRecordFace {
    const cloned = new SlabRecordFace({
      masterId: this.masterId
    });

    cloned.copyFrom(this);
    cloned.type = this.type;

    return cloned;
  }

  dump(): RecordFaceData {
    const data = super.dump();
    data.type = this.type;
    return data;
  }

  static load(data: RecordFaceData): SlabRecordFace {
    const instance = new SlabRecordFace({
      masterId: data.mId,
      originKey: data.oK,
      extraKey: data.eK,
      isAux: data.isA
    });

    instance.type = data.type ?? 0;

    return instance;
  }
}

export class BeamRecordFace extends RecordFace {
  getRecordType(): RecordType {
    return RecordType.Beam;
  }

  get order(): number {
    const parsedValue = parseInt(this._extraKey || "");
    return isNaN(parsedValue) ? 0 : parsedValue;
  }

  static load(data: RecordFaceData): BeamRecordFace {
    return new BeamRecordFace({
      masterId: data.mId,
      originKey: data.oK,
      extraKey: data.eK,
      isAux: data.isA
    });
  }

  clone(): BeamRecordFace {
    const cloned = new BeamRecordFace({
      masterId: this.masterId
    });

    cloned.copyFrom(this);

    return cloned;
  }
}