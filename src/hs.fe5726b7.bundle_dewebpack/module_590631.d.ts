/**
 * Response status code constants
 * Defines all possible status codes for API responses, network operations, and business logic errors
 */

/**
 * Success status code
 */
export const SUCCESS = "SUCCESS";

/**
 * General error - operation failed
 */
export const ERR_FAILED = "FAILED";

/**
 * Network error - network request failed
 */
export const NETWORK_ERR_FAILED = "NETWORK_FAILED";

/**
 * Operation aborted by user or system
 */
export const ABORT = "ABORT";

/**
 * Operation timeout
 */
export const TIMEOUT = "TIMEOUT";

/**
 * External dump service not ready
 */
export const EXTERNAL_DUMP_NOT_READY = "EXTERNAL_DUMP_NOT_READY";

/**
 * Business logic error - system error
 */
export const FAIL_BIZ_SYS_ERROR = "FAIL_BIZ_SYS_ERROR";

/**
 * Business logic error - service invocation failed
 */
export const FAIL_BIZ_INVOKE_SERVICE_ERROR = "FAIL_BIZ_INVOKE_SERVICE_ERROR";

/**
 * Business logic error - invalid user
 */
export const FAIL_BIZ_INVALID_USER = "FAIL_BIZ_INVALID_USER";

/**
 * Business logic error - OSS (Object Storage Service) operation failed
 */
export const FAIL_BIZ_OSS_OPERATE_FAIL = "FAIL_BIZ_OSS_OPERATE_FAIL";

/**
 * Business logic error - general operation failed
 */
export const FAIL_BIZ_OPERATE_FAIL = "FAIL_BIZ_OPERATE_FAIL";

/**
 * Business logic error - requested resource not found
 */
export const FAIL_BIZ_RESOURCE_NOT_FOUND = "FAIL_BIZ_RESOURCE_NOT_FOUND";

/**
 * Business logic error - permission denied
 */
export const FAIL_BIZ_PERMISSION_DENIED = "FAIL_BIZ_PERMISSION_DENIED";

/**
 * Business logic error - request frequency too high (rate limit)
 */
export const FAIL_BIZ_HIGH_FREQUENCY = "FAIL_BIZ_HIGH_FREQUENCY";

/**
 * Business logic error - design size exceeded limit
 */
export const FAIL_BIZ_OVER_DESIGN_SIZE = "FAIL_BIZ_OVER_DESIGN_SIZE";

/**
 * System error - user session expired
 */
export const FAIL_SYS_SESSION_EXPIRED = "FAIL_SYS_SESSION_EXPIRED";

/**
 * System error - authentication token is empty
 */
export const FAIL_SYS_TOKEN_EMPTY = "FAIL_SYS_TOKEN_EMPTY";

/**
 * System error - authentication token is illegal
 */
export const FAIL_SYS_TOKEN_ILLEGAL = "FAIL_SYS_TOKEN_ILLEGAL";

/**
 * System error - authentication token expired
 */
export const FAIL_SYS_TOKEN_EXOIRED = "FAIL_SYS_TOKEN_EXOIRED";

/**
 * System error - illegal access attempt
 */
export const FAIL_SYS_ILLEGAL_ACCESS = "FAIL_SYS_ILLEGAL_ACCESS";

/**
 * System error - HSF (High Speed Framework) service not found
 */
export const FAIL_SYS_HSF_NOTFOUND = "FAIL_SYS_HSF_NOTFOUND";

/**
 * System error - HSF service timeout
 */
export const FAIL_SYS_HSF_TIMEOUT = "FAIL_SYS_HSF_TIMEOUT";

/**
 * System error - HSF service invocation error
 */
export const FAIL_SYS_HSF_INVOKE_ERROR = "FAIL_SYS_HSF_INVOKE_ERROR";

/**
 * System error - HSF service thrown exception
 */
export const FAIL_SYS_HSF_THROWN_EXCEPTION = "FAIL_SYS_HSF_THROWN_EXCEPTION";

/**
 * Status code enumeration type
 * Union type of all possible status code values
 */
