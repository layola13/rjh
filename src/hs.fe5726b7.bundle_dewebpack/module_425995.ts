import { NaNDisplayString, UnitInputWidget, UnitInputWidgetStateEnum } from './unit-input-widget';

class AreaInputWidget extends UnitInputWidget {
  protected _toDisplayString(
    value: number,
    unitType: HSCore.Util.Unit.AreaUnitTypeEnum,
    displayDigits: number,
    includeUnit: boolean
  ): void {
    if (isNaN(value)) {
      this.textExpression = NaNDisplayString;
    } else {
      this.textExpression = HSApp.Util.UnitFormater.toAreaDisplayString(
        value,
        unitType,
        displayDigits,
        includeUnit
      );
    }
    
    this.inputElement.value = this.textExpression;
    
    if (this.state & UnitInputWidgetStateEnum.focus) {
      this.inputElement.select();
    }
  }

  protected _getDBValueByInput(
    inputText: string,
    unitType: HSCore.Util.Unit.AreaUnitTypeEnum
  ): number {
    if (inputText === NaNDisplayString) {
      return NaN;
    }
    
    return HSApp.Util.ParseUtil.tryGetAreaDatabaseUnitValue(inputText, unitType);
  }

  protected _updateDisplayUnitAndDigitsFromDoc(): void {
    const floorplan = HSApp.App.getApp().floorplan;
    this.unitType = floorplan.displayAreaUnit;
    this.displayDigits = floorplan.displayAreaPrecisionDigits;
    this._onDisplayUnitOrDigitsChanged();
  }

  protected _onDisplayUnitOrDigitsChanged(): void {
    const floorplan = HSApp.App.getApp().floorplan;
    this.unitType = floorplan.displayAreaUnit;
    this.displayDigits = floorplan.displayAreaPrecisionDigits;

    let base = 10;
    
    switch (this.unitType) {
      case HSCore.Util.Unit.AreaUnitTypeEnum.meter:
      case HSCore.Util.Unit.AreaUnitTypeEnum.centimeter:
      case HSCore.Util.Unit.AreaUnitTypeEnum.millimeter:
      case HSCore.Util.Unit.AreaUnitTypeEnum.kilometer:
        base = 10;
        break;
      case HSCore.Util.Unit.AreaUnitTypeEnum.foot:
      case HSCore.Util.Unit.AreaUnitTypeEnum.inch:
        base = 2;
        break;
    }

    const precision = Math.pow(base, -this.displayDigits);
    this.tunningStep = HSCore.Util.Unit.ConvertAreaToDatabaseUnit(
      precision,
      this.unitType
    );
    this._updateInputText();
  }

  static create(
    element: HTMLInputElement,
    unitType: HSCore.Util.Unit.AreaUnitTypeEnum,
    displayDigits: number,
    includeUnit: boolean
  ): AreaInputWidget {
    return new AreaInputWidget(element, unitType, displayDigits, includeUnit);
  }
}

export default AreaInputWidget;