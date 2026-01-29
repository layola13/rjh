interface DiffOptions {
  [key: string]: unknown;
}

interface DiffResult<T> {
  sequence: T;
  [key: string]: unknown;
}

function moduleGet<T extends string | unknown[]>(
  source: T,
  target: T,
  comparator?: unknown,
  options?: DiffOptions
): DiffResult<T extends string ? string : T> {
  const diffOptions: DiffOptions = options ?? {};
  
  const initialResult = I(source, target, comparator ?? C, diffOptions);
  
  const result = N(
    initialResult,
    source,
    target,
    source.length,
    target.length,
    diffOptions
  );

  if (typeof source === "string" && typeof target === "string") {
    result.sequence = (result.sequence as string[]).join("");
  }

  return result as DiffResult<T extends string ? string : T>;
}