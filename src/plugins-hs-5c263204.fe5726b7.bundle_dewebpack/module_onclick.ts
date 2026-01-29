interface VersionData {
  versionId: string | number;
}

interface ClickHandler {
  handleClick(versionId: string | number): void | Promise<void>;
}

function onClick(handler: ClickHandler, data: VersionData): void | Promise<void> {
  return handler.handleClick(data.versionId);
}