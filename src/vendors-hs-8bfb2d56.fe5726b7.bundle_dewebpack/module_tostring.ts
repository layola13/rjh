interface URLComponents {
  host: string;
  protocol: string;
  slashes: boolean;
  username: string;
  password: string;
  hostname: string;
  port: string;
  pathname: string;
  query: string | Record<string, unknown>;
  hash: string;
}

interface QueryStringifier {
  stringify(query: Record<string, unknown>): string;
}

declare const o: QueryStringifier;

function requiresSpecialProtocol(protocol: string): boolean {
  const specialProtocols = ['http:', 'https:', 'ftp:', 'ws:', 'wss:'];
  return specialProtocols.includes(protocol);
}

const PORT_PATTERN = /:\d+$/;

function toString(
  this: URLComponents,
  encoder?: (query: Record<string, unknown>) => string
): string {
  const stringifier = typeof encoder === 'function' ? encoder : o.stringify;
  
  const protocol = this.protocol;
  const host = this.host;
  const needsSlashes = this.protocol && this.slashes || requiresSpecialProtocol(this.protocol);
  
  let result = '';
  
  if (protocol) {
    result = protocol.charAt(protocol.length - 1) !== ':' ? `${protocol}:` : protocol;
  }
  
  if (needsSlashes) {
    result += '//';
  }
  
  if (this.username) {
    result += this.username;
    if (this.password) {
      result += `:${this.password}`;
    }
    result += '@';
  } else if (this.password) {
    result += `:${this.password}@`;
  } else if (
    this.protocol !== 'file:' &&
    requiresSpecialProtocol(this.protocol) &&
    !host &&
    this.pathname !== '/'
  ) {
    result += '@';
  }
  
  let hostWithPort = host;
  if (
    host.charAt(host.length - 1) === ':' ||
    (PORT_PATTERN.test(this.hostname) && !this.port)
  ) {
    hostWithPort += ':';
  }
  
  result += hostWithPort + this.pathname;
  
  const queryString =
    typeof this.query === 'object'
      ? stringifier(this.query)
      : this.query;
  
  if (queryString) {
    result += queryString.charAt(0) !== '?' ? `?${queryString}` : queryString;
  }
  
  if (this.hash) {
    result += this.hash;
  }
  
  return result;
}

export { toString, URLComponents, QueryStringifier };