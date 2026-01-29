import validators from './224';

type ValidationField = string | string[];

interface ValidationRule {
  field: ValidationField;
  check: (value: unknown) => ValidationResult | undefined;
}

interface ValidationResult {
  error: boolean;
}

interface ValidatableData {
  exceptionDescription?: string[];
  [key: string]: unknown;
}

interface ValidatorModule {
  getVaildator?: () => ValidationRule[];
  [key: string]: unknown;
}

class Validator {
  private readonly baseValidator: ValidationRule[];

  constructor(baseValidator: ValidationRule[]) {
    this.baseValidator = baseValidator;
  }

  /**
   * Validates data against base and custom validation rules
   * @param customRules - Additional validation rules to apply
   * @param data - Data object to validate
   */
  validate(customRules: ValidationRule[], data: ValidatableData): void {
    const rules = customRules ?? [];
    const allRules = [...this.baseValidator, ...rules];

    allRules.forEach((rule) => {
      const { field } = rule;
      const value = this.getKeyValue(data, field);
      const result = rule.check(value);

      if (result?.error) {
        data.exceptionDescription = data.exceptionDescription ?? [];
        data.exceptionDescription.push(String(field));
      }
    });
  }

  /**
   * Retrieves nested property value from object using field path
   * @param target - Object to traverse
   * @param field - Property path (string or array of strings)
   * @returns Value at the specified path or undefined
   */
  private getKeyValue(target: Record<string, unknown>, field: ValidationField): unknown {
    let fieldPath = field;

    if (typeof field === 'string') {
      fieldPath = field.split('.');
    }

    const pathArray = fieldPath as string[];
    let current: unknown = target;

    for (let i = 0; i < pathArray.length; i++) {
      const key = pathArray[i];
      
      if (!current || typeof current !== 'object' || !(key in current)) {
        return undefined;
      }
      
      current = (current as Record<string, unknown>)[key];
    }

    return current;
  }
}

const baseValidationRules: ValidationRule[] = [];

for (const key in validators) {
  const validatorModule = validators[key] as ValidatorModule;
  
  if (validatorModule.getVaildator) {
    baseValidationRules.push(...validatorModule.getVaildator());
  }
}

export default new Validator(baseValidationRules);