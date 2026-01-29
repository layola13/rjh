export const Z_NEED_DICT = 2;
export const Z_STREAM_END = 1;
export const Z_OK = 0;
export const Z_ERRNO = -1;
export const Z_STREAM_ERROR = -2;
export const Z_DATA_ERROR = -3;
export const Z_MEM_ERROR = -4;
export const Z_BUF_ERROR = -5;
export const Z_VERSION_ERROR = -6;

export const ERROR_MESSAGES: Record<number, string> = {
  [Z_NEED_DICT]: "need dictionary",
  [Z_STREAM_END]: "stream end",
  [Z_OK]: "",
  [Z_ERRNO]: "file error",
  [Z_STREAM_ERROR]: "stream error",
  [Z_DATA_ERROR]: "data error",
  [Z_MEM_ERROR]: "insufficient memory",
  [Z_BUF_ERROR]: "buffer error",
  [Z_VERSION_ERROR]: "incompatible version"
};

export default ERROR_MESSAGES;