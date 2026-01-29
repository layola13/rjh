interface RequestOptions {
  retJson: {
    ret: string | string[];
  };
}

interface RequestParams {
  data?: unknown;
}

interface RequestContext {
  options: RequestOptions;
  params: RequestParams;
  sendData?: unknown;
  __sequence: (handlers: Array<() => Promise<void>>) => Promise<void>;
  __processToken: () => Promise<void>;
  __processRequestUrl: () => Promise<void>;
  middlewares: () => Promise<void>;
  __processRequest: () => Promise<void>;
}

type ExecuteFunction = () => Promise<void>;

export default function processEmojiEncoding(
  this: RequestContext,
  execute: ExecuteFunction
): Promise<void> {
  const context = this;
  const options = this.options;
  const params = this.params;
  let hasIllegalCharacter = false;

  function sanitizeData(data: unknown): unknown {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }

    if (typeof data === 'string') {
      return data.replace(/([\ud83a-\ud83f][\u0000-\uffff])/g, (match: string): string => {
        hasIllegalCharacter = true;
        const firstCharCode = match.charCodeAt(0).toString(16);
        const secondCharCode = match.charCodeAt(1).toString(16);
        return `\\u${firstCharCode}\\u${secondCharCode}`;
      });
    }

    return data;
  }

  if (params.data) {
    params.data = sanitizeData(params.data);
  }

  if (context.sendData) {
    context.sendData = sanitizeData(context.sendData);
  }

  return execute().then((): Promise<void> | undefined => {
    let returnCode = options.retJson.ret;

    if (Array.isArray(returnCode)) {
      returnCode = returnCode.join(', ');
    }

    const ILLEGAL_ACCESS_ERROR = 'FAIL_SYS_ILLEGAL_ACCESS';

    if (hasIllegalCharacter && returnCode.indexOf(ILLEGAL_ACCESS_ERROR) > -1) {
      return context.__sequence([
        context.__processToken,
        context.__processRequestUrl,
        context.middlewares,
        context.__processRequest
      ]);
    }

    return undefined;
  });
}