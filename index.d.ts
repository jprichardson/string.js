import { TemplateConfig } from "./src/template"

declare namespace StringJs {

    export interface Config {
        nullAsEmptyString: boolean
        template: TemplateConfig
    }

    export interface Constructor {
        new (value:any): StringJs

        VERSION:string

        create(value:any): StringJs
        extendPrototype(): void
        restorePrototype(): void
    }

    export interface StringJs extends String {

        (value: any): StringJs

        constructor: Constructor

        s: string

        between(left: string, right: string): StringJs

        camelize(): StringJs

        capitalize(): StringJs

        chompLeft(prefix: string): StringJs

        chompRight(suffix: string): StringJs

        collapseWhitespace(): StringJs

        contains(string: string): number

        count(substring): number

        dasherize(): StringJs

        equalsIgnoreCase(prefix: string): boolean

        latinise(): StringJs

        decodeHtmlEntities(): StringJs

        escapeHTML(): StringJs

        ensureLeft(prefix: string): StringJs

        ensureRight(suffix: string): StringJs

        humanize(): StringJs

        isAlpha(): boolean

        isAlphaNumeric(): boolean

        isEmpty(): boolean

        isLower(): boolean

        isNumeric(): boolean

        isUpper(): boolean

        left(number: number): StringJs

        lines(): string[],

        pad(length: number, character?: string): StringJs

        padLeft(length: number, character?: string): StringJs

        padRight(length: number, character?: string): StringJs

        parseCSV(delimiter?: string, qualifier?: string, escape?: string, lineDelimiter?: string): string[]

        replaceAll(search: string, replace: string): StringJs

        splitLeft(separator: string, maxSplit?: number, limit?: number): string[]

        splitRight(separator: string, maxSplit?: number, limit?: number): string[]

        strip(...remove: string[]): StringJs

        stripLeft(pattern: string): StringJs

        stripRight(pattern: string): StringJs

        right(number: number): StringJs

        setValue(value: string): StringJs

        slugify(): StringJs

        stripPunctuation(): StringJs

        stripTags(...tags: string[]): StringJs

        template(values: object, opening?: string, closing?: string): StringJs

        times(number: number): StringJs

        titleCase(): StringJs

        toBoolean(): boolean

        toFloat(precision?: number): number

        toInt(): number

        truncate(length, ending?: string): StringJs

        toCSV(delimiter?: string, qualifier?: string): StringJs

        toCSV(options?: object): StringJs

        underscore(): StringJs

        unescapeHTML(): StringJs

        wrapHTML(tag?: string, attributes?: object): StringJs

    }

}

export default StringJs
