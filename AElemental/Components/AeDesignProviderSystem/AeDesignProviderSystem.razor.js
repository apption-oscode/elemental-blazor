

export function setAccentColor(accentColor) {
    if(window.aelemental){
        let { accentPallet, PaletteRGB, SwatchRGB, parseColorHexRGB } = window.aelemental;
        accentPalette.withDefault(PaletteRGB.create(SwatchRGB.from(parseColorHexRGB(accentColor))));
    }
}