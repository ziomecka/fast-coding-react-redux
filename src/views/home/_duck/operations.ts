import { manageButtonFocus as buttonFocus } from '../../../shared/button.focus';
import { addKeyDownListener, removeKeyDownListener } from '../../../shared/keydown.listener';
import history from '../../../shared/history';
import { AppRoutes } from '../../../_common/';
const { lessons } = AppRoutes;

export const buttonsIds = [ 'homeSeeLessons', 'homeStartTyping' ];

const manageButtonFocus = buttonFocus(buttonsIds, 1);

const manageFocus = (e: KeyboardEvent): void => manageButtonFocus(e);

/** If code other than tab or return then move to lessons */
const moveToLessons = (e: KeyboardEvent): void => {
    const { keyCode } = e;
    if (keyCode !== 9 && keyCode !== 13) {
        history.push(lessons);
    }
};

export const onAddKeyDownListener = () => {
    addKeyDownListener(manageFocus);
    addKeyDownListener(moveToLessons);
};

export const onRemoveKeyDownListener = () => {
    removeKeyDownListener(manageFocus);
    removeKeyDownListener(moveToLessons);
};
