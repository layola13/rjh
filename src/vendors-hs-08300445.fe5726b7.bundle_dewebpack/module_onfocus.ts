function onFocus(t: unknown): void {
  handleZe(t);
  handleQe();
  
  if (!someFlag) {
    scrollContainerRef.current.scrollLeft = 0;
  }
  scrollContainerRef.current.scrollTop = 0;
}