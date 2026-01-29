export function getNavOffset(
  index: number,
  container: HTMLElement | null,
  navList: HTMLElement | null
): number {
  if (!container || !navList) {
    return 0;
  }

  const firstChild = navList.children[0] as HTMLElement | undefined;
  if (!firstChild) {
    return 0;
  }

  const itemWidth = firstChild.clientWidth + parseInt(window.getComputedStyle(firstChild).marginRight);
  const maxScroll = container.scrollWidth - container.clientWidth;
  const targetOffset = index * itemWidth + 0.5 * itemWidth - 0.5 * container.clientWidth;

  if (maxScroll === 0) {
    return 0.5 * (container.clientWidth - navList.clientWidth);
  }

  if (targetOffset < 0) {
    return 0;
  }

  if (targetOffset > maxScroll) {
    return -maxScroll;
  }

  return -targetOffset;
}