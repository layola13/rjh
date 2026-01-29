function findEditorElement(selector?: string): JQuery {
  return selector ? $("#editor").find(selector) : $("#editor");
}