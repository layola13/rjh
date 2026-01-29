export abstract class Predicate<T = any> {
  abstract execute(value: T): boolean;

  not(): Predicate<T> {
    return not(this);
  }

  and(...predicates: Predicate<T>[]): Predicate<T> {
    return and(this, ...predicates);
  }

  or(...predicates: Predicate<T>[]): Predicate<T> {
    return or(this, ...predicates);
  }
}

export class NotPredicate<T = any> extends Predicate<T> {
  constructor(public readonly source: Predicate<T>) {
    super();
  }

  execute(value: T): boolean {
    return !this.source.execute(value);
  }
}

export class AndPredicate<T = any> extends Predicate<T> {
  constructor(public readonly sources: Predicate<T>[]) {
    super();
  }

  execute(value: T): boolean {
    return this.sources.every((predicate) => predicate.execute(value));
  }
}

export class OrPredicate<T = any> extends Predicate<T> {
  constructor(public readonly sources: Predicate<T>[]) {
    super();
  }

  execute(value: T): boolean {
    return this.sources.some((predicate) => predicate.execute(value));
  }
}

export class ExpressionPredicate<T = any> extends Predicate<T> {
  constructor(public readonly expression: (value: T) => boolean) {
    super();
  }

  execute(value: T): boolean {
    return this.expression(value);
  }
}

export function not<T>(predicate: Predicate<T>): Predicate<T> {
  return new NotPredicate(predicate);
}

export function and<T>(...predicates: Predicate<T>[]): Predicate<T> {
  return new AndPredicate(predicates);
}

export function or<T>(...predicates: Predicate<T>[]): Predicate<T> {
  return new OrPredicate(predicates);
}