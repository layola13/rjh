function handleClose(event: Event): void {
  event.stopPropagation();
  re(false);
  if (!J) {
    fe(null);
  }
}