function handleClick(event: MouseEvent): void {
  event.stopPropagation();
  M(event);
}