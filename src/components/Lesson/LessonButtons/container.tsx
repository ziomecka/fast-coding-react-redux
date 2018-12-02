import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as LessonButtons } from './component';
import { ApplicationState } from '../../../store';

import { LessonState } from '../_duck/reducers';
import { LessonButtonsState } from './_duck/reducers';

import { ComponentsContainers, ApplicationContainers } from '../../../_common/';

import { onRestartLesson } from '../_duck/operations';
import { onReset } from '../_duck/operations';

const { components } = ApplicationContainers;
const { lesson, lessonButtons } = ComponentsContainers;

import { WithStyles } from '@material-ui/core/styles';

import {
    turnOnDraggableLessonButtons,
    turnOffDraggableLessonButtons,
    resetDraggableLessonButtons
} from './_duck/actions';

import { onStartLeaving } from './_duck/operations';

import { LocalizeContextProps } from 'react-localize-redux';

const mapDispatchToProps = (dispatch: Dispatch): LessonButtonsDispatch => ({
    restartLesson: () => dispatch(onRestartLesson()),
    resetLesson: () => dispatch(onReset()),
    turnOnDraggable: () => dispatch(turnOnDraggableLessonButtons()),
    turnOffDraggable: () => dispatch(turnOffDraggableLessonButtons()),
    resetLessonButtons: () => dispatch(resetDraggableLessonButtons()),
    startLeaving: () => dispatch(onStartLeaving())
});

const mapStateToProps = (state: ApplicationState): LessonState & LessonButtonsState => ({
    ...state[components][lesson],
    ...state[components][lessonButtons],
    ...state.localize
});

const LessonButtonsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LessonButtons));

export default LessonButtonsContainer;

export interface LessonButtonsDispatch {
    restartLesson: () => void;
    resetLesson: () => void;
    turnOnDraggable: () => void;
    turnOffDraggable: () => void;
    resetLessonButtons: () => void;
    startLeaving: () => void;
};

export interface LessonButtonsProps extends
    LessonState,
    LessonButtonsState,
    LessonButtonsDispatch,
    RouteComponentProps<{}>,
    WithStyles,
    LocalizeContextProps {};