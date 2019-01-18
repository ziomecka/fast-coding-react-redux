import { Reducer } from 'redux';

import { LessonComparatorActions, RestoreStateAction } from './actions';

import { LessonComparatorActionsEnum } from './types';

const {
    COMPONENTS_LESSON_COMPARATOR_REGISTER_NEW_KEY,
    COMPONENTS_LESSON_COMPARATOR_REGISTER_ERROR,
    COMPONENTS_LESSON_COMPARATOR_REGISTER_BACKSPACE,
    COMPONENTS_LESSON_COMPARATOR_CORRECT_ERROR,
    COMPONENTS_LESSON_COMPARATOR_RESET,
    COMPONENTS_LESSON_COMPARATOR_RESTORE_STATE
} = LessonComparatorActionsEnum;

/**
 * @param errors - Errors that are still not corrected
 * @param allErrors - All errors that were made, no matter if corrected
 */
export const INITIAL_STATE: LessonComparatorState = {
    currentSignIndex: -1,
    errors: [],
    allErrors: [],
    correctedErrors: [],
};

const reducer: Reducer<LessonComparatorState, LessonComparatorActions> = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case COMPONENTS_LESSON_COMPARATOR_REGISTER_NEW_KEY: {
            return {
                ...state,
                // @ts-ignore
                currentSignIndex: action.currentSignIndex
            };
        }

        case COMPONENTS_LESSON_COMPARATOR_REGISTER_ERROR: {
            return {
                ...state,
                // @ts-ignore
                errors: [ ...action.errors ],
                // @ts-ignore
                allErrors: [ ...action.allErrors ],
                // @ts-ignore
                currentSignIndex: action.currentSignIndex
            };
        }

        case COMPONENTS_LESSON_COMPARATOR_REGISTER_BACKSPACE: {
            return {
                ...state,
                currentSignIndex: Math.max( -1, state.currentSignIndex - 1 )
            };
        }

        case COMPONENTS_LESSON_COMPARATOR_CORRECT_ERROR: {
            return {
                ...state,
                errors: [ ...state.errors.slice( 0, state.errors.length - 1 ) ],
                // @ts-ignore
                correctedErrors: [ ...action.correctedErrors ],
                currentSignIndex: state.currentSignIndex - 1
            };
        }

        case COMPONENTS_LESSON_COMPARATOR_RESET: {
            return {
                ...state,
                errors: [],
                allErrors: [],
                correctedErrors: [],
                currentSignIndex: -1
            };
        }

        case COMPONENTS_LESSON_COMPARATOR_RESTORE_STATE: {
            return {
                ...state,
                ...( action as RestoreStateAction ).state
            };
        }

        default: {
            return { ...state };
        }
    }
};

export { reducer as lessonComparatorReducer };

export interface LessonComparatorState {
    currentSignIndex: number;
    errors: number[];
    allErrors: number[];
    correctedErrors: number[];
}