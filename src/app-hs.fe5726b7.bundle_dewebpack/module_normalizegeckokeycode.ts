enum KeyCode {
  FF_EQUALS,
  EQUALS,
  FF_SEMICOLON,
  SEMICOLON,
  FF_DASH,
  DASH,
  MAC_FF_META,
  META,
  WIN_KEY_FF_LINUX,
  WIN_KEY
}

function normalizeGeckoKeyCode(keyCode: KeyCode): KeyCode {
  switch (keyCode) {
    case KeyCode.FF_EQUALS:
      return KeyCode.EQUALS;
    case KeyCode.FF_SEMICOLON:
      return KeyCode.SEMICOLON;
    case KeyCode.FF_DASH:
      return KeyCode.DASH;
    case KeyCode.MAC_FF_META:
      return KeyCode.META;
    case KeyCode.WIN_KEY_FF_LINUX:
      return KeyCode.WIN_KEY;
    default:
      return keyCode;
  }
}

export { normalizeGeckoKeyCode, KeyCode };