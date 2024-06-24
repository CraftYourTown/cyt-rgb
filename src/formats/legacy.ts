import Gradient from "../classes/gradient";
import Format, { FormatOptions } from "./base.format";

export default class LegacyFormat extends Format {

    name: string = 'Legacy';
    layout: string = '&#rrggbb';

    public override format(gradient: Gradient, string: string, options?: FormatOptions): string {
        // https://stackoverflow.com/a/38901550
        let strArray = [...string]

        const colors = gradient.getColorSteps(strArray.length);
        let result = '';


        for (let i = 0; i < strArray.length; i++) {
            result += `&${colors[i]}${this.addFormattingOptions(strArray[i], options)}`
        }

        return result;
    }
}
