interface DomModule {
  dom: unknown;
}

function setDom(module: DomModule, value: unknown): void {
  module.dom = value;
}