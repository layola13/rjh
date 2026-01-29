interface ModuleContext {
  picture: unknown;
}

function setPicture(this: ModuleContext, value: unknown): void {
  this.picture = value;
}