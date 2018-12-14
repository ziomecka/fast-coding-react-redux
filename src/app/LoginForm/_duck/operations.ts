import { Dispatch, Action } from 'redux';

import { post as postData } from '../../api';

import { AppRoutes, ThunkGetStateType } from '../../../_common/';
import { LoginFormResponseEnum } from './types';

const { SUCCESS } = LoginFormResponseEnum;

const { loginLog, lessons } = AppRoutes;

import { setFormHelperText } from '../../FormHelperText/_duck/actions';
import { authorizeUser } from  '../../User/_duck/actions';
import history from '../../../shared/history';

import { onOpenNotification } from '../../Notification/_duck/operations';
import getTranslation from '../../../shared/get.translation';

export const onLog = (login, password): any => async (dispatch: Dispatch, getState: ThunkGetStateType  ): Promise<Action> => {
    /** removes formInvalid message */
    dispatch(setFormHelperText('formBeingSent'));

    const response = await postData({path: loginLog, body: { login, password }});
    // @ts-ignore
    const { result } = JSON.parse(response || null);

    if (result === SUCCESS) {
        dispatch(authorizeUser(login));
        history.push(lessons);
        return dispatch(onOpenNotification(getTranslation(getState().localize, 'notificationAuthorized')));
    }

    return dispatch(setFormHelperText(LoginFormResponseEnum[result]));

};

export default {
    onLog
};