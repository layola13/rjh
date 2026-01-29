export class GZipHeader {
  text: number = 0;
  time: number = 0;
  xflags: number = 0;
  os: number = 0;
  extra: Uint8Array | null = null;
  extra_len: number = 0;
  name: string = "";
  comment: string = "";
  hcrc: number = 0;
  done: boolean = false;
}

export default GZipHeader;