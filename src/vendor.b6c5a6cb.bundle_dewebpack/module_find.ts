function find(selector: string | Element | Element[]): Element[] {
  let index: number;
  let results: Element[];
  const length: number = this.length;
  const context: Element[] = this;

  if (typeof selector !== "string") {
    return this.pushStack(
      jQuery(selector).filter(function (this: Element): boolean {
        for (index = 0; index < length; index++) {
          if (jQuery.contains(context[index], this)) {
            return true;
          }
        }
        return false;
      })
    );
  }

  results = this.pushStack([]);
  
  for (index = 0; index < length; index++) {
    jQuery.find(selector, context[index], results);
  }

  return length > 1 ? jQuery.uniqueSort(results) : results;
}