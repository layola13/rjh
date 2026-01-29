function createHScoreWorker(): Worker {
  return new Worker("/worker/9ba77142.hscore.worker.js");
}

export { createHScoreWorker };