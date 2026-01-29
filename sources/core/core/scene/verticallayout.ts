enum LayoutOrientation {
  minToMax = 0,
  maxToMin = 1
}

interface ClipOptions {
  operation: HSCore.Util.Collision.ClipType;
  subject_fillType: HSCore.Util.Collision.PolyFillType;
  clip_fillType: HSCore.Util.Collision.PolyFillType;
}

/**
 * VerticalLayout arranges child items in a vertical stack.
 * Items can be fixed size or expand to fill available space.
 */
class VerticalLayout extends Layout {
  private _orientation: LayoutOrientation;

  constructor() {
    super();
    this._orientation = LayoutOrientation.maxToMin;
  }

  getClassName(): string {
    return LayoutModelClassName.VerticalLayout;
  }

  clone(): VerticalLayout {
    const cloned = new VerticalLayout();
    cloned.copyFrom(this);
    return cloned;
  }

  onParentGeomChanged(parentGeometry: unknown[]): void {
    const boundingBox = DiscretePolygon2d.getBound(parentGeometry);
    const items = this._items.slice();

    if (this._orientation === LayoutOrientation.maxToMin) {
      items.reverse();
    }

    const minX = boundingBox.min.x;
    const maxX = boundingBox.max.x;
    let currentMinY = boundingBox.min.y;
    let currentMaxY = currentMinY;
    const expandItems: LayoutItem[] = [];

    for (const item of items) {
      if (item.stretchType === StretchType.fix) {
        const itemBound = DiscretePolygon2d.getBound(item.getGeometry());
        const isValidBound = BoundingBox2D.isValid(itemBound);

        if (isValidBound) {
          currentMaxY = itemBound.min.y;
        }

        if (expandItems.length > 0) {
          VerticalLayout.updateExpandLayoutItems(
            expandItems,
            parentGeometry,
            BoundingBox2D.create(minX, maxX, currentMinY, currentMaxY)
          );
          expandItems.length = 0;
        }

        if (isValidBound) {
          currentMinY = itemBound.max.y;
        }
      } else {
        expandItems.push(item);
      }
    }

    if (expandItems.length > 0) {
      currentMaxY = boundingBox.max.y;
      VerticalLayout.updateExpandLayoutItems(
        expandItems,
        parentGeometry,
        BoundingBox2D.create(minX, maxX, currentMinY, currentMaxY)
      );
    }
  }

  private static updateExpandLayoutItems(
    items: LayoutItem[],
    parentGeometry: unknown[],
    availableBounds: BoundingBox2D
  ): void {
    if (items.length === 1) {
      VerticalLayout.updateExpandLayoutItem(items[0], parentGeometry, availableBounds);
      return;
    }

    const cumulativeHeights: number[] = [];
    let totalHeight = 0;

    for (const item of items) {
      const itemBound = DiscretePolygon2d.getBound(item.getGeometry());
      totalHeight += itemBound.height;
      cumulativeHeights.push(totalHeight);
    }

    const startY = availableBounds.min.y;

    for (let index = 0; index < items.length; index++) {
      const proportionalHeight = (cumulativeHeights[index] * availableBounds.height) / totalHeight;
      const itemBounds = BoundingBox2D.create(
        availableBounds.min.x,
        availableBounds.max.x,
        startY,
        proportionalHeight
      );
      VerticalLayout.updateExpandLayoutItem(items[index], parentGeometry, itemBounds);
    }
  }

  private static updateExpandLayoutItem(
    item: LayoutItem,
    parentGeometry: unknown[],
    bounds: BoundingBox2D
  ): void {
    if (BoundingBox2D.isValid(bounds)) {
      const polygon = BoundingBox2D.getPolygon(bounds);
      const clipOptions: ClipOptions = {
        operation: HSCore.Util.Collision.ClipType.inter,
        subject_fillType: HSCore.Util.Collision.PolyFillType.positive,
        clip_fillType: HSCore.Util.Collision.PolyFillType.positive
      };
      const clippedGeometry = HSCore.Util.Collision.ClipFaces(parentGeometry, [polygon], clipOptions);
      item.onParentGeomChanged(clippedGeometry);
    } else {
      if (DEBUG) {
        Logger.console.log("invalid boundingBox");
      }
      item.onParentGeomChanged([]);
    }
  }
}

LayoutItem.registerClass(LayoutModelClassName.VerticalLayout, VerticalLayout);

export { VerticalLayout };