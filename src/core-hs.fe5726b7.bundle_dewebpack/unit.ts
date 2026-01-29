type LengthUnit = 'feet' | 'ft' | 'inches' | 'in' | 'cm' | 'm' | 'km' | 'mm' | 'meters' | 'centimeters' | 'kilometers' | 'millimeters';
type AreaUnit = 'feet' | 'ft' | 'inches' | 'in' | 'cm' | 'm' | 'km' | 'mm' | 'meters';

interface LengthUnitTypeEnum {
  readonly foot: 'ft';
  readonly inch: 'in';
  readonly meter: 'm';
  readonly centimeter: 'cm';
  readonly millimeter: 'mm';
  readonly kilometer: 'km';
}

interface AreaUnitTypeEnum {
  readonly foot: 'ft';
  readonly inch: 'in';
  readonly meter: 'm';
  readonly centimeter: 'cm';
  readonly millimeter: 'mm';
  readonly kilometer: 'km';
}

interface ConversionFactors {
  readonly [key: string]: number;
}

const METER_CONVERSION_FACTORS: ConversionFactors = {
  feet: 0.3048,
  ft: 0.3048,
  inches: 0.0254,
  in: 0.0254,
  cm: 0.01,
  m: 1,
  km: 1000,
  mm: 0.001,
  meters: 1,
  centimeters: 0.01,
  kilometers: 1000,
  millimeters: 0.001
};

const SQUARE_METER_CONVERSION_FACTORS: ConversionFactors = {
  feet: 0.09290304,
  ft: 0.09290304,
  inches: 0.00064516,
  in: 0.00064516,
  cm: 0.0001,
  m: 1,
  km: 1000000,
  mm: 0.000001,
  meters: 1
};

const INVERSE_LENGTH_FACTORS: ConversionFactors = {};
Object.keys(METER_CONVERSION_FACTORS).forEach((unit) => {
  INVERSE_LENGTH_FACTORS[unit] = 1 / METER_CONVERSION_FACTORS[unit];
});

const INVERSE_AREA_FACTORS: ConversionFactors = {};
Object.keys(SQUARE_METER_CONVERSION_FACTORS).forEach((unit) => {
  INVERSE_AREA_FACTORS[unit] = 1 / SQUARE_METER_CONVERSION_FACTORS[unit];
});

declare const HSCore: {
  Util: {
    Math: {
      isZero(value: number): boolean;
    };
  };
};

export const Unit = {
  LengthUnitTypeEnum: {
    foot: 'ft',
    inch: 'in',
    meter: 'm',
    centimeter: 'cm',
    millimeter: 'mm',
    kilometer: 'km'
  } as LengthUnitTypeEnum,

  AreaUnitTypeEnum: {
    foot: 'ft',
    inch: 'in',
    meter: 'm',
    centimeter: 'cm',
    millimeter: 'mm',
    kilometer: 'km'
  } as AreaUnitTypeEnum,

  ConvertToMeterFactor: METER_CONVERSION_FACTORS,
  ConvertToSquareMeterFactor: SQUARE_METER_CONVERSION_FACTORS,

  ConvertLengthToDatabaseUnit: (value: number, unit: string): number => {
    return value * (METER_CONVERSION_FACTORS[unit] ?? 1);
  },

  ConvertAreaToDatabaseUnit: (value: number, unit: string): number => {
    return value * SQUARE_METER_CONVERSION_FACTORS[unit];
  },

  ConvertToMeter: (unit: string, value: number | string): number => {
    return Number(value) * METER_CONVERSION_FACTORS[unit.toLowerCase()];
  },

  ConvertMeterToCustom: (unit: string, value: number | string): number => {
    return Number(value) / METER_CONVERSION_FACTORS[unit.toLowerCase()];
  },

  ConvertLengthToDisplayUnit: (value: number, unit: string): number => {
    return HSCore.Util.Math.isZero(value) ? 0 : value * INVERSE_LENGTH_FACTORS[unit];
  },

  ConvertAreaToDisplayUnit: (value: number | string, unit: string): number => {
    const numericValue = typeof value === 'number' ? value : parseFloat(value);
    return HSCore.Util.Math.isZero(numericValue) ? 0 : numericValue * INVERSE_AREA_FACTORS[unit];
  }
};

Object.freeze(Unit.LengthUnitTypeEnum);
Object.freeze(Unit.AreaUnitTypeEnum);
Object.freeze(Unit.ConvertToMeterFactor);
Object.freeze(Unit.ConvertToSquareMeterFactor);