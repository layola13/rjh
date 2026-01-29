import { CommandType } from './HSFPConstants';
import AssignOpeningToHostModule from './module_901793';

interface AddProductParams {
  [key: string]: unknown;
}

interface CommandAction<T = unknown> {
  type: string;
  params: T;
}

type ActionCreator = (params: unknown) => CommandAction;
type ActionCreators = [ActionCreator, ActionCreator];
type DestructuredValues = [unknown, unknown, unknown, unknown];

/**
 * Creates action creators and returns destructured values
 * @param inputValue - Input value to be destructured
 * @returns Tuple containing action creators array and destructured values array
 */
export default function createActionsAndValues(
  inputValue: unknown
): [ActionCreators, DestructuredValues] {
  const [firstValue, secondValue, thirdValue, fourthValue, fifthValue] = inputValue as [
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown
  ];

  const addProductAction = (params: AddProductParams): CommandAction<AddProductParams> => {
    return {
      type: CommandType.AddProduct,
      params
    };
  };

  const assignOpeningToHostAction = (hostParam: unknown): CommandAction<[unknown, unknown]> => {
    return {
      type: AssignOpeningToHostModule.AssignOpeningToHost,
      params: [hostParam, fifthValue]
    };
  };

  return [
    [addProductAction, assignOpeningToHostAction],
    [firstValue, secondValue, thirdValue, fourthValue]
  ];
}