export class ZStream {
  input: Uint8Array | null = null;
  next_in: number = 0;
  avail_in: number = 0;
  total_in: number = 0;
  output: Uint8Array | null = null;
  next_out: number = 0;
  avail_out: number = 0;
  total_out: number = 0;
  msg: string = "";
  state: unknown = null;
  data_type: number = 2;
  adler: number = 0;
}