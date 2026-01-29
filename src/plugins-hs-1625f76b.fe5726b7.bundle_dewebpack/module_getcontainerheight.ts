function getContainerHeight(pageRef?: React.RefObject<HTMLElement>): number {
  const ref = pageRef ?? { current: null };
  const dimension = "height";
  const rectValue = ref.current ? ref.current.getBoundingClientRect()[dimension] : 0;
  const OFFSET = 60;
  return rectValue - OFFSET;
}