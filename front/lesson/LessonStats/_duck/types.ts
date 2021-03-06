export enum LessonStatsActionsEnum {
    LESSON_LESSON_STATS_TIMER_START = '@@lesson_stats/TIMER_START',
    LESSON_LESSON_STATS_TIMER_STOP = '@@lesson_stats/TIMER_STOP',
    LESSON_LESSON_STATS_PAUSE = '@@lesson_stats/PAUSE',
    LESSON_LESSON_STATS_UNPAUSE = '@@lesson_stats/UNPAUSE',
}

export enum LessonStatsTimeUnitsEnum {
    Seconds = 'Seconds',
    Minutes = 'Minutes',
    Hours = 'Hours'
}

export interface LessonStatsState {
    running: boolean;
    start: number;
    stop: number;
    time: number;
}
