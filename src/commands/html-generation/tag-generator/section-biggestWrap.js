import sketch from 'sketch';
import {getBackground, getBorder, getBorderRadius, getDataPositionInHTML} from "../../../common-function";

export function biggestWrapGen(singleStyle,insideHTML){

    let layerChildren = singleStyle.layers;
    let biggestSize = 0;
    let biggestLayer = {};
    let customBackground = sketch.find('[name="bg"]',singleStyle)[0];
    let customBorder = sketch.find('[name="bd"]',singleStyle)[0];


    for(let i of layerChildren){
        if(i.frame.width > biggestSize){
            biggestSize = i.frame.width;
            biggestLayer = i;
        }
    }

    if(customBackground){
        biggestLayer = (sketch.find('[name="bg"]',singleStyle)[0]);
    }


    if(biggestLayer.type!=="ShapePath"){
        return insideHTML;
    }

    const width = biggestLayer.frame.width;
    const height = biggestLayer.frame.height;
    const x = biggestLayer.frame.x
    const y = biggestLayer.frame.y
    let innerPosition = getDataPositionInHTML(insideHTML);
    let padding = {
        left: Math.floor((innerPosition.x - x)/2),
        right:Math.floor((width - innerPosition.width - (innerPosition.x - x))/2),
        top: Math.floor((innerPosition.y - y)/2),
        bottom:Math.floor((height - innerPosition.height - (innerPosition.y - y))/2)
    }

    let backgroundColor = getBackground(biggestLayer);
    let borderRadius = getBorderRadius(biggestLayer);
    let border = getBorder(biggestLayer);

    let style = `padding:${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;${backgroundColor?("background:"+backgroundColor):''};${borderRadius?("border-radius:"+borderRadius):''};${border?("border:"+border):''}`;
    let outerWrap = `<section style="${style}">${insideHTML}</section>`

    if(customBorder){
        let borderRadius = getBorderRadius(customBorder);
        let borderCss = getBorder(customBorder);
        outerWrap = `<section style="border-radius:${borderRadius};${borderCss?('border:'+borderCss):''}">${outerWrap}</section>`
    }


    return outerWrap;
}