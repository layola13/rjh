enum ScrollDirection {
  None = 'None',
  Left = 'Left',
  Right = 'Right',
  Both = 'Both'
}

function onScroll(): void {
  const currentElement = We.current;
  
  if (currentElement.scrollWidth <= currentElement.clientWidth) {
    te(ScrollDirection.None);
  } else if (currentElement.scrollLeft === 0) {
    te(ScrollDirection.Right);
  } else if (currentElement.scrollLeft + currentElement.clientWidth === currentElement.scrollWidth) {
    te(ScrollDirection.Left);
  } else {
    te(ScrollDirection.Both);
  }
}