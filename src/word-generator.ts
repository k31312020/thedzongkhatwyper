import { GAME_MODES } from './constants';
import { DICTIONARY } from './dictionary';
import GameSettings from './game-settings';
import GameState from './game-state';
import { getRandomNumber, wordAnimationEnded } from './helpers';
import {
    AND, HIGHLIGHTER_CONFIG, OR, NOT, DEFAULT_HIGHLIGHT_CONFIG,
} from './highlighter-constants';
import { SymbolConfig } from './models';

export default class WordGenerator {
    state: GameState = GameState.getInstance();

    settings: GameSettings = GameSettings.getInstance();

    displayWord = (): void => {
        if (this.state?.container?.children?.length < this.state.wordsOnScreen && !this.state.paused) {
            (this.state.gameMode === GAME_MODES[0]) ? this.addGameModeOneWords() : this.addGameModeThreeWords();
        }
    }

    addGameModeOneWords(): void {
        let i = this.state.words.length === 0 ? 0 : this.state.words.length < 7 ? 5 : null;
        if ((![0, 5].includes(i))) return;
        for (i; i < 6; i++) {
            this.addNewWord('span', 'word-normal');
        }
        if (this.state.gameMode === GAME_MODES[0]) {
            [this.state.activeCharacter] = this.state.words[0].innerText.split('');
            !this.state.typingStart && this.settings.blinkKey();
        }
    }

    addGameModeThreeWords(): void {
        this.state.words.length === 0 && this.settings.startTimer();
        this.addNewWord('div', 'word', this.state.container.clientWidth);
    }

    addNewWord = (elementName: string, className: string, width?: number): void => {
        let newWord: HTMLSpanElement = document.createElement(elementName);
        newWord.className = className;
        this.state.mainTextContainer.appendChild(newWord);
        newWord.innerText = this.getRandomWord(getRandomNumber(DICTIONARY.length, true));
        width && (newWord.style.left = `${((width - newWord.clientWidth) * getRandomNumber(100)) / 100}px`);
        this.state.words.push(newWord);
        newWord = undefined;
    }

    removeWords = (): void => {
        if (this.state.paused) {
            return;
        }
        if (this.state.gameMode === GAME_MODES[1]) {
            this.removeGameModeThreeWords();
        }
        this.state.words = this.state.words.filter((word) => word);
    }

    removeGameModeThreeWords(): void {
        for (let i = 0; i < this.state.words.length; i++) {
            if (wordAnimationEnded(this.state.words[i])) {
                this.state.activeWord
                && (this.state.activeWord.innerText === this.state.words[i].innerText)
                && this.removeSingleWord();
                this.state.words[i].remove();
                this.state.words[i] = undefined;
            }
        }
    }

    removeSingleWord = (): void => {
        if (this.state.gameMode === GAME_MODES[0]) {
            this.state.activeWord.setAttribute('completed', 'completed');
            this.state.activeWord.remove();
            this.state.activeWord = undefined;
            this.state.normalWordsCaptured += 1;
            this.clearWordsQueueHead();
        } else {
            this.state.activeWord.remove();
            this.state.activeWord = undefined;
        }
    }

    clearWordsQueueHead(): void {
        if (this.state.normalWordsCaptured > 3) {
            this.state.words[0].remove();
            this.state.words.splice(0, 1);
        }
    }

    tetherToWord = (key: string): void => {
        !this.state.activeWord ? this.tetherToFirstWord(key) : this.tetherToSubsequentWord(key);
    }

    tetherToSubsequentWord = (key: string): void => {
        const wordIndex = this.state.activeWord.innerText.indexOf(
            key, this.state.highlightedIndex + 1,
        );
        if (wordIndex === (this.state.highlightedIndex + 1)) {
            this.startHighlight(wordIndex, true);
        } else {
            this.state.errors += 1;
            this.settings.calculateWpm();
        }
    }

    tetherToFirstWord = (key: string): void => {
        this.setActiveWord(key);
        this.startHighlight(0, this.state?.activeWord?.innerText[0] === key);
        this.state.highlightedIndex = 0;
        this.state?.activeWord?.innerText[0] === key 
        && this.state.score === 0 && this.state.gameMode === GAME_MODES[0] && this.settings.startTimer();
    }

    setActiveWord = (key: string): void => {
        if (this.state.gameMode === GAME_MODES[0]) {
            const { nextWordIndex, activeWord } = this.getActiveWord(key);
            this.state.activeWord = activeWord;
            this.state.nextWordIndex = nextWordIndex;
        } else {
            this.state.activeWord = this.state.words.find((word) => word.innerText.startsWith(key));
        }
    }

