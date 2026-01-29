import { UnitInputWidget, UnitInputWidgetStateEnum, NaNDisplayString } from './UnitInputWidget';

class LengthInputWidget extends UnitInputWidget {
  protected _toDisplayString(
    value: number,
    unitType: HSCore.Util.Unit.LengthUnitTypeEnum,
    displayDigits: number,
    formatOptions?: unknown
  ): void {
    if (isNaN(value)) {
      this.textExpression = NaNDisplayString;
    } else {
      this.textExpression = HSApp.Util.UnitFormater.toLengthDisplayString(
        value,
        unitType,
        displayDigits,
        formatOptions
      );

      if (
        HSApp.Config.TENANT === 'fp' &&
        unitType === HSCore.Util.Unit.LengthUnitTypeEnum.inch
      ) {
        // Keep full expression for feet-inch format in 'fp' tenant
      } else {
        this.textExpression = this.textExpression.split(' ')[0];
      }
    }

    this.inputElement.value = this.textExpression;

    if (this.state & UnitInputWidgetStateEnum.focus) {
      this.inputElement.select();
    }
  }

  protected _getDBValueByInput(
    inputText: string,
    unitType: HSCore.Util.Unit.LengthUnitTypeEnum
  ): number {
    if (inputText === NaNDisplayString) {
      return NaN;
    }
    return HSApp.Util.ParseUtil.tryGetLengthDatabaseUnitValue(inputText, unitType);
  }

  protected _updateDisplayUnitAndDigitsFromDoc(): void {
    const floorplan = HSApp.App.getApp().floorplan;
    this.unitType = floorplan.displayLengthUnit;
    this.displayDigits = floorplan.displayLengthPrecisionDigits;
    this._onDisplayUnitOrDigitsChanged();
  }

  protected _onDisplayUnitOrDigitsChanged(): void {
    const DECIMAL_BASE = 10;
    const IMPERIAL_BASE = 2;

    let base = DECIMAL_BASE;

    switch (this.unitType) {
      case HSCore.Util.Unit.LengthUnitTypeEnum.meter:
      case HSCore.Util.Unit.LengthUnitTypeEnum.centimeter:
      case HSCore.Util.Unit.LengthUnitTypeEnum.millimeter:
      case HSCore.Util.Unit.LengthUnitTypeEnum.kilometer:
        base = DECIMAL_BASE;
        break;
      case HSCore.Util.Unit.LengthUnitTypeEnum.foot:
      case HSCore.Util.Unit.LengthUnitTypeEnum.inch:
        base = IMPERIAL_BASE;
        break;
    }

    const precision = Math.pow(base, -this.displayDigits);
    this.tunningStep = HSCore.Util.Unit.ConvertLengthToDatabaseUnit(precision, this.unitType);
    this._updateInputText();
  }

  static create(
    inputElement: HTMLInputElement,
    initialValue: number,
    unitType: HSCore.Util.Unit.LengthUnitTypeEnum,
    displayDigits: number,
    onChangeCallback?: (value: number) => void,
    additionalOptions?: unknown
  ): LengthInputWidget {
    return new LengthInputWidget(
      inputElement,
      initialValue,
      unitType,
      displayDigits,
      onChangeCallback,
      additionalOptions
    );
  }
}

export default LengthInputWidget;