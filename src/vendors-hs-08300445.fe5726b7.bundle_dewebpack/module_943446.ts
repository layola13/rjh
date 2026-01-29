interface Size {
  width: number;
  height: number;
}

interface Position {
  x: number;
  y: number;
}

type Axis = 'x' | 'y';

/**
 * Calculate position adjustment to fit content within viewport bounds
 * @param contentWidth - Width of the content
 * @param contentHeight - Height of the content
 * @param offsetX - Horizontal offset position
 * @param offsetY - Vertical offset position
 * @returns Position adjustment object or null if no adjustment needed
 */
export default function calculatePositionAdjustment(
  contentWidth: number,
  contentHeight: number,
  offsetX: number,
  offsetY: number
): Position | null {
  const clientSize: Size = getClientSize();
  const viewportWidth = clientSize.width;
  const viewportHeight = clientSize.height;

  let adjustment: Position | null = null;

  if (contentWidth <= viewportWidth && contentHeight <= viewportHeight) {
    adjustment = {
      x: 0,
      y: 0
    };
  } else if (contentWidth > viewportWidth || contentHeight > viewportHeight) {
    adjustment = {
      ...calculateAxisAdjustment('x', offsetX, contentWidth, viewportWidth),
      ...calculateAxisAdjustment('y', offsetY, contentHeight, viewportHeight)
    };
  }

  return adjustment;
}

function calculateAxisAdjustment(
  axis: Axis,
  offset: number,
  contentSize: number,
  viewportSize: number
): Partial<Position> {
  const endPosition = offset + contentSize;
  const overflowAmount = (contentSize - viewportSize) / 2;

  if (contentSize > viewportSize) {
    if (offset > 0) {
      return { [axis]: overflowAmount };
    }
    if (offset < 0 && endPosition < viewportSize) {
      return { [axis]: -overflowAmount };
    }
  } else if (offset < 0 || endPosition > viewportSize) {
    return { [axis]: offset < 0 ? overflowAmount : -overflowAmount };
  }

  return {};
}

function getClientSize(): Size {
  return {
    width: document.documentElement.clientWidth || window.innerWidth,
    height: document.documentElement.clientHeight || window.innerHeight
  };
}