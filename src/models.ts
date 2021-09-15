export interface KeyCombo {
    key: number
    en: string
    plain: string
    shift: string
    alt: string
    shiftAlt: string
}

export interface Theme {
    colors: {
        highlight: string
        text: string
    }
}

export interface HighlightStyle {
    gradient: string
    paddingLeft?: string
    paddingRight?: string
    paddingTop?: string
    paddingBottom?: string
}

export interface SymbolConfig {
    list: string[]
    secondaryList?: SymbolConfig[]
    startIndexIncrement?: number
    endIndexIncrement?: number
    searchIndexIncrement?: number
    relation?: string
    style?: HighlightStyle
}
