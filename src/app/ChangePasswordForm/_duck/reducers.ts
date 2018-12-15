import { Reducer } from 'redux';

import { ChangePasswordFormTypes } from './types';
import { PasswordTypes } from '../../Password/_duck/types';

import {
    passwordReducer, PasswordState, INITIAL_STATE as PasswordInitialState
} from '../../Password/_duck/reducers';

import { PasswordTypes as _PasswordTypes } from '../../_common/';

import { ChangePasswordFormActions } from './actions';

const { confirmPass, newPass, currentPass } = _PasswordTypes;

const {
    APP_PASSWORD_SET_PASSWORD_CURRENT,
    APP_PASSWORD_SET_PASSWORD_CONFIRM,
    APP_PASSWORD_SET_PASSWORD_NEW,
    APP_PASSWORD_VALIDATE_CURRENT,
    APP_PASSWORD_VALIDATE_NEW,
    APP_PASSWORD_VALIDATE_CONFIRM
} = PasswordTypes;

const {
    APP_CHANGEPASSWORDFORM_RESET
} = ChangePasswordFormTypes;

export const INITIAL_STATE: ChangePasswordFormState = {
    [currentPass]: Object.assign({}, PasswordInitialState),
    [newPass]: Object.assign({}, PasswordInitialState),
    [confirmPass]: Object.assign({}, PasswordInitialState),
};

const reducer: Reducer<ChangePasswordFormState, ChangePasswordFormActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_PASSWORD_VALIDATE_NEW:
        case APP_PASSWORD_SET_PASSWORD_NEW: {
            const { password, passwordValid } = state[newPass];
            return {
                ...state,
                [newPass]: passwordReducer({ password, passwordValid }, action)
            };
        }

        case APP_PASSWORD_VALIDATE_CONFIRM:
        case APP_PASSWORD_SET_PASSWORD_CONFIRM: {
            const { password, passwordValid } = state[confirmPass];
            return {
                ...state,
                [confirmPass]: passwordReducer({ password, passwordValid }, action)
            };
        }

        case APP_PASSWORD_VALIDATE_CURRENT:
        case APP_PASSWORD_SET_PASSWORD_CURRENT: {
            const { password, passwordValid } = state[currentPass];
            return {
                ...state,
                [currentPass]: passwordReducer({ password, passwordValid }, action)
            };
        }

        case APP_CHANGEPASSWORDFORM_RESET: {
            return {
                [currentPass]: Object.assign({}, PasswordInitialState),
                [newPass]: Object.assign({}, PasswordInitialState),
                [confirmPass]: Object.assign({}, PasswordInitialState)
            };
        }

        default: {
            return { ...state };
        }
    }
}

export { reducer as changePasswordFormReducer };

export interface ChangePasswordFormState {
    [currentPass]: PasswordState;
    [newPass]: PasswordState;
    [confirmPass]: PasswordState;
};