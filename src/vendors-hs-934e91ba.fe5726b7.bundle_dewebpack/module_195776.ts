interface Point {
  0: number;
  1: number;
  [key: number]: number;
}

type BoundingBox = [number, number, number, number];

class SpatialGrid {
  private readonly _cells: Point[][][];
  private readonly _cellSize: number;
  private readonly _reverseCellSize: number;

  constructor(points: Point[], cellSize: number) {
    this._cells = [];
    this._cellSize = cellSize;
    this._reverseCellSize = 1 / cellSize;

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const cellX = this.coordToCellNum(point[0]);
      const cellY = this.coordToCellNum(point[1]);

      if (this._cells[cellX]) {
        if (this._cells[cellX][cellY]) {
          this._cells[cellX][cellY].push(point);
        } else {
          this._cells[cellX][cellY] = [point];
        }
      } else {
        const column: Point[][] = [];
        column[cellY] = [point];
        this._cells[cellX] = column;
      }
    }
  }

  /**
   * Get all points in a specific cell
   */
  cellPoints(cellX: number, cellY: number): Point[] {
    return this._cells[cellX]?.[cellY] ?? [];
  }

  /**
   * Get all points within a bounding box range
   */
  rangePoints(bbox: BoundingBox): Point[] {
    const minCellX = this.coordToCellNum(bbox[0]);
    const minCellY = this.coordToCellNum(bbox[1]);
    const maxCellX = this.coordToCellNum(bbox[2]);
    const maxCellY = this.coordToCellNum(bbox[3]);

    const result: Point[] = [];

    for (let cellX = minCellX; cellX <= maxCellX; cellX++) {
      for (let cellY = minCellY; cellY <= maxCellY; cellY++) {
        const cellPointsList = this.cellPoints(cellX, cellY);
        for (let i = 0; i < cellPointsList.length; i++) {
          result.push(cellPointsList[i]);
        }
      }
    }

    return result;
  }

  /**
   * Remove a point from the grid
   */
  removePoint(point: Point): Point[] {
    const cellX = this.coordToCellNum(point[0]);
    const cellY = this.coordToCellNum(point[1]);
    const cellPointsList = this._cells[cellX][cellY];

    let indexToRemove: number | undefined;

    for (let i = 0; i < cellPointsList.length; i++) {
      if (cellPointsList[i][0] === point[0] && cellPointsList[i][1] === point[1]) {
        indexToRemove = i;
        break;
      }
    }

    if (indexToRemove !== undefined) {
      cellPointsList.splice(indexToRemove, 1);
    }

    return cellPointsList;
  }

  private trunc(value: number): number {
    return Math.trunc?.(value) ?? (value - value % 1);
  }

  private coordToCellNum(coordinate: number): number {
    return this.trunc(coordinate * this._reverseCellSize);
  }

  /**
   * Extend a bounding box by a number of cells in all directions
   */
  extendBbox(bbox: BoundingBox, cellCount: number): BoundingBox {
    const extension = cellCount * this._cellSize;
    return [
      bbox[0] - extension,
      bbox[1] - extension,
      bbox[2] + extension,
      bbox[3] + extension
    ];
  }
}

export function createSpatialGrid(points: Point[], cellSize: number): SpatialGrid {
  return new SpatialGrid(points, cellSize);
}