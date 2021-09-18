import { GAME_MODES } from './constants';

export default class GameState {
    private static instance: GameState;

    // Global game variables

    wordsOnScreen: number = 8;

    words: HTMLElement[] | undefined = [];

    activeWord: HTMLElement | null = null;

    nextWordIndex: number | undefined;

    normalWordsCaptured: number = 0;

    highlightColor: string = '#d3e0ea';

    highlightedIndex: number | null = null;

    typedletters: number = 0;

    errors: number = 0;

    typingStart: Date | undefined;

    typingEnd: Date | undefined;

    wpm = 0;

    score = 0;

    activeKey: Element | null = null;

    paused = false;

    showKeyboard = true;

    // eslint-disable-next-line no-undef
    timerInterval: number | NodeJS.Timeout = null;

    // eslint-disable-next-line no-undef
    wordRemover: number | NodeJS.Timeout = null;

    // eslint-disable-next-line no-undef
    wordAdder: number | NodeJS.Timeout = null;

    time: string | undefined;

    container: HTMLDivElement | null = document.querySelector('.main-container');

    mainTextContainer: HTMLDivElement | null = document.querySelector('.main-text-container');

    scoreContainer: HTMLDivElement | null = document.querySelector('.score');

    // eslint-disable-next-line no-undef
    gameModes: NodeListOf<HTMLDivElement> = document.querySelectorAll('.settings-content-text');

    wpmOverlay: HTMLDivElement | null = document.querySelector('.wpm-overlay');

    scoreOverlay: HTMLDivElement | null = document.querySelector('.score-display');

    resetGame: HTMLDivElement | null = document.querySelector('.reset-game');

    playerScore: HTMLDivElement | null = document.querySelector('.player-score-value');

    playerScoreBar: HTMLDivElement | null = document.querySelector('.player-score-bar');

    wpmValue: HTMLDivElement | null = document.querySelector('.wpm-value');

    controlButton: HTMLElement | null = document.querySelector('.button-control');

    pauseButton: HTMLElement | null = document.querySelector('.button-pause');

    playButton: HTMLElement | null = document.querySelector('.button-play');

    keyboardButton: HTMLElement | null = document.querySelector('.button-keyboard');

    keyboard: HTMLElement | null = document.querySelector('.keyboard');

    showHideKeyboardMessage: HTMLElement | null = document.querySelector('.button-keyboard-tip');

    timer: HTMLElement | null = document.querySelector('.timer');

    shiftLeftSurface: HTMLElement | null = document.querySelector('#shiftleft .surface');

    altLeftSurface: HTMLElement | null = document.querySelector('#altleft .surface');

    gameMode: string = GAME_MODES[0];

    activeCharacter: string = '';

    public static getInstance(): GameState {
        if (!GameState.instance) {
            GameState.instance = new GameState();
        }
        return GameState.instance;
    }
}
