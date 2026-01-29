export interface WarningMessage {
  (message: string): void;
}

const warningCache: Record<string, boolean> = {};
const preMessages: WarningMessage[] = [];

export const preMessage = (message: WarningMessage): void => {
  preMessages.push(message);
};

export function warning(condition: boolean, message: string): void {
  // Production build: warnings are no-op
}

export function note(condition: boolean, message: string): void {
  // Production build: notes are no-op
}

export function resetWarned(): void {
  Object.keys(warningCache).forEach(key => {
    delete warningCache[key];
  });
}

export function call(
  warningFunction: (condition: boolean, message: string) => void,
  condition: boolean,
  message: string
): void {
  if (!condition && !warningCache[message]) {
    warningFunction(false, message);
    warningCache[message] = true;
  }
}

export function warningOnce(condition: boolean, message: string): void {
  call(warning, condition, message);
}

export function noteOnce(condition: boolean, message: string): void {
  call(note, condition, message);
}

warningOnce.preMessage = preMessage;
warningOnce.resetWarned = resetWarned;
warningOnce.noteOnce = noteOnce;

export default warningOnce;