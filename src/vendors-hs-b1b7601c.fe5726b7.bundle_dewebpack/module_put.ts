interface KeyValuePair<K = unknown, V = unknown> {
  key: K;
  value: V;
}

let v: KeyValuePair;

function put<K, V>(key: K, value: V): void {
  v = {
    key,
    value
  };
}