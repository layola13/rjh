let timestamp: number = Date.now();
let counter: number = 0;

export default function generateUploadId(): string {
  return `rc-upload-${timestamp}-${++counter}`;
}