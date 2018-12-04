import { Dispatch } from 'redux';
import { ApplicationState } from '../../../../../_reducers';

import { ApplicationContainers, ComponentsContainers, LocalStorageItemTypes } from '../../../../../_common/';

const { components } = ApplicationContainers;
const { comparator } = ComponentsContainers;

import { restoreState } from '../actions';
import { ComparatorState } from '../reducers';

import { localStorageSetItem, localStorageGetItem } from '../../../../../app/LocalStorage/_duck/operations';

export const onKeepState = (): any => (dispatch: Dispatch, getState: () => ApplicationState) => {
    localStorageSetItem(LocalStorageItemTypes.comparator, getState()[components][comparator])
};

export const onRestoreState = (): any => async (dispatch: Dispatch, getState: () => ApplicationState) => {
    let data = localStorageGetItem(LocalStorageItemTypes.comparator);

    if (data) {
        let answer = await dispatch((restoreState(data as ComparatorState)));
        if (answer) {
            data = null;
            answer = null;
        }
    }
};

export default {
    onKeepState,
    onRestoreState
};