import {selectedLayer} from "../../../commonAPI";

import {changeCoordinatesBasis} from "../../../common-function";

export function pTagGen(content) {
    const text = content.text;
    const style = content.style;
    let position = changeCoordinatesBasis(selectedLayer[0],content);

    const fontSize = `font-size: ${style.fontSize/2}px;`;
    const fontFamily = `font-family: ${style.fontFamily};`;
    const fontWeight = style.fontWeight>5?`font-weight: bold;`:'';
    const textColor = `color: ${style.textColor};`;

    const pStyle = fontSize+fontFamily+fontWeight+textColor;

    return `<p style="${pStyle}" data-x="${position.x}" data-y="${position.y}" data-width="${position.width}" data-height="${position.height}">${text}</p>`;

}