enum KeyCode {
  MAC_WK_CMD_RIGHT = 93,
  META = 91
}

function normalizeMacWebKitKeyCode(keyCode: number): number {
  return keyCode === KeyCode.MAC_WK_CMD_RIGHT ? KeyCode.META : keyCode;
}