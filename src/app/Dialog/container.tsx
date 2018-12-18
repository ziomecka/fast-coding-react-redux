import { connect } from 'react-redux';

import { default as Dialog } from './component';
import { ApplicationState } from '../../store';

import { DialogState } from './_duck/reducers';

import { ApplicationContainers, AppContainersEnum } from '@appTypes';

const { app } = ApplicationContainers;
const { dialog } = AppContainersEnum;

const mapStateToProps = (state: ApplicationState): DialogState => ({
    ...state[app][dialog]
});

const DialogContainer = connect(mapStateToProps)(Dialog);

export default DialogContainer;

export interface AppDialogProps extends DialogState {};