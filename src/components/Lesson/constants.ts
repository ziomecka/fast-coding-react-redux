import { LanguagesEnum } from '@applicationTypes';
const { pl, en } = LanguagesEnum;

export const LESSON_DEMO_TEXT = {
    [pl]: 'To jest lekcja pokazowa. ' +
    'Jeśli nigdy nie ćwiczyłeś bezwzrokowego pisania na klawiaturze, ' +
    'to może być Ci trudno osiągnąć zadowalający czas i dokładność. ' +
    'Jeśli zdecydujesz się robić małe, proste ćwiczenia każdego dnia, będziesz osiągać coraz lepsze wyniki. ' +
    'Zobacz jak Ci poszło teraz.',
    [en]: 'This is a demonstration lesson. ' +
    'If you\'ve never practiced touch typing, ' +
    'you may find it difficult to achieve satisfactory time and accuracy. ' +
    'If you decide to do small, simple excercise each day, you will achieve better and better results. ' +
    'Now look how you made it.'
};

export const LESSON_DEMO_TITLE = {
    [pl]: 'Lekcja pokazowa',
    [en]: 'Demonstration lesson'
};

export const LESSON_TIME_INTERVAL = 500;