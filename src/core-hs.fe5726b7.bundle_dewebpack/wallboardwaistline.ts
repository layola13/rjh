import { WallMolding } from './WallMolding';
import { MoldingTypeEnum } from './MoldingTypeEnum';
import { Entity } from './Entity';
import { EntityField } from './EntityField';

export class WallBoardWaistLine extends WallMolding {
  private __offset: number = 0;
  private __autoFit: boolean = true;

  constructor(id: string = "", parent?: unknown) {
    super(id, parent);
    this.type = MoldingTypeEnum.WallBoardWaistLine;
    this.setFlagOn(HSCore.Model.EntityFlagEnum.unselectable);
  }

  @EntityField()
  get offset(): number {
    return this.__offset;
  }

  set offset(value: number) {
    this.__offset = value;
  }

  @EntityField()
  get autoFit(): boolean {
    return this.__autoFit;
  }

  set autoFit(value: boolean) {
    this.__autoFit = value;
  }

  clone(): WallBoardWaistLine {
    const cloned = new WallBoardWaistLine();
    cloned._copyFrom(this);
    return cloned;
  }

  getMetadataFilterKeys(): Set<string> {
    const keys = super.getMetadataFilterKeys();
    const filterKeys = ["profileHigh"];
    
    filterKeys.forEach((key: string) => {
      keys.add(key);
    });
    
    return keys;
  }

  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void {
    switch (fieldName) {
      case "autoFit":
        this.doAutoFit();
        break;
      case "offset":
        this.dirtyPosition();
        break;
    }
    
    super.onFieldChanged(fieldName, newValue, oldValue);
  }

  private doAutoFit(): void {
    this.autoFit;
  }
}

Entity.registerClass(HSConstants.ModelClass.NgWallBoardWaistLine, WallBoardWaistLine);