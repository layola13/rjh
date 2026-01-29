interface DestroyableContext {
  gl: WebGLRenderingContext | WebGL2RenderingContext;
  destroy(): void;
}

interface ModuleState {
  _: DestroyableContext;
}

interface GlobalManager {
  set(config: { gl: WebGLRenderingContext | WebGL2RenderingContext }): void;
}

declare const y: GlobalManager;

function moduleDestroy(this: ModuleState): void {
  y.set({
    gl: this._.gl
  });
  
  this._.destroy();
}