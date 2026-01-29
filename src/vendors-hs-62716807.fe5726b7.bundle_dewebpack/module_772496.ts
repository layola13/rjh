let requestIdCounter = 0;
const pendingRequests: Record<number, number> = {};

/**
 * Schedules a callback to be executed after a specified number of animation frames.
 * @param callback - The function to execute after the specified frames
 * @param frameCount - Number of animation frames to wait before executing (default: 1)
 * @returns A unique identifier for this scheduled request
 */
function requestAnimationFrames(callback: () => void, frameCount: number = 1): number {
  const requestId = requestIdCounter++;
  
  function frameHandler(): void {
    frameCount -= 1;
    
    if (frameCount <= 0) {
      callback();
      delete pendingRequests[requestId];
    } else {
      pendingRequests[requestId] = requestAnimationFrame(frameHandler);
    }
  }
  
  pendingRequests[requestId] = requestAnimationFrame(frameHandler);
  
  return requestId;
}

/**
 * Cancels a previously scheduled animation frame request.
 * @param requestId - The identifier returned by requestAnimationFrames
 */
requestAnimationFrames.cancel = function(requestId: number | undefined): void {
  if (requestId !== undefined) {
    cancelAnimationFrame(pendingRequests[requestId]);
    delete pendingRequests[requestId];
  }
};

requestAnimationFrames.ids = pendingRequests;

export default requestAnimationFrames;