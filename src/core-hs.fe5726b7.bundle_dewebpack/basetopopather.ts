export interface ParamRange {
  from: number;
  to: number;
}

export interface TopoElement {
  getStartParam(): number;
  getEndParam(): number;
  getParamAt(index: number): number;
}

export class BaseTopoPather {
  public readonly from: number;
  public readonly to: number;

  constructor(from: number, to: number) {
    this.from = from;
    this.to = to;
  }

  /**
   * Splits parameters based on the given topology element and parameter indices
   * @param element - The topology element containing parameter information
   * @param paramIndices - Array of parameter indices to process
   * @returns Array of parameter ranges with normalized from/to values
   */
  splitParams(element: TopoElement, paramIndices: number[]): ParamRange[] {
    const startParam = element.getStartParam();
    const endParam = element.getEndParam();
    const normalizedFrom = startParam + this.from * (endParam - startParam);
    const normalizedTo = startParam + this.to * (endParam - startParam);
    
    const sortedParams = paramIndices
      .map(index => element.getParamAt(index))
      .sort((a, b) => a - b);
    
    let paramsBeforeStart = 0;
    let paramsAfterEnd = 0;
    
    for (let i = 0; i < sortedParams.length; i++) {
      if (sortedParams[i] < normalizedFrom) {
        paramsBeforeStart++;
      }
      if (sortedParams[i] > normalizedTo) {
        paramsAfterEnd--;
      }
    }
    
    if (paramsBeforeStart > 0) {
      for (let i = 0; i < paramsBeforeStart; i++) {
        sortedParams.shift();
      }
    }
    
    if (paramsAfterEnd > 0) {
      for (let i = 0; i < paramsAfterEnd; i++) {
        sortedParams.pop();
      }
    }
    
    sortedParams.unshift(normalizedFrom);
    sortedParams.push(normalizedTo);
    
    const ranges: ParamRange[] = [];
    for (let i = 1; i < sortedParams.length; i++) {
      const rangeFrom = (sortedParams[i - 1] - startParam) / (endParam - startParam);
      const rangeTo = (sortedParams[i] - startParam) / (endParam - startParam);
      ranges.push({
        from: rangeFrom,
        to: rangeTo
      });
    }
    
    return ranges;
  }
}