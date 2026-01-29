export function createSelectionRestorer(): () => void {
  const selection = document.getSelection();
  
  if (!selection?.rangeCount) {
    return () => {};
  }

  const activeElement = document.activeElement as HTMLElement | null;
  const savedRanges: Range[] = [];

  for (let i = 0; i < selection.rangeCount; i++) {
    savedRanges.push(selection.getRangeAt(i));
  }

  const tagName = activeElement?.tagName.toUpperCase();
  let elementToFocus: HTMLElement | null = null;

  switch (tagName) {
    case "INPUT":
    case "TEXTAREA":
      (activeElement as HTMLInputElement | HTMLTextAreaElement).blur();
      elementToFocus = activeElement;
      break;
    default:
      elementToFocus = null;
  }

  selection.removeAllRanges();

  return () => {
    if (selection.type === "Caret") {
      selection.removeAllRanges();
    }

    if (!selection.rangeCount) {
      savedRanges.forEach((range: Range) => {
        selection.addRange(range);
      });
    }

    elementToFocus?.focus();
  };
}