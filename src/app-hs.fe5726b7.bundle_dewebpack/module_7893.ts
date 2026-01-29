function createLoadObjWorker(): Worker {
    return new Worker(new URL('./worker/ab819af2.loadobj.worker.js', import.meta.url));
}

export { createLoadObjWorker as A };