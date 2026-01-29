interface ClickHandlerProps {
  onClick?: (event: MouseEvent) => void;
}

interface FocusSelectConfig {
  focusOnSelect?: (target: HTMLElement) => void;
}

interface ComponentContext {
  props?: ClickHandlerProps;
}

function handleClick(
  event: MouseEvent,
  f: ComponentContext,
  e: FocusSelectConfig,
  g: HTMLElement
): void {
  f.props?.onClick?.(event);
  e.focusOnSelect?.(g);
}