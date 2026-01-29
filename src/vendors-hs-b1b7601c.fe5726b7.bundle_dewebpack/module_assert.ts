interface SideChannelContainer {
  has(value: unknown): boolean;
}

function assertContains(value: unknown): void {
  if (!sideChannel.has(value)) {
    throw new SideChannelError(`Side channel does not contain ${formatValue(value)}`);
  }
}

declare const sideChannel: SideChannelContainer;
declare class SideChannelError extends Error {}
declare function formatValue(value: unknown): string;