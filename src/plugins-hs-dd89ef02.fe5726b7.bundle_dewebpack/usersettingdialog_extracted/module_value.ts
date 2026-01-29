enum LengthUnitTypeEnum {
  meter = 'meter',
  centimeter = 'centimeter',
  millimeter = 'millimeter',
  inch = 'inch'
}

interface UnitConfig {
  digits: number;
  showUnitStr: boolean;
}

interface UnitMap {
  [key: string]: UnitConfig;
}

class UnitConfiguration {
  unitMap: UnitMap = {};

  constructor() {
    this.initializeUnits();
  }

  private initializeUnits(): void {
    this.unitMap[LengthUnitTypeEnum.meter] = {
      digits: 3,
      showUnitStr: true
    };

    this.unitMap[LengthUnitTypeEnum.centimeter] = {
      digits: 1,
      showUnitStr: true
    };

    this.unitMap[LengthUnitTypeEnum.millimeter] = {
      digits: 0,
      showUnitStr: true
    };

    this.unitMap[LengthUnitTypeEnum.inch] = {
      digits: 0,
      showUnitStr: false
    };
  }
}

export { UnitConfiguration, LengthUnitTypeEnum, UnitConfig, UnitMap };