function destroy(this: { _: { gl: unknown; destroy: () => void } }): void {
  y.set({
    gl: this._.gl
  });
  
  this._.destroy();
}