function not<T extends Element>(this: JQuery<T>, selector?: string | Element | Element[] | JQuery): JQuery<T> {
  return this.pushStack(filter(this, selector || [], true));
}