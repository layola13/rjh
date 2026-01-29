import objectKeys from './947716';
import createValidator from './539218';
import composeValidators from './260703';

export default function createValidatorFromSchema<T extends Record<string, unknown>>(
  schema: T,
  context?: unknown
): (value: unknown, allValues?: unknown) => unknown {
  const validators = objectKeys(schema).map((key) => {
    return createValidator(key, schema[key], context);
  });

  const composedValidator = composeValidators(...validators);

  return function validate(value: unknown, allValues?: unknown): unknown {
    return composedValidator(value, allValues);
  };
}