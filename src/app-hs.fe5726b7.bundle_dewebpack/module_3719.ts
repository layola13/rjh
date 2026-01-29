function createWebcadModelWorker(): Worker {
  return new Worker("/worker/494b818b.webcadmodelapi.worker.js");
}

export { createWebcadModelWorker };