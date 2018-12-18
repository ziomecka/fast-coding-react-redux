import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as NewUserForm } from './component';
import { ApplicationState } from '../../store';

import { NewUserFormState } from './_duck/reducers';

import { ApplicationContainers, AppContainersEnum } from '@appTypes';
import { onSendNewUserForm } from './_duck/operations';
import { onFormInvalid } from '../Form/_duck/operations';

import { setEmail, SetEmailAction, setLogin, SetLoginAction, reset } from './_duck/actions';

const { app } = ApplicationContainers;
const { newUserForm } = AppContainersEnum;

const mapStateToProps = (state: ApplicationState): NewUserFormState => ({
    ...state[app][newUserForm]
});

const mapDispatchToProps = (dispatch: Dispatch): NewUserFormDispatch => ({
    sendNewUserForm: (login, password, email) => dispatch(onSendNewUserForm(login, password, email)),
    setEmail: (email) => dispatch(setEmail(email)),
    setLogin: (login) => dispatch(setLogin(login)),
    reset: () => dispatch(reset()),
    formInvalid: () => dispatch(onFormInvalid())
});

const NewUserFormContainer = connect(mapStateToProps, mapDispatchToProps)(NewUserForm);

export default NewUserFormContainer;

export interface NewUserFormDispatch {
    sendNewUserForm: (login: string, password: string, email: string) => Action;
    setEmail: (email: string) => SetEmailAction;
    setLogin: (login: string) => SetLoginAction;
    reset: () => Action;
    formInvalid: () => Action;
};

export interface NewUserFormProps extends NewUserFormDispatch, NewUserFormState {};