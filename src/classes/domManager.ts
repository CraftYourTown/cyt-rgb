import { coloredNick, formats, nickname, savedColors } from "..";
import { FormatOptions } from "../formats/base.format";
import Gradient from "./gradient";

let hasLoaded = false;

export default class DOMManager {

    public static init() {
        if (hasLoaded) return;
        this.loadDarkMode();
        this.toggleColors((document.getElementById('numOfColors')! as HTMLInputElement).valueAsNumber);
        this.updateOutputText()
        window.jscolor.install();
        hasLoaded = true;
    }

    public static loadDarkMode() {
        if ((document.getElementById('darkmode')! as HTMLInputElement).checked == true) {
            document.body.classList.add('dark');
            document.getElementById('output-format')!.classList.add("dark");
            // document.getElementById('color-preset')!.classList.add("dark");
            document.getElementById('numOfColors')!.classList.add("dark");
            // document.getElementById('graylabel1')!.classList.replace("gray", "darkgray");
            document.getElementById('graylabel2')!.classList.replace("gray", "darkgray");
            document.getElementById('outputText')!.classList.replace("gray", "darkgray");
            document.getElementById('outputText')!.classList.replace("gray", "darkgray");
            document.getElementById('error')!.classList.replace("errortext", "darkerrortext");
            document.getElementById('numOfColors')!.classList.add("darktextboxes");
            document.getElementById('nickname')!.classList.add("darktextboxes");
            document.getElementById('outputText')!.classList.add("darktextboxes");
            Array.from(document.getElementsByClassName("hexColor")).forEach(e => {
                document.getElementById(e.id)!.classList.add("darktextboxes");
            })
        } else {
            document.body.classList.remove('dark');
            document.getElementById('output-format')!.classList.remove("dark");
            // document.getElementById('color-preset')!.classList.remove("dark");
            document.getElementById('numOfColors')!.classList.remove("dark");
            // document.getElementById('graylabel1')!.classList.replace("darkgray", "gray");
            document.getElementById('graylabel2')!.classList.replace("darkgray", "gray");
            document.getElementById('outputText')!.classList.replace("darkgray", "gray");
            document.getElementById('error')!.classList.replace("darkerrortext", "errortext");
            document.getElementById('numOfColors')!.classList.remove("darktextboxes");
            document.getElementById('nickname')!.classList.remove("darktextboxes");
            document.getElementById('outputText')!.classList.remove("darktextboxes");
            Array.from(document.getElementsByClassName("hexColor")).forEach(e => {
                document.getElementById(e.id)!.classList.remove("darktextboxes");
            })
        }
    }

    public static toggleColors(colors: number) {
        let clamped = Math.min(10, Math.max(2, colors));
        window.colorCount = clamped;

        if (colors == 1) {
            colors = DOMManager.getColors().length;
        } else if (colors != clamped) {
            $('#numOfColors').val(clamped);
            colors = clamped;
        }

        const container = $('#hexColors');

        container.children().each((index, element) => {
            element.remove()
        });

        let template = $('#hexColorTemplate').html();
        for (let i = 1; i <= colors; i++) {
            let html = template.replace(/\$NUM/g, i.toString()).replace(/\$VAL/g, savedColors[i - 1]);
            container.append(html);
        }
        window.jscolor.install(); // Refresh all jscolor elements

    }

    public static getColors(): string[] {
        const hexColors = $('#hexColors').find('.hexColor');
        hexColors.each((index, element) => {
            const value = $(element).val() as string;
            savedColors[index] = value;
        });
        return savedColors
    }

    public static updateOutputText() {
        let format = formats[(document.getElementById('output-format')! as HTMLInputElement).value as keyof typeof formats];
        let newNick = nickname.value
        if (!newNick) {
            newNick = 'Type something!'
        }

        const formatToggles: FormatOptions = {
            bold: (document.getElementById('bold') as HTMLInputElement).checked,
            italic: (document.getElementById('italics') as HTMLInputElement).checked,
            // underline: (document.getElementById('underline') as HTMLInputElement).checked,
            strikethrough: (document.getElementById('strike') as HTMLInputElement).checked,
        }

        let outputText = document.getElementById('outputText') as HTMLPreElement;

        const gradient = new Gradient(this.getColors().slice(0, window.colorCount));
        const charColors = gradient.getColorSteps(newNick.length);
        const output = gradient.format(format, newNick, formatToggles)

        outputText.innerText = output;
        showError(256 < output.length);
        this.displayColoredName(newNick, charColors, formatToggles);
    }

    public static displayColoredName(nickName: string, colors: string[], format: FormatOptions) {
        coloredNick.classList.remove('minecraftbold', 'minecraftibold', 'minecraftitalic');
        if (format.bold) {
            if (format.italic) {
                coloredNick.classList.add('minecraftibold');
            } else {
                coloredNick.classList.add('minecraftbold');
            }
        } else if (format.italic) {
            coloredNick.classList.add('minecraftitalic');
        }

        coloredNick.innerHTML = '';
        for (let i = 0; i < nickName.length; i++) {
            const coloredNickSpan = document.createElement('span');

            if (format.underline) {
                if (format.strikethrough) {
                    coloredNickSpan.classList.add('minecraftustrike');
                } else coloredNickSpan.classList.add('minecraftunderline');
            } else if (format.strikethrough) {
                coloredNickSpan.classList.add('minecraftstrike');
            }

            coloredNickSpan.style.color = colors[i];
            coloredNickSpan.textContent = nickName[i];
            coloredNick.append(coloredNickSpan);
        }
    }
}