// @ts-nocheck
enum ScrollDirection {
  None = 'None',
  Left = 'Left',
  Right = 'Right',
  Both = 'Both'
}

function onScroll(currentElement: HTMLElement, setScrollDirection: (direction: ScrollDirection) => void): void {
  if (currentElement.scrollWidth <= currentElement.clientWidth) {
    setScrollDirection(ScrollDirection.None);
  } else if (currentElement.scrollLeft === 0) {
    setScrollDirection(ScrollDirection.Right);
  } else if (currentElement.scrollLeft + currentElement.clientWidth === currentElement.scrollWidth) {
    setScrollDirection(ScrollDirection.Left);
  } else {
    setScrollDirection(ScrollDirection.Both);
  }
}