import Format, { FormatOptions } from "../formats/base.format";

export default class Gradient {

    public colors: string[] = [];
    public lowerRange: number = 0;
    public upperRange: number = 100;

    constructor(colors: string[], lowerRange: number = 0, upperRange: number = 100) {
        this.colors = colors;
        this.lowerRange = lowerRange;
        this.upperRange = upperRange;
    }

    public addColor(color: string): this {
        this.colors.push(color);
        return this;
    }

    public getColors(): string[] {
        return this.colors.map(c => c.toLowerCase());
    }

    public setRange(lower: number, upper: number): this {
        this.lowerRange = lower;
        this.upperRange = upper;
        return this;
    }

    public getRange(): number[] {
        return [this.lowerRange, this.upperRange];
    }

    public static hexToRGB(color: string): number[] {
        let r: number = parseInt(color.substr(1, 2), 16);
        let g: number = parseInt(color.substr(3, 2), 16);
        let b: number = parseInt(color.substr(5, 2), 16);
        return [r, g, b];
    }

    public static RGBToHex(r: number, g: number, b: number): string {
        return '#' + r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0");
    }

    public colorAt(step: number): string {
        let stepSize: number = (this.upperRange - this.lowerRange) / (this.colors.length - 1);
        let index: number = Math.floor((step - this.lowerRange) / stepSize);
        let lowerColor: string = this.colors[index] || this.colors[this.colors.length - 1];
        let upperColor: string = this.colors[index + 1] || lowerColor;
        let lowerRGB: number[] = Gradient.hexToRGB(lowerColor);
        let upperRGB: number[] = Gradient.hexToRGB(upperColor);
        let lowerStep: number = index * stepSize;
        let upperStep: number = (index + 1) * stepSize;
        let ratio: number = (step - lowerStep) / (upperStep - lowerStep);
        let r: number = Math.floor(lowerRGB[0] + (upperRGB[0] - lowerRGB[0]) * ratio);
        let g: number = Math.floor(lowerRGB[1] + (upperRGB[1] - lowerRGB[1]) * ratio);
        let b: number = Math.floor(lowerRGB[2] + (upperRGB[2] - lowerRGB[2]) * ratio);
        return Gradient.RGBToHex(r, g, b);
    }

    public getColorSteps(steps: number): string[] {
        let colors: string[] = [];
        let stepSize: number = (this.upperRange - this.lowerRange) / (steps - 1);
        for (let i: number = 0; i < steps; i++) {
            let color: string = this.colorAt(this.lowerRange + i * stepSize);
            colors.push(color);
        }
        return colors;
    }

    public format(formatter: Format, string: string, options?: FormatOptions): string {
        return formatter.format(this, string, options);
    }
}