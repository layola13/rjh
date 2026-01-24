/**
 * Factory function that creates a new Web Worker instance for 3D modeling operations.
 * 
 * @remarks
 * This worker handles 3D modeling computations in a separate thread to avoid blocking
 * the main UI thread. The worker file is loaded from the application's public path.
 * 
 * @returns A new Worker instance configured for 3D modeling tasks
 * 
 * @example
 *