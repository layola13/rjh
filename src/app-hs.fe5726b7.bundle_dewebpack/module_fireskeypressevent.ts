interface BrowserDetector {
  isIE(): boolean;
  isEDGE(): boolean;
  isWEBKIT(): boolean;
  isMAC(): boolean;
  isVersionOrHigher(version: string): boolean;
}

interface KeyCodeHelper {
  CTRL: number;
  ALT: number;
  META: number;
  SHIFT: number;
  BACKSLASH: number;
  OPEN_SQUARE_BRACKET: number;
  CLOSE_SQUARE_BRACKET: number;
  TILDE: number;
  SEMICOLON: number;
  DASH: number;
  EQUALS: number;
  COMMA: number;
  PERIOD: number;
  SLASH: number;
  APOSTROPHE: number;
  SINGLE_QUOTE: number;
  ENTER: number;
  ESC: number;
  normalizeKeyCode(keyCode: number): number;
  isCharacterKey(keyCode: number): boolean;
}

declare const Qe: BrowserDetector;
declare const et: KeyCodeHelper;

function firesKeyPressEvent(
  keyCode: number,
  normalizedKeyCode: number,
  ctrlKey: boolean,
  shiftKey: boolean,
  altKey: boolean,
  metaKey: boolean
): boolean {
  if (!(Qe.isIE() || Qe.isEDGE() || Qe.isWEBKIT() && Qe.isVersionOrHigher("525"))) {
    return true;
  }

  if (Qe.isMAC() && altKey) {
    return et.isCharacterKey(keyCode);
  }

  if (altKey && !shiftKey) {
    return false;
  }

  let normalizedKey = normalizedKeyCode;
  if (Number.isInteger(normalizedKeyCode)) {
    normalizedKey = et.normalizeKeyCode(normalizedKeyCode);
  }

  const isModifierKey = normalizedKey === et.CTRL || normalizedKey === et.ALT || Qe.isMAC() && normalizedKey === et.META;
  const isShiftWithModifier = normalizedKey === et.SHIFT && (shiftKey || metaKey);

  if ((!ctrlKey || Qe.isMAC()) && isModifierKey || Qe.isMAC() && isShiftWithModifier) {
    return false;
  }

  if ((Qe.isWEBKIT() || Qe.isEDGE()) && shiftKey && ctrlKey) {
    switch (keyCode) {
      case et.BACKSLASH:
      case et.OPEN_SQUARE_BRACKET:
      case et.CLOSE_SQUARE_BRACKET:
      case et.TILDE:
      case et.SEMICOLON:
      case et.DASH:
      case et.EQUALS:
      case et.COMMA:
      case et.PERIOD:
      case et.SLASH:
      case et.APOSTROPHE:
      case et.SINGLE_QUOTE:
        return false;
    }
  }

  if (Qe.isIE() && shiftKey && normalizedKey === keyCode) {
    return false;
  }

  switch (keyCode) {
    case et.ENTER:
      return true;
    case et.ESC:
      return !(Qe.isWEBKIT() || Qe.isEDGE());
  }

  return et.isCharacterKey(keyCode);
}

export { firesKeyPressEvent };