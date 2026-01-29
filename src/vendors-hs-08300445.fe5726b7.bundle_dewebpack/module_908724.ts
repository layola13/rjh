import { setValues } from './utils';
import { defaultValidateMessages } from './messages';
import Schema from 'async-validator';
import type { RuleObject, ValidateMessages, ValidateOptions, InternalNamePath, StoreValue } from './interface';

interface ValidatorRule extends RuleObject {
  validator?: (
    rule: RuleObject,
    value: StoreValue,
    callback: (error?: string) => void
  ) => Promise<void> | void;
}

interface FormattedMessages {
  default?: () => string;
  [key: string]: any;
}

/**
 * Format validate messages with template variables
 */
function formatMessages(
  messages: ValidateMessages | undefined,
  namePath: string,
  rule: RuleObject,
  messageVariables?: Record<string, any>
): FormattedMessages {
  const ruleData = {
    ...rule,
    name: namePath,
    enum: (rule.enum || []).join(', ')
  };

  function replaceTemplates(
    template: string,
    variables: Record<string, any>
  ): string {
    return template.replace(/\$\{\w+\}/g, (match) => {
      const key = match.slice(2, -1);
      return variables[key];
    });
  }

  function processMessages(
    source: any,
    target: any = {}
  ): FormattedMessages {
    Object.keys(source).forEach((key) => {
      const value = source[key];
      if (typeof value === 'string') {
        target[key] = () => replaceTemplates(value, { ...ruleData, ...messageVariables });
      } else if (value && typeof value === 'object') {
        target[key] = {};
        processMessages(value, target[key]);
      } else {
        target[key] = value;
      }
    });
    return target;
  }

  return processMessages(
    setValues({}, defaultValidateMessages, messages)
  );
}

/**
 * Validate a single field with async-validator
 */
async function validateField(
  namePath: string,
  value: StoreValue,
  rule: ValidatorRule,
  options: ValidateOptions,
  messageVariables?: Record<string, any>
): Promise<string[]> {
  const clonedRule = { ...rule };
  let defaultField: RuleObject | undefined;

  if (clonedRule && clonedRule.type === 'array' && clonedRule.defaultField) {
    defaultField = clonedRule.defaultField;
    delete clonedRule.defaultField;
  }

  const validator = new Schema({
    [namePath]: [clonedRule]
  });

  const messages = formatMessages(
    options.validateMessages,
    namePath,
    clonedRule,
    messageVariables
  );

  validator.messages(messages);

  let errors: string[] = [];

  try {
    await Promise.resolve(
      validator.validate(
        { [namePath]: value },
        { ...options }
      )
    );
  } catch (error: any) {
    if (error.errors) {
      errors = error.errors.map((err: any, index: number) => {
        const message = err.message;
        // Handle React elements if needed
        if (typeof message === 'object' && message?.key !== undefined) {
          return { ...message, key: `error_${index}` };
        }
        return message;
      });
    } else {
      console.error(error);
      errors = [messages.default?.() || ''];
    }
  }

  if (errors.length || !defaultField) {
    return errors;
  }

  // Validate array items with defaultField
  const arrayResults = await Promise.all(
    (value as StoreValue[]).map((item, index) =>
      validateField(
        `${namePath}.${index}`,
        item,
        defaultField!,
        options,
        messageVariables
      )
    )
  );

  return arrayResults.reduce((acc, curr) => [...acc, ...curr], []);
}

/**
 * Validate in parallel and collect all errors
 */
async function validateParallel(
  validations: Promise<string[]>[]
): Promise<string[]> {
  return Promise.all(validations).then((results) => {
    return [].concat(...results);
  });
}

/**
 * Validate serially and stop at first error
 */
async function validateSerial(
  validations: Promise<string[]>[]
): Promise<string[]> {
  return new Promise((resolve) => {
    let completed = 0;
    validations.forEach((validation) => {
      validation.then((errors) => {
        if (errors.length) {
          resolve(errors);
        }
        completed += 1;
        if (completed === validations.length) {
          resolve([]);
        }
      });
    });
  });
}

/**
 * Validate field rules
 */
export async function validateRules(
  namePath: InternalNamePath,
  value: StoreValue,
  rules: ValidatorRule[],
  options: ValidateOptions,
  validateFirst: boolean | 'parallel',
  messageVariables?: Record<string, any>
): Promise<string[]> {
  const name = namePath.join('.');

  // Wrap validator functions to support legacy callback style
  const processedRules = rules.map((rule) => {
    const { validator } = rule;
    if (!validator) {
      return rule;
    }

    return {
      ...rule,
      validator: (
        ruleObj: RuleObject,
        val: StoreValue,
        callback: (error?: string) => void
      ) => {
        let hasReturned = false;
        const result = validator(ruleObj, val, (...args: any[]) => {
          Promise.resolve().then(() => {
            if (process.env.NODE_ENV !== 'production') {
              console.warn(
                !hasReturned,
                'Your validator function has already return a promise. `callback` will be ignored.'
              );
            }
            if (!hasReturned) {
              callback(...args);
            }
          });
        });

        hasReturned =
          result &&
          typeof result.then === 'function' &&
          typeof result.catch === 'function';

        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            hasReturned,
            '`callback` is deprecated. Please return a promise instead.'
          );
        }

        if (hasReturned) {
          result
            .then(() => {
              callback();
            })
            .catch((error: any) => {
              callback(error || ' ');
            });
        }
      }
    };
  });

  let validationPromise: Promise<string[]>;

  if (validateFirst === true) {
    // Serial validation, stop at first error
    validationPromise = new Promise(async (resolve, reject) => {
      for (let i = 0; i < processedRules.length; i++) {
        const errors = await validateField(
          name,
          value,
          processedRules[i],
          options,
          messageVariables
        );
        if (errors.length) {
          reject(errors);
          return;
        }
      }
      resolve([]);
    });
  } else {
    // Parallel or custom validation
    const validations = processedRules.map((rule) =>
      validateField(name, value, rule, options, messageVariables)
    );

    validationPromise = (
      validateFirst
        ? validateSerial(validations)
        : validateParallel(validations)
    ).then((errors) => {
      return errors.length ? Promise.reject(errors) : [];
    });
  }

  return validationPromise.catch((errors) => errors);
}