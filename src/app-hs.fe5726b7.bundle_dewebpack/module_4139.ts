export function createWorker(): Worker {
  return new Worker(new URL('./worker/75256b7c.common.worker.js', import.meta.url));
}