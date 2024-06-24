import Gradient from "../classes/gradient";
import Format, { FormatOptions } from "./base.format";

export default class ChatFormat extends Format {

    name: string = 'Chat';
    layout: string = '<gradient:#rrggbb:#rrggbb>';

    public override format(gradient: Gradient, string: string, options?: FormatOptions): string {
        const colors = gradient.getColors();
        let result = `<gradient:${colors.join(':')}>${this.addFormattingOptions(string, options)}</gradient>`
        return result;
    }

    public override addFormattingOptions(string: string, options?: FormatOptions): string {

        let prefix = '';

        if (!options) return string;

        if (options.bold) {
            prefix += '<b>';
        }

        if (options.italic) {
            prefix += '<i>';
        }

        if (options.underline) {
            prefix += '<u>';
        }

        if (options.strikethrough) {
            prefix += '<st>';
        }

        return prefix + string
    }


}