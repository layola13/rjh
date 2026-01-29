function removeLink(editor: Editor): boolean {
  const selection = editor.selection;
  
  if (!hasSelection(selection)) {
    return true;
  }
  
  clearFormatting();
  
  if (selection.getNodeName() === "A") {
    const firstElement = selection.elems[0];
    const parentElement = firstElement.parentElement;
    
    if (parentElement && EXTRA_TAG.includes(parentElement.nodeName)) {
      parentElement.innerHTML = firstElement.innerHTML;
    } else {
      editor.cmd.do("insertHTML", `<span>${firstElement.innerHTML}</span>`);
    }
  } else {
    const parentAnchor = getParentNodeA(selection);
    const anchorInnerHTML = parentAnchor.innerHTML;
    editor.cmd.do("insertHTML", `<span>${anchorInnerHTML}</span>`);
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

const EXTRA_TAG: readonly string[] = ['DIV', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'TD', 'TH'];

function hasSelection(selection: Selection): boolean {
  return selection.elems.length > 0;
}

function clearFormatting(): void {
  // Implementation for clearing formatting
}

function getParentNodeA(selection: Selection): HTMLAnchorElement {
  let node = selection.elems[0] as Node;
  
  while (node && node.nodeName !== 'A') {
    node = node.parentNode as Node;
  }
  
  return node as HTMLAnchorElement;
}