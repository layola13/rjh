export default function createWorker(): Worker {
  return new Worker(new URL('./3dmodeler.worker.a2be6aa8.bundle.worker.js', import.meta.url));
}