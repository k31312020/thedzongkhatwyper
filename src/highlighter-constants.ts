import {
    THEME,
    WORD_GROUPS,
} from './constants';
import { ThemeTypes } from './enums';
import { HighlightStyle, SymbolConfig, Theme } from './models';

export const AND = 'and';

export const OR = 'or';

export const NOT = 'not';

const buildConfigList = (listKeys: string[]):string[] => {
    let list: string[] = [];
    for(let i = 0; i < listKeys.length; i++) {
        list = [...list, ...WORD_GROUPS[listKeys[i]]];
    }
    return list;
};

const getStyle = (): Record<number, HighlightStyle> => {
    const windowsPlatform = ['Win16', 'Win32', 'WinCE'];
    if(windowsPlatform.includes(navigator.platform)) {
        return HIGHLIGHT_STYLES_WIN;
    } else {
        return HIGHLIGHT_STYLES;
    }
}

const getTheme = (mode: ThemeTypes = ThemeTypes.light): Theme => THEME[mode];

//  gradients are saparately configured for windows os
const HIGHLIGHT_STYLES_WIN: Record<number, HighlightStyle> = {
    1: {
        gradient: `${getTheme().colors.highlight} 0%, ${getTheme().colors.highlight} 0%`,
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
    },
    2: {
        gradient: `210deg, ${getTheme().colors.highlight} 76%, ${getTheme().colors.text} 76%`,
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        paddingLeft: '0.2rem'
    },
    3: {
        gradient: `${getTheme().colors.text} 50%, ${getTheme().colors.highlight} 50%`,
        paddingTop: '0.5rem',
        paddingLeft: '0.2rem',
        paddingBottom: '0.5rem'
    },
    4: {
        gradient: `188deg, ${getTheme().colors.highlight} 74%, ${getTheme().colors.text} 74%`,
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
    },
    5: {
        gradient: `${getTheme().colors.highlight} 82%, ${getTheme().colors.text} 82%`,
        paddingTop: '0.5rem'
    },
    6: {
        gradient: `${getTheme().colors.highlight} 76%, ${getTheme().colors.text} 76%`,
        paddingTop: '0.5rem'
    },
    7: {
        gradient: `200deg, ${getTheme().colors.highlight} 82%, ${getTheme().colors.text} 82%`,
        paddingTop: '0.5rem'
    },
    8: {
        gradient: `146deg ${getTheme().colors.highlight} 61%, ${getTheme().colors.text} 61%`,
        paddingTop: '0.5rem'
    },
    9: {
        gradient: `${getTheme().colors.highlight} 70%, ${getTheme().colors.text} 70%`,
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
    },
    10: {
        gradient: `${getTheme().colors.highlight} 65%, ${getTheme().colors.text} 65%`,
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
    },
    11: {
        gradient: `${getTheme().colors.highlight} 67%, ${getTheme().colors.text} 67%`,
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
    },
    12: {
        gradient: `${getTheme().colors.highlight} 76%, ${getTheme().colors.text} 76%`,
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
    },
    13: {
        gradient: `200deg, ${getTheme().colors.highlight} 80%, ${getTheme().colors.text} 80%`,
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        paddingLeft: '0.2rem'
    },
    14: {
        gradient: `${getTheme().colors.highlight} 57%, ${getTheme().colors.text} 57%`,
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
    },
    15: {
        gradient: `200deg, ${getTheme().colors.highlight} 67%, ${getTheme().colors.text} 67%`,
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
    },
    16: {
        gradient: `${getTheme().colors.highlight} 77%, ${getTheme().colors.text} 77%`,
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
    },
    17: {
        gradient: `${getTheme().colors.highlight} 44%, ${getTheme().colors.text} 44%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    18: {
        gradient: `${getTheme().colors.highlight} 68%, ${getTheme().colors.text} 68%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    19: {
        gradient: `${getTheme().colors.highlight} 82%, ${getTheme().colors.text} 82%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    20: {
        gradient: `${getTheme().colors.highlight} 51%, ${getTheme().colors.text} 51%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    21: {
        gradient: `${getTheme().colors.highlight} 65%, ${getTheme().colors.text} 65%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    22: {
        gradient: `${getTheme().colors.highlight} 81%, ${getTheme().colors.text} 81%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    23: {
        gradient: `${getTheme().colors.text} 44%, ${getTheme().colors.highlight} 44% 57%, ${getTheme().colors.text} 57%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    24: {
        gradient: `${getTheme().colors.text} 44%, ${getTheme().colors.highlight} 44% 80%, ${getTheme().colors.text} 80%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    25: {
        gradient: `${getTheme().colors.text} 44%, ${getTheme().colors.highlight} 44% 90%, ${getTheme().colors.text} 90%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    26: {
        gradient: `${getTheme().colors.text} 44%, ${getTheme().colors.highlight} 44% 31%, ${getTheme().colors.text} 31%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    27: {
        gradient: `${getTheme().colors.text} 44%, ${getTheme().colors.highlight} 44% 54%, ${getTheme().colors.text} 54%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    28: {
        gradient: `${getTheme().colors.text} 44%, ${getTheme().colors.highlight} 44% 63%, ${getTheme().colors.text} 63%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    29: {
        gradient: `${getTheme().colors.highlight} 77%, ${getTheme().colors.text} 77%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
}

const HIGHLIGHT_STYLES: Record<number, HighlightStyle> = {
    1: {
        gradient: `${getTheme().colors.highlight} 0%, ${getTheme().colors.highlight} 0%`,
        paddingTop: '0.5rem',
    },
    2: {
        gradient: `210deg, ${getTheme().colors.highlight} 67%, ${getTheme().colors.text} 67%`,
        paddingTop: '0.5rem'
    },
    3: {
        gradient: `${getTheme().colors.text} 22%, ${getTheme().colors.highlight} 22%`,
        paddingTop: '0.5rem',
        paddingLeft: '0.2rem'
    },
    4: {
        gradient: `188deg, ${getTheme().colors.highlight} 61%, ${getTheme().colors.text} 61%`,
        paddingTop: '0.5rem'
    },
    5: {
        gradient: `${getTheme().colors.highlight} 62%, ${getTheme().colors.text} 62%`,
        paddingTop: '0.5rem'
    },
    6: {
        gradient: `${getTheme().colors.highlight} 76%, ${getTheme().colors.text} 76%`,
        paddingTop: '0.5rem'
    },
    7: {
        gradient: `200deg, ${getTheme().colors.highlight} 61%, ${getTheme().colors.text} 61%`,
        paddingTop: '0.5rem'
    },
    8: {
        gradient: `146deg ${getTheme().colors.highlight} 61%, ${getTheme().colors.text} 61%`,
        paddingTop: '0.5rem'
    },
    9: {
        gradient: `${getTheme().colors.highlight} 55%, ${getTheme().colors.text} 55%`,
        paddingTop: '0.5rem'
    },
    10: {
        gradient: `${getTheme().colors.highlight} 39%, ${getTheme().colors.text} 39%`,
        paddingTop: '0.5rem'
    },
    11: {
        gradient: `${getTheme().colors.highlight} 56%, ${getTheme().colors.text} 56%`,
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
    },
    12: {
        gradient: `${getTheme().colors.highlight} 76%, ${getTheme().colors.text} 76%`,
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
    },
    13: {
        gradient: `200deg, ${getTheme().colors.highlight} 74%, ${getTheme().colors.text} 74%`,
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
    },
    14: {
        gradient: `${getTheme().colors.highlight} 35%, ${getTheme().colors.text} 35%`,
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
    },
    15: {
        gradient: `200deg, ${getTheme().colors.highlight} 67%, ${getTheme().colors.text} 67%`,
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
    },
    16: {
        gradient: `${getTheme().colors.highlight} 61%, ${getTheme().colors.text} 61%`,
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
    },
    17: {
        gradient: `${getTheme().colors.highlight} 44%, ${getTheme().colors.text} 44%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    18: {
        gradient: `${getTheme().colors.highlight} 68%, ${getTheme().colors.text} 68%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    19: {
        gradient: `${getTheme().colors.highlight} 82%, ${getTheme().colors.text} 82%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    20: {
        gradient: `${getTheme().colors.highlight} 31%, ${getTheme().colors.text} 31%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    21: {
        gradient: `${getTheme().colors.highlight} 53%, ${getTheme().colors.text} 53%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    22: {
        gradient: `190deg, ${getTheme().colors.highlight} 71%, ${getTheme().colors.text} 71%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    23: {
        gradient: `${getTheme().colors.text} 20%, ${getTheme().colors.highlight} 20% 44%, ${getTheme().colors.text} 44%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    24: {
        gradient: `${getTheme().colors.text} 20%, ${getTheme().colors.highlight} 20% 66%, ${getTheme().colors.text} 66%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    25: {
        gradient: `${getTheme().colors.text} 20%, ${getTheme().colors.highlight} 20% 83%, ${getTheme().colors.text} 83%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    26: {
        gradient: `${getTheme().colors.text} 20%, ${getTheme().colors.highlight} 20% 31%, ${getTheme().colors.text} 31%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    27: {
        gradient: `${getTheme().colors.text} 20%, ${getTheme().colors.highlight} 20% 54%, ${getTheme().colors.text} 54%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    28: {
        gradient: `${getTheme().colors.text} 20%, ${getTheme().colors.highlight} 20% 50%, ${getTheme().colors.text} 50%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
    29: {
        gradient: `190deg, ${getTheme().colors.highlight} 64%, ${getTheme().colors.text} 64%`,
        paddingTop: '0.5rem',
        paddingBottom: '1rem'
    },
}

export const DEFAULT_HIGHLIGHT_CONFIG: SymbolConfig = {
    list: [],
    endIndexIncrement: 1,
    style: getStyle()[1]
}

// css class mapping based on the position of the active symbol 
// start and end index are set as symbol index boundary for applying gradient 

export const HIGHLIGHTER_CONFIG: SymbolConfig[] = [
    // 2 layer symbol stacks
    {
        list: buildConfigList(['mainSymbolsLong', 'mainSymbolsShort']),
        secondaryList: [
            {
                list: WORD_GROUPS.superscripts1,
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['subscripts1', 'subscripts2', 'subscripts3', 'subscripts4', 'subscripts5', 'subscripts6', 'subscripts7']),
                relation: NOT,
                searchIndexIncrement: 2,
            }
        ],
        endIndexIncrement: 2,
        style: getStyle()[3]
    },
    {
        list: WORD_GROUPS.superscripts2,
        secondaryList: [
            {
                list: buildConfigList(['subscripts1']),
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['subscripts2', 'subscripts3', 'subscripts4', 'subscripts5', 'subscripts6', 'subscripts7', 'superscripts1']),
                relation: NOT,
                searchIndexIncrement: 2,
            }
        ],
        endIndexIncrement: 2,
        style: getStyle()[9]
    },
    {
        list: WORD_GROUPS.superscripts3,
        secondaryList: [
            {
                list: buildConfigList(['subscripts1']),
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['subscripts2', 'subscripts3', 'subscripts4', 'subscripts5', 'subscripts6', 'subscripts7', 'superscripts1']),
                relation: NOT,
                searchIndexIncrement: 2,
            }
        ],
        endIndexIncrement: 2,
        style: getStyle()[10]
    },
    {
        list: WORD_GROUPS.superscripts3,
        secondaryList: [
            {
                list: buildConfigList(['subscripts7']),
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['subscripts1', 'subscripts2', 'subscripts3', 'subscripts4', 'subscripts5', 'subscripts6', 'superscripts1']),
                relation: NOT,
                searchIndexIncrement: 2,
            }
        ],
        endIndexIncrement: 2,
        style: getStyle()[9]
    },
    {
        list: WORD_GROUPS.mainSymbolsLong,
        secondaryList: [
            {
                list: WORD_GROUPS.subscripts5,
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['superscripts1', 'superscripts2', 'superscripts3']),
                relation: NOT,
                searchIndexIncrement: -1,
            }
        ],
        endIndexIncrement: 2,
        style: getStyle()[2]
    },
    {
        list: WORD_GROUPS.mainSymbolsShort,
        secondaryList: [
            {
                list: WORD_GROUPS.subscripts5,
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['superscripts1', 'superscripts2', 'superscripts3']),
                relation: NOT,
                searchIndexIncrement: -1,
            }
        ],
        endIndexIncrement: 2,
        style: getStyle()[4]
    },
    {
        list: buildConfigList(['mainSymbolsShort', 'mainSymbolsLong']),
        secondaryList: [
            {
                list: WORD_GROUPS.subscripts3,
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['superscripts1', 'subscripts5']),
                relation: NOT,
                searchIndexIncrement: 2,
            }
        ],
        endIndexIncrement: 2,
        style: getStyle()[5]
    },
    {
        list: buildConfigList(['mainSymbolsShort']),
        secondaryList: [
            {
                list: WORD_GROUPS.subscripts6,
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['superscripts1', 'superscripts2', 'superscripts3']),
                relation: NOT,
                searchIndexIncrement: -1,
            }
        ],
        endIndexIncrement: 2,
        style: getStyle()[5]
    },
    {
        list: buildConfigList(['mainSymbolsLong']),
        secondaryList: [
            {
                list: WORD_GROUPS.subscripts6,
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['superscripts1', 'superscripts2', 'superscripts3']),
                relation: NOT,
                searchIndexIncrement: -1,
            }
        ],
        endIndexIncrement: 2,
        style: getStyle()[6]
    },
    {
        list: buildConfigList(['mainSymbolsShort', 'mainSymbolsLong']),
        secondaryList: [
            {
                list: WORD_GROUPS.subscripts4,
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['superscripts1', 'subscripts5']),
                relation: NOT,
                searchIndexIncrement: 2,
            },
        ],
        endIndexIncrement: 2,
        style: getStyle()[7]
    },
    {
        list: buildConfigList(['mainSymbolsShort', 'mainSymbolsLong']),
        secondaryList: [
            {
                list: WORD_GROUPS.subscripts2,
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['superscripts1', 'superscripts2', 'superscripts3']),
                relation: NOT,
                searchIndexIncrement: -1,
            }
        ],
        endIndexIncrement: 2,
        style: getStyle()[8]
    },
    {
        list: buildConfigList(['mainSymbolsShort', 'mainSymbolsLong']),
        secondaryList: [
            {
                list: WORD_GROUPS.subscripts7,
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['superscripts1', 'subscripts5']),
                relation: NOT,
                searchIndexIncrement: 2,
            }
        ],
        endIndexIncrement: 2,
        style: getStyle()[9]
    },
    // 3 layer symbol stacks
    {
        list: buildConfigList(['mainSymbolsLong', 'mainSymbolsShort']),
        secondaryList: [
            {
                list: buildConfigList(['subscripts3', 'subscripts4', 'subscripts7']),
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['subscripts5']),
                relation: AND,
                searchIndexIncrement: 2,
            },
        ],
        endIndexIncrement: 3,
        style: getStyle()[11]
    },
    {
        list: buildConfigList(['subscripts3', 'subscripts4', 'subscripts7']),
        secondaryList: [
            {
                list: buildConfigList(['mainSymbolsLong', 'mainSymbolsShort']),
                relation: AND,
                searchIndexIncrement: -1,
            }, 
            {
                list: buildConfigList(['subscripts5']),
                relation: AND,
                searchIndexIncrement: 1,
            },
        ],
        startIndexIncrement: -1,
        endIndexIncrement: 2,
        style: getStyle()[29]
    },
    {
        list: buildConfigList(['mainSymbolsLong', 'mainSymbolsShort']),
        secondaryList: [
            {
                list: buildConfigList(['subscripts3', 'subscripts4']),
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['superscripts1']),
                relation: AND,
                searchIndexIncrement: 2,
            },
        ],
        endIndexIncrement: 3,
        style: getStyle()[28]
    },
    {
        list: buildConfigList(['mainSymbolsLong', 'mainSymbolsShort']),
        secondaryList: [
            {
                list: buildConfigList(['subscripts7']),
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['superscripts1']),
                relation: AND,
                searchIndexIncrement: 2,
            },
        ],
        endIndexIncrement: 3,
        style: getStyle()[23]
    },
    {
        list: buildConfigList(['subscripts3', 'subscripts4', 'subscripts7']),
        secondaryList: [
            {
                list: buildConfigList(['mainSymbolsLong', 'mainSymbolsShort']),
                relation: AND,
                searchIndexIncrement: -1,
            }, 
            {
                list: buildConfigList(['superscripts1']),
                relation: AND,
                searchIndexIncrement: 1,
            },
        ],
        startIndexIncrement: -1,
        endIndexIncrement: 2,
        style: getStyle()[24]
    },
    {
        list: buildConfigList(['superscripts3']),
        secondaryList: [
            {
                list: buildConfigList(['subscripts1']),
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['superscripts1']),
                relation: AND,
                searchIndexIncrement: 2,
            },
        ],
        endIndexIncrement: 3,
        style: getStyle()[26]
    },
    {
        list: buildConfigList(['subscripts1']),
        secondaryList: [
            {
                list: buildConfigList(['superscripts3']),
                relation: AND,
                searchIndexIncrement: -1,
            }, 
            {
                list: buildConfigList(['superscripts1']),
                relation: AND,
                searchIndexIncrement: 1,
            },
        ],
        startIndexIncrement: -1,
        endIndexIncrement: 2,
        style: getStyle()[25]
    },
    {
        list: buildConfigList(['superscripts2']),
        secondaryList: [
            {
                list: buildConfigList(['subscripts1']),
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['superscripts1']),
                relation: AND,
                searchIndexIncrement: 2,
            },
        ],
        endIndexIncrement: 3,
        style: getStyle()[23]
    },
    {
        list: buildConfigList(['subscripts1']),
        secondaryList: [
            {
                list: buildConfigList(['superscripts2']),
                relation: AND,
                searchIndexIncrement: -1,
            }, 
            {
                list: buildConfigList(['superscripts1']),
                relation: AND,
                searchIndexIncrement: 1,
            },
        ],
        startIndexIncrement: -1,
        endIndexIncrement: 2,
        style: getStyle()[25]
    },
    {
        list: buildConfigList(['superscripts2']),
        secondaryList: [
            {
                list: buildConfigList(['subscripts1']),
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['subscripts3', 'subscripts4', 'subscripts5']),
                relation: AND,
                searchIndexIncrement: 2,
            },
            {
                list: buildConfigList(['superscripts1', 'subscripts5']),
                relation: NOT,
                searchIndexIncrement: 3,
            }
        ],
        endIndexIncrement: 3,
        style: getStyle()[11]
    },
    {
        list: buildConfigList(['subscripts1']),
        secondaryList: [
            {
                list: buildConfigList(['superscripts2']),
                relation: AND,
                searchIndexIncrement: -1,
            }, 
            {
                list: buildConfigList(['subscripts3']),
                relation: AND,
                searchIndexIncrement: 1,
            },
            {
                list: buildConfigList(['superscripts1', 'subscripts5']),
                relation: NOT,
                searchIndexIncrement: 2,
            }
        ],
        startIndexIncrement: -1,
        endIndexIncrement: 2,
        style: getStyle()[12]
    },
    {
        list: buildConfigList(['subscripts1']),
        secondaryList: [
            {
                list: buildConfigList(['superscripts2']),
                relation: AND,
                searchIndexIncrement: -1,
            }, 
            {
                list: buildConfigList(['subscripts4', 'subscripts5']),
                relation: AND,
                searchIndexIncrement: 1,
            },
            {
                list: buildConfigList(['superscripts1', 'subscripts5']),
                relation: NOT,
                searchIndexIncrement: 2,
            }
        ],
        startIndexIncrement: -1,
        endIndexIncrement: 2,
        style: getStyle()[13]
    },
    {
        list: buildConfigList(['superscripts3']),
        secondaryList: [
            {
                list: buildConfigList(['subscripts1']),
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['subscripts3', 'subscripts4', 'subscripts5']),
                relation: AND,
                searchIndexIncrement: 2,
            },
            {
                list: buildConfigList(['superscripts1', 'subscripts5']),
                relation: NOT,
                searchIndexIncrement: 3,
            }
        ],
        endIndexIncrement: 3,
        style: getStyle()[14]
    },
    {
        list: buildConfigList(['subscripts1']),
        secondaryList: [
            {
                list: buildConfigList(['superscripts3']),
                relation: AND,
                searchIndexIncrement: -1,
            }, 
            {
                list: buildConfigList(['subscripts3']),
                relation: AND,
                searchIndexIncrement: 1,
            },
            {
                list: buildConfigList(['superscripts1', 'subscripts5']),
                relation: NOT,
                searchIndexIncrement: 2,
            }
        ],
        startIndexIncrement: -1,
        endIndexIncrement: 2,
        style: getStyle()[16]
    },
    {
        list: buildConfigList(['subscripts1']),
        secondaryList: [
            {
                list: buildConfigList(['superscripts3']),
                relation: AND,
                searchIndexIncrement: -1,
            }, 
            {
                list: buildConfigList(['subscripts4', 'subscripts5']),
                relation: AND,
                searchIndexIncrement: 1,
            },
            {
                list: buildConfigList(['superscripts1', 'subscripts5']),
                relation: NOT,
                searchIndexIncrement: 2,
            }
        ],
        startIndexIncrement: -1,
        endIndexIncrement: 2,
        style: getStyle()[15]
    },
    // 4 layer symbol stacks
    {
        list: buildConfigList(['superscripts2']),
        secondaryList: [
            {
                list: buildConfigList(['subscripts1']),
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['subscripts3', 'subscripts4']),
                relation: AND,
                searchIndexIncrement: 2,
            },
            {
                list: buildConfigList(['subscripts5']),
                relation: AND,
                searchIndexIncrement: 3,
            }
        ],
        endIndexIncrement: 4,
        style: getStyle()[17]
    },
    {
        list: buildConfigList(['subscripts1']),
        secondaryList: [
            {
                list: buildConfigList(['superscripts2']),
                relation: AND,
                searchIndexIncrement: -1,
            }, 
            {
                list: buildConfigList(['subscripts3', 'subscripts4']),
                relation: AND,
                searchIndexIncrement: 1,
            },
            {
                list: buildConfigList(['subscripts5']),
                relation: AND,
                searchIndexIncrement: 2,
            }
        ],
        startIndexIncrement: -1,
        endIndexIncrement: 3,
        style: getStyle()[18]
    },
    {
        list: buildConfigList(['subscripts3', 'subscripts4']),
        secondaryList: [
            {
                list: buildConfigList(['subscripts1']),
                relation: AND,
                searchIndexIncrement: -1,
            }, 
            {
                list: buildConfigList(['superscripts2']),
                relation: AND,
                searchIndexIncrement: -2,
            },
            {
                list: buildConfigList(['subscripts5']),
                relation: AND,
                searchIndexIncrement: 1,
            }
        ],
        startIndexIncrement: -2,
        endIndexIncrement: 2,
        style: getStyle()[19]
    },
    {
        list: buildConfigList(['superscripts3']),
        secondaryList: [
            {
                list: buildConfigList(['subscripts1']),
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['subscripts3', 'subscripts4']),
                relation: AND,
                searchIndexIncrement: 2,
            },
            {
                list: buildConfigList(['subscripts5']),
                relation: AND,
                searchIndexIncrement: 3,
            }
        ],
        endIndexIncrement: 4,
        style: getStyle()[20]
    },
    {
        list: buildConfigList(['subscripts1']),
        secondaryList: [
            {
                list: buildConfigList(['superscripts3']),
                relation: AND,
                searchIndexIncrement: -1,
            }, 
            {
                list: buildConfigList(['subscripts3', 'subscripts4']),
                relation: AND,
                searchIndexIncrement: 1,
            },
            {
                list: buildConfigList(['subscripts5']),
                relation: AND,
                searchIndexIncrement: 2,
            }
        ],
        startIndexIncrement: -1,
        endIndexIncrement: 3,
        style: getStyle()[21]
    },
    {
        list: buildConfigList(['subscripts3', 'subscripts4']),
        secondaryList: [
            {
                list: buildConfigList(['subscripts1']),
                relation: AND,
                searchIndexIncrement: -1,
            }, 
            {
                list: buildConfigList(['superscripts3']),
                relation: AND,
                searchIndexIncrement: -2,
            },
            {
                list: buildConfigList(['subscripts5']),
                relation: AND,
                searchIndexIncrement: 1,
            }
        ],
        startIndexIncrement: -2,
        endIndexIncrement: 2,
        style: getStyle()[22]
    },
    {
        list: buildConfigList(['superscripts2']),
        secondaryList: [
            {
                list: buildConfigList(['subscripts1']),
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['subscripts3', 'subscripts4']),
                relation: AND,
                searchIndexIncrement: 2,
            },
            {
                list: buildConfigList(['superscripts1']),
                relation: AND,
                searchIndexIncrement: 3,
            }
        ],
        endIndexIncrement: 4,
        style: getStyle()[23]
    },
    {
        list: buildConfigList(['subscripts1']),
        secondaryList: [
            {
                list: buildConfigList(['superscripts2']),
                relation: AND,
                searchIndexIncrement: -1,
            }, 
            {
                list: buildConfigList(['subscripts3', 'subscripts4']),
                relation: AND,
                searchIndexIncrement: 1,
            },
            {
                list: buildConfigList(['superscripts1']),
                relation: AND,
                searchIndexIncrement: 2,
            }
        ],
        startIndexIncrement: -1,
        endIndexIncrement: 3,
        style: getStyle()[24]
    },
    {
        list: buildConfigList(['subscripts3', 'subscripts4']),
        secondaryList: [
            {
                list: buildConfigList(['subscripts1']),
                relation: AND,
                searchIndexIncrement: -1,
            }, 
            {
                list: buildConfigList(['superscripts2']),
                relation: AND,
                searchIndexIncrement: -2,
            },
            {
                list: buildConfigList(['superscripts1']),
                relation: AND,
                searchIndexIncrement: 1,
            }
        ],
        startIndexIncrement: -2,
        endIndexIncrement: 2,
        style: getStyle()[25]
    },
    {
        list: buildConfigList(['superscripts3']),
        secondaryList: [
            {
                list: buildConfigList(['subscripts1']),
                relation: AND,
                searchIndexIncrement: 1,
            }, 
            {
                list: buildConfigList(['subscripts3', 'subscripts4']),
                relation: AND,
                searchIndexIncrement: 2,
            },
            {
                list: buildConfigList(['superscripts1']),
                relation: AND,
                searchIndexIncrement: 3,
            }
        ],
        endIndexIncrement: 4,
        style: getStyle()[26]
    },
    {
        list: buildConfigList(['subscripts1']),
        secondaryList: [
            {
                list: buildConfigList(['superscripts3']),
                relation: AND,
                searchIndexIncrement: -1,
            }, 
            {
                list: buildConfigList(['subscripts3', 'subscripts4']),
                relation: AND,
                searchIndexIncrement: 1,
            },
            {
                list: buildConfigList(['superscripts1']),
                relation: AND,
                searchIndexIncrement: 2,
            }
        ],
        startIndexIncrement: -1,
        endIndexIncrement: 3,
        style: getStyle()[27]
    },
    {
        list: buildConfigList(['subscripts3', 'subscripts4']),
        secondaryList: [
            {
                list: buildConfigList(['subscripts1']),
                relation: AND,
                searchIndexIncrement: -1,
            }, 
            {
                list: buildConfigList(['superscripts3']),
                relation: AND,
                searchIndexIncrement: -2,
            },
            {
                list: buildConfigList(['superscripts1']),
                relation: AND,
                searchIndexIncrement: 1,
            }
        ],
        startIndexIncrement: -2,
        endIndexIncrement: 2,
        style: getStyle()[25]
    },
];
