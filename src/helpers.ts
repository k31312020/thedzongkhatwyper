import {
    NUMBERS_DZO_TO_EN,
    NUMBERS_EN_TO_DZO,
    SESSION_COMPLETE_MESSAGES,
} from './constants';
import { WpmLimits } from './enums';

export function getRandomNumber(limit: number, isIndex?: boolean): number {
    return Math.floor(Math.random() * limit + 1) + (isIndex ? -1 : 0);
}

export function wordAnimationEnded(word: HTMLSpanElement): boolean {
    return (
        !word.parentElement
    || word.getBoundingClientRect().y
    > word.parentElement.getBoundingClientRect().height
    );
}

export function sessionCompleteMessage(score: number): string {
    switch (true) {
    case score < WpmLimits.VerySlow:
        return SESSION_COMPLETE_MESSAGES.verySlow;
    case score > WpmLimits.SlowMin && score < WpmLimits.SlowMax:
        return SESSION_COMPLETE_MESSAGES.slow;
    case score > WpmLimits.AverageMin && score < WpmLimits.AverageMax:
        return SESSION_COMPLETE_MESSAGES.average;
    case score > WpmLimits.FastMin && score < WpmLimits.FastMax:
        return SESSION_COMPLETE_MESSAGES.fast;
    default:
        return SESSION_COMPLETE_MESSAGES.veryFast;
    }
}

export function numInDzo(number: number): string {
    const numberAsString = number.toString();
    let numberInDzo = '';
    if (number < 0) return '༠';
    for (let digitIndex = 0; digitIndex < numberAsString.length; digitIndex++) {
        numberInDzo += NUMBERS_EN_TO_DZO[+numberAsString[digitIndex]];
    }
    return numberInDzo;
}

export function getDzoTimeInEnglish(time: string, separator?: string): {
    minutes: number,
    seconds: number
} {
    const timeComponents = time.split(separator || '་');
    // convert time digits from dzongkha to english
    const minutes = +NUMBERS_DZO_TO_EN[timeComponents[0]];
    const seconds: number | string = +(
        NUMBERS_DZO_TO_EN[timeComponents[1][0]]
    + NUMBERS_DZO_TO_EN[timeComponents[1][1]]
    );
    return { minutes, seconds };
}

export function countdownDzoTime(
    time: string,
    separator?: string,
): Promise<string> {
    return new Promise((resolve) => {
        let { minutes, seconds } = getDzoTimeInEnglish(time, separator);
        // when minute is greater than zero and second is exactly zero,
        // reduce minutes by one and change seconds to 59
        if (minutes > 0 && seconds === 0) {
            minutes -= 1;
            seconds = 59;
        } else {
            // when minute is less than zero and second is not zero, reduce seconds only by one
            seconds -= 1;
        }
        (minutes === 0 && seconds === -1) ? resolve('')
            : resolve(
                `${NUMBERS_EN_TO_DZO[minutes]}་${NUMBERS_EN_TO_DZO[(seconds < 10) ? '0' : seconds.toString()[0]]}${NUMBERS_EN_TO_DZO[seconds.toString()[(seconds < 10) ? 0 : 1]]}`,
            );
    });
}

export function nothing(): void {}
