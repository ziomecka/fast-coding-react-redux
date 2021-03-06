import { AppContainersEnum, MenuContainersEnum } from '@appTypes';
import { ViewsContainersEnum } from '@viewsTypes';
import { CoursesContainersEnum } from '@coursesTypes';
import { LessonContainersEnum } from '@lessonTypes';

// TODO out not needed?
export enum KeyboardListenerActionsEnum {
    APP_KEYBOARD_LISTENER_ADD = '@@app_keyboardListener/ADD',
    APP_KEYBOARD_LISTENER_REMOVE = '@@app_keyboardListener/REMOVE',
    APP_KEYBOARD_LISTENER_REMOVE_ALL = '@@app_keyboardListener/REMOVE_ALL'
}

export type KeyboardListenerContainersType =
    LessonContainersEnum.lessonComparator |
    LessonContainersEnum.lessonComponent |
    CoursesContainersEnum.coursesStepper |
    ViewsContainersEnum.homeView |
    AppContainersEnum.dialog |
    AppContainersEnum.welcome |
    MenuContainersEnum.languagesMenu |
    MenuContainersEnum.mainMenu |
    MenuContainersEnum.userMenu;

export type ListenerType = [ string, EventListener ];

export type KeyboardListenerContainerListenersType = Map< number, ListenerType >;

export type KeyboardListenerListenersType =
    Map< KeyboardListenerContainersType, [ KeyboardListenerContainerListenersType, number] >;

export interface AddListener {
    container: KeyboardListenerContainersType;
    listener: ListenerType;
}

export interface RemoveListener {
    container: KeyboardListenerContainersType;
    listenerId: number;
}

export interface RemoveAllListeners {
    container: KeyboardListenerContainersType;
}
