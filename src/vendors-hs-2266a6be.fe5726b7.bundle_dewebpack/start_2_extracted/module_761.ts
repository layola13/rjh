import validators from './224';

type ValidationResult = {
  error?: boolean;
};

type ValidatorField = {
  field: string | string[];
  check: (value: unknown) => ValidationResult | undefined;
};

type ValidationTarget = {
  exceptionDescription?: string[];
  [key: string]: unknown;
};

class Validator {
  private baseValidator: ValidatorField[];

  constructor(baseValidator: ValidatorField[]) {
    this.baseValidator = baseValidator;
  }

  validate(additionalValidators: ValidatorField[] = [], target: ValidationTarget): void {
    const allValidators = [...this.baseValidator, ...additionalValidators];
    
    allValidators.forEach((validator) => {
      const { field } = validator;
      const value = this.getKeyValue(target, field);
      const result = validator.check(value);
      
      if (result?.error) {
        target.exceptionDescription = target.exceptionDescription || [];
        target.exceptionDescription.push(String(field));
      }
    });
  }

  private getKeyValue(target: Record<string, unknown>, field: string | string[]): unknown {
    let fieldPath: string[];
    
    if (typeof field === 'string') {
      fieldPath = field.split('.');
    } else {
      fieldPath = field;
    }

    let current: unknown = target;
    
    for (const key of fieldPath) {
      if (!current || typeof current !== 'object' || !(key in current)) {
        return undefined;
      }
      current = (current as Record<string, unknown>)[key];
    }
    
    return current;
  }
}

const collectedValidators: ValidatorField[] = [];

for (const key in validators) {
  const validatorModule = validators[key];
  
  if (validatorModule.getVaildator) {
    const moduleValidators = validatorModule.getVaildator();
    collectedValidators.push(...moduleValidators);
  }
}

export default new Validator(collectedValidators);