import { call, put, takeLatest } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import store from 'redux-sagas/store';
import { IObject, IRequest } from 'interfaces/common';
import { DERIVATIVES_ACCOUNT_QUERY_CUMULATIVE_PROFIT_LOSS } from 'redux-sagas/actions';

const queryCumulativeProfitLoss = (params: IObject) => {
  const uri = 'derivatives/account/profitLoss/cumulative';
  return query(global.domainSocket, uri, METHOD.GET, params);
};

function* doQueryCumulativeProfitLoss(request: IRequest<IObject>) {
  try {
    if (request.payload.loadMore === true) {
      request.payload.lastNextKey = store.getState().derivativesCumulativeProfitLoss!.lastNextKey;
    }

    request.payload.accountNumber = store.getState().selectedAccount!.accountNumber;

    const response = yield call(queryCumulativeProfitLoss, request.payload);
    let lastNextKey = null;

    if (response.data && response.data.profitLossItems && response.data.profitLossItems.length > 0) {
      lastNextKey = response.data.profitLossItems[response.data.profitLossItems.length - 1].nextKey;
    }

    if (request.payload.loadMore === true) {
      yield put({
        type: request.response.success,
        payload: {
          summary: store.getState().derivativesCumulativeProfitLoss!.cumulativeData,
          nextData: response.data.profitLossItems,
          next: true,
          lastNextKey,
        },
      });
    } else {
      const { profitLossItems, ...summary } = response.data;

      yield put({
        type: request.response.success,
        payload: {
          summary,
          data: response.data.profitLossItems,
          next: false,
          lastNextKey,
        },
      });
    }
  } catch (err) {
    if (request.response.failure) {
      yield put({
        type: request.response.failure,
      });
    }
  }
}

export default function* watchQueryCumulativeProfitLoss() {
  yield takeLatest(DERIVATIVES_ACCOUNT_QUERY_CUMULATIVE_PROFIT_LOSS, doQueryCumulativeProfitLoss);
}
