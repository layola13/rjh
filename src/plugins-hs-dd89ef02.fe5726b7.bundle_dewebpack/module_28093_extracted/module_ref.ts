export function initializeRulerControl(rulerControlInstance: unknown): void {
  if (typeof D !== 'undefined' && D.UI) {
    D.UI.rulerControl = rulerControlInstance;
  }
}