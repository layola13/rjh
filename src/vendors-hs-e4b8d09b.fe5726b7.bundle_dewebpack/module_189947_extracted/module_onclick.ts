interface ClickEvent {
  name: string;
}

type ClickHandler = (event: ClickEvent) => void;

function handleClick(
  event: ClickEvent,
  callback: ClickHandler | null,
  setVisibility: (visible: boolean) => void,
  processName: (name: string) => void
): void {
  const eventData = event;
  const eventName = eventData.name;
  
  setVisibility(false);
  
  if (callback) {
    processName(eventName);
    callback(eventData);
  }
}