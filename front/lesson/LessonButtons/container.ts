import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as LessonButtons } from './component';
import { ApplicationState } from '@appStore';

import { ILessonCommonState } from '@lessonTypes';

import {
    onPauseLesson,
    onReset,
    onRestartLesson,
    onUnpauseLesson
} from '@lesson/_operations';

import { ILessonComponentState } from '@lesson/LessonComponent/';
import { pausedLessonListener } from '@lesson/LessonComparator/';

import { WithStyles } from '@material-ui/core/styles';

import {
    LessonButtonsState,
    onStartLeaving,
    resetDraggableLessonButtons,
    turnOffDraggableLessonButtons,
    turnOnDraggableLessonButtons
} from './_duck/';

import { LocalizeState } from 'react-localize-redux';

import { mapDispatchToProps as commonMapDispatchToProps } from '@lesson/_shared/';

const mapDispatchToProps = ( dispatch: Dispatch ): LessonButtonsDispatch => ( {
    restartLesson: () => dispatch( onRestartLesson() ),
    resetLesson: () => dispatch( onReset() ),
    turnOnDraggable: () => dispatch( turnOnDraggableLessonButtons() ),
    turnOffDraggable: () => dispatch( turnOffDraggableLessonButtons() ),
    resetLessonButtons: () => dispatch( resetDraggableLessonButtons() ),
    startLeaving: () => dispatch( onStartLeaving() ),
    pauseLesson: () => dispatch( onPauseLesson( pausedLessonListener ) ),
    unpauseLesson: () => dispatch( onUnpauseLesson() )
} );

const mapStateToProps = ( state: ApplicationState ): MapStateToPropsI => ( {
    ...commonMapDispatchToProps( state ),
    ...state.lesson.lessonComponent,
    ...state.lesson.lessonButtons,
    dialogOpened: state.app.dialog.dialogProps.open,
    localize: state.localize
} );

const LessonButtonsContainer = withRouter( connect( mapStateToProps, mapDispatchToProps )( LessonButtons ) );

export default LessonButtonsContainer;

interface MapStateToPropsI extends
ILessonCommonState,
ILessonComponentState,
LessonButtonsState {
    localize: LocalizeState,
    dialogOpened: boolean;
}

export interface LessonButtonsDispatch {
    restartLesson: () => Action;
    resetLesson: () => Action;
    turnOnDraggable: () => Action;
    turnOffDraggable: () => Action;
    resetLessonButtons: () => Action;
    startLeaving: () => Action;
    pauseLesson: () => Action;
    unpauseLesson: () => Action;
}

export interface LessonButtonsProps extends
    MapStateToPropsI,
    LessonButtonsDispatch,
    RouteComponentProps<{}>,
    WithStyles {}
