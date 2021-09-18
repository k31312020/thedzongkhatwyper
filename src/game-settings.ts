import { GAME_MODE_SETTINGS, KEY_COMBOS } from './constants';
import GameState from './game-state';
import { countdownDzoTime, numInDzo } from './helpers';

export default class GameSettings {
    private static instance: GameSettings;

    state: GameState = GameState.getInstance();

    playButton = this.state.playButton;

    pauseButton = this.state.pauseButton;

    activeKeySurface: HTMLElement | undefined;

    public static getInstance(): GameSettings {
        if (!GameSettings.instance) {
            GameSettings.instance = new GameSettings();
        }
        return GameSettings.instance;
    }

    // This method will start the game timer right after the user starts typing
    startTimer = (): void => {
        this.state.timerInterval = setInterval(() => {
            if (this.state.paused) return;
            countdownDzoTime(this.state.time).then((res) => {
                if (res) {
                    this.state.time = this.state.timer.innerText = res;
                }
                !res && this.completeSession();
            });
        }, 1000);
    }

    // This will stop the timer interval
    // eslint-disable-next-line no-undef
    stopTimerInterval = (): void => clearInterval(this.state.timerInterval as NodeJS.Timeout);

    // stopping all the intervals
    clearAllIntervals(): void {
        // eslint-disable-next-line no-undef
        clearInterval(this.state.timerInterval as NodeJS.Timeout);
        // eslint-disable-next-line no-undef
        clearInterval(this.state.wordRemover as NodeJS.Timeout);
        // eslint-disable-next-line no-undef
        clearInterval(this.state.wordAdder as NodeJS.Timeout);
    }

    // Scores are displyed and intervals are stopped right after the timer runs out
    completeSession = (): void => {
        this.state.playerScore.innerText = numInDzo(this.state.wpm);
        const playerScoreBarHeight = `${Math.floor((this.state.wpm/35)*20)}rem`;
        this.state.playerScoreBar.style.height = playerScoreBarHeight;
        document.documentElement.style.setProperty('--score-end', playerScoreBarHeight);
        this.toggleWpmVisibility(true);
        this.clearAllIntervals();
    }

    // Compute words per minute (wpm) using the below formula
    // eslint-disable-next-line max-ln
    // wpm is words per minute
    // wpm = (typed letters/5 - (minus) errors or missed letters) / (divide) (typing start time - (minus) typing end time)
    // 5 letters is considered as one word
    calculateWpm = (increaseCorrectLettersCount?: boolean): void => {
        if (this.state.typedletters === 0) {
            this.state.typingStart = new Date();
        }
        this.state.typingEnd = new Date();
        let grossTypedLetters = this.state.typedletters - this.state.errors;
        if (grossTypedLetters < 0) {
            this.state.errors = this.state.typedletters + 1;
            grossTypedLetters = 0;
        };
        this.state.wpm = Math.ceil((grossTypedLetters / 5) / this.getDateDifferenceMins());
        this.state.wpmValue.innerText = this.state.wpm ? numInDzo(this.state.wpm) : '༠';
        increaseCorrectLettersCount && (this.state.typedletters += 1);
    }

    // Increase the state score and update the display score when a letter is correctly typed
    increaseScore = (): void => {
        this.state.score += 1;
        const scoreInDzo = numInDzo(this.state.score);
        this.state.scoreContainer.innerText = scoreInDzo;
    }

    // Compute typing start and typing end difference
    getDateDifferenceMins = (): number => (
        (
            (this.state.typingEnd.valueOf() - this.state.typingStart.valueOf())
            % 86400000
        ) % 3600000
    ) / 60000;

    // Function to update key style
    updateKeyStyle(element: Element, style: {
        fill: string,
        height: number,
        width: number,
        x: number,
        y: number
    }): void {
        element.setAttribute('fill', style.fill);
        ['width', 'height', 'x', 'y'].forEach((attribute) => {
            element.setAttribute(
                attribute,
                (+element.getAttribute(attribute) + style[attribute]).toString(),
            );
        });
    }

    // key on the on-screen keyboard will blink when pressed
    blinkKey(): void {
        this.activeKeySurface && this.activeKeySurface.classList.remove('blink');
        this.state.shiftLeftSurface.classList.remove('blink');
        this.state.altLeftSurface.classList.remove('blink');
        const {
            shift, altShift, activeKey,
        } = this.getActiveKey();
        shift && this.state.shiftLeftSurface.classList.add('blink');
        altShift && this.state.altLeftSurface.classList.add('blink');
        this.activeKeySurface = activeKey ? document.querySelector(`#${activeKey}`).querySelector('.surface') : undefined;
        this.activeKeySurface && this.activeKeySurface.classList.add('blink');
    }

    // Find out which key combintion was pressed
    getActiveKey(): {shift: boolean, altShift: boolean, activeKey: string} {
        let shift; let altShift; let
            plain = false;
        const activeKey = Object.keys(KEY_COMBOS).find((key) => {
            plain = KEY_COMBOS[key].plain === this.state.activeCharacter;
            shift = KEY_COMBOS[key].shift === this.state.activeCharacter;
            altShift = KEY_COMBOS[key].shiftAlt === this.state.activeCharacter;
            return plain || shift || altShift;
        });
        return {
            shift, altShift, activeKey,
        };
    }

    // This toggle wpm visibility
    toggleWpmVisibility(status?: boolean): void {
        this.state.wpmOverlay.style.display = status ? 'block' : 'none';
    }

    handlePause(): void {
        // toggle paused flag
        this.state.paused = !this.state.paused;
        // show/hide play/pause button in dom based on state.paused value
        this[this.state.paused ? 'playButton' : 'pauseButton'].classList.remove('hide');
        this[this.state.paused ? 'pauseButton' : 'playButton'].classList.add('hide');
        this.pauseWords();
    }

    // add/remove paused class to each active word in dom
    pauseWords(): void {
        this.state.words.forEach((word) => {
            this.state.paused ? word.classList.add('paused') : word.classList.remove('paused');
        });
    }

    resetGame(): void {
        // restore game time to initial time
        this.state.time = GAME_MODE_SETTINGS[this.state.gameMode].totalTime;
        this.state.timer.innerText = GAME_MODE_SETTINGS[this.state.gameMode].totalTime;
        // restore dom game time to original
        this.state.activeWord = this.removeWordRef(this.state.activeWord);
        for (let i = 0; i < this.state.words.length; i++) {
            this.removeWordRef(this.state.words[i]);
        }
        // reset typingStart, typingEnd and typedLetters
        this.state.typingStart = null;
        this.state.typingEnd = null;
        this.state.typedletters = 0;
        // remove all onscreen words
        this.state.words = [];
        // reset current score
        this.state.wpm = this.state.score = 0;
        this.state.wpmValue.innerText = this.state.scoreContainer.innerText = '༠';
    }

    removeWordRef = (wordRef: HTMLElement): null => {
        wordRef?.remove();
        // removing reference to prevent memory leak
        // eslint-disable-next-line no-param-reassign
        return null;
    }
}
