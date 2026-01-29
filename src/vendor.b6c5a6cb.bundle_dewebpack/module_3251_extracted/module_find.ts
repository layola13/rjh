function find(selector: string | Element | Element[] | ArrayLike<Element>): ArrayLike<Element> {
  let index: number;
  let results: ArrayLike<Element>;
  const length: number = this.length;
  const context: ArrayLike<Element> = this;

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