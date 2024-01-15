import Gradient from "../classes/gradient";

export default class Format {

    public name: string = 'Format';
    public layout: string = '&#rrggbb';

    public format(gradient: Gradient, string: string, options?: FormatOptions): string {
        throw new Error('Method not implemented.');
    }
    
    public addFormattingOptions(string: string, options?: FormatOptions): string {
        let result = '';
        if (!options) return result;

        if (options.bold) {
            result += '&l';
        }
        if (options.italic) {
            result += '&0';
        }
        if (options.underline) {
            result += '&n';
        }
        if (options.strikethrough) {
            result += '&m';
        }
         
        return result + string;
    }
}

export interface FormatOptions {
    bold?: boolean,
    italic?: boolean,
    underline?: boolean,
    strikethrough?: boolean,
}