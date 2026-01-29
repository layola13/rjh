export default function createCompressWorker(): Worker {
  return new Worker("/compress.worker.8c76d243.bundle.worker.js");
}