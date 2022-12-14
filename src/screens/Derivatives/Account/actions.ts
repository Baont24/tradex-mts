import { DERIVATIVES_ACCOUNT_QUERY_CASH_BALANCE } from 'redux-sagas/actions';
import {
  DERIVATIVES_ACCOUNT_QUERY_CASH_BALANCE_FAILED,
  DERIVATIVES_ACCOUNT_QUERY_CASH_BALANCE_SUCCESS,
} from './reducers';

export const queryAccountCashBalance = () => ({
  type: DERIVATIVES_ACCOUNT_QUERY_CASH_BALANCE,
  response: {
    success: DERIVATIVES_ACCOUNT_QUERY_CASH_BALANCE_SUCCESS,
    failure: DERIVATIVES_ACCOUNT_QUERY_CASH_BALANCE_FAILED,
  },
});
