import { Action, ActionCreator } from 'redux';
import { ContentTypes } from './types';
import { AppLocation } from '../../_common/';

const {
    APP_CONTENT_CHANGE_LOCATION,
    APP_CONTENT_ONDROP_REGISTER,
    APP_CONTENT_ONDROP_DEREGISTER
 } = ContentTypes;


export const changeLocation: ActionCreator<ChangeLocationAction> = (appLocation: AppLocation) => ({
    type: APP_CONTENT_CHANGE_LOCATION,
    appLocation
});

export const registerOnDrop: ActionCreator<RegisterOnDropAction> = (onDrop: (e: React.DragEvent<HTMLElement>) => {}) => ({
    type: APP_CONTENT_ONDROP_REGISTER,
    onDrop
});

export const deregisterOnDrop: ActionCreator<DeregisterOnDropAction> = (onDrop: (e: React.DragEvent<HTMLElement>) => {}) => ({
    type: APP_CONTENT_ONDROP_DEREGISTER,
    onDrop
});

export interface ChangeLocationAction extends Action {
    readonly type: string;
    appLocation: AppLocation;
};

export interface RegisterOnDropAction extends Action {
    readonly type: string;
    onDrop
};

export interface DeregisterOnDropAction extends Action {
    readonly type: string;
    onDrop
};

export type ContentActions = ChangeLocationAction |
    RegisterOnDropAction |
    DeregisterOnDropAction;