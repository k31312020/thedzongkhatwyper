import { GAME_MODES, GAME_MODE_SETTINGS, KEY_COMBOS, SPECIAL_KEY_IDS } from './constants';
import { KeyColors, ShowHideKeyboardMessage } from './enums';
import GameSettings from './game-settings';
import GameState from './game-state';
import WordGenerator from './word-generator';

export default class GameLoop {
    state: GameState = GameState.getInstance();

    settings: GameSettings = GameSettings.getInstance();

    wordGenerator: WordGenerator = new WordGenerator();

    gameLoop = () => {
        this.setUpEvents();
        this.setUpLoops();
    }

    setUpEvents(): void {
        this.onWindowFocus();
        this.onGameModeChange();
        this.onWpmResetGame();
        this.onKeyboard();
        this.onPause();
        this.onKeyDown();
        this.onKeyUp();
    }

    setUpLoops(): void {
        this.state.time = this.state.timer.innerText = GAME_MODE_SETTINGS[this.state.gameMode].totalTime;
        this.state.wordAdder = setInterval(() => {
            if (this.state.gameMode === GAME_MODES[1]) {
                this.wordGenerator.removeWords();
            }
            this.wordGenerator.displayWord();
        }, GAME_MODE_SETTINGS[this.state.gameMode].wordAddTime);
    }

    onWindowFocus = (): void => {
        window.addEventListener('focus', () => {
            this.resetAllPressKeys();
        });
    }

    onGameModeChange = (): void => {
        this.state.gameModes.forEach((mode, index) => {
            mode.addEventListener('click', () => {
                this.switchGameMode(index);
            });
        });
    }

    switchGameMode = (index: number): void => {
        this.state.gameMode = GAME_MODES[index];
        if (this.state.gameMode === GAME_MODES[1]) {
            this.state.showKeyboard = false;
            this.toggleKeyBoard();
        }
        this.settings.resetGame();
        this.settings.clearAllIntervals();
        this.setUpLoops();
    };

    onWpmResetGame = (): void => {
        this.state?.resetGame?.addEventListener('click', () => {
            this.settings.resetGame();
            this.settings.toggleWpmVisibility();
            this.gameLoop();
        });
    }

    onKeyboard = (): void => {
        this.state?.keyboardButton?.addEventListener('click', () => {
            this.state.showKeyboard = !this.state.showKeyboard;
            this.toggleKeyBoard()
        });
    }

    toggleKeyBoard = (): void => {
        this.state.showHideKeyboardMessage 
        && (this.state.showHideKeyboardMessage.innerText = this.state.showKeyboard ? ShowHideKeyboardMessage.hide : ShowHideKeyboardMessage.show);
        this.state?.keyboard?.classList.remove(`${this.state.showKeyboard ? 'hide' : 'show'}-keyboard`);
        this.state?.keyboard?.classList.add(`${this.state.showKeyboard ? 'show' : 'hide'}-keyboard`);
    }

    onPause = (): void => {
        this.state?.controlButton?.addEventListener('click', () => {
            this.settings.handlePause();
        });
    }

    onKeyDown = (): void => {
        document.onkeydown = (e: KeyboardEvent) => {
            if (e.repeat) return;
            if (KEY_COMBOS[e.code.toLowerCase()]) {
                this.wordGenerator.tetherToWord(KEY_COMBOS[e.code.toLowerCase()][e.shiftKey ? 'shift' : 'plain']);
            }
            e.key === 'Escape' && this.onEscape();
            ['shiftright', 'shiftleft'].includes(e.code.toLowerCase()) && this.onShift(true);
            const key = document.getElementById(e.code.toLowerCase());
            //this.updateKeyColor(-3, -3, 2, 2);
            this.state.activeKey = key && key.querySelector('.surface');
            this.updateKeyColor(KeyColors.active, 3, 3, -2, -2);
        };
    }

    updateKeyColor = (color: string, width: number, height: number, x: number, y: number): void => {
        if (this.state.activeKey) {
            this.settings.updateKeyStyle(
                this.state.activeKey, 
                {
                    fill: color, width, height, x, y,
                }
            );
        }
    }

    onShift = (down: boolean): void => {
        ['.shift', '.plain', '.shift-info'].forEach((keyClass) => {
            document.querySelectorAll(keyClass).forEach((key) => {
                if ((down && keyClass !== '.shift') || (!down && keyClass === '.shift')) {
                    key.classList.add('hide');
                } else {
                    key.classList.remove('hide');
                }
            });
        });
    }

    onKeyUp = (): void => {
        document.onkeyup = (e) => {
            ['shiftright', 'shiftleft'].includes(e.code.toLowerCase()) && this.onShift(false);
            if (this.state.activeKey) {
                this.updateKeyColor(KeyColors.inactive, -3, -3, 2, 2);
                this.state.activeKey = null;
            }
            this.resetAllPressKeys();
        };
    }

    resetAllPressKeys = ():void => {
        // clear all the active keys
        [...Object.keys(KEY_COMBOS), ...SPECIAL_KEY_IDS].forEach(id => {
            if (document.getElementById(id).querySelector('.surface').getAttribute('fill') === KeyColors.active) {
                this.settings.updateKeyStyle(
                    document.getElementById(id).querySelector('.surface'), {fill: KeyColors.inactive, width: -3, height: -3, x: 2, y: 2}
                )
            }
        });
    }

    onEscape = (): void => {
        if (this.state.activeWord) {
            this.state.activeWord.innerHTML = this.state.activeWord.innerText;
        }
        this.state.activeWord = null;
    }
}
