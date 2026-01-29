interface WarningRecord {
  [key: string]: boolean;
}

type MessageFunction = (condition: boolean, message: string) => void;

const warned: WarningRecord = {};
const preMessages: Array<(message: string) => void> = [];

export const preMessage = (fn: (message: string) => void): void => {
  preMessages.push(fn);
};

export function warning(condition: boolean, message: string): void {
  // Warning implementation - currently no-op
}

export function note(condition: boolean, message: string): void {
  // Note implementation - currently no-op
}

export function resetWarned(): void {
  Object.keys(warned).forEach(key => delete warned[key]);
}

export function call(
  fn: MessageFunction,
  condition: boolean,
  message: string
): void {
  if (!condition && !warned[message]) {
    fn(false, message);
    warned[message] = true;
  }
}

export function warningOnce(condition: boolean, message: string): void {
  call(warning, condition, message);
}

export function noteOnce(condition: boolean, message: string): void {
  call(note, condition, message);
}

export default warningOnce;