import $ from 'jquery';

import LegacyFormat from './formats/legacy';
import ChatFormat from './formats/chat';
import DOMManager from './classes/domManager';
import { FormatOptions } from './formats/base.format';

export const nickname = document.getElementById('nickname')! as HTMLInputElement;
export const coloredNick = document.getElementById('coloredNick')! as HTMLSpanElement;

export const formats = {
    legacy: new LegacyFormat(),
    chat: new ChatFormat(),
}

export const savedColors: string[] = [
    '#3acbe8',
    '#0d85d8',
    '#0160c9'
]

window.colorCount = 3;

document.addEventListener('DOMContentLoaded', () => {
    DOMManager.init();
});

window.updateOutputText = (ev: InputEvent) => {
    DOMManager.updateOutputText();
}

window.showError = (show: boolean) => {
    if (show) {
        document.getElementById('error')!.style.display = 'block';
        document.getElementById('outputText')!.style.height = '70px';
        document.getElementById('outputText')!.style.marginBottom = '5px';
    } else {
        document.getElementById('error')!.style.display = 'none';
        document.getElementById('outputText')!.style.height = '95px';
        document.getElementById('outputText')!.style.marginBottom = '10px';
    }
}

window.displayColoredName = (nickname: string, colors: string[]) => {
    const formatToggles: FormatOptions = {
        bold: (document.getElementById('bold') as HTMLInputElement).checked,
        italic: (document.getElementById('italics') as HTMLInputElement).checked,
        strikethrough: (document.getElementById('strike') as HTMLInputElement).checked,
    }

    DOMManager.displayColoredName(nickname, colors, formatToggles);
}

window.toggleColors = (count: number) => {
    DOMManager.toggleColors(count);
}

window.darkMode = () => {
    DOMManager.loadDarkMode();
}

window.copyTextToClipboard = (text: string) => {
    window.navigator.clipboard.writeText(text);

    const copyTextLabel = document.getElementById('graylabel2')!;
    let originalText = copyTextLabel.innerText;
    copyTextLabel.innerText = 'Copied!';
    setTimeout(() => {
        copyTextLabel.innerText = originalText;
    }, 1000);

}
