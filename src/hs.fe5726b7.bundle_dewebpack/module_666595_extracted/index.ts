// Module: keydown
export function keydown(event: KeyboardEvent): void {
  // Implementation for keydown handler
}

// Module: ne
export const ne = "ne";

// Module: mousewheel
export function mousewheel(event: WheelEvent): void {
  // Implementation for mousewheel handler
}

// Module: call
export function call<T, A extends unknown[]>(
  context: T,
  fn: (...args: A) => unknown,
  ...args: A
): void {
  fn.apply(context, args);
}

// Module: mouseenter .ui-spinner-button
export function mouseenterSpinnerButton(event: MouseEvent): void {
  // Implementation for mouseenter on spinner button
}

// Module: set
export function set<T>(target: Record<string, T>, key: string, value: T): void {
  target[key] = value;
}

// Module: top
export const top = "top";

// Module: using
export function using<T extends { dispose(): void }>(
  resource: T,
  fn: (resource: T) => void
): void {
  try {
    fn(resource);
  } finally {
    resource.dispose();
  }
}

// Module: e
export const e = "e";

// Module: mousedown .ui-spinner-button
export function mousedownSpinnerButton(event: MouseEvent): void {
  // Implementation for mousedown on spinner button
}

// Module: left
export const left = "left";

// Module: w
export const w = "w";

// Module: s
export const s = "s";

// Module: sw
export const sw = "sw";

// Module: focus
export function focus(element: HTMLElement): void {
  element.focus();
}

// Module: mousedown .ui-menu-item > a
export function mousedownMenuItem(event: MouseEvent): void {
  // Implementation for mousedown on menu item link
}

// Module: n
export const n = "n";

// Module: click .ui-state-disabled > a
export function clickDisabledState(event: MouseEvent): void {
  event.preventDefault();
}

// Module: beforeSend
export function beforeSend(xhr: XMLHttpRequest, settings: Record<string, unknown>): boolean {
  // Implementation for beforeSend hook
  return true;
}

// Module: add
export function add<T>(collection: T[], item: T): void {
  collection.push(item);
}

// Module: parse
export function parse(data: string): unknown {
  return JSON.parse(data);
}

// Module: click .ui-menu-item:has(a)
export function clickMenuItemWithLink(event: MouseEvent): void {
  // Implementation for click on menu item with link
}

// Module: mouseenter .ui-menu-item
export function mouseenterMenuItem(event: MouseEvent): void {
  // Implementation for mouseenter on menu item
}

// Module: blur
export function blur(element: HTMLElement): void {
  element.blur();
}

// Module: se
export const se = "se";

// Module: nw
export const nw = "nw";