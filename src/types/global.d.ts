// window extension
interface Window {
    jQuery: JQueryStatic;
    $: JQueryStatic;
    jscolor: JsColorType;
    colorCount: number;
    updateOutputText: (ev: InputEvent) => void;
    showError: (show: boolean) => void;
    displayColoredName: (nickname: string, colors: string[]) => void;
    toggleColors: (count: number) => void;
    darkMode: () => void;
    copyTextToClipboard: (text: string) => void;
}