/**
 * Schedules a callback to be executed asynchronously.
 * Uses MessageChannel when available for better performance,
 * otherwise falls back to a default scheduling mechanism.
 * 
 * @param callback - The function to be executed asynchronously
 */
export default function scheduleCallback(callback: () => void): void;