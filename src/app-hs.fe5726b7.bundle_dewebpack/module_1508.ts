export function createT3DRendererWorker(): Worker {
  return new Worker(new URL('./worker/e4062fe0.t3drenderer.worker.js', import.meta.url));
}