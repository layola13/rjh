const MODE_BAD = 16209;
const MODE_TYPE = 16191;

interface InflateState {
  mode: number;
  dmax: number;
  wsize: number;
  whave: number;
  wnext: number;
  window: Uint8Array;
  hold: number;
  bits: number;
  lencode: Uint32Array;
  distcode: Uint32Array;
  lenbits: number;
  distbits: number;
  sane: boolean;
}

interface InflateStream {
  state: InflateState;
  next_in: number;
  input: Uint8Array;
  avail_in: number;
  next_out: number;
  output: Uint8Array;
  avail_out: number;
  msg: string;
}

export function inflateFast(stream: InflateStream, startOutput: number): void {
  const state = stream.state;
  
  let inputIndex = stream.next_in;
  const input = stream.input;
  const inputEnd = inputIndex + (stream.avail_in - 5);
  
  let outputIndex = stream.next_out;
  const output = stream.output;
  const outputStart = outputIndex - (startOutput - stream.avail_out);
  const outputEnd = outputIndex + (stream.avail_out - 257);
  
  const maxDistance = state.dmax;
  const windowSize = state.wsize;
  const windowHave = state.whave;
  const windowNext = state.wnext;
  const window = state.window;
  
  let holdBits = state.hold;
  let numBits = state.bits;
  
  const lengthCode = state.lencode;
  const distanceCode = state.distcode;
  const lengthMask = (1 << state.lenbits) - 1;
  const distanceMask = (1 << state.distbits) - 1;
  
  let code: number;
  let extra: number;
  let length: number;
  let distance: number;
  let sourceIndex: number;
  let sourceData: Uint8Array;
  
  mainLoop: do {
    if (numBits < 15) {
      holdBits += input[inputIndex++] << numBits;
      numBits += 8;
      holdBits += input[inputIndex++] << numBits;
      numBits += 8;
    }
    
    code = lengthCode[holdBits & lengthMask];
    
    lengthLoop: for (;;) {
      extra = code >>> 24;
      holdBits >>>= extra;
      numBits -= extra;
      extra = (code >>> 16) & 255;
      
      if (extra === 0) {
        output[outputIndex++] = code & 65535;
      } else {
        if (!(extra & 16)) {
          if ((extra & 64) === 0) {
            code = lengthCode[(code & 65535) + (holdBits & ((1 << extra) - 1))];
            continue lengthLoop;
          }
          if (extra & 32) {
            state.mode = MODE_TYPE;
            break mainLoop;
          }
          stream.msg = "invalid literal/length code";
          state.mode = MODE_BAD;
          break mainLoop;
        }
        
        length = code & 65535;
        extra &= 15;
        
        if (extra) {
          if (numBits < extra) {
            holdBits += input[inputIndex++] << numBits;
            numBits += 8;
          }
          length += holdBits & ((1 << extra) - 1);
          holdBits >>>= extra;
          numBits -= extra;
        }
        
        if (numBits < 15) {
          holdBits += input[inputIndex++] << numBits;
          numBits += 8;
          holdBits += input[inputIndex++] << numBits;
          numBits += 8;
        }
        
        code = distanceCode[holdBits & distanceMask];
        
        distanceLoop: for (;;) {
          extra = code >>> 24;
          holdBits >>>= extra;
          numBits -= extra;
          extra = (code >>> 16) & 255;
          
          if (!(extra & 16)) {
            if ((extra & 64) === 0) {
              code = distanceCode[(code & 65535) + (holdBits & ((1 << extra) - 1))];
              continue distanceLoop;
            }
            stream.msg = "invalid distance code";
            state.mode = MODE_BAD;
            break mainLoop;
          }
          
          distance = code & 65535;
          extra &= 15;
          
          if (numBits < extra) {
            holdBits += input[inputIndex++] << numBits;
            numBits += 8;
            if (numBits < extra) {
              holdBits += input[inputIndex++] << numBits;
              numBits += 8;
            }
          }
          
          distance += holdBits & ((1 << extra) - 1);
          
          if (distance > maxDistance) {
            stream.msg = "invalid distance too far back";
            state.mode = MODE_BAD;
            break mainLoop;
          }
          
          holdBits >>>= extra;
          numBits -= extra;
          extra = outputIndex - outputStart;
          
          if (distance > extra) {
            extra = distance - extra;
            
            if (extra > windowHave && state.sane) {
              stream.msg = "invalid distance too far back";
              state.mode = MODE_BAD;
              break mainLoop;
            }
            
            sourceIndex = 0;
            sourceData = window;
            
            if (windowNext === 0) {
              sourceIndex += windowSize - extra;
              if (extra < length) {
                length -= extra;
                do {
                  output[outputIndex++] = window[sourceIndex++];
                } while (--extra);
                sourceIndex = outputIndex - distance;
                sourceData = output;
              }
            } else if (windowNext < extra) {
              sourceIndex += windowSize + windowNext - extra;
              extra -= windowNext;
              if (extra < length) {
                length -= extra;
                do {
                  output[outputIndex++] = window[sourceIndex++];
                } while (--extra);
                sourceIndex = 0;
                if (windowNext < length) {
                  extra = windowNext;
                  length -= extra;
                  do {
                    output[outputIndex++] = window[sourceIndex++];
                  } while (--extra);
                  sourceIndex = outputIndex - distance;
                  sourceData = output;
                }
              }
            } else {
              sourceIndex += windowNext - extra;
              if (extra < length) {
                length -= extra;
                do {
                  output[outputIndex++] = window[sourceIndex++];
                } while (--extra);
                sourceIndex = outputIndex - distance;
                sourceData = output;
              }
            }
            
            while (length > 2) {
              output[outputIndex++] = sourceData[sourceIndex++];
              output[outputIndex++] = sourceData[sourceIndex++];
              output[outputIndex++] = sourceData[sourceIndex++];
              length -= 3;
            }
            
            if (length) {
              output[outputIndex++] = sourceData[sourceIndex++];
              if (length > 1) {
                output[outputIndex++] = sourceData[sourceIndex++];
              }
            }
          } else {
            sourceIndex = outputIndex - distance;
            do {
              output[outputIndex++] = output[sourceIndex++];
              output[outputIndex++] = output[sourceIndex++];
              output[outputIndex++] = output[sourceIndex++];
              length -= 3;
            } while (length > 2);
            
            if (length) {
              output[outputIndex++] = output[sourceIndex++];
              if (length > 1) {
                output[outputIndex++] = output[sourceIndex++];
              }
            }
          }
          break;
        }
      }
      break;
    }
  } while (inputIndex < inputEnd && outputIndex < outputEnd);
  
  length = numBits >> 3;
  inputIndex -= length;
  numBits -= length << 3;
  holdBits &= (1 << numBits) - 1;
  
  stream.next_in = inputIndex;
  stream.next_out = outputIndex;
  stream.avail_in = inputIndex < inputEnd ? inputEnd - inputIndex + 5 : 5 - (inputIndex - inputEnd);
  stream.avail_out = outputIndex < outputEnd ? outputEnd - outputIndex + 257 : 257 - (outputIndex - outputEnd);
  state.hold = holdBits;
  state.bits = numBits;
}