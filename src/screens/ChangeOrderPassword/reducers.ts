import { IAction } from 'interfaces/common';

export const ACCOUNT_CHANGE_ORDER_PASSWORD_SUCCESS = 'ACCOUNT_CHANGE_ORDER_PASSWORD_SUCCESS';
export const ACCOUNT_CHANGE_ORDER_PASSWORD_FAILED = 'ACCOUNT_CHANGE_ORDER_PASSWORD_FAILED';

export function OrderPassword(state: { success: boolean } | null = null, action: IAction<null>) {
  switch (action.type) {
    case ACCOUNT_CHANGE_ORDER_PASSWORD_SUCCESS:
      return {
        success: true,
      };
    default:
      return state;
  }
}