export type StatusCode =
  | typeof SUCCESS
  | typeof ERR_FAILED
  | typeof NETWORK_ERR_FAILED
  | typeof ABORT
  | typeof TIMEOUT
  | typeof EXTERNAL_DUMP_NOT_READY
  | typeof FAIL_BIZ_SYS_ERROR
  | typeof FAIL_BIZ_INVOKE_SERVICE_ERROR
  | typeof FAIL_BIZ_INVALID_USER
  | typeof FAIL_BIZ_OSS_OPERATE_FAIL
  | typeof FAIL_BIZ_OPERATE_FAIL
  | typeof FAIL_BIZ_RESOURCE_NOT_FOUND
  | typeof FAIL_BIZ_PERMISSION_DENIED
  | typeof FAIL_BIZ_HIGH_FREQUENCY
  | typeof FAIL_BIZ_OVER_DESIGN_SIZE
  | typeof FAIL_SYS_SESSION_EXPIRED
  | typeof FAIL_SYS_TOKEN_EMPTY
  | typeof FAIL_SYS_TOKEN_ILLEGAL
  | typeof FAIL_SYS_TOKEN_EXOIRED
  | typeof FAIL_SYS_ILLEGAL_ACCESS
  | typeof FAIL_SYS_HSF_NOTFOUND
  | typeof FAIL_SYS_HSF_TIMEOUT
  | typeof FAIL_SYS_HSF_INVOKE_ERROR
  | typeof FAIL_SYS_HSF_THROWN_EXCEPTION;

/**
 * Status codes object interface
 * Read-only object containing all status code constants
 */
export interface StatusCodes {
  readonly SUCCESS: "SUCCESS";
  readonly ERR_FAILED: "FAILED";
  readonly NETWORK_ERR_FAILED: "NETWORK_FAILED";
  readonly ABORT: "ABORT";
  readonly TIMEOUT: "TIMEOUT";
  readonly EXTERNAL_DUMP_NOT_READY: "EXTERNAL_DUMP_NOT_READY";
  readonly FAIL_BIZ_SYS_ERROR: "FAIL_BIZ_SYS_ERROR";
  readonly FAIL_BIZ_INVOKE_SERVICE_ERROR: "FAIL_BIZ_INVOKE_SERVICE_ERROR";
  readonly FAIL_BIZ_INVALID_USER: "FAIL_BIZ_INVALID_USER";
  readonly FAIL_BIZ_OSS_OPERATE_FAIL: "FAIL_BIZ_OSS_OPERATE_FAIL";
  readonly FAIL_BIZ_OPERATE_FAIL: "FAIL_BIZ_OPERATE_FAIL";
  readonly FAIL_BIZ_RESOURCE_NOT_FOUND: "FAIL_BIZ_RESOURCE_NOT_FOUND";
  readonly FAIL_BIZ_PERMISSION_DENIED: "FAIL_BIZ_PERMISSION_DENIED";
  readonly FAIL_BIZ_HIGH_FREQUENCY: "FAIL_BIZ_HIGH_FREQUENCY";
  readonly FAIL_BIZ_OVER_DESIGN_SIZE: "FAIL_BIZ_OVER_DESIGN_SIZE";
  readonly FAIL_SYS_SESSION_EXPIRED: "FAIL_SYS_SESSION_EXPIRED";
  readonly FAIL_SYS_TOKEN_EMPTY: "FAIL_SYS_TOKEN_EMPTY";
  readonly FAIL_SYS_TOKEN_ILLEGAL: "FAIL_SYS_TOKEN_ILLEGAL";
  readonly FAIL_SYS_TOKEN_EXOIRED: "FAIL_SYS_TOKEN_EXOIRED";
  readonly FAIL_SYS_ILLEGAL_ACCESS: "FAIL_SYS_ILLEGAL_ACCESS";
  readonly FAIL_SYS_HSF_NOTFOUND: "FAIL_SYS_HSF_NOTFOUND";
  readonly FAIL_SYS_HSF_TIMEOUT: "FAIL_SYS_HSF_TIMEOUT";
  readonly FAIL_SYS_HSF_INVOKE_ERROR: "FAIL_SYS_HSF_INVOKE_ERROR";
  readonly FAIL_SYS_HSF_THROWN_EXCEPTION: "FAIL_SYS_HSF_THROWN_EXCEPTION";
}

/**
 * Frozen status codes object
 * All status code constants grouped in a single immutable object
 */
declare const StatusCodesObject: Readonly<StatusCodes>;

export default StatusCodesObject;