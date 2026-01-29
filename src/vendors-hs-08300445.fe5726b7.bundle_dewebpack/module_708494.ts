export interface ValidateMessages {
  default?: string;
  required?: string;
  enum?: string;
  whitespace?: string;
  date?: {
    format?: string;
    parse?: string;
    invalid?: string;
  };
  types?: {
    string?: string;
    method?: string;
    array?: string;
    object?: string;
    number?: string;
    date?: string;
    boolean?: string;
    integer?: string;
    float?: string;
    regexp?: string;
    email?: string;
    url?: string;
    hex?: string;
  };
  string?: {
    len?: string;
    min?: string;
    max?: string;
    range?: string;
  };
  number?: {
    len?: string;
    min?: string;
    max?: string;
    range?: string;
  };
  array?: {
    len?: string;
    min?: string;
    max?: string;
    range?: string;
  };
  pattern?: {
    mismatch?: string;
  };
}

const INVALID_TYPE_MESSAGE = "'${name}' is not a valid ${type}";

export const defaultValidateMessages: ValidateMessages = {
  default: "Validation error on field '${name}'",
  required: "'${name}' is required",
  enum: "'${name}' must be one of [${enum}]",
  whitespace: "'${name}' cannot be empty",
  date: {
    format: "'${name}' is invalid for format date",
    parse: "'${name}' could not be parsed as date",
    invalid: "'${name}' is invalid date"
  },
  types: {
    string: INVALID_TYPE_MESSAGE,
    method: INVALID_TYPE_MESSAGE,
    array: INVALID_TYPE_MESSAGE,
    object: INVALID_TYPE_MESSAGE,
    number: INVALID_TYPE_MESSAGE,
    date: INVALID_TYPE_MESSAGE,
    boolean: INVALID_TYPE_MESSAGE,
    integer: INVALID_TYPE_MESSAGE,
    float: INVALID_TYPE_MESSAGE,
    regexp: INVALID_TYPE_MESSAGE,
    email: INVALID_TYPE_MESSAGE,
    url: INVALID_TYPE_MESSAGE,
    hex: INVALID_TYPE_MESSAGE
  },
  string: {
    len: "'${name}' must be exactly ${len} characters",
    min: "'${name}' must be at least ${min} characters",
    max: "'${name}' cannot be longer than ${max} characters",
    range: "'${name}' must be between ${min} and ${max} characters"
  },
  number: {
    len: "'${name}' must equal ${len}",
    min: "'${name}' cannot be less than ${min}",
    max: "'${name}' cannot be greater than ${max}",
    range: "'${name}' must be between ${min} and ${max}"
  },
  array: {
    len: "'${name}' must be exactly ${len} in length",
    min: "'${name}' cannot be less than ${min} in length",
    max: "'${name}' cannot be greater than ${max} in length",
    range: "'${name}' must be between ${min} and ${max} in length"
  },
  pattern: {
    mismatch: "'${name}' does not match pattern ${pattern}"
  }
};