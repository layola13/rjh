enum KeyCode {
  SPACE = 32,
  ENTER = 13
}

function onKeyDown(e: KeyboardEvent): void {
  if ([KeyCode.SPACE, KeyCode.ENTER].includes(e.which)) {
    e.preventDefault();
    M(e);
  }
}

declare function M(e: KeyboardEvent): void;