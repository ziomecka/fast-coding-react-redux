import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as LessonButtons } from './component';
import { ApplicationState } from '@appStore';

import { LessonState } from '../_duck/reducers';
import { LessonButtonsState } from './_duck/reducers';

import { AppContainersEnum } from '@appTypes';
import { ComponentsContainersEnum } from '@componentsTypes';
import { ApplicationContainersEnum } from '@applicationTypes';

import { unpauseLessonOnJustType } from '../Comparator/_duck/operations/life';
import { onRestartLesson, onPauseLesson, onUnpauseLesson, onReset } from '../_duck/operations/life';

const { components, app } = ApplicationContainersEnum;
const { lesson, lessonButtons } = ComponentsContainersEnum;
const { dialog } = AppContainersEnum;

import { WithStyles } from '@material-ui/core/styles';

import {
    turnOnDraggableLessonButtons,
    turnOffDraggableLessonButtons,
    resetDraggableLessonButtons
} from './_duck/actions';

import { onStartLeaving } from './_duck/operations';

import { LocalizeState } from 'react-localize-redux';

const mapDispatchToProps = (dispatch: Dispatch): LessonButtonsDispatch => ({
    restartLesson: () => dispatch(onRestartLesson()),
    resetLesson: () => dispatch(onReset()),
    turnOnDraggable: () => dispatch(turnOnDraggableLessonButtons()),
    turnOffDraggable: () => dispatch(turnOffDraggableLessonButtons()),
    resetLessonButtons: () => dispatch(resetDraggableLessonButtons()),
    startLeaving: () => dispatch(onStartLeaving()),
    pauseLesson: () => dispatch(onPauseLesson(unpauseLessonOnJustType)),
    unpauseLesson: () => dispatch(onUnpauseLesson())
});

const mapStateToProps = (state: ApplicationState): MapStateToPropsI => ({
    ...state[components][lesson],
    ...state[components][lessonButtons],
    dialogOpened: state[app][dialog].dialogProps.open,
    localize: state.localize
});

const LessonButtonsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LessonButtons));

export default LessonButtonsContainer;

interface MapStateToPropsI extends LessonState, LessonButtonsState {
    localize: LocalizeState,
    dialogOpened: boolean;
};

export interface LessonButtonsDispatch {
    restartLesson: () => Action;
    resetLesson: () => Action;
    turnOnDraggable: () => Action;
    turnOffDraggable: () => Action;
    resetLessonButtons: () => Action;
    startLeaving: () => Action;
    pauseLesson: () => Action;
    unpauseLesson: () => Action;
};

export interface LessonButtonsProps extends
    MapStateToPropsI,
    LessonButtonsDispatch,
    RouteComponentProps<{}>,
    WithStyles {};