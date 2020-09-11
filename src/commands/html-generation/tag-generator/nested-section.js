import {sketch} from "../../../commonAPI";
import {getBorder, getBorderRadius, getBackground, getDataPositionInHTML,getPadding,changeCoordinatesBasis} from "../../../common-function";


export function nestedSectionGen(singleStyle, htmlDoc) {
    const singleStyleChild = sketch.find(`*`, singleStyle);
    const nestedArray = singleStyleChild.filter(each => (!isNaN(Number(each.name))));
    if (nestedArray.length <= 0) {
        return htmlDoc;
    } else
        nestedArray.sort((layer1, layer2) => {
            let n1 = Number(layer1.name);
            let n2 = Number(layer2.name)
            return n2 - n1;
        })

    let nestedResult = '';
    let i = 0;
    while (i < nestedArray.length) {
        htmlDoc = deepSectionGen(singleStyle,nestedArray[i], htmlDoc);
        i++;
    }

    return htmlDoc;

}

function deepSectionGen(singleStyle,layer, innerHtml) {

    let position = changeCoordinatesBasis(singleStyle,layer);


    const border = getBorder(layer);
    const background = getBackground(layer);
    const borderRadius = getBorderRadius(layer);
    const paddingObj = getDataPositionInHTML(innerHtml)
    const padding = getPadding(position,paddingObj);
    let paddingOrTranslate = '';
    if(padding.padding){
        paddingOrTranslate = `padding:${padding.padding}`;
    }
    //判断transform:translation,待后期完成
    // else if(padding.x){
    //     paddingOrTranslate = `transform:translate(${padding.x}px,${padding.y}px)`;
    // }


    let style = `${paddingOrTranslate};${border ? ("border:" + border + ";") : ''}${background ? ("background:" + background + ";") : ''}${borderRadius?("border-radius:"+borderRadius+";"):''}`;
    return `<section style="${style}" data-x="${position.x}" data-y="${position.y}" data-width="${position.width}" data-height="${position.height}">${innerHtml}</section>`
}