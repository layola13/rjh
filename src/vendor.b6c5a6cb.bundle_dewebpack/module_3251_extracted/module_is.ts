function isMatch(selector: string | Element | Element[]): boolean {
  const elements = filterElements(
    this,
    typeof selector === "string" && SELECTOR_REGEX.test(selector)
      ? querySelectorAll(selector)
      : selector || [],
    false
  );
  
  return elements.length > 0;
}