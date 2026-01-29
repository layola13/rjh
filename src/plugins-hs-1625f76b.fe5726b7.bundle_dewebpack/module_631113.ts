import { handleActions } from 'redux-actions';
import { fromJS, List } from 'immutable';
import actionTypes from './actionTypes';

interface CollectProductsSucceededPayload {
  payload: unknown;
}

type ProductsState = List<unknown>;

const productsReducer = handleActions<ProductsState, CollectProductsSucceededPayload>(
  {
    [actionTypes.COLLECT_PRODUCTS_SUCCEEDED]: (
      state: ProductsState,
      action: CollectProductsSucceededPayload
    ): ProductsState => {
      const { payload } = action;
      return fromJS(payload) as ProductsState;
    }
  },
  new List()
);

export default productsReducer;