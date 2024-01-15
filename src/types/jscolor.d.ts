declare class JsColorType {

    presets: {
        [key: string]: {
            width: number;
                position: string
                previewPosition: string
                previewSize: number
                palette: string[]   
        }
    }

    constructor(targetElement: string | HTMLElement, options?: {
        width?: number;
        position?: string;
        previewPosition?: string;
        previewSize?: number;
        palette?: string[];
    } | keyof JsColorType['presets'] | `${keyof JsColorType['presets']} ${keyof JsColorType['presets']}`) ;

    public install(rootNode?: HTMLElement): boolean;
    public ready(fn: () => void): void;
    public trigger(event: string, data?: unknown): void;
}
