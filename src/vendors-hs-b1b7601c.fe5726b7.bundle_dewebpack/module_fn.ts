function removeLink(editor: Editor): boolean {
  const selection = editor.selection;
  
  if (isSelectionEmpty(selection)) {
    clearSelection();
    
    if (selection.getNodeName() === "A") {
      const firstElement = selection.elems[0];
      const parentElement = firstElement.parentElement;
      
      if (parentElement && EXTRA_TAG.includes(parentElement.nodeName)) {
        parentElement.innerHTML = firstElement.innerHTML;
      } else {
        editor.cmd.do("insertHTML", `<span>${firstElement.innerHTML}</span>`);
      }
    } else {
      const parentLink = getParentNodeA(selection);
      const linkContent = parentLink.innerHTML;
      editor.cmd.do("insertHTML", `<span>${linkContent}</span>`);
    }
  }
  
  return true;
}

interface Editor {
  selection: Selection;
  cmd: {
    do(command: string, value: string): void;
  };
}

interface Selection {
  elems: HTMLElement[];
  getNodeName(): string;
}

const EXTRA_TAG: readonly string[] = ["DIV", "P", "H1", "H2", "H3", "H4", "H5", "H6"];

function isSelectionEmpty(selection: Selection): boolean {
  // Implementation needed
  return true;
}

function clearSelection(): void {
  // Implementation needed
}

function getParentNodeA(selection: Selection): HTMLAnchorElement {
  // Implementation needed
  return document.createElement("a");
}