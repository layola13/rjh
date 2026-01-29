interface Book {
  use(module: unknown): void;
}

declare global {
  var book: Book | undefined;
}

globalThis.book?.use(module_f);

const module_f = {};

export { module_f };