export enum DataType {
  Int = "Int",
  String = "String",
  Boolean = "Boolean",
  Unknown = "Unknown",
  Number = "Number",
  ArrayPoint2D = "ArrayPoint2D",
  ArrayPoint3D = "ArrayPoint3D",
  NumberArray = "NumberArray"
}

export interface MathUtil {
  isNearlyEqual(a: number, b: number): boolean;
}

type CompareFunction<T = unknown> = (a: T, b: T, length?: number) => boolean;

/**
 * 获取指定数据类型对应的比较函数
 * @param dataType - 数据类型
 * @returns 对应的比较函数
 * @throws {Error} 当数据类型未实现时抛出错误
 */
export function getCompareByDataType(dataType: DataType): CompareFunction {
  if (
    dataType === DataType.Int ||
    dataType === DataType.String ||
    dataType === DataType.Boolean ||
    dataType === DataType.Unknown
  ) {
    return strictEquality;
  }
  
  if (dataType === DataType.Number) {
    return compareNumber;
  }
  
  if (dataType === DataType.ArrayPoint2D) {
    return comparePoint2D;
  }
  
  if (dataType === DataType.ArrayPoint3D) {
    return comparePoint3D;
  }
  
  if (dataType === DataType.NumberArray) {
    return compareNumberArray;
  }
  
  throw new Error("其他的暂未实现");
}

function strictEquality<T>(a: T, b: T): boolean {
  return a === b;
}

function compareNumberArray(
  a: number[],
  b: number[],
  length?: number
): boolean {
  const actualLength = length ?? a.length;
  
  if (length === undefined && a.length !== b.length) {
    return false;
  }
  
  if (a.length >= actualLength && b.length >= actualLength) {
    for (let i = 0; i < actualLength; i++) {
      if (!MathUtil.isNearlyEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  
  return false;
}

function comparePoint2D(a: number[], b: number[]): boolean {
  return compareNumberArray(a, b, 2);
}

function comparePoint3D(a: number[], b: number[]): boolean {
  return compareNumberArray(a, b, 3);
}

function compareNumber(a: number, b: number): boolean {
  return MathUtil.isNearlyEqual(a, b);
}