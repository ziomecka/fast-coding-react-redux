import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as RemindPasswordForm } from './component';
import { ApplicationState } from '@appStore';

import { RemindPasswordState } from './_duck/reducers';

import { reset, setEmail, SetEmailAction, SetEmail } from './_duck/actions';
import { SendFormRemindPasswordI } from './_duck/types';

import { onSendForm } from './_duck/operations';
import { onFormInvalid } from '@appForm/_duck/operations';

import { WithStyles } from '@material-ui/core/styles';

import { mapDispatchToProps as mapDialogDispatchToProps, DialogDispatch } from '@shared/dialog';

import { IWithMedia } from '@app/Media/';

const mapStateToProps = ( state: ApplicationState ): RemindPasswordState => ( {
    ...state.app.remindPasswordForm
} );

const mapDispatchToProps = ( dispatch: Dispatch ): RemindPasswordDispatch => ( {
    sendForm: ( options ) => dispatch( onSendForm( options ) ),
    setEmail: ( options ) => dispatch( setEmail( options ) ),
    reset: () => dispatch( reset() ),
    formInvalid: () => dispatch( onFormInvalid() ),
    ...mapDialogDispatchToProps( dispatch )
} );

// @ts-ignore
const LabelContainer = withRouter( connect( mapStateToProps, mapDispatchToProps )( RemindPasswordForm ) );

export default LabelContainer;

export interface RemindPasswordDispatch extends DialogDispatch {
    sendForm: ( options: SendFormRemindPasswordI ) => Action;
    setEmail: ( options: SetEmail ) => SetEmailAction;
    reset: () => Action;
    formInvalid: () => Action;
}

export interface RemindPasswordPropsI extends
    RemindPasswordDispatch,
    RemindPasswordState,
    WithStyles,
    IWithMedia,
    RouteComponentProps {}
