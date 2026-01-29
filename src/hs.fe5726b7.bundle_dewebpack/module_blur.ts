function handleBlur(event: Event): void {
  this._delay(() => {
    if (
      !this.element[0].contains(this.document[0].activeElement)
    ) {
      this.collapseAll(event);
    }
  });
}