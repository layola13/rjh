interface CustomOptions {
  msg: string;
}

function sendMessage(
  message: string | undefined,
  callback?: unknown
): ReturnType<typeof this.custom> | undefined {
  if (message && !(message.length > 180)) {
    return this.custom(
      {
        msg: message
      },
      callback
    );
  }
  return undefined;
}