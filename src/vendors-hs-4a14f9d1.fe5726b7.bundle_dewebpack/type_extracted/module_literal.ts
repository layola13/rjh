interface LiteralNode {
  text: string;
}

function escapeString(str: string): string {
  // 需要根据实际的 I 函数实现来确定
  return str;
}

export function moduleLiteral(node: LiteralNode): string {
  return '"' + escapeString(node.text) + '"';
}