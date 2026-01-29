import { Layout, LayoutModelClassName, LayoutItem, StretchType } from './Layout';
import { DiscretePolygon2d } from './DiscretePolygon2d';
import { BoundingBox2D } from './BoundingBox2D';
import { Logger } from './Logger';

/**
 * Orientation mode for vertical layout
 */
enum LayoutOrientation {
  /** Layout items from minimum to maximum Y coordinate */
  minToMax = 0,
  /** Layout items from maximum to minimum Y coordinate */
  maxToMin = 1
}

/**
 * VerticalLayout arranges child layout items vertically within a parent geometry.
 * Items with fixed stretch type maintain their size, while expandable items
 * proportionally fill remaining space.
 */
export class VerticalLayout extends Layout {
  private _orientation: LayoutOrientation;

  constructor() {
    super();
    this._orientation = LayoutOrientation.maxToMin;
  }

  /**
   * Returns the class identifier for this layout type
   */
  getClassName(): LayoutModelClassName {
    return LayoutModelClassName.VerticalLayout;
  }

  /**
   * Creates a deep copy of this layout instance
   */
  clone(): VerticalLayout {
    const clonedLayout = new VerticalLayout();
    clonedLayout.copyFrom(this);
    return clonedLayout;
  }

  /**
   * Handles parent geometry changes and redistributes child items accordingly
   * @param parentGeometry - The new parent geometry polygon
   */
  onParentGeomChanged(parentGeometry: HSCore.Util.Collision.Polygon[]): void {
    const parentBounds = DiscretePolygon2d.getBound(parentGeometry);
    const itemsCopy = this._items.slice();

    // Reverse order if layout orientation is maxToMin
    if (this._orientation === LayoutOrientation.maxToMin) {
      itemsCopy.reverse();
    }

    const minX = parentBounds.min.x;
    const maxX = parentBounds.max.x;
    let currentMinY = parentBounds.min.y;
    let currentMaxY = currentMinY;
    const expandableItems: LayoutItem[] = [];

    // First pass: handle fixed-size items and collect expandable items
    for (const item of itemsCopy) {
      if (item.stretchType === StretchType.fix) {
        const itemBounds = DiscretePolygon2d.getBound(item.getGeometry());
        const isValidBounds = BoundingBox2D.isValid(itemBounds);

        if (isValidBounds) {
          currentMaxY = itemBounds.min.y;
        }

        // Process accumulated expandable items before this fixed item
        if (expandableItems.length > 0) {
          VerticalLayout.updateExpandLayoutItems(
            expandableItems,
            parentGeometry,
            BoundingBox2D.create(minX, maxX, currentMinY, currentMaxY)
          );
          expandableItems.length = 0;
        }

        if (isValidBounds) {
          currentMinY = itemBounds.max.y;
        }
      } else {
        expandableItems.push(item);
      }
    }

    // Second pass: handle remaining expandable items
    if (expandableItems.length > 0) {
      currentMaxY = parentBounds.max.y;
      VerticalLayout.updateExpandLayoutItems(
        expandableItems,
        parentGeometry,
        BoundingBox2D.create(minX, maxX, currentMinY, currentMaxY)
      );
    }
  }

  /**
   * Updates geometry for multiple expandable layout items within a bounding box
   * @param items - Array of expandable layout items
   * @param parentGeometry - Parent geometry for clipping
   * @param boundingBox - Target bounding box for all items
   */
  private static updateExpandLayoutItems(
    items: LayoutItem[],
    parentGeometry: HSCore.Util.Collision.Polygon[],
    boundingBox: BoundingBox2D
  ): void {
    if (items.length === 1) {
      VerticalLayout.updateExpandLayoutItem(items[0], parentGeometry, boundingBox);
      return;
    }

    // Calculate cumulative heights for proportional distribution
    const cumulativeHeights: number[] = [];
    let totalHeight = 0;

    for (const item of items) {
      const itemBounds = DiscretePolygon2d.getBound(item.getGeometry());
      totalHeight += itemBounds.height;
      cumulativeHeights.push(totalHeight);
    }

    const startY = boundingBox.min.y;

    // Distribute space proportionally based on original heights
    for (let index = 0; index < items.length; index++) {
      const proportionalHeight = (cumulativeHeights[index] * boundingBox.height) / totalHeight;
      const itemBounds = BoundingBox2D.create(
        boundingBox.min.x,
        boundingBox.max.x,
        startY,
        proportionalHeight
      );
      VerticalLayout.updateExpandLayoutItem(items[index], parentGeometry, itemBounds);
    }
  }

  /**
   * Updates geometry for a single expandable layout item
   * @param item - The layout item to update
   * @param parentGeometry - Parent geometry for clipping
   * @param boundingBox - Target bounding box for the item
   */
  private static updateExpandLayoutItem(
    item: LayoutItem,
    parentGeometry: HSCore.Util.Collision.Polygon[],
    boundingBox: BoundingBox2D
  ): void {
    if (BoundingBox2D.isValid(boundingBox)) {
      const boundingPolygon = BoundingBox2D.getPolygon(boundingBox);
      const clipOptions: HSCore.Util.Collision.ClipOptions = {
        operation: HSCore.Util.Collision.ClipType.inter,
        subject_fillType: HSCore.Util.Collision.PolyFillType.positive,
        clip_fillType: HSCore.Util.Collision.PolyFillType.positive
      };
      const clippedGeometry = HSCore.Util.Collision.ClipFaces(
        parentGeometry,
        [boundingPolygon],
        clipOptions
      );
      item.onParentGeomChanged(clippedGeometry);
    } else {
      if (DEBUG) {
        Logger.console.log('invalid boundingBox');
      }
      item.onParentGeomChanged([]);
    }
  }
}

// Register the VerticalLayout class with the LayoutItem factory
LayoutItem.registerClass(LayoutModelClassName.VerticalLayout, VerticalLayout);