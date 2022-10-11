import { IObject } from 'interfaces/common';
import {
  DERIVATIVES_TRANSFER_QUERY_TRANSFER_IM_BANK,
  DERIVATIVES_TRANSFER_QUERY_TRANSFER_IM_FEE,
  DERIVATIVES_TRANSFER_QUERY_DEPOSIT_IM_INFO,
  DERIVATIVES_TRANSFER_DEPOSIT_IM_REQUEST,
} from 'redux-sagas/actions';
import {
  DEPOSIT_IM_QUERY_DERIVATIVES_DEPOSIT_INFO_FAILED,
  DEPOSIT_IM_QUERY_DERIVATIVES_DEPOSIT_INFO_SUCCESS,
  DEPOSIT_IM_QUERY_SOURCE_BANK_FAILED,
  DEPOSIT_IM_QUERY_SOURCE_BANK_SUCCESS,
  DEPOSIT_IM_QUERY_TARGET_BANK_FAILED,
  DEPOSIT_IM_QUERY_TARGET_BANK_SUCCESS,
  DEPOSIT_IM_REQUEST_FAILED,
  DEPOSIT_IM_REQUEST_SUCCESS,
  DEPOSIT_IM_QUERY_DERIVATIVES_FEE_SUCCESS,
  DEPOSIT_IM_QUERY_DERIVATIVES_FEE_FAILED,
} from './reducers';

export const queryDerivativesDepositIMInfo = () => ({
  type: DERIVATIVES_TRANSFER_QUERY_DEPOSIT_IM_INFO,
  response: {
    success: DEPOSIT_IM_QUERY_DERIVATIVES_DEPOSIT_INFO_SUCCESS,
    failure: DEPOSIT_IM_QUERY_DERIVATIVES_DEPOSIT_INFO_FAILED,
  },
});

export const queryDepositIMSourceBank = (payload: IObject) => ({
  type: DERIVATIVES_TRANSFER_QUERY_TRANSFER_IM_BANK,
  response: {
    success: DEPOSIT_IM_QUERY_SOURCE_BANK_SUCCESS,
    failure: DEPOSIT_IM_QUERY_SOURCE_BANK_FAILED,
  },
  payload,
});

export const queryDepositIMTargetBank = (payload: IObject) => ({
  type: DERIVATIVES_TRANSFER_QUERY_TRANSFER_IM_BANK,
  response: {
    success: DEPOSIT_IM_QUERY_TARGET_BANK_SUCCESS,
    failure: DEPOSIT_IM_QUERY_TARGET_BANK_FAILED,
  },
  payload,
});

export const queryDerivativesDepositIMFee = (payload: IObject) => ({
  type: DERIVATIVES_TRANSFER_QUERY_TRANSFER_IM_FEE,
  response: {
    success: DEPOSIT_IM_QUERY_DERIVATIVES_FEE_SUCCESS,
    failure: DEPOSIT_IM_QUERY_DERIVATIVES_FEE_FAILED,
  },
  payload,
});

export const requestDepositIM = (payload: IObject) => ({
  type: DERIVATIVES_TRANSFER_DEPOSIT_IM_REQUEST,
  response: {
    success: DEPOSIT_IM_REQUEST_SUCCESS,
    failure: DEPOSIT_IM_REQUEST_FAILED,
  },
  payload,
  showLoading: true,
});
