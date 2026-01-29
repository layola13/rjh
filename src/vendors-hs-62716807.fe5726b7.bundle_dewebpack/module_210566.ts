import warning from '../warning';

interface SuccessConfig {
  progress?: number;
  percent?: number;
}

interface ProgressProps {
  success?: SuccessConfig;
  successPercent?: number;
}

/**
 * Get the success percent value from props
 * Handles legacy `success.progress` property with deprecation warning
 */
export function getSuccessPercent(props: ProgressProps): number | undefined {
  const { success, successPercent } = props;
  let percent = successPercent;

  if (success && 'progress' in success) {
    warning(
      false,
      'Progress',
      '`success.progress` is deprecated. Please use `success.percent` instead.'
    );
    percent = success.progress;
  }

  if (success && 'percent' in success) {
    percent = success.percent;
  }

  return percent;
}

/**
 * Validate and clamp progress value to valid range [0, 100]
 */
export function validProgress(value: number | undefined): number {
  if (!value || value < 0) {
    return 0;
  }

  if (value > 100) {
    return 100;
  }

  return value;
}