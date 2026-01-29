import { OutdoorCommandTypes } from './162663';

export interface CommandTypes {
  Sequence: string;
  Composite: string;
  [key: string]: string;
}

const CommandTypes: CommandTypes = Object.freeze({
  Sequence: "hsw.cmd.SequenceCommand",
  Composite: "hsw.cmd.CompositeCommand",
  ...await import('./948436'),
  ...await import('./646'),
  ...await import('./309816'),
  ...await import('./579615'),
  ...await import('./354193'),
  ...await import('./354828'),
  ...await import('./935127'),
  ...await import('./554221'),
  ...await import('./774517'),
  ...await import('./372683'),
  ...await import('./357790'),
  ...await import('./813749'),
  ...await import('./892236'),
  ...OutdoorCommandTypes,
});

export default CommandTypes;