export default function isBrowserEnvironment(): boolean {
  return !(
    typeof window === "undefined" ||
    !window.document ||
    !window.document.createElement
  );
}