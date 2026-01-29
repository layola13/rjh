function add<T extends Element>(
  selector: string | Element | Element[] | JQuery<Element>,
  context?: Element | Document | JQuery<Element>
): JQuery<T> {
  const elements = jQuery(selector, context);
  const merged = jQuery.merge(this.get(), elements);
  const uniqueSorted = jQuery.uniqueSort(merged);
  return this.pushStack(uniqueSorted);
}