    getActiveWord = (key: string): {nextWordIndex?: number, activeWord?: HTMLElement} => {
        const activeWordIndex = this.state.words.findIndex((word) => word.getAttribute('completed') !== 'completed');
        const activeWord = this.state.words[activeWordIndex];
        return {
            nextWordIndex: activeWordIndex > -1 ? activeWordIndex : null,
            activeWord: activeWord.innerText.startsWith(key) ? activeWord : null
        }
    }

    startHighlight = (index: number, increaseCorrectCount?: boolean): void => {
        !increaseCorrectCount && (this.state.errors += 1);
        this.settings.calculateWpm(increaseCorrectCount);
        this.state.highlightedIndex += 1;
        const configIndex = this.searchHighlightConfig(HIGHLIGHTER_CONFIG, index);
        if (this.state.activeWord) {
            this.highlightWord((configIndex || configIndex === 0) ? HIGHLIGHTER_CONFIG[configIndex] : DEFAULT_HIGHLIGHT_CONFIG, index);
            this.increaseScoreOnLastSymbol(index);
        }
    }

    increaseScoreOnLastSymbol(index: number): void {
        if (index === (this.state.activeWord.innerText.length - 1)) {
            this.settings.increaseScore();
            this.removeSingleWord();
            this.state.nextWordIndex = this.state.words.findIndex((word) => word.getAttribute('completed') !== 'completed');
            this.state.activeCharacter = (this.state.nextWordIndex 
            || this.state.nextWordIndex === 0)
            && this.state.words[this.state.nextWordIndex]
            ? this.state.words[this.state.nextWordIndex].innerText[0] : null;
            this.settings.blinkKey();
        }
    }

    searchHighlightConfig = (highlightConfig: SymbolConfig[], index: number): number => {
        let hasCombo: boolean;
        for (let configIndex = 0; configIndex < highlightConfig.length; configIndex++) {
            hasCombo = this.isInList(highlightConfig[configIndex], index, true);
            if (hasCombo) {
                return configIndex;
            }
        }
    }

    isInList = (config: SymbolConfig, index: number, mainList?: boolean): boolean => {
        let isInConfigList = this.state?.activeWord?.innerText && config.list.includes(
            this.state.activeWord.innerText[index + (mainList ? 0 : (config.searchIndexIncrement || 0))],
        );
        if (isInConfigList && config.secondaryList && config.secondaryList.length) {
            isInConfigList = this.isInSecondaryList(config.secondaryList, index);
        }
        return isInConfigList;
    }

    isInSecondaryList = (config: SymbolConfig[], index: number): boolean => {
        let hasCombo = true;
        for (let configIndex = 0; configIndex < config.length; configIndex++) {
            if (config[configIndex].relation === AND) {
                hasCombo = hasCombo
                && this.isInList(config[configIndex], index);
            } else if (config[configIndex].relation === OR) {
                hasCombo = hasCombo
                || this.isInList(config[configIndex], index);
            } else if (config[configIndex].relation === NOT) {
                hasCombo = hasCombo
                && !this.isInList(config[configIndex], index);
            } 
        }
        return hasCombo;
    }

    highlightWord = (highlightConfig: SymbolConfig, index: number) => {
        if (this.state.gameMode === GAME_MODES[0]) {
            this.state.activeCharacter = this.state.activeWord.innerText[index + 1];
            this.settings.blinkKey();
        }
        this.state.activeWord.innerHTML = this.getUpdatedWordElements(
            highlightConfig, 
            index, 
        );
    }

    getUpdatedWordElements(
        config: SymbolConfig,
        index: number,
    ): string {
        return `<span style="color: ${this.state.highlightColor}">${this.state.activeWord.innerText.substring(0, index + (config.startIndexIncrement || 0))}</span>` +
            `<span style="${this.highlightStyleBuilder(config)}">${this.state.activeWord.innerText.substring(index + (config.startIndexIncrement || 0), index + config.endIndexIncrement)}</span>` +
            `<span>${this.state.activeWord.innerText.substring(index + config.endIndexIncrement)}</span>`
        ;
    }

    highlightStyleBuilder = (config: SymbolConfig): string => {
        return `background: linear-gradient(${config.style.gradient}); 
                background-clip: text; 
                -webkit-background-clip: text; 
                -webkit-text-fill-color: transparent;` 
                + `${config?.style?.paddingLeft ? `padding-left: ${config.style.paddingLeft};` : ''}` 
                + `${config?.style?.paddingRight ? `padding-right:${config.style.paddingRight};` : ''}`
                + `${config?.style?.paddingTop ? `padding-top: ${config.style.paddingTop};`: ''}`
                + `${config?.style?.paddingBottom ? `padding-bottom: ${config.style.paddingBottom};`: ''}`;
    }

    getRandomWord = (index: number) => DICTIONARY[index];
}
