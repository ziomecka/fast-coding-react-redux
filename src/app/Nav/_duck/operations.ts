import { Dispatch, Action } from 'redux';

import { unauthorizeUser } from '@app/User/_duck/actions';
import { onOpenNotification } from '@app/Notification/_duck/operations';

import { AppRoutesEnum } from '@appTypes';
import history from '@shared/history';

const { lessons } = AppRoutesEnum;

export const onLogOut = (): any => (
    async ( dispatch: Dispatch ): Promise<Action> => {
        let response = await dispatch( unauthorizeUser() );

        // TODO if not try catch?
        /** redirect to lessons and notify about success */
        if ( response ) {
            response = null;
            history.push( lessons );
            return dispatch( onOpenNotification( { text: 'notificationSignOutSuccess' } ) );
        }
} );

export default {
    onLogOut
};
