import Gradient from "../classes/gradient";
import Format, { FormatOptions } from "./base.format";

export default class ClassicFormat extends Format {

    name: string = 'Classic';
    layout: string = '&#rrggbb';

    public override format(gradient: Gradient, string: string, options?: FormatOptions): string {
        const colors = gradient.getColorSteps(string.length);
        let result = '';

        for (let i = 0; i < string.length; i++) {
            result += `${colors[i]}${this.addFormattingOptions(string[i], options)}`
        }

        return result;
    }


}