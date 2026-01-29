import PropTypes from 'prop-types';

export type TransitionType = 'Enter' | 'Leave' | 'Appear';

export interface SimpleTransitionName {
  enter: string;
  leave: string;
  active: string;
}

export interface DetailedTransitionName {
  enter: string;
  enterActive: string;
  leave: string;
  leaveActive: string;
  appear: string;
  appearActive: string;
}

export type TransitionName = string | SimpleTransitionName | DetailedTransitionName;

export const nameShape = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    enter: PropTypes.string,
    leave: PropTypes.string,
    active: PropTypes.string
  }),
  PropTypes.shape({
    enter: PropTypes.string,
    enterActive: PropTypes.string,
    leave: PropTypes.string,
    leaveActive: PropTypes.string,
    appear: PropTypes.string,
    appearActive: PropTypes.string
  })
]);

/**
 * Creates a validator function for transition timeout props
 * @param transitionType - The type of transition (Enter, Leave, or Appear)
 * @returns A prop validator function
 */
export function transitionTimeout(transitionType: TransitionType): (props: Record<string, unknown>) => Error | null {
  const timeoutPropName = `transition${transitionType}Timeout`;
  const transitionPropName = `transition${transitionType}`;

  return function(props: Record<string, unknown>): Error | null {
    if (props[transitionPropName]) {
      if (props[timeoutPropName] == null) {
        return new Error(
          `${timeoutPropName} wasn't supplied to CSSTransitionGroup: this can cause unreliable animations and won't be supported in a future version of React. See https://fb.me/react-animation-transition-group-timeout for more information.`
        );
      }

      if (typeof props[timeoutPropName] !== 'number') {
        return new Error(`${timeoutPropName} must be a number (in milliseconds)`);
      }
    }

    return null;
  };
}