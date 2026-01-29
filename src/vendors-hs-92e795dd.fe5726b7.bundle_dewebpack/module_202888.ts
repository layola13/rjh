class Disjoint {
  private set: number[] = [];

  clear(): void {
    this.set.length = 0;
  }

  find(index: number): number {
    while (this.set.length <= index) {
      this.set.push(this.set.length);
    }
    
    if (index === this.set[index]) {
      return index;
    }
    
    this.set[index] = this.find(this.set[index]);
    return this.set[index];
  }

  merge(indexA: number, indexB: number): void {
    if (indexA < 0 || indexB < 0) {
      return;
    }
    
    const rootA = this.find(indexA);
    const rootB = this.find(indexB);
    
    if (rootA < rootB) {
      this.set[rootB] = rootA;
    } else {
      this.set[rootA] = rootB;
    }
  }
}

interface MergeResult {
  index: number[];
  points: number[][];
}

class MergePoint {
  private tol: number;
  private _tmp: number[][][];
  private _disjoint: Disjoint;

  constructor(tolerance: number = 1e-6) {
    this.tol = tolerance;
    this._tmp = [[], [], []];
    this._disjoint = new Disjoint();
  }

  clear(): void {
    this._disjoint.clear();
  }

  merge(points: number[][]): MergeResult {
    if (points.length === 0) {
      return {
        index: [],
        points: []
      };
    }

    const dimensionIndex = points[0].length - 1;
    const indices: number[] = [];
    
    for (let i = 0; i < points.length; ++i) {
      indices.push(i);
    }

    this.clear();
    
    indices.sort((indexA, indexB) => {
      return points[indexA][dimensionIndex] - points[indexB][dimensionIndex];
    });

    this._mergeex(points, indices, 0, indices.length, dimensionIndex);

    const mergedPoints: number[][] = [];
    
    for (let i = 0; i < points.length; ++i) {
      if (this._disjoint.find(i) !== i) {
        indices[i] = indices[this._disjoint.find(i)];
      } else {
        indices[i] = mergedPoints.length;
        mergedPoints.push(points[i]);
      }
    }

    return {
      index: indices,
      points: mergedPoints
    };
  }

  private _mergeex(
    points: number[][],
    indices: number[],
    start: number,
    end: number,
    dimension: number
  ): void {
    if (end - start < 2) {
      return;
    }

    if (dimension) {
      const midpoint = (end + start) >> 1;
      const pivotValue = points[indices[midpoint]][dimension];

      this._mergeex(points, indices, start, midpoint, dimension);
      this._mergeex(points, indices, midpoint, end, dimension);

      const tempIndices = this._tmp[dimension];
      tempIndices.length = 0;

      for (let i = start; i < end; ++i) {
        if (Math.abs(points[indices[i]][dimension] - pivotValue) <= this.tol) {
          tempIndices.push(indices[i]);
        }
      }

      const nextDimension = dimension - 1;
      
      tempIndices.sort((indexA, indexB) => {
        return points[indexA][nextDimension] - points[indexB][nextDimension];
      });

      this._mergeex(points, tempIndices, 0, tempIndices.length, nextDimension);
    } else {
      for (let i = 1; i < indices.length; ++i) {
        const currentRoot = this._disjoint.find(indices[i]);
        const previousRoot = this._disjoint.find(indices[i - 1]);
        
        if (Math.abs(points[currentRoot][0] - points[previousRoot][0]) <= this.tol) {
          this._disjoint.merge(indices[i], indices[i - 1]);
        }
      }
    }
  }
}

export { Disjoint, MergePoint